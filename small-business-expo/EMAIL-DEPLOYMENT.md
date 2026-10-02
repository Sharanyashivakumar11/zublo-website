# Activate the Growth Check receipt email

The receipt implementation is in `google-apps-script.js` at the repository root. Publishing GitHub Pages does not update Google Apps Script.

1. Sign into Apps Script with the account that owns the existing contact-form web app. Test notifications were sent by `sharanyashivakumar11@gmail.com`; the browser session checked during this update was signed into another account.
2. Open the existing project, and replace its contact-form script with the updated `google-apps-script.js`. Keep any other project files and existing settings.
3. Save, then select **Deploy → Manage deployments**. Edit the deployment used by the Expo form, select **New version**, and deploy. Keep the existing execution identity, access settings, and URL.
4. Submit one clearly marked test Growth Check request with an email address you control. Check both the owner notification and visitor receipt.
5. The response should contain `success: true` and `acknowledgmentSent: true`. The website displays “A receipt has also been emailed to you” only when this flag is true.

The receipt applies only to the `Expo Growth Check` service. It explains that a call time still needs to be agreed by email, includes the free offer, and sets replies to `contact@zublo.co`. A receipt delivery failure leaves the accepted call request successful so visitors are not encouraged to resubmit it.

Run the script checks with `node --test small-business-expo/acknowledgment.test.cjs`.
