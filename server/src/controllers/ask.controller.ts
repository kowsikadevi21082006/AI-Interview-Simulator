import { Request, Response } from 'express';
import LangChainService from '../services/langchain.service';
import { successResponse, errorResponse } from '../utils/response';

export async function handleAsk(req: Request, res: Response) {
  try {
    const { technology, depth, question } = req.body;
    if (!technology || !depth || !question) return res.status(400).json(errorResponse('Missing fields'));

    const result = await LangChainService.answerAskMode(technology, depth, question);
    return res.json(successResponse(result));
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message));
  }
}
