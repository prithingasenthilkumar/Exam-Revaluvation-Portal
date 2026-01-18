import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { 
  MenuBook, 
  LayoutDashboard, 
  List, 
  CheckSquare, 
  BarChart, 
  Settings, 
  HelpCircle, 
  ChevronDown, 
  Bell, 
  Download, 
  Search, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Loader2
} from 'lucide-react';

const ExaminerQueue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queueData, setQueueData] = useState({
    pending: [],
    underReview: [],
    totalPending: 0,
    totalUnderReview: 0
  });

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getExaminerQueue();
      if (response.success) {
        setQueueData(response.data);
      } else {
        setError(response.error || "Failed to fetch queue");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching the queue");
    } finally {
      setLoading(false);
    }
  };

  const allRequests = [...queueData.pending, ...queueData.underReview];

  const filteredRequests = allRequests.filter(req => 
    req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Pending", value: queueData.totalPending.toString(), trend: "+0%", trendColor: "text-blue-600 bg-blue-100" },
    { label: "Under Review", value: queueData.totalUnderReview.toString(), trend: "+0%", trendColor: "text-yellow-600 bg-yellow-100" },
    { label: "Total Active", value: (queueData.totalPending + queueData.totalUnderReview).toString(), trend: "+0%", trendColor: "text-green-600 bg-green-100" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
        <button onClick={fetchQueue} className="ml-4 underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] min-h-screen flex font-sans text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#137fec] size-10 rounded-lg flex items-center justify-center text-white">
              <List size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-none">ExamPortal</h1>
              <p className="text-gray-500 text-xs font-medium mt-1">Examiner Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarLink 
            icon={<List size={20}/>} 
            label="Request Queue" 
            active={location.pathname === '/examiner/queue'}
            onClick={() => navigate('/examiner/queue')}
          />
          <SidebarLink 
            icon={<CheckSquare size={20}/>} 
            label="Completed" 
            active={location.pathname === '/examiner/completed'}
            onClick={() => navigate('/examiner/completed')}
          />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <img className="size-9 rounded-full" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Robert'}`} alt="Avatar" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name || 'Dr. Robert Chen'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role === 'examiner' ? 'Senior Examiner' : 'Staff'}</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Re-evaluation Queue</span>
          </div>
          <button className="text-gray-500 hover:text-primary relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 size-2 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
          </button>
        </header>

        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Examiner Request Queue</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage and process pending student re-evaluation requests.</p>
            </div>
            <button className="bg-[#137fec] hover:bg-[#137fec]/90 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm">
              <Download size={18} />
              Export List
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                  <span className={`${stat.trendColor} text-xs px-2 py-0.5 rounded-full font-bold`}>{stat.trend}</span>
                </div>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                placeholder="Search Student ID, Course Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm px-3 h-10 outline-none focus:ring-2 focus:ring-primary">
                <option>All Departments</option>
              </select>
              <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm px-3 h-10 outline-none focus:ring-2 focus:ring-primary">
                <option>Status: All</option>
              </select>
              <button className="bg-gray-100 dark:bg-gray-800 px-4 h-10 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors">
                <Calendar size={16} />
                Date Range
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 uppercase text-[11px] font-bold text-gray-500 tracking-wider">
                    <th className="px-6 py-4"><input type="checkbox" className="rounded text-primary mr-3" /> Student ID</th>
                    <th className="px-6 py-4">Course & Dept</th>
                    <th className="px-6 py-4">Submission Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredRequests.map((req, i) => (
                    <tr key={req.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="rounded text-primary" />
                          <div>
                            <p className="text-sm font-semibold">{req.id}</p>
                            <p className="text-xs text-gray-500">{req.studentName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="font-medium">{req.courseName}</p>
                        <p className="text-xs text-gray-500">{req.department || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{req.examDate}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="px-6 py-4">
                        <PriorityBadge priority={req.priority || 'Medium'} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => navigate(`/examiner/review/${req.id}`)}
                          className="text-[#137fec] hover:underline font-semibold text-sm"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        No requests found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500">Showing <span className="font-bold">{filteredRequests.length > 0 ? 1 : 0}</span> to <span className="font-bold">{filteredRequests.length}</span> of <span className="font-bold">{filteredRequests.length}</span></p>
              <div className="flex gap-1">
                <PaginationButton icon={<ChevronLeft size={16}/>} />
                <PaginationButton label="1" active />
                <PaginationButton icon={<ChevronRight size={16}/>} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const SidebarLink = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-[#137fec]/10 text-[#137fec] font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium'}`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    "submitted": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "under_review": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "approved": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "rejected": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  
  const labels = {
    "submitted": "Pending",
    "under_review": "In Progress",
    "approved": "Approved",
    "rejected": "Rejected"
  };

  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || styles["submitted"]}`}>{labels[status] || status}</span>;
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    "High": "bg-red-100 text-red-700 dark:bg-red-900/30",
    "Medium": "bg-gray-100 text-gray-700 dark:bg-gray-800",
    "Low": "bg-gray-100 text-gray-700 dark:bg-gray-800",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[priority]}`}>{priority}</span>;
};

const PaginationButton = ({ label, icon, active = false }) => (
  <button className={`size-8 flex items-center justify-center rounded border transition-colors ${active ? 'bg-[#137fec] border-[#137fec] text-white font-bold' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50'}`}>
    {label || icon}
  </button>
);

export default ExaminerQueue;