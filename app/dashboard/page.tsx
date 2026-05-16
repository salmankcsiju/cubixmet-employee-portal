"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function FullDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [showAllHolidays, setShowAllHolidays] = useState(false);
  const router = useRouter();

  // Verification States
  const [verificationStep, setVerificationStep] = useState("IDLE"); // IDLE, CHECKING, AUTHORIZED, FAILED, CAMERA, CAPTURED
  const [distance, setDistance] = useState(0);
  const [liveTime, setLiveTime] = useState(new Date().toLocaleString());

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const calendarDates = Array.from({ length: 31 }, (_, i) => i + 1);

  const holidays = [
    { day: 25, name: "Eid-ul-Fitr", month: "May" },
    { day: 1, name: "Company Anniversary", month: "June" },
    { day: 15, name: "Independence Day", month: "August" },
    { day: 2, name: "Gandhi Jayanti", month: "October" },
    { day: 1, name: "Kerala Piravi", month: "November" },
    { day: 25, name: "Christmas Day", month: "December" },
    { day: 1, name: "New Year's Day", month: "January" },
  ];

  const stats = [
    { label: "Monthly Hours", value: "164.5", change: "+12%", color: "text-blue-600" },
    { label: "Pending Tasks", value: "08", change: "Urgent", color: "text-rose-600" },
    { label: "Leave Balance", value: "12 Days", change: "Annual", color: "text-emerald-500" },
    { label: "Project Health", value: "98%", change: "Excellent", color: "text-indigo-600" }
  ];

  const pendingActivity = [
    { task: "Geofencing API Polish", project: "Cubixmet", priority: "High" },
    { task: "Inventory Registry Update", project: "Internal", priority: "Medium" }
  ];

  const updateTime = useCallback(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
    if (verificationStep === "CAMERA") {
      setLiveTime(now.toLocaleString());
    }
  }, [verificationStep]);

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

  const isHoliday = (date: number) => holidays.some(h => h.day === date && h.month === "May");

  // Verification Handlers
  const handlePunchInRequest = () => {
    setVerificationStep("CHECKING");
    setTimeout(() => {
      const simulatedDistance = Math.floor(Math.random() * 200);
      setDistance(simulatedDistance);
      if (simulatedDistance <= 100) {
        setVerificationStep("AUTHORIZED");
      } else {
        setVerificationStep("FAILED");
      }
    }, 2000);
  };

  const handleFinalPunchIn = () => {
    setIsClockedIn(true);
    setVerificationStep("IDLE");
  };

  const handlePunchOut = () => {
    setIsClockedIn(false);
    setVerificationStep("IDLE");
  };

  return (
    <div className="space-y-4 lg:space-y-6 animate-in fade-in duration-700 pb-10">
      
      {/* HOLIDAY LIST MODAL */}
      {showAllHolidays && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em]">Full Holiday Calendar</h3>
                <button onClick={() => setShowAllHolidays(false)} className="text-slate-400 hover:text-slate-900 transition-colors">✕</button>
             </div>
             <div className="p-8 max-h-[60vh] overflow-y-auto space-y-3 custom-scrollbar">
                {holidays.map((h, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xs border border-slate-50">🗓️</div>
                       <p className="text-[10px] lg:text-[11px] font-black text-slate-800 uppercase italic tracking-tighter">{h.name}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-blue-600 uppercase">{h.month}</p>
                       <p className="text-[11px] font-black text-slate-400 italic">{h.day}</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                <button onClick={() => setShowAllHolidays(false)} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100">Close Registry</button>
             </div>
          </div>
        </div>
      )}

      {/* CAMERA OVERLAY */}
      {verificationStep === "CAMERA" && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Dashboard Verification</h3>
              <button onClick={() => setVerificationStep("IDLE")} className="text-slate-400">✕</button>
            </div>
            <div className="aspect-square bg-slate-800 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/20 text-6xl animate-pulse">📷</div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
               </div>
               <div className="absolute bottom-6 left-6 text-white font-mono text-[10px] space-y-1 z-10">
                  <p className="bg-blue-600/80 px-2 py-0.5 rounded inline-block">TIMESTAMP: {liveTime}</p>
                  <p className="bg-black/40 px-2 py-0.5 rounded block uppercase tracking-widest">Verified Dashboard Feed</p>
               </div>
               <div className="absolute inset-6 border border-white/20 rounded-2xl pointer-events-none"></div>
            </div>
            <div className="p-8 space-y-4 text-center">
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Immediate punch verification required</p>
               <button 
                onClick={() => {
                  setVerificationStep("CAPTURED");
                  setTimeout(handleFinalPunchIn, 1500);
                }}
                className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-200"
               >
                 capture & punch in
               </button>
            </div>
          </div>
        </div>
      )}

      {verificationStep === "CAPTURED" && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center animate-in fade-in">
           <div className="text-center space-y-4">
              <div className="h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center text-3xl mx-auto shadow-2xl animate-bounce text-white">✔️</div>
              <p className="text-white font-black uppercase tracking-widest text-sm">punch verified</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`p-4 lg:p-6 rounded-3xl lg:rounded-4xl border shadow-sm hover:shadow-md transition-all ${stat.label === 'Pending Tasks' ? 'border-rose-100 bg-rose-50/20' : 'bg-white border-slate-100'}`}>
            <p className="text-[7px] lg:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 lg:mb-2 italic">{stat.label}</p>
            <p className={`text-lg lg:text-xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
            <p className={`text-[6px] lg:text-[7px] font-black uppercase mt-1 ${stat.label === 'Pending Tasks' ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="lg:col-span-8 space-y-4 lg:space-y-6">
          <section className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-4xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6 bg-linear-to-r from-white to-slate-50/50">
            <div className="flex items-center gap-4 lg:gap-6 w-full sm:w-auto">
              <div className="h-12 w-12 lg:h-16 lg:w-16 bg-blue-600/5 rounded-2xl lg:rounded-3xl flex items-center justify-center border border-blue-100 shadow-inner shrink-0">
                <div className={`h-2 w-2 lg:h-2.5 lg:w-2.5 rounded-full ${isClockedIn ? "bg-emerald-500 animate-pulse" : "bg-blue-600"}`}></div>
              </div>
              <div>
                <h3 className="text-[8px] lg:text-[9px] font-black text-blue-900 uppercase tracking-widest mb-0.5">Shift Management</h3>
                <p className="text-lg lg:text-xl font-black text-slate-900 italic uppercase tracking-tighter">{isClockedIn ? "Verified Active" : "Off-Duty"}</p>
              </div>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto items-center">
              {!isClockedIn && (verificationStep === "IDLE" || verificationStep === "CAPTURED") && (
                <button onClick={handlePunchInRequest} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[9px] shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase italic tracking-widest">punch in</button>
              )}

              {verificationStep === "CHECKING" && (
                <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Verifying...</span>
                </div>
              )}

              {verificationStep === "AUTHORIZED" && (
                <button onClick={handleFinalPunchIn} className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[9px] shadow-lg shadow-emerald-100 animate-bounce uppercase italic tracking-widest">confirm punch in</button>
              )}

              {verificationStep === "FAILED" && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="px-4 py-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <span className="text-[8px] font-black uppercase tracking-widest">Range Alert ({distance}m)</span>
                  </div>
                  <button onClick={() => setVerificationStep("CAMERA")} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-slate-100">Use Camera</button>
                  <button onClick={() => setVerificationStep("IDLE")} className="p-3 text-slate-400 font-black text-[9px] uppercase tracking-widest hover:text-blue-600">Retry</button>
                </div>
              )}

              {isClockedIn && (
                <button onClick={handlePunchOut} className="w-full sm:w-auto px-8 py-4 bg-rose-500 text-white rounded-2xl font-black text-[9px] shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all uppercase italic tracking-widest">punch out</button>
              )}
            </div>
          </section>

          <section className="p-6 lg:p-8 rounded-3xl lg:rounded-4xl border border-rose-100 shadow-sm bg-rose-50/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 italic font-black text-4xl lg:text-6xl">!</div>
             <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h3 className="text-[8px] lg:text-[9px] font-black text-blue-900 uppercase tracking-[0.2em]">Action Items</h3>
                <button onClick={() => router.push('/dashboard/todo')} className="text-[7px] lg:text-[8px] font-black text-rose-400 uppercase border-b border-rose-200">View All →</button>
             </div>
             <div className="space-y-2 lg:space-y-3">
                {pendingActivity.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl border border-rose-50 shadow-sm group hover:border-rose-400 transition-all">
                    <div className="max-w-[70%]">
                      <p className="text-[9px] lg:text-[10px] font-black text-slate-800 uppercase italic tracking-tighter truncate">{item.task}</p>
                      <p className="text-[7px] lg:text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest truncate">{item.project}</p>
                    </div>
                    <span className="px-3 lg:px-4 py-1 bg-rose-50 text-rose-500 rounded-full text-[7px] lg:text-[8px] font-black uppercase tracking-widest border border-rose-100 shrink-0">Pending</span>
                  </div>
                ))}
             </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <section className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-4xl border border-slate-100 shadow-sm">
               <h3 className="text-[8px] lg:text-[9px] font-black text-blue-900 uppercase tracking-widest mb-4 lg:mb-6">Active Projects</h3>
               <div className="space-y-2 lg:space-y-3">
                   {['CUBIXMET SaaS Portal', 'E-Commerce App'].map((proj, i) => (
                    <div 
                      key={i} 
                      onClick={() => router.push('/dashboard/projects')}
                      className="p-3 lg:p-4 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group"
                    >
                       <p className="text-[9px] lg:text-[10px] font-black text-slate-800 uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors">{proj}</p>
                       <p className="text-[7px] lg:text-[8px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter text-right">View Activity →</p>
                    </div>
                  ))}
               </div>
            </section>
            <section className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-4xl border border-slate-100 shadow-sm">
               <h3 className="text-[8px] lg:text-[9px] font-black text-blue-900 uppercase tracking-widest mb-4 lg:mb-6">Recent Logs</h3>
               <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center justify-between p-2.5 lg:p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[8px] lg:text-[9px] font-bold text-slate-600 uppercase">DB Backup</p>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 lg:p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[8px] lg:text-[9px] font-bold text-slate-600 uppercase">API Sync</p>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  </div>
               </div>
            </section>
          </div>

          <div className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-4xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6 lg:mb-8">
              <h3 className="text-[8px] lg:text-[9px] font-black text-blue-900 uppercase tracking-widest">Analytics</h3>
              <span className="text-[7px] lg:text-[8px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase border border-emerald-100">Optimal</span>
            </div>
            <div className="flex items-end justify-between h-32 lg:h-40 px-2 lg:px-4 gap-2 lg:gap-3 bg-slate-50/50 rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-slate-100">
              {[45, 80, 55, 95, 70, 85, 100].map((h, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2 lg:gap-3">
                  <div className="w-full bg-blue-600 rounded-t-lg lg:rounded-t-xl transition-all duration-1000 hover:bg-blue-400 shadow-lg shadow-blue-100/50" style={{ height: `${h}%`, minHeight: '8px' }}></div>
                  <span className="text-[7px] lg:text-[8px] font-black text-slate-300 uppercase italic">D{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4 lg:space-y-6">
          <section className="bg-white p-5 lg:p-6 rounded-3xl lg:rounded-4xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[7px] lg:text-[8px] font-black text-blue-900 uppercase tracking-widest">Calendar</h3>
              <p className="text-[9px] lg:text-[10px] font-black italic uppercase text-blue-600 tracking-tighter">May &apos;26</p>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day, i) => (
                <div key={`${day}-${i}`} className="text-center text-[6px] lg:text-[7px] font-black text-slate-300">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(5)].map((_, i) => <div key={`empty-${i}`}></div>)}
              {calendarDates.map(date => (
                <div key={`date-${date}`} className={`h-6 lg:h-8 flex items-center justify-center rounded-lg lg:rounded-xl text-[8px] lg:text-[9px] font-black transition-all ${
                  date === 12 ? 'bg-blue-600 text-white shadow-lg' : 
                  isHoliday(date) ? 'bg-rose-50 text-rose-500 border border-rose-100' : 
                  'hover:bg-slate-50 text-slate-600'
                }`}>{date}</div>
              ))}
            </div>
            <div className="mt-4 lg:mt-6 pt-4 border-t border-slate-50 space-y-1.5 lg:space-y-2">
              <div className="flex justify-between items-center mb-1 lg:mb-2">
                <p className="text-[7px] lg:text-[8px] font-black text-slate-400 uppercase tracking-widest">Upcoming Holidays</p>
                <button 
                  onClick={() => setShowAllHolidays(true)}
                  className="text-[6px] lg:text-[7px] font-black text-blue-600 uppercase border-b border-blue-100 hover:text-blue-800 transition-colors"
                >
                  View All Holidays →
                </button>
              </div>
              {holidays.slice(0, 3).map((h, i) => (
                <div key={`hol-${i}`} className="flex justify-between items-center p-2.5 lg:p-3 bg-rose-50/50 rounded-xl border border-rose-100/50">
                  <p className="text-[8px] lg:text-[9px] font-black text-rose-600 uppercase italic tracking-tighter">{h.name}</p>
                  <p className="text-[7px] lg:text-[8px] font-black text-rose-400 uppercase">{h.month} {h.day}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-slate-900 p-6 lg:p-8 rounded-3xl lg:rounded-4xl text-white shadow-xl relative overflow-hidden">
            <h3 className="text-[8px] lg:text-[9px] font-black text-blue-900 uppercase tracking-widest mb-4 lg:mb-6 opacity-70">Notice Board</h3>
            <div className="space-y-3 lg:space-y-4">
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-[9px] lg:text-[10px] font-black uppercase italic tracking-tighter">Quarterly Review</p>
                <p className="text-[7px] lg:text-[8px] opacity-60 mt-0.5 uppercase tracking-widest">May 15</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="text-[9px] lg:text-[10px] font-black uppercase italic tracking-tighter">Policy Update</p>
                <p className="text-[7px] lg:text-[8px] opacity-60 mt-0.5 uppercase tracking-widest">June 01</p>
              </div>
            </div>
          </div>

          <section className="bg-blue-600 p-6 lg:p-8 rounded-3xl lg:rounded-4xl text-white shadow-xl text-center">
            <p className="text-2xl lg:text-3xl font-black italic uppercase tracking-tighter">{currentTime}</p>
            <p className="text-blue-200 text-[8px] lg:text-[9px] font-black mt-1 uppercase tracking-widest">{new Date().toDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  );
}