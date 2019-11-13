import {UserModel} from '../../entities/user/user.model';

export class UserService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  async getUserInfo(id: number) {
    const user = await this.userModel.findById(id);
    return user;
  }

}
