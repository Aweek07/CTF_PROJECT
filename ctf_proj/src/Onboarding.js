import React, { useState } from 'react';

export default function Onboarding({ onComplete }) {
  const dummyQuestions = [
    { id: 1, question: 'What is the flag for the first dummy challenge?', answer: 'CTF{dummy1}' },
    { id: 2, question: 'Second dummy flag?', answer: 'CTF{dummy2}' },
    { id: 3, question: 'Third dummy flag?', answer: 'CTF{dummy3}' },
  ];
  const [answers, setAnswers] = useState({});
  const [valid, setValid] = useState(false);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const checkAll = () => {
    const allCorrect = dummyQuestions.every(q => answers[q.id]?.trim() === q.answer);
    setValid(allCorrect);
    if (allCorrect) {
      onComplete();
    } else {
      alert('Some answers are incorrect. Try again.');
    }
  };

  return (
    <div className="onboarding" style={{ padding: '2rem', color: '#00ff41', backgroundColor: '#111' }}>
      <h2>Onboarding Tutorial</h2>
      {dummyQuestions.map(q => (
        <div key={q.id} style={{ marginBottom: '1rem' }}>
          <p>{q.question}</p>
          <input
            type="text"
            placeholder="Enter flag..."
            value={answers[q.id] || ''}
            onChange={e => handleChange(q.id, e.target.value)}
          />
        </div>
      ))}
      <button className="btn-large" onClick={checkAll}>Submit Answers</button>
    </div>
  );
}
