
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Access the secret directly - no need for import from deno
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();

    // Format the conversation history for Gemini API
    const messages = conversationHistory.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Add the new user message
    messages.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Add system instructions to help with hostel management
    const systemInstruction = {
      role: 'system',
      parts: [{ 
        text: `You are an AI assistant for HostelNexus, a hostel management system. 
        Help students with their queries about hostel facilities, mess menu, room bookings, 
        and complaints. Be friendly, helpful, and concise. 
        If users want to file a complaint, guide them through the process and recognize complaint intent.
        For room related issues, provide guidance on the room management section.
        For mess related queries, refer to the mess menu section.
        Provide practical answers based on typical hostel management scenarios.`
      }]
    };

    const fullPrompt = [systemInstruction, ...messages];

    // Call the Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: fullPrompt,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    const result = await response.json();
    
    // Log for debugging (will appear in Supabase Edge Function logs)
    console.log("Gemini API response:", JSON.stringify(result));

    // Extract the generated text from the response
    let generatedText = "";
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      // Extract text from parts
      generatedText = result.candidates[0].content.parts
        .map((part: any) => part.text)
        .join("");
    } else if (result.error) {
      // Handle API errors
      console.error("Gemini API error:", result.error);
      generatedText = "Sorry, I encountered an error. Please try again later.";
    }

    return new Response(
      JSON.stringify({ response: generatedText }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while processing your request.",
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
