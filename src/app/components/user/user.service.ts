import {UserModel} from '../../entities/user/user.model';
import {Injectable} from 'koa-route-decors';

@Injectable()
export class UserService {
  constructor(private userModel: UserModel) {}

  async getUserInfo(id: number) {
    const user = await this.userModel.findById(id);
    return user;
  }

}
