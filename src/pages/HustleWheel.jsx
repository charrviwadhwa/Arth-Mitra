import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Users, Video, MessageCircle, DollarSign, TrendingUp } from 'lucide-react';

const challenges = [
  {
    title: "Quick Sale Challenge",
    description: "Sell anything for ₹10 today",
    icon: DollarSign,
    reward: "Sales Badge",
    points: 50,
    color: "from-blue-400 to-blue-500"
  },
  {
    title: "Marketing Sprint",
    description: "Market your business in 3 WhatsApp groups",
    icon: MessageCircle,
    reward: "Marketing Pro Badge",
    points: 40,
    color: "from-purple-400 to-purple-500"
  },
  {
    title: "Pitch Perfect",
    description: "Upload a video pitching your business idea",
    icon: Video,
    reward: "Pitch Master Badge",
    points: 60,
    color: "from-red-400 to-red-500"
  },
  {
    title: "Customer Connect",
    description: "Talk to 5 customers today",
    icon: Users,
    reward: "Customer Expert Badge",
    points: 45,
    color: "from-green-400 to-green-500"
  },
  {
    title: "Growth Hack",
    description: "Implement one growth strategy today",
    icon: TrendingUp,
    reward: "Growth Hacker Badge",
    points: 55,
    color: "from-yellow-400 to-yellow-500"
  }
];

const HustleWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [canSpin, setCanSpin] = useState(true);

  const spinWheel = () => {
    if (!canSpin) return;
    
    setSpinning(true);
    setCanSpin(false);
    
    // Enhanced spinning physics
    const minSpins = 5; // Minimum number of full rotations
    const maxSpins = 8; // Maximum number of full rotations
    const baseSpeed = 2; // Base rotation speed
    
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const stopAngle = Math.random() * 360;
    const totalRotation = spins * 360 + stopAngle;
    
    setCurrentRotation(prevRotation => prevRotation + totalRotation);
    
    setTimeout(() => {
      const selectedIndex = Math.floor(
        (totalRotation % 360) / (360 / challenges.length)
      );
      setSelectedChallenge(challenges[selectedIndex]);
      setSpinning(false);
    }, 4000); // Longer spin time for smoother animation
  };

  const completeChallenge = () => {
    if (!selectedChallenge) return;
    setPoints(prev => prev + selectedChallenge.points);
    setBadges(prev => [...prev, selectedChallenge.reward]);
    setCompletedChallenges(prev => prev + 1);
    setSelectedChallenge(null);
    setCanSpin(true);
    onCoinEarned(100); // Add this line to update main component coins
  };

  return (
    <div className="w-full max-w-15xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Dare to Hustle</h1>
        <p className="text-gray-600">Spin the wheel for your next entrepreneurial challenge!</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Enhanced Wheel Section */}
        <div className="flex-1 relative">
          <div className="relative w-50 h-50 mx-auto">
            {/* Outer ring decoration */}
            <div className="absolute inset-0 rounded-full border-8 border-purple-600 opacity-20" />
            
            {/* Main wheel */}
            <div 
              className="absolute inset-2 rounded-full shadow-2xl transition-all duration-[4000ms] ease-out"
              style={{ 
                transform: `rotate(${currentRotation}deg)`,
                transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)"
              }}
            >
              {challenges.map((challenge, index) => {
                const rotation = (360 / challenges.length) * index;
                const Icon = challenge.icon;
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Segment */}
                    <div 
                      className={`absolute w-1/2 h-full right-1/2 origin-right 
                                bg-gradient-to-r ${challenge.color} 
                                transform -translate-y-1/2`}
                      style={{
                        clipPath: `polygon(0 50%, 100% 0, 100% 100%)`,
                        transformOrigin: '100% 50%'
                      }}
                    >
                      {/* Icon */}
                      <div 
                        className="absolute left-1/4 top-1/2 -translate-y-1/2 text-white"
                        style={{ transform: `rotate(${-rotation}deg)` }}
                      >
                        <Icon size={24} />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Center decoration */}
              <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-6 h-6 bg-red-500 rotate-45 transform origin-center shadow-lg" />
            </div>
          </div>
        </div>

        {/* Stats & Challenge Section */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6 backdrop-blur-lg bg-opacity-90">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{points}</p>
                <p className="text-sm text-gray-600">Points</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{badges.length}</p>
                <p className="text-sm text-gray-600">Badges</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{completedChallenges}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>

            {selectedChallenge ? (
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                <h3 className="text-xl font-bold mb-2">{selectedChallenge.title}</h3>
                <p className="text-gray-600 mb-4">{selectedChallenge.description}</p>
                <button
                  onClick={completeChallenge}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-md"
                >
                  Complete Challenge
                </button>
              </div>
            ) : (
              <button
                onClick={spinWheel}
                disabled={spinning || !canSpin}
                className={`w-full py-4 px-6 rounded-full text-white font-bold transition-all transform hover:scale-105 shadow-md ${
                  canSpin 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {spinning ? 'Spinning...' : 'Spin the Wheel!'}
              </button>
            )}
          </div>

          {/* Enhanced Badges Display */}
          <div className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg bg-opacity-90">
            <h3 className="text-lg font-bold mb-4 text-purple-800">Your Badges</h3>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2"
                >
                  <Medal className="w-4 h-4" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HustleWheel;