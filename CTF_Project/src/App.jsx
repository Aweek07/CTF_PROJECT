import { useState, useEffect } from 'react';
import Intro from './components/Intro';
import Challenges from './components/Challenges';
import EndPage from './components/EndPage';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('intro');
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  const handleStart = () => {
    setStartTime(Date.now());
    setCurrentView('challenges');
  };

  const handleSubmit = () => {
    if (startTime) {
      setTimeTaken(Date.now() - startTime);
    }
    setCurrentView('end');
  };

  const handleBack = () => {
    setCurrentView('intro');
    setStartTime(null);
  };

  const handleBackToChallenges = () => {
    setCurrentView('challenges');
  };

  return (
    <div className="app-container">
      {currentView === 'intro' && <Intro onStart={handleStart} />}
      {currentView === 'challenges' && <Challenges onSubmit={handleSubmit} onBack={handleBack} />}
      {currentView === 'end' && <EndPage timeTaken={timeTaken} onBackToQuestions={handleBackToChallenges} />}
    </div>
  );
}

export default App;
