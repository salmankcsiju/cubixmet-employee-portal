"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function FullDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const router = useRouter();

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const calendarDates = Array.from({ length: 31 }, (_, i) => i + 1);

  const holidays = [
    { day: 25, name: "Eid-ul-Fitr", month: "May" },
    { day: 1, name: "Anniversary", month: "June" },
    { day: 15, name: "Independence", month: "August" }
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
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

  const isHoliday = (date: number) => holidays.some(h => h.day === date && h.month === "May");

  return (
    <div className="space-y-4 lg:space-y-6 animate-in fade-in duration-700 pb-10">
      
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
                <div className={`h-2 w-2 lg:h-2.5 lg:w-2.5 rounded-full ${isClockedIn ? "bg-emerald-500 animate-pulse" : "bg-blue-600 animate-ping"}`}></div>
              </div>
              <div>
                <h3 className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 italic">Shift Management</h3>
                <p className="text-lg lg:text-xl font-black text-slate-900 italic uppercase tracking-tighter">{isClockedIn ? "Verified Active" : "Off-Duty"}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsClockedIn(!isClockedIn)}
              className={`w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-black text-[8px] lg:text-[9px] shadow-lg transition-all uppercase italic tracking-widest ${isClockedIn ? "bg-rose-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              {isClockedIn ? "Stop Session" : "Start Session"}
            </button>
          </section>

          <section className="p-6 lg:p-8 rounded-3xl lg:rounded-4xl border border-rose-100 shadow-sm bg-rose-50/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 italic font-black text-4xl lg:text-6xl">!</div>
             <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h3 className="text-[8px] lg:text-[9px] font-black text-rose-500 uppercase tracking-[0.2em] italic">Action Items</h3>
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
               <h3 className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 lg:mb-6 italic">Active Projects</h3>
               <div className="space-y-2 lg:space-y-3">
                  {['CubeLogs SaaS', 'Casa Amora Store'].map((proj, i) => (
                    <div key={i} className="p-3 lg:p-4 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer">
                       <p className="text-[9px] lg:text-[10px] font-black text-slate-800 uppercase italic tracking-tighter">{proj}</p>
                       <p className="text-[7px] lg:text-[8px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter text-right">Dev Mode</p>
                    </div>
                  ))}
               </div>
            </section>
            <section className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-4xl border border-slate-100 shadow-sm">
               <h3 className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 lg:mb-6 italic">Recent Logs</h3>
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
              <h3 className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Analytics</h3>
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
              <h3 className="text-[7px] lg:text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Calendar</h3>
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
              <p className="text-[7px] lg:text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1 lg:mb-2">Holidays</p>
              {holidays.filter(h => h.month === "May").map((h, i) => (
                <div key={`hol-${i}`} className="flex justify-between items-center p-2.5 lg:p-3 bg-rose-50/50 rounded-xl border border-rose-100/50">
                  <p className="text-[8px] lg:text-[9px] font-black text-rose-600 uppercase italic tracking-tighter">{h.name}</p>
                  <p className="text-[7px] lg:text-[8px] font-black text-rose-400 uppercase">May {h.day}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-slate-900 p-6 lg:p-8 rounded-3xl lg:rounded-4xl text-white shadow-xl relative overflow-hidden">
            <h3 className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest mb-4 lg:mb-6 opacity-50 italic">Notice Board</h3>
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