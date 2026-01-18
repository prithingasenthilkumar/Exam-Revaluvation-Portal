import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApiService } from '../../services/api';
import RequestTable from '../../components/RequestTable';

interface Request {
  id: string;
  studentName: string;
  registerNumber: string;
  subject: string;
  examDate: string;
  status: string;
  submittedAt: string;
  reason: string;
}

const ExaminerQueue = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await ApiService.getExaminerQueue();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewClick = (requestId: string) => {
    router.push(`/examiner/review-request?id=${requestId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Examiner Queue</h1>
        <p className="mt-2 text-gray-600">
          Review pending re-evaluation requests
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Pending Requests ({requests.length})
          </h2>
        </div>
        
        <RequestTable
          requests={requests}
          showActions={true}
          userRole="examiner"
          onActionClick={handleReviewClick}
        />
      </div>
    </div>
  );
};

export default ExaminerQueue;