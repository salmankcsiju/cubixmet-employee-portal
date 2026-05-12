"use client";
import { useState } from "react";

export default function LeavePortal() {
  const [leaveHistory] = useState([
    { id: "L-901", type: "Sick Leave", date: "May 20, 2026", status: "Approved", color: "text-emerald-500 bg-emerald-50" },
    { id: "L-902", type: "Casual Leave", date: "June 02, 2026", status: "Pending", color: "text-amber-500 bg-amber-50" },
  ]);

  return (
    <div className="max-w-5xl space-y-6 lg:space-y-10 animate-in fade-in duration-500 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Leave Request Form */}
        <div className="lg:col-span-1 bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 lg:mb-6 italic">Request Absence</h3>
          <form className="space-y-3 lg:space-y-4">
            <select className="w-full bg-slate-50 p-4 lg:p-5 rounded-xl lg:rounded-2xl border-none font-black text-[9px] lg:text-[10px] uppercase outline-none">
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Annual Leave</option>
            </select>
            <input type="date" className="w-full bg-slate-50 p-4 lg:p-5 rounded-xl lg:rounded-2xl border-none font-black text-[9px] lg:text-[10px] uppercase outline-none" />
            <textarea placeholder="REASON FOR LEAVE" className="w-full bg-slate-50 p-4 lg:p-5 rounded-xl lg:rounded-2xl border-none font-black text-[9px] lg:text-[10px] outline-none min-h-[100px]" />
            <button className="w-full bg-blue-600 text-white p-4 lg:p-5 rounded-xl lg:rounded-2xl font-black uppercase italic text-[9px] lg:text-[10px] shadow-lg hover:bg-blue-700 transition-colors">Submit Request</button>
          </form>
        </div>

        {/* Leave Status History */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 lg:mb-8 italic">Registry</h3>
          <div className="space-y-3 lg:space-y-4">
            {leaveHistory.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 lg:p-6 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100 text-center sm:text-left">
                <div className="min-w-0">
                  <p className="font-black text-slate-800 text-[11px] lg:text-xs uppercase italic">{item.type}</p>
                  <p className="text-[8px] lg:text-[9px] font-bold text-slate-400 mt-1 uppercase truncate">{item.id} • {item.date}</p>
                </div>
                <span className={`px-4 lg:px-5 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border shrink-0 ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}