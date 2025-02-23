import React, { useState } from 'react';
import { Search, Star, Briefcase, Heart, MessageCircle, Award, CheckCircle, Users, TrendingUp, IndianRupee, Gift } from 'lucide-react';
import ArthMitraFreeLancer from './ArthMitraFreeLancer';

const ArthSakhi = () => {
    const [activeTab, setActiveTab] = useState('discover');
    const [walletConnected, setWalletConnected] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [donationAmount, setDonationAmount] = useState('');
    const [donationMessage, setDonationMessage] = useState('');
    const [fundingRequests, setFundingRequests] = useState([
    {
        id: 1,
        name: "Meera Devi",
        business: "Handloom Crafts Enterprise",
        story: "Third-generation weaver expanding traditional crafts business",
        amount: 25000,
        raised: 18500,
        supporters: 34,
        daysLeft: 12,
        image: "https://i.pinimg.com/736x/f1/94/45/f194454b9032998f64722539a5b76641.jpg",
        tags: ["Handicrafts", "Traditional", "Women Artisans"]
    },
    {
      id: 2,
      name: "Lakshmi Singh",
      business: "Organic Food Startup",
      story: "Creating healthy snacks using local ingredients",
      amount: 35000,
      raised: 28000,
      supporters: 45,
      daysLeft: 8,
      image: "https://media.assettype.com/homegrown%2Fimport%2Fbook%2F13657-gursnpsgpl-1639472791.jpeg",
      tags: ["Food", "Organic", "Health"]
    },
    {
      id: 3,
      name: "Zara Khan",
      business: "Tech Education Initiative",
      story: "Teaching coding skills to rural women",
      amount: 40000,
      raised: 15000,
      supporters: 28,
      daysLeft: 15,
      image: "https://www.ankindia.org/images/slider/getting-girls-to-code.jpg",
      tags: ["Education", "Technology", "Rural Development"]
    }
  ]);

  const [topContributors, setTopContributors] = useState([
    { name: "Ritu Sharma", amount: 125000, projects: 12 },
    { name: "Anita Desai", amount: 98000, projects: 8 },
    { name: "Priya Mehta", amount: 85000, projects: 10 },
    { name: "Suman Reddy", amount: 76000, projects: 7 },
    { name: "Nina Patel", amount: 65000, projects: 6 }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    business: '',
    story: '',
    amount: '',
    deadline: '',
    tags: '',
    image: null
  });

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature!');
    }
  };



  // Function to handle donation submission
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    
    if (!walletConnected) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        // Request account switch in MetaMask
        const accounts = await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{
                eth_accounts: {}
            }]
        });
        
        // Get the selected account
        const selectedAccount = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        // Update wallet address
        setWalletAddress(selectedAccount[0]);
        
        // Simulate transaction (In real implementation, this would be a smart contract interaction)
        const amount = parseFloat(donationAmount);
        const updatedRequests = fundingRequests.map(request => {
            if (request.id === selectedRequest.id) {
                return {
                    ...request,
                    raised: request.raised + amount,
                    supporters: request.supporters + 1
                };
            }
            return request;
        });
        
        setFundingRequests(updatedRequests);
        
        // Reset form and close modal
        setDonationAmount('');
        setDonationMessage('');
        setShowDonationModal(false);
        setSelectedRequest(null);
        
        alert('Thank you for your contribution!');
    } catch (error) {
        console.error('Error processing donation:', error);
        alert('There was an error processing your donation. Please try again.');
    }
};

const CreateRequestForm = ({ onClose, onSubmit, show }) => {
  const [formData, setFormData] = useState(['', '', '', '', '', '', null]);

  const handleInputChange = (index, value) => {
    setFormData(prev => {
      const newData = [...prev];
      newData[index] = value;
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newRequest = {
      id: Date.now(),
      name: formData[0],
      business: formData[1],
      story: formData[2],
      amount: parseFloat(formData[3]),
      raised: 0,
      supporters: 0,
      daysLeft: Math.ceil((new Date(formData[4]) - new Date()) / (1000 * 60 * 60 * 24)),
      image: formData[6] ? URL.createObjectURL(formData[6]) : "/api/placeholder/400/200",
      tags: formData[5].split(',').map(tag => tag.trim())
    };
    
    onSubmit(newRequest);
    // Reset form data
    setFormData(['', '', '', '', '', '', null]);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6">Create Funding Request</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              value={formData[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={formData[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Story</label>
            <textarea
              value={formData[2]}
              onChange={(e) => handleInputChange(2, e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Funding Amount (₹)</label>
            <input
              type="number"
              value={formData[3]}
              onChange={(e) => handleInputChange(3, e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              min="1000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Deadline</label>
            <input
              type="date"
              value={formData[4]}
              onChange={(e) => handleInputChange(4, e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData[5]}
              onChange={(e) => handleInputChange(5, e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="e.g., Handicrafts, Traditional, Artisan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Image</label>
            <input
              type="file"
              onChange={(e) => handleInputChange(6, e.target.files[0])}
              className="w-full"
              accept="image/*"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


  const DonationModal = () => {
    if (!showDonationModal || !selectedRequest) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <h3 className="text-2xl font-bold mb-4">Support {selectedRequest.business}</h3>
                <p className="text-gray-600 mb-6">Your contribution will help {selectedRequest.name} achieve their business goals.</p>

                <form onSubmit={handleDonationSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contribution Amount (₹)
                        </label>
                        <input
                            type="number"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                            min="100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message of Support (Optional)
                        </label>
                        <textarea
                            value={donationMessage}
                            onChange={(e) => setDonationMessage(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2"
                            rows="3"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowDonationModal(false);
                                setSelectedRequest(null);
                                setDonationAmount('');
                                setDonationMessage('');
                            }}
                            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Contribute
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

  // Update the openDonationModal function
  const openDonationModal = (request) => {
    if (!walletConnected) {
        alert('Please connect your wallet first!');
        return;
    }
    setSelectedRequest(request);
    setShowDonationModal(true);
};

return (
<div className="w-full max-w-6xl mx-auto p-6">
    {/* Header */}
    <div className="text-center mb-12">
    <h1 className="text-4xl font-bold mb-4">
        <span className="text-blue-800">Arth</span> 
        <span className="text-pink-600">Sakhi</span>
    </h1>
    <p className="text-lg text-gray-600 mb-8">Empowering Women Through Business Opportunities</p>

        {/* Wallet Connection */}
        {!walletConnected ? (
        <button
        onClick={connectWallet}
        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
        >
        Connect Wallet
        </button>
    ) : (
        <div className="text-green-600 font-medium">
        Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </div>
    )}
    </div>

    
    {/* Navigation Tabs */}
    <div className="flex justify-center mb-8">
    <div className="bg-blue-100 p-1 rounded-full">
        <button
        onClick={() => setActiveTab('discover')}
        className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === 'discover' 
            ? 'bg-blue-600 text-white' 
            : 'text-blue-600 hover:bg-blue-200'
        }`}
        >
        Find Freelancers
        </button>
        <button
        onClick={() => setActiveTab('funding')}
        className={`px-6 py-2 rounded-full transition-colors ${
            activeTab === 'funding' 
            ? 'bg-blue-600 text-white' 
            : 'text-blue-600 hover:bg-blue-200'
        }`}
        >
        Support & Fund
        </button>
    </div>
    </div>

    {activeTab === 'discover' ? (
    <ArthMitraFreeLancer />
    ) : (
    <div className="flex flex-col lg:flex-row gap-8">
        {/* Funding Requests */}
        <div className="lg:w-2/3">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-pink-800">Women Owned Business Funding Requests</h2>
            <button 
            onClick={() => {
                if (!walletConnected) {
                alert('Please connect your wallet first!');
                return;
                }
                setShowCreateForm(true);
            }}
            className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
            >
            Create Request
            </button>
        </div>

        <div className="space-y-6">
            {fundingRequests.map(request => (
            <div key={request.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                <img
                    src={request.image}
                    alt={request.business}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-blue-600 font-medium">
                    {request.daysLeft} days left
                </div>
                </div>

                <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                    <h3 className="text-xl font-semibold mb-1">{request.business}</h3>
                    <p className="text-gray-600">by {request.name}</p>
                    </div>
                    <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">₹{request.raised}</p>
                    <p className="text-gray-500">of ₹{request.amount}</p>
                    </div>
                </div>

                <p className="text-gray-600 mb-4">{request.story}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {request.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                        {tag}
                    </span>
                    ))}
                </div>

                <div className="mb-4">
                    <div className="w-full bg-blue-100 rounded-full h-2">
                    <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(request.raised / request.amount) * 100}%` }}
                    />
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-600">{request.supporters} supporters</span>
                    <button 
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                    onClick={() => openDonationModal(request)}
                    >
                    Support Now
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* Top Contributors & Stats */}
        <div className="lg:w-1/3 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Top Contributors</h3>
            <div className="space-y-4">
            {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {index + 1}
                </div>
                <div className="flex-1">
                    <p className="font-medium">{contributor.name}</p>
                    <p className="text-sm text-gray-500">{contributor.projects} projects supported</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-blue-600">₹{contributor.amount}</p>
                </div>
                </div>
            ))}
            </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Community Impact</h3>
            <div className="space-y-4">
            <div className="flex items-center gap-4">
                <IndianRupee className="w-8 h-8" />
                <div>
                <p className="text-2xl font-bold">₹12.5L+</p>
                <p className="text-blue-100">Total Funds Raised</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Users className="w-8 h-8" />
                <div>
                <p className="text-2xl font-bold">250+</p>
                <p className="text-blue-100">Businesses Supported</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Gift className="w-8 h-8" />
                <div>
                <p className="text-2xl font-bold">1,500+</p>
                <p className="text-blue-100">Active Contributors</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    )}

    {/* Create Request Form Modal */}
    <CreateRequestForm
    show={showCreateForm}
    onClose={() => setShowCreateForm(false)}
    onSubmit={(newRequest) => {
      setFundingRequests(prev => [newRequest, ...prev]);
      setShowCreateForm(false); // Ensure form closes after submission
    }}
  />
    <DonationModal />
</div>
);

};
export default ArthSakhi;