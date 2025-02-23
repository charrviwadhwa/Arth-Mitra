
import React, { useState, useEffect } from 'react';
import { Search, Coins, CheckCircle, XCircle } from 'lucide-react';
import { modules } from '../data/modules';
import { Alert, AlertTitle, AlertDescription } from './alert/Alert';


const ELearningPlatform = () => {
  const [coins, setCoins] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [moduleProgress, setModuleProgress] = useState({});
  const [showCoinAlert, setShowCoinAlert] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleModuleClick = (moduleId) => {
    setSelectedModule(moduleId);
    setQuizFeedback({});
  };

  const handleQuizSubmit = (moduleId) => {
    const module = modules[moduleId];
    const newQuizFeedback = {};
    let allCorrect = true;

    module.quiz.forEach((q, idx) => {
      const isCorrect = quizAnswers[`${moduleId}-${idx}`] === q.correct;
      newQuizFeedback[idx] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setQuizFeedback(newQuizFeedback);

    if (allCorrect) {
      setCoins(prev => prev + 100);
      onCoinEarned(100); 
      setCompletedModules(prev => new Set([...prev, moduleId]));
      setShowCoinAlert(true);
      setTimeout(() => setShowCoinAlert(false), 3000);
    }
  };

  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" || 
     (filter === "completed" && completedModules.has(module.id)) ||
     (filter === "incomplete" && !completedModules.has(module.id)))
  );

  return (
    // <div className="max-w-6xl mx-auto p-6 relative">
    //   {/* Progress Bar */}
    //   <div 
    //     className="fixed top-0 left-0 w-full h-1 bg-green-100"
    //     style={{ zIndex: 1000 }}
    //   >
    //     <div 
    //       className="h-full transition-all duration-300"
    //       style={{ 
    //         width: `${scrollProgress}%`,
    //         backgroundColor: `rgb(${Math.floor(255 - (scrollProgress * 2.55))}, 255, ${Math.floor(255 - (scrollProgress * 2.55))})` 
    //       }}
    //     />
    //   </div>
    <div className="relative flex">
      {/* Vertical Progress Bar */}
      <div 
        className="fixed right-0 top-0 h-full w-1 bg-green-100"
        style={{ zIndex: 1000 }}
      >
        <div 
          className="w-full transition-all duration-300"
          style={{ 
            height: `${scrollProgress}%`,
            backgroundColor: `rgb(${Math.floor(255 - (scrollProgress * 2.55))}, 255, ${Math.floor(255 - (scrollProgress * 2.55))})`
          }}
        />
      </div>


      {/* Main Content - Add left padding to account for progress bar */}
      <div className="max-w-6xl mx-auto p-6 pl-8 flex-1">
      {/* Coin Earned Alert */}
      {showCoinAlert && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertTitle>Congratulations!</AlertTitle>
            <AlertDescription className="flex items-center gap-2">
              You earned 100 <Coins className="w-4 h-4 text-yellow-500" />
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Rest of the header and search components remain the same */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Financial Literacy Course</h1>
        <div className="flex items-center gap-2">
          <Coins className="text-yellow-500" />
          <span className="font-bold">{coins} coins</span>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Modules</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {selectedModule === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map(module => (
            <div
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`p-6 rounded-lg border cursor-pointer transition-shadow hover:shadow-lg ${
                completedModules.has(module.id) ? 'bg-green-50 border-green-200' : 'bg-white'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">Module {module.id}: {module.title}</h3>
              <p className="text-gray-600">{module.description}</p>
              {completedModules.has(module.id) && (
                <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  Completed
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <button
            onClick={() => setSelectedModule(null)}
            className="mb-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            ← Back to Modules
          </button>
          
          <h2 className="text-2xl font-bold">Module {selectedModule}: {modules[selectedModule].title}</h2>
          
          {modules[selectedModule].articles.map((article, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg border"
            >
              <h3 className="text-xl font-semibold mb-4">{article.title}</h3>
              <p className="text-gray-600">{article.content}</p>
            </div>
          ))}

          <div className="p-6 bg-white rounded-lg border">
            <h3 className="text-xl font-semibold mb-6">Module Quiz</h3>
            {modules[selectedModule].quiz.map((question, idx) => (
              <div key={idx} className="mb-6">
                <p className="font-medium mb-3">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, optIdx) => (
                    <label 
                      key={optIdx} 
                      className={`flex items-center space-x-2 p-2 rounded ${
                        quizFeedback[idx] !== undefined && optIdx === question.correct
                          ? 'bg-green-50'
                          : quizFeedback[idx] === false && optIdx === quizAnswers[`${selectedModule}-${idx}`]
                            ? 'bg-red-50'
                            : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={optIdx}
                        onChange={() => setQuizAnswers(prev => ({
                          ...prev,
                          [`${selectedModule}-${idx}`]: optIdx
                        }))}
                        className="form-radio"
                      />
                      <span>{option}</span>
                      {quizFeedback[idx] !== undefined && optIdx === question.correct && (
                        <CheckCircle className="w-4 h-4 text-green-600 ml-2" />
                      )}
                      {quizFeedback[idx] === false && optIdx === quizAnswers[`${selectedModule}-${idx}`] && (
                        <XCircle className="w-4 h-4 text-red-600 ml-2" />
                      )}
                    </label>
                  ))}
                </div>
                {quizFeedback[idx] === false && (
                  <p className="text-red-600 mt-2">Incorrect answer. Try again!</p>
                )}
              </div>
            ))}
            <button
              onClick={() => handleQuizSubmit(selectedModule)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {Object.keys(quizFeedback).length > 0 ? 'Try Again' : 'Submit Quiz'}
            </button>
          </div>
        </div>
      )}
    
      </div>
    </div>
  );
};

export default ELearningPlatform;