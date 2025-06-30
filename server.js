const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./rotes/authrout');
const adminRoutes = require('./rotes/admin');
const userRoutes = require('./rotes/user');

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://chroplex-frontend.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders:["Content-Type","Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from Chroplex Backend!');
});

// Routes
app.use('/api', authRoutes);
app.use('/adm', adminRoutes);
app.use('/usr', userRoutes);

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// Start server
connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
