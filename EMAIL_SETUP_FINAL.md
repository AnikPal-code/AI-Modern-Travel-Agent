# Email Setup - Final Version

This guide explains the email setup that works on both local and Vercel.

## How It Works

The application now uses two different email backends depending on the environment:

### Local Development
- Uses Node.js backend running on `http://localhost:3001`
- Start with: `cd email-backend && npm install && npm start`

### Vercel Production
- Uses Vercel serverless functions (`/api/send-email`)
- No separate deployment needed
- Automatically uses the same Resend API key

## Setup Instructions

### 1. Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Local Development Setup

#### Frontend
1. Add to `.env.local`:
```
VITE_RESEND_API_KEY=your_resend_api_key
```

2. Start the frontend:
```bash
npm run dev
```

#### Email Backend
1. Add to `email-backend/.env`:
```
RESEND_API_KEY=your_resend_api_key
PORT=3001
```

2. Start the backend:
```bash
cd email-backend
npm install
npm start
```

3. Both should be running:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

### 3. Vercel Production Setup

1. Go to your Vercel project settings
2. Add environment variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key
3. Deploy (automatic on git push)

That's it! The serverless function will handle emails automatically.

## Testing

### Local
1. Fill out the travel form
2. Click "Plan My Trip"
3. Click "Email This Itinerary"
4. Enter recipient email
5. Click "Send Email"
6. Check your email

### Production (Vercel)
Same steps - it will automatically use the serverless function.

## File Structure

```
project/
├── src/
│   └── services/
│       └── resendEmailService.ts    # Frontend email service
├── api/
│   └── send-email.js                # Vercel serverless function
├── email-backend/                   # Local Node.js backend
│   ├── server.js
│   ├── package.json
│   └── .env
└── .env.local                       # Local env variables
```

## Troubleshooting

### Local: "Email backend is not running"
- Make sure `email-backend` is running on port 3001
- Check: `curl http://localhost:3001/health`

### Vercel: Email not sending
- Check Resend API key is set in Vercel environment variables
- Check browser console for errors
- Visit Resend dashboard to see delivery status

### Both: "Failed to send email"
- Verify Resend API key is correct
- Check recipient email is valid
- Check Resend account has available quota (100/day free)

## Free Tier Limits

Resend free tier:
- 100 emails per day
- Full API access
- Perfect for testing and small projects

## Support

- Resend Docs: https://resend.com/docs
- Vercel Docs: https://vercel.com/docs
- GitHub: https://github.com/AnikPal-code/AI-Modern-Travel-Agent
