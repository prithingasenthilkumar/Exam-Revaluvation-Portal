import React, { useState, useEffect } from 'react';

interface RequestFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
  submitText?: string;
  readonly?: boolean;
}

const RequestForm: React.FC<RequestFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  submitText = 'Submit',
  readonly = false
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    registerNumber: '',
    subject: '',
    examDate: '',
    reason: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        studentName: initialData.studentName || '',
        registerNumber: initialData.registerNumber || '',
        subject: initialData.subject || '',
        examDate: initialData.examDate ? initialData.examDate.split('T')[0] : '',
        reason: initialData.reason || ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'English',
    'History',
    'Geography'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            disabled={readonly}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Register Number
          </label>
          <input
            type="text"
            name="registerNumber"
            value={formData.registerNumber}
            onChange={handleChange}
            disabled={readonly}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={readonly}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exam Date
          </label>
          <input
            type="date"
            name="examDate"
            value={formData.examDate}
            onChange={handleChange}
            disabled={readonly}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason for Re-evaluation
        </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          disabled={readonly}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="Please provide detailed reasons for requesting re-evaluation..."
          required
        />
      </div>

      {!readonly && (
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : submitText}
          </button>
        </div>
      )}
    </form>
  );
};

export default RequestForm;