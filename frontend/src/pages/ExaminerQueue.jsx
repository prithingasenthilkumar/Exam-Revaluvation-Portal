import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  MoreVertical
} from 'lucide-react';

const ExaminerQueue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Pending", value: "124", trend: "+5%", trendColor: "text-blue-600 bg-blue-100" },
    { label: "Overdue", value: "12", trend: "-2%", trendColor: "text-red-600 bg-red-100" },
    { label: "Completed Today", value: "45", trend: "+10%", trendColor: "text-green-600 bg-green-100" },
  ];

  const requests = [
    { id: "SID-2024-0012", student: "Alex J. Rivera", course: "CS402: Advanced Algorithms", dept: "Computer Science", date: "Oct 24, 2024", status: "Pending", priority: "High" },
    { id: "SID-2024-0015", student: "Sarah Miller", course: "ENG102: Structural Mechanics", dept: "Civil Engineering", date: "Oct 25, 2024", status: "In Progress", priority: "Medium" },
    { id: "SID-2024-0021", student: "David Wilson", course: "MATH301: Linear Algebra", dept: "Mathematics", date: "Oct 26, 2024", status: "Pending", priority: "Low" },
    { id: "SID-2024-0028", student: "Emily Thorne", course: "CS101: Intro to Computing", dept: "Computer Science", date: "Oct 26, 2024", status: "Urgent", priority: "High" },
  ];

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
            <img className="size-9 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" alt="Avatar" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Dr. Robert Chen</p>
              <p className="text-xs text-gray-500 truncate">Senior Examiner</p>
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
                  {requests.map((req, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="rounded text-primary" />
                          <div>
                            <p className="text-sm font-semibold">{req.id}</p>
                            <p className="text-xs text-gray-500">{req.student}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="font-medium">{req.course}</p>
                        <p className="text-xs text-gray-500">{req.dept}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{req.date}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="px-6 py-4">
                        <PriorityBadge priority={req.priority} />
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
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500">Showing <span className="font-bold">1</span> to <span className="font-bold">10</span> of <span className="font-bold">124</span></p>
              <div className="flex gap-1">
                <PaginationButton icon={<ChevronLeft size={16}/>} />
                <PaginationButton label="1" active />
                <PaginationButton label="2" />
                <PaginationButton label="3" />
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
    "Pending": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "In Progress": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "Urgent": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}>{status}</span>;
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
  <button className={`size-8 flex items-center justify-center rounded border transition-colors ${active ? 'bg-primary border-primary text-white font-bold' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50'}`}>
    {label || icon}
  </button>
);

export default ExaminerQueue;