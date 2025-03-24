import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import promClient from 'prom-client';
import crypto from 'crypto';
import { romanNumeralRouter } from './routes/romanNumeralRoutes';

const app = express();
const port = process.env.PORT || 8080;

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { 
      colorize: true,
      translateTime: 'SYS:standard'
    }
  }
});

export const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

export const romanNumeralRequests = new promClient.Counter({
  name: 'roman_numeral_requests_total',
  help: 'Total number of requests to the Roman numeral endpoint',
  labelNames: ['status']
});

register.registerMetric(romanNumeralRequests);

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ 
  logger,
  
  genReqId: (req: express.Request) => req.headers['x-request-id'] as string || crypto.randomUUID()
}));


app.use(romanNumeralRouter);

app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.send('Roman Numeral Converter API is running. Try /romannumeral?query=42');
});


app.get('/metrics', async (req, res) => {
  logger.info('Metrics endpoint accessed');
  try {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  } catch (error) {
    logger.error('Error generating metrics', error);
    res.status(500).send('Error generating metrics');
  }
});


app.get('/health', (req, res) => {
  logger.info('Health check performed');
  res.status(200).send('OK');
});


app.use((req, res) => {
  logger.warn(`Route not found: ${req.path}`);
  res.status(404).send('Not Found');
});


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Unhandled error: ${err.message}`, err);
  res.status(500).send('Internal Server Error');
});


app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});