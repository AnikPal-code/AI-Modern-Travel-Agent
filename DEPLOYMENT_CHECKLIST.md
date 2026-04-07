# Vercel Deployment Checklist

## Quick Setup (5 minutes)

### Step 1: Deploy Email Backend
- [ ] Go to https://vercel.com
- [ ] Create new project from `email-backend` folder
- [ ] Set Root Directory to `email-backend`
- [ ] Add `RESEND_API_KEY` environment variable
- [ ] Deploy and copy the URL (e.g., `https://travel-email-backend.vercel.app`)

### Step 2: Deploy Frontend
- [ ] Go to your main TravelHelperAI Vercel project
- [ ] Add environment variables:
  - [ ] `VITE_GROQ_API_KEY` = your Groq API key
  - [ ] `VITE_RESEND_API_KEY` = your Resend API key
  - [ ] `VITE_EMAIL_BACKEND_URL` = email backend URL from Step 1
- [ ] Trigger deployment (or it auto-deploys on git push)

### Step 3: Test
- [ ] Visit your frontend URL
- [ ] Fill out travel form
- [ ] Click "Plan My Trip"
- [ ] Click "Email This Itinerary"
- [ ] Send test email
- [ ] Verify email received

## Environment Variables Needed

### Frontend
```
VITE_GROQ_API_KEY=re_...
VITE_RESEND_API_KEY=re_...
VITE_EMAIL_BACKEND_URL=https://...vercel.app
```

### Email Backend
```
RESEND_API_KEY=re_...
```

## Useful Links

- Frontend: https://github.com/AnikPal-code/AI-Modern-Travel-Agent
- Vercel: https://vercel.com
- Resend: https://resend.com
- Groq: https://console.groq.com

## Support

See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.
