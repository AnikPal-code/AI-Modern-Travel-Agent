# 🌍 TravelHelperAI - AI-Powered Travel Itinerary Generator

A modern, production-ready React application that generates personalized travel itineraries using AI. Perfect for travel agencies, tour operators, or anyone wanting to offer AI-powered travel planning.

## ✨ Features

- **AI-Powered Itineraries** - Uses Groq's LLaMA model for intelligent travel planning
- **Smart Currency Detection** - Auto-detects currency based on departure city
- **Comprehensive Planning** - Covers flights, hotels, activities, budgets, and more
- **Direct Booking Links** - Integrated links to Google Flights, Booking.com, Airbnb, etc.
- **Professional UI** - Modern gradient design with responsive layout
- **Budget Breakdown** - Detailed cost estimates for flights and accommodation
- **Travel Checklist** - Automated travel preparation checklist
- **Fast & Reliable** - Built with React, TypeScript, and Vite

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Groq API key (free at https://console.groq.com)

### Installation

1. **Clone or extract the project**
```bash
cd travel-planner
npm install
```

2. **Get your Groq API key**
   - Visit https://console.groq.com
   - Sign up (free)
   - Create an API key
   - Copy it

3. **Configure environment variables**
   - Create `.env.local` file in the root directory
   - Add your Groq API key:
   ```
   VITE_GROQ_API_KEY=your_api_key_here
   ```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
   - Visit `http://localhost:5173`
   - Start planning trips!

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🌐 Deploy to Vercel (Free)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variable: `VITE_GROQ_API_KEY`
4. Deploy!

[Detailed Vercel guide](https://vercel.com/docs/frameworks/vite)

## 🎨 Customization

### Change Branding
Edit `src/App.tsx`:
```typescript
<h1><span className="highlight">Your Brand Name</span></h1>
<p className="subtitle">Your tagline here</p>
```

### Change Colors
Edit `src/App.css` - Look for gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Your Logo
1. Place logo in `public/` folder
2. Add to `src/App.tsx`:
```typescript
<img src="/your-logo.png" alt="Logo" className="logo" />
```

### Modify AI Prompt
Edit `src/services/groqService.ts` - Change the `systemPrompt` variable to customize itinerary style.

## 📊 Project Structure

```
src/
├── components/
│   ├── TravelForm.tsx       # Main form component
│   ├── TravelResults.tsx    # Results display
│   ├── Loading.tsx          # Loading state
│   └── *.css               # Component styles
├── services/
│   ├── groqService.ts      # AI integration
│   └── countryCurrency.ts  # Currency mapping
├── utils/
│   └── countryCurrency.ts  # Country data
├── App.tsx                 # Main app
└── index.css              # Global styles
```

## 🔧 Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Groq API** - AI model (LLaMA 3.3 70B)
- **CSS3** - Modern styling

## 💰 Monetization Ideas

### Option 1: Sell as Template ($25-50)
- Buyers get full source code
- They customize and deploy themselves
- One-time payment

### Option 2: SaaS ($9-29/month)
- Host it yourself
- Users access via web
- You handle API costs
- Recurring revenue

### Option 3: White-Label ($99-299)
- Fully customized for client
- Includes setup and deployment
- Premium support

## 📝 License

This project is provided as-is. See LICENSE file for details.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section below
2. Review Groq API documentation
3. Check browser console for errors

## 🐛 Troubleshooting

**"API key not found"**
- Ensure `.env.local` file exists
- Check `VITE_GROQ_API_KEY` is set correctly
- Restart dev server after adding env var

**"Itinerary generation fails"**
- Verify Groq API key is valid
- Check you have API credits
- Try with shorter destination name

**"Styling looks broken"**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check CSS files are in `src/components/`

## 📈 Performance

- **Build size**: ~240KB (gzipped: 77KB)
- **Load time**: <1 second
- **API response**: 2-5 seconds (depends on Groq)

## 🔐 Security

- No sensitive data stored locally
- API key only in environment variables
- No backend required
- CORS-safe API calls

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Groq API Docs](https://console.groq.com/docs)
- [Vite Guide](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🎯 Next Steps

1. Customize branding and colors
2. Add your own logo
3. Deploy to Vercel
4. Test with real travel scenarios
5. Share with friends/clients
6. Collect feedback
7. Iterate and improve

---

**Made with ❤️ for travel enthusiasts and developers**

Questions? Check the documentation or reach out for support!