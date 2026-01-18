import { Request, Response } from 'express';
import { DataStore } from '../services/DataStore';
import { CreateRequestPayload, ApiResponse } from '../types';

export class StudentController {
  private dataStore = DataStore.getInstance();

  getDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentId = req.user?.userId || '1';
      const requests = this.dataStore.getRequestsByStudent(studentId);
      
      const stats = {
        total: requests.length,
        draft: requests.filter(r => r.status === 'draft').length,
        submitted: requests.filter(r => r.status === 'submitted').length,
        under_review: requests.filter(r => r.status === 'under_review').length,
        approved: requests.filter(r => r.status === 'approved').length,
        rejected: requests.filter(r => r.status === 'rejected').length
      };

      res.status(200).json({
        success: true,
        data: { 
          stats, 
          recentRequests: requests.slice(0, 5).map(req => ({
            ...req,
            examDate: req.examDate.toISOString().split('T')[0]
          }))
        }
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch dashboard data'
      } as ApiResponse);
    }
  }

  getRequests = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentId = req.user?.userId || '1';
      const { status } = req.query;
      
      let requests = this.dataStore.getRequestsByStudent(studentId);
      
      if (status && typeof status === 'string') {
        requests = requests.filter(req => req.status === status);
      }
      
      const formattedRequests = requests.map(req => ({
        ...req,
        examDate: req.examDate.toISOString().split('T')[0]
      }));

      res.status(200).json({
        success: true,
        data: formattedRequests
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch requests'
      } as ApiResponse);
    }
  }

  getRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const studentId = req.user?.userId || '1';
      
      const request = this.dataStore.getRequestById(id);
      
      if (!request || request.studentId !== studentId) {
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
        error: 'Failed to fetch request'
      } as ApiResponse);
    }
  }

  createRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { subject, examDate, reason, originalMarks }: CreateRequestPayload = req.body;
      const studentId = req.user?.userId || '1';
      const user = this.dataStore.findUserById(studentId);

      const newRequest = this.dataStore.createRequest({
        studentId,
        studentName: user?.name || 'Unknown Student',
        subject,
        examDate: new Date(examDate),
        reason,
        originalMarks,
        status: 'submitted'
      });

      res.status(201).json({
        success: true,
        data: {
          ...newRequest,
          examDate: newRequest.examDate.toISOString().split('T')[0]
        },
        message: 'Re-evaluation request submitted successfully'
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create request'
      } as ApiResponse);
    }
  }

  updateRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const studentId = req.user?.userId || '1';
      const updates = req.body;
      
      const existingRequest = this.dataStore.getRequestById(id);
      
      if (!existingRequest || existingRequest.studentId !== studentId) {
        res.status(404).json({
          success: false,
          error: 'Request not found'
        } as ApiResponse);
        return;
      }

      if (existingRequest.status !== 'draft') {
        res.status(400).json({
          success: false,
          error: 'Only draft requests can be updated'
        } as ApiResponse);
        return;
      }

      const updatedRequest = this.dataStore.updateRequest(id, {
        ...updates,
        examDate: updates.examDate ? new Date(updates.examDate) : existingRequest.examDate
      });

      res.status(200).json({
        success: true,
        data: updatedRequest ? {
          ...updatedRequest,
          examDate: updatedRequest.examDate.toISOString().split('T')[0]
        } : null,
        message: 'Request updated successfully'
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update request'
      } as ApiResponse);
    }
  }

  deleteRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const studentId = req.user?.userId || '1';
      
      const request = this.dataStore.getRequestById(id);
      
      if (!request || request.studentId !== studentId) {
        res.status(404).json({
          success: false,
          error: 'Request not found'
        } as ApiResponse);
        return;
      }

      if (request.status !== 'draft') {
        res.status(400).json({
          success: false,
          error: 'Only draft requests can be deleted'
        } as ApiResponse);
        return;
      }

      const deleted = this.dataStore.deleteRequest(id);
      
      if (deleted) {
        res.status(200).json({
          success: true,
          message: 'Request deleted successfully'
        } as ApiResponse);
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to delete request'
        } as ApiResponse);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete request'
      } as ApiResponse);
    }
  }
}