import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  BookOpen, 
  Search, 
  Bell, 
  Menu, 
  PlusCircle, 
  Eye, 
  Edit3, 
  CheckCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Info
} from 'lucide-react';

const MyRequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const requests = [
    { id: "#REV-102", subject: "Advanced Mathematics", session: "Spring 2024", date: "Oct 12, 2023", fee: "Paid", status: "Approved" },
    { id: "#REV-115", subject: "Applied Physics II", session: "Spring 2024", date: "Nov 02, 2023", fee: "Paid", status: "Under Review" },
    { id: "#REV-128", subject: "Data Structures", session: "Summer 2024", date: "-", fee: "Pending", status: "Draft" },
    { id: "#REV-142", subject: "Machine Learning", session: "Spring 2024", date: "Dec 10, 2023", fee: "Paid", status: "Submitted" },
    { id: "#REV-094", subject: "Macroeconomics", session: "Autumn 2023", date: "Sep 05, 2023", fee: "Paid", status: "Rejected" },
  ];

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-sans text-[#111418] dark:text-white">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-[#101922] transform transition-transform lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#137fec] size-10 rounded-lg flex items-center justify-center text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">Student Portal</h1>
              <p className="text-[#617589] dark:text-gray-400 text-xs font-normal">Session 2023-24</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={20}/>} 
            label="Dashboard" 
            active={location.pathname === '/student/dashboard'}
            onClick={() => navigate('/student/dashboard')}
          />
          <NavItem 
            icon={<History size={20}/>} 
            label="My Requests" 
            active={location.pathname === '/student/my-requests'}
            onClick={() => navigate('/student/my-requests')}
          />
        </nav>

        <div className="p-4 border-t border-[#dbe0e6] dark:border-gray-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="bg-gray-300 rounded-full size-8 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium truncate">Alex Johnson</p>
              <p className="text-xs text-[#617589] truncate">ID: 2024-9921</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-[#617589]">Home</span>
            <span className="text-[#617589]">/</span>
            <span className="font-medium">My Requests</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl font-bold">My Re-evaluation Requests</h3>
            <button 
              onClick={() => navigate('/student/new-request')}
              className="bg-[#137fec] hover:bg-[#137fec]/90 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all shadow-md shadow-blue-500/20"
            >
              <PlusCircle size={20} />
              New Re-evaluation Request
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select 
              className="w-full md:w-64 h-11 rounded-lg border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-0 text-sm font-medium px-4 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fa] dark:bg-gray-900/50 border-b border-[#dbe0e6] dark:border-gray-700">
                    <th className="px-6 py-4 text-sm font-semibold">Request ID</th>
                    <th className="px-6 py-4 text-sm font-semibold">Subject</th>
                    <th className="px-6 py-4 text-sm font-semibold">Session</th>
                    <th className="px-6 py-4 text-sm font-semibold">Submitted Date</th>
                    <th className="px-6 py-4 text-sm font-semibold">Fee Status</th>
                    <th className="px-6 py-4 text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dbe0e6] dark:divide-gray-700">
                  {filteredRequests.map((req, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9fa] dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#137fec]">{req.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">{req.subject}</td>
                      <td className="px-6 py-4 text-sm text-[#617589] dark:text-gray-400">{req.session}</td>
                      <td className="px-6 py-4 text-sm text-[#617589] dark:text-gray-400">{req.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${req.fee === 'Paid' ? 'text-green-700 bg-green-100 dark:bg-green-900/30' : 'text-gray-500 bg-gray-100'}`}>
                          {req.fee}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusChip status={req.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="text-[#617589] hover:text-[#137fec] p-1 transition-colors"><Eye size={18} /></button>
                          {req.status === "Draft" && (
                            <button className="text-[#137fec] hover:text-[#137fec]/70 p-1 transition-colors"><Edit3 size={18} /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-[#dbe0e6] dark:border-gray-700 flex items-center justify-between bg-[#f8f9fa] dark:bg-gray-900/50">
              <p className="text-xs text-[#617589]">Showing {filteredRequests.length} results</p>
              <div className="flex gap-2">
                <button className="p-1.5 border border-[#dbe0e6] dark:border-gray-700 rounded bg-white dark:bg-gray-800 disabled:opacity-50"><ChevronLeft size={16}/></button>
                <button className="p-1.5 border border-[#dbe0e6] dark:border-gray-700 rounded bg-white dark:bg-gray-800"><ChevronRight size={16}/></button>
              </div>
            </div>
          </div>

          {/* Guidance Note */}
          <div className="mt-8 p-6 bg-[#137fec]/5 rounded-xl border border-[#137fec]/20 flex items-start gap-4">
            <Info className="text-[#137fec] shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-sm">15-day Processing Timeline</h4>
              <p className="text-sm text-[#617589] dark:text-gray-400 mt-1 leading-relaxed">
                Please note that re-evaluation requests typically take 15 business days to process from the date of submission. 
                Status updates will be sent via portal notifications and email.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-[#137fec]/10 text-[#137fec] font-semibold' : 'text-[#617589] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const StatusChip = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-600 dark:bg-green-900/40';
      case 'Under Review': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40';
      case 'Submitted': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/40';
      case 'Rejected': return 'bg-red-100 text-red-600 dark:bg-red-900/40';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700';
    }
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold ${getStatusStyles(status)}`}>
      <span className={`size-1.5 rounded-full ${status === 'Rejected' ? 'bg-red-600' : 'bg-current'}`}></span>
      {status.toUpperCase()}
    </span>
  );
};

export default MyRequests;