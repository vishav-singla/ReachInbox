import openai from 'openai';

const openaiAPI = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 5000
});

async function generateResponse(content: string): Promise<string> {
  const prompt = `Given the email content: "${content}", suggest an appropriate response.`;
  const response = await openaiAPI.completions.create({ model: 'text-davinci-002', prompt });
  return response.choices[0].text.trim();
}

export { generateResponse };
