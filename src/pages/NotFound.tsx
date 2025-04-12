
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="relative">
          <div className="text-8xl font-bold text-gray-200">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-extrabold text-primary">Oops!</span>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Page not found</h1>
        
        <p className="text-gray-600">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="default" 
            className="w-full sm:w-auto flex items-center justify-center" 
            onClick={() => navigate('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex items-center justify-center" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
