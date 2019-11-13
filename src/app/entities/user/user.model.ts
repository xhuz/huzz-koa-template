import {User} from './user.entity';
import {getRepository, Repository} from 'typeorm';
import {CustomError} from '../../core/error';

class UserModel {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(username: string, password: string, nickname: string = '') {
    const user = new User();
    user.username = username;
    user.password = password;
    user.nickname = nickname;

    const existed = await this.repository.findOne({username});

    if (existed) {
      throw new CustomError(-1, '用户已存在');
    } else {
      const result = await this.repository.save(user);
      return result;
    }

  }

  async findById(id: number) {
    const user = await this.repository.findOne(id, {select: ['id', 'username', 'nickname']});
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.repository.findOne({username}, {select: ['id', 'username', 'nickname']});
    return user;
  }

}

export const userModel = new UserModel();
