import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, X, Timer, Award } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What is compound interest?",
    options: [
      "Interest earned only on the principal amount",
      "Interest earned on both principal and accumulated interest",
      "A fixed interest rate that never changes",
      "Interest paid at the end of a loan term"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Which investment typically carries the highest risk?",
    options: [
      "Government bonds",
      "Certificate of deposit",
      "Individual stocks",
      "Savings account"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "What is diversification in investing?",
    options: [
      "Putting all money in one stable stock",
      "Investing only in cryptocurrency",
      "Spreading investments across various assets",
      "Keeping all money in a savings account"
    ],
    correct: 2
  },
  {
    id: 4,
    question: "What is a credit score primarily based on?",
    options: [
      "Annual income",
      "Credit payment history",
      "Educational background",
      "Employment status"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "What is a bull market?",
    options: [
      "A market where prices are falling",
      "A market where prices are rising",
      "A market with no price changes",
      "A market for agricultural products"
    ],
    correct: 1
  }
];

const FinanceQuiz = ({ onCoinEarned }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answers, setAnswers] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const confettiInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(confettiInterval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#8b5cf6', '#d946ef']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#8b5cf6', '#d946ef']
      });
    }, 50);
  };

  const handleAnswer = useCallback((answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    
    setAnswers(prev => [...prev, {
      question: currentQuestion,
      selected: answerIndex,
      correct: questions[currentQuestion].correct,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(10);
      } else {
        setShowResults(true);
        const percentage = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
        if (percentage >= 70) {
          triggerConfetti();
          onCoinEarned(100); // Award coins for good performance
        }
      }
    }, 1000);
  }, [currentQuestion, selectedAnswer, score, onCoinEarned]);

  useEffect(() => {
    let timer;
    if (isQuizStarted && !showResults && selectedAnswer === null) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAnswer(-1); // -1 indicates timeout
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizStarted, showResults, selectedAnswer, handleAnswer]);

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setTimeLeft(10);
    setAnswers([]);
    setIsQuizStarted(true);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (!isQuizStarted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Finance Quiz Challenge</h2>
        <p className="text-gray-600 mb-8 text-center">
          Test your financial knowledge with {questions.length} questions. 
          You have 10 seconds per question. Score 70% or higher to earn coins!
        </p>
        <button
          onClick={() => setIsQuizStarted(true)}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105"
        >
          Start Quiz
        </button>
      </motion.div>
    );
  }

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
      >
        <div className="text-center mb-8">
          <Award className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-4xl font-bold text-purple-600 mb-2">
            {score} / {questions.length}
          </p>
          <p className="text-gray-600">
            You scored {percentage.toFixed(1)}%
            {percentage >= 70 && " and earned 100 coins!"}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {answers.map((answer, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${
                answer.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <p className="font-medium mb-2">{questions[answer.question].question}</p>
              <div className="flex justify-between items-center text-sm">
                <p>
                  Your answer: {questions[answer.question].options[answer.selected] || "Time out"}
                </p>
                {answer.isCorrect ? (
                  <Check className="text-green-600" />
                ) : (
                  <X className="text-red-600" />
                )}
              </div>
              {!answer.isCorrect && (
                <p className="text-sm text-gray-600 mt-2">
                  Correct: {questions[answer.question].options[answer.correct]}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={restartQuiz}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Timer and progress */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-2">
          <Timer className="text-purple-600" />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold mb-6">
        {questions[currentQuestion].question}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg transition-all transform hover:scale-102 ${
                selectedAnswer === null 
                  ? 'hover:bg-purple-50 border border-gray-200' 
                  : selectedAnswer === index
                    ? index === questions[currentQuestion].correct
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                    : index === questions[currentQuestion].correct
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinanceQuiz;