import React, { useState } from 'react';

function ReviewResults({ data }) {
  const { issues, codeLength, timestamp } = data;
  const [savedToLocal, setSavedToLocal] = useState(false);

  const handleSaveReview = () => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    savedReviews.push({
      id: Date.now(),
      issues,
      codeLength,
      timestamp,
      savedAt: new Date().toLocaleString(),
    });

    localStorage.setItem('reviews', JSON.stringify(savedReviews));
    setSavedToLocal(true);

    setTimeout(() => setSavedToLocal(false), 2000);
  };

  const handleCopyResults = () => {
    const text = issues
      .map(
        (issue) =>
          `[${issue.severity}] ${issue.issue}\nSolution: ${issue.solution}`
      )
      .join('\n\n');
    
    navigator.clipboard.writeText(text);
    alert('Results copied to clipboard!');
  };

  const criticalCount = issues.filter(i => i.severity === 'Critical').length;
  const warningCount = issues.filter(i => i.severity === 'Warning').length;
  const infoCount = issues.filter(i => i.severity === 'Info').length;

  return (
    <div className="review-results">
      <h2>Analysis Results</h2>

      <div className="results-summary">
        <div className="summary-stat critical">
          <strong>{criticalCount}</strong>
          <span>Critical</span>
        </div>
        <div className="summary-stat warning">
          <strong>{warningCount}</strong>
          <span>Warnings</span>
        </div>
        <div className="summary-stat info">
          <strong>{infoCount}</strong>
          <span>Info</span>
        </div>
      </div>

      {issues.length > 0 ? (
        <div className="issues-list">
          {issues.map((issue, index) => (
            <div key={index} className={`issue-card ${issue.severity.toLowerCase()}`}>
              <div className={`severity-badge ${issue.severity.toLowerCase()}`}>
                {issue.severity}
              </div>

              <div className="issue-title">{issue.issue}</div>

              {issue.lineHint && (
                <div className="line-hint">
                  {issue.lineHint}
                </div>
              )}

              <div className="issue-section">
                <strong>How to fix:</strong>
                <p>{issue.solution}</p>
              </div>

              <div className="issue-section">
                <strong>Why it matters:</strong>
                <p>{issue.whyItMatters}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-issues">
          <p>No issues found. Code looks good!</p>
        </div>
      )}

      <div className="results-actions">
        <button 
          className="btn btn-primary"
          onClick={handleSaveReview}
        >
          {savedToLocal ? 'Saved' : 'Save Review'}
        </button>
        <button 
          className="btn btn-secondary"
          onClick={handleCopyResults}
        >
          Copy Results
        </button>
      </div>
    </div>
  );
}

export default ReviewResults;