import { useState, useEffect } from 'react';

function getRiskColor(score) {
  if (score <= 15) return 'var(--color-safe)';
  if (score <= 35) return 'var(--color-low)';
  if (score <= 60) return 'var(--color-moderate)';
  if (score <= 80) return 'var(--color-high)';
  return 'var(--color-critical)';
}

function RiskMeter({ score, riskLevel }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [animatedNumber, setAnimatedNumber] = useState(0);

  const arcLength = Math.PI * 80;
  const color = getRiskColor(score);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayScore(score), 60);
    return () => clearTimeout(timer);
  }, [score]);

  useEffect(() => {
    if (score === 0) {
      setAnimatedNumber(0);
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedNumber(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [score]);

  const fillLength = (arcLength * displayScore) / 100;
  const bgArc = 'M 20 100 A 80 80 0 0 0 100 20 A 80 80 0 0 0 180 100';

  return (
    <div className="risk-meter">
      <svg className="risk-meter-svg" viewBox="0 0 200 170">
        <path
          d={bgArc}
          className="risk-meter-bg"
        />
        <path
          d={bgArc}
          className="risk-meter-fill"
          stroke={color}
          strokeDasharray={`${fillLength} ${arcLength}`}
        />


        <text
          x="100"
          y="125"
          textAnchor="middle"
          dominantBaseline="middle"
          className="risk-meter-score"
          fontSize="34"
          fill={color}
        >
          {animatedNumber}%
        </text>


        <text
          x="100"
          y="160"
          textAnchor="middle"
          className="risk-meter-label"
          fontSize="13"
          fill="var(--color-text-secondary)"
        >
          {riskLevel}
        </text>
      </svg>
    </div>
  );
}

export default RiskMeter;
