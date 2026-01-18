import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { DataStore } from './DataStore';
import { User } from '../types';

export class AuthService {
  private dataStore = DataStore.getInstance();

  generateToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  async login(email: string, password: string, role: string) {
    const user = this.dataStore.findUserByEmail(email);
    
    if (!user || user.role !== role) {
      throw new Error('Invalid credentials or role mismatch');
    }

    // For demo, accept password123 for all users
    const isValidPassword = password === 'password123';
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        studentId: user.studentId
      },
      token
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      const user = this.dataStore.findUserById(decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          studentId: user.studentId
        }
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async authenticateUser(email: string, role: string): Promise<User | null> {
    const user = this.dataStore.findUserByEmail(email);
    return user && user.role === role ? user : null;
  }
}