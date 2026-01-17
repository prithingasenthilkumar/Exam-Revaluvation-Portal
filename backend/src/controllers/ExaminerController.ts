import { Request, Response } from 'express';
import { DataStore } from '../services/DataStore';
import { UpdateRequestPayload, ApiResponse } from '../types';

export class ExaminerController {
  private dataStore = DataStore.getInstance();

  getQueue = async (req: Request, res: Response): Promise<void> => {
    try {
      const pendingRequests = this.dataStore.getRequestsByStatus('submitted');
      const underReviewRequests = this.dataStore.getRequestsByStatus('under_review');
      
      const formatRequests = (requests: any[]) => requests.map(req => ({
        ...req,
        examDate: req.examDate.toISOString().split('T')[0]
      }));

      res.status(200).json({
        success: true,
        data: {
          pending: formatRequests(pendingRequests),
          underReview: formatRequests(underReviewRequests),
          totalPending: pendingRequests.length,
          totalUnderReview: underReviewRequests.length
        }
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch examiner queue'
      } as ApiResponse);
    }
  }

  getRequestDetail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const request = this.dataStore.getRequestById(id);
      
      if (!request) {
        res.status(404).json({
          success: false,
          error: 'Request not found'
        } as ApiResponse);
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          ...request,
          examDate: request.examDate.toISOString().split('T')[0]
        }
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch request details'
      } as ApiResponse);
    }
  }

  updateRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status, examinerComments, revisedMarks }: UpdateRequestPayload = req.body;
      
      const updatedRequest = this.dataStore.updateRequestStatus(
        id, 
        status, 
        examinerComments, 
        revisedMarks
      );
      
      if (!updatedRequest) {
        res.status(404).json({
          success: false,
          error: 'Request not found'
        } as ApiResponse);
        return;
      }

      const statusMessages = {
        under_review: 'Request moved to under review',
        approved: 'Request approved successfully',
        rejected: 'Request rejected'
      };

      res.status(200).json({
        success: true,
        data: {
          ...updatedRequest,
          examDate: updatedRequest.examDate.toISOString().split('T')[0]
        },
        message: statusMessages[status]
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update request'
      } as ApiResponse);
    }
  }

  getCompletedRequests = async (req: Request, res: Response): Promise<void> => {
    try {
      const approvedRequests = this.dataStore.getRequestsByStatus('approved');
      const rejectedRequests = this.dataStore.getRequestsByStatus('rejected');
      
      const completedRequests = [...approvedRequests, ...rejectedRequests]
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .map(req => ({
          ...req,
          examDate: req.examDate.toISOString().split('T')[0]
        }));

      res.status(200).json({
        success: true,
        data: {
          requests: completedRequests,
          totalApproved: approvedRequests.length,
          totalRejected: rejectedRequests.length
        }
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch completed requests'
      } as ApiResponse);
    }
  }
}