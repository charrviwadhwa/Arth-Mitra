import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Network, 
  Wallet, 
  BookOpen, 
  Award, 
  Zap,
  ArrowRight,
  HandHelping
} from 'lucide-react';

const ArthMitraPlatform = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      icon: User,
      title: 'Profile Creation',
      description: 'Personalized onboarding for workers, business owners, and educators',
      color: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      icon: Network,
      title: 'Networking Hub',
      description: 'Connect, collaborate, and grow professional relationships',
      color: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      icon: Wallet,
      title: 'Blockchain Finance',
      description: 'Secure, transparent financial management with blockchain technology',
      color: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Financial Learning',
      description: 'Interactive modules to enhance financial literacy',
      color: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      icon: Award,
      title: 'Government Support',
      description: 'Real-time updates on business growth schemes',
      color: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      icon: HandHelping,
      title: 'ArthSakhi',
      description: 'Empowering women entrepreneurs with crowdfunding and business support',
      color: 'bg-pink-100',
      textColor: 'text-pink-600'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 flex flex-col items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 flex items-center justify-center"
          >
            <Zap className="mr-4 text-orange-500" /> ArthMitra Platform
          </motion.h1>
          <p className="text-gray-600 mt-4">Empowering Small Businesses Through Technology</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)"
              }}
              className={`
                ${feature.color} p-6 rounded-2xl 
                transition-all duration-300 cursor-pointer
                transform hover:rotate-3 hover:translate-x-2
              `}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="flex items-center mb-4">
                <feature.icon 
                  className={`${feature.textColor} mr-4`} 
                  size={48} 
                />
                <h3 className={`text-xl font-semibold ${feature.textColor}`}>
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArthMitraPlatform;