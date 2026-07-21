const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - save a new message from the portfolio form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// GET /api/contact?key=YOUR_ADMIN_KEY - list messages (basic protection, not for production traffic)
router.get('/', async (req, res) => {
  try {
    if (req.query.key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
