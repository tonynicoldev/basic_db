const express = require('express');
const app = express();
const mysql = require('mysql2');    // V2 as using the new authentication in MySql
const PORT = 3000

let conStr = {
  host: 'localhost',
  user: 'tony',
  password: 'tony',
  database: 'test',
}

const db = mysql.createConnection(conStr);

db.connect((err) => {
  if (err) {
    console.log(`Failed to connect to MySQL database: ${conStr.database}`);
    process.exit(1);
  } else
    console.log(`Connected to MySQL database: ${conStr.database}`);
})

app.get('/', (req, res) => {
  const sql = `select *  from name`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(`Database error: ${err.message}`);
      res.sendStatus(500); // Database error. This shouldn't happen
    } else {
      res.json(results);
    }
  })
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

