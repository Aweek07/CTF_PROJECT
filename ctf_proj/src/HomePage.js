import React from 'react';

export default function HomePage({ onAgree }) {
  return (
    <div className="home-container" style={{ padding: '2rem', color: '#00ff41', backgroundColor: '#111' }}>
      <h1>Welcome to the Beginner Cybersecurity CTF Platform</h1>
      <p>
        Big tech companies collect your data, sell it, and give you a false sense of security by abstracting everything behind opaque services. 
        Their black‑boxes make you think you’re safe while they quietly profit from every click.
      </p>
      <p>
        A Capture The Flag (CTF) is a cybersecurity competition where participants solve challenges to find a hidden string or file called a "flag".
      </p>
      <p>
        Our aim is to demystify security, spark curiosity, and give absolute beginners a safe, hands‑on playground to learn real‑world skills.
      </p>
      <button className="btn-large" onClick={onAgree}>Agree and Continue</button>
    </div>
  );
}
