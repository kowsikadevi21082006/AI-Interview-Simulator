import express from 'express';
import {
  startInterview,
  postMessage,
  getFeedback,
} from '../controllers/interview.controller';

const router = express.Router();

router.post('/start', startInterview);
router.post('/message', postMessage);
router.post('/feedback', getFeedback);

export default router;
