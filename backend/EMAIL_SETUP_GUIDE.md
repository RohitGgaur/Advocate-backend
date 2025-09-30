# Email Setup Guide for Contact Form

## Issue
The contact form is not sending emails because the Gmail SMTP configuration is missing the App Password.

## Solution

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to enable 2-Factor Authentication

### Step 2: Generate App Password
1. Go back to "Security" settings
2. Under "Signing in to Google", click on "App passwords"
3. Select "Mail" as the app
4. Select "Other (Custom name)" as the device
5. Enter "Judicioworks Contact Form" as the name
6. Click "Generate"
7. Copy the 16-character password (e.g., "abcd efgh ijkl mnop")

### Step 3: Update .env File
Replace `your_app_password_here` in the `.env` file with the generated App Password:

```env
EMAIL_USER=gaur0423@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### Step 4: Restart the Server
After updating the .env file, restart the backend server:

```bash
npm start
```

## Testing
1. Go to the contact form on the website
2. Fill out the form with test data
3. Submit the form
4. Check the email inbox for `gaur0423@gmail.com`

## Troubleshooting

### If emails still don't work:
1. Check the server logs for email errors
2. Verify the App Password is correct (no spaces in the .env file)
3. Make sure 2FA is enabled on the Gmail account
4. Check if Gmail is blocking the login attempt

### Common Issues:
- **"Invalid login"**: App Password is incorrect
- **"Less secure app access"**: Need to use App Password, not regular password
- **"2FA required"**: Need to enable 2-Factor Authentication first

## Security Note
- Never commit the .env file to version control
- The App Password is specific to this application
- You can revoke the App Password anytime from Google Account settings

