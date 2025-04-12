
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, X, Maximize, Minimize } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your HostelNexus assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
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

    // Simulate AI response after a short delay
    setTimeout(() => {
      generateResponse(message);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const generateResponse = (userMessage: string) => {
    // Simplified AI response simulation
    const lowercaseMessage = userMessage.toLowerCase();
    let botResponse = '';

    // Common queries and predefined responses
    if (lowercaseMessage.includes('room') && (lowercaseMessage.includes('book') || lowercaseMessage.includes('reserve'))) {
      botResponse = 'To book a room, please visit the Room Management section on the dashboard. You can check available rooms and submit a booking request there.';
    } 
    else if (lowercaseMessage.includes('mess') && (lowercaseMessage.includes('menu') || lowercaseMessage.includes('food'))) {
      botResponse = 'You can check the mess menu for the entire week in the Mess Menu section. It includes breakfast, lunch, snacks, and dinner for each day.';
    }
    else if (lowercaseMessage.includes('complaint') || lowercaseMessage.includes('issue')) {
      botResponse = 'To report a complaint or issue, go to the Complaints section where you can submit details about your problem. Your complaint will be tracked until resolution.';
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
      botResponse = 'Hello! How can I assist you with hostel or mess related queries today?';
    }
    else {
      botResponse = 'I\'m not sure I understand. Could you please rephrase your question or check the FAQ section for commonly asked questions?';
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
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="mr-2" size={18} />
              <h3 className="text-sm font-medium">HostelNexus Assistant</h3>
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
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={message.trim() === ''}
                  >
                    <Send size={18} />
                  </Button>
                </div>
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
