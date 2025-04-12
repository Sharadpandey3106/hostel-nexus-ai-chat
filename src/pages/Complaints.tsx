
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';
import { useData } from '@/lib/DataContext';
import { AlertTriangle, CheckCircle2, Clock, MailQuestion, ClipboardList, RotateCcw } from 'lucide-react';

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
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">Open</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">In Progress</Badge>;
      case 'Resolved':
        return <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Room':
        return <div className="p-2 rounded-full bg-blue-100"><AlertTriangle className="h-4 w-4 text-blue-600" /></div>;
      case 'Mess':
        return <div className="p-2 rounded-full bg-amber-100"><AlertTriangle className="h-4 w-4 text-amber-600" /></div>;
      case 'Facility':
        return <div className="p-2 rounded-full bg-purple-100"><AlertTriangle className="h-4 w-4 text-purple-600" /></div>;
      case 'Other':
        return <div className="p-2 rounded-full bg-gray-100"><AlertTriangle className="h-4 w-4 text-gray-600" /></div>;
      default:
        return <div className="p-2 rounded-full bg-gray-100"><AlertTriangle className="h-4 w-4 text-gray-600" /></div>;
    }
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
                {userComplaints.length > 0 ? (
                  <div className="space-y-6">
                    {userComplaints.map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4 bg-white">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-3">
                              {getCategoryIcon(complaint.category)}
                              <div>
                                <h3 className="font-medium text-gray-900">{complaint.title}</h3>
                                <p className="text-sm text-gray-500">Category: {complaint.category}</p>
                              </div>
                            </div>
                            <div>{getStatusBadge(complaint.status)}</div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">{complaint.description}</p>
                          </div>
                          
                          <div className="mt-4 flex justify-between text-xs text-gray-500">
                            <span>Reported on: {new Date(complaint.timestamp).toLocaleDateString()}</span>
                            <div className="flex space-x-2">
                              {complaint.status !== 'Resolved' && (
                                <Button variant="link" className="h-auto p-0 text-xs" size="sm">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Mark as Resolved
                                </Button>
                              )}
                              <Button variant="link" className="h-auto p-0 text-xs" size="sm">
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Follow Up
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {complaint.status === 'In Progress' && (
                          <div className="bg-blue-50 p-3 border-t">
                            <p className="text-xs text-blue-700">
                              <Clock className="h-3 w-3 inline mr-1" />
                              Your complaint is being processed. The maintenance team will contact you soon.
                            </p>
                          </div>
                        )}
                        
                        {complaint.status === 'Resolved' && (
                          <div className="bg-green-50 p-3 border-t">
                            <p className="text-xs text-green-700">
                              <CheckCircle2 className="h-3 w-3 inline mr-1" />
                              This issue has been resolved. If you're still facing problems, please follow up.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <MailQuestion className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
                    <p className="mt-2 text-gray-500">You haven't submitted any complaints yet.</p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => {
                        const tabTrigger = document.querySelector('[data-value="new"]') as HTMLElement;
                        if (tabTrigger) {
                          tabTrigger.click();
                        }
                      }}
                    >
                      Report a New Issue
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default Complaints;
