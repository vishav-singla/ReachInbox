import Imap from 'imap';
import { generateResponse } from './openaiService';
import { queue } from './taskScheduler';

const gmailImap = new Imap({
  user: process.env.GMAIL_EMAIL!,
  password: process.env.GMAIL_PASSWORD!,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  authTimeout: 3000
});

gmailImap.once('ready', () => {
  gmailImap.openBox('INBOX', true, (err, box) => {
    if (err) {
      console.error('Error opening Gmail inbox:', err);
      return;
    }

    gmailImap.on('mail', async (numNewMsgs: number) => {

      const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'] };
      const fetch = gmailImap.seq.fetch(box.messages.total - numNewMsgs + 1, {
        markSeen: true,
        ...fetchOptions
      });

      fetch.on('message', async (msg) => {
        let emailContent = '';

        msg.on('body', (stream, info) => {
          if (info.which === 'TEXT') {
            stream.on('data', (chunk) => {
              emailContent += chunk.toString('utf8');
            });
          }
        });

        msg.once('end', async () => {

          console.log('Processing email:', emailContent);
          const response = await generateResponse(emailContent);
          await queue.add('send-email', { email: 'recipient@example.com', content: response });
        });
      });

      fetch.once('end', () => {
        console.log('No more emails to fetch.');
      });
    });
  });
});

gmailImap.once('error', (err: any) => {
  console.error('IMAP connection error:', err);
});

gmailImap.connect();
