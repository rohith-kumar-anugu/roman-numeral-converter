import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(`Error: ${err.message}`);
  
  res.status(500).send('Internal Server Error');
}