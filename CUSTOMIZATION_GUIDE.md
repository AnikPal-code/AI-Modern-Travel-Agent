# 🎨 Customization Guide - TravelHelperAI

Learn how to customize TravelHelperAI to match your brand and needs.

## 🏷️ Change App Name & Branding

### Step 1: Update App Title
Edit `src/App.tsx`:

```typescript
// Find this section:
<h1>
  <span className="highlight">TravelHelperAI</span>
</h1>
<p className="subtitle">Plan your perfect getaway with our intelligent travel assistant</p>

// Change to:
<h1>
  <span className="highlight">Your App Name</span>
</h1>
<p className="subtitle">Your custom tagline here</p>
```

### Step 2: Update Browser Tab Title
Edit `index.html`:

```html
<!-- Find this line: -->
<title>TravelHelperAI</title>

<!-- Change to: -->
<title>Your App Name</title>
```

### Step 3: Update Meta Description
Edit `index.html`:

```html
<!-- Find this line: -->
<meta name="description" content="AI-powered travel itinerary generator">

<!-- Change to: -->
<meta name="description" content="Your custom description">
```

---

## 🎨 Change Colors

### Primary Colors (Buttons, Highlights)
Edit `src/App.css` and `src/components/TravelForm.css`:

```css
/* Find this gradient: */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your colors: */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Color Palette Ideas

**Blue/Purple** (Current)
```css
#667eea to #764ba2
```

**Green/Teal**
```css
#10b981 to #059669
```

**Orange/Red**
```css
#f97316 to #dc2626
```

**Pink/Purple**
```css
#ec4899 to #8b5cf6
```

**Blue/Cyan**
```css
#0ea5e9 to #06b6d4
```

**Indigo/Blue**
```css
#4f46e5 to #2563eb
```

### Find All Color Instances
Search for `#667eea` and `#764ba2` in:
- `src/App.css`
- `src/components/TravelForm.css`
- `src/components/TravelResults.css`

Replace all with your colors.

---

## 🖼️ Add Your Logo

### Step 1: Prepare Logo
- Size: 200x200px or larger
- Format: PNG with transparency (recommended)
- Save as: `public/logo.png`

### Step 2: Add to App
Edit `src/App.tsx`:

```typescript
<header className="header">
  <img 
    src="/logo.png" 
    alt="Logo" 
    style={{
      height: '50px',
      marginRight: '15px',
      marginBottom: '10px'
    }} 
  />
  <h1>
    <span className="highlight">Your App Name</span>
  </h1>
  <p className="subtitle">Your tagline</p>
</header>
```

### Step 3: Style Logo (Optional)
Add to `src/App.css`:

```css
.header img {
  height: 50px;
  margin-right: 15px;
  margin-bottom: 10px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
```

---

## ✏️ Customize AI Prompt

The AI prompt determines how itineraries are generated.

### Edit Prompt
File: `src/services/groqService.ts`

Find this section:
```typescript
const systemPrompt = `You are an expert travel planner...`;
```

### Customize Style
Make it more casual:
```typescript
const systemPrompt = `You're a fun, enthusiastic travel buddy helping plan amazing trips...`;
```

Make it more professional:
```typescript
const systemPrompt = `You are a professional travel consultant with 20 years of experience...`;
```

Make it budget-focused:
```typescript
const systemPrompt = `You specialize in creating amazing travel experiences on any budget...`;
```

### Customize Content
Add specific instructions:
```typescript
const systemPrompt = `...
Always include:
- Local food recommendations
- Hidden gems not in guidebooks
- Budget-friendly alternatives
- Safety tips for the destination
...`;
```

---

## 📝 Change Form Labels

Edit `src/components/TravelForm.tsx`:

```typescript
// Change destination label:
<label htmlFor="destination">
  <span className="icon">📍</span> Where do you want to travel?
</label>

// To:
<label htmlFor="destination">
  <span className="icon">🌍</span> Choose your dream destination
</label>
```

---

## 🎯 Change Button Text

Edit `src/components/TravelForm.tsx`:

```typescript
// Find:
<button type="submit" className="btn-plan">
  Plan My Trip
</button>

// Change to:
<button type="submit" className="btn-plan">
  Generate Itinerary
</button>
```

---

## 🌐 Add Favicon

### Step 1: Create Favicon
- Size: 32x32px or 64x64px
- Format: PNG or ICO
- Save as: `public/favicon.png`

### Step 2: Update HTML
Edit `index.html`:

```html
<!-- Find: -->
<link rel="icon" type="image/svg+xml" href="/vite.svg" />

<!-- Change to: -->
<link rel="icon" type="image/png" href="/favicon.png" />
```

---

## 🎭 Change Emojis

Emojis are used throughout the app. Change them to match your brand:

### In TravelForm.tsx
```typescript
// Current:
<span className="icon">📍</span> Where do you want to travel?

// Change to:
<span className="icon">🗺️</span> Where do you want to travel?
```

### Common Travel Emojis
- 🌍 World
- ✈️ Airplane
- 🏨 Hotel
- 💰 Money
- 👥 People
- 📅 Calendar
- 🗺️ Map
- 🎒 Backpack
- 🏖️ Beach
- 🏔️ Mountain

---

## 📱 Responsive Design

The app is already mobile-responsive. To customize breakpoints:

Edit `src/components/TravelForm.css`:

```css
@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

Change `600px` to your preferred breakpoint.

---

## 🔤 Change Fonts

### Add Google Font
Edit `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
```

### Popular Font Combinations
- **Poppins** - Modern, friendly
- **Inter** - Clean, professional
- **Playfair Display** - Elegant, luxury
- **Montserrat** - Bold, modern
- **Roboto** - Versatile, readable

---

## 🎬 Add Animations

### Button Hover Animation
Edit `src/components/TravelForm.css`:

```css
.btn-plan:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.4);
}
```

### Form Input Animation
Edit `src/components/TravelForm.css`:

```css
.field input:focus {
  transform: scale(1.01);
  border-color: #667eea;
}
```

---

## 🌙 Dark Mode (Optional)

Add to `src/App.css`:

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a2e;
    color: #ffffff;
  }
  
  .card {
    background: #16213e;
    border-color: #0f3460;
  }
}
```

---

## 🔗 Change Booking Links

Edit `src/components/TravelResults.tsx`:

```typescript
// Find booking links section and customize URLs
// Add your affiliate links for commission
```

Example with affiliate links:
```typescript
• Google Flights: https://www.google.com/flights?q=...&utm_source=yoursite
• Booking.com: https://www.booking.com/?aid=YOUR_AFFILIATE_ID
```

---

## 📊 Add Analytics

### Google Analytics
Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Replace `GA_ID` with your Google Analytics ID.

---

## 🔐 Add Authentication (Advanced)

To add user accounts:

1. Install auth library:
```bash
npm install @supabase/supabase-js
```

2. Create Supabase project (free)
3. Add auth to App.tsx
4. Save user itineraries

---

## 💾 Add Database (Advanced)

To save itineraries:

1. Use Supabase (free tier)
2. Create table for itineraries
3. Add save button to results
4. Display saved itineraries

---

## 🚀 Deploy Custom Version

### To Vercel
```bash
git add .
git commit -m "Customized TravelHelperAI"
git push origin main
```

Vercel auto-deploys!

### To Other Hosts
```bash
npm run build
# Upload dist/ folder to your host
```

---

## 🎯 Customization Checklist

- [ ] App name changed
- [ ] Colors customized
- [ ] Logo added
- [ ] AI prompt customized
- [ ] Button text updated
- [ ] Favicon added
- [ ] Tested locally
- [ ] Deployed to Vercel
- [ ] Shared with users

---

## 💡 Pro Tips

1. **Test changes locally** - Run `npm run dev` before deploying
2. **Use browser DevTools** - Inspect elements to find CSS
3. **Keep backups** - Save original files before major changes
4. **Mobile test** - Check on phone/tablet
5. **Performance** - Keep images optimized
6. **Accessibility** - Maintain good contrast ratios

---

## 🆘 Troubleshooting

**Changes not showing?**
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Restart dev server

**Styling broken?**
- Check CSS syntax
- Verify file paths
- Check browser console for errors

**Colors look wrong?**
- Use hex color picker
- Test in different browsers
- Check for typos in color codes

---

**Happy customizing! 🎨**