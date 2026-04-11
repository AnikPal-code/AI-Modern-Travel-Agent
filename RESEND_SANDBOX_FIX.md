# Resend Sandbox Mode - How to Fix Email Delivery

## Problem

You see "Email sent successfully" but don't receive the email. This is because Resend is in **sandbox mode**.

## Solution

### Step 1: Verify Your Email in Resend Dashboard

1. Go to [https://resend.com/dashboard](https://resend.com/dashboard)
2. Look for "Verified Senders" or "Domains" section
3. Add your email address as a verified sender:
   - Click "Add Sender"
   - Enter your email (e.g., anikpal12672@gmail.com)
   - Resend will send you a verification link
   - Click the link in your email to verify

### Step 2: Test Again

1. Go back to your app
2. Fill out the travel form
3. Click "Plan My Trip"
4. Click "Email This Itinerary"
5. Enter your verified email address
6. Click "Send Email"
7. You should now receive the email!

## Why Sandbox Mode?

Resend's free tier starts in sandbox mode for security. Once you verify your email, you can send to that address. To send to any email address, you need to:

1. Upgrade to a paid plan, OR
2. Verify each recipient email address

## Verified Senders

After verifying your email, you can send to:
- Your verified email address
- Any other verified email addresses
- (Paid plans can send to anyone)

## Production Setup

For your Gumroad customers:
1. They will need to verify their email in your Resend account, OR
2. You upgrade to a paid Resend plan

For now, test with your verified email address.

## Troubleshooting

### Still not receiving emails?

1. **Check spam folder** - Emails might be marked as spam
2. **Verify email was sent** - Check Resend dashboard → Emails section
3. **Check recipient email** - Make sure it's spelled correctly
4. **Check Resend API key** - Make sure it's correct in `.env.local`

### How to check Resend dashboard

1. Go to https://resend.com/dashboard
2. Click "Emails" to see all sent emails
3. Look for your email in the list
4. Click it to see delivery status

## Next Steps

### For Testing
- Verify your email address
- Test with your verified email

### For Production (Gumroad)
- Option 1: Upgrade Resend to paid plan ($20/month)
- Option 2: Ask customers to verify their email first
- Option 3: Use a different email service

## Support

- Resend Docs: https://resend.com/docs
- Resend Support: https://resend.com/support
