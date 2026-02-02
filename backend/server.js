const express = require('express');
const { Groq } = require('groq-sdk');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50kb' }));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Define available models
const MODELS = [
  'mixtral-8x7b-32768',
  'llama-3.1-70b-versatile',
  'llama-3.1-8b-instant',
  'llama2-70b-4096',
  'gemma-7b-it',
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// NEW: Get available models endpoint
app.get('/api/models', async (req, res) => {
  try {
    const models = await groq.models.list();
    const modelIds = models.data.map(m => m.id);
    res.json({ 
      available_models: modelIds,
      message: 'Use one of these model IDs in your request'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

For each issue found, provide in JSON format:
- severity: "Critical", "Warning", or "Info"
- issue: Brief description of the problem
- lineHint: Approximate line number or code snippet
- solution: How to fix it
- whyItMatters: Why this is important

Respond ONLY with valid JSON array of issues. If no issues found, respond with empty array [].

Code to review:
${code}`;

    console.log('Sending code to Groq for review...');

    // Initialize variables
    let message = null;
    let successfulModel = null;

    // Try each model until one works
    for (const model of MODELS) {
      try {
        console.log(`Trying model: ${model}`);
        message = await groq.chat.completions.create({
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          model: model,
          temperature: 0.3,
          max_tokens: 1024,
        });
        successfulModel = model;
        console.log(`Success with model: ${model}`);
        break;
      } catch (error) {
        if (error.error?.error?.code === 'model_decommissioned') {
          console.log(`Model ${model} decommissioned, trying next...`);
          continue;
        }
        throw error;
      }
    }

    if (!message) {
      return res.status(500).json({
        error: 'No available Groq models. All models are decommissioned.',
        suggestion: 'Check https://console.groq.com/docs/models for available models'
      });
    }

    const reviewText = message.choices[0].message.content;
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
      model_used: successfulModel,
    });

    console.log(`Review complete. Found ${reviewIssues.length} issues.`);
  } catch (error) {
    console.error('Error during code review:', error);

    if (error.status === 401) {
      res.status(401).json({
        error: 'Invalid Groq API key. Check your credentials.',
      });
    } else if (error.status === 429) {
      res.status(429).json({
        error: 'Rate limited. Please wait a moment and try again.',
      });
    } else {
      res.status(500).json({
        error: 'An error occurred while reviewing your code.',
        details: error.message,
      });
    }
  }
});

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Using Groq API for code reviews`);
  console.log(`Trying models in order: ${MODELS.join(', ')}`);
  console.log(`Check available models: curl http://localhost:${PORT}/api/models`);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});