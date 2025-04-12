
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define types for our data
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  hostelBlock: string;
  messPreference: string;
  joinDate: string;
  dueAmount: number;
}

export interface Complaint {
  id: string;
  studentId: string;
  title: string;
  description: string;
  category: 'Room' | 'Mess' | 'Facility' | 'Other';
  status: 'Open' | 'In Progress' | 'Resolved';
  timestamp: string;
}

export interface MessMenu {
  day: string;
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
}

interface DataContextType {
  students: Student[];
  complaints: Complaint[];
  messMenu: MessMenu[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (id: string, complaint: Partial<Complaint>) => void;
  getStudentById: (id: string) => Student | undefined;
  currentUser: Student | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data for initial state
const sampleStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    roomNumber: "A101",
    hostelBlock: "A",
    messPreference: "Vegetarian",
    joinDate: "2023-09-01",
    dueAmount: 0
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    roomNumber: "B205",
    hostelBlock: "B",
    messPreference: "Non-Vegetarian",
    joinDate: "2023-08-15",
    dueAmount: 1200
  }
];

const sampleComplaints: Complaint[] = [
  {
    id: "1",
    studentId: "1",
    title: "Water leakage in bathroom",
    description: "There is water leaking from the ceiling in the bathroom.",
    category: "Room",
    status: "In Progress",
    timestamp: "2023-10-15T10:30:00"
  }
];

const sampleMessMenu: MessMenu[] = [
  {
    day: "Monday",
    breakfast: ["Idli", "Sambar", "Chutney", "Bread", "Butter", "Fruit"],
    lunch: ["Rice", "Dal", "Vegetable Curry", "Curd", "Papad"],
    snacks: ["Tea/Coffee", "Biscuits", "Samosa"],
    dinner: ["Chapati", "Paneer Butter Masala", "Rice", "Salad", "Sweet"]
  },
  {
    day: "Tuesday",
    breakfast: ["Dosa", "Sambar", "Chutney", "Bread", "Jam", "Fruit"],
    lunch: ["Rice", "Rajma", "Mixed Veg", "Raita", "Papad"],
    snacks: ["Tea/Coffee", "Cake", "Pakora"],
    dinner: ["Chapati", "Aloo Gobi", "Rice", "Salad", "Ice Cream"]
  },
  {
    day: "Wednesday",
    breakfast: ["Poha", "Upma", "Bread", "Butter", "Boiled Egg", "Fruit"],
    lunch: ["Rice", "Dal Tadka", "Aloo Matar", "Curd", "Papad"],
    snacks: ["Tea/Coffee", "Biscuits", "Vada"],
    dinner: ["Chapati", "Chicken Curry/Paneer", "Rice", "Salad", "Custard"]
  },
  {
    day: "Thursday",
    breakfast: ["Paratha", "Curd", "Bread", "Jam", "Fruit"],
    lunch: ["Rice", "Chana Dal", "Bhindi Fry", "Raita", "Papad"],
    snacks: ["Tea/Coffee", "Sandwich", "Biscuits"],
    dinner: ["Chapati", "Mixed Veg Curry", "Rice", "Salad", "Kheer"]
  },
  {
    day: "Friday",
    breakfast: ["Puri", "Aloo Sabzi", "Bread", "Butter", "Fruit"],
    lunch: ["Rice", "Dal Fry", "Palak Paneer", "Curd", "Papad"],
    snacks: ["Tea/Coffee", "Biscuits", "Cutlet"],
    dinner: ["Chapati", "Egg Curry/Matar Paneer", "Rice", "Salad", "Halwa"]
  },
  {
    day: "Saturday",
    breakfast: ["Chole Bhature", "Bread", "Jam", "Fruit"],
    lunch: ["Rice", "Sambar", "Aloo Jeera", "Curd", "Papad"],
    snacks: ["Tea/Coffee", "Biscuits", "Patties"],
    dinner: ["Chapati", "Malai Kofta", "Rice", "Salad", "Fruit Custard"]
  },
  {
    day: "Sunday",
    breakfast: ["Uttapam", "Coconut Chutney", "Bread", "Butter", "Fruit"],
    lunch: ["Rice", "Dal Makhani", "Mixed Veg", "Raita", "Papad"],
    snacks: ["Tea/Coffee", "Biscuits", "French Fries"],
    dinner: ["Chapati", "Butter Chicken/Paneer Butter Masala", "Rice", "Salad", "Sweet"]
  }
];

// Create a provider component
export const DataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Load data from localStorage or use sample data
  const [students, setStudents] = useState<Student[]>(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : sampleStudents;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const savedComplaints = localStorage.getItem('complaints');
    return savedComplaints ? JSON.parse(savedComplaints) : sampleComplaints;
  });

  const [messMenu, setMessMenu] = useState<MessMenu[]>(() => {
    const savedMessMenu = localStorage.getItem('messMenu');
    return savedMessMenu ? JSON.parse(savedMessMenu) : sampleMessMenu;
  });

  const [currentUser, setCurrentUser] = useState<Student | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('complaints', JSON.stringify(complaints));
    localStorage.setItem('messMenu', JSON.stringify(messMenu));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [students, complaints, messMenu, currentUser]);

  // Student functions
  const addStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (id: string, updatedFields: Partial<Student>) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, ...updatedFields } : student
      )
    );

    // If the current user is being updated, update currentUser as well
    if (currentUser && currentUser.id === id) {
      setCurrentUser({ ...currentUser, ...updatedFields });
    }
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const getStudentById = (id: string) => {
    return students.find((student) => student.id === id);
  };

  // Complaint functions
  const addComplaint = (complaint: Complaint) => {
    setComplaints([...complaints, complaint]);
  };

  const updateComplaint = (id: string, updatedFields: Partial<Complaint>) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, ...updatedFields } : complaint
      )
    );
  };

  // Auth functions (simplified for local demo)
  const login = (email: string, password: string) => {
    // For demo purposes, we're not checking passwords
    const user = students.find((student) => student.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <DataContext.Provider
      value={{
        students,
        complaints,
        messMenu,
        addStudent,
        updateStudent,
        deleteStudent,
        addComplaint,
        updateComplaint,
        getStudentById,
        currentUser,
        login,
        logout
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for using the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
