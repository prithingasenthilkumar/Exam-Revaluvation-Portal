import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Users', value: '2,847', trend: '+12%', icon: <Users size={20} />, color: 'text-blue-600' },
    { label: 'Active Requests', value: '124', trend: '+5%', icon: <FileText size={20} />, color: 'text-orange-600' },
    { label: 'Completed Today', value: '45', trend: '+18%', icon: <CheckCircle size={20} />, color: 'text-green-600' },
    { label: 'System Health', value: '99.8%', trend: '+0.2%', icon: <Shield size={20} />, color: 'text-purple-600' },
  ];

  const recentActivity = [
    { id: 1, type: 'User Registration', user: 'John Doe', time: '2 minutes ago', status: 'completed' },
    { id: 2, type: 'Request Submitted', user: 'Jane Smith', time: '5 minutes ago', status: 'pending' },
    { id: 3, type: 'Examiner Assigned', user: 'Dr. Wilson', time: '10 minutes ago', status: 'completed' },
    { id: 4, type: 'System Backup', user: 'System', time: '1 hour ago', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-sans text-[#111418] dark:text-white">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <span className="font-medium">Admin Dashboard</span>
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
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`size-2 rounded-full ${activity.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <div>
                        <p className="text-sm font-medium">{activity.type}</p>
                        <p className="text-xs text-[#617589] dark:text-gray-400">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#617589] dark:text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
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