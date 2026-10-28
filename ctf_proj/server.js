const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ctf.db');

// Initialize DB if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY, flag TEXT)`);
  // Insert dummy data if table empty
  db.get('SELECT COUNT(*) as count FROM answers', (err, row) => {
    if (err) return console.error(err);
    if (row.count === 0) {
      const stmt = db.prepare('INSERT INTO answers (id, flag) VALUES (?, ?)');
      stmt.run(1, 'CTF{dummy1}');
      stmt.run(2, 'CTF{dummy2}');
      stmt.run(3, 'CTF{dummy3}');
      stmt.finalize();
    }
  });
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
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { answers } = JSON.parse(body || '{}');
        if (!Array.isArray(answers)) return sendJson(200, { score: 0, total: 0 });
        db.all('SELECT * FROM answers', (err, rows) => {
          if (err) return sendJson(200, { score: 0, total: 0 });
          let score = 0;
          answers.forEach(userAns => {
            const dbRow = rows.find(r => r.id === userAns.id);
            if (dbRow && userAns.flag && userAns.flag.trim().toLowerCase() === (dbRow.flag || '').toLowerCase()) {
              score++;
            }
          });
          sendJson(200, { score, total: rows.length });
        });
      } catch (e) {
        sendJson(200, { score: 0, total: 0 });
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/validate-single') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { id, flag } = JSON.parse(body || '{}');
        if (!id || flag === undefined) return sendJson(200, { correct: false });
        db.get('SELECT flag FROM answers WHERE id = ?', [id], (err, row) => {
          if (err || !row) return sendJson(200, { correct: false });
          const isCorrect = flag.trim().toLowerCase() === (row.flag || '').toLowerCase();
          sendJson(200, { correct: isCorrect });
        });
      } catch (e) {
        sendJson(200, { correct: false });
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
