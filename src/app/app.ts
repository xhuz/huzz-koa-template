import 'reflect-metadata';
import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as body from 'koa-body';
import * as staticService from 'koa-static';
import * as Router from 'koa-router';
import {autoRouter} from 'koa-route-decors';
import {loggerHandle} from './middleware/logger.middleware';
import {errorHandle} from './middleware/error.middleware';
import {responseHandle} from './middleware/response.middleware';
import {jwt} from './middleware/jwt.middleware';
import {resolve} from 'path';
import {connection} from './database';

export class App {
  private app: Koa;
  constructor(port: number) {
    this.app = new Koa();
    this.init().then(() => {
      this.start(port);
    }).catch(err => {
      console.log(err);
    });
  }

  private async init() {
    await connection();
    const router = new Router();
    const subRouter = await autoRouter(resolve(__dirname, './'));
    router.use(subRouter.routes(), jwt);
    this.app
      .use(cors())
      .use(loggerHandle)
      .use(errorHandle)
      .use(body({
        multipart: true
      }))
      .use(router.routes())
      .use(router.allowedMethods())
      .use(staticService(resolve(__dirname, '../../static')))
      .use(responseHandle);
  }

  private start(port: number) {
    this.app.listen(port, () => {
      console.log('service is started');
    });
  }

}
