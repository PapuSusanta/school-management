import { Logger } from '@nestjs/common';
import type { ZodObject, ZodRawShape } from 'zod';

import { ZodError } from 'zod';

const logger = new Logger('Environment');
export default function tryParseEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    EnvSchema.parse(buildEnv);
  } catch (error) {
    if (error instanceof ZodError) {
      let message = '\n🚨 Missing Required Environment Variables\n';
      error.issues.forEach((issue) => {
        message += `   • ${issue.path.join('.')}\n`;
      });
      logger.error(message);
      process.exit(1);
    } else {
      logger.error(error);
    }
  }
}
