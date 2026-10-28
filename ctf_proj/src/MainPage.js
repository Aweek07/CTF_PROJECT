import React from 'react';
import './MainPage.css';

const domains = [
  {
    title: 'OSINT',
    questions: 7,
    progress: 0,
    about: 'Open Source Intelligence – discover clues from public data.',
    requirements: 'Web browser, search engine.',
    teaches: 'Data gathering, analysis, privacy awareness.',
    view: 'osint',
  },
  {
    title: 'Stegano',
    questions: 5,
    progress: 0,
    about: 'Steganography – hide and find hidden data in images/audio.',
    requirements: 'Image viewer, basic hex editor.',
    teaches: 'File format analysis, hidden data extraction.',
    view: 'domain',
  },
  {
    title: 'Crypto',
    questions: 6,
    progress: 0,
    about: 'Cryptography – break simple ciphers and understand basics.',
    requirements: 'Calculator, pen & paper or online tools.',
    teaches: 'Encryption concepts, classic cipher attacks.',
    view: 'domain',
  },
  {
    title: 'Web Sec',
    questions: 8,
    progress: 0,
    about: 'Web Security – explore common web vulnerabilities.',
    requirements: 'Browser, developer tools.',
    teaches: 'XSS, CSRF, input validation.',
    view: 'domain',
  },
];

export default function MainPage({ onSelectDomain }) {
  return (
    <div className="main-container" style={{ padding: '2rem', color: '#00ff41', backgroundColor: '#111' }}>
      <h1>Choose a CTF Domain</h1>
      <div className="cards-grid">
        {domains.map((d) => (
          <div key={d.title} className="ctf-card">
            <h2>{d.title}</h2>
            <p>{d.about}</p>
            <p><strong>Questions:</strong> {d.questions}</p>
            <p><strong>Requirements:</strong> {d.requirements}</p>
            <p><strong>What you will learn:</strong> {d.teaches}</p>
            <progress max={d.questions} value={d.progress}></progress>
            <button className="btn-small" onClick={() => onSelectDomain(d.title)}>
              {d.title === 'OSINT' ? 'Start OSINT CTF' : 'View Details'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
