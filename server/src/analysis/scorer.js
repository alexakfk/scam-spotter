const EDUCATIONAL_TIPS = {
  urgency: [
    'Legitimate organizations don\'t create extreme time pressure via text.',
    'Take a moment to verify urgent claims through official channels.',
    'Scammers use urgency to prevent you from thinking critically.',
  ],
  financial: [
    'Never provide financial details in response to an unsolicited text.',
    'No legitimate company asks for payment via gift cards or cryptocurrency.',
    'Contact organizations directly through their official website for payment questions.',
  ],
  personal_info: [
    'Never share passwords, PINs, or Social Security numbers via text.',
    'Legitimate organizations won\'t ask you to verify sensitive info by text.',
    'If asked to update your information, navigate directly to the official website.',
  ],
  url: [
    'Don\'t click links in unsolicited texts. Navigate to the official website directly.',
    'Shortened URLs can hide malicious destinations.',
    'Look for misspellings in URLs — scammers use look-alike domains.',
  ],
  impersonation: [
    'Verify the sender by contacting the organization through official channels.',
    'Government agencies and the IRS never initiate contact via text.',
    'Delivery companies communicate through their official apps, not unsolicited texts.',
  ],
  threat: [
    'Legitimate organizations don\'t threaten arrest or legal action via text.',
    'Threats are designed to trigger fear. Take a breath and verify independently.',
    'Law enforcement follows formal procedures and doesn\'t threaten via SMS.',
  ],
  reward: [
    'If it sounds too good to be true, it probably is.',
    'Legitimate prizes don\'t require fees or personal information to claim.',
    'You can\'t win a contest you never entered.',
  ],
  formatting: [
    'Professional organizations use proper formatting in their communications.',
    'Aggressive formatting like ALL CAPS is often a sign of spam or scams.',
  ],
};

function computeScore(indicators) {
  if (!indicators || indicators.length === 0) {
    return {
      score: 0,
      riskLevel: 'Safe',
      summary: 'No scam indicators were detected in this message. It appears to be safe, though always exercise caution with unexpected messages from unknown senders.',
      indicators: [],
      tips: [
        'Even safe-looking messages can be deceptive. Trust your instincts.',
        'Never share sensitive information via text, even if the message seems legitimate.',
      ],
      categorySummary: {},
    };
  }

  const categories = {};
  for (const ind of indicators) {
    const key = ind.categoryKey;
    if (!categories[key]) {
      categories[key] = { indicators: [], label: ind.category };
    }
    categories[key].indicators.push(ind);
  }

  let totalRawScore = 0;
  const categorySummary = {};

  for (const [key, cat] of Object.entries(categories)) {
    const sorted = cat.indicators.sort((a, b) => b.score - a.score);
    let categoryScore = 0;
    let decay = 1.0;
    for (const ind of sorted) {
      categoryScore += ind.score * decay;
      decay *= 0.6;
    }
    const cappedScore = Math.min(categoryScore, 28);
    totalRawScore += cappedScore;
    categorySummary[key] = { count: cat.indicators.length, label: cat.label };
  }

  const numCategories = Object.keys(categories).length;
  if (numCategories >= 2) {
    totalRawScore *= 1 + (numCategories - 1) * 0.1;
  }

  const score = mapToPercentage(totalRawScore);
  const riskLevel = getRiskLevel(score);
  const summary = generateSummary(score, riskLevel, categorySummary);
  const tips = selectTips(categories);

  return {
    score,
    riskLevel,
    summary,
    indicators: indicators.sort((a, b) => b.score - a.score),
    tips,
    categorySummary,
  };
}

function mapToPercentage(rawScore) {
  if (rawScore <= 0) return 0;
  if (rawScore <= 5) return Math.round(rawScore * 3);
  if (rawScore <= 15) return Math.round(15 + (rawScore - 5) * 2.5);
  if (rawScore <= 30) return Math.round(40 + (rawScore - 15) * 2);
  if (rawScore <= 50) return Math.round(70 + (rawScore - 30) * 1);
  return Math.min(99, Math.round(90 + (rawScore - 50) * 0.3));
}

function getRiskLevel(score) {
  if (score <= 15) return 'Safe';
  if (score <= 35) return 'Low Risk';
  if (score <= 60) return 'Moderate Risk';
  if (score <= 80) return 'High Risk';
  return 'Critical Risk';
}

function generateSummary(score, riskLevel, categorySummary) {
  const categoryLabels = Object.values(categorySummary).map(c => c.label.toLowerCase());
  const listStr = formatList(categoryLabels);

  if (score <= 15) {
    return 'This message shows minimal risk indicators. While it appears mostly safe, remain cautious with unexpected messages.';
  }
  if (score <= 35) {
    return `This message contains some indicators related to ${listStr}. While not necessarily a scam, proceed with caution.`;
  }
  if (score <= 60) {
    return `This message shows moderate risk with indicators related to ${listStr}. Verify through official channels before taking any action.`;
  }
  if (score <= 80) {
    return `This message displays strong scam characteristics involving ${listStr}. We strongly advise against clicking any links or providing personal information.`;
  }
  return `This message shows critical risk with multiple strong indicators related to ${listStr}. This is very likely a scam. Do not interact with this message.`;
}

function formatList(items) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
}

function selectTips(categories) {
  const tips = [];
  for (const key of Object.keys(categories)) {
    if (EDUCATIONAL_TIPS[key]) {
      tips.push(EDUCATIONAL_TIPS[key][0]);
    }
  }
  tips.push('When in doubt, contact the supposed sender directly through their official website or phone number — never through a link in the message.');
  return tips.slice(0, 5);
}

module.exports = { computeScore };
