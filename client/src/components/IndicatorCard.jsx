function IndicatorCard({ indicator, delay = 0 }) {
  const { category, label, description, severity, matchedText } = indicator;

  return (
    <div
      className={`indicator-card severity-${severity}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="indicator-header">
        <span className="indicator-category">{category}</span>
        <span className={`severity-badge severity-${severity}`}>
          {severity}
        </span>
      </div>
      <div className="indicator-label">{label}</div>
      <p className="indicator-description">{description}</p>
      {matchedText && (
        <div className="indicator-match">
          Detected: <code>&ldquo;{matchedText}&rdquo;</code>
        </div>
      )}
    </div>
  );
}

export default IndicatorCard;
