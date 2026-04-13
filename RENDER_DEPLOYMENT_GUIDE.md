# Deploy Email Backend to Render

This guide explains how to deploy your Node.js email backend to Render.

## Step 1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

## Step 2: Create a New Web Service

1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Select your GitHub repository: `AI-Modern-Travel-Agent`
4. Click **Connect**

## Step 3: Configure the Service

Fill in the following details:

- **Name**: `travel-email-backend` (or any name you prefer)
- **Environment**: `Node`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `email-backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

## Step 4: Add Environment Variables

1. Scroll down to **Environment**
2. Click **Add Environment Variable**
3. Add:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_V7scCa6b_NM9ijneUFos6onhhBchdHaW1`
4. Click **Save**

## Step 5: Deploy

1. Click **Create Web Service**
2. Render will automatically deploy your backend
3. Wait for deployment to complete (2-3 minutes)
4. Copy your service URL (e.g., `https://travel-email-backend.onrender.com`)

## Step 6: Update Frontend

Now update your frontend to use the Render backend URL:

1. Go to your GitHub repo settings
2. Go to **Secrets and variables → Actions**
3. Add/Update:
   - `VITE_EMAIL_BACKEND_URL`: `https://travel-email-backend.onrender.com`

4. Push a new commit to trigger rebuild:
```bash
git commit --allow-empty -m "Update email backend URL to Render"
git push origin main
```

## Step 7: Test

1. Wait for GitHub Actions to complete
2. Go to your GitHub Pages site: `https://anikpal-code.github.io/AI-Modern-Travel-Agent/`
3. Fill out the travel form
4. Click "Email This Itinerary"
5. Send a test email

## Important Notes

- **Free tier**: 750 hours/month (enough for continuous running)
- **Cold starts**: First request may take 10-30 seconds
- **Uptime**: Service may spin down after 15 minutes of inactivity
- **Monitoring**: Check Render dashboard for logs

## Troubleshooting

### Email not sending
- Check Render logs: Dashboard → Your service → Logs
- Verify Resend API key is correct
- Check that recipient email is verified in Resend

### Service not responding
- Check if service is running in Render dashboard
- May need to wait for cold start (first request)
- Check environment variables are set correctly

### Build failed
- Check build logs in Render dashboard
- Verify `email-backend/package.json` exists
- Ensure `npm start` command is correct

## Useful Links

- Render Dashboard: https://dashboard.render.com
- Render Docs: https://render.com/docs
- Your Backend URL: Will be shown after deployment

## Next Steps

1. Deploy backend to Render
2. Update frontend with Render URL
3. Test email functionality
4. Monitor Render dashboard for any issues
