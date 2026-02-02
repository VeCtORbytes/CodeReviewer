# Code Reviewer AI

![React](https://img.shields.io/badge/React-18.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18-yellow)
![Groq](https://img.shields.io/badge/Groq-API-orange)
![License](https://img.shields.io/badge/License-MIT-black)

An AI-powered code review application that analyzes your code for bugs, security issues, performance problems, and best practices. Built with React, Express, and Groq AI.

**🚀 Live Demo:** [https://code-reviewer-frontend.onrender.com](https://code-reviewer-frontend.onrender.com)

---

## ✨ Features

- 🤖 **AI Code Analysis** - Uses Groq API to review your code instantly
- 🌙 **Dark Mode** - Switch between light and dark themes
- 💾 **Review History** - View your past code reviews
- 📊 **Detailed Results** - Issues organized by severity (Critical, Warning, Info)
- ⚡ **Lightning Fast** - Groq is the fastest LLM API
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔒 **Secure** - API keys stored safely in environment variables
- 🌐 **Deployed** - Frontend and backend live on Render

---

## 🎯 Supported Languages

JavaScript • Python • Java • Go • Rust • C++ • C# • Ruby • PHP • TypeScript • And more!

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Groq API key (free at https://console.groq.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/code-reviewer-ai.git
cd code-reviewer-ai

# Install backend dependencies
cd code-reviewer-backend
npm install

# Install frontend dependencies
cd ../code-reporter-frontend
npm install
```

### Setup

**Backend (.env file):**
```bash
# Create .env in code-reviewer-backend/
GROQ_API_KEY=gsk_your_key_here
PORT=8008
NODE_ENV=development
```

**Frontend (.env.development):**
```bash
# Create .env.development in code-reporter-frontend/
REACT_APP_API_URL=http://localhost:8008
```

### Run Locally

```bash
# Terminal 1: Start Backend
cd code-reviewer-backend
npm start

# Terminal 2: Start Frontend
cd code-reporter-frontend
npm start

# Browser opens to http://localhost:3000
```

### Test It

1. Paste this code in the textarea:
```javascript
var x = null;
console.log(x.foo);
```

2. Click "Review Code"
3. Wait 5-10 seconds for results

Expected: You'll see a Critical error about null reference ✅

---

## 📁 Project Structure

```
code-reviewer-ai/
├── code-reviewer-backend/
│   ├── server.js          # Main backend server
│   ├── package.json       # Dependencies
│   └── .env              # Environment variables (not committed)
│
├── code-reporter-frontend/
│   ├── src/
│   │   ├── App.jsx       # Main app
│   │   ├── App.css       # Styles
│   │   └── components/   # React components
│   ├── .env.development
│   ├── .env.production
│   └── package.json
│
└── README.md
```

---

## 🏗️ How It Works

```
User (Your Browser)
    ↓ (pastes code)
Frontend (React)
    ↓ (sends code)
Backend (Express)
    ↓ (creates prompt)
Groq AI
    ↓ (analyzes code)
Backend
    ↓ (formats results)
Frontend
    ↓ (displays issues)
User (sees review)
```

**That's GenAI!** 🤖

---

## 🤖 What Gets Reviewed

Your code is checked for:

- 🐛 **Bugs** - Null references, type errors, crashes
- ⚡ **Performance** - Slow algorithms, memory leaks
- 🔒 **Security** - SQL injection, XSS, hard-coded secrets
- ✅ **Best Practices** - Naming, organization, error handling
- 📊 **Code Quality** - Dead code, complexity, magic numbers

---

## 💰 Why Groq?

| Feature | Groq | Others |
|---------|------|--------|
| Speed | 1-2 seconds ⚡ | 5-30 seconds |
| Cost | Free $5/month | Paid |
| Stability | ✅ Stable | Models change |
| Setup | 2 minutes | 5 minutes |

**Groq is the best choice!** 🏆

---

## 🌙 Features Explained

### Dark Mode
- Toggle with moon icon in header
- Your preference is saved
- Works with all features

### Review History
- Automatically saves your reviews
- Last 10 reviews stored
- Click any to view again
- Cleared when you clear browser data

### Results Display
Shows for each issue:
- **Severity** - Critical/Warning/Info
- **Issue** - What's wrong
- **Solution** - How to fix it
- **Why It Matters** - Why it's important

---

## 🚀 Deploy Your Own

### Deploy Backend (Render)

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select `code-reviewer-backend`
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variable: `GROQ_API_KEY=gsk_...`
8. Click "Create Web Service"
9. Wait 5-10 minutes for deployment

### Deploy Frontend (Render)

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Select `code-reporter-frontend`
4. Set build command: `npm run build`
5. Set publish directory: `build`
6. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.onrender.com`
7. Click "Create Static Site"
8. Wait 3-5 minutes for deployment

### Auto-Deploy on Push

Your app automatically redeploys when you push to GitHub! 🎉

Just run:
```bash
git add .
git commit -m "your message"
git push origin main
```

Render sees the new code and deploys automatically.

---

## 🔒 Security

- ✅ API keys in environment variables (never in code)
- ✅ No secrets committed to GitHub
- ✅ HTTPS in production
- ✅ Input validation (max 10,000 characters)
- ✅ CORS enabled for safe requests

**Never commit `.env` files!**

---

## 🧪 Test Cases

Try these test codes:

**Test 1: Null Reference (Critical)**
```javascript
var x = null;
console.log(x.foo);
```

**Test 2: Clean Code (No Issues)**
```javascript
function add(a, b) {
  return a + b;
}
```

**Test 3: SQL Injection (Critical)**
```javascript
var query = "SELECT * FROM users WHERE id = " + userId;
```

**Test 4: Unused Variable (Warning)**
```javascript
function test(items) {
  var unused = 0;
  items.forEach(item => console.log(item));
}
```

---

## 🐛 Troubleshooting

### "Failed to fetch" error

**Problem:** Frontend can't reach backend

**Solution:**
1. Check backend is running: `curl http://localhost:8008/api/health`
2. Check `.env.development` has correct API URL
3. Restart frontend: `npm start`

### Backend won't start

**Problem:** Port 8008 is busy or Groq API key is wrong

**Solution:**
```bash
# Check port
lsof -i :8008

# Kill if needed
lsof -ti :8008 | xargs kill -9

# Verify API key is correct
cat .env
```

### Dark mode not working

**Problem:** Old cached version

**Solution:**
1. Open DevTools (F12)
2. Go to "Application" → "Clear storage"
3. Refresh page

---

## 📦 What You Need

### For Development
- Node.js 18+
- npm or yarn
- Groq API key (free)
- Text editor (VS Code recommended)

### For Deployment
- GitHub account
- Render account (free)
- Your Groq API key

---

## 🤝 Contributing

Want to improve this project?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "feat: your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

---

## 📈 Performance

- **First request:** 5-10 seconds (model loading)
- **After that:** 1-2 seconds per review
- **Max code size:** 10,000 characters
- **Timeout:** 5 minutes

---

## 🎯 Next Steps

### For Beginners
1. Follow "Quick Start" above
2. Run locally
3. Try the test codes
4. Deploy to Render

### For Advanced Users
1. Add new features (syntax highlighting, etc.)
2. Improve UI design
3. Add database for permanent storage
4. Deploy to your own server

---

## 📚 Learn More

- [Groq Documentation](https://console.groq.com/docs)
- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Render Documentation](https://render.com/docs)

---

## 📝 License

MIT License - Feel free to use this project for anything!

---

## 🙏 Credits

Built with:
- **React** - Frontend framework
- **Express** - Backend framework
- **Groq** - Fast AI API
- **Render** - Hosting

---

## 🚀 You're Ready!

Your AI code reviewer is ready to use. Start by running locally or deploy to the cloud!

**Questions?** Open an issue on GitHub!

**Found a bug?** Create an issue with steps to reproduce!

**Have an idea?** Fork the repo and send a PR! 

---

**Happy coding!** 💻✨
