import React, { useState } from 'react';
import { Building2, CreditCard, HandCoins } from 'lucide-react';

// Business Registration Form Component
const BusinessRegistrationPage = ({ onSubmit }) => {
  // ['businessName', 'registrationNumber', 'ownerName', 'email', 'businessType', 'contactNumber']
  const [formData, setFormData] = useState(['', '', '', '', '', '']);

  const handleInputChange = (index, value) => {
    setFormData(prev => {
      const newData = [...prev];
      newData[index] = value;
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationData = {
      businessName: formData[0],
      registrationNumber: formData[1],
      ownerName: formData[2],
      email: formData[3],
      businessType: formData[4],
      contactNumber: formData[5]
    };
    onSubmit(registrationData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Building2 className="mr-3 text-blue-600" /> 
          Business Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text"
            placeholder="Business Name"
            value={formData[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <input 
            type="text"
            placeholder="Registration Number"
            value={formData[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <input 
            type="text"
            placeholder="Owner Name"
            value={formData[2]}
            onChange={(e) => handleInputChange(2, e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <input 
            type="email"
            placeholder="Email"
            value={formData[3]}
            onChange={(e) => handleInputChange(3, e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <select
            value={formData[4]}
            onChange={(e) => handleInputChange(4, e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Business Type</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="llc">Limited Liability Company</option>
            <option value="corporation">Corporation</option>
          </select>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Register Business
          </button>
        </form>
      </div>
    </div>
  );
};

// Add Expense Form Component
const AddExpensePage = ({ onSubmit, onClose }) => {
  // ['description', 'amount']
  const [formData, setFormData] = useState(['', '']);

  const handleInputChange = (index, value) => {
    setFormData(prev => {
      const newData = [...prev];
      newData[index] = value;
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      description: formData[0],
      amount: parseFloat(formData[1])
    };
    onSubmit(expenseData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <CreditCard className="mr-3 text-green-600" /> 
          Add New Expense
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text"
            value={formData[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            placeholder="Expense Description"
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <input 
            type="number"
            value={formData[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            placeholder="Amount (₹)"
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <button 
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Record Expense
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

// Request Loan Form Component
const RequestLoanPage = ({ onSubmit, onClose }) => {
  // ['description', 'amount', 'interestRate']
  const [formData, setFormData] = useState(['', '', '']);

  const handleInputChange = (index, value) => {
    setFormData(prev => {
      const newData = [...prev];
      newData[index] = value;
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loanData = {
      description: formData[0],
      amount: parseFloat(formData[1]),
      interestRate: parseFloat(formData[2])
    };
    onSubmit(loanData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <HandCoins className="mr-3 text-purple-600" /> 
          Request Loan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text"
            value={formData[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            placeholder="Loan Purpose"
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <input 
            type="number"
            value={formData[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            placeholder="Loan Amount (₹)"
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <input 
            type="number"
            value={formData[2]}
            onChange={(e) => handleInputChange(2, e.target.value)}
            placeholder="Expected Interest Rate (%)"
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
          <button 
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
          >
            Submit Loan Request
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export { BusinessRegistrationPage, AddExpensePage, RequestLoanPage };