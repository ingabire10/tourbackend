import express from "express";
import mongoose from "mongoose";
import signup from './routes/register.js';
import signin from './routes/signin.js';
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const DATABASE_URL = "mongodb+srv://munyeshuri:Munyeshuri@cluster0.yqd0pr4.mongodb.net/mydatabase?retryWrites=true&w=majority";

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

// Connect to MongoDB
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Initialize Express app
const app = express();
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/signup", signup);
app.use("/api/v1/signin", signin);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server running at http://localhost:${port}');
});