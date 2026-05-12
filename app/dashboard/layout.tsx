"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const updateTime = useCallback(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

  useEffect(() => {
    // Close sidebar on path change (for mobile)
    setIsSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    { id: "Dashboard", path: "/dashboard" },
    { id: "Attendance", path: "/dashboard/attendance" },
    { id: "Leave Portal", path: "/dashboard/leave" },
    { id: "Inventory", path: "/dashboard/inventory" },
    { id: "Team Chat", path: "/dashboard/chat" },
    { id: "Expense Claims", path: "/dashboard/reimburse" },
    { id: "Profile", path: "/dashboard/profile" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 p-6 flex flex-col shrink-0 shadow-2xl lg:shadow-sm z-[60] overflow-y-auto transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        <div className="flex items-center justify-between mb-10 lg:justify-center">
          <h2 className="text-2xl font-black text-[#1E40AF] tracking-tighter italic uppercase">Cubixmet_</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors">
             ✕
          </button>
        </div>
        
        <div className="mb-10 flex flex-col items-center">
           <div className="w-20 h-20 lg:w-24 lg:h-24 bg-blue-600 rounded-3xl lg:rounded-4xl flex items-center justify-center mb-4 border-4 lg:border-8 border-slate-50 shadow-xl text-2xl lg:text-3xl font-black text-white italic">S</div>
           <p className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Salman M.</p>
        </div>

        <nav className="flex-1 space-y-2 lg:space-y-3">
          {/* Main Dashboard Button */}
          <button 
            onClick={() => router.push('/dashboard')} 
            className={`w-full text-left p-4 rounded-2xl font-black text-[10px] lg:text-[11px] uppercase tracking-widest transition-all duration-300 border-2 ${
              pathname === '/dashboard' 
              ? "bg-[#2563EB] text-white shadow-xl shadow-blue-100 border-blue-600 translate-x-1" 
              : "text-slate-400 border-transparent hover:bg-slate-50"
            }`}
          >
            Dashboard
          </button>

          {/* Projects Sub-menu */}
          <div className="space-y-1">
            <button 
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className={`w-full text-left p-4 rounded-2xl font-black text-[10px] lg:text-[11px] uppercase tracking-widest transition-all border-2 ${
                pathname.includes('/projects') || pathname.includes('/todo') 
                ? "bg-blue-50 text-blue-600 border-blue-200" 
                : "text-slate-400 border-transparent hover:bg-slate-50"
              } flex justify-between items-center`}
            >
              Projects {isProjectsOpen ? "↑" : "↓"}
            </button>
            
            {isProjectsOpen && (
              <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                <button 
                  onClick={() => router.push('/dashboard/projects')} 
                  className={`w-full text-left p-3 rounded-xl font-bold text-[9px] lg:text-[10px] uppercase tracking-widest transition-all ${
                    pathname === '/dashboard/projects' ? 'text-blue-700 bg-blue-100/50' : 'text-slate-400 hover:text-blue-500'
                  }`}
                >
                  • Project Registry
                </button>
                <button 
                  onClick={() => router.push('/dashboard/todo')} 
                  className={`w-full text-left p-3 rounded-xl font-bold text-[9px] lg:text-[10px] uppercase tracking-widest transition-all ${
                    pathname === '/dashboard/todo' ? 'text-blue-700 bg-blue-100/50' : 'text-slate-400 hover:text-blue-500'
                  }`}
                >
                  • Activity Stream
                </button>
              </div>
            )}
          </div>

          {/* Navigation Items Mapping */}
          {navItems.slice(1).map((item) => (
            <button 
              key={item.id} 
              onClick={() => router.push(item.path)} 
              className={`w-full text-left p-4 rounded-2xl font-black text-[10px] lg:text-[11px] uppercase tracking-widest transition-all duration-300 border-2 ${
                pathname === item.path 
                ? "bg-[#2563EB] text-white shadow-xl shadow-blue-100 border-blue-600 translate-x-1" 
                : "text-slate-400 border-transparent hover:bg-slate-50"
              }`}
            >
              {item.id}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white/80 backdrop-blur-md p-4 lg:p-8 border-b border-slate-100 flex justify-between items-center z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              ☰
            </button>
            <h1 className="text-lg lg:text-3xl font-black tracking-tighter italic uppercase text-slate-900 truncate max-w-[150px] sm:max-w-none">
              {pathname.includes('projects') ? 'Projects' : pathname.includes('todo') ? 'Activity' : navItems.find(i => i.path === pathname)?.id || "CUBIXMET"}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-8">
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowNotif(!showNotif); }} className="p-2 lg:p-3 bg-slate-50 rounded-xl relative border border-slate-100 transition-all hover:bg-slate-100 group">
                <span className="text-lg lg:text-xl group-hover:scale-110 transition-transform inline-block">🔔</span>
                <span className="absolute top-0 right-0 h-2.5 w-2.5 lg:h-3 lg:w-3 bg-rose-500 rounded-full border-2 border-white animate-bounce"></span>
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-4 w-64 lg:w-80 bg-white border border-slate-100 rounded-3xl lg:rounded-4xl shadow-2xl z-100 overflow-hidden animate-in fade-in slide-in-from-top-4">
                  <div className="p-4 lg:p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <p className="font-black text-[9px] lg:text-[10px] uppercase tracking-widest text-slate-500">Notifications</p>
                    <span className="text-[7px] lg:text-[8px] font-black bg-blue-600 text-white px-2 py-1 rounded tracking-tighter">2 NEW</span>
                  </div>
                  <div className="p-3 lg:p-4 space-y-2 lg:space-y-3">
                    <div className="p-3 lg:p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <p className="text-[8px] lg:text-[9px] font-black text-blue-600 uppercase">Leave Portal</p>
                      <p className="text-[10px] lg:text-xs font-bold text-slate-700 mt-1 italic leading-tight">Your sick leave request has been approved.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-right border-l border-slate-100 pl-3 lg:pl-6 hidden sm:block">
              <p className="text-sm lg:text-xl font-black text-slate-800 italic uppercase tracking-tighter">{currentTime}</p>
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 lg:p-10 overflow-y-auto" onClick={() => setShowNotif(false)}>{children}</div>
      </main>
    </div>
  );
}