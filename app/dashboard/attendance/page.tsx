"use client";
import { useState } from "react";

export default function AttendanceWorkflow() {
  const [sessionStatus, setSessionStatus] = useState("OFF_DUTY"); // OFF_DUTY, ON_SHIFT, ON_BREAK, FINISHED
  const [location, setLocation] = useState("NADUVATH, KERALA (9.5° N, 76.3° E)");

  const handleAction = (status: string) => {
    setSessionStatus(status);
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* STEP-BY-STEP WORKFLOW HEADER */}
      <div className="flex justify-between items-center bg-white p-4 lg:p-6 rounded-2xl lg:rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
        {["SHIFT START", "LUNCH BREAK", "SHIFT END"].map((step, i) => (
          <div key={i} className="flex items-center gap-3 lg:gap-4 px-2 lg:px-4 min-w-fit">
            <div className={`h-6 w-6 lg:h-8 lg:w-8 rounded-full flex items-center justify-center font-black text-[10px] lg:text-xs ${
              (i === 0 && sessionStatus !== "OFF_DUTY") || (i === 1 && sessionStatus === "ON_BREAK") || (i === 2 && sessionStatus === "FINISHED")
              ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
            }`}>
              {i + 1}
            </div>
            <p className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-slate-500">{step}</p>
            {i < 2 && <div className="h-[2px] w-6 lg:w-12 bg-slate-100"></div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* ACTION CONTROL CENTER */}
        <section className="bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[3rem] border border-slate-100 shadow-xl">
          <div className="text-center mb-8 lg:mb-10">
            <h3 className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 lg:mb-4">Current State</h3>
            <div className="inline-block px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl lg:rounded-2xl bg-slate-50 border border-slate-100">
               <span className={`text-lg lg:text-xl font-black italic uppercase tracking-tighter ${
                 sessionStatus === "ON_SHIFT" ? "text-blue-600" : 
                 sessionStatus === "ON_BREAK" ? "text-amber-500" : 
                 sessionStatus === "FINISHED" ? "text-emerald-500" : "text-slate-400"
               }`}>
                 {sessionStatus.replace("_", " ")}
               </span>
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {sessionStatus === "OFF_DUTY" && (
              <button 
                onClick={() => handleAction("ON_SHIFT")}
                className="w-full bg-blue-600 text-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl font-black text-[10px] lg:text-xs uppercase italic tracking-[0.2em] shadow-2xl shadow-blue-100 hover:scale-[1.02] transition-all"
              >
                Punch In (Verify)
              </button>
            )}

            {sessionStatus === "ON_SHIFT" && (
              <div className="grid grid-cols-1 gap-3 lg:gap-4">
                <button 
                  onClick={() => handleAction("ON_BREAK")}
                  className="w-full bg-amber-500 text-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl font-black text-[10px] lg:text-xs uppercase italic tracking-[0.2em] shadow-lg"
                >
                  Lunch Break 🍱
                </button>
                <button 
                  onClick={() => handleAction("FINISHED")}
                  className="w-full bg-slate-900 text-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl font-black text-[10px] lg:text-xs uppercase italic tracking-[0.2em]"
                >
                  Finish Shift
                </button>
              </div>
            )}

            {sessionStatus === "ON_BREAK" && (
              <button 
                onClick={() => handleAction("ON_SHIFT")}
                className="w-full bg-emerald-500 text-white p-5 lg:p-6 rounded-2xl lg:rounded-3xl font-black text-[10px] lg:text-xs uppercase italic tracking-[0.2em] shadow-lg"
              >
                Back to Work
              </button>
            )}

            {sessionStatus === "FINISHED" && (
              <div className="text-center p-5 lg:p-6 bg-emerald-50 rounded-2xl lg:rounded-3xl border border-emerald-100">
                <p className="text-emerald-700 font-black text-[10px] lg:text-xs uppercase italic leading-tight">Great Work Today! Shift Closed.</p>
                <button onClick={() => setSessionStatus("OFF_DUTY")} className="mt-4 text-[9px] lg:text-[10px] font-bold text-emerald-500 uppercase">Reset System</button>
              </div>
            )}
          </div>
        </section>

        {/* GEOLOCATION VERIFICATION */}
        <section className="bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-center">
           <h3 className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 lg:mb-6 italic">Geofence Status</h3>
           <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-4 p-4 lg:p-5 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100">
                 <div className="h-8 w-8 lg:h-10 lg:w-10 bg-white rounded-lg lg:rounded-xl flex items-center justify-center text-lg shadow-sm shrink-0">📍</div>
                 <div className="min-w-0">
                    <p className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-tighter">Current Access Point</p>
                    <p className="text-[10px] lg:text-xs font-black text-slate-700 italic truncate">{location}</p>
                 </div>
              </div>
              <div className="p-4 lg:p-6 bg-blue-50/50 rounded-2xl lg:rounded-3xl border border-dashed border-blue-200">
                 <p className="text-[9px] lg:text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-relaxed">
                    System Alert: Within authorized 500m geofence.
                 </p>
              </div>
           </div>
        </section>
      </div>

      {/* RECENT ACTIVITY LOGS */}
      <section className="bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[3.5rem] border border-slate-100 shadow-sm">
        <h3 className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 lg:mb-8">Session Log</h3>
        <div className="space-y-2 lg:space-y-3">
          {[
            { action: "Clock In", time: "09:00 AM", loc: "Naduvath, KL", status: "Verified" },
            { action: "Lunch Break", time: "01:15 PM", loc: "Company Canteen", status: "Active" },
          ].map((log, i) => (
            <div key={i} className="flex justify-between items-center p-4 lg:p-5 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md">
               <div className="min-w-0">
                  <p className="font-black text-slate-800 uppercase italic text-[10px] lg:text-[11px]">{log.action}</p>
                  <p className="text-[8px] lg:text-[9px] font-bold text-slate-400 mt-1 uppercase truncate">{log.time} • {log.loc}</p>
               </div>
               <span className="bg-emerald-50 text-emerald-600 px-3 lg:px-4 py-1 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border border-emerald-100 shrink-0">
                 {log.status}
               </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}