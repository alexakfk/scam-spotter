const express = require('express');
const { analyzeMessage } = require('../analysis/analyzer');
const { computeScore } = require('../analysis/scorer');

const router = express.Router();

router.post('/analyze', (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const trimmed = message.trim();
    if (trimmed.length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    if (trimmed.length > 5000) {
      return res.status(400).json({ error: 'Message exceeds maximum length of 5000 characters.' });
    }

    const sanitized = sanitizeInput(trimmed);
    const indicators = analyzeMessage(sanitized);
    const result = computeScore(indicators);

    res.json(result);
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: 'An error occurred during analysis.' });
  }
});

function sanitizeInput(text) {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .trim();
}

module.exports = router;
