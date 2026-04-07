# 📧 Email Backend Setup Guide

Complete guide to set up the email backend for TravelHelperAI.

---

## 🚀 Quick Start

### Step 1: Get Gmail App Password

1. Go to https://myaccount.google.com/
2. Click "Security" in the left menu
3. Enable "2-Step Verification" (if not already enabled)
4. Go to "App passwords"
5. Select "Mail" and "Windows Computer" (or your device)
6. Google will generate a 16-character password
7. Copy this password

### Step 2: Configure Environment Variables

1. Go to `email-backend/` folder
2. Create a file named `.env`
3. Add these lines:
```
EMAIL_USER=anikpal12672@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
PORT=3001
```

Replace:
- `anikpal12672@gmail.com` with your Gmail address
- `your-16-character-app-password` with the password from Step 1

### Step 3: Install Dependencies

```bash
cd email-backend
npm install
```

### Step 4: Start the Backend

```bash
npm start
```

You should see:
```
🚀 Email backend running on http://localhost:3001
📧 Email configured: anikpal12672@gmail.com
```

### Step 5: Test It

In another terminal, run:
```bash
curl http://localhost:3001/health
```

You should see:
```json
{"status":"Email backend is running! 🚀"}
```

---

## 🎯 How It Works

### Frontend (React)
1. User fills travel form
2. Clicks "Plan My Trip"
3. Gets itinerary with booking links
4. Clicks "Email This Itinerary"
5. Enters recipient email and name
6. Clicks "Send Email"

### Backend (Node.js)
1. Receives email request
2. Validates data
3. Sends email via Gmail SMTP
4. Returns success/error response

### Email Content
- Trip summary
- Budget breakdown
- AI-generated itinerary
- All booking links (flights, hotels, car rentals)
- Travel checklist

---

## 🔧 Troubleshooting

### "Email backend is not running"
- Make sure you ran `npm start` in the `email-backend` folder
- Check that port 3001 is not in use
- Try: `npm start` again

### "Authentication failed"
- Double-check your Gmail address
- Verify the app password is correct (16 characters)
- Make sure 2-factor authentication is enabled
- Generate a new app password if needed

### "Module not found"
- Run `npm install` in the `email-backend` folder
- Make sure you're in the correct directory

### "Port 3001 already in use"
- Change PORT in `.env` to a different number (e.g., 3002)
- Or kill the process using port 3001

---

## 📝 Environment Variables

### Required
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASSWORD` - Your Gmail app password

### Optional
- `PORT` - Server port (default: 3001)

---

## 🔐 Security Notes

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use app passwords** - Not your main Gmail password
3. **Keep credentials private** - Don't share your `.env` file
4. **Use HTTPS in production** - For secure email transmission

---

## 📧 Email Features

### What Gets Sent
- ✅ Trip summary (destination, dates, travelers)
- ✅ Budget breakdown
- ✅ AI-generated itinerary
- ✅ Flight booking links (Google Flights, Kayak, Skyscanner, Expedia)
- ✅ Hotel booking links (Booking.com, Airbnb, Hotels.com, Agoda)
- ✅ Car rental links (if selected)
- ✅ Travel checklist
- ✅ Professional HTML formatting

### Email Sender
- From: `TravelHelperAI <your-email@gmail.com>`
- Subject: `Your Complete Travel Itinerary for [Destination]`

---

## 🚀 Production Deployment

### Option 1: Heroku (Free)
```bash
# Install Heroku CLI
# Login: heroku login
# Create app: heroku create your-app-name
# Set env vars: heroku config:set EMAIL_USER=... EMAIL_PASSWORD=...
# Deploy: git push heroku main
```

### Option 2: Railway (Free)
```bash
# Go to https://railway.app
# Connect GitHub repo
# Add environment variables
# Deploy automatically
```

### Option 3: Render (Free)
```bash
# Go to https://render.com
# Create new Web Service
# Connect GitHub repo
# Add environment variables
# Deploy
```

---

## 📊 API Endpoints

### Health Check
```
GET /health
Response: {"status":"Email backend is running! 🚀"}
```

### Send Email
```
POST /send-email
Content-Type: application/json

{
  "to_email": "recipient@example.com",
  "to_name": "Recipient Name",
  "subject": "Your Travel Itinerary",
  "message": "Full itinerary content..."
}

Response:
{
  "success": true,
  "message": "Email sent successfully to recipient@example.com",
  "messageId": "..."
}
```

---

## 🎯 Next Steps

1. ✅ Set up Gmail app password
2. ✅ Create `.env` file
3. ✅ Run `npm install`
4. ✅ Start backend with `npm start`
5. ✅ Test with `curl http://localhost:3001/health`
6. ✅ Use in React app

---

## 💡 Tips

1. **Keep backend running** - While using the React app
2. **Check console logs** - For debugging email issues
3. **Test with your email** - Before sharing with others
4. **Monitor rate limits** - Gmail has sending limits
5. **Use app passwords** - More secure than main password

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify `.env` file is correct
3. Check backend console for error messages
4. Ensure port 3001 is available
5. Try restarting the backend

---

**Email backend is ready! 🚀**