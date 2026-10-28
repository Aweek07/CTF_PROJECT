import React from 'react';
import './DomainPage.css';

const domainInfo = {
  OSINT: {
    title: 'OSINT',
    description: 'Open Source Intelligence – discover clues from public data and learn how organisations track you.',
    requirements: 'Web browser, search engine, optional tools like theHarvester or Maltego.',
    teaches: 'Data gathering, privacy awareness, tracing digital footprints.',
  },
  Stegano: {
    title: 'Stegano',
    description: 'Steganography – hide and find hidden data inside images, audio or other files.',
    requirements: 'Image viewer, hex editor, online stego tools.',
    teaches: 'File format analysis, extracting hidden payloads.',
  },
  Crypto: {
    title: 'Crypto',
    description: 'Cryptography – break simple ciphers and understand fundamental encryption concepts.',
    requirements: 'Calculator, pen & paper or online crypto calculators.',
    teaches: 'Encryption basics, classic cipher attacks, key derivation.',
  },
  'Web Sec': {
    title: 'Web Sec',
    description: 'Web Security – explore common web vulnerabilities in a safe sandbox.',
    requirements: 'Browser with dev tools, optional Burp Suite Lite.',
    teaches: 'XSS, CSRF, input validation, secure coding practices.',
  },
};

export default function DomainPage({ domain, onBack, onContinue }) {
  const info = domainInfo[domain] || {};
  const handleContinue = () => {
    if (onContinue) onContinue(domain);
    else alert('Continue handler not provided');
  };

  return (
    <div className="domain-page" style={{ padding: '2rem', color: '#00ff41', backgroundColor: '#111' }}>
      <h1>{info.title} CTF Overview</h1>
      <p>{info.description}</p>
      <p><strong>Requirements:</strong> {info.requirements}</p>
      <p><strong>What you will learn:</strong> {info.teaches}</p>
      <button className="btn-small" onClick={handleContinue}>Continue</button>
      <button className="btn-small" onClick={onBack} style={{ marginLeft: '1rem' }}>Back to Main</button>
    </div>
  );
}
