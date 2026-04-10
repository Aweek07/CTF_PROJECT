export default function EndPage({ timeTaken, onBackToQuestions, finalScore }) {
  const formatTime = (ms) => {
    if (ms === null || ms === undefined) {
      return "00:00";
    }
    
    let totalSeconds = ms / 1000;
    let roundedSeconds = Math.floor(totalSeconds);
    
    let minutes = roundedSeconds / 60;
    let roundedMinutes = Math.floor(minutes);
    
    let leftoverSeconds = roundedSeconds % 60;
    
    let displayMinutes = roundedMinutes.toString();
    if (displayMinutes.length === 1) {
      displayMinutes = "0" + displayMinutes;
    }
    
    let displaySeconds = leftoverSeconds.toString();
    if (displaySeconds.length === 1) {
      displaySeconds = "0" + displaySeconds;
    }
    
    return displayMinutes + ":" + displaySeconds;
  };

  let scoreSection = null;
  if (finalScore !== null && finalScore !== undefined) {
    scoreSection = (
      <div>
        <h2 style={{ marginTop: '2rem' }}>Final Score</h2>
        <div className="time-taken">
          {finalScore.score} / {finalScore.total}
        </div>
      </div>
    );
  }

  return (
    <div className="end-section">
      <h1>_MISSION_ACCOMPLISHED_</h1>
      
      <div className="stats-box">
        <h2>Time Elapsed</h2>
        <div className="time-taken">{formatTime(timeTaken)}</div>
        
        {scoreSection}
      </div>

      <div>
        <h2>Thank You</h2>
        <p>
          Thank you for participating in this OSINT CTF. We hope you enjoyed the intuitive experience and learned something new about digital footprints.
        </p>
      </div>

      <div>
        <h2>Credits</h2>
        <ul className="tech-list" style={{ marginTop: '1rem' }}>
          <li>Smit Vartak (K075)</li>
          <li>Abheek Mahapatra (K046)</li>
          <li>Sarthak Vikas(K077)</li>
          <li>Swara Pawde (K0__)</li>
        </ul>
      </div>

      <button className="btn-large" onClick={onBackToQuestions} style={{ marginBottom: '2rem' }}>
        &lt; Back to Questions
      </button>

      <div className="disclaimer">
        <p>
          <strong>Security Awareness Notice:</strong> This exercise was designed to demonstrate how much information is publicly available and how easily it can be pieced together using perfectly legal, open-source resources. We encourage you to be mindful of your digital footprint, respect others' privacy, and always act responsibly. Stay safe online.
        </p>
      </div>
    </div>
  );
}
