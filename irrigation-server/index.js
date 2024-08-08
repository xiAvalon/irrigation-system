const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config()

const app = express();
const port = process.env.PORT || '5000';

app.use(cors({
  origin: '*',
}));
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/irrigation-system/static', express.static(path.join(__dirname, 'public')));

// Ensure the MIME type is correct for CSS files
app.use((req, res, next) => {
  if (req.path.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
  next();
});

const pool = new Pool({
  ssl: process.env.DB_SSL === "true",
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'work',
  password: process.env.DB_PASS || 'imAvalon76',
  port: process.env.DB_PORT || '5432',
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