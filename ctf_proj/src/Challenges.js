import { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    title: "1. Geolocation Intelligence 1",
    text: "Find the name of the restaurant from the provided photo.",
    hint: "Answer is 12 alphabets.",
    links: [{ text: "Download Pizza Photo", url: "#" }]
  },
  {
    id: 2,
    title: "2. Geolocation Intelligence 2",
    text: "What city was the picture taken in? Check the photo metadata (EXIF data).",
    hint: "Answer is 6 alphabets.",
    links: [{ text: "Download Metadata Image", url: "#" }]
  },
  {
    id: 3,
    title: "3. Avatar Identification",
    text: "What is this user's avatar of? Inspect the GitHub profile and photo metadata.",
    hint: "Answer is 8 alphabets.",
    links: []
  },
  {
    id: 4,
    title: "4. Finding Contact Info",
    text: "What is his personal email address? A thorough search of the GitHub repositories might reveal it.",
    hint: "Answer contains letters and special characters (standard email format).",
    links: []
  },
  {
    id: 5,
    title: "5. Source Tracking",
    text: "What site did you find his email address on?",
    hint: "Answer is 6 alphabets.",
    links: []
  },
  {
    id: 6,
    title: "6. Cryptography",
    text: "Decipher the following binary code to unlock the next step: 01101000 01100001 01100011 01101011",
    hint: "Answer is 4 alphabets.",
    links: []
  },
  {
    id: 7,
    title: "7. The Final Flag",
    text: "Find the final flag located on the target's Instagram account.",
    hint: "Answer is 10 alphabets.",
    links: [{ text: "Go to Instagram", url: "#" }]
  }
];

export default function Challenges({ onSubmit, onBack }) {
  const [hintsVisible, setHintsVisible] = useState({});
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleHint = (id) => {
    setHintsVisible(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (id, val) => {
    let newAnswers = Object.assign({}, answers);
    newAnswers[id] = val;
    setAnswers(newAnswers);
    if (results[id] !== undefined) {
      let newResults = Object.assign({}, results);
      newResults[id] = undefined;
      setResults(newResults);
    }
  };

  const handleSingleSubmit = async (id) => {
    const flag = answers[id] || "";
    if (!flag.trim()) return;
    try {
      const res = await fetch('http://localhost:3001/api/validate-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, flag })
      });
      const data = await res.json();
      if (res.ok === false) {
        alert(data.error || "Server error.");
      } else {
        let updatedResults = Object.assign({}, results);
        updatedResults[id] = data.correct;
        setResults(updatedResults);
      }
    } catch (e) {
      alert("Failed to connect to the backend SQL server.");
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      let payload = [];
      for (let i = 0; i < QUESTIONS.length; i++) {
        let question = QUESTIONS[i];
        let answerText = "";
        
        if (answers[question.id]) {
          answerText = answers[question.id];
        }
        
        payload.push({
          id: question.id,
          flag: answerText
        });
      }
      
      const res = await fetch('http://localhost:3001/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload })
      });
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || "Server error occurred.");
      } else {
        onSubmit(data.score, data.total);
      }
    } catch (e) {
      alert("Failed to connect to the backend SQL server. Is it running?");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="challenges-section">
      <h1>_OSINT_MODULES_</h1>
      
      {QUESTIONS.map((q) => (
        <div key={q.id} className="challenge-card">
          <div className="challenge-header">
            <h3>{q.title}</h3>
            {results[q.id] === true ? (
              <span className="hint-text" style={{color: '#00ff41'}}>Status: Completed</span>
            ) : (
              <span className="hint-text">Status: Pending</span>
            )}
          </div>
          
          <p>{q.text}</p>
          
          {q.links && q.links.length > 0 && (
            <div className="link-group">
              {q.links.map((link, i) => (
                <a key={i} href={link.url} className="btn-small" style={{border: '1px solid #333', padding: '0.2rem 0.5rem', display: 'inline-block'}}>
                  [{link.text}]
                </a>
              ))}
            </div>
          )}

          <div className="challenge-controls">
            <input 
              type="text" 
              placeholder="Enter flag..." 
              autoComplete="off" 
              value={answers[q.id] || ''}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
            />
            <button className="btn-small" onClick={() => handleSingleSubmit(q.id)}>
              Submit
            </button>
            <button className="btn-small" onClick={() => toggleHint(q.id)}>
              {hintsVisible[q.id] ? "Hide Hint" : "Show Hint"}
            </button>
          </div>
          
          {results[q.id] === true && (
             <div style={{ color: '#00ff41', marginTop: '0.5rem', fontWeight: 'bold' }}>[+] Correct!</div>
          )}
          {results[q.id] === false && (
             <div style={{ color: 'red', marginTop: '0.5rem', fontWeight: 'bold' }}>[-] Incorrect</div>
          )}

          {hintsVisible[q.id] && (
            <div className="visible-hint">{q.hint}</div>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button className="btn-large" style={{ marginTop: 0, flex: 1 }} onClick={onBack} disabled={isSubmitting}>
          &lt; Go Back
        </button>
        <button className="btn-large" style={{ marginTop: 0, flex: 1 }} onClick={handleFinalSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Validating..." : "Submit Responses >"}
        </button>
      </div>
    </div>
  );
}
