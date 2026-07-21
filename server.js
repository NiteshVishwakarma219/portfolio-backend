const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Forces Google & Cloudflare DNS


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
}));
app.use(express.json());

// Simple health check - useful for Render/Railway and for your portfolio README
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio contact API is running' });
});

app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
