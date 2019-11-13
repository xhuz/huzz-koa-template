import {Context} from 'koa';
import {Post, Controller} from 'koa-route-decors';
import {cryptoPassword} from '../../utils/crypto';
import {userModel} from '../../entities/user/user.model';
import {CustomError} from '../../core/error';
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../../constants';

@Controller()
export class AccountController {
  @Post()
  async register(ctx: Context, next: () => Promise<any>) {
    const {username, password, nickname} = ctx.request.body;
    const sha255 = cryptoPassword(password, username);
    const result = await userModel.create(username, sha255, nickname);
    delete result.password;
    ctx.result = result;
    await next();
  }

  @Post()
  async login(ctx: Context, next: () => Promise<any>) {
    const {username, password} = ctx.request.body;
    const user = await userModel.findByUsername(username);
    if (user) {
      if (user.password === cryptoPassword(password, username)) {
        const token = jwt.sign({username: user.username, id: user.id}, JWT_SECRET, {expiresIn: '30d'});
        ctx.result = {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          token
        };
        await next();
      } else {
        throw new CustomError(-2, '密码错误');
      }
    } else {
      throw new CustomError(-1, '账号不存在');
    }
  }

  @Post()
  async logout(ctx: Context, next: () => Promise<any>) {
    const {id} = ctx.request.body;

  }
}
