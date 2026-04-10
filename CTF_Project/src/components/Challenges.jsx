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

  const toggleHint = (id) => {
    setHintsVisible(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="challenges-section">
      <h1>_OSINT_MODULES_</h1>
      
      {QUESTIONS.map((q) => (
        <div key={q.id} className="challenge-card">
          <div className="challenge-header">
            <h3>{q.title}</h3>
            <span className="hint-text">Status: Pending</span>
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
            <input type="text" placeholder="Enter flag..." autoComplete="off" />
            <button className="btn-small" onClick={() => toggleHint(q.id)}>
              {hintsVisible[q.id] ? "Hide Hint" : "Show Hint"}
            </button>
          </div>
          
          {hintsVisible[q.id] && (
            <div className="visible-hint">{q.hint}</div>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button className="btn-large" style={{ marginTop: 0, flex: 1 }} onClick={onBack}>
          &lt; Go Back
        </button>
        <button className="btn-large" style={{ marginTop: 0, flex: 1 }} onClick={onSubmit}>
          Submit Responses &gt;
        </button>
      </div>
    </div>
  );
}
