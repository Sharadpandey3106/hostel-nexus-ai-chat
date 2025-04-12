
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/lib/DataContext';
import Chatbot from '@/components/Chatbot';
import { Building2, UtensilsCrossed, AlertTriangle, CheckCircle2, Wifi, Shield } from 'lucide-react';

const Index = () => {
  const { login, currentUser } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect to dashboard
  if (currentUser) {
    navigate('/dashboard');
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(email, password)) {
      toast({
        title: "Login successful",
        description: "Welcome to HostelNexus!",
        variant: "default",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. For demo, try john@example.com",
        variant: "destructive",
      });
    }
  };

  const features = [
    {
      icon: <Building2 size={24} className="text-primary" />,
      title: "Room Management",
      description: "Efficient room allocation and maintenance tracking system.",
    },
    {
      icon: <UtensilsCrossed size={24} className="text-primary" />,
      title: "Mess Management",
      description: "Weekly menu planning and dietary preference handling.",
    },
    {
      icon: <AlertTriangle size={24} className="text-primary" />,
      title: "Complaint System",
      description: "Fast-track issue reporting and resolution tracking.",
    },
    {
      icon: <CheckCircle2 size={24} className="text-primary" />,
      title: "Attendance Tracking",
      description: "Digital attendance system for hostel residents.",
    },
    {
      icon: <Wifi size={24} className="text-primary" />,
      title: "Digital Amenities",
      description: "Wi-Fi, laundry, and other services management.",
    },
    {
      icon: <Shield size={24} className="text-primary" />,
      title: "Security System",
      description: "Visitor management and notification system.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Welcome to</span>
                <span className="block text-primary">HostelNexus</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
                A comprehensive solution for hostel and mess management. Streamline operations, improve student experience, and efficiently manage resources.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => setEmail("john@example.com")}>
                  Demo Login
                </Button>
              </div>
            </div>
            
            <div className="mt-12 md:mt-0">
              <Card className="w-full shadow-lg">
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-muted-foreground">
                    Demo credentials: john@example.com (any password)
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Comprehensive Hostel & Mess Management Features
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              HostelNexus provides a complete suite of tools to manage all aspects of hostel and mess operations efficiently.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Hostel Management?
          </h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join HostelNexus and experience the next generation of hostel and mess management systems.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => setEmail("john@example.com")}
          >
            Try Demo Now
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-4">HostelNexus</h3>
              <p className="text-gray-300">
                The comprehensive solution for modern hostel and mess management.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="/faq" className="text-gray-300 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">
                Email: info@hostelnexus.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>© {new Date().getFullYear()} HostelNexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <Chatbot />
    </div>
  );
};

export default Index;
