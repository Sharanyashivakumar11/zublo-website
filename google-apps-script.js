/**
 * Google Apps Script for Contact Form
 * 
 * This script:
 * 1. Receives form submissions
 * 2. Sends email notifications
 * 3. Saves data to Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete the default code and paste this entire file
 * 4. Update the configuration below (YOUR_EMAIL, SPREADSHEET_ID)
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Set Execute as: "Me"
 * 8. Set Who has access: "Anyone"
 * 9. Click "Deploy" and copy the Web App URL
 * 10. Paste that URL in contact.html (replace YOUR_GOOGLE_APPS_SCRIPT_URL)
 */

// ========== CONFIGURATION ==========
// Update these values:

// Your email address where you want to receive form submissions
const RECIPIENT_EMAIL = 'contact@zublo.co';

// Your Google Sheet ID (found in the Sheet URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit)
// Leave empty to create a new sheet automatically
const SPREADSHEET_ID = '1sWQILGj4DDqzInW3MC0xpfcE-lSZ8j9qQQLr5FUHJEk';

// Sheet name (tab name) where data will be saved
const SHEET_NAME = 'Form Submissions';

// Spreadsheet URL for email notifications
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1sWQILGj4DDqzInW3MC0xpfcE-lSZ8j9qQQLr5FUHJEk/edit?gid=0#gid=0';

// ========== SMS/WHATSAPP CONFIGURATION ==========
// Option 1: Twilio (Recommended - supports SMS and WhatsApp)
// Get your credentials from https://www.twilio.com/
const USE_TWILIO = false; // Set to true to enable Twilio
const TWILIO_ACCOUNT_SID = 'YOUR_TWILIO_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN';
const TWILIO_PHONE_NUMBER = 'YOUR_TWILIO_PHONE_NUMBER'; // Format: +1234567890
const YOUR_PHONE_NUMBER = 'YOUR_PHONE_NUMBER'; // Format: +1234567890 (include country code)

// Option 2: Email-to-SMS (Free but carrier-dependent)
// Most carriers support email-to-SMS. Format: yournumber@carrier.com
// Common carriers: 
// - AT&T: number@txt.att.net
// - Verizon: number@vtext.com
// - T-Mobile: number@tmomail.net
// - Sprint: number@messaging.sprintpcs.com
const USE_EMAIL_SMS = true; // Set to true to enable email-to-SMS
const SMS_EMAIL_ADDRESS = '2132680491@tmomail.net'; // T-Mobile format: number@tmomail.net (update with your number)

// ========== MAIN FUNCTION ==========

/**
 * Handles GET requests (when someone visits the URL directly)
 * This is useful for testing
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: 'Google Apps Script is running! Use POST to submit form data.',
      instructions: 'This endpoint accepts POST requests with JSON data from your contact form.'
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles POST requests from the contact form
 */
function doPost(e) {
  try {
    let formData = {};
    
    // Log what we received for debugging
    Logger.log('e.postData: ' + JSON.stringify(e.postData));
    Logger.log('e.parameter: ' + JSON.stringify(e.parameter));
    
    // Handle both JSON and URL-encoded form data
    if (e.postData && e.postData.contents) {
      const contentType = e.postData.type || '';
      Logger.log('Content-Type: ' + contentType);
      Logger.log('PostData contents: ' + e.postData.contents);
      
      if (contentType.includes('application/json') || e.postData.contents.trim().startsWith('{')) {
        // JSON data
        try {
          formData = JSON.parse(e.postData.contents);
          Logger.log('Parsed JSON: ' + JSON.stringify(formData));
        } catch (parseError) {
          Logger.log('JSON parse error: ' + parseError.toString());
          throw new Error('Failed to parse JSON: ' + parseError.toString());
        }
      } else {
        // URL-encoded data (fallback)
        const params = e.parameter || {};
        formData = {
          name: params.name || '',
          email: params.email || '',
          phone: params.phone || '',
          business: params.business || '',
          service: params.service || '',
          message: params.message || ''
        };
        Logger.log('Using URL-encoded params: ' + JSON.stringify(formData));
      }
    } else if (e.parameter) {
      // Direct parameter access (for URL-encoded forms)
      const params = e.parameter;
      formData = {
        name: params.name || '',
        email: params.email || '',
        phone: params.phone || '',
        business: params.business || '',
        service: params.service || '',
        message: params.message || ''
      };
    } else {
      throw new Error('No form data received');
    }
    
    // Extract form fields with validation
    const name = formData.name || '';
    const email = formData.email || '';
    const phone = formData.phone || '';
    const business = formData.business || '';
    const service = formData.service || '';
    const message = formData.message || '';
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Add the data to the sheet
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      business,
      service,
      message
    ]);
    
    // Send email notification
    sendEmail(name, email, phone, business, service, message);
    
    // Send SMS/WhatsApp notification
    sendSMS(name, email, service, message);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully'
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========== HELPER FUNCTIONS ==========

/**
 * Gets the spreadsheet or creates a new one if needed
 */
function getOrCreateSheet() {
  let spreadsheet;
  
  if (SPREADSHEET_ID) {
    // Use existing spreadsheet
    try {
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (error) {
      // If spreadsheet not found, create a new one
      spreadsheet = createNewSpreadsheet();
    }
  } else {
    // Create a new spreadsheet
    spreadsheet = createNewSpreadsheet();
  }
  
  // Get or create the sheet tab
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    // Add headers
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Business Name',
      'Service',
      'Message'
    ]);
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#E57236');
    headerRange.setFontColor('#FFFFFF');
    // Auto-resize columns
    sheet.autoResizeColumns(1, 7);
  }
  
  return sheet;
}

/**
 * Creates a new Google Spreadsheet
 */
function createNewSpreadsheet() {
  const spreadsheet = SpreadsheetApp.create('Contact Form Submissions');
  // Note: You'll need to manually share this spreadsheet or make it accessible
  // The spreadsheet ID will be in the URL after creation
  return spreadsheet;
}

/**
 * Sends email notification
 */
function sendEmail(name, email, phone, business, service, message) {
  const subject = `New Contact Form Submission: ${service}`;
  
  let emailBody = `
New contact form submission received:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Business: ${business || 'Not provided'}
Service: ${service}

Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString()}

View in Google Sheet:
${SPREADSHEET_URL}
  `.trim();
  
  // Send email
  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: subject,
    body: emailBody,
    replyTo: email // Allows you to reply directly to the form submitter
  });
}

/**
 * Sends SMS or WhatsApp notification
 */
function sendSMS(name, email, service, message) {
  try {
    if (USE_TWILIO) {
      sendSMSViaTwilio(name, email, service, message);
    } else if (USE_EMAIL_SMS) {
      sendSMSViaEmail(name, email, service, message);
    }
  } catch (error) {
    Logger.log('SMS sending error (non-critical): ' + error.toString());
    // Don't throw - SMS is optional, don't fail the form submission if SMS fails
  }
}

/**
 * Sends SMS via Twilio (supports SMS and WhatsApp)
 */
function sendSMSViaTwilio(name, email, service, message) {
  const smsBody = `New form submission:\n${name}\n${email}\n${service}\n\n${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`;
  
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  
  const payload = {
    'From': TWILIO_PHONE_NUMBER,
    'To': YOUR_PHONE_NUMBER,
    'Body': smsBody
  };
  
  const options = {
    'method': 'post',
    'headers': {
      'Authorization': 'Basic ' + Utilities.base64Encode(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN)
    },
    'payload': payload
  };
  
  const response = UrlFetchApp.fetch(url, options);
  Logger.log('Twilio SMS sent: ' + response.getContentText());
}

/**
 * Sends SMS via Email-to-SMS gateway (free but carrier-dependent)
 */
function sendSMSViaEmail(name, email, service, message) {
  const smsBody = `New form: ${name} - ${service}. ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`;
  
  MailApp.sendEmail({
    to: SMS_EMAIL_ADDRESS,
    subject: '', // Some carriers require empty subject
    body: smsBody
  });
  
  Logger.log('Email-to-SMS sent to: ' + SMS_EMAIL_ADDRESS);
}

/**
 * Test function - run this to test your setup
 * Go to Run > Run function > testSetup
 */
function testSetup() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    business: 'Test Business',
    service: 'Website',
    message: 'This is a test message'
  };
  
  const mockEvent = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify(testData)
    },
    parameter: {}
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
