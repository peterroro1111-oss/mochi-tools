import * as Sentry from '@sentry/nextjs';

export function captureToolError(toolName: string, error: unknown) {
  console.error(`[${toolName}]`, error);
  Sentry.captureException(error, {
    tags: { tool: toolName },
  });
}
