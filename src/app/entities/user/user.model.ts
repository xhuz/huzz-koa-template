import {User} from './user.entity';
import {getRepository, Repository} from 'typeorm';
import {cryptoPassword} from '../../utils/crypto';
import {Injectable} from 'koa-route-decors';

@Injectable()
export class UserModel {
  private repository: Repository<User>;
  private select: (keyof User)[] = ['id', 'username', 'nickname'];

  constructor() {
    this.repository = getRepository(User);
  }

  async create(user: User) {
    const result = await this.repository.save(user);
    return result;
  }

  async findById(id: number) {
    const user = await this.repository.findOne(id, {select: this.select});
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.repository.findOne({username}, {select: this.select});
    return user;
  }

  async findAndCheckPassword(username: string, password: string) {
    const user = await this.repository.findOne({username, password: cryptoPassword(password, username)}, {select: this.select});
    return user;
  }

  async findAll() {
    const users = await this.repository.find({select: ['id', 'username', 'nickname']});
    return users;
  }

}
