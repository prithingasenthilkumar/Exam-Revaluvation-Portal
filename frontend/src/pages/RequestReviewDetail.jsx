import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  UserCheck
} from 'lucide-react';

const RequestReviewDetail = () => {
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState("");
  const [zoom, setZoom] = useState(100);

  const metadata = [
    { label: "Original Grade", value: "C+" },
    { label: "Request Date", value: "Oct 24, 2023" },
    { label: "Exam Date", value: "Oct 15, 2023" },
    { label: "Semester", value: "Fall 2023" },
  ];

  const handleApprove = () => {
    console.log('Approving request with remarks:', remarks);
    alert('Request Approved Successfully!');
    navigate('/examiner/queue');
  };

  const handleReject = () => {
    console.log('Rejecting request with remarks:', remarks);
    alert('Request Rejected!');
    navigate('/examiner/queue');
  };

  const timelineItems = [
    {
      title: "Request Submitted",
      time: "Oct 24, 2023 09:12 AM",
      desc: "Alex Rivera initiated a re-evaluation request for the CS101 Final Exam.",
      icon: <User size={16} />,
      color: "bg-[#137fec] text-white"
    },
    {
      title: "Assigned to Examiner",
      time: "Oct 24, 2023 11:30 AM",
      desc: "System automatically assigned this request to Dr. Julian Smith.",
      icon: <UserCheck size={16} />,
      color: "bg-gray-400 text-white"
    },
    {
      title: "Document Viewed",
      time: "Oct 25, 2023 02:45 PM",
      desc: "Dr. Julian Smith opened the exam document preview.",
      icon: <Eye size={16} />,
      color: "bg-blue-100 text-[#137fec]"
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
          <NavLink label="Dashboard" />
          <NavLink label="Requests" active />
          <NavLink label="Reports" />
          <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian" alt="Examiner" />
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-medium text-[#617589]">
          <span className="hover:text-[#137fec] cursor-pointer">Dashboard</span>
          <ChevronRight size={14} />
          <span className="hover:text-[#137fec] cursor-pointer">Requests</span>
          <ChevronRight size={14} />
          <span className="text-[#111418] dark:text-white font-bold">Request #88291-RE</span>
        </div>

        {/* Page Heading Card */}
        <div className="flex flex-wrap justify-between items-end gap-4 bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-black">Re-evaluation Request: #88291</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase tracking-widest">Pending Review</span>
            </div>
            <p className="text-[#617589] dark:text-gray-400">
              Student: <span className="text-[#111418] dark:text-gray-200 font-semibold">Alex Rivera (88291)</span> | Course: <span className="text-[#111418] dark:text-gray-200 font-semibold">CS101 - Intro to Programming</span>
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
                "I believe Question 4 was marked incorrectly regarding the time complexity analysis. According to the textbook (Page 142), an optimized bubble sort with a swap flag can be considered O(n) in its best-case scenario..."
              </div>
            </div>

            {/* Document Preview */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-[#dbe0e6] dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FileText className="text-red-500" size={20} />
                  <span className="text-sm font-bold">CS101_Final_Exam_88291.pdf</span>
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
                    <h1 className="text-xl font-bold uppercase">Final Examination: CS101</h1>
                    <p className="text-sm">Alex Rivera | ID: 88291</p>
                  </div>
                  <div className="space-y-6">
                    <p className="font-bold">Question 4: Analyze the best-case time complexity...</p>
                    <div className="p-4 border-2 border-red-100 bg-red-50/30 rounded relative">
                      <p className="text-xs font-bold text-red-600 mb-2 uppercase tracking-tighter">Student Answer:</p>
                      <p className="text-sm italic">"The algorithm is O(n) because of the swapped flag..."</p>
                      <div className="absolute -right-4 top-2 bg-red-600 text-white px-3 py-1 text-xs font-bold rotate-12">
                        -10 / Incorrect
                      </div>
                    </div>
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
                  <label className="text-sm font-bold mb-2 block">Examiner Remarks</label>
                  <textarea 
                    className="w-full min-h-[180px] rounded-lg border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800/50 p-4 text-sm focus:ring-[#137fec]"
                    placeholder="Rationale for decision..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                  <p className="text-right text-[10px] text-[#617589] mt-1">{remarks.length} / 1000</p>
                </div>
                
                <button 
                  onClick={handleApprove}
                  className="w-full h-12 bg-[#137fec] text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#137fec]/90 transition-all shadow-md active:scale-95"
                >
                  <CheckCircle size={18} /> Approve Grade Change
                </button>
                <button 
                  onClick={handleReject}
                  className="w-full h-12 bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-95"
                >
                  <XCircle size={18} /> Reject Request
                </button>

                <div className="mt-4 p-3 bg-blue-50 dark:bg-[#137fec]/10 rounded-lg flex gap-3">
                  <Info className="text-[#137fec] shrink-0" size={16} />
                  <p className="text-[10px] text-[#137fec] font-medium leading-relaxed">
                    Approving this will update the transcript and notify the Registrar automatically.
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

const NavLink = ({ label, active }) => (
  <a href="#" className={`text-sm font-medium transition-colors ${active ? 'text-[#137fec] font-bold' : 'hover:text-[#137fec]'}`}>
    {label}
  </a>
);

const ZoomBtn = ({ icon, onClick }) => (
  <button onClick={onClick} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
    {icon}
  </button>
);

export default RequestReviewDetail;