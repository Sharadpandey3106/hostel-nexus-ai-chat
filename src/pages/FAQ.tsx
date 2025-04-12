
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';
import { 
  Search, 
  HelpCircle, 
  Home, 
  UtensilsCrossed, 
  Wifi, 
  Clock, 
  Ban, 
  Calendar, 
  Banknote, 
  ShieldAlert 
} from 'lucide-react';

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // FAQ data organized by categories
  const faqCategories = [
    {
      id: 'hostel',
      name: 'Hostel Facilities',
      icon: <Home className="h-5 w-5 text-blue-500" />,
      faqs: [
        {
          question: 'What amenities are provided in the hostel rooms?',
          answer: 'Each hostel room is furnished with a bed, study table, chair, wardrobe, ceiling fan, and a window. Common facilities include bathrooms, toilets, and common room on each floor.'
        },
        {
          question: 'Is WiFi available in the hostel?',
          answer: 'Yes, WiFi is available throughout the hostel premises. The network name and password will be provided at the time of check-in.'
        },
        {
          question: 'How do I report maintenance issues in my room?',
          answer: 'You can report maintenance issues through the "Room Management" section in the dashboard. Navigate to the "Maintenance" tab and submit a detailed request.'
        },
        {
          question: 'Can I change my room after allocation?',
          answer: 'Yes, room change requests can be submitted through the "Room Management" section. All requests are subject to availability and approval by the hostel administration.'
        }
      ]
    },
    {
      id: 'mess',
      name: 'Mess & Dining',
      icon: <UtensilsCrossed className="h-5 w-5 text-green-500" />,
      faqs: [
        {
          question: 'What are the mess timings?',
          answer: 'The mess operates during the following hours: Breakfast: 7:30 AM - 9:30 AM, Lunch: 12:30 PM - 2:30 PM, Snacks: 4:30 PM - 5:30 PM, Dinner: 7:30 PM - 9:30 PM.'
        },
        {
          question: 'Can I change my meal preference?',
          answer: 'Yes, you can change your meal preference (Vegetarian/Non-Vegetarian/Vegan) through the "Mess Menu" section in your dashboard.'
        },
        {
          question: 'Is the mess open on holidays?',
          answer: 'Yes, the mess operates on all days including weekends and holidays. However, timings may vary during special occasions, which will be notified in advance.'
        },
        {
          question: 'How can I provide feedback on mess food?',
          answer: 'You can provide feedback on the mess food through the "Feedback" tab in the "Mess Menu" section. Your feedback helps us improve the quality of food and service.'
        }
      ]
    },
    {
      id: 'rules',
      name: 'Hostel Rules',
      icon: <Ban className="h-5 w-5 text-red-500" />,
      faqs: [
        {
          question: 'What is the hostel curfew time?',
          answer: 'The hostel gates close at 10:00 PM. Students are expected to be inside the hostel premises before the curfew time unless they have proper authorization for late entry.'
        },
        {
          question: 'Are visitors allowed in the hostel?',
          answer: 'Visitors are allowed in the common areas of the hostel from 9:00 AM to 8:00 PM. Visitors must register at the reception desk. Overnight stay of visitors is not permitted.'
        },
        {
          question: 'What items are prohibited in the hostel?',
          answer: 'Prohibited items include: alcohol, drugs, firearms, inflammable materials, electric heating appliances, and cooking equipment. Possession of these items may result in disciplinary action.'
        },
        {
          question: 'Is smoking allowed in the hostel?',
          answer: 'No, smoking is strictly prohibited within the hostel premises including rooms, bathrooms, corridors, and common areas. Violation of this rule may result in strict disciplinary action.'
        }
      ]
    },
    {
      id: 'fees',
      name: 'Fees & Payments',
      icon: <Banknote className="h-5 w-5 text-amber-500" />,
      faqs: [
        {
          question: 'What are the payment methods for hostel fees?',
          answer: 'Hostel fees can be paid through online bank transfer, debit/credit card, or at the finance office. Details for online payment are available in the dashboard.'
        },
        {
          question: 'Is there a late fee for delayed payments?',
          answer: 'Yes, a late fee of 5% will be charged if payment is not made by the due date. Continuous delay may result in additional penalties as per hostel policy.'
        },
        {
          question: 'Can I pay my hostel fees in installments?',
          answer: 'Yes, the hostel fee can be paid in installments as per the installment plan announced at the beginning of each semester. Additional charges may apply for installment payments.'
        },
        {
          question: 'How do I get a receipt for my payment?',
          answer: 'Digital receipts are automatically generated and sent to your registered email address after payment. Physical receipts can be collected from the finance office if required.'
        }
      ]
    },
    {
      id: 'security',
      name: 'Safety & Security',
      icon: <ShieldAlert className="h-5 w-5 text-purple-500" />,
      faqs: [
        {
          question: 'Is there 24/7 security in the hostel?',
          answer: 'Yes, the hostel has 24/7 security personnel at the entrance gates. CCTV cameras are installed at strategic locations to ensure safety and security of all residents.'
        },
        {
          question: 'What should I do in case of an emergency?',
          answer: 'In case of emergency, contact the hostel warden or security personnel immediately. Emergency contact numbers are displayed on each floor and in the common areas.'
        },
        {
          question: 'Is there a first-aid facility in the hostel?',
          answer: 'Yes, basic first-aid facilities are available at the hostel reception. For medical emergencies, the hostel has tie-ups with nearby hospitals for quick assistance.'
        },
        {
          question: 'How are valuable items kept secure in the hostel?',
          answer: 'Students are advised to keep their valuables in the personal lockers provided in their rooms. The hostel administration is not responsible for any loss of personal belongings.'
        }
      ]
    },
    {
      id: 'general',
      name: 'General Information',
      icon: <HelpCircle className="h-5 w-5 text-gray-500" />,
      faqs: [
        {
          question: 'What is the check-in and check-out procedure?',
          answer: 'For check-in, report to the hostel reception with your allocation letter. For check-out, clear all dues, return room keys, and get a clearance certificate from the warden.'
        },
        {
          question: 'How do I access the laundry service?',
          answer: 'Laundry services are available on the ground floor. Operating hours are from 8 AM to 8 PM every day. You can drop your clothes and collect them as per the schedule displayed.'
        },
        {
          question: 'Is internet access available in the hostel?',
          answer: 'Yes, high-speed internet access is available through WiFi throughout the hostel premises. The network details will be provided during check-in.'
        },
        {
          question: 'How can I contact the hostel administration?',
          answer: 'You can contact the hostel administration by visiting the hostel office during working hours (9 AM - 5 PM) or by sending an email to admin@hostelnexus.com.'
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filterFAQs = () => {
    if (!searchQuery.trim()) return faqCategories;
    
    const query = searchQuery.toLowerCase();
    
    return faqCategories.map(category => ({
      ...category,
      faqs: category.faqs.filter(
        faq => 
          faq.question.toLowerCase().includes(query) || 
          faq.answer.toLowerCase().includes(query)
      )
    })).filter(category => category.faqs.length > 0);
  };
  
  const filteredFAQs = filterFAQs();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
            <p className="text-gray-600">Find answers to common questions about hostel and mess facilities</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
        
        {/* Search box */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search FAQ..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* FAQ Categories */}
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category) => (
            category.faqs.length > 0 && (
              <Card key={category.id} className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    {category.icon}
                    <CardTitle className="ml-2">{category.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )
          ))
        ) : (
          <div className="text-center py-12">
            <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No FAQs found</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search query or check out the categories below
            </p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        )}
        
        {/* Chatbot assistance section */}
        <div className="mt-12 bg-primary/5 rounded-lg p-6 border border-primary/20">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Need more help?</h3>
              <p className="mt-1 text-gray-600">
                If you can't find the answer to your question, our AI assistant is here to help you. Click on the chat button in the bottom right corner to start a conversation.
              </p>
              <div className="mt-4 flex space-x-4">
                <Button 
                  variant="default" 
                  onClick={() => {
                    const chatButton = document.querySelector('.fixed.bottom-5.right-5 button') as HTMLElement;
                    if (chatButton) {
                      chatButton.click();
                    }
                  }}
                >
                  Chat with Assistant
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/complaints')}
                >
                  Submit an Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default FAQ;
