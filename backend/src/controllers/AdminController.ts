import { Request, Response } from 'express';
import { DataStore } from '../services/DataStore';

export class AdminController {
  private dataStore = DataStore.getInstance();

  getDashboard = async (req: Request, res: Response): Promise<void> => {
    const allRequests = this.dataStore.getAllRequests();
    
    const stats = {
      total: allRequests.length,
      submitted: allRequests.filter(r => r.status === 'submitted').length,
      under_review: allRequests.filter(r => r.status === 'under_review').length,
      approved: allRequests.filter(r => r.status === 'approved').length,
      rejected: allRequests.filter(r => r.status === 'rejected').length
    };

    res.status(200).json({
      success: true,
      data: { stats, recentRequests: allRequests.slice(0, 10) }
    });
  }

  getAllRequests = async (req: Request, res: Response): Promise<void> => {
    const { status } = req.query;
    let requests = this.dataStore.getAllRequests();
    
    if (status && typeof status === 'string') {
      requests = this.dataStore.getRequestsByStatus(status as any);
    }

    res.status(200).json({
      success: true,
      data: requests
    });
  }
}