import Imap from 'imap';

const gmailImap = new Imap({
  user: process.env.GMAIL_EMAIL!,
  password: process.env.GMAIL_PASSWORD!,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  authTimeout: 3000
});

const outlookImap = new Imap({
  user: process.env.OUTLOOK_EMAIL!,
  password: process.env.OUTLOOK_PASSWORD!,
  host: 'outlook.office365.com',
  port: 993,
  tls: true,
  authTimeout: 3000
});

// Logic to fetch emails from Gmail and Outlook
