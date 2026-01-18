import React, { useState, useEffect } from 'react';
import { ApiService } from '../../services/api';
import RequestTable from '../../components/RequestTable';

interface Request {
  id: string;
  subject: string;
  examDate: string;
  status: string;
  submittedAt: string;
  reviewedAt?: string;
  examinerComments?: string;
}

const RequestHistory = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await ApiService.getStudentRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Request History</h1>
        <p className="mt-2 text-gray-600">
          View all your re-evaluation requests and their status
        </p>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="in_review">In Review</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg">
        <RequestTable
          requests={filteredRequests}
          showActions={true}
          userRole="student"
        />
      </div>
    </div>
  );
};

export default RequestHistory;