const http = require('http');
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ctf_db",
    port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const server = http.createServer((req, res) => {
  // Manually handling CORS (what the 'cors' package did)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Helper function to send JSON responses easily
  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // Route: POST /api/validate
  if (req.method === 'POST' && req.url === '/api/validate') {
    let body = '';
    
    // Manually parsing the JSON body (what express.json() did)
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const reqBody = JSON.parse(body || '{}');
        const userAnswers = reqBody.answers; 
        
        if (!Array.isArray(userAnswers)) {
          return sendJson(400, { error: 'Invalid payload' });
        }

        var sql = "select * from answers";
        con.query(sql, function(err, result) {
          if (err) {
            console.error('Database Error:', err);
            return sendJson(500, { error: 'Server error. Is MySQL running?' });
          }

          const rows = result;
          let score = 0;
          
          for (let i = 0; i < userAnswers.length; i++) {
            let userAnswer = userAnswers[i];
            
            for (let j = 0; j < rows.length; j++) {
              let dbRow = rows[j];
              
              if (userAnswer.id === dbRow.id) {
                if (userAnswer.flag) {
                  let correctFlag = dbRow.flag.toLowerCase();
                  let submittedFlag = userAnswer.flag.toLowerCase().trim();
                  
                  if (submittedFlag === correctFlag) {
                    score = score + 1;
                  }
                }
              }
            }
          }

          sendJson(200, { score: score, total: rows.length });
        });
      } catch (error) {
        console.error('Error:', error);
        sendJson(500, { error: 'Server error.' });
      }
    });

  // Route: POST /api/validate-single
  } else if (req.method === 'POST' && req.url === '/api/validate-single') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const reqBody = JSON.parse(body || '{}');
        const { id, flag } = reqBody;
        
        if (!id || flag === undefined) {
          return sendJson(400, { error: 'Invalid payload' });
        }

        var sql = "select flag from answers where id = ?";
        con.query(sql, [id], function(err, result) {
          if (err) {
            console.error('Database Error:', err);
            return sendJson(500, { error: 'Server error' });
          }

          const rows = result;

          if (rows.length === 0) {
            return sendJson(200, { correct: false });
          }

          let isCorrect = false;
          let correctFlag = rows[0].flag.toLowerCase();
          
          if (flag.toLowerCase().trim() === correctFlag) {
             isCorrect = true;
          } else {
             isCorrect = false;
          }

          sendJson(200, { correct: isCorrect });
        });
      } catch (error) {
        console.error('Error:', error);
        sendJson(500, { error: 'Server error' });
      }
    });

  // 404 Route for anything else
  } else {
    sendJson(404, { error: 'Not found' });
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
