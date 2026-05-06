import cors from 'cors';
  import { env } from './env';

  export const corsConfig = cors({
    origin: env.ALLOWED_ORIGINS,
    credentials: true,
    optionsSuccessStatus: 200,
  });
