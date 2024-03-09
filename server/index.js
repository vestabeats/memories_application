import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import fs from 'fs';

const app = express();
dotenv.config();

// Enable CORS
app.use(cors());

// Create a directory for file uploads
const uploadDirectory = process.cwd() + '/uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
  console.log('Upload directory created:', uploadDirectory);
}

// Set up body parser with increased payload size limit
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Define routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: '100mb' } });

// Handle file upload using multer middleware
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File uploaded and stored' });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.error(error));