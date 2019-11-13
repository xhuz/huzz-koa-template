import {configure, getLogger} from 'log4js';
import {resolve} from 'path';
import {Context} from 'koa';

const logPath = resolve(__dirname, '../../../logs');

configure({
  appenders: {
    console: {type: 'console'},
    dateFile: {type: 'dateFile', filename: `${logPath}/log.log`, pattern: 'yyyy-MM-dd', alwaysIncludePattern: true, keepFileExt: true}
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    },
    mysql: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    }
  }
});

export const logger = getLogger('default');
export const mysqlLogger = getLogger('mysql');

export function logText(ctx: Context, ms: number) {
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips || (ctx.socket && ctx.socket.remoteAddress);
  return `${ctx.method} ${ctx.status} ${ctx.url} - ${remoteAddress} - ${ms}ms`;
}
