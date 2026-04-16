import { useState } from 'react';

export default function Challenges(props) {
  // My variables for the app state
  let [hintsVisible, setHintsVisible] = useState({});
  let [answers, setAnswers] = useState({});
  let [results, setResults] = useState({});
  let [isSubmitting, setIsSubmitting] = useState(false);

  // function to show or hide hint when button is clicked
  function toggleHint(id) {
    let newHints = Object.assign({}, hintsVisible);
    if (newHints[id] === true) {
      newHints[id] = false; // hide the hint
    } else {
      newHints[id] = true; // show the hint
    }
    setHintsVisible(newHints);
  }

  // function to save what user types in the text box
  function handleInputChange(id, val) {
    let newAnswers = Object.assign({}, answers);
    newAnswers[id] = val; // save the text
    setAnswers(newAnswers);
    
    // clear result if they change answer
    if (results[id] !== undefined) {
      let newResults = Object.assign({}, results);
      newResults[id] = undefined;
      setResults(newResults);
    }
  }

  // function to check one answer with the server
  function handleSingleSubmit(id) {
    let flag = answers[id];
    
    // if flag is nothing, do nothing
    if (flag === undefined || flag === "") {
      return; 
    }
    
    // send data to backend API
    fetch('http://localhost:3001/api/validate-single', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, flag: flag })
    })
    .then(function(response) {
      return response.json().then(function(data) {
        if (response.ok === false) {
          alert(data.error);
        } else {
          let updatedResults = Object.assign({}, results);
          updatedResults[id] = data.correct;
          setResults(updatedResults);
        }
      });
    })
    .catch(function(error) {
      alert("Failed to connect to the backend SQL server.");
    });
  }

  // function to submit all answers at the end
  function handleFinalSubmit() {
    setIsSubmitting(true);
    
    // make array of answers to send
    let payload = [];
    
    // Manually add all 7 answers
    payload.push({ id: 1, flag: answers[1] !== undefined ? answers[1] : "" });
    payload.push({ id: 2, flag: answers[2] !== undefined ? answers[2] : "" });
    payload.push({ id: 3, flag: answers[3] !== undefined ? answers[3] : "" });
    payload.push({ id: 4, flag: answers[4] !== undefined ? answers[4] : "" });
    payload.push({ id: 5, flag: answers[5] !== undefined ? answers[5] : "" });
    payload.push({ id: 6, flag: answers[6] !== undefined ? answers[6] : "" });
    payload.push({ id: 7, flag: answers[7] !== undefined ? answers[7] : "" });
    
    // send everything to backend
    fetch('http://localhost:3001/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: payload })
    })
    .then(function(response) {
      return response.json().then(function(data) {
        if (response.ok === false) {
          alert("Server error occurred.");
        } else {
          // send score back to parent
          props.onSubmit(data.score, data.total);
        }
        setIsSubmitting(false); // hide loading
      });
    })
    .catch(function(error) {
      alert("Failed to connect to the backend SQL server. Is it running?");
      setIsSubmitting(false); // hide loading
    });
  }

  let submitButtonText = "Submit Responses >";
  if (isSubmitting === true) {
    submitButtonText = "Validating...";
  }

  // the final html returned to draw on the screen
  return (
    <div className="challenges-section">
      <h1>_OSINT_MODULES_</h1>
      
      <div style={{ backgroundColor: '#111', padding: '16px', border: '1px dashed #00ff41', marginBottom: '32px' }}>
        <h3 style={{ marginTop: '0' }}>RULES FOR THE CTF</h3>
        <ul style={{ margin: '0', paddingLeft: '24px' }}>
          <li>Do not perform any active attacks (e.g., SQLi, DDoS, Flag Bruteforcing) as this is a simple beginner friendly browser based OSINT ctf.</li>
          <li>All necessary information is publicly available using Open Source Intelligence. Use your Search engine (Google, DuckDuckGo, etc.) at free will.</li>
          <li>Read the hints carefully. Flags (Answers) should be in Lower case.</li>
          <li>Hints are available for each flag.</li>
          <li>Click on submit to verify the answer for each question, the submission attempts are unlimited, but final submission (bottom of the page) will end the challenge.</li>
          <li>You will be given a single photo clue to start of the challenge in Question 1. You are supposed to find other answers which lead linearly from that single clue.</li>
          <li>ALL THE BEST! ^_^</li>
        </ul>
      </div>

      {/* Challenge 1 */}
      <div className="challenge-card">
        <div className="challenge-header">
          <h3>1. Geolocation Intelligence 1</h3>
          <span className="hint-text" style={{ color: results[1] === true ? "#00ff41" : "" }}>
            {results[1] === true ? "Status: Completed" : "Status: Pending"}
          </span>
        </div>
        
        <p>Find the name of the restaurant visited by ██████.</p>
        
        <div className="link-group">
          <a href="https://example.com/pizza_photo.jpg" target="_blank" rel="noreferrer" className="btn-small" style={{border: '1px solid #333', padding: '3px 8px', display: 'inline-block'}}>
            [Download Photo Clue]
          </a>
        </div>

        <div className="challenge-controls">
          <input 
            type="text" 
            placeholder="Enter flag..." 
            autoComplete="off" 
            value={answers[1] !== undefined ? answers[1] : ""}
            onChange={function(e) { handleInputChange(1, e.target.value) }}
          />
          <button className="btn-small" onClick={function() { handleSingleSubmit(1) }}>
            Submit
          </button>
          <button className="btn-small" onClick={function() { toggleHint(1) }}>
            {hintsVisible[1] === true ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
        
        {results[1] === true ? <div style={{ color: '#00ff41', marginTop: '8px', fontWeight: 'bold' }}>[+] Correct!</div> : null}
        {results[1] === false ? <div style={{ color: 'red', marginTop: '8px', fontWeight: 'bold' }}>[-] Incorrect</div> : null}
        {hintsVisible[1] === true ? <div className="visible-hint">Search for the Name of the restraunt visible in the photo. Answer is 12 alphabets.</div> : null}
      </div>

      {/* Challenge 2 */}
      <div className="challenge-card">
        <div className="challenge-header">
          <h3>2. Geolocation Intelligence 2</h3>
          <span className="hint-text" style={{ color: results[2] === true ? "#00ff41" : "" }}>
            {results[2] === true ? "Status: Completed" : "Status: Pending"}
          </span>
        </div>
        
        <p>What city was the picture taken in?</p>

        <div className="challenge-controls">
          <input 
            type="text" 
            placeholder="Enter flag..." 
            autoComplete="off" 
            value={answers[2] !== undefined ? answers[2] : ""}
            onChange={function(e) { handleInputChange(2, e.target.value) }}
          />
          <button className="btn-small" onClick={function() { handleSingleSubmit(2) }}>
            Submit
          </button>
          <button className="btn-small" onClick={function() { toggleHint(2) }}>
            {hintsVisible[2] === true ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
        
        {results[2] === true ? <div style={{ color: '#00ff41', marginTop: '8px', fontWeight: 'bold' }}>[+] Correct!</div> : null}
        {results[2] === false ? <div style={{ color: 'red', marginTop: '8px', fontWeight: 'bold' }}>[-] Incorrect</div> : null}
        {hintsVisible[2] === true ? <div className="visible-hint">Check the photo metadata (EXIF data) or Search it up. Answer is 6 letters.</div> : null}
      </div>

      {/* Challenge 3 */}
      <div className="challenge-card">
        <div className="challenge-header">
          <h3>3. Avatar Identification</h3>
          <span className="hint-text" style={{ color: results[3] === true ? "#00ff41" : "" }}>
            {results[3] === true ? "Status: Completed" : "Status: Pending"}
          </span>
        </div>
        
        <p>What is ███████'s Github avatar of?</p>
        
        <div className="challenge-controls">
          <input 
            type="text" 
            placeholder="Enter flag..." 
            autoComplete="off" 
            value={answers[3] !== undefined ? answers[3] : ""}
            onChange={function(e) { handleInputChange(3, e.target.value) }}
          />
          <button className="btn-small" onClick={function() { handleSingleSubmit(3) }}>
            Submit
          </button>
          <button className="btn-small" onClick={function() { toggleHint(3) }}>
            {hintsVisible[3] === true ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
        
        {results[3] === true ? <div style={{ color: '#00ff41', marginTop: '8px', fontWeight: 'bold' }}>[+] Correct!</div> : null}
        {results[3] === false ? <div style={{ color: 'red', marginTop: '8px', fontWeight: 'bold' }}>[-] Incorrect</div> : null}
        {hintsVisible[3] === true ? <div className="visible-hint">Inspect the GitHub profile from the photo metadata. Answer is 8 alphabets.</div> : null}
      </div>

      {/* Challenge 4 */}
      <div className="challenge-card">
        <div className="challenge-header">
          <h3>4. Finding Contact Info</h3>
          <span className="hint-text" style={{ color: results[4] === true ? "#00ff41" : "" }}>
            {results[4] === true ? "Status: Completed" : "Status: Pending"}
          </span>
        </div>
        
        <p>What is ███████'s personal email address?</p>
        
        <div className="challenge-controls">
          <input 
            type="text" 
            placeholder="Enter flag..." 
            autoComplete="off" 
            value={answers[4] !== undefined ? answers[4] : ""}
            onChange={function(e) { handleInputChange(4, e.target.value) }}
          />
          <button className="btn-small" onClick={function() { handleSingleSubmit(4) }}>
            Submit
          </button>
          <button className="btn-small" onClick={function() { toggleHint(4) }}>
            {hintsVisible[4] === true ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
        
        {results[4] === true ? <div style={{ color: '#00ff41', marginTop: '8px', fontWeight: 'bold' }}>[+] Correct!</div> : null}
        {results[4] === false ? <div style={{ color: 'red', marginTop: '8px', fontWeight: 'bold' }}>[-] Incorrect</div> : null}
        {hintsVisible[4] === true ? <div className="visible-hint">A thorough search of the GitHub repositories might reveal it. Answer contains letters and special characters.</div> : null}
      </div>

      {/* Challenge 5 */}
      <div className="challenge-card">
        <div className="challenge-header">
          <h3>5. Source Tracking</h3>
          <span className="hint-text" style={{ color: results[5] === true ? "#00ff41" : "" }}>
            {results[5] === true ? "Status: Completed" : "Status: Pending"}
          </span>
        </div>
        
        <p>What site did you find his email address on?</p>
        
        <div className="challenge-controls">
          <input 
            type="text" 
            placeholder="Enter flag..." 
            autoComplete="off" 
            value={answers[5] !== undefined ? answers[5] : ""}
            onChange={function(e) { handleInputChange(5, e.target.value) }}
          />
          <button className="btn-small" onClick={function() { handleSingleSubmit(5) }}>
            Submit
          </button>
          <button className="btn-small" onClick={function() { toggleHint(5) }}>
            {hintsVisible[5] === true ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
        
        {results[5] === true ? <div style={{ color: '#00ff41', marginTop: '8px', fontWeight: 'bold' }}>[+] Correct!</div> : null}
        {results[5] === false ? <div style={{ color: 'red', marginTop: '8px', fontWeight: 'bold' }}>[-] Incorrect</div> : null}
        {hintsVisible[5] === true ? <div className="visible-hint">Answer is 6 alphabets.</div> : null}
      </div>

      {/* Challenge 6 */}
      <div className="challenge-card">
        <div className="challenge-header">
          <h3>6. Cryptography</h3>
          <span className="hint-text" style={{ color: results[6] === true ? "#00ff41" : "" }}>
            {results[6] === true ? "Status: Completed" : "Status: Pending"}
          </span>
        </div>
        
        <p>Decipher the following encrypted code to unlock the next step: mnnuawx_nnwqyc</p>
        
        <div className="challenge-controls">
          <input 
            type="text" 
            placeholder="Enter flag..." 
            autoComplete="off" 
            value={answers[6] !== undefined ? answers[6] : ""}
            onChange={function(e) { handleInputChange(6, e.target.value) }}
          />
          <button className="btn-small" onClick={function() { handleSingleSubmit(6) }}>
            Submit
          </button>
          <button className="btn-small" onClick={function() { toggleHint(6) }}>
            {hintsVisible[6] === true ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
        
        {results[6] === true ? <div style={{ color: '#00ff41', marginTop: '8px', fontWeight: 'bold' }}>[+] Correct!</div> : null}
        {results[6] === false ? <div style={{ color: 'red', marginTop: '8px', fontWeight: 'bold' }}>[-] Incorrect</div> : null}
        {hintsVisible[6] === true ? <div className="visible-hint">Convert encrypted text to plaintext. Answer is 14 characters.</div> : null}
      </div>

      {/* Challenge 7 */}
      <div className="challenge-card">
        <div className="challenge-header">
          <h3>7. The Final Flag</h3>
          <span className="hint-text" style={{ color: results[7] === true ? "#00ff41" : "" }}>
            {results[7] === true ? "Status: Completed" : "Status: Pending"}
          </span>
        </div>
        
        <p>Find the final flag located on the target's Instagram account.</p>

        <div className="challenge-controls">
          <input 
            type="text" 
            placeholder="Enter flag..." 
            autoComplete="off" 
            value={answers[7] !== undefined ? answers[7] : ""}
            onChange={function(e) { handleInputChange(7, e.target.value) }}
          />
          <button className="btn-small" onClick={function() { handleSingleSubmit(7) }}>
            Submit
          </button>
          <button className="btn-small" onClick={function() { toggleHint(7) }}>
            {hintsVisible[7] === true ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
        
        {results[7] === true ? <div style={{ color: '#00ff41', marginTop: '8px', fontWeight: 'bold' }}>[+] Correct!</div> : null}
        {results[7] === false ? <div style={{ color: 'red', marginTop: '8px', fontWeight: 'bold' }}>[-] Incorrect</div> : null}
        {hintsVisible[7] === true ? <div className="visible-hint">Answer is 10 alphabets.</div> : null}
      </div>

      {/* Submit Buttons */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
        <button className="btn-large" style={{ marginTop: 0, flex: 1 }} onClick={props.onBack} disabled={isSubmitting}>
          &lt; Go Back
        </button>
        <button className="btn-large" style={{ marginTop: 0, flex: 1 }} onClick={handleFinalSubmit} disabled={isSubmitting}>
          {submitButtonText}
        </button>
      </div>
    </div>
  );
}
