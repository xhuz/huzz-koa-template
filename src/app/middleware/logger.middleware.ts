import {Context} from 'koa';
import {logText, logger} from '../core/logger';

export async function loggerHandle(ctx: Context, next: () => Promise<any>) {
  const start = Date.now();
  await next();
  const end = Date.now();
  const ms = end - start;
  const log = logText(ctx, ms);
  logger.info(log);
}
