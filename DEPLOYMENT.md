# Deployment Guide for Spaceship Hosting

## Quick Steps to Deploy Your Website

### Option 1: Using FTP/SFTP (Recommended)

1. **Get your FTP credentials from Spaceship:**
   - Log into your Spaceship account
   - Go to your hosting control panel
   - Find FTP/SFTP credentials (host, username, password, port)
   - Usually the host is something like `ftp.yourdomain.com` or `yourdomain.com`

2. **Use an FTP client:**
   - **Mac**: Use FileZilla (free) or Cyberduck (free)
   - **Windows**: Use FileZilla or WinSCP
   - **VS Code**: Install the "FTP-Sync" extension

3. **Connect and upload:**
   - Connect to your Spaceship FTP server
   - Navigate to the `public_html` or `www` folder (this is your website root)
   - Upload ALL files from your project:
     - `index.html`
     - `about.html`
     - `contact.html`
     - `services.html`
     - `work.html`
     - `case-study-shirokin.html`
     - `case-study-content-systems.html`
     - `styles.css`
     - `script.js`
     - `images/` folder (with all images inside)

4. **Verify:**
   - Visit your domain in a browser
   - Check that all pages load correctly

### Option 2: Using Spaceship File Manager

1. Log into your Spaceship account
2. Navigate to "File Manager" or "Hosting" section
3. Open the `public_html` or `www` folder
4. Upload your files using the web interface
5. Make sure to maintain the folder structure (especially the `images/` folder)

### Option 3: Using Git (if Spaceship supports it)

If Spaceship supports Git deployment:
1. Initialize a git repository in your project folder
2. Add all files and commit
3. Push to Spaceship's Git repository (if available)
4. Configure auto-deploy if supported

## Files to Upload

Make sure to upload ALL of these files:

```
✅ index.html
✅ about.html
✅ contact.html
✅ services.html
✅ work.html
✅ case-study-shirokin.html
✅ case-study-content-systems.html
✅ styles.css
✅ script.js
✅ images/
   ✅ zublo-logo.svg
   ✅ shirokin-infographic.png
```

## Important Notes

1. **Root Directory**: Usually `public_html` or `www` - this is where `index.html` should go
2. **Folder Structure**: Keep the `images/` folder structure intact
3. **File Permissions**: Make sure files are readable (644) and folders are executable (755)
4. **Domain Configuration**: Ensure your domain DNS is pointing to Spaceship's nameservers

## Testing After Deployment

1. Visit your domain: `https://yourdomain.com`
2. Test all pages:
   - Homepage (`/`)
   - Services (`/services.html`)
   - Work (`/work.html`)
   - About (`/about.html`)
   - Contact (`/contact.html`)
   - Case Studies (`/case-study-shirokin.html`, `/case-study-content-systems.html`)
3. Check images load correctly
4. Test on mobile devices
5. Verify the wiggle SVG is visible

## Troubleshooting

- **404 errors**: Make sure files are in the correct directory (`public_html` or `www`)
- **Images not loading**: Check that the `images/` folder was uploaded and paths are correct
- **CSS not working**: Verify `styles.css` is in the root directory
- **Domain not working**: Check DNS settings in Spaceship control panel

## Need Help?

If you need assistance with:
- Setting up FTP connection
- Finding your FTP credentials
- Configuring DNS
- Any deployment issues

Contact Spaceship support or let me know what specific step you're stuck on!
