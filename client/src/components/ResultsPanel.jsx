import RiskMeter from './RiskMeter';
import IndicatorCard from './IndicatorCard';

function ResultsPanel({ results, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="results-panel">
        <div className="results-loading">
          <div className="loading-pulse" />
          <p>Analyzing message for scam indicators...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-panel">
        <div className="results-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results-panel">
        <div className="results-empty">
          <div className="empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3>Paste a message to analyze</h3>
          <p>We'll check it against known scam patterns and give you a detailed risk assessment.</p>
        </div>
      </div>
    );
  }

  const { score, riskLevel, summary, indicators, tips, categorySummary } = results;

  return (
    <div className="results-panel">
      <div className="results-content">
        <RiskMeter score={score} riskLevel={riskLevel} />

        <div className="results-summary">{summary}</div>

        {indicators.length > 0 && (
          <>
            <div className="results-section-title">
              Detected Indicators ({indicators.length})
            </div>
            <div className="indicators-list">
              {indicators.map((indicator, i) => (
                <IndicatorCard
                  key={`${indicator.label}-${i}`}
                  indicator={indicator}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </>
        )}

        {tips && tips.length > 0 && (
          <div className="tips-section">
            <div className="tips-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Safety Tips
            </div>
            {tips.map((tip, i) => (
              <div className="tip-item" key={i}>
                <span className="tip-bullet" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPanel;
