/*
  LangChain service placeholder.
  This file provides interfaces to the AI model. Currently it returns mocked responses.
  Replace the mock implementations with actual LangChain/OpenAI calls when integrating.
*/

import { IChatMessage } from '../models/chatHistory.model';

export default class LangChainService {
  static interviewerSystemPrompt = `You are a senior technical interviewer. Ask concise, probing follow-up questions to evaluate depth. Do NOT teach or provide feedback during the interview. Keep tone professional and challenging.`;

  static learnSystemPrompt = `You are an AI tutor. Provide clear teaching explanations from beginner to advanced based on requested depth. Use examples and common pitfalls.`;

  static feedbackSystemPrompt = `You are an analytical evaluator. Assess the transcript and produce numeric scores for technical depth, clarity, and confidence. Provide strengths, weaknesses, and suggestions.`;

  static askSystemPrompt = `You are a friendly tutor. Answer the user's question based on the selected technology and depth.`;

  static async generateLearn(technology: string, topic: string, depth: string) {
    // Mocked response
    return {
      concept: `(${depth}) Core explanation of ${topic} in ${technology}`,
      example: `Real-world example of ${topic} when working with ${technology}`,
      mistakes: [`Common mistake 1`, `Common mistake 2`, `Common mistake 3`],
    };
  }

  static async generateInterviewerNextQuestion(history: IChatMessage[]) {
    // Very simple heuristic mock: if user message short -> ask follow-up
    const lastUser = [...history].reverse().find((m) => m.role === 'user');
    const question = lastUser && lastUser.content.length < 80
      ? 'Can you explain that in more detail with an example?' 
      : 'Good. How would you handle edge cases in that approach?';

    return question;
  }

  static async analyzeFeedback(history: IChatMessage[]) {
    // Mock analysis
    return {
      technicalDepth: 78,
      clarity: 80,
      confidence: 72,
      strengths: ['Clear structure', 'Good examples'],
      weaknesses: ['Edge cases', 'Testing depth'],
      suggestions: ['Practice edge cases', 'Add tests and benchmarks'],
    };
  }

  static async answerAskMode(technology: string, depth: string, question: string) {
    return {
      answer: `(${depth}) Answer for ${technology}: ${question} - Explanation and examples.`,
      followUps: ['Would you like a code example?', 'Shall I expand on the trade-offs?'],
    };
  }
}
