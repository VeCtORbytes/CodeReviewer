import React, { useState } from 'react';

function CodeInput({ onSubmit, loading }) {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      alert('Please paste some code to review');
      return;
    }
    onSubmit(code);
  };

  const handleClear = () => {
    setCode('');
  };

  return (
    <div className="code-input-container">
      <h2>Code Input</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="code-textarea"
          disabled={loading}
        />

        <div className="code-meta">
          <span>{code.length} characters (max 10,000)</span>
        </div>

        <div className="code-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || code.trim() === ''}
          >
            {loading ? 'Analyzing...' : 'Review Code'}
          </button>
          
          <button 
            type="button"
            onClick={handleClear}
            className="btn btn-secondary"
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default CodeInput;