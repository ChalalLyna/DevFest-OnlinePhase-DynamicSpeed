const express = require('express');
const mysql = require('mysql2/promise'); // Use promise-based MySQL2
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true // If you need to allow cookies or other credentials
}));


// Database connection configuration
const dbConfig = {
    host: 'localhost', // Your database host
    user: 'root',      // Your database username
    password: 'thaalibiya', // Your database password
    database: 'dynamicspeed' // Your database name
};

// Login route for Admin
app.post('/login', async (req, res) => {
    console.log("Received login request:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' });
    }
   
    try {
        // Connect to the database
        const connection = await mysql.createConnection(dbConfig);

        // Query to find the admin user by email and password
        const [rows] = await connection.execute('SELECT * FROM Admin WHERE email = ? AND password = ?', [email, password]);

        if (rows.length > 0) {
            // Admin found, send a success message
            return res.json({ message: 'Login successful', admin: { id: rows[0].id, email: rows[0].email } });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all Clients
app.get('/clients', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [clients] = await connection.execute('SELECT * FROM Client');
        res.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to create a new Client
app.post('/clients', async (req, res) => {
    const { ipAddress, status, name } = req.body;

    if (!ipAddress || !status || !name) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute('INSERT INTO Client (ipAddress, status, name) VALUES (?, ?, ?)', [ipAddress, status, name]);
        res.status(201).json({ id: result.insertId, ipAddress, status, name });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all Bandwidth records
app.get('/bandwidth', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [bandwidthRecords] = await connection.execute('SELECT * FROM Bandwidth');
        res.json(bandwidthRecords);
    } catch (error) {
        console.error('Error fetching bandwidth records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to create a new Bandwidth record
app.post('/bandwidth', async (req, res) => {
    const { bandwidthLimit, bandwidthRequested, connectionSpeed, clientId } = req.body;

    if (!bandwidthLimit || !bandwidthRequested || !connectionSpeed || !clientId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute('INSERT INTO Bandwidth (bandwidthLimit, bandwidthRequested, connectionSpeed, clientId) VALUES (?, ?, ?, ?)', [bandwidthLimit, bandwidthRequested, connectionSpeed, clientId]);
        res.status(201).json({ id: result.insertId, bandwidthLimit, bandwidthRequested, connectionSpeed, clientId });
    } catch (error) {
        console.error('Error creating bandwidth record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
