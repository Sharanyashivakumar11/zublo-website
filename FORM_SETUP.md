# Contact Form Setup Instructions

Your contact form is now set up to work! You have a few options for handling form submissions:

## Option 1: Google Sheets + Email (Recommended - Free & Does Both!)

**This option sends you emails AND saves to Google Sheets - perfect for your needs!**

See `GOOGLE_SHEETS_SETUP.md` for complete step-by-step instructions.

Quick setup:
1. Copy code from `google-apps-script.js` to Google Apps Script
2. Deploy as Web App
3. Paste the Web App URL in `contact.html`

✅ Sends email notifications  
✅ Saves to Google Sheets automatically  
✅ Completely free, no limits!

## Option 2: Formspree (Free & Easy - Email Only)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form endpoint (it will look like `https://formspree.io/f/YOUR_FORM_ID`)
3. In `contact.html`, replace `YOUR_FORM_ID` in the form action with your actual Formspree form ID:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. That's it! Formspree will email you submissions and you get 50 free submissions per month.

## Option 2: Netlify Forms (If hosting on Netlify)

If you're hosting on Netlify, you can use their built-in form handling:

1. Change the form action to just `action="/"` or remove it
2. Add `netlify` attribute to the form: `<form class="contact-form" id="contactForm" netlify>`
3. Netlify will automatically handle form submissions

## Option 3: EmailJS (Client-side email sending)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Set up an email service
3. Update the JavaScript in `script.js` to use EmailJS API instead of Formspree

## Current Features

✅ Form validation (required fields)
✅ Loading state (button shows "Sending..." while submitting)
✅ Success message display
✅ Error handling with user-friendly messages
✅ Form reset after successful submission
✅ Disabled button state during submission

The form is ready to use once you configure one of the submission methods above!
