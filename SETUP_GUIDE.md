# 🚀 Complete Setup Guide - TravelHelperAI

This guide walks you through everything needed to get TravelHelperAI running on your machine.

## Step 1: Prerequisites

Before starting, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)
- **A text editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

### Verify Installation

Open terminal/command prompt and run:
```bash
node --version
npm --version
```

You should see version numbers (e.g., v18.0.0, 9.0.0).

## Step 2: Get Groq API Key (Free)

The AI magic happens through Groq's API. Here's how to get it:

1. **Visit** https://console.groq.com
2. **Sign up** with email (takes 2 minutes)
3. **Verify** your email
4. **Go to** API Keys section
5. **Create** a new API key
6. **Copy** the key (you'll need it in Step 4)

**Note**: Groq gives you free API credits to start. No credit card needed!

## Step 3: Extract and Install

### Option A: Using Git (Recommended)
```bash
git clone https://github.com/AnikPal-code/AI-Modern-Travel-Agent.git
cd AI-Modern-Travel-Agent
npm install
```

### Option B: Manual Download
1. Download the project as ZIP
2. Extract to a folder
3. Open terminal in that folder
4. Run: `npm install`

This downloads all dependencies (takes 1-2 minutes).

## Step 4: Configure Environment Variables

This is where you add your Groq API key.

### Windows (Command Prompt)
1. In the project folder, create a new file: `.env.local`
2. Open it with Notepad
3. Add this line:
```
VITE_GROQ_API_KEY=your_api_key_here
```
4. Replace `your_api_key_here` with your actual Groq API key
5. Save the file

### Mac/Linux (Terminal)
```bash
echo "VITE_GROQ_API_KEY=your_api_key_here" > .env.local
```

Replace `your_api_key_here` with your actual key.

### Verify
- File should be named `.env.local` (with the dot)
- Should be in the root folder (same level as package.json)
- Should contain only one line

## Step 5: Run Development Server

In terminal, run:
```bash
npm run dev
```

You should see:
```
  VITE v8.0.3  ready in 291 ms
  ➜  Local:   http://localhost:5173/
```

## Step 6: Open in Browser

Click the link or go to: **http://localhost:5173/**

You should see the TravelHelperAI interface!

## Step 7: Test It

1. Fill in the form:
   - Destination: "Paris"
   - Departure: "New York"
   - Dates: Pick any dates
   - Budget: "1000"
   - People: "2"

2. Click "Plan My Trip"

3. Wait 2-5 seconds for AI to generate itinerary

4. See your personalized travel plan!

## 🎨 Customization

### Change App Name
Edit `src/App.tsx`:
```typescript
<h1><span className="highlight">Your App Name</span></h1>
```

### Change Colors
Edit `src/App.css` and `src/components/TravelForm.css`:
```css
/* Find this and change colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Popular color combinations:
- Blue/Purple: `#667eea` to `#764ba2`
- Green/Teal: `#10b981` to `#059669`
- Orange/Red: `#f97316` to `#dc2626`
- Pink/Purple: `#ec4899` to `#8b5cf6`

### Add Your Logo
1. Save your logo as `logo.png` in `public/` folder
2. Add to `src/App.tsx`:
```typescript
<img src="/logo.png" alt="Logo" style={{height: '40px', marginRight: '10px'}} />
```

## 🚀 Deploy to Vercel (Free)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Step 3: Add Environment Variable
1. In Vercel dashboard, go to Settings
2. Find "Environment Variables"
3. Add: `VITE_GROQ_API_KEY` = your_api_key
4. Redeploy

Your app is now live on the internet!

## 🔧 Build for Production

When ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized files.

## 📊 Project Structure

```
project/
├── src/
│   ├── components/          # React components
│   ├── services/            # API integration
│   ├── utils/               # Helper functions
│   ├── App.tsx              # Main app
│   └── index.css            # Global styles
├── public/                  # Static files
├── .env.local              # Your API key (don't share!)
├── package.json            # Dependencies
├── vite.config.ts          # Build config
└── README.md               # Documentation
```

## 🐛 Troubleshooting

### "npm: command not found"
- Node.js not installed
- Solution: Install from https://nodejs.org/

### "Cannot find module"
- Dependencies not installed
- Solution: Run `npm install`

### "API key not found"
- `.env.local` file missing or wrong name
- Solution: Create `.env.local` with your key

### "Port 5173 already in use"
- Another app using the port
- Solution: Run `npm run dev -- --port 3000`

### "Itinerary generation fails"
- Groq API key invalid
- Solution: Check your API key in `.env.local`

### "Styling looks broken"
- Browser cache issue
- Solution: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 💡 Tips

1. **Keep API key secret** - Never share `.env.local`
2. **Use VS Code** - Makes editing easier
3. **Test locally first** - Before deploying
4. **Monitor API usage** - Check Groq dashboard
5. **Backup your code** - Use GitHub

## 📚 Learn More

- [React Docs](https://react.dev)
- [Groq API](https://console.groq.com/docs)
- [Vite Guide](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org/docs)

## ✅ Checklist

- [ ] Node.js installed
- [ ] Groq API key obtained
- [ ] Project extracted/cloned
- [ ] `npm install` completed
- [ ] `.env.local` created with API key
- [ ] `npm run dev` running
- [ ] App opens in browser
- [ ] Test itinerary generated successfully
- [ ] Ready to customize!

## 🎯 Next Steps

1. Customize branding
2. Test with different destinations
3. Deploy to Vercel
4. Share with friends
5. Collect feedback
6. Iterate and improve

---

**Need help?** Check the README.md or review the troubleshooting section above.