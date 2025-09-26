
import express from 'express';
import dotenv from 'dotenv'; 
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';

dotenv.config();

const app = express();
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))
const __dirname = path.resolve();


const PORT = process.env.PORT || 3000;

app.use(express.json({limit:'5mb'})); // re.body parser for JSON
app.use(cookieParser()); // for parsing cookies


app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Get ready for deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Adjust the path as necessary
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // Adjust the path as necessary
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
    connectDB();
});

