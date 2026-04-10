import { useState, useEffect } from 'react';
import Intro from './Intro';
import Challenges from './Challenges';
import EndPage from './EndPage';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('intro');
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [finalScore, setFinalScore] = useState(null);

  const handleStart = () => {
    setStartTime(Date.now());
    setCurrentView('challenges');
  };

  const handleSubmit = (score, total) => {
    if (startTime) {
      setTimeTaken(Date.now() - startTime);
    }
    setFinalScore({ score, total });
    setCurrentView('end');
  };

  const handleBack = () => {
    setCurrentView('intro');
    setStartTime(null);
  };

  const handleBackToChallenges = () => {
    setCurrentView('challenges');
  };

  let contentToRender = null;
  
  if (currentView === 'intro') {
    contentToRender = <Intro onStart={handleStart} />;
  } else if (currentView === 'challenges') {
    contentToRender = <Challenges onSubmit={handleSubmit} onBack={handleBack} />;
  } else if (currentView === 'end') {
    contentToRender = <EndPage timeTaken={timeTaken} onBackToQuestions={handleBackToChallenges} finalScore={finalScore} />;
  }

  return (
    <div className="app-container">
      {contentToRender}
    </div>
  );
}

export default App;
