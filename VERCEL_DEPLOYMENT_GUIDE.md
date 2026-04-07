# Vercel Deployment Guide - TravelHelperAI with Resend Email

This guide explains how to deploy TravelHelperAI to Vercel with the Resend email backend.

## Overview

The application consists of two parts:
1. **Frontend** (React + Vite) - Deployed to Vercel
2. **Email Backend** (Node.js + Express) - Deployed to Vercel as a separate project

## Step 1: Deploy the Email Backend

### 1.1 Create a New Vercel Project for Email Backend

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository (AI-Modern-Travel-Agent)
4. In the "Configure Project" step:
   - **Root Directory**: Select `email-backend`
   - **Framework Preset**: Node.js
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
   - **Start Command**: `npm start`

### 1.2 Add Environment Variables

1. After creating the project, go to **Settings** → **Environment Variables**
2. Add the following variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (e.g., `re_V7scCa6b_NM9ijneUFos6onhhBchdHaW1`)
   - Click "Add"

3. Deploy the project by clicking "Deploy"

### 1.3 Get Your Email Backend URL

After deployment completes:
1. Go to the project's main page
2. Copy the deployment URL (e.g., `https://travel-email-backend.vercel.app`)
3. Save this URL - you'll need it for the frontend

## Step 2: Deploy the Frontend

### 2.1 Update Frontend Environment Variables

1. Go to your main TravelHelperAI Vercel project (or create a new one)
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

   **VITE_GROQ_API_KEY**
   - Value: Your Groq API key

   **VITE_RESEND_API_KEY**
   - Value: Your Resend API key (same as backend)

   **VITE_EMAIL_BACKEND_URL**
   - Value: Your email backend URL from Step 1.3 (e.g., `https://travel-email-backend.vercel.app`)

### 2.2 Deploy Frontend

1. Make sure your changes are pushed to GitHub
2. Vercel will automatically deploy when you push to main branch
3. Or manually trigger deployment from Vercel dashboard

## Step 3: Test the Deployment

1. Go to your frontend URL (e.g., `https://travel-helper-ai.vercel.app`)
2. Fill out the travel form
3. Click "Plan My Trip"
4. Once you get results, click "Email This Itinerary"
5. Enter a recipient's email and click "Send Email"
6. You should receive the email within seconds

## Troubleshooting

### Email Not Sending

**Check 1: Backend URL is correct**
- Verify `VITE_EMAIL_BACKEND_URL` in frontend environment variables
- Should be your email backend Vercel URL

**Check 2: Resend API Key is valid**
- Go to [https://resend.com](https://resend.com)
- Verify your API key is active
- Check that it's the same in both frontend and backend

**Check 3: Backend is running**
- Visit your backend URL directly (e.g., `https://travel-email-backend.vercel.app/health`)
- You should see: `{"status":"Email backend is running! 🚀"}`

**Check 4: Check browser console**
- Open browser DevTools (F12)
- Go to Console tab
- Look for error messages when sending email

### Build Errors

If you see build errors:
1. Make sure all dependencies are installed: `npm install`
2. Check that TypeScript compiles: `npm run build`
3. Verify all imports are correct

## Environment Variables Summary

### Frontend (.env.local or Vercel)
```
VITE_GROQ_API_KEY=your_groq_api_key
VITE_RESEND_API_KEY=your_resend_api_key
VITE_EMAIL_BACKEND_URL=https://your-email-backend.vercel.app
```

### Email Backend (.env or Vercel)
```
RESEND_API_KEY=your_resend_api_key
PORT=3001
```

## Important Notes

1. **Never commit API keys** - Always use environment variables
2. **Keep API keys secret** - Don't share them publicly
3. **Monitor Resend usage** - Free tier has 100 emails/day limit
4. **Test locally first** - Before deploying to production

## Support

- Vercel Docs: https://vercel.com/docs
- Resend Docs: https://resend.com/docs
- GitHub: https://github.com/AnikPal-code/AI-Modern-Travel-Agent

## Next Steps

After successful deployment:
1. Share your live URL with users
2. Monitor email delivery in Resend dashboard
3. Update your Gumroad product with the live URL
4. Collect feedback and iterate
