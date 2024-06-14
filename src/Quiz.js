

import React, { useState, useEffect } from 'react';


const questions = [
  {
    question: "What is 3*4",
    options: ["12","13","15","16"],
    answer: "12",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  
];


const Quiz = () => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [score, setScore] = useState(0); 
  const [timer, setTimer] = useState(10); 
  const [showResults, setShowResults] = useState(false); 
  const [userAnswer, setUserAnswer] = useState(null); 

  
  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion(); 
    }
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1); 
    }, 1000);
    return () => clearInterval(intervalId); 
  }, [timer]);

  
  const handleAnswerClick = (option) => {
    setUserAnswer(option); 
  };

  
  const handleNextQuestion = () => {
    
    if (userAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setUserAnswer(null); 
    setTimer(10); 
    if (currentQuestionIndex < questions.length - 1) {
      
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      
      setShowResults(true);
    }
  };

  
  if (showResults) {
    return (
      <div>
        <h1>Quiz Completed</h1>
        <p>Your score is: {score} out of {questions.length}</p>
      </div>
    );
  }

  
  return (
    <div>
      <h1>Quiz</h1>
      <div>
        <h2>{questions[currentQuestionIndex].question}</h2>
        <div>
          {questions[currentQuestionIndex].options.map((option) => (
            <button key={option} onClick={() => handleAnswerClick(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p>Time remaining: {timer} seconds</p>
        <button onClick={handleNextQuestion} disabled={!userAnswer}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
