import {UserModel} from '../../entities/user/user.model';

export class AccountService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }
}
