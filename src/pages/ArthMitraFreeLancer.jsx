import React, { useState } from 'react';
import { Search, Star, Briefcase, Heart, MessageCircle, Award, CheckCircle, Users, CreditCard } from 'lucide-react';

const ArthMitraFreeLancer = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'tiffin', name: 'Tiffin Service', count: 234 },
    { id: 'pickles', name: 'Homemade Pickles & Papads', count: 156 },
    { id: 'snacks', name: 'Homemade Snacks', count: 189 },
    { id: 'candles', name: 'Handmade Candles & Soaps', count: 92 },
    { id: 'tailoring', name: 'Boutique & Tailoring', count: 167 },
    { id: 'jewelry', name: 'Handmade Jewelry', count: 145 },
    { id: 'flowers', name: 'Flower Decoration', count: 78 },
    { id: 'beauty', name: 'Herbal Beauty Products', count: 112 },
    { id: 'mehendi', name: 'Mehendi Design', count: 89 },
    { id: 'gardening', name: 'Home Gardening', count: 94 }
  ];

  const featuredFreelancers = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Tiffin Service Provider",
      rating: 4.9,
      reviews: 56,
      skills: ["North Indian", "South Indian", "Diet Meals"],
      verified: true,
      projects: 78,
      image: "https://img.freepik.com/premium-psd/woman-with-necklace-her-neck_1322068-14224.jpg",
      price: 2500
    },
    {
      id: 2,
      name: "Deepa Patel",
      role: "Handmade Jewelry Artist",
      rating: 4.8,
      reviews: 42,
      skills: ["Traditional", "Modern", "Custom Design"],
      verified: true,
      projects: 45,
      image: "https://img.freepik.com/premium-psd/smiling-indian-female-farmer-with-thumb-up-isolated-transparent-background_1080455-12841.jpg",
      price: 1800
    },
    {
      id: 3,
      name: "Anjali Gupta",
      role: "Mehendi Artist",
      rating: 4.7,
      reviews: 38,
      skills: ["Bridal", "Arabic", "Indo-Western"],
      verified: true,
      projects: 62,
      image: "https://img.freepik.com/premium-photo/mature-beautiful-indian-woman-against-brown-wall_251136-7805.jpg",
      price: 3000
    }
  ];

  const [filteredFreelancers, setFilteredFreelancers] = useState(featuredFreelancers);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = featuredFreelancers.filter(freelancer => 
      freelancer.name.toLowerCase().includes(query.toLowerCase()) ||
      freelancer.role.toLowerCase().includes(query.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredFreelancers(filtered);
  };

  // Simulated Razorpay payment
  const handlePayment = (amount, freelancerId) => {
    const options = {
      key: "rzp_test_YOUR_KEY_HERE", // Replace with your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "ArthMitra",
      description: "Service Payment",
      handler: function(response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#2563eb"
      }
    };

    const paymentWindow = new Window();
    paymentWindow.rzp1 = new Razorpay(options);
    paymentWindow.rzp1.open();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for services, skills, or entrepreneurs..."
            className="w-full px-6 py-4 rounded-full border-2 border-blue-200 focus:border-blue-500 focus:outline-none shadow-md"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-500" />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {categories.map(category => (
          <div 
            key={category.id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-blue-100"
          >
            <h3 className="font-semibold text-blue-800">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.count} entrepreneurs</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Featured Entrepreneurs */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Featured Entrepreneurs</h2>
          <div className="space-y-6">
            {filteredFreelancers.map(freelancer => (
              <div key={freelancer.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <img
                    src={freelancer.image}
                    alt={freelancer.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{freelancer.name}</h3>
                      {freelancer.verified && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{freelancer.role}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        {freelancer.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {freelancer.reviews} reviews
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {freelancer.projects} projects
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {freelancer.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-3">
                      ₹{freelancer.price} /month
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                      onClick={() => handlePayment(freelancer.price, freelancer.id)}
                    >
                      <CreditCard className="w-4 h-4 inline-block mr-2" />
                      Pay Now
                    </button>
                    <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats & Quick Actions */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Platform Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">5,000+</p>
                  <p className="text-gray-600">Active Entrepreneurs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">12,000+</p>
                  <p className="text-gray-600">Orders Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">4.8/5</p>
                  <p className="text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Start Your Business Journey</h3>
            <p className="mb-6">Join our community of successful women entrepreneurs and start your business today!</p>
            <button className="w-full bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Register Your Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArthMitraFreeLancer;