import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { 
  LayoutDashboard, 
  History, 
  BookOpen, 
  Headphones, 
  Search, 
  Bell, 
  Menu, 
  PlusCircle, 
  Eye, 
  FileEdit, 
  Info,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  LogOut
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getStudentDashboard();
      if (response.success) {
        setDashboardData(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#137fec] mx-auto mb-4"></div>
          <p className="text-[#617589] dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-[#137fec] text-white rounded-lg hover:bg-[#137fec]/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    total: 0,
    draft: 0,
    submitted: 0,
    under_review: 0,
    approved: 0,
    rejected: 0
  };

  const recentRequests = dashboardData?.recentRequests || [];

  const statsData = [
    { label: 'Total Requests', value: stats.total.toString().padStart(2, '0'), badge: `${stats.submitted} submitted`, badgeType: 'success' },
    { label: 'Active Processing', value: stats.under_review.toString().padStart(2, '0'), badge: 'Under Review', badgeType: 'primary' },
    { label: 'Results Published', value: (stats.approved + stats.rejected).toString().padStart(2, '0'), badge: 'Historical', badgeType: 'neutral' },
  ];

  const requests = recentRequests;

  const getStatusStyles = (status) => {
    switch (status) {
      case 'SUBMITTED': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/40';
      case 'APPROVED': return 'bg-green-100 text-green-600 dark:bg-green-900/40';
      case 'REJECTED': return 'bg-red-100 text-red-600 dark:bg-red-900/40';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700';
    }
  };

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
            <span className="font-medium">Dashboard</span>
          </nav>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsData.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Action Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl font-bold">Recent Requests</h3>
            <button 
              onClick={() => navigate('/student/new-request')}
              className="bg-[#137fec] hover:bg-[#137fec]/90 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all shadow-md shadow-blue-500/20"
            >
              <PlusCircle size={20} />
              New Re-evaluation Request
            </button>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fa] dark:bg-gray-900/50 border-b border-[#dbe0e6] dark:border-gray-700">
                    <th className="px-6 py-4 text-sm font-semibold">Request ID</th>
                    <th className="px-6 py-4 text-sm font-semibold">Subject</th>
                    <th className="px-6 py-4 text-sm font-semibold">Submission Date</th>
                    <th className="px-6 py-4 text-sm font-semibold">Fee Status</th>
                    <th className="px-6 py-4 text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dbe0e6] dark:divide-gray-700">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-[#f8f9fa] dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{req.id}</td>
                      <td className="px-6 py-4 text-sm text-[#617589] dark:text-gray-400">{req.subject}</td>
                      <td className="px-6 py-4 text-sm text-[#617589] dark:text-gray-400">{req.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${req.fee === 'Paid' ? 'text-green-700 bg-green-100 dark:bg-green-900/30' : 'text-gray-500 bg-gray-100'}`}>
                          {req.fee}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold ${getStatusStyles(req.status)}`}>
                          <span className={`size-1.5 rounded-full ${req.status === 'REJECTED' ? 'bg-red-600' : 'bg-current'}`}></span>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#617589] hover:text-[#137fec]">
                          {req.status === 'DRAFT' ? <FileEdit size={18} /> : <Eye size={18} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[#dbe0e6] dark:border-gray-700 flex items-center justify-between bg-[#f8f9fa] dark:bg-gray-900/50">
              <p className="text-xs text-[#617589]">Showing 1 to 4 of 5 results</p>
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
              <h4 className="font-bold text-sm">Evaluation Timeline Info</h4>
              <p className="text-sm text-[#617589] dark:text-gray-400 mt-1 leading-relaxed">
                Standard re-evaluation requests are processed within 15 working days from the date of submission and fee verification. 
                You will receive an email notification once your updated marksheet is available for download.
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

const StatCard = ({ label, value, badge, badgeType }) => {
  const badgeStyles = {
    success: 'text-green-700 bg-green-100 dark:bg-green-900/30',
    primary: 'text-[#137fec] bg-[#137fec]/10',
    neutral: 'text-[#617589] bg-gray-100 dark:bg-gray-700',
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
      <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">{label}</p>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold">{value}</p>
        <span className={`px-2 py-1 rounded text-[10px] font-bold ${badgeStyles[badgeType]}`}>{badge}</span>
      </div>
    </div>
  );
};

export default StudentDashboard;