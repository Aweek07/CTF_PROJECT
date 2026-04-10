export default function Intro({ onStart }) {
  return (
    <div className="intro-section">
      <h1>_OSINT_CTF_INIT_</h1>
      
      <div>
        <h2>What are CTFs and OSINT?</h2>
        <p>
          <strong>CTF (Capture The Flag):</strong> A cybersecurity competition where participants solve challenges to find a hidden string or file called a "flag". 
        </p>
        <p>
          <strong>OSINT (Open Source Intelligence):</strong> The collection and analysis of data gathered from open sources (publicly available information) to produce actionable intelligence. In a CTF context, it means playing detective using public data scattered across the internet!
        </p>
      </div>

      <div>
        <h2>System Architecture (Tech Stack)</h2>
        <ul className="tech-list">
          <li>HTML</li>
          <li>CSS</li>
          <li>React</li>
          <li>NodeJS</li>
          <li>SQL</li>
          <li>Vue</li>
        </ul>
      </div>

      <div>
        <h2>Why This CTF is Different</h2>
        <p>
          While inspired by platforms like TryHackMe and HackTheBox, this CTF is highly innovative. We prioritize simplicity—no heavy Linux operations or complex network penetration required. It's built for the common person with intuitive and fun OSINT challenges meant to seamlessly motivate beginners into an environment of cybersecurity awareness. Accessible, straight to the point, and deeply educational.
        </p>
      </div>

      <button className="btn-large" onClick={onStart}>
        &gt; Initialize Challenges
      </button>
    </div>
  );
}
