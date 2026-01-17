import React, { useState } from 'react';
import { 
  School, 
  ShieldCheck, 
  Zap, 
  BadgeCheck, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronDown 
} from 'lucide-react';

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ identifier: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in as:", role, credentials);
    
    // Navigate based on role
    if (role === 'student') {
      window.location.href = '/student/dashboard';
    } else if (role === 'examiner') {
      window.location.href = '/examiner/queue';
    } else if (role === 'admin') {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f6f7f8] dark:bg-[#101922] font-sans">
      
      {/* Left Side: Branding & Hero (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center px-12 xl:px-24 text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-[#137fec]/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-8">
              <School size={40} className="text-white" />
              <span className="text-2xl font-bold tracking-tight">AcademiaOS</span>
            </div>
            <h1 className="text-5xl xl:text-6xl font-black leading-tight tracking-tight mb-6">
              Empowering Academic Excellence
            </h1>
            <p className="text-lg xl:text-xl font-normal leading-relaxed text-white/90 max-w-lg">
              Access the Exam Re-evaluation Portal to manage assessments, feedback, and student appeals with professional-grade efficiency.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <HeroFeature icon={<ShieldCheck size={20}/>} text="Secure Institutional Authentication" />
            <HeroFeature icon={<Zap size={20}/>} text="Real-time Evaluation Processing" />
          </div>
        </div>
        
        <div className="absolute bottom-8 left-12 xl:left-24 z-10 text-white/60 text-xs">
          © 2024 Global University Systems. All rights reserved.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white dark:bg-[#101922] p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="lg:hidden flex items-center gap-2 mb-4 text-[#137fec]">
              <School size={32} />
              <span className="text-xl font-bold tracking-tight">AcademiaOS</span>
            </div>
            <h2 className="text-[#111418] dark:text-white text-3xl font-bold tracking-tight">Sign In</h2>
            <p className="text-[#617589] dark:text-gray-400 text-base">
              Please select your role and enter your credentials to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            {/* Role Selection */}
            <div className="flex flex-col gap-2">
              <p className="text-[#111418] dark:text-white text-sm font-medium">I am a...</p>
              <div className="relative group">
                <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617589] group-focus-within:text-[#137fec] transition-colors" size={20} />
                <select 
                  className="w-full rounded-lg border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-900 h-14 pl-12 pr-10 text-sm font-medium focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] transition-all outline-none appearance-none cursor-pointer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled>Select your role</option>
                  <option value="student">Student</option>
                  <option value="examiner">Examiner</option>
                  <option value="admin">Administrator</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#617589] pointer-events-none" size={20} />
              </div>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-4">
              <InputGroup 
                label="Email or Institutional ID" 
                icon={<User size={20} />}
                type="text"
                name="identifier"
                placeholder="e.g. john.doe@university.edu"
                value={credentials.identifier}
                onChange={handleInputChange}
              />
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-[#111418] dark:text-white text-sm font-medium">Password</p>
                  <button type="button" className="text-[#137fec] text-sm font-semibold hover:underline">Forgot password?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617589] group-focus-within:text-[#137fec] transition-colors" size={20} />
                  <input 
                    className="w-full rounded-lg border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-900 h-14 pl-12 pr-12 text-sm focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#617589] hover:text-[#111418] dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full h-12 bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Sign In
            </button>

            {/* SSO Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#dbe0e6] dark:border-slate-700"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-widest text-[#617589]">or continue with</span>
              <div className="flex-grow border-t border-[#dbe0e6] dark:border-slate-700"></div>
            </div>

            <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#dbe0e6] dark:border-slate-700 h-12 bg-white dark:bg-slate-900 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span>Institutional SSO</span>
            </button>
          </form>

          {/* Footer Links */}
          <div className="flex justify-center gap-6 mt-4">
            <FooterLink label="Need Help?" />
            <FooterLink label="Privacy Policy" />
            <FooterLink label="Terms of Service" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const HeroFeature = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
      {icon}
    </div>
    <p className="text-sm font-medium">{text}</p>
  </div>
);

const InputGroup = ({ label, icon, ...props }) => (
  <label className="flex flex-col gap-2">
    <p className="text-[#111418] dark:text-white text-sm font-medium">{label}</p>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617589] group-focus-within:text-[#137fec] transition-colors">
        {icon}
      </div>
      <input 
        className="w-full rounded-lg border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-900 h-14 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none" 
        {...props}
        required
      />
    </div>
  </label>
);

const FooterLink = ({ label }) => (
  <a href="#" className="text-[#617589] text-xs hover:text-[#137fec] transition-colors">{label}</a>
);

export default LoginPage;