
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
import { Bed, DoorOpen, MailQuestion, Wrench, Home, Clock, CalendarClock } from 'lucide-react';

const RoomManagement = () => {
  const { currentUser, updateStudent } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  if (!currentUser) {
    navigate('/');
    return null;
  }
  
  const [maintenanceRequest, setMaintenanceRequest] = useState({
    issueType: '',
    description: '',
    preferredTime: ''
  });
  
  // Room change request form state
  const [roomChangeRequest, setRoomChangeRequest] = useState({
    desiredBlock: '',
    desiredRoomType: '',
    reason: ''
  });
  
  // Dummy room data
  const roomDetails = {
    roomNumber: currentUser.roomNumber,
    block: currentUser.hostelBlock,
    type: 'Standard Double Occupancy',
    floor: parseInt(currentUser.roomNumber.substring(1, 2)),
    amenities: ['Bed', 'Study Table', 'Chair', 'Wardrobe', 'Fan', 'Window'],
    lastCleaned: '2023-11-20',
    condition: 'Good',
    roommates: [
      {
        id: currentUser.id === '1' ? '3' : '1',
        name: currentUser.id === '1' ? 'Mark Wilson' : 'John Doe'
      }
    ]
  };
  
  // Dummy maintenance history
  const maintenanceHistory = [
    {
      id: '1',
      issue: 'Fan not working properly',
      reportedDate: '2023-10-15',
      status: 'Resolved',
      resolvedDate: '2023-10-17'
    },
    {
      id: '2',
      issue: 'Window latch broken',
      reportedDate: '2023-09-05',
      status: 'Resolved',
      resolvedDate: '2023-09-07'
    }
  ];
  
  // Handle maintenance request submission
  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Maintenance Request Submitted',
      description: 'Your maintenance request has been successfully submitted.',
      variant: 'default'
    });
    setMaintenanceRequest({
      issueType: '',
      description: '',
      preferredTime: ''
    });
  };
  
  // Handle room change request submission
  const handleRoomChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Room Change Request Submitted',
      description: 'Your room change request has been submitted for approval.',
      variant: 'default'
    });
    setRoomChangeRequest({
      desiredBlock: '',
      desiredRoomType: '',
      reason: ''
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
            <p className="text-gray-600">Manage your room details and request services</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
        
        {/* Room Information Card */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <Home className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>Room Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Room Number</dt>
                    <dd className="mt-1 text-lg font-semibold">{roomDetails.roomNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Block</dt>
                    <dd className="mt-1">{roomDetails.block}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Room Type</dt>
                    <dd className="mt-1">{roomDetails.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Floor</dt>
                    <dd className="mt-1">{roomDetails.floor}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Room Condition</dt>
                    <dd className="mt-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {roomDetails.condition}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {roomDetails.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Roommate(s)</h3>
                  <div className="space-y-2">
                    {roomDetails.roommates.map((roommate) => (
                      <div key={roommate.id} className="flex items-center border rounded-md p-2 bg-gray-50">
                        <div className="rounded-full bg-gray-200 p-2 mr-3">
                          <Bed className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{roommate.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Last Cleaned</h3>
                  <div className="flex items-center">
                    <CalendarClock className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{roomDetails.lastCleaned}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Room Services Tabs */}
        <Tabs defaultValue="maintenance">
          <TabsList className="mb-4">
            <TabsTrigger value="maintenance" className="flex items-center">
              <Wrench className="mr-2 h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="room-change" className="flex items-center">
              <DoorOpen className="mr-2 h-4 w-4" />
              Room Change
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Service History
            </TabsTrigger>
          </TabsList>
          
          {/* Maintenance Request Tab */}
          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Request</CardTitle>
                <CardDescription>
                  Submit a maintenance request for your room
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMaintenanceSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="issueType">Issue Type</Label>
                      <select 
                        id="issueType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={maintenanceRequest.issueType}
                        onChange={(e) => setMaintenanceRequest({...maintenanceRequest, issueType: e.target.value})}
                        required
                      >
                        <option value="">Select an issue type</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <select 
                        id="preferredTime"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={maintenanceRequest.preferredTime}
                        onChange={(e) => setMaintenanceRequest({...maintenanceRequest, preferredTime: e.target.value})}
                        required
                      >
                        <option value="">Select preferred time</option>
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                        <option value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Please describe the issue in detail"
                      className="min-h-[100px]"
                      value={maintenanceRequest.description}
                      onChange={(e) => setMaintenanceRequest({...maintenanceRequest, description: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Button type="submit">Submit Request</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Room Change Request Tab */}
          <TabsContent value="room-change">
            <Card>
              <CardHeader>
                <CardTitle>Room Change Request</CardTitle>
                <CardDescription>
                  Submit a request to change your current room
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRoomChangeSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="desiredBlock">Desired Block</Label>
                      <select 
                        id="desiredBlock"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={roomChangeRequest.desiredBlock}
                        onChange={(e) => setRoomChangeRequest({...roomChangeRequest, desiredBlock: e.target.value})}
                        required
                      >
                        <option value="">Select block</option>
                        <option value="A">Block A</option>
                        <option value="B">Block B</option>
                        <option value="C">Block C</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="desiredRoomType">Desired Room Type</Label>
                      <select 
                        id="desiredRoomType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={roomChangeRequest.desiredRoomType}
                        onChange={(e) => setRoomChangeRequest({...roomChangeRequest, desiredRoomType: e.target.value})}
                        required
                      >
                        <option value="">Select room type</option>
                        <option value="Single Occupancy">Single Occupancy</option>
                        <option value="Double Occupancy">Double Occupancy</option>
                        <option value="Triple Occupancy">Triple Occupancy</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="reason">Reason for Change</Label>
                    <Textarea 
                      id="reason"
                      placeholder="Please explain why you want to change rooms"
                      className="min-h-[100px]"
                      value={roomChangeRequest.reason}
                      onChange={(e) => setRoomChangeRequest({...roomChangeRequest, reason: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Button type="submit">Submit Request</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Maintenance History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
                <CardDescription>
                  Past maintenance requests for your room
                </CardDescription>
              </CardHeader>
              <CardContent>
                {maintenanceHistory.length > 0 ? (
                  <div className="divide-y">
                    {maintenanceHistory.map((item) => (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{item.issue}</h4>
                          <Badge 
                            variant={item.status === 'Resolved' ? 'default' : 'outline'}
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex text-sm text-gray-500 mt-2">
                          <div className="flex items-center mr-4">
                            <span className="text-xs">Reported: {item.reportedDate}</span>
                          </div>
                          {item.resolvedDate && (
                            <div className="flex items-center">
                              <span className="text-xs">Resolved: {item.resolvedDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <MailQuestion className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-500">No maintenance history found.</p>
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

export default RoomManagement;
