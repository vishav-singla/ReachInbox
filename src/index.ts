import { oauth2Client } from './oauth';
import { msalClient } from './outlookAuth';
import { processEmail } from './emailProcessor';

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    
    console.log('Refresh token:', tokens.refresh_token);
  }
  console.log('Access token:', tokens.access_token);
});

async function handleOutlookAuth(): Promise<void> {
  const authCodeUrlParameters = {
    scopes: ["user.read", "mail.read"],
    redirectUri: "http://localhost:3000/outlook/callback",
  };

  try {
    const authCodeUrl = await msalClient.getAuthCodeUrl(authCodeUrlParameters);
    console.log('Navigate to this URL and sign in:', authCodeUrl);
  } catch (error) {
    console.error('Error getting auth code URL:', error);
  }
}

async function processIncomingEmails(): Promise<void> {
  try {
    const emailContent = 'Sample email content';  // Replace with actual email content
    await processEmail(emailContent);
  } catch (error) {
    console.error('Error processing emails:', error);
  }
}

handleOutlookAuth();
processIncomingEmails();
