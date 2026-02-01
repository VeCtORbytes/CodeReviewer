const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.post('/api/review', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || code.trim() === '') {
      return res.status(400).json({ error: 'Please provide code to review' });
    }

    if (code.length > 10000) {
      return res.status(400).json({ error: 'Code is too long. Maximum 10,000 characters allowed.' });
    }

    const prompt = `You are an expert code reviewer. Review this code and find:
1. Bugs and potential errors
2. Performance issues
3. Security vulnerabilities
4. Best practice violations
5. Code quality issues

For each issue found, provide:
- severity: "Critical", "Warning", or "Info"
- issue: Brief description of the problem
- lineHint: Approximate line number or code snippet
- solution: How to fix it
- whyItMatters: Why this is important

Respond ONLY with valid JSON array of issues. If no issues found, respond with [].

Code to review:
${code}`;

    console.log('Sending code to Ollama for review...');

    const response = await axios.post('http://localhost:11435/api/generate', {
      model: 'mistral',
      prompt: prompt,
      stream: false,
    });

    const reviewText = response.data.response;
    let reviewIssues = [];

    try {
      const jsonMatch = reviewText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        reviewIssues = JSON.parse(jsonMatch[0]);
      } else {
        reviewIssues = [
          {
            severity: 'Info',
            issue: 'Review completed',
            lineHint: 'N/A',
            solution: 'Check raw response',
            whyItMatters: 'AI response',
            rawResponse: reviewText,
          },
        ];
      }
    } catch (parseError) {
      reviewIssues = [
        {
          severity: 'Info',
          issue: 'Review completed but parsing issue',
          lineHint: 'N/A',
          solution: 'See raw response',
          whyItMatters: 'Format issue',
          rawResponse: reviewText,
        },
      ];
    }

    res.json({
      success: true,
      issues: reviewIssues,
      codeLength: code.length,
      timestamp: new Date().toISOString(),
    });

    console.log(`Review complete. Found ${reviewIssues.length} issues.`);
  } catch (error) {
    console.error('Error:', error.message);

    if (error.message.includes('ECONNREFUSED')) {
      res.status(500).json({ error: 'Ollama not running. Start it with: ollama serve' });
    } else {
      res.status(500).json({ error: 'An error occurred while reviewing your code.', details: error.message });
    }
  }
});

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});