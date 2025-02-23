import React, { useState, useEffect } from 'react';
import { Users, MapPin, Book, Store, Search, Camera } from 'lucide-react';
import CommunityMap from './MapComponent';
import { mockUsers } from './mockUsers';

const typeColors = {
  'Looking for Work': "#EF4444",
  'Teaching Skills': "#EAB308", 
  'Business': "#22C55E"
};

// Helper function to distribute points around Delhi
const distributePoints = (users) => {
  const DELHI_CENTER = { lat: 28.6139, lng: 77.2090 };
  const RADIUS = 0.1;
  
  return users.map(user => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * RADIUS;
    return {
      ...user,
      coordinates: {
        lat: DELHI_CENTER.lat + (distance * Math.cos(angle)),
        lng: DELHI_CENTER.lng + (distance * Math.sin(angle))
      }
    };
  });
};

export default function Preview() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredUser, setHoveredUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [distributedUsers, setDistributedUsers] = useState([]);

  // Calculate statistics
  const stats = {
    totalUsers: mockUsers.length,
    workers: mockUsers.filter(u => u.category === "Looking for Work").length,
    teachers: mockUsers.filter(u => u.category === "Teaching Skills").length,
    businesses: mockUsers.filter(u => u.category === "Business").length,
    verifiedUsers: mockUsers.filter(u => u.isVerified).length
  };

  // Distribute users across the map initially
  useEffect(() => {
    const distributed = distributePoints(mockUsers);
    setDistributedUsers(distributed);
  }, []);

  // Filter users based on search and type
  useEffect(() => {
    const filtered = distributedUsers.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "all" || user.category === selectedType;
      return matchesSearch && matchesType;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, selectedType, distributedUsers]);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );

  const TypeFilter = ({ icon: Icon, label, type, color }) => (
    <button
      onClick={() => setSelectedType(type)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${selectedType === type 
          ? `${color} text-white` 
          : 'bg-white text-gray-700 hover:bg-gray-50'}`}
    >
      <Icon size={20} />
      <span>{label}</span>
      <span className="ml-2 text-sm">
        ({type === "all" 
          ? mockUsers.length 
          : mockUsers.filter(u => u.category === type).length})
      </span>
    </button>
  );

  const ProfileCard = ({ user, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-md p-4 max-w-sm ${className}`}>
      <div 
        className="h-1 -mt-4 -mx-4 mb-3" 
        style={{ backgroundColor: typeColors[user.category] }}
      />
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {user.photo ? (
            <img 
              src={user.photo} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera size={24} className="text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            {user.isVerified && (
              <span className="bg-blue-100 text--800 text-xs px-2 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{user.location}</p>
          <p className="text-sm text-blue-600 mt-1">
            📱 {user.contactNo}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm"><strong>Skills:</strong></p>
        <div className="flex flex-wrap gap-1 mt-1">
          {user.skills.split(',').map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        <strong>Available:</strong> {user.availabilityDays.join(', ')}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Hours:</strong> {user.availabilityHours}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Experience:</strong> {user.experience} years
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Community Connect</h1>
          <p className="mt-2 text-gray-600">
            Find local workers, teachers, and businesses in Delhi
            ({filteredUsers.length} of {mockUsers.length} shown)
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={Users} 
            label="Total Users" 
            value={stats.totalUsers}
            color="bg-blue-500"
          />
          <StatCard 
            icon={MapPin} 
            label="Workers Available" 
            value={stats.workers}
            color="bg-red-500"
          />
          <StatCard 
            icon={Book} 
            label="Teachers" 
            value={stats.teachers}
            color="bg-yellow-500"
          />
          <StatCard 
            icon={Store} 
            label="Businesses" 
            value={stats.businesses}
            color="bg-green-500"
          />
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <TypeFilter 
              icon={Users} 
              label="All" 
              type="all" 
              color="bg-blue-500"
            />
            <TypeFilter 
              icon={MapPin} 
              label="Looking For Work" 
              type="Looking for Work" 
              color="bg-red-500"
            />
            <TypeFilter 
              icon={Book} 
              label="Teachers" 
              type="Teaching Skills" 
              color="bg-yellow-500"
            />
            <TypeFilter 
              icon={Store} 
              label="Businesses" 
              type="Business" 
              color="bg-green-500"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, skills, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Map Component */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="h-[600px] relative">
            <CommunityMap
              users={filteredUsers}
              hoveredUser={hoveredUser}
              selectedUser={selectedUser}
              onUserSelect={setSelectedUser}
              onUserHover={setHoveredUser}
            />

            {/* Hover Card */}
            {hoveredUser && !selectedUser && (
              <div 
                className="absolute pointer-events-none"
                style={{
                  left: `${hoveredUser.coordinates.lat}%`,
                  top: `${hoveredUser.coordinates.lng}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <ProfileCard user={hoveredUser} className="scale-90" />
              </div>
            )}

            {/* Selected User Card */}
            {selectedUser && (
              <div className="absolute bottom-4 right-4">
                <div className="relative">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md z-10 hover:bg-gray-100"
                  >
                    ×
                  </button>
                  <ProfileCard user={selectedUser} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
            <p className="text-gray-600">Explore service providers across Delhi with our interactive map. Filter by type and search for specific skills.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Profiles</h3>
            <p className="text-gray-600">Find trusted service providers with verified profiles. View detailed information about their skills and availability.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Advanced Search</h3>
            <p className="text-gray-600">Search by skills, location, or availability. Filter results to find exactly what you're looking for.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { Users, MapPin, Book, Store, Search, Camera } from 'lucide-react';
// import { mockUsers } from './mockUsers';


// const typeColors = {
//   'Looking for Work': "#EF4444",
//   'Teaching Skills': "#EAB308", 
//   'Business': "#22C55E"
// };

// // Helper function to distribute points across the map
// const distributePoints = (users, width, height, padding = 50) => {
//   const effectiveWidth = width - (padding * 2);
//   const effectiveHeight = height - (padding * 2);
//   const pointsPerRow = Math.ceil(Math.sqrt(users.length));
//   const cellWidth = effectiveWidth / pointsPerRow;
//   const cellHeight = effectiveHeight / pointsPerRow;

//   return users.map((user, index) => {
//     const row = Math.floor(index / pointsPerRow);
//     const col = index % pointsPerRow;
//     // Add some random offset within the cell for more natural distribution
//     const randomOffsetX = (Math.random() - 0.5) * (cellWidth * 0.5);
//     const randomOffsetY = (Math.random() - 0.5) * (cellHeight * 0.5);
    
//     return {
//       ...user,
//       coordinates: {
//         x: padding + (col * cellWidth) + (cellWidth / 2) + randomOffsetX,
//         y: padding + (row * cellHeight) + (cellHeight / 2) + randomOffsetY
//       }
//     };
//   });
// };

// export default function Preview() {
//   const [selectedType, setSelectedType] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [hoveredUser, setHoveredUser] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [distributedUsers, setDistributedUsers] = useState([]);

//   // Calculate statistics
//   const stats = {
//     totalUsers: mockUsers.length,
//     workers: mockUsers.filter(u => u.category === "Looking for Work").length,
//     teachers: mockUsers.filter(u => u.category === "Teaching Skills").length,
//     businesses: mockUsers.filter(u => u.category === "Business").length,
//     verifiedUsers: mockUsers.filter(u => u.isVerified).length
//   };

//   // Distribute users across the map initially
//   useEffect(() => {
//     const distributed = distributePoints(mockUsers, 500, 600);
//     setDistributedUsers(distributed);
//   }, []);

//   // Filter users based on search and type
//   useEffect(() => {
//     const filtered = distributedUsers.filter(user => {
//       const matchesSearch = 
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.location.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesType = selectedType === "all" || user.category === selectedType;
//       return matchesSearch && matchesType;
//     });
//     setFilteredUsers(filtered);
//   }, [searchTerm, selectedType, distributedUsers]);

//   const StatCard = ({ icon: Icon, label, value, color }) => (
//     <div className="bg-white rounded-lg p-4 shadow-sm">
//       <div className="flex items-center gap-3">
//         <div className={`${color} p-3 rounded-lg`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <div>
//           <p className="text-sm text-gray-600">{label}</p>
//           <p className="text-2xl font-semibold">{value}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const TypeFilter = ({ icon: Icon, label, type, color }) => (
//     <button
//       onClick={() => setSelectedType(type)}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
//         ${selectedType === type 
//           ? `${color} text-white` 
//           : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//     >
//       <Icon size={20} />
//       <span>{label}</span>
//       <span className="ml-2 text-sm">
//         ({type === "all" 
//           ? mockUsers.length 
//           : mockUsers.filter(u => u.category === type).length})
//       </span>
//     </button>
//   );

//   const ProfileCard = ({ user, className = "" }) => (
//     <div className={`bg-white rounded-lg shadow-md p-4 max-w-sm ${className}`}>
//       <div 
//         className="h-1 -mt-4 -mx-4 mb-3" 
//         style={{ backgroundColor: typeColors[user.category] }}
//       />
//       <div className="flex items-start gap-4">
//         <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
//           {user.photo ? (
//             <img 
//               src={user.photo} 
//               alt={user.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <Camera size={24} className="text-gray-400" />
//             </div>
//           )}
//         </div>
//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <h3 className="text-lg font-semibold">{user.name}</h3>
//             {user.isVerified && (
//               <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                 Verified
//               </span>
//             )}
//           </div>
//           <p className="text-sm text-gray-600 mt-1">{user.location}</p>
//           <p className="text-sm text-blue-600 mt-1">
//             📱 {user.contactNo}
//           </p>
//         </div>
//       </div>
//       <div className="mt-3">
//         <p className="text-sm"><strong>Skills:</strong></p>
//         <div className="flex flex-wrap gap-1 mt-1">
//           {user.skills.split(',').map((skill, index) => (
//             <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
//               {skill.trim()}
//             </span>
//           ))}
//         </div>
//       </div>
//       <p className="text-sm text-gray-600 mt-2">
//         <strong>Available:</strong> {user.availabilityDays.join(', ')}
//       </p>
//       <p className="text-sm text-gray-600">
//         <strong>Hours:</strong> {user.availabilityHours}
//       </p>
//       <p className="text-sm text-gray-600">
//         <strong>Experience:</strong> {user.experience} years
//       </p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header and Stats sections remain the same */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <h1 className="text-3xl font-bold text-gray-900">Community Connect</h1>
//           <p className="mt-2 text-gray-600">
//             Find local workers, teachers, and businesses in your area
//             ({filteredUsers.length} of {mockUsers.length} shown)
//           </p>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard 
//             icon={Users} 
//             label="Total Users" 
//             value={stats.totalUsers}
//             color="bg-blue-500"
//           />
//           <StatCard 
//             icon={MapPin} 
//             label="Workers Available" 
//             value={stats.workers}
//             color="bg-red-500"
//           />
//           <StatCard 
//             icon={Book} 
//             label="Teachers" 
//             value={stats.teachers}
//             color="bg-yellow-500"
//           />
//           <StatCard 
//             icon={Store} 
//             label="Businesses" 
//             value={stats.businesses}
//             color="bg-green-500"
//           />
//         </div>

//         {/* Search and Filters */}
//         <div className="mb-6">
//           <div className="flex flex-wrap gap-3 mb-4">
//             <TypeFilter 
//               icon={Users} 
//               label="All" 
//               type="all" 
//               color="bg-blue-500"
//             />
//             <TypeFilter 
//               icon={MapPin} 
//               label="Workers" 
//               type="Looking for Work" 
//               color="bg-red-500"
//             />
//             <TypeFilter 
//               icon={Book} 
//               label="Teachers" 
//               type="Teaching Skills" 
//               color="bg-yellow-500"
//             />
//             <TypeFilter 
//               icon={Store} 
//               label="Businesses" 
//               type="Business" 
//               color="bg-green-500"
//             />
//           </div>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search by name, skills, or location..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Map Component */}
//         <div className="bg-white rounded-lg shadow-sm p-4">
//           <div className="h-[600px] relative">
//             <svg
//               viewBox="0 0 500 600"
//               className="w-full h-full"
//             >
//               {/* Simplified India Map Path */}
//               <path
//                 d="M200,100 L300,100 L350,200 L400,250 L350,300 L300,400 L250,500 L200,550 L150,500 L100,400 L150,300 L100,250 L150,200 L200,100"
//                 fill="#e2e8f0"
//                 stroke="#cbd5e1"
//                 strokeWidth="2"
//               />
              
//               {/* User Pins */}
//               {filteredUsers.map(user => (
//                 <g
//                   key={user.id}
//                   transform={`translate(${user.coordinates.x}, ${user.coordinates.y})`}
//                   onClick={() => setSelectedUser(user)}
//                   onMouseEnter={() => setHoveredUser(user)}
//                   onMouseLeave={() => setHoveredUser(null)}
//                   className="cursor-pointer"
//                 >
//                   <circle
//                     r="8"
//                     fill={typeColors[user.category]}
//                     stroke="white"
//                     strokeWidth="2"
//                   />
//                   <circle
//                     r="12"
//                     fill={typeColors[user.category]}
//                     opacity="0.2"
//                   />
//                 </g>
//               ))}
//             </svg>

//             {/* Hover Card */}
//             {hoveredUser && !selectedUser && (
//               <div 
//                 className="absolute pointer-events-none"
//                 style={{
//                   left: `${hoveredUser.coordinates.x}px`,
//                   top: `${hoveredUser.coordinates.y}px`,
//                   transform: 'translate(-50%, -100%)'
//                 }}
//               >
//                 <ProfileCard user={hoveredUser} className="scale-90" />
//               </div>
//             )}

//             {/* Selected User Card */}
//             {selectedUser && (
//               <div className="absolute bottom-4 right-4">
//                 <div className="relative">
//                   <button
//                     onClick={() => setSelectedUser(null)}
//                     className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md z-10 hover:bg-gray-100"
//                   >
//                     ×
//                   </button>
//                   <ProfileCard user={selectedUser} />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Features section remains the same */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//               <MapPin className="w-6 h-6 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
//             <p className="text-gray-600">Explore service providers across India with our interactive map. Filter by type and search for specific skills.</p>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//               <Users className="w-6 h-6 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Verified Profiles</h3>
//             <p className="text-gray-600">Find trusted service providers with verified profiles. View detailed information about their skills and availability.</p>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//               <Search className="w-6 h-6 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Advanced Search</h3>
//             <p className="text-gray-600">Search by skills, location, or availability. Filter results to find exactly what you're looking for.</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

