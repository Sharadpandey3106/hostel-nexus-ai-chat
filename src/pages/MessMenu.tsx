
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';
import { useData } from '@/lib/DataContext';
import { UtensilsCrossed, Coffee, Soup, Salad, Cookie, Beef, ThumbsUp, ThumbsDown } from 'lucide-react';

const MessMenu = () => {
  const { currentUser, messMenu, updateStudent } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  if (!currentUser) {
    navigate('/');
    return null;
  }
  
  const [selectedDay, setSelectedDay] = useState(
    // Get current day of week
    new Date().toLocaleDateString('en-US', { weekday: 'long' })
  );
  
  const [feedback, setFeedback] = useState({
    rating: '',
    comment: ''
  });
  
  const [preferences, setPreferences] = useState({
    messPreference: currentUser.messPreference,
    dietaryRestrictions: []
  });
  
  // Get current day's menu
  const currentDayMenu = messMenu.find(menu => menu.day === selectedDay) || messMenu[0];
  
  // Handle feedback submission
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your feedback on the mess menu!',
      variant: 'default'
    });
    setFeedback({
      rating: '',
      comment: ''
    });
  };
  
  // Handle preferences submission
  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent(currentUser.id, { messPreference: preferences.messPreference });
    toast({
      title: 'Preferences Updated',
      description: 'Your mess preferences have been updated successfully.',
      variant: 'default'
    });
  };
  
  // CSS for meal section
  const mealSectionClass = "p-4 bg-white rounded-lg border shadow-sm";
  
  // Icons for meal types
  const mealIcons = {
    breakfast: <Coffee className="h-5 w-5 text-amber-500" />,
    lunch: <Soup className="h-5 w-5 text-red-500" />,
    snacks: <Cookie className="h-5 w-5 text-purple-500" />,
    dinner: <Salad className="h-5 w-5 text-green-500" />
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mess Menu</h1>
            <p className="text-gray-600">View weekly menu and manage food preferences</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
        
        {/* Day selector */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Select Day</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {messMenu.map((menu) => (
              <Button
                key={menu.day}
                variant={selectedDay === menu.day ? 'default' : 'outline'}
                className="whitespace-nowrap"
                onClick={() => setSelectedDay(menu.day)}
              >
                {menu.day}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Today's Menu Card */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center mb-2">
              <UtensilsCrossed className="mr-2 h-5 w-5 text-primary" />
              <CardTitle>{selectedDay}'s Menu</CardTitle>
            </div>
            <CardDescription>
              Menu for {selectedDay} - {currentUser.messPreference} options highlighted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={mealSectionClass}>
                <div className="flex items-center mb-3">
                  {mealIcons.breakfast}
                  <h3 className="text-lg font-medium ml-2">Breakfast</h3>
                  <Badge variant="outline" className="ml-auto">7:30 AM - 9:30 AM</Badge>
                </div>
                <ul className="space-y-2">
                  {currentDayMenu.breakfast.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-gray-700">{item}</span>
                      {(item.toLowerCase().includes('egg') && currentUser.messPreference === 'Non-Vegetarian') ||
                       (!item.toLowerCase().includes('egg') && !item.toLowerCase().includes('bacon')) && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {currentUser.messPreference}
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={mealSectionClass}>
                <div className="flex items-center mb-3">
                  {mealIcons.lunch}
                  <h3 className="text-lg font-medium ml-2">Lunch</h3>
                  <Badge variant="outline" className="ml-auto">12:30 PM - 2:30 PM</Badge>
                </div>
                <ul className="space-y-2">
                  {currentDayMenu.lunch.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-gray-700">{item}</span>
                      {(item.toLowerCase().includes('chicken') && currentUser.messPreference === 'Non-Vegetarian') ||
                       (!item.toLowerCase().includes('chicken') && !item.toLowerCase().includes('beef')) && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {currentUser.messPreference}
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={mealSectionClass}>
                <div className="flex items-center mb-3">
                  {mealIcons.snacks}
                  <h3 className="text-lg font-medium ml-2">Snacks</h3>
                  <Badge variant="outline" className="ml-auto">4:30 PM - 5:30 PM</Badge>
                </div>
                <ul className="space-y-2">
                  {currentDayMenu.snacks.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-gray-700">{item}</span>
                      {/* All snacks are usually vegetarian friendly */}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {currentUser.messPreference}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={mealSectionClass}>
                <div className="flex items-center mb-3">
                  {mealIcons.dinner}
                  <h3 className="text-lg font-medium ml-2">Dinner</h3>
                  <Badge variant="outline" className="ml-auto">7:30 PM - 9:30 PM</Badge>
                </div>
                <ul className="space-y-2">
                  {currentDayMenu.dinner.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-700">{item}</span>
                      {(item.toLowerCase().includes('chicken') || item.toLowerCase().includes('butter chicken') || 
                        item.toLowerCase().includes('egg')) && currentUser.messPreference === 'Non-Vegetarian' ? (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {currentUser.messPreference}
                        </Badge>
                      ) : !item.toLowerCase().includes('chicken') && 
                         !item.toLowerCase().includes('egg') && 
                         !item.toLowerCase().includes('beef') ? (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Vegetarian
                        </Badge>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Mess Tabs */}
        <Tabs defaultValue="preferences">
          <TabsList className="mb-4">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Mess Preferences</CardTitle>
                <CardDescription>
                  Set your dietary preferences and restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="messPreference" className="text-base">Meal Preference</Label>
                    <RadioGroup 
                      id="messPreference" 
                      value={preferences.messPreference}
                      onValueChange={(value) => setPreferences({...preferences, messPreference: value})}
                      className="mt-2 space-y-3"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem id="vegetarian" value="Vegetarian" />
                        <Label htmlFor="vegetarian" className="font-normal">Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem id="non-vegetarian" value="Non-Vegetarian" />
                        <Label htmlFor="non-vegetarian" className="font-normal">Non-Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem id="vegan" value="Vegan" />
                        <Label htmlFor="vegan" className="font-normal">Vegan</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label className="text-base">Dietary Restrictions</Label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Dairy-free', 'Gluten-free', 'Nut-free', 'No seafood', 'Low sugar', 'Low spice'].map((restriction) => (
                        <div key={restriction} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={restriction.toLowerCase().replace('-', '')}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPreferences({
                                  ...preferences, 
                                  dietaryRestrictions: [...preferences.dietaryRestrictions, restriction]
                                });
                              } else {
                                setPreferences({
                                  ...preferences,
                                  dietaryRestrictions: preferences.dietaryRestrictions.filter(r => r !== restriction)
                                });
                              }
                            }}
                          />
                          <Label 
                            htmlFor={restriction.toLowerCase().replace('-', '')}
                            className="ml-2 font-normal"
                          >
                            {restriction}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button type="submit">Save Preferences</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Menu Feedback</CardTitle>
                <CardDescription>
                  Provide feedback on today's meals to help us improve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="rating" className="text-base">How would you rate today's food?</Label>
                    <RadioGroup 
                      id="rating" 
                      value={feedback.rating}
                      onValueChange={(value) => setFeedback({...feedback, rating: value})}
                      className="mt-2 flex space-x-4"
                    >
                      <div className="flex flex-col items-center">
                        <RadioGroupItem id="excellent" value="Excellent" className="sr-only" />
                        <Label 
                          htmlFor="excellent" 
                          className={`cursor-pointer p-2 rounded-full ${feedback.rating === 'Excellent' ? 'bg-green-100 text-green-700' : 'text-gray-500'}`}
                        >
                          <ThumbsUp className="h-6 w-6" />
                        </Label>
                        <span className="text-xs mt-1">Excellent</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <RadioGroupItem id="average" value="Average" className="sr-only" />
                        <Label 
                          htmlFor="average" 
                          className={`cursor-pointer p-2 rounded-full ${feedback.rating === 'Average' ? 'bg-amber-100 text-amber-700' : 'text-gray-500'}`}
                        >
                          <ThumbsUp className="h-6 w-6" />
                        </Label>
                        <span className="text-xs mt-1">Average</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <RadioGroupItem id="poor" value="Poor" className="sr-only" />
                        <Label 
                          htmlFor="poor" 
                          className={`cursor-pointer p-2 rounded-full ${feedback.rating === 'Poor' ? 'bg-red-100 text-red-700' : 'text-gray-500'}`}
                        >
                          <ThumbsDown className="h-6 w-6" />
                        </Label>
                        <span className="text-xs mt-1">Poor</span>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="comment">Additional Comments</Label>
                    <Textarea 
                      id="comment"
                      placeholder="Please share your thoughts on today's menu..."
                      className="min-h-[100px]"
                      value={feedback.comment}
                      onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" disabled={feedback.rating === ''}>Submit Feedback</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default MessMenu;
