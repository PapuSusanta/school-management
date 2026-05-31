import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import env from './src/lib/env';

export default defineConfig({
  out: './src/lib/db/migrations',
  schema: './src/lib/db/schema/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
