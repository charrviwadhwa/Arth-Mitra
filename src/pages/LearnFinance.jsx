import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, BrainCircuit, Coins } from 'lucide-react';
import HustleWheel from './HustleWheel';
import ELearningPlatform from './ExploreCourses';
import FinanceQuiz from './FinanceQuiz';

const FinancialLearningHub = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalCoins, setTotalCoins] = useState(0);

  const cards = [
    {
      id: 'learn',
      title: 'Learn About Finance',
      description: 'Master financial concepts with interactive lessons',
      icon: BookOpen,
      color: 'from-blue-500 to-purple-600',
      component: ELearningPlatform
    },
    {
      id: 'quiz',
      title: 'Test Your Knowledge',
      description: 'Challenge yourself with financial literacy quizzes',
      icon: BrainCircuit,
      color: 'from-green-500 to-emerald-600',
      component: FinanceQuiz
    },
    {
      id: 'wheel',
      title: 'Spin the Wheel',
      description: 'Win rewards while learning financial tips',
      icon: Coins,
      color: 'from-orange-500 to-pink-600',
      component: HustleWheel
    }
  ];

  const handleCoinUpdate = (amount) => {
    setTotalCoins(prev => prev + amount);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header with Coins */}
      <div className="fixed top-0 right-0 m-4 bg-white rounded-full px-4 py-2 shadow-lg z-50 flex items-center gap-2">
        <Coins className="text-yellow-500" />
        <span className="font-bold">{totalCoins}</span>
      </div>

      <AnimatePresence mode="wait">
        {selectedCard ? (
          <motion.div
            key="component"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="container mx-auto"
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="mb-8 px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              ← Back to Menu
            </button>
            {React.createElement(cards.find(c => c.id === selectedCard).component, {
              onCoinEarned: handleCoinUpdate
            })}
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto max-w-6xl mt-20"
          >
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Financial Learning Hub
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCard(card.id)}
                  className={`cursor-pointer bg-white rounded-xl shadow-xl overflow-hidden`}
                >
                  <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinancialLearningHub;