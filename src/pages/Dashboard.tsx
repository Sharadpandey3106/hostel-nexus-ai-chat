
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { useData } from '@/lib/DataContext';
import Chatbot from '@/components/Chatbot';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  AlertTriangle, 
  Calendar, 
  UtensilsCrossed, 
  CreditCard, 
  BellRing, 
  Clock,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser, complaints } = useData();
  const navigate = useNavigate();
  
  if (!currentUser) {
    navigate('/');
    return null;
  }

  // Filter user's complaints
  const userComplaints = complaints.filter(complaint => complaint.studentId === currentUser.id);
  
  // Generate random notification data
  const notifications = [
    { 
      id: '1', 
      title: 'Maintenance Schedule', 
      message: 'Plumbing maintenance scheduled for tomorrow from 10 AM to 2 PM.',
      time: '2 hours ago' 
    },
    { 
      id: '2', 
      title: 'Mess Menu Update', 
      message: 'Special dinner planned for Saturday. Check the updated menu.',
      time: '1 day ago' 
    },
    { 
      id: '3', 
      title: 'Fee Reminder', 
      message: 'Hostel fee due date approaching. Please clear all pending dues.',
      time: '2 days ago' 
    }
  ];

  // Generate random calendar events
  const events = [
    { id: '1', title: 'Hostel Meeting', date: 'Today, 6:00 PM', location: 'Common Hall' },
    { id: '2', title: 'Cultural Event', date: 'Tomorrow, 5:30 PM', location: 'Auditorium' },
    { id: '3', title: 'Sports Tournament', date: 'Saturday, 10:00 AM', location: 'Sports Complex' }
  ];

  // Stats cards data
  const stats = [
    { title: 'Days in Hostel', value: '145', icon: <Home className="h-5 w-5 text-blue-500" /> },
    { title: 'Active Complaints', value: userComplaints.filter(c => c.status !== 'Resolved').length.toString(), icon: <AlertTriangle className="h-5 w-5 text-amber-500" /> },
    { title: 'Mess Attendance', value: '92%', icon: <UtensilsCrossed className="h-5 w-5 text-green-500" /> },
    { title: 'Due Amount', value: `₹${currentUser.dueAmount}`, icon: <CreditCard className="h-5 w-5 text-red-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your hostel stay.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className="p-2 rounded-full bg-gray-100 mr-4">{stat.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Personal Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="mt-1">{currentUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="mt-1">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="mt-1">{currentUser.phone}</p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => navigate('/room-management')}>
                    View Room Details
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => navigate('/complaints')}>
                    Report Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs Card with Notifications and Calendar */}
          <Card className="lg:col-span-2">
            <Tabs defaultValue="notifications">
              <div className="flex items-center justify-between px-6 pt-6">
                <TabsList>
                  <TabsTrigger value="notifications" className="flex items-center">
                    <BellRing className="h-4 w-4 mr-2" /> Notifications
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Upcoming Events
                  </TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
              </div>
              
              <TabsContent value="notifications">
                <CardContent className="pt-3">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex gap-4 pb-3 last:pb-0 border-b last:border-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <BellRing className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="calendar">
                <CardContent className="pt-3">
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex gap-4 pb-3 last:pb-0 border-b last:border-0">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                          <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">{event.title}</h4>
                            <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">{event.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Quick Access Cards */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/room-management')}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-4">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Room Management</h3>
                    <p className="text-sm text-gray-600">Manage your room details</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/mess-menu')}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 mr-4">
                    <UtensilsCrossed className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Mess Menu</h3>
                    <p className="text-sm text-gray-600">Check today's menu</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/complaints')}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-amber-100 mr-4">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Complaints</h3>
                    <p className="text-sm text-gray-600">Report and track issues</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Complaints */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recent Complaints</h2>
        <Card className="mb-8">
          <CardContent className="p-6">
            {userComplaints.length > 0 ? (
              <div className="divide-y">
                {userComplaints.map((complaint) => (
                  <div key={complaint.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{complaint.title}</h4>
                      <Badge 
                        variant={
                          complaint.status === 'Resolved' ? 'default' :
                          complaint.status === 'In Progress' ? 'secondary' : 'outline'
                        }
                      >
                        {complaint.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Category: {complaint.category}</span>
                      <span>Reported on: {new Date(complaint.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-500">You haven't filed any complaints yet.</p>
                <Button className="mt-4" onClick={() => navigate('/complaints')}>Report an Issue</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default Dashboard;
