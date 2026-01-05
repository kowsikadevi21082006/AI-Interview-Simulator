import { Request, Response } from 'express';
import LangChainService from '../services/langchain.service';
import { successResponse, errorResponse } from '../utils/response';

export async function handleLearn(req: Request, res: Response) {
  try {
    const { technology, topic, depth } = req.body;
    if (!technology || !topic || !depth) {
      return res.status(400).json(errorResponse('Missing required fields'));
    }

    const result = await LangChainService.generateLearn(technology, topic, depth);

    return res.json(successResponse(result));
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message));
  }
}
