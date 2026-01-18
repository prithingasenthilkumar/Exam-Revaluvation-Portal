import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  ChevronRight, 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  CheckCircle, 
  XCircle, 
  Info, 
  History, 
  ShieldCheck,
  Eye,
  UserCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';

const RequestReviewDetail = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [remarks, setRemarks] = useState("");
  const [revisedMarks, setRevisedMarks] = useState("");
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    fetchRequestDetail();
  }, [requestId]);

  const fetchRequestDetail = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getExaminerRequestById(requestId);
      if (response.success) {
        setRequest(response.data);
        setRemarks(response.data.examinerComments || "");
        setRevisedMarks(response.data.revisedMarks || response.data.originalMarks || "");
      } else {
        setError(response.error || "Failed to fetch request details");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching details");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!remarks) {
      alert("Please provide remarks before approving.");
      return;
    }
    
    try {
      setSubmitting(true);
      const response = await ApiService.reviewRequest(
        requestId, 
        'approved', 
        remarks, 
        revisedMarks ? Number(revisedMarks) : null
      );
      
      if (response.success) {
        alert('Request Approved Successfully!');
        navigate('/examiner/queue');
      } else {
        alert(response.error || "Failed to approve request");
      }
    } catch (err) {
      alert(err.message || "An error occurred during submission");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!remarks) {
      alert("Please provide remarks before rejecting.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await ApiService.reviewRequest(requestId, 'rejected', remarks);
      
      if (response.success) {
        alert('Request Rejected!');
        navigate('/examiner/queue');
      } else {
        alert(response.error || "Failed to reject request");
      }
    } catch (err) {
      alert(err.message || "An error occurred during submission");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500 gap-4">
        <AlertCircle size={48} />
        <p className="text-xl font-bold">{error}</p>
        <button onClick={() => navigate('/examiner/queue')} className="bg-primary text-white px-4 py-2 rounded-lg">
          Back to Queue
        </button>
      </div>
    );
  }

  const metadata = [
    { label: "Original Marks", value: request.originalMarks },
    { label: "Submission Date", value: new Date(request.createdAt).toLocaleDateString() },
    { label: "Exam Date", value: request.examDate },
    { label: "Status", value: request.status.replace('_', ' ').toUpperCase() },
  ];

  const timelineItems = [
    {
      title: "Request Submitted",
      time: new Date(request.createdAt).toLocaleString(),
      desc: `${request.studentName} initiated a re-evaluation request.`,
      icon: <User size={16} />,
      color: "bg-[#137fec] text-white"
    },
    {
      title: "Last Updated",
      time: new Date(request.updatedAt).toLocaleString(),
      desc: `The request was last updated.`,
      icon: <History size={16} />,
      color: "bg-gray-400 text-white"
    }
  ];

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-gray-100 min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-[#dbe0e6] dark:border-gray-800 bg-white dark:bg-[#1a2632] px-6 lg:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-[#137fec]">
          <ShieldCheck size={28} />
          <h2 className="text-lg font-bold tracking-tight">ExamPortal</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink label="Dashboard" onClick={() => navigate('/examiner/queue')} />
          <NavLink label="Requests" active onClick={() => navigate('/examiner/queue')} />
          <NavLink label="Completed" onClick={() => navigate('/examiner/completed')} />
          <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" alt="Examiner" />
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-medium text-[#617589]">
          <span className="hover:text-[#137fec] cursor-pointer" onClick={() => navigate('/examiner/queue')}>Dashboard</span>
          <ChevronRight size={14} />
          <span className="hover:text-[#137fec] cursor-pointer" onClick={() => navigate('/examiner/queue')}>Requests</span>
          <ChevronRight size={14} />
          <span className="text-[#111418] dark:text-white font-bold">Request #{request.id}</span>
        </div>

        {/* Page Heading Card */}
        <div className="flex flex-wrap justify-between items-end gap-4 bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-black">Re-evaluation Request: #{request.id}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                request.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
                request.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                request.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {request.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-[#617589] dark:text-gray-400">
              Student: <span className="text-[#111418] dark:text-gray-200 font-semibold">{request.studentName}</span> | Course: <span className="text-[#111418] dark:text-gray-200 font-semibold">{request.courseName}</span>
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 h-10 bg-[#f0f2f4] dark:bg-gray-800 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
            <User size={16} /> View Profile
          </button>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Metadata */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-[#dbe0e6] dark:border-gray-800">
                <h3 className="text-xs font-bold uppercase text-[#617589]">Request Metadata</h3>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                {metadata.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-[#617589] text-[10px] font-bold uppercase">{item.label}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Justification */}
            <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Student Justification</h3>
              <div className="bg-[#f6f7f8] dark:bg-gray-800/40 p-4 rounded-lg border border-[#dbe0e6] dark:border-gray-700 italic text-sm leading-relaxed">
                "{request.reason}"
              </div>
            </div>

            {/* Document Preview */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-[#dbe0e6] dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FileText className="text-red-500" size={20} />
                  <span className="text-sm font-bold">{request.courseName}_Exam_{request.id}.pdf</span>
                </div>
                <div className="flex gap-2">
                  <ZoomBtn icon={<ZoomIn size={18} />} onClick={() => setZoom(z => z + 10)} />
                  <ZoomBtn icon={<ZoomOut size={18} />} onClick={() => setZoom(z => z - 10)} />
                  <ZoomBtn icon={<Download size={18} />} />
                </div>
              </div>
              <div className="aspect-[1/1.4] bg-[#525659] p-4 md:p-8 overflow-y-auto">
                <div 
                  className="mx-auto bg-white shadow-2xl p-12 text-gray-800 transition-all duration-200"
                  style={{ width: `${zoom}%`, minHeight: '1000px' }}
                >
                  <div className="border-b-2 border-gray-900 pb-4 mb-8 text-center">
                    <h1 className="text-xl font-bold uppercase">Final Examination: {request.courseName}</h1>
                    <p className="text-sm">{request.studentName} | ID: {request.studentId}</p>
                  </div>
                  <div className="space-y-6 text-center py-20">
                    <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">Exam document preview would be rendered here.</p>
                    <p className="text-sm text-gray-400">Current marks: {request.originalMarks}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Action Panel) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-lg sticky top-[88px]">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <FileText className="text-[#137fec]" size={20} /> Review Decision
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold mb-2 block">Revised Marks</label>
                  <input 
                    type="number"
                    className="w-full rounded-lg border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800/50 p-3 text-sm focus:ring-[#137fec]"
                    placeholder="Enter revised marks..."
                    value={revisedMarks}
                    onChange={(e) => setRevisedMarks(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-bold mb-2 block">Examiner Remarks</label>
                  <textarea 
                    className="w-full min-h-[150px] rounded-lg border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800/50 p-4 text-sm focus:ring-[#137fec]"
                    placeholder="Rationale for decision..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                  <p className="text-right text-[10px] text-[#617589] mt-1">{remarks.length} / 1000</p>
                </div>
                
                <button 
                  onClick={handleApprove}
                  disabled={submitting}
                  className="w-full h-12 bg-[#137fec] text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#137fec]/90 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />} 
                  Approve Grade Change
                </button>
                <button 
                  onClick={handleReject}
                  disabled={submitting}
                  className="w-full h-12 bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <XCircle size={18} />} 
                  Reject Request
                </button>

                <div className="mt-4 p-3 bg-blue-50 dark:bg-[#137fec]/10 rounded-lg flex gap-3">
                  <Info className="text-[#137fec] shrink-0" size={16} />
                  <p className="text-[10px] text-[#137fec] font-medium leading-relaxed">
                    Approving this will update the transcript and notify the student automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white dark:bg-[#1a2632] p-6 md:p-8 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm mt-8">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
            <History className="text-[#617589]" size={20} /> Audit Timeline
          </h3>
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
            {timelineItems.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-6 pl-1">
                <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-sm shrink-0 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1 bg-[#f6f7f8] dark:bg-gray-800/50 p-4 rounded-xl border border-[#dbe0e6] dark:border-gray-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm">{item.title}</span>
                    <span className="text-[10px] text-[#137fec] font-bold">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#617589] dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavLink = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`text-sm font-medium transition-colors ${active ? 'text-[#137fec] font-bold' : 'hover:text-[#137fec]'}`}>
    {label}
  </button>
);

const ZoomBtn = ({ icon, onClick }) => (
  <button onClick={onClick} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
    {icon}
  </button>
);

export default RequestReviewDetail;