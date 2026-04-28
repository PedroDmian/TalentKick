import bcrypt from 'bcryptjs';
import { HashService as IHashService } from '../../domain/services/HashService';

export class HashService implements IHashService {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
