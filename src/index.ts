import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import referralRoutes from './routes/referral.route';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.use('/api/referral', referralRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

interface CustomError extends Error {
  statusCode?: number;
}

// Error-Handling Middleware
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});