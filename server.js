// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const workRoutes = require('./routes/workRoutes');

dotenv.config();
connectDB();

const app = express();

// Apply CORS middleware first
app.use(cors({
    origin: 'http://localhost:5173', // Update this to your React app's URL
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true
}));

// Apply JSON middleware
app.use(express.json({ limit: '10000mb' }));
app.use(express.urlencoded({ limit: '10000mb', extended: true }));

// Set timeouts
app.use((req, res, next) => {
    req.setTimeout(3000000); // 5 minutes in milliseconds
    res.setTimeout(3000000); // 5 minutes in milliseconds
    next();
});

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/works', workRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));