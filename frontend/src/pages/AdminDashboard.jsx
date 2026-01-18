import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../services/api';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Shield, 
  BookOpen, 
  Search, 
  Bell, 
  Menu,
  TrendingUp,
  UserCheck,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      total: 0,
      submitted: 0,
      under_review: 0,
      approved: 0,
      rejected: 0
    },
    recentRequests: []
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getAdminDashboard();
      if (response.success) {
        setDashboardData(response.data);
      } else {
        setError(response.error || "Failed to fetch dashboard data");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-red-500 gap-4">
        <AlertCircle size={48} />
        <p className="text-xl font-bold">{error}</p>
        <button onClick={fetchDashboardData} className="bg-primary text-white px-4 py-2 rounded-lg">
          Retry
        </button>
      </div>
    );
  }

  const stats = [
    { label: 'Total Requests', value: dashboardData.stats.total.toLocaleString(), trend: '+0%', icon: <FileText size={20} />, color: 'text-blue-600' },
    { label: 'Pending Reviews', value: (dashboardData.stats.submitted + dashboardData.stats.under_review).toLocaleString(), trend: '+0%', icon: <Clock size={20} />, color: 'text-orange-600' },
    { label: 'Approved', value: dashboardData.stats.approved.toLocaleString(), trend: '+0%', icon: <CheckCircle size={20} />, color: 'text-green-600' },
    { label: 'Rejected', value: dashboardData.stats.rejected.toLocaleString(), trend: '+0%', icon: <AlertCircle size={20} />, color: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-sans text-[#111418] dark:text-white">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <span className="font-medium text-[#137fec]">Admin Dashboard</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">System Overview</h1>
              <p className="text-[#617589] dark:text-gray-400">Monitor and manage the exam re-evaluation system</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#617589]" size={18} />
                <input 
                  className="h-10 w-64 pl-10 pr-4 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#137fec]/50" 
                  placeholder="Search..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center justify-center size-10 rounded-lg bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700">
                <Bell size={20} />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-8">
            {/* Recent Requests acting as Activity Logs */}
            <div className="bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Requests</h3>
                <button className="text-sm font-semibold text-[#137fec] hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {dashboardData.recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        request.status === 'approved' ? 'bg-green-100 text-green-600' : 
                        request.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        request.status === 'under_review' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{request.studentName}</p>
                        <p className="text-xs text-[#617589] dark:text-gray-400">{request.subject} - {request.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                        request.status === 'approved' ? 'text-green-600' : 
                        request.status === 'rejected' ? 'text-red-600' :
                        request.status === 'under_review' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {request.status.replace('_', ' ')}
                      </p>
                      <p className="text-[10px] text-[#617589] dark:text-gray-400">{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                {dashboardData.recentRequests.length === 0 && (
                  <div className="text-center py-8 text-[#617589]">
                    No recent activity to show.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${color}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-green-600 flex items-center gap-1">
        <TrendingUp size={14} />
        {trend}
      </span>
    </div>
    <div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-[#617589] dark:text-gray-400">{label}</p>
    </div>
  </div>
);

export default AdminDashboard;