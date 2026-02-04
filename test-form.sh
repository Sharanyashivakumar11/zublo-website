#!/bin/bash

# Test script for Google Apps Script contact form
# Usage: ./test-form.sh

echo "Testing Google Apps Script form submission..."
echo ""

curl -L -X POST "https://script.google.com/macros/s/AKfycbwIiLX0i0ybqBGjIHBUKgAMJhmC-083XFUmoOcAUS5waNSBkNOUMaM9Peblg45yQGq3/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123-456-7890",
    "business": "Test Business Inc",
    "service": "Website",
    "message": "This is a test message from curl to verify the form is working correctly."
  }'

echo ""
echo ""
echo "Check your email and Google Sheet for the submission!"
