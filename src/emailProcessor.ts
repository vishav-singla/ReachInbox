import { generateResponse } from './openaiService';
import { queue } from './taskScheduler';


async function processEmail(emailContent: string): Promise<void> {

  let category = 'Not Interested';
  if (emailContent.includes('interested')) {
    category = 'Interested';
  } else if (emailContent.includes('more information')) {
    category = 'More Information';
  }

  let response = '';
  if (category === 'Interested') {
    response = await generateResponse(emailContent);
  } else if (category === 'More Information') {
    response = 'Thank you for your interest. Could you provide more details so we can assist you better?';
  } else {
    response = 'Thank you for reaching out. If you have any questions, feel free to ask.';
  }

  await queue.add('send-email', { email: 'recipient@example.com', content: response });
}

export { processEmail };
