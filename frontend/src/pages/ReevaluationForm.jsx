import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  School, 
  BarChart3, 
  FileText, 
  UploadCloud, 
  FileIcon, 
  X, 
  ArrowLeft,
  User 
} from 'lucide-react';

const ReevaluationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    registerNumber: '',
    course: '',
    examDate: '',
    currentMarks: '',
    expectedMarks: '',
    reason: '',
  });

  const [files, setFiles] = useState([
    { name: 'exam_paper_scan.pdf', size: '1.2 MB' } // Initial mock file
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = uploadedFiles.map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Request:', { ...formData, files });
    alert('Request Submitted Successfully!');
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-gray-100 font-sans">
      <main className="max-w-[960px] mx-auto px-4 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#111418] dark:text-white mb-2">New Re-evaluation Request</h1>
          <p className="text-[#617589] dark:text-gray-400">
            Please fill in the details below to submit your request for exam re-evaluation. 
            Our committee will review your request within 5-7 business days.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-[#dbe0e6] dark:border-gray-800 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Section: Student Information */}
            <FormSection title="Student Information" icon={<User size={20} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Student Name">
                  <input 
                    type="text" 
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-lg dark:bg-gray-800 border-[#dbe0e6] dark:border-gray-700 h-12 px-4 focus:ring-[#137fec]" 
                  />
                </Input>
                <Input label="Register Number">
                  <input 
                    type="text" 
                    name="registerNumber"
                    value={formData.registerNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your register number"
                    required
                    className="w-full rounded-lg dark:bg-gray-800 border-[#dbe0e6] dark:border-gray-700 h-12 px-4 focus:ring-[#137fec]" 
                  />
                </Input>
              </div>
            </FormSection>

            {/* Section: Exam Details */}
            <FormSection title="Exam Details" icon={<School size={20} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Course Name">
                  <select 
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full rounded-lg dark:bg-gray-800 border-[#dbe0e6] dark:border-gray-700 h-12 px-4 focus:ring-[#137fec]"
                  >
                    <option value="" disabled>Select a course</option>
                    <option>CS101: Introduction to Computing</option>
                    <option>MA202: Advanced Calculus</option>
                    <option>PH305: Quantum Physics I</option>
                  </select>
                </Input>
                <Input label="Exam Date">
                  <input 
                    type="date" 
                    name="examDate"
                    onChange={handleInputChange}
                    className="w-full rounded-lg dark:bg-gray-800 border-[#dbe0e6] dark:border-gray-700 h-12 px-4 focus:ring-[#137fec]" 
                  />
                </Input>
              </div>
            </FormSection>

            {/* Section: Marks Information */}
            <FormSection title="Marks Information" icon={<BarChart3 size={20} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Current Marks">
                  <input 
                    type="number" 
                    name="currentMarks"
                    placeholder="e.g. 65"
                    onChange={handleInputChange}
                    className="w-full rounded-lg dark:bg-gray-800 border-[#dbe0e6] dark:border-gray-700 h-12 px-4 focus:ring-[#137fec]" 
                  />
                </Input>
                <Input label="Expected Marks">
                  <input 
                    type="number" 
                    name="expectedMarks"
                    placeholder="e.g. 80"
                    onChange={handleInputChange}
                    className="w-full rounded-lg dark:bg-gray-800 border-[#dbe0e6] dark:border-gray-700 h-12 px-4 focus:ring-[#137fec]" 
                  />
                </Input>
              </div>
            </FormSection>

            {/* Section: Reasoning & Documents */}
            <FormSection title="Reason & Supporting Documents" icon={<FileText size={20} />}>
              <div className="space-y-6">
                <Input label="Reason for Re-evaluation">
                  <textarea 
                    name="reason"
                    rows="4"
                    maxLength="500"
                    onChange={handleInputChange}
                    placeholder="Explain why you are requesting a re-evaluation..."
                    className="w-full rounded-lg dark:bg-gray-800 border-[#dbe0e6] dark:border-gray-700 p-4 focus:ring-[#137fec] resize-none"
                  ></textarea>
                  <div className="text-right text-[#617589] text-xs mt-1">{formData.reason.length} / 500 characters</div>
                </Input>

                <div>
                  <span className="text-sm font-semibold pb-2 block">Upload Supporting Documents</span>
                  <input 
                    type="file" 
                    multiple 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={handleFileUpload}
                    className="hidden" 
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="border-2 border-dashed border-[#dbe0e6] dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/30 hover:bg-[#137fec]/5 transition-colors cursor-pointer block"
                  >
                    <UploadCloud size={40} className="text-[#137fec] mb-3" />
                    <p className="text-sm font-medium">Drag & drop files here, or <span className="text-[#137fec] hover:underline">browse</span></p>
                    <p className="text-xs text-[#617589] mt-2">Maximum 2 files (PDF, JPG, PNG). Max 5MB each.</p>
                  </label>

                  <div className="mt-4 space-y-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[#137fec]/5 dark:bg-[#137fec]/10 rounded-lg border border-[#137fec]/20">
                        <div className="flex items-center gap-3">
                          <FileIcon size={18} className="text-[#137fec]" />
                          <span className="text-sm font-medium">{file.name}</span>
                          <span className="text-xs text-[#617589]">{file.size}</span>
                        </div>
                        <button type="button" onClick={() => removeFile(idx)} className="text-[#617589] hover:text-red-500">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FormSection>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-[#f0f2f4] dark:border-gray-800">
              <button type="button" className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#dbe0e6] dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Save as Draft
              </button>
              <button type="submit" className="w-full sm:w-auto px-10 py-3 rounded-lg bg-[#137fec] text-white font-bold hover:bg-[#137fec]/90 shadow-lg shadow-blue-500/20 transition-transform active:scale-95">
                Submit Request
              </button>
            </div>
          </form>
        </div>

        {/* Footer Support */}
        <footer className="mt-12 text-center pb-10">
          <p className="text-[#617589] text-sm">
            Need help? <a href="#" className="text-[#137fec] font-medium hover:underline">Contact Exam Office Support</a>
          </p>
          <div className="flex gap-6 justify-center mt-4 text-xs text-[#617589]">
            <span>Policy & Terms</span>
            <span>Privacy Policy</span>
            <span>University Guidelines</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

// Sub-components for cleaner code
const FormSection = ({ title, icon, children }) => (
  <section>
    <div className="flex items-center gap-2 border-b border-[#f0f2f4] dark:border-gray-800 pb-3 mb-6">
      <span className="text-[#137fec]">{icon}</span>
      <h2 className="text-[#111418] dark:text-white text-xl font-bold">{title}</h2>
    </div>
    {children}
  </section>
);

const Input = ({ label, children }) => (
  <label className="flex flex-col">
    <span className="text-sm font-semibold pb-2">{label}</span>
    {children}
  </label>
);

export default ReevaluationForm;