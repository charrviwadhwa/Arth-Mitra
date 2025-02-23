import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  HelpCircle,
  Users,
  MessageSquare 
} from 'lucide-react';

const ArthMitraHelpdesk = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    alert('Message submitted successfully!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const supportOptions = [
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Find answers to common questions'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with other ArthMitra users'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant support during business hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 flex items-center justify-center">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Contact Information Section */}
        <div className="bg-blue-600 text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact ArthMitra</h2>
            <p className="mb-6">We're here to support your business journey.</p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-4" />
                <span>support@arthmitra.in</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-4" />
                <span>+91 78787 77777</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-4" />
                <span>New Delhi, Delhi, India</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Support Options</h3>
            {supportOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-3">
                <option.icon className="mr-4 text-white" />
                <div>
                  <h4 className="font-medium">{option.title}</h4>
                  <p className="text-sm text-blue-200">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Full Name</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email Address</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Subject</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Subject</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Your Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <Send className="mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArthMitraHelpdesk;