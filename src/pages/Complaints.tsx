
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';
import ComplaintsList from '@/components/ComplaintsList';
import { useData } from '@/lib/DataContext';
import { AlertTriangle, ClipboardList, Clock } from 'lucide-react';

const Complaints = () => {
  const { currentUser, complaints, addComplaint } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  if (!currentUser) {
    navigate('/');
    return null;
  }
  
  // Form state for new complaint
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: 'Room'
  });
  
  // Filter user's complaints
  const userComplaints = complaints.filter(complaint => complaint.studentId === currentUser.id);
  
  // Handle complaint submission
  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    
    const complaint = {
      id: Date.now().toString(),
      studentId: currentUser.id,
      title: newComplaint.title,
      description: newComplaint.description,
      category: newComplaint.category as 'Room' | 'Mess' | 'Facility' | 'Other',
      status: 'Open' as 'Open' | 'In Progress' | 'Resolved',
      timestamp: new Date().toISOString()
    };
    
    addComplaint(complaint);
    
    toast({
      title: 'Complaint Submitted',
      description: 'Your complaint has been successfully submitted.',
      variant: 'default'
    });
    
    setNewComplaint({
      title: '',
      description: '',
      category: 'Room'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Complaints & Issues</h1>
            <p className="text-gray-600">Report and track complaints about hostel facilities</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
        
        <Tabs defaultValue="new">
          <TabsList className="mb-6">
            <TabsTrigger value="new" className="flex items-center">
              <ClipboardList className="mr-2 h-4 w-4" />
              Report New Issue
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Complaint History
            </TabsTrigger>
          </TabsList>
          
          {/* New Complaint Form */}
          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>Report a New Issue</CardTitle>
                <CardDescription>
                  Fill out the form below to report any issues with your room, mess, or other facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitComplaint} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Issue Title</Label>
                    <Input 
                      id="title"
                      placeholder="Brief title describing the issue"
                      value={newComplaint.title}
                      onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={newComplaint.category}
                      onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                      required
                    >
                      <option value="Room">Room Issue</option>
                      <option value="Mess">Mess Issue</option>
                      <option value="Facility">Common Facility Issue</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Please provide detailed information about the issue"
                      className="min-h-[150px]"
                      value={newComplaint.description}
                      onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit">Submit Complaint</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Complaint History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Complaint History</CardTitle>
                <CardDescription>
                  Track the status of your previously submitted complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComplaintsList complaints={userComplaints} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-5">
          <div className="flex items-start">
            <div className="mr-4">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-amber-800">Need immediate assistance?</h3>
              <p className="mt-1 text-amber-700">
                You can also use our chatbot to report issues and get immediate help. Click the chat button in the bottom right corner.
              </p>
              <Button 
                variant="outline" 
                className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={() => {
                  const chatButton = document.querySelector('.fixed.bottom-5.right-5 button') as HTMLElement;
                  if (chatButton) {
                    chatButton.click();
                  }
                }}
              >
                Open Chatbot
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default Complaints;
