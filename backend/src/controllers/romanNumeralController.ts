import { Request, Response } from 'express';
import { romanNumeralService } from '../services/romanNumeralService';
import { logger, romanNumeralRequests } from '../index';

export const romanNumeralController = {
  convertToRoman: (req: Request, res: Response): void => {
    const start = performance.now();
    
    try {
      const queryParam = req.query.query;
      
      if (!queryParam) {
        logger.warn('Missing required parameter: query');
        romanNumeralRequests.inc({ status: 'error' });
        res.status(400).send('Missing required parameter: query');
        return;
      }
      
      const num = Number(queryParam);
      if (isNaN(num)) {
        logger.warn(`Invalid number format: ${queryParam}`);
        romanNumeralRequests.inc({ status: 'error' });
        res.status(400).send('Invalid number format: must be a number');
        return;
      }
      
      if (!Number.isInteger(num)) {
        logger.warn(`Invalid number: ${num} is not an integer`);
        romanNumeralRequests.inc({ status: 'error' });
        res.status(400).send('Invalid number: must be an integer');
        return;
      }
      
      if (num < 1 || num > 3999) {
        logger.warn(`Number out of range: ${num}`);
        romanNumeralRequests.inc({ status: 'error' });
        res.status(400).send('Number out of range: must be between 1 and 3999');
        return;
      }
      
      const romanNumeral = romanNumeralService.convertToRoman(num);
      
      const end = performance.now();
      logger.info({
        msg: `Converted ${num} to ${romanNumeral}`,
        conversionTime: `${(end - start).toFixed(2)}ms`,
        input: num,
        output: romanNumeral
      });
      
      romanNumeralRequests.inc({ status: 'success' });
      
      res.json({
        input: queryParam.toString(),
        output: romanNumeral
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error in conversion: ${errorMessage}`, error);
      romanNumeralRequests.inc({ status: 'error' });
      res.status(500).send('Internal Server Error');
    }
  }
};