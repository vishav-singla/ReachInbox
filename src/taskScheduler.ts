import { Queue, Worker } from 'bullmq';

const queue = new Queue('email-tasks');

const worker = new Worker('email-tasks', async job => {
  const emailContent = job.data.emailContent;
  console.log('Processing email:', emailContent);
});

export { queue };
