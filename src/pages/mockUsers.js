export let mockUsers = [
  {
    id: 1,
    photo: null,
    name: 'Rajesh Kumar',
    age: 32,
    gender: 'male',
    category: 'Looking for Work',
    skills: 'Plumber',
    location: 'Delhi',
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availabilityHours: '9 AM - 6 PM',
    experience: 5,
    contactNo: '9876543210',
    address: '123, ABC Colony, Delhi',
    isVerified: true
  },
  {
    id: 2,
    photo: null,
    name: 'Sunita Sharma',
    age: 28,
    gender: 'female',
    category: 'Business',
    skills: 'Stitching',
    location: 'Delhi',
    availabilityDays: ['Monday', 'Wednesday', 'Friday'],
    availabilityHours: '10 AM - 4 PM',
    experience: 3,
    contactNo: '9123456789',
    address: '45, Market Road, Delhi',
    isVerified: true
  },
  {
    id: 3,
    photo: null,
    name: 'Aman Verma',
    age: 40,
    gender: 'male',
    category: 'Teaching Skills',
    skills: 'Carpenter',
    location: 'Delhi',
    availabilityDays: ['Tuesday', 'Thursday', 'Saturday'],
    availabilityHours: '11 AM - 5 PM',
    experience: 10,
    contactNo: '9234567890',
    address: '78, Workshop Lane, Delhi',
    isVerified: false
  },
  {
    id: 4,
    photo: null,
    name: 'Neha Singh',
    age: 35,
    gender: 'female',
    category: 'Looking for Work',
    skills: 'Beautician',
    location: 'Delhi',
    availabilityDays: ['Monday', 'Tuesday', 'Friday'],
    availabilityHours: '9 AM - 3 PM',
    experience: 4,
    contactNo: '9345678901',
    address: '23, Mall Road, Delhi',
    isVerified: true
  },
  {
    id: 5,
    photo: null,
    name: 'Vikas Tiwari',
    age: 30,
    gender: 'male',
    category: 'Business',
    skills: 'Mehndi Artist',
    location: 'Delhi',
    availabilityDays: ['Wednesday', 'Thursday', 'Sunday'],
    availabilityHours: '12 PM - 8 PM',
    experience: 6,
    contactNo: '9456789012',
    address: '88, Artist Colony, Delhi',
    isVerified: false
  },
  {
    id: 6,
    photo: null,
    name: 'Kavita Mehra',
    age: 29,
    gender: 'female',
    category: 'Self-Employed',
    skills: 'Baking',
    location: 'Delhi',
    availabilityDays: ['Monday', 'Wednesday', 'Saturday'],
    availabilityHours: '8 AM - 2 PM',
    experience: 5,
    contactNo: '9561234789',
    address: '14, Baker Street, Delhi',
    isVerified: true
  },
  {
    id: 7,
    photo: null,
    name: 'Ramesh Gupta',
    age: 45,
    gender: 'male',
    category: 'Looking for Work',
    skills: 'Electrician',
    location: 'Delhi',
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    availabilityHours: '9 AM - 7 PM',
    experience: 15,
    contactNo: '9876123450',
    address: '67, Power Street, Delhi',
    isVerified: true
  },
  {
    id: 8,
    photo: null,
    name: 'Priya Kapoor',
    age: 26,
    gender: 'female',
    category: 'Freelancer',
    skills: 'Graphic Designer',
    location: 'Delhi',
    availabilityDays: ['Monday', 'Thursday', 'Friday'],
    availabilityHours: '10 AM - 6 PM',
    experience: 4,
    contactNo: '9812345678',
    address: '32, Creative Lane, Delhi',
    isVerified: false
  },
  {
    id: 9,
    photo: null,
    name: 'Anil Sharma',
    age: 37,
    gender: 'male',
    category: 'Business',
    skills: 'Tailor',
    location: 'Delhi',
    availabilityDays: ['Tuesday', 'Wednesday', 'Saturday'],
    availabilityHours: '9 AM - 5 PM',
    experience: 12,
    contactNo: '9976543210',
    address: '55, Fabric Market, Delhi',
    isVerified: true
  },
  {
    id: 10,
    photo: null,
    name: 'Meera Chopra',
    age: 31,
    gender: 'female',
    category: 'Looking for Work',
    skills: 'Content Writing',
    location: 'Delhi',
    availabilityDays: ['Monday', 'Wednesday', 'Friday'],
    availabilityHours: '10 AM - 4 PM',
    experience: 6,
    contactNo: '9876543211',
    address: '12, Writers Lane, Delhi',
    isVerified: false
  }
];
  export const addUser = (user) => {
    const newUser = {
      ...user,
      id: mockUsers.length + 1,
      isVerified: false
    };
    mockUsers.push(newUser);
    return newUser;
  };
  
  export const updateUser = (userId, updatedData) => {
    const index = mockUsers.findIndex(user => user.id === userId);
    if (index !== -1) {
      mockUsers[index] = {
        ...mockUsers[index],
        ...updatedData
      };
      return mockUsers[index];
    }
    return null;
  };
  
  export const getUser = (userId) => {
    return mockUsers.find(user => user.id === userId);
  };
  