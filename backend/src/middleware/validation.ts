import { Request, Response, NextFunction } from 'express';

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(400).json({
      success: false,
      error: 'Email, password, and role are required'
    });
    return;
  }

  if (!['student', 'examiner', 'admin'].includes(role)) {
    res.status(400).json({
      success: false,
      error: 'Invalid role'
    });
    return;
  }

  next();
};

export const validateCreateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { subject, examDate, reason } = req.body;

  if (!subject || !examDate || !reason) {
    res.status(400).json({
      success: false,
      error: 'Subject, exam date, and reason are required'
    });
    return;
  }

  if (subject.trim().length < 2) {
    res.status(400).json({
      success: false,
      error: 'Subject must be at least 2 characters long'
    });
    return;
  }

  if (reason.trim().length < 10) {
    res.status(400).json({
      success: false,
      error: 'Reason must be at least 10 characters long'
    });
    return;
  }

  next();
};

export const validateUpdateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { status } = req.body;

  if (!status) {
    res.status(400).json({
      success: false,
      error: 'Status is required'
    });
    return;
  }

  if (!['under_review', 'approved', 'rejected'].includes(status)) {
    res.status(400).json({
      success: false,
      error: 'Invalid status'
    });
    return;
  }

  next();
};