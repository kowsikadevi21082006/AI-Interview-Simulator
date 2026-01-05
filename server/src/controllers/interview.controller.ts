import { Request, Response } from 'express';
import InterviewSession from '../models/interviewSession.model';
import ChatHistory from '../models/chatHistory.model';
import FeedbackReport from '../models/feedback.model';
import LangChainService from '../services/langchain.service';
import { successResponse, errorResponse } from '../utils/response';

export async function startInterview(req: Request, res: Response) {
  try {
    const { userId, role, level, topics } = req.body;
    if (!role || !level || !topics || !Array.isArray(topics)) {
      return res.status(400).json(errorResponse('Missing or invalid fields'));
    }

    const session = await InterviewSession.create({ userId, role, level, topics });

    return res.json(successResponse({ sessionId: session._id }));
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message));
  }
}

export async function postMessage(req: Request, res: Response) {
  try {
    const { sessionId, userMessage } = req.body;
    if (!sessionId || !userMessage) return res.status(400).json(errorResponse('Missing fields'));

    // store user message
    const userEntry = await ChatHistory.create({ sessionId, role: 'user', content: userMessage });

    // fetch history
    const history = await ChatHistory.find({ sessionId }).sort({ timestamp: 1 }).lean();

    // generate next question
    const nextQuestion = await LangChainService.generateInterviewerNextQuestion(history as any);

    // store AI message
    const aiEntry = await ChatHistory.create({ sessionId, role: 'ai', content: nextQuestion });

    return res.json(successResponse({ nextQuestion }));
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message));
  }
}

export async function getFeedback(req: Request, res: Response) {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json(errorResponse('Missing sessionId'));

    const history = await ChatHistory.find({ sessionId }).sort({ timestamp: 1 }).lean();

    const analysis = await LangChainService.analyzeFeedback(history as any);

    // store feedback
    const report = await FeedbackReport.create({
      sessionId,
      technicalDepth: analysis.technicalDepth,
      clarity: analysis.clarity,
      confidence: analysis.confidence,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
    });

    return res.json(successResponse({ report }));
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message));
  }
}
