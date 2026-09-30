# Call request tests — September 30, 2026

Tested the local page at http://127.0.0.1:8000/small-business-expo/ against the existing production Google Apps Script endpoint.

## Browser checks

- Header, hero, and mobile booking links reach `#book`.
- Empty required fields and malformed emails are blocked by browser validation.
- Test `ZUBLO-E2E-20260930-CALL-01` submitted all optional fields. The notification email contained the selected goal, website, and preferred time.
- Test `ZUBLO-E2E-20260930-CALL-02` submitted with goal, website, and preferred time blank. The updated client read the backend's successful JSON response, displayed confirmation, reset the form, and restored the submit button.
- Both test notifications were found in the connected sender's Gmail account, addressed to `contact@zublo.co`. This confirms the notification was generated and sent; a separate recipient inbox was not inspected.
- Offline submissions show an error, retain entered details, and restore the button. Offline mode was restored after testing.
- The success state fits a 390px mobile viewport without horizontal overflow. The viewport override was restored after testing.
- No browser console warnings or errors were present after the successful submission using the updated code.

## Reliability fix

Replaced the opaque `no-cors` request with a readable CORS response. Success now requires an HTTP success and JSON `success: true`. Added a 20-second timeout with wording that warns the request may already have reached the server, to reduce accidental duplicates.

## Automated checks

Run `node --test small-business-expo/expo.test.cjs` from the repository root.

Eight checks passed: invalid form, accepted request/default values, HTTP failure, backend rejection, malformed response, network failure, duplicate submission while pending, and timeout recovery.

Also passed `node --check small-business-expo/expo.js` and `git diff --check`.

## Scope and limitations

This flow requests a call. It does not reserve a calendar slot or send an automatic confirmation email to the visitor. A time must still be arranged by email. The underlying spreadsheet and SMS delivery were not independently verified.

Two clearly marked test requests were sent; neither requested an actual appointment. Changes and tests remain local and have not been committed or pushed. The live website still uses its previously published form code.
