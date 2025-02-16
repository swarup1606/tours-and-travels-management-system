const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection pool for user authentication (user_db)
const pool = mysql.createPool({
    host: 'localhost', // Your MySQL host
    user: 'root', // Your MySQL user
    password: 'swarup1109', // Your MySQL password
    database: 'user_db' // Your MySQL database for user authentication
});

// MySQL connection pool for bookings (bookings)
const bookingPool = mysql.createPool({
    host: 'localhost', // Your MySQL host
    user: 'root', // Your MySQL user
    password: 'swarup1109', // Your MySQL password
    database: 'bookings' // Your MySQL bookings database
});

// User Authentication

// Registration endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.json({ success: false, message: 'User already exists' });
        } else {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, message: 'Error hashing password' });
                    return;
                }

                pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ success: false, message: 'Error registering user' });
                    } else {
                        res.json({ success: true, message: 'User registered successfully' });
                    }
                });
            });
        }
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.json({ success: false, message: 'User not found' });
        } else {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, message: 'Error comparing password' });
                } else if (isMatch) {
                    const token = jwt.sign({ id: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
                    res.json({
                        success: true,
                        message: 'Login successful',
                        token,
                        name: user.name // Include the user's name in the response
                    });
                } else {
                    res.json({ success: false, message: 'Invalid password' });
                }
            });
        }
    });
});

// Authentication middleware for getting user data
app.get('/getUser', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid' });
        }

        const userId = decoded.id;
        pool.query('SELECT name FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error retrieving user data' });
            }

            if (results.length > 0) {
                res.json({ user_name: results[0].name }); // Send back the user's name
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    });
});

// Booking system

// Handle booking form submission
app.post('/book', (req, res) => {
    const { name, email, phone, depart, departure_date, return_date, persons } = req.body;

    // Insert the data into the booking table in the bookings database
    bookingPool.query(
        'INSERT INTO booking (name, email, phone, depart, departure_date, return_date, persons) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, phone, depart, departure_date, return_date, persons],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Failed to book ticket' });
            }

            // Return success response with the inserted data
            res.json({
                success: true,
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    depart: depart,
                    departure_date: departure_date,
                    return_date: return_date,
                    persons: persons
                }
            });
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});