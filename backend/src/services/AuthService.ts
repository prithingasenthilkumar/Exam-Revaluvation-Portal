import { DataStore } from './DataStore';
import { User } from '../types';

export class AuthService {
  private dataStore = DataStore.getInstance();

  async authenticateUser(email: string, role: string): Promise<User | null> {
    const user = this.dataStore.findUserByEmail(email);
    return user && user.role === role ? user : null;
  }
}