import * as msal from '@azure/msal-node';

const msalConfig = {
  auth: {
    clientId: process.env.OUTLOOK_CLIENT_ID || '',
    authority: 'https://login.microsoftonline.com/common',
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET || '',
  }
};

const msalClient = new msal.ConfidentialClientApplication(msalConfig);

export { msalClient };
