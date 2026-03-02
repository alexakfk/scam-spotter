# Scam Spotter

A standalone web application that analyzes text messages for common scam indicators and provides a graduated risk assessment with educational explanations.

## Overview

Users paste a suspicious message into the app, and the analysis engine checks it against a comprehensive set of heuristic patterns derived from SMS phishing research. The system returns:

- **Scam likelihood percentage** (0–99%) with a visual risk meter
- **Risk level** (Safe / Low Risk / Moderate Risk / High Risk / Critical Risk)
- **Detected indicators** with severity ratings and descriptions
- **Educational tips** tailored to the specific scam patterns found

## Architecture

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Express
- **Analysis Engine**: Multi-category heuristic pattern matching with composite scoring

### Detection Categories

| Category | Examples |
|---|---|
| Urgency & Pressure | "act now", "account will be suspended", "expires today" |
| Financial Request | "unpaid toll", "gift card payment", "balance due" |
| Personal Information | "verify your identity", "enter your SSN" |
| Suspicious URL | IP-based URLs, URL shorteners, brand impersonation in domains |
| Impersonation | USPS/FedEx, IRS, banks, Netflix, EZ-Pass |
| Threats & Intimidation | "legal action", "arrest warrant", "account compromised" |
| Prizes & Rewards | "you've won", "claim your prize", "lottery" |

### Security Measures

- **No message storage**: Messages are analyzed ephemerally and immediately discarded
- **Rate limiting**: 100 requests per 15-minute window
- **Helmet.js**: Security headers including CSP, XSS protection, clickjacking prevention
- **Input sanitization**: HTML stripping, control character removal, 5KB size limit
- **CORS restrictions**: Locked to development origins; disabled in production

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm run install-all
```

### Development

```bash
npm run dev
```

This starts both servers concurrently:
- **Client**: http://localhost:3000
- **API Server**: http://localhost:3001

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
scam-spotter/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── App.jsx           # Main app shell
│   │   └── App.css           # Styles
│   └── index.html
├── server/                   # Express backend
│   └── src/
│       ├── analysis/
│       │   ├── heuristics.js # Pattern dictionaries
│       │   ├── analyzer.js   # Analysis orchestrator
│       │   └── scorer.js     # Composite scoring engine
│       ├── middleware/
│       │   └── security.js   # Helmet, CORS, rate limiting
│       ├── routes/
│       │   └── analyze.js    # POST /api/analyze
│       └── index.js          # Server entry point
└── package.json              # Root scripts
```

## API

### `POST /api/analyze`

**Request:**
```json
{ "message": "Your EZ-Pass has an unpaid toll..." }
```

**Response:**
```json
{
  "score": 78,
  "riskLevel": "High Risk",
  "summary": "This message displays strong scam characteristics...",
  "indicators": [
    {
      "category": "Impersonation",
      "label": "Toll service impersonation",
      "description": "Toll payment scams have surged recently...",
      "severity": "high",
      "matchedText": "EZ-Pass"
    }
  ],
  "tips": ["Verify the sender by contacting the organization through official channels."],
  "categorySummary": { "impersonation": { "count": 1, "label": "Impersonation" } }
}
```

## Limitations

- Detection is based on heuristic pattern matching, not ML classification
- English-language patterns only
- Cannot detect all scam types, especially novel or conversational scams
- Not a substitute for user judgment — designed as a decision-support tool
