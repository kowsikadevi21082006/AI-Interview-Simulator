import express from 'express';
import { handleAsk } from '../controllers/ask.controller';

const router = express.Router();

router.post('/', handleAsk);

export default router;
