import {Controller, Post} from 'koa-route-decors';
import {Context} from 'koa';
import {UserService} from './user.service';

@Controller('/user')
export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  @Post()
  async getUserInfo(ctx: Context, next: () => Promise<any>) {
    const {id} = ctx.request.body;
    const info = await this.userService.getUserInfo(id);
    ctx.result = info;
    await next();
  }
}
