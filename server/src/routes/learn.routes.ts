import express from 'express';
import { handleLearn } from '../controllers/learn.controller';

const router = express.Router();

router.post('/', handleLearn);

export default router;
