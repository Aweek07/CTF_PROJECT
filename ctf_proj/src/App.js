import { useState } from 'react';
import HomePage from './HomePage';
import Onboarding from './Onboarding';
import MainPage from './MainPage';
import DomainPage from './DomainPage';
import Challenges from './Challenges';
import EndPage from './EndPage';
import './App.css';

function App() {
  const [view, setView] = useState('home'); // home, onboarding, main, domain, osint, end
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  const handleAgree = () => setView('onboarding');
  const handleOnboardingComplete = () => setView('main');
  const handleDomainContinue = (domain) => {
    // For now, show placeholder for non-OSINT domains
    alert(`${domain} CTF is under construction.`);
    setView('main');
  };
  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    if (domain === 'OSINT') {
      setView('osint'); // launch existing OSINT CTF
    } else {
      setView('domain'); // generic page for other domains
    }
  };
  const handleOsintComplete = (score, total, duration) => {
    setFinalScore({ score, total });
    setTimeTaken(duration);
    setView('end');
  };
  const handleBackToMain = () => {
    setView('main');
    setSelectedDomain(null);
  };

  // Render based on view
  if (view === 'home') {
    return <HomePage onAgree={handleAgree} />;
  }
  if (view === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }
  if (view === 'main') {
    return <MainPage onSelectDomain={handleDomainSelect} />;
  }
  if (view === 'osint') {
    return <Challenges onSubmit={handleOsintComplete} />;
  }
  if (view === 'domain') {
    return (
      <DomainPage
        domain={selectedDomain}
        onBack={handleBackToMain}
        onContinue={handleDomainContinue}
      />
    );
  }
  if (view === 'end') {
    return (
      <EndPage
        timeTaken={timeTaken}
        finalScore={finalScore}
        onBackToQuestions={() => setView('osint')}
      />
    );
  }
  return null;
}

export default App;
