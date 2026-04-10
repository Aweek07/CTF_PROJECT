const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// UPDATE THESE CREDENTIALS to match your local MySQL configuration!
const dbConfig = {
  host: 'localhost',
  user: 'root', // Replace with your MySQL username if different
  password: '', // Replace with your MySQL password
  database: 'ctf_db',
  port: 3306
};

app.post('/api/validate', async (req, res) => {
  try {
    const userAnswers = req.body.answers; 
    if (!Array.isArray(userAnswers)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const connection = await mysql.createConnection(dbConfig);
    
    // Fetch all actual answers from DB
    const result = await connection.execute('SELECT * FROM answers');
    const rows = result[0];
    await connection.end();

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

    res.json({ score: score, total: rows.length });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Server error. Is MySQL running?' });
  }
});

app.post('/api/validate-single', async (req, res) => {
  try {
    const { id, flag } = req.body;
    if (!id || flag === undefined) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const connection = await mysql.createConnection(dbConfig);
    const result = await connection.execute('SELECT flag FROM answers WHERE id = ?', [id]);
    const rows = result[0];
    await connection.end();

    if (rows.length === 0) {
      return res.json({ correct: false });
    }

    let isCorrect = false;
    let correctFlag = rows[0].flag.toLowerCase();
    
    if (flag.toLowerCase().trim() === correctFlag) {
       isCorrect = true;
    } else {
       isCorrect = false;
    }

    res.json({ correct: isCorrect });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
