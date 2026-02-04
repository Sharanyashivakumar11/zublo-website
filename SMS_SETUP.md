# Free SMS/WhatsApp Setup Guide

## Option 1: Email-to-SMS (FREE - Recommended)

This is completely free and works with most carriers. Your carrier converts emails to text messages.

### Setup Steps:

1. **Find your carrier's email-to-SMS gateway:**
   - **AT&T**: `yournumber@txt.att.net`
   - **Verizon**: `yournumber@vtext.com`
   - **T-Mobile**: `yournumber@tmomail.net`
   - **Sprint**: `yournumber@messaging.sprintpcs.com`
   - **US Cellular**: `yournumber@email.uscc.net`
   - **Boost Mobile**: `yournumber@myboostmobile.com`
   - **Cricket**: `yournumber@sms.cricketwireless.net`
   - **Metro PCS**: `yournumber@mymetropcs.com`

2. **Update your Google Apps Script:**
   - Open `google-apps-script.js`
   - Find the SMS configuration section (around line 47-55)
   - Set `USE_EMAIL_SMS = true`
   - Set `SMS_EMAIL_ADDRESS` to your carrier email
   - Example: If your number is 213-268-0491 and you're on AT&T:
     ```javascript
     const USE_EMAIL_SMS = true;
     const SMS_EMAIL_ADDRESS = '2132680491@txt.att.net';
     ```

3. **Save and redeploy your Google Apps Script**

### Notes:
- Remove dashes, spaces, and parentheses from your phone number
- Some carriers have character limits (usually 160 characters)
- Delivery may be slightly delayed (usually within a few seconds)
- This works for SMS only, not WhatsApp

---

## Option 2: WhatsApp via Twilio (Paid but cheap)

Twilio offers WhatsApp messaging but requires:
- Twilio account (free trial available)
- WhatsApp Business API approval
- Costs: ~$0.005-0.01 per message

**Not recommended for free option.**

---

## Option 3: Free SMS APIs (Limited)

Some services offer free SMS but with limitations:
- **TextBelt**: Free tier (1 message/day)
- **SMS Gateway APIs**: Usually require paid plans

**Not recommended** - email-to-SMS is more reliable and truly free.

---

## Recommendation

**Use Email-to-SMS (Option 1)** - It's:
- ✅ Completely free
- ✅ No signup required
- ✅ Works immediately
- ✅ Reliable for most carriers
- ✅ No API keys needed

Just configure your carrier's email address and you're done!
