import express from 'express';
import { romanNumeralController } from '../controllers/romanNumeralController';

export const romanNumeralRouter = express.Router();

// Roman numeral conversion endpoint
romanNumeralRouter.get('/romannumeral', romanNumeralController.convertToRoman);