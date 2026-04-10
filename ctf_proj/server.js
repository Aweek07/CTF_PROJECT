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
  console.log("Connected!");
});

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'POST' && req.url === '/api/validate') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const reqBody = JSON.parse(body || '{}');
        const userAnswers = reqBody.answers; 
        
        if (!Array.isArray(userAnswers)) {
          return sendJson(200, { score: 0, total: 0 });
        }

        var sql = "select * from answers";
        con.query(sql, function(err, result) {
          if (err) return sendJson(200, { score: 0, total: 0 });

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
        sendJson(200, { score: 0, total: 0 });
      }
    });

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
          return sendJson(200, { correct: false });
        }

        var sql = "select flag from answers where id = ?";
        con.query(sql, [id], function(err, result) {
          if (err) return sendJson(200, { correct: false });

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
        sendJson(200, { correct: false });
      }
    });

  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
