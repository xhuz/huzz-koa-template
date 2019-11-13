import {Context} from 'koa';

export async function responseHandle(ctx: Context, next: () => Promise<any>) {
  if (ctx.result !== undefined) {
    ctx.type = 'json';
    ctx.body = {
      code: 0,
      data: ctx.result,
      message: 'ok'
    };
  }
  await next();
}
