import { Request, Response } from 'express';
import { DataStore } from '../services/DataStore';
import { AuthService } from '../services/AuthService';
import { LoginRequest, ApiResponse } from '../types';

export class AuthController {
  private dataStore = DataStore.getInstance();
  private authService = new AuthService();

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, role }: LoginRequest = req.body;

      const result = await this.authService.login(email, password, role);

      res.status(200).json({
        success: true,
        data: result,
        message: 'Login successful'
      } as ApiResponse);
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message
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
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        res.status(401).json({
          success: false,
          error: 'No token provided'
        } as ApiResponse);
        return;
      }

      const result = await this.authService.validateToken(token);
      
      res.status(200).json({
        success: true,
        data: result,
        message: 'Token is valid'
      } as ApiResponse);
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message
      } as ApiResponse);
    }
  }
}