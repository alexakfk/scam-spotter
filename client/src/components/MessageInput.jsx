import { useState } from 'react';

const EXAMPLES = [
  {
    label: 'Package Delivery',
    text: 'USPS: Your package could not be delivered due to an incorrect address. Please update your shipping information immediately at: http://usps-redelivery.tk/update',
  },
  {
    label: 'Toll Payment',
    text: 'EZ-Pass: You have an unpaid toll of $4.95. Pay within 24 hours to avoid a $50 late fee. Settle now: http://ezpass-pay.co/settle',
  },
  {
    label: 'Bank Alert',
    text: 'Wells Fargo Alert: Unauthorized transaction detected on your account. Your account will be suspended unless you verify your identity immediately. Click here: http://wf-secure-login.xyz/verify',
  },
  {
    label: 'Prize Winner',
    text: 'Congratulations! You\'ve been selected for a $1,000 Walmart gift card! Claim your reward now before it expires: http://bit.ly/claim-prize',
  },
  {
    label: 'Legitimate',
    text: 'Hey! Are we still on for dinner tonight at 7? Let me know if the restaurant works for you.',
  },
];

function MessageInput({ onAnalyze, onClear, isLoading }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onAnalyze(message);
    }
  };

  const handleClear = () => {
    setMessage('');
    onClear();
  };

  const handleExample = (text) => {
    setMessage(text);
  };

  return (
    <div className="input-panel">
      <h2>Analyze a Message</h2>
      <div className="privacy-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Your message is analyzed on-the-fly and is never stored or shared.
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className="message-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste a suspicious text message here..."
          maxLength={5000}
          disabled={isLoading}
          aria-label="Message to analyze"
        />
        <div className="textarea-footer">
          <span className="char-count">{message.length} / 5,000</span>
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!message.trim() || isLoading}
          >
            {isLoading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Analyzing...
              </span>
            ) : (
              'Analyze Message'
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={isLoading || !message}
          >
            Clear
          </button>
        </div>
      </form>

      <div className="examples-section">
        <div className="examples-label">Try an example</div>
        <div className="examples-grid">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              className="example-chip"
              onClick={() => handleExample(ex.text)}
              disabled={isLoading}
              type="button"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
