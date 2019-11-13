import * as koaJwt from 'koa-jwt';
import {JWT_SECRET, NO_AUTH_PATH} from '../constants';

export const jwt = koaJwt({
  secret: JWT_SECRET
}).unless(NO_AUTH_PATH);
