const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'work',
    password: 'imAvalon76',
    port: 5432,
});

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the irrigation data API!');
});

// Data retrieval route handler
  
app.get('/api/data/:date', async (req, res) => {
  const { date } = req.params;
  console.log("Date:", date);
  const tableName = `"irrigation_data_${date}"`; // Enclose table name in double quotes

  try {
    const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY id`); // Ensure data is ordered by ID
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error.stack); // Log the full error stack
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running http://0.0.0.0:${port}`);
});

// // Import required modules
// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');

// // Create Express app
// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database configuration
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'work',
//     password: 'imAvalon76',
//     port: 5432,
// });

// // Define route to fetch data
// app.get('/api/data/:date', async (req, res) => {
//   const { date } = req.params;
  
//   // Construct table name based on date
//   const tableName = `"irrigation_data_${date}"`;
  
//   try {
//     // Query database using constructed table name
//     const result = await pool.query(`SELECT * FROM ${tableName}`);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
