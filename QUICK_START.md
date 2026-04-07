# ⚡ Quick Start - TravelHelperAI

Get started in 5 minutes!

## 1️⃣ Get Groq API Key (2 minutes)
- Go to https://console.groq.com
- Sign up (free)
- Create API key
- Copy it

## 2️⃣ Setup Project (2 minutes)
```bash
npm install
echo "VITE_GROQ_API_KEY=your_key_here" > .env.local
npm run dev
```

## 3️⃣ Open Browser (1 minute)
- Visit http://localhost:5173
- Fill form
- Click "Plan My Trip"
- Get AI itinerary!

## 🎨 Quick Customization

### Change App Name
Edit `src/App.tsx`:
```typescript
<h1><span className="highlight">Your Name</span></h1>
```

### Change Colors
Search `#667eea` in CSS files, replace with your color.

### Add Logo
Save logo to `public/logo.png`, add to `src/App.tsx`:
```typescript
<img src="/logo.png" alt="Logo" style={{height: '50px'}} />
```

## 🚀 Deploy to Vercel
```bash
git add .
git commit -m "Custom version"
git push origin main
```
Vercel auto-deploys!

## 📚 Full Guides
- **README.md** - Complete overview
- **SETUP_GUIDE.md** - Detailed setup
- **CUSTOMIZATION_GUIDE.md** - All customization options
- **GUMROAD_LAUNCH_SUMMARY.md** - Selling on Gumroad

## 💰 Sell on Gumroad
1. Create Gumroad account
2. Use GUMROAD_PRODUCT_GUIDE.md for listing
3. Set price to **$39**
4. Upload files
5. Launch!

## 🆘 Troubleshooting
- **API key error?** Check `.env.local` file
- **Port in use?** Run `npm run dev -- --port 3000`
- **Styling broken?** Hard refresh (Ctrl+Shift+R)

---

**Ready? Start with:** `npm install && npm run dev`