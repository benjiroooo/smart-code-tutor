import type { NextApiRequest, NextApiResponse } from 'next';
import { queryGeminiAI } from '../../services/geminiService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Extract the question from the request body
      const { question } = req.body;
      const response = await queryGeminiAI(question);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to query Gemini AI' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
