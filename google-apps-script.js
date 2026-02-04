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
const RECIPIENT_EMAIL = 'hello@smartermarketing.com';

// Your Google Sheet ID (found in the Sheet URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit)
// Leave empty to create a new sheet automatically
const SPREADSHEET_ID = '1sWQILGj4DDqzInW3MC0xpfcE-lSZ8j9qQQLr5FUHJEk';

// Sheet name (tab name) where data will be saved
const SHEET_NAME = 'Form Submissions';

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
    // Parse the form data
    const formData = JSON.parse(e.postData.contents);
    
    // Extract form fields
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
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
