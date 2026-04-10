export default function EndPage({ timeTaken, onBackToQuestions }) {
  // Format milliseconds into mm:ss
  const formatTime = (ms) => {
    if (!ms) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="end-section">
      <h1>_MISSION_ACCOMPLISHED_</h1>
      
      <div className="stats-box">
        <h2>Time Elapsed</h2>
        <div className="time-taken">{formatTime(timeTaken)}</div>
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
          <li>Author 1 [Placeholder]</li>
          <li>Author 2 [Placeholder]</li>
          <li>Author 3 [Placeholder]</li>
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
