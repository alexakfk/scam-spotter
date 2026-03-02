const { PATTERNS } = require('./heuristics');

function analyzeMessage(text) {
  const indicators = [];
  const seenLabels = new Set();

  for (const pattern of PATTERNS) {
    const match = text.match(pattern.regex);
    if (match && !seenLabels.has(pattern.label)) {
      seenLabels.add(pattern.label);
      indicators.push({
        category: pattern.category,
        categoryKey: pattern.categoryKey,
        label: pattern.label,
        description: pattern.description,
        score: pattern.score,
        severity: getSeverity(pattern.score),
        matchedText: match[0].substring(0, 120),
      });
    }
  }

  const structuralIndicators = analyzeStructure(text);
  for (const ind of structuralIndicators) {
    if (!seenLabels.has(ind.label)) {
      seenLabels.add(ind.label);
      indicators.push(ind);
    }
  }

  return indicators;
}

function getSeverity(score) {
  if (score <= 6) return 'low';
  if (score <= 11) return 'medium';
  return 'high';
}

function analyzeStructure(text) {
  const indicators = [];

  const letters = text.replace(/[^a-zA-Z]/g, '');
  const upperCount = (text.match(/[A-Z]/g) || []).length;
  if (letters.length > 10 && upperCount / letters.length > 0.5) {
    indicators.push({
      category: 'Formatting',
      categoryKey: 'formatting',
      label: 'Excessive capitalization',
      description: 'Messages with excessive ALL CAPS are often trying to grab your attention aggressively.',
      score: 5,
      severity: 'low',
      matchedText: null,
    });
  }

  if (/[!]{3,}|[?]{3,}/.test(text)) {
    indicators.push({
      category: 'Formatting',
      categoryKey: 'formatting',
      label: 'Excessive punctuation',
      description: 'Multiple exclamation marks or question marks are often used to create false urgency.',
      score: 4,
      severity: 'low',
      matchedText: null,
    });
  }

  const hasUrl = /https?:\/\/|www\./i.test(text);
  const wordCount = text.split(/\s+/).length;
  if (hasUrl && wordCount < 25) {
    indicators.push({
      category: 'Formatting',
      categoryKey: 'formatting',
      label: 'Short message with link',
      description: 'Scam texts are often brief messages containing just a lure and a link.',
      score: 5,
      severity: 'low',
      matchedText: null,
    });
  }

  return indicators;
}

module.exports = { analyzeMessage };
