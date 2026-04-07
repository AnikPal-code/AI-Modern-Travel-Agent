# Resend Email Setup Guide

This guide explains how to set up Resend for sending travel itineraries via email.

## What is Resend?

Resend is a modern email API service that makes it easy to send transactional emails. It's perfect for sending travel itineraries to users.

## Setup Steps

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Go to **API Keys** section
3. Create a new API key (or copy your existing one)
4. Copy the API key

### 3. Add API Key to Environment Variables

1. Open `.env.local` in your project root
2. Find the line: `VITE_RESEND_API_KEY=your_resend_api_key_here`
3. Replace `your_resend_api_key_here` with your actual Resend API key
4. Save the file

Example:
```
VITE_RESEND_API_KEY=re_1234567890abcdefghijklmnop
```

### 4. Verify Setup

1. Start the development server: `npm run dev`
2. Fill out the travel form and click "Plan My Trip"
3. Once you get results, click "Email This Itinerary"
4. Enter a recipient's name and email
5. Click "Send Email"
6. You should see a success message

## Troubleshooting

### "Resend API key is not configured"
- Make sure you've added `VITE_RESEND_API_KEY` to `.env.local`
- Restart the dev server after adding the key
- Check that the key is correct (no extra spaces)

### Email not sending
- Verify your Resend API key is valid
- Check the browser console for error messages
- Make sure the recipient email is valid
- Check your Resend dashboard for any failed deliveries

### Using Custom Domain (Optional)

For production, you can set up a custom domain in Resend:

1. Go to Resend dashboard → Domains
2. Add your domain
3. Follow the DNS verification steps
4. Update the `from` email in `src/services/resendEmailService.ts`:
   ```typescript
   from: 'TravelHelperAI <noreply@yourdomain.com>',
   ```

## Free Tier Limits

Resend's free tier includes:
- 100 emails per day
- Full API access
- Excellent for testing and small projects

## Production Deployment

When deploying to Vercel or other platforms:

1. Add `VITE_RESEND_API_KEY` to your environment variables in the deployment platform
2. Never commit your API key to version control
3. Use `.env.local` for local development only

## Support

For more information, visit [Resend Documentation](https://resend.com/docs)
