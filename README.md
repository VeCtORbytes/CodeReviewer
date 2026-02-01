# Code Reviewer AI

![React](https://img.shields.io/badge/React-18.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18-yellow)
![License](https://img.shields.io/badge/License-MIT-black)

An AI-powered code review application that analyzes your code for bugs, security vulnerabilities, performance issues, and best practice violations. Built with React, Express, and local AI models.

**Live Demo:** [https://code-reviewer-frontend.vercel.app](https://code-reviewer-frontend.vercel.app)

---

## ✨ Features

- 🤖 **AI-Powered Code Analysis** - Uses Mistral 7B or Claude AI for intelligent code reviews
- 🌙 **Dark Mode** - Toggle between light and dark themes with persistent storage
- 💾 **Review History** - Access and manage your past code reviews
- 📋 **Structured Output** - Results categorized by severity (Critical, Warning, Info)
- 🚀 **Fast & Local** - Uses local Ollama or cloud API (Claude/OpenAI)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔒 **Secure** - Environment variables for API keys, no exposed secrets
- ⚡ **Production Ready** - Deployed on Vercel + Railway

---

## 🎯 Supported Languages

- JavaScript
- Python
- Java
- Go
- Rust
- C++
- C#
- Ruby
- PHP
- TypeScript

...and many more!

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- [Ollama](https://ollama.ai) (for local AI) OR
- [Claude API key](https://console.anthropic.com) OR
- [OpenAI API key](https://platform.openai.com)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/code-reviewer-ai.git
cd code-reviewer-ai

# Install backend dependencies
cd code-reviewer-backend
npm install

# Install frontend dependencies
cd ../code-reviewer-frontend
npm install
```

### Configuration

#### Backend Setup

Create `.env` file in `code-reviewer-backend/`:

```env
# For Ollama (local)
OLLAMA_HOST=127.0.0.1:11435
PORT=8008

# OR for Claude API
ANTHROPIC_API_KEY=sk-ant-your_key_here
PORT=8008

# OR for OpenAI
OPENAI_API_KEY=sk-your_key_here
PORT=8008
```

#### Frontend Setup

Create `.env.development` in `code-reviewer-frontend/`:

```env
REACT_APP_API_URL=http://localhost:8008
```

### Running Locally

```bash
# Terminal 1: Start Ollama (if using local AI)
ollama serve

# Terminal 2: Start Backend
cd code-reviewer-backend
npm start
# Backend runs on http://localhost:8008

# Terminal 3: Start Frontend
cd code-reviewer-frontend
npm start
# Frontend opens on http://localhost:3000
```

### Testing

Visit http://localhost:3000 and paste code to test:

```javascript
var x = null;
console.log(x.foo);
```

Expected output: Critical error - Null reference

---

## 📚 Project Structure

```
code-reviewer-ai/
├── code-reviewer-backend/          # Express backend
│   ├── server.js                   # Main server file
│   ├── package.json                # Dependencies
│   ├── .env                        # Environment variables (not committed)
│   └── .env.example                # Template
│
├── code-reviewer-frontend/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeInput.jsx       # Code textarea component
│   │   │   └── ReviewResults.jsx   # Results display component
│   │   ├── App.jsx                 # Main app component
│   │   ├── App.css                 # Main styles
│   │   └── index.js
│   ├── .env.development            # Local development
│   ├── .env.production             # Production settings
│   └── package.json
│
└── README.md
```

---

## 🏗️ Architecture

```
Frontend (React) → Backend (Express) → GenAI Model
    ↓                  ↓                    ↓
Vercel          Railway/Local          Ollama/Claude/OpenAI
```

### Data Flow

1. **User pastes code** in React frontend
2. **Frontend sends** code to Express backend via HTTP
3. **Backend creates prompt** with code and instructions
4. **Backend calls GenAI model** (Ollama/Claude/OpenAI)
5. **AI generates** code review analysis
6. **Backend formats** response as JSON
7. **Frontend displays** results with styling
8. **User can save** review to browser storage

---

## 🤖 GenAI Integration

### How It Works

This project uses **Generative AI** to analyze code:

1. **Input:** Code snippet from user
2. **Processing:** AI reads and analyzes
3. **Generation:** AI creates code review
4. **Output:** Structured JSON with issues

### Supported Models

#### Local (Free)
- **Ollama + Mistral 7B** - Open-source, runs on your computer

#### Cloud (Paid but cheaper)
- **Claude 3.5 Sonnet** - Best for code, $0.003 per review
- **OpenAI GPT-4o-mini** - Fast and cheap, $0.00015 per review

---

## 🚀 Deployment

### Deploy to Production

#### Frontend (Vercel)

```bash
npm i -g vercel
cd code-reviewer-frontend
vercel --prod
```

#### Backend (Railway)

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository → Deploy
4. Add environment variables in dashboard
5. Done!

See [DEPLOYMENT-QUICK-START.md](./DEPLOYMENT-QUICK-START.md) for detailed guide.

---

## 📖 Documentation

- **[QUICK-IMPLEMENTATION-GUIDE.md](./docs/QUICK-IMPLEMENTATION-GUIDE.md)** - UI setup (15 min)
- **[GITHUB-DEPLOYMENT-GUIDE.md](./docs/GITHUB-DEPLOYMENT-GUIDE.md)** - Git workflow & deployment
- **[BACKEND-DEPLOYMENT-GUIDE.md](./docs/BACKEND-DEPLOYMENT-GUIDE.md)** - Production backend setup
- **[ENVIRONMENT-VARIABLES-GUIDE.md](./docs/ENVIRONMENT-VARIABLES-GUIDE.md)** - Env var management
- **[HOW-YOUR-PROJECT-IS-GENAI.md](./docs/HOW-YOUR-PROJECT-IS-GENAI.md)** - GenAI explanation

---

## 🔍 Code Review Features

### Issues Detected

- 🐛 **Bugs & Errors**
  - Null reference errors
  - Type mismatches
  - Unhandled exceptions

- ⚡ **Performance Issues**
  - O(n²) algorithms
  - Inefficient loops
  - Memory leaks

- 🔒 **Security Vulnerabilities**
  - SQL injection
  - XSS attacks
  - Hard-coded secrets

- ✅ **Best Practices**
  - Naming conventions
  - Code organization
  - Error handling

- 📊 **Code Quality**
  - Dead code
  - Complex functions
  - Magic numbers

### Output Format

Each review includes:

```json
{
  "severity": "Critical|Warning|Info",
  "issue": "Description of the problem",
  "lineHint": "Code snippet or line number",
  "solution": "How to fix it",
  "whyItMatters": "Why this is important"
}
```

---

## 🌙 Dark Mode

Toggle dark/light theme with the button in the header. Your preference is saved automatically.

**Keyboard Shortcut:** (Coming soon)

---

## 💾 Review History

The app automatically saves your reviews locally:

- Last 10 reviews stored
- Click to view any review
- Saved in browser's localStorage
- Persists between sessions

**Note:** History is local to your browser. Clearing browser data will delete history.

---

## ⚙️ Configuration

### Backend Environment Variables

```env
# Server
PORT=8008                              # Server port
NODE_ENV=development                   # Environment

# AI Model Selection (choose one)
OLLAMA_HOST=127.0.0.1:11435           # Local Ollama
ANTHROPIC_API_KEY=sk-ant-...          # Claude API
OPENAI_API_KEY=sk-...                 # OpenAI API
```

### Frontend Environment Variables

```env
# Development
REACT_APP_API_URL=http://localhost:8008

# Production
REACT_APP_API_URL=https://your-backend-url.com
```

---

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check port is not in use
lsof -i :8008

# Kill process if needed
lsof -ti :8008 | xargs kill -9

# Restart
npm start
```

### Frontend can't connect to backend

```bash
# Check environment variable
cat .env.development
# Should have: REACT_APP_API_URL=http://localhost:8008

# Restart frontend
npm start
```

### Ollama not running

```bash
# Start Ollama on port 11435
OLLAMA_HOST=127.0.0.1:11435 ollama serve

# Verify
curl http://localhost:11435/api/tags
```

### Dark mode not working

```bash
# Clear browser cache
# F12 → Application → Clear storage
# Refresh page
```

See [BACKEND-DEPLOYMENT-GUIDE.md](./docs/BACKEND-DEPLOYMENT-GUIDE.md) for more issues.

---

## 🔒 Security

- ✅ **API keys in environment variables** - Never hardcoded
- ✅ **CORS enabled** - Secure cross-origin requests
- ✅ **Input validation** - Code size limits
- ✅ **No secrets in GitHub** - .gitignore protects .env
- ✅ **HTTPS in production** - Railway/Vercel provide SSL

**Important:** Never commit `.env` files!

---

## 📊 Performance

- **First request:** 20-30 seconds (AI model loading)
- **Subsequent requests:** 5-10 seconds
- **Code size limit:** 10,000 characters
- **Timeout:** 5 minutes

Optimize by:
- Using smaller code snippets
- Keeping backend running
- Using production AI (faster than local)

---

## 🤝 Contributing

Contributions welcome! Here's how:

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and test
4. Commit: `git commit -m "feat: your feature"`
5. Push: `git push origin feature/your-feature`
6. Open Pull Request

See [GITHUB-DEPLOYMENT-GUIDE.md](./docs/GITHUB-DEPLOYMENT-GUIDE.md) for detailed workflow.

---

## 🎯 Roadmap

- [ ] Code diff comparison
- [ ] Export reviews as PDF
- [ ] Team collaboration
- [ ] Custom review criteria
- [ ] Syntax highlighting
- [ ] Keyboard shortcuts
- [ ] Code suggestions
- [ ] Multi-file analysis
- [ ] Browser extension
- [ ] IDE plugins

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Mistral AI - Open-source LLM
- Anthropic - Claude AI
- OpenAI - GPT models
- React - Frontend framework
- Express - Backend framework
- Ollama - Local AI runtime

---

📞 Support

Need Help?

1. Read documentation - Check `/docs` folder
2. Check troubleshooting - See section above
3. Search issues - GitHub Issues
4. Create issue- Describe problem with steps to reproduce

Resources

- [GenAI Explanation](./docs/HOW-YOUR-PROJECT-IS-GENAI.md)
- [Deployment Guide](./docs/BACKEND-DEPLOYMENT-GUIDE.md)
- [Environment Variables](./docs/ENVIRONMENT-VARIABLES-GUIDE.md)

---

💬 Feedback

Have suggestions? Open an issue or PR!

- **Bug reports** - Create issue with details
- **Feature requests** - Open discussion
- **Improvements** - Submit PR

---

🚀 Ready to Start?

1. **Clone repo:** `git clone <repo-url>`
2. **Install:** `npm install` (both folders)
3. **Configure:** Create `.env` files
4. **Run locally:** Start 3 terminals
5. **Deploy:** Follow deployment guide

---

## 📈 Stats

- ⭐ **Stars:** [Your repo]
- 🍴 **Forks:** [Your repo]
- 👥 **Contributors:** 1 (you!)
- 📦 **Languages:** JavaScript, React, Node.js
- 🚀 **Status:** Production Ready


 📅 Latest Updates

- **v1.0.0** (2026-02-01) - Initial release
  - Code review with AI
  - Dark mode
  - Review history
  - Production deployment

---

🔗 Links
- [GitHub Repository](https://github.com/yourusername/code-reviewer-ai)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Claude Documentation](https://docs.anthropic.com)
- [Ollama Guide](https://ollama.ai)

---

**Start reviewing code with AI today!** 🚀

Questions? Check the [documentation](./docs) or open an issue!
