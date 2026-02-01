import React, { useState, useEffect } from 'react';
import CodeInput from './components/CodeInput';
import ReviewResults from './components/ReviewResults';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviewData, setReviewData] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('reviewHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('reviewHistory', JSON.stringify(history));
  }, [history]);

  const handleReviewSubmit = async (code) => {
    setError('');
    setReviewData(null);
    setLoading(true);

    try {
     const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8008';

      const response = await fetch(`${API_URL}/api/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to review code');
      }

      const data = await response.json();
      setReviewData(data);

      const historyItem = {
        id: Date.now(),
        code: code.substring(0, 100),
        issueCount: data.issues.length,
        timestamp: new Date().toLocaleString(),
        fullData: data,
      };
      setHistory([historyItem, ...history.slice(0, 9)]);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Bet Project - CodeReview</h1>
            <p>Be Ready Taru Pathak</p>
          </div>
          <div className="header-right">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="layout">
            <div className="left-panel">
              <CodeInput onSubmit={handleReviewSubmit} loading={loading} />
              
              {history.length > 0 && (
                <div className="history-panel">
                  <h3>Recent Reviews</h3>
                  <div className="history-list">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="history-item"
                        onClick={() => setReviewData(item.fullData)}
                      >
                        <div className="history-code">{item.code}...</div>
                        <div className="history-meta">
                          <span className="issue-badge">{item.issueCount} issues</span>
                          <span className="time">{item.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="right-panel">
              {error && (
                <div className="error-box">
                  <h4>Error</h4>
                  <p>{error}</p>
                  <small>Make sure backend is running on http://localhost:8008</small>
                </div>
              )}

              {loading && (
                <div className="loading-box">
                  <div className="spinner"></div>
                  <p>Analyzing code...</p>
                </div>
              )}

              {reviewData && !loading && <ReviewResults data={reviewData} />}

              {!loading && !error && !reviewData && (
                <div className="empty-state">
                  <div className="empty-icon">∞</div>
                  <h3>Paste code to get started</h3>
                  <p>AI will analyze it for bugs, security, and best practices</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;