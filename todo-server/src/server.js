import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());            // allow all origins for dev
app.use(express.json());    // parse JSON bodies

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
