"use client";
import { useState } from "react";

export default function LeavePortal() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [leaveHistory] = useState([
    { id: "L-901", type: "Sick Leave", date: "May 20, 2026", status: "Approved", color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
    { id: "L-902", type: "Casual Leave", date: "June 02, 2026", status: "Pending", color: "text-amber-500 bg-amber-50 border-amber-100" },
    { id: "L-903", type: "Annual Leave", date: "July 15, 2026", status: "Rejected", color: "text-rose-500 bg-rose-50 border-rose-100" },
    { id: "L-904", type: "Sick Leave", date: "April 10, 2026", status: "Approved", color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
  ]);

  const filteredHistory = activeTab === "ALL" 
    ? leaveHistory 
    : leaveHistory.filter(item => item.status.toUpperCase() === activeTab);

  const stats = {
    ALL: leaveHistory.length,
    PENDING: leaveHistory.filter(h => h.status === "Pending").length,
    APPROVED: leaveHistory.filter(h => h.status === "Approved").length,
    REJECTED: leaveHistory.filter(h => h.status === "Rejected").length,
  };

  return (
    <div className="max-w-5xl space-y-6 lg:space-y-10 animate-in fade-in duration-500 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Leave Request Form */}
        <div className="lg:col-span-4 bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[2.5rem] border border-slate-100 shadow-sm h-fit">
          <h3 className="text-[9px] lg:text-[10px] font-black text-blue-900 uppercase tracking-widest mb-4 lg:mb-6">Request Absence</h3>
          <form className="space-y-3 lg:space-y-4">
            <select className="w-full bg-slate-50 p-4 lg:p-5 rounded-xl lg:rounded-2xl border-none font-black text-[9px] lg:text-[10px] uppercase outline-none focus:ring-2 focus:ring-blue-100 transition-all">
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Annual Leave</option>
            </select>
            <input type="date" className="w-full bg-slate-50 p-4 lg:p-5 rounded-xl lg:rounded-2xl border-none font-black text-[9px] lg:text-[10px] uppercase outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
            <textarea placeholder="REASON FOR LEAVE" className="w-full bg-slate-50 p-4 lg:p-5 rounded-xl lg:rounded-2xl border-none font-black text-[9px] lg:text-[10px] outline-none min-h-[120px] focus:ring-2 focus:ring-blue-100 transition-all" />
            <button className="w-full bg-blue-600 text-white p-4 lg:p-5 rounded-xl lg:rounded-2xl font-black uppercase italic text-[9px] lg:text-[10px] shadow-lg hover:bg-blue-700 transition-all active:scale-[0.98]">Submit Request</button>
          </form>
        </div>

        {/* Leave Status History */}
        <div className="lg:col-span-8 bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 lg:mb-10">
            <h3 className="text-[9px] lg:text-[10px] font-black text-blue-900 uppercase tracking-widest">Registry</h3>
            
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100">
              {Object.keys(stats).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 lg:px-5 py-2 rounded-lg lg:rounded-xl text-[8px] lg:text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                    activeTab === tab 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                  <span className={`px-1.5 py-0.5 rounded-md text-[7px] ${
                    activeTab === tab ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                  }`}>
                    {stats[tab as keyof typeof stats]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 lg:p-6 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100 text-center sm:text-left hover:border-blue-100 transition-all group">
                  <div className="min-w-0">
                    <p className="font-black text-slate-800 text-[11px] lg:text-xs uppercase italic group-hover:text-blue-600 transition-colors">{item.type}</p>
                    <p className="text-[8px] lg:text-[9px] font-bold text-slate-400 mt-1 uppercase truncate tracking-widest">{item.id} • {item.date}</p>
                  </div>
                  <span className={`px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-[0.15em] border shrink-0 shadow-xs ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="text-4xl mb-4 opacity-20">📂</div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">No {activeTab.toLowerCase()} records found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}