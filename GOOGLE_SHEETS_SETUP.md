# Google Sheets + Email Setup Guide

This guide will help you set up your contact form to send emails and save submissions to Google Sheets - **completely free!**

## Step-by-Step Setup

### Step 1: Create a Google Sheet (Optional)

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet (or use an existing one)
3. Copy the **Spreadsheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Copy the `YOUR_SHEET_ID` part
   - **OR** leave it empty in the script to auto-create a new sheet

### Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Delete the default code (`function myFunction() {}`)
4. Open the file `google-apps-script.js` from this project
5. Copy **ALL** the code and paste it into the Google Apps Script editor

### Step 3: Configure the Script

In the Google Apps Script editor, update these values at the top of the file:

```javascript
// Your email where you want to receive form submissions
const RECIPIENT_EMAIL = 'hello@smartermarketing.com';

// Your Google Sheet ID (or leave empty to auto-create)
const SPREADSHEET_ID = '';

// Sheet tab name
const SHEET_NAME = 'Form Submissions';
```

### Step 4: Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to **"Select type"**
3. Choose **"Web app"**
4. Configure:
   - **Description**: "Contact Form Handler" (optional)
   - **Execute as**: **"Me"** (your Google account)
   - **Who has access**: **"Anyone"** (important!)
5. Click **"Deploy"**
6. **Copy the Web App URL** (you'll need this next!)

### Step 5: Update Your Website

1. Open `contact.html` in your project
2. Find this line (around line 68):
   ```html
   <form class="contact-form" id="contactForm" action="YOUR_GOOGLE_APPS_SCRIPT_URL" method="POST">
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the Web App URL you copied
4. Save the file

### Step 6: Test It!

1. Open your website's contact page
2. Fill out and submit the form
3. Check:
   - ✅ You should receive an email
   - ✅ Data should appear in your Google Sheet

## Troubleshooting

### "Script function not found" error
- Make sure you copied ALL the code from `google-apps-script.js`
- Make sure the `doPost` function is present

### "Authorization required" error
- When you first deploy, Google will ask for permissions
- Click "Review Permissions" → Choose your Google account → Click "Advanced" → "Go to [Project Name] (unsafe)" → Click "Allow"
- This is safe - it's your own script

### Form submits but no email/sheet entry
- Check the Google Apps Script execution log:
  - In Apps Script, click "Executions" (clock icon) to see any errors
- Make sure `RECIPIENT_EMAIL` is correct
- Make sure the Web App URL in `contact.html` is correct

### Can't find the spreadsheet
- If you left `SPREADSHEET_ID` empty, a new spreadsheet was created
- Go to [Google Drive](https://drive.google.com) and search for "Contact Form Submissions"
- Or check your Apps Script project - the spreadsheet link might be in the logs

## Security Note

The Web App URL is public, but it only accepts POST requests with the correct data format. However, you can add additional security:

1. In the Apps Script deployment settings, you can add a secret key
2. Update the JavaScript in `script.js` to include this key in the request

## What You Get

✅ **Email notifications** - Get an email for every form submission  
✅ **Google Sheets log** - All submissions saved with timestamps  
✅ **Reply-to functionality** - Click reply in your email to respond directly to the submitter  
✅ **Completely free** - No limits, no costs!

## Need Help?

If you run into issues:
1. Check the Apps Script execution logs
2. Make sure all URLs and IDs are correct
3. Test with the `testSetup()` function in Apps Script (Run → testSetup)
