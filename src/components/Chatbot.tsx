
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, X, Maximize, Minimize, AlertTriangle } from 'lucide-react';
import { useData } from '@/lib/DataContext';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isComplaint?: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your HostelNexus assistant. How can I help you today? You can also report complaints directly through chat.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isComplaintMode, setIsComplaintMode] = useState(false);
  const [complaintDetails, setComplaintDetails] = useState({
    title: '',
    description: '',
    category: 'Room' as 'Room' | 'Mess' | 'Facility' | 'Other',
    step: 0
  });
  const { currentUser, addComplaint } = useData();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const resetComplaintMode = () => {
    setIsComplaintMode(false);
    setComplaintDetails({
      title: '',
      description: '',
      category: 'Room',
      step: 0
    });
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setMessage('');

    if (isComplaintMode) {
      handleComplaintFlow(message);
    } else {
      // Check if this is a complaint intent
      const lowercaseMessage = message.toLowerCase();
      if (
        lowercaseMessage.includes('complaint') || 
        lowercaseMessage.includes('issue') || 
        lowercaseMessage.includes('problem') ||
        lowercaseMessage.includes('report')
      ) {
        startComplaintFlow();
      } else {
        // Regular chatbot response
        setTimeout(() => {
          generateResponse(message);
        }, 1000);
      }
    }
  };

  const startComplaintFlow = () => {
    setIsComplaintMode(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString(),
        content: "I can help you file a complaint. What's the title or brief description of your issue?",
        sender: 'bot',
        timestamp: new Date(),
        isComplaint: true
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setComplaintDetails(prev => ({ ...prev, step: 1 }));
    }, 1000);
  };

  const handleComplaintFlow = (userInput: string) => {
    switch (complaintDetails.step) {
      case 1: // Title received
        setComplaintDetails(prev => ({ ...prev, title: userInput, step: 2 }));
        setTimeout(() => {
          const botResponse: Message = {
            id: Date.now().toString(),
            content: "Got it. Now, please choose a category: 'Room', 'Mess', 'Facility', or 'Other'.",
            sender: 'bot',
            timestamp: new Date(),
            isComplaint: true
          };
          setMessages(prevMessages => [...prevMessages, botResponse]);
        }, 1000);
        break;
        
      case 2: // Category received
        const category = userInput.trim();
        if (['Room', 'Mess', 'Facility', 'Other'].includes(category)) {
          setComplaintDetails(prev => ({ 
            ...prev, 
            category: category as 'Room' | 'Mess' | 'Facility' | 'Other', 
            step: 3 
          }));
          setTimeout(() => {
            const botResponse: Message = {
              id: Date.now().toString(),
              content: "Now, please provide a detailed description of your issue.",
              sender: 'bot',
              timestamp: new Date(),
              isComplaint: true
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
          }, 1000);
        } else {
          setTimeout(() => {
            const botResponse: Message = {
              id: Date.now().toString(),
              content: "Please select a valid category: 'Room', 'Mess', 'Facility', or 'Other'.",
              sender: 'bot',
              timestamp: new Date(),
              isComplaint: true
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
          }, 1000);
        }
        break;
        
      case 3: // Description received
        setComplaintDetails(prev => ({ ...prev, description: userInput, step: 4 }));
        
        // Submit the complaint
        if (currentUser) {
          const newComplaint = {
            id: Date.now().toString(),
            studentId: currentUser.id,
            title: complaintDetails.title,
            description: userInput,
            category: complaintDetails.category,
            status: 'Open' as 'Open' | 'In Progress' | 'Resolved',
            timestamp: new Date().toISOString()
          };
          
          addComplaint(newComplaint);
          
          setTimeout(() => {
            const botResponse: Message = {
              id: Date.now().toString(),
              content: "Thank you! Your complaint has been successfully submitted. You can track its status in the Complaints section. Is there anything else I can help you with?",
              sender: 'bot',
              timestamp: new Date(),
              isComplaint: true
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
            
            toast({
              title: 'Complaint Submitted',
              description: 'Your complaint has been successfully submitted.',
              variant: 'default'
            });
            
            resetComplaintMode();
          }, 1000);
        } else {
          setTimeout(() => {
            const botResponse: Message = {
              id: Date.now().toString(),
              content: "I couldn't submit your complaint because you're not logged in. Please log in and try again.",
              sender: 'bot',
              timestamp: new Date(),
              isComplaint: true
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
            resetComplaintMode();
          }, 1000);
        }
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const generateResponse = (userMessage: string) => {
    // This is where we would integrate with Gemini AI
    // For now, we'll use our simplified response system
    const lowercaseMessage = userMessage.toLowerCase();
    let botResponse = '';

    // Note: In a real implementation, you would call the Gemini AI API here
    // const geminiResponse = await callGeminiAPI(userMessage);
    // botResponse = geminiResponse;

    // Fallback responses if Gemini API is not integrated
    if (lowercaseMessage.includes('room') && (lowercaseMessage.includes('book') || lowercaseMessage.includes('reserve'))) {
      botResponse = 'To book a room, please visit the Room Management section on the dashboard. You can check available rooms and submit a booking request there.';
    } 
    else if (lowercaseMessage.includes('mess') && (lowercaseMessage.includes('menu') || lowercaseMessage.includes('food'))) {
      botResponse = 'You can check the mess menu for the entire week in the Mess Menu section. It includes breakfast, lunch, snacks, and dinner for each day.';
    }
    else if (lowercaseMessage.includes('complaint') || lowercaseMessage.includes('issue')) {
      botResponse = 'To report a complaint or issue, I can help you file it directly through this chat. Would you like to start the complaint process now?';
      // Start complaint flow on next message
      startComplaintFlow();
      return;
    }
    else if (lowercaseMessage.includes('payment') || lowercaseMessage.includes('fee') || lowercaseMessage.includes('due')) {
      botResponse = 'You can view your payment details and outstanding dues on your dashboard. For payment methods, please contact the hostel administration office.';
    }
    else if (lowercaseMessage.includes('wifi') || lowercaseMessage.includes('internet')) {
      botResponse = 'WiFi is available throughout the hostel. The network name is "HostelNet" and the password can be obtained from the reception desk.';
    }
    else if (lowercaseMessage.includes('laundry')) {
      botResponse = 'Laundry services are available on the ground floor. Operating hours are from 8 AM to 8 PM every day.';
    }
    else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
      botResponse = 'Hello! How can I assist you with hostel or mess related queries today? You can also report complaints directly through this chat.';
    }
    else if (lowercaseMessage.includes('gemini') || lowercaseMessage.includes('ai')) {
      botResponse = 'I\'m powered by an AI assistant designed to help with hostel management queries. For complex queries, I can connect you with the hostel administration.';
    }
    else {
      botResponse = 'I\'m not sure I understand. Could you please rephrase your question? You can ask about hostel facilities, mess menu, or report complaints.';
    }

    const newBotMessage: Message = {
      id: Date.now().toString(),
      content: botResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, newBotMessage]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <Card className={`transition-all duration-300 ${isMinimized ? 'h-16 w-72' : 'h-96 w-72'} flex flex-col overflow-hidden rounded-lg shadow-xl`}>
          <div className={`p-3 flex justify-between items-center ${isComplaintMode ? 'bg-amber-600' : 'bg-primary'} text-white`}>
            <div className="flex items-center">
              {isComplaintMode ? (
                <>
                  <AlertTriangle className="mr-2" size={18} />
                  <h3 className="text-sm font-medium">Complaint Assistant</h3>
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2" size={18} />
                  <h3 className="text-sm font-medium">HostelNexus Assistant</h3>
                </>
              )}
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white hover:bg-primary/80"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize size={14} /> : <Minimize size={14} />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white hover:bg-primary/80"
                onClick={toggleChatbot}
              >
                <X size={14} />
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-3 max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto' : 'mr-auto'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white rounded-br-none'
                          : msg.isComplaint
                          ? 'bg-amber-100 text-amber-800 rounded-bl-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div
                      className={`text-xs text-gray-500 mt-1 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 border-t bg-white">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={isComplaintMode ? "Enter complaint details..." : "Type your message..."}
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={message.trim() === ''}
                    className={isComplaintMode ? "bg-amber-600 hover:bg-amber-700" : ""}
                  >
                    <Send size={18} />
                  </Button>
                </div>
                {isComplaintMode && (
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={resetComplaintMode}
                    >
                      Cancel Complaint
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </Card>
      ) : (
        <Button 
          onClick={toggleChatbot} 
          className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
};

export default Chatbot;
