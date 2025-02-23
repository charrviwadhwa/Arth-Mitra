import { useState, useRef } from 'react';
import { Save, UserCheck, UserX, Camera, X } from 'lucide-react';
import { addUser } from './mockUsers';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    photo: null,
    name: '',
    age: '',
    gender: '',
    category: '',
    skills: '',
    location: '',
    availabilityDays: [],
    availabilityHours: '',
    experience: '',
    contactNo: '',
    address: '',
    isVerified: false
  });

  const [isEditing, setIsEditing] = useState(true);
  const [message, setMessage] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const predefinedSkills = [
    'Labour',
    'Plumber',
    'Carpenter',
    'Embroidery',
    'Stitching',
    'Mehndi Artist',
    'Beautician'
  ];

  const categoryOptions = [
    'Business',
    'Looking for Work',
    'Teaching Skills'
  ];

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
        setProfile(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setProfile(prev => ({
      ...prev,
      photo: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedDays = checked
        ? [...profile.availabilityDays, value]
        : profile.availabilityDays.filter(day => day !== value);
      setProfile(prev => ({
        ...prev,
        availabilityDays: updatedDays
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const saveProfile = () => {
    try {
      const savedUser = addUser(profile);
      
      if (savedUser) {
        setMessage('Profile created successfully!');
        setIsEditing(false); // Disable editing after successful save
        setProfile(savedUser); // Update profile with saved data (including ID)
      } else {
        setMessage('Error saving profile');
      }
    } catch (error) {
      setMessage('Error saving profile');
    }
  };

  const isFormValid = () => {
    return (
      profile.name &&
      profile.age &&
      profile.gender &&
      profile.category &&
      profile.skills &&
      profile.location &&
      profile.availabilityDays.length > 0 &&
      profile.availabilityHours &&
      profile.experience &&
      profile.contactNo &&
      profile.address
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                {isEditing ? 'Create Profile' : 'User Profile'}
              </h1>
              <span className="flex items-center text-gray-500">
                <UserX size={20} className="mr-1" />
                Not Verified
              </span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {message && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">
              {message}
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera size={40} className="text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2 flex space-x-2">
                    <label className="cursor-pointer p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                      <Camera size={16} />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        ref={fileInputRef}
                      />
                    </label>
                    {photoPreview && (
                      <button
                        onClick={removePhoto}
                        className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={profile.category}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <select
                  name="skills"
                  value={profile.skills}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  required
                >
                  <option value="">Select Skill</option>
                  {predefinedSkills.map(skill => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="City, State"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability Days
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {days.map(day => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="availabilityDays"
                      value={day}
                      checked={profile.availabilityDays.includes(day)}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability Hours
              </label>
              <input
                type="text"
                name="availabilityHours"
                value={profile.availabilityHours}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., 9 AM - 5 PM"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience (in years)
              </label>
              <input
                type="number"
                name="experience"
                value={profile.experience}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNo"
                value={profile.contactNo}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="3"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={saveProfile}
                  disabled={!isFormValid()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  <span>Save Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;