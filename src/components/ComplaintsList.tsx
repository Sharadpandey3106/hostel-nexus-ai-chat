
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Complaint } from '@/lib/DataContext';
import { AlertTriangle, CheckCircle2, RotateCcw, Clock } from 'lucide-react';

interface ComplaintsListProps {
  complaints: Complaint[];
  compact?: boolean;
}

const ComplaintsList: React.FC<ComplaintsListProps> = ({ complaints, compact = false }) => {
  const navigate = useNavigate();

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

  if (complaints.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-gray-500">You haven't filed any complaints yet.</p>
        <Button className="mt-4" onClick={() => navigate('/complaints')}>Report an Issue</Button>
      </div>
    );
  }

  // Show only first 3 complaints in compact mode
  const displayedComplaints = compact ? complaints.slice(0, 3) : complaints;

  return (
    <div className="space-y-4">
      {displayedComplaints.map((complaint) => (
        <Card key={complaint.id} className="overflow-hidden">
          <CardContent className={compact ? "p-4" : "p-5"}>
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                {getCategoryIcon(complaint.category)}
                <div>
                  <h3 className={`font-medium text-gray-900 ${compact ? "text-sm" : ""}`}>{complaint.title}</h3>
                  <p className="text-sm text-gray-500">Category: {complaint.category}</p>
                </div>
              </div>
              <div>{getStatusBadge(complaint.status)}</div>
            </div>
            
            {(!compact || complaint.status !== 'Resolved') && (
              <div className="mt-3">
                <p className={`text-gray-600 ${compact ? "text-sm line-clamp-2" : ""}`}>{complaint.description}</p>
              </div>
            )}
            
            <div className="mt-3 flex justify-between text-xs text-gray-500">
              <span>Reported on: {new Date(complaint.timestamp).toLocaleDateString()}</span>
              {!compact && complaint.status !== 'Resolved' && (
                <div className="flex space-x-2">
                  <Button variant="link" className="h-auto p-0 text-xs" size="sm">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Follow Up
                  </Button>
                </div>
              )}
            </div>

            {complaint.status === 'In Progress' && !compact && (
              <div className="mt-2 bg-blue-50 p-2 rounded-md">
                <p className="text-xs text-blue-700 flex items-center">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Your complaint is being processed. The maintenance team will contact you soon.
                </p>
              </div>
            )}
            
            {complaint.status === 'Resolved' && !compact && (
              <div className="mt-2 bg-green-50 p-2 rounded-md">
                <p className="text-xs text-green-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 inline mr-1" />
                  This issue has been resolved. If you're still facing problems, please follow up.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {compact && complaints.length > 3 && (
        <div className="text-center">
          <Button variant="outline" size="sm" onClick={() => navigate('/complaints')}>
            View All Complaints ({complaints.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
