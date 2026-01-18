import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LocalStorageService from '../../services/localStorage';
import { useAuth } from '../../contexts/AuthContext';

const EditRequest: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    examDate: '',
    reason: '',
    documents: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      if (id) {
        try {
          const response = await LocalStorageService.getRequestById(id);
          if (response.success) {
            const request = response.data;
            if (request.studentId !== user?.id) {
              alert('Unauthorized');
              navigate('/student/dashboard');
              return;
            }
            if (request.status !== 'pending') {
              alert('Cannot edit request that is not pending');
              navigate('/student/dashboard');
              return;
            }
            setFormData({
              subject: request.subject,
              examDate: request.examDate,
              reason: request.reason,
              documents: request.documents || []
            });
          }
        } catch (error) {
          alert('Failed to fetch request');
        } finally {
          setFetchLoading(false);
        }
      }
    };
    fetchRequest();
  }, [id, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await LocalStorageService.updateRequest(id, formData);
      if (response.success) {
        alert('Request updated successfully!');
        navigate('/student/dashboard');
      }
    } catch (error) {
      alert('Failed to update request');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (fetchLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Re-evaluation Request</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-lg"
              placeholder="Explain why you need re-evaluation..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/student/dashboard')}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequest;