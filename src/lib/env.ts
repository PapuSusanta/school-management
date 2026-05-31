import 'dotenv/config';

import z from 'zod';
import tryParseEnv from './try-parse-env';

export const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;
tryParseEnv(EnvSchema);

export default EnvSchema.parse(process.env);
