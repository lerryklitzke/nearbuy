import { AppDataSource } from '../utils/dataSource';
import { User } from '../entity/user.entity';

export const userRepository = AppDataSource.getRepository(User);