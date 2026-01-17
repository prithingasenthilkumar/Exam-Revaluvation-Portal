import { Request, Response } from 'express';
import { DataStore } from '../services/DataStore';
import { LoginRequest, ApiResponse } from '../types';

export class AuthController {
  private dataStore = DataStore.getInstance();

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, role }: LoginRequest = req.body;

      const user = this.dataStore.findUserByEmail(email);
      if (!user || user.role !== role) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials or role mismatch'
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            studentId: user.studentId
          },
          token: `mock-jwt-token-${user.id}-${Date.now()}`
        },
        message: 'Login successful'
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse);
    }
  }

  logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    } as ApiResponse);
  }

  validateToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({
        success: false,
        error: 'No token provided'
      } as ApiResponse);
      return;
    }

    const userId = token.split('-')[3];
    const user = this.dataStore.findUserById(userId);
    
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid token'
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      data: { user },
      message: 'Token is valid'
    } as ApiResponse);
  }
}