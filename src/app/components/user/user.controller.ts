import {Controller, Post} from 'koa-route-decors';
import {Context} from 'koa';
import {userModel} from '../../entities/user/user.model';
import {cryptoPassword} from '../../utils/crypto';

@Controller('/user')
export class UserController {
  @Post()
  async register(ctx: Context, next: () => Promise<any>) {
    const {username, password, nickname} = ctx.request.body;
    const sha255 = cryptoPassword(password, username);
    const result = await userModel.create(username, sha255, nickname);
    ctx.result = result;
    await next();
  }

  @Post()
  async userInfo(ctx: Context, next: () => Promise<any>) {
    const {id} = ctx.request.body;
    const info = await userModel.findById(id);
    ctx.result = info;
    await next();
  }
}
