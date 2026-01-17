import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  CheckCircle, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Search, 
  ChevronDown, 
  Filter, 
  Eye,
  TrendingUp,
  Percent,
  CheckSquare,
  ChevronLeft,
  List
} from 'lucide-react';

const CompletedRequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { 
      label: "Total Completed", 
      value: "1,248", 
      trend: "+12%", 
      icon: <CheckSquare className="text-[#137fec]" />, 
      bgColor: "bg-[#137fec]/10" 
    },
    { 
      label: "Approval Rate %", 
      value: "68%", 
      trend: "+3%", 
      icon: <Percent className="text-green-500" />, 
      bgColor: "bg-green-500/10" 
    }
  ];

  const completedData = [
    { id: "STU-90210", name: "Jane Cooper", initial: "JC", course: "CS - Data Structures", subDate: "Oct 12, 2023", compDate: "Oct 15, 2023", status: "Approved", color: "bg-primary/10 text-primary" },
    { id: "STU-88451", name: "Cody Wilson", initial: "CW", course: "Eng - Thermodynamics", subDate: "Oct 14, 2023", compDate: "Oct 18, 2023", status: "Rejected", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
    { id: "STU-77321", name: "Esther Moore", initial: "EM", course: "BM - Corp Finance", subDate: "Oct 16, 2023", compDate: "Oct 20, 2023", status: "Approved", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
    { id: "STU-91043", name: "Robert Lane", initial: "RL", course: "CS - Algorithms", subDate: "Oct 18, 2023", compDate: "Oct 21, 2023", status: "Approved", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
    { id: "STU-88229", name: "Bessie Hawkins", initial: "BH", course: "Eng - Fluid Dynamics", subDate: "Oct 19, 2023", compDate: "Oct 22, 2023", status: "Rejected", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8] dark:bg-[#101922] font-sans text-[#111418] dark:text-white">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[#dbe0e6] dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col shrink-0">
        <div className="p-6 flex flex-col gap-8 h-full">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 rounded-full p-1 border border-primary/20">
              <img className="size-10 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" alt="Avatar" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-base font-bold truncate">Exam Portal</h1>
              <p className="text-[#617589] text-xs font-medium truncate">Examiner Dashboard</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 grow">
            <SidebarLink 
              icon={<List size={18}/>} 
              label="Request Queue" 
              active={location.pathname === '/examiner/queue'}
              onClick={() => navigate('/examiner/queue')}
            />
            <SidebarLink 
              icon={<CheckCircle size={18}/>} 
              label="Completed" 
              active={location.pathname === '/examiner/completed'}
              onClick={() => navigate('/examiner/completed')}
            />
          </nav>

          <div className="pt-4 border-t border-[#dbe0e6] dark:border-gray-800">
            <button className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full rounded-lg transition-colors font-semibold text-sm">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="px-8 pt-8">
          <div className="mb-6">
            <h2 className="text-3xl font-black tracking-tight">Completed Re-evaluation Requests</h2>
            <p className="text-[#617589] dark:text-gray-400 mt-1">Review finalized assessment outcomes for the current academic session.</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </header>

        <section className="px-8 pb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-[#dbe0e6] dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex-1 min-w-[300px] max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#617589]" size={18} />
                <input 
                  className="w-full bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Search by Student ID or Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <FilterSelect label="All Departments" />
                <FilterSelect label="Final Status: All" />
                <button className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors">
                  <Filter size={16} /> Apply
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] dark:bg-gray-800/50 text-[11px] font-bold text-[#617589] uppercase tracking-wider">
                    <th className="px-6 py-4 border-b border-[#dbe0e6] dark:border-gray-800">Student ID</th>
                    <th className="px-6 py-4 border-b border-[#dbe0e6] dark:border-gray-800">Student Name</th>
                    <th className="px-6 py-4 border-b border-[#dbe0e6] dark:border-gray-800">Course & Dept</th>
                    <th className="px-6 py-4 border-b border-[#dbe0e6] dark:border-gray-800">Submission</th>
                    <th className="px-6 py-4 border-b border-[#dbe0e6] dark:border-gray-800">Completion</th>
                    <th className="px-6 py-4 border-b border-[#dbe0e6] dark:border-gray-800">Final Status</th>
                    <th className="px-6 py-4 border-b border-[#dbe0e6] dark:border-gray-800 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dbe0e6] dark:divide-gray-800">
                  {completedData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-primary">{row.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${row.color}`}>
                            {row.initial}
                          </div>
                          <span className="text-sm font-semibold">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#617589]">{row.course}</td>
                      <td className="px-6 py-4 text-sm text-[#617589]">{row.subDate}</td>
                      <td className="px-6 py-4 text-sm text-[#617589]">{row.compDate}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[#dbe0e6] dark:border-gray-800 flex items-center justify-between bg-[#f8fafc] dark:bg-gray-800/50">
              <p className="text-sm text-[#617589] font-medium">
                Showing <span className="font-bold text-[#111418] dark:text-white">1</span> to <span className="font-bold text-[#111418] dark:text-white">5</span> of <span className="font-bold text-[#111418] dark:text-white">1,248</span> results
              </p>
              <div className="flex gap-2">
                <PageNavBtn icon={<ChevronLeft size={18}/>} disabled />
                <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold text-sm">1</button>
                <button className="w-10 h-10 rounded-lg text-[#617589] hover:bg-white dark:hover:bg-gray-800 font-bold text-sm border border-transparent hover:border-[#dbe0e6]">2</button>
                <PageNavBtn icon={<ChevronRight size={18}/>} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Sub-components
const SidebarLink = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-[#617589] hover:bg-gray-100 dark:hover:bg-gray-800'}`}
  >
    {icon}
    <p className="text-sm font-semibold">{label}</p>
  </button>
);

const StatCard = ({ label, value, trend, icon, bgColor }) => (
  <div className="flex-1 min-w-[200px] bg-white dark:bg-gray-900 flex flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6] dark:border-gray-800 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-[#617589] text-sm font-medium uppercase tracking-wider">{label}</p>
      <div className={`${bgColor} p-1.5 rounded-lg`}>{icon}</div>
    </div>
    <div className="flex items-baseline gap-2">
      <p className="text-3xl font-bold leading-tight">{value}</p>
      <p className="text-[#078838] text-sm font-bold flex items-center gap-0.5">
        <TrendingUp size={14} />{trend}
      </p>
    </div>
  </div>
);

const FilterSelect = ({ label }) => (
  <div className="relative">
    <select className="appearance-none bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm font-semibold focus:ring-2 focus:ring-primary cursor-pointer outline-none">
      <option>{label}</option>
    </select>
    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617589] pointer-events-none" />
  </div>
);

const StatusBadge = ({ status }) => {
  const isApproved = status === "Approved";
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
      isApproved ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-red-100 text-red-700 dark:bg-red-900/30'
    }`}>
      {status}
    </span>
  );
};

const PageNavBtn = ({ icon, disabled }) => (
  <button className={`p-2 border border-[#dbe0e6] dark:border-gray-700 rounded-lg text-[#617589] hover:bg-white dark:hover:bg-gray-800 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={disabled}>
    {icon}
  </button>
);

export default CompletedRequests;