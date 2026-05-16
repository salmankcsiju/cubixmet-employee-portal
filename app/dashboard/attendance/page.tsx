"use client";
import { useState, useEffect } from "react";

const ATTENDANCE_STATUSES = {
  SUNDAY: { label: "Sunday", color: "bg-slate-50 text-slate-400 border-slate-100" },
  LEAVE_APPROVED: { label: "Leave Approved", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  LEAVE_PENDING: { label: "Leave Pending", color: "bg-amber-50 text-amber-600 border-amber-100" },
  LEAVE_REJECTED: { label: "Non Approved Leave", color: "bg-rose-50 text-rose-600 border-rose-100" },
  HOLIDAY: { label: "Holiday", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  ACTIVE: { label: "Active Day", color: "bg-blue-50 text-blue-600 border-blue-100" },
  HALF_DAY: { label: "Half Day", color: "bg-orange-50 text-orange-600 border-orange-100" },
  WFH: { label: "Work From Home", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
};

export default function AttendanceWorkflow() {
  const [view, setView] = useState("CALENDAR"); // CALENDAR or LIST
  const [sessionStatus, setSessionStatus] = useState("OFF_DUTY");
  const [location] = useState("NADUVATH, KERALA (9.5° N, 76.3° E)");
  
  // Verification States
  const [verificationStep, setVerificationStep] = useState("IDLE"); // IDLE, CHECKING, AUTHORIZED, FAILED, CAMERA, CAPTURED
  const [distance, setDistance] = useState(0);
  const [liveTime, setLiveTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (verificationStep === "CAMERA") {
      timer = setInterval(() => {
        setLiveTime(new Date().toLocaleString());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [verificationStep]);

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const calendarDates = Array.from({ length: 31 }, (_, i) => i + 1);

  const attendanceData = [
    { date: 1, status: "ACTIVE", in: "09:00 AM", out: "06:00 PM", approval: "Approved" },
    { date: 2, status: "ACTIVE", in: "09:15 AM", out: "06:10 PM", approval: "Approved" },
    { date: 3, status: "SUNDAY" },
    { date: 4, status: "WFH", in: "09:00 AM", out: "06:00 PM", approval: "Approved" },
    { date: 5, status: "HALF_DAY", in: "09:00 AM", out: "01:30 PM", approval: "Pending" },
    { date: 10, status: "SUNDAY" },
    { date: 12, status: "LEAVE_APPROVED", note: "Family Event" },
    { date: 15, status: "HOLIDAY", note: "Eid-ul-Fitr" },
    { date: 17, status: "SUNDAY" },
    { date: 18, status: "LEAVE_REJECTED", note: "Personal Reason" },
    { date: 24, status: "SUNDAY" },
    { date: 31, status: "SUNDAY" },
  ];

  const getStatus = (date: number) => {
    return attendanceData.find(d => d.date === date);
  };

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
    setSessionStatus("ON_SHIFT");
    setVerificationStep("IDLE");
  };

  const handleAction = (status: string) => {
    setSessionStatus(status);
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* SHIFT CONTROLS - POLISHED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white p-6 lg:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-100 shrink-0 shadow-inner">
                <div className={`h-3 w-3 rounded-full ${sessionStatus === "ON_SHIFT" ? "bg-emerald-500 animate-pulse shadow-lg shadow-emerald-200" : "bg-blue-600"}`}></div>
              </div>
              <div>
                <h3 className="text-[9px] font-black text-blue-900 uppercase tracking-[0.2em] mb-1">Shift Analytics</h3>
                <p className="text-xl lg:text-2xl font-black text-slate-900 italic uppercase tracking-tighter">
                  {sessionStatus.replace("_", " ")}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Live Session Monitoring_</p>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto items-center">
              {sessionStatus === "OFF_DUTY" && (verificationStep === "IDLE" || verificationStep === "CAPTURED") && (
                <button onClick={handlePunchInRequest} className="flex-1 md:flex-none px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95">punch in</button>
              )}
              
              {verificationStep === "CHECKING" && (
                <div className="flex items-center gap-4 px-8 py-5 bg-slate-50 rounded-2xl border border-slate-100 animate-pulse">
                  <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Verifying GPS...</span>
                </div>
              )}

              {verificationStep === "AUTHORIZED" && (
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <div className="flex-1 px-6 py-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-200"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest">Authorized ({distance}m)</span>
                  </div>
                  <button onClick={handleFinalPunchIn} className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-emerald-200 animate-bounce">confirm punch in</button>
                </div>
              )}

              {verificationStep === "FAILED" && (
                <div className="flex flex-col sm:flex-row gap-3 w-full items-center">
                  <div className="flex-1 px-6 py-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest">Out of Range ({distance}m)</span>
                  </div>
                  <button onClick={() => setVerificationStep("CAMERA")} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-slate-200">Use Camera</button>
                  <button onClick={() => setVerificationStep("IDLE")} className="px-4 py-4 text-slate-400 font-black text-[9px] uppercase tracking-widest hover:text-blue-600">Retry</button>
                </div>
              )}

              {sessionStatus === "ON_SHIFT" && (
                <>
                  <button onClick={() => handleAction("ON_BREAK")} className="flex-1 md:flex-none px-8 py-5 bg-amber-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-100">Break</button>
                  <button onClick={() => handleAction("FINISHED")} className="flex-1 md:flex-none px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200">punch out</button>
                </>
              )}
              {sessionStatus === "ON_BREAK" && (
                <button onClick={() => handleAction("ON_SHIFT")} className="flex-1 md:flex-none px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-100">Resume</button>
              )}
              {sessionStatus === "FINISHED" && (
                <button onClick={() => setSessionStatus("OFF_DUTY")} className="flex-1 md:flex-none px-10 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Reset</button>
              )}
            </div>
          </section>

          {/* EMERGENCY CAMERA OVERLAY (POLISHED) */}
          {verificationStep === "CAMERA" && (
            <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <h3 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.3em]">Identity Check</h3>
                  <button onClick={() => setVerificationStep("IDLE")} className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm transition-all active:scale-90">✕</button>
                </div>
                <div className="aspect-square bg-slate-900 relative group overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/10 text-8xl animate-pulse">📷</div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                   </div>
                   <div className="absolute bottom-8 left-8 text-white font-mono text-[10px] space-y-2 z-10">
                      <div className="bg-blue-600 px-3 py-1 rounded-lg inline-flex items-center gap-2 shadow-lg">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
                        <span className="tracking-tighter">LIVE TIMESTAMP: {liveTime}</span>
                      </div>
                      <p className="bg-black/50 px-3 py-1 rounded-lg block uppercase tracking-widest border border-white/10">Location: {location}</p>
                   </div>
                   <div className="absolute inset-8 border-2 border-white/10 rounded-[2rem] pointer-events-none"></div>
                   <div className="absolute top-8 right-8 h-3 w-3 rounded-full bg-rose-500 animate-ping"></div>
                </div>
                <div className="p-10 space-y-6 text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">System requires a live photo with visible background for manual verification_</p>
                   <button 
                    onClick={() => {
                      setVerificationStep("CAPTURED");
                      setTimeout(handleFinalPunchIn, 1500);
                    }}
                    className="w-full bg-blue-600 text-white p-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
                   >
                     capture & punch in
                   </button>
                </div>
              </div>
            </div>
          )}

          {verificationStep === "CAPTURED" && (
            <div className="fixed inset-0 bg-blue-900/95 backdrop-blur-2xl z-[100] flex items-center justify-center animate-in fade-in zoom-in-125">
               <div className="text-center space-y-6">
                  <div className="h-32 w-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-5xl mx-auto shadow-2xl animate-bounce text-white">✔️</div>
                  <p className="text-white font-black uppercase tracking-[0.4em] text-lg">punch verified</p>
               </div>
            </div>
          )}

          {/* VIEW TOGGLE */}
          <section className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm inline-flex gap-1">
            <button 
              onClick={() => setView("CALENDAR")}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === "CALENDAR" ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "text-slate-400 hover:bg-slate-50"}`}
            >
              Calendar View
            </button>
            <button 
              onClick={() => setView("LIST")}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === "LIST" ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "text-slate-400 hover:bg-slate-50"}`}
            >
              Detailed List
            </button>
          </section>

          {/* MAIN CONTENT */}
          {view === "CALENDAR" ? (
            <section className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-[10px] lg:text-[11px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-600 pl-4">Attendance Registry</h3>
                <p className="text-[11px] font-black text-blue-600 uppercase italic bg-blue-50 px-4 py-1 rounded-full">May 2026</p>
              </div>
              <div className="grid grid-cols-7 gap-3 lg:gap-5">
                {days.map((d, i) => <div key={i} className="text-center text-[9px] font-black text-slate-300 uppercase tracking-widest">{d}</div>)}
                {[...Array(5)].map((_, i) => <div key={`empty-${i}`}></div>)}
                {calendarDates.map(date => {
                  const data = getStatus(date);
                  const statusStyle = data ? ATTENDANCE_STATUSES[data.status as keyof typeof ATTENDANCE_STATUSES].color : "bg-white border-slate-50 text-slate-400";
                  return (
                    <div key={date} className={`h-16 lg:h-20 rounded-2xl lg:rounded-3xl border flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer relative group ${statusStyle}`}>
                      <span className="text-[11px] lg:text-sm font-black">{date}</span>
                      {data?.approval && (
                        <div className={`absolute top-2 right-2 h-2 w-2 rounded-full ${data.approval === "Approved" ? "bg-emerald-500 shadow-sm" : "bg-amber-500 shadow-sm"}`}></div>
                      )}
                      {data?.status && (
                        <span className="text-[6px] lg:text-[7px] font-black uppercase tracking-tighter mt-1 opacity-60 truncate max-w-full px-2">
                          {ATTENDANCE_STATUSES[data.status as keyof typeof ATTENDANCE_STATUSES].label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : (
            <section className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-[10px] lg:text-[11px] font-black text-blue-900 uppercase tracking-widest mb-10 border-l-4 border-blue-600 pl-4">Detailed punch Log</h3>
              <div className="space-y-4">
                {attendanceData.filter(d => d.status !== "SUNDAY").map((log, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 gap-6 hover:border-blue-200 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center font-black text-sm border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">{log.date}</div>
                      <div>
                        <p className="text-[11px] font-black text-slate-800 uppercase italic">May {log.date}, 2026</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">
                          {log.status === "HOLIDAY" || log.status === "LEAVE_APPROVED" ? log.note : `${log.in} - ${log.out}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest border ${ATTENDANCE_STATUSES[log.status as keyof typeof ATTENDANCE_STATUSES].color}`}>
                        {ATTENDANCE_STATUSES[log.status as keyof typeof ATTENDANCE_STATUSES].label}
                      </span>
                      {log.approval && (
                        <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest border ${log.approval === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}>
                          {log.approval}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* COLOR LEGEND */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-[9px] font-black text-blue-900 uppercase tracking-widest mb-6">Status Indicator Guide</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(ATTENDANCE_STATUSES).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded-lg border ${value.color}`}></div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{value.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Approved</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Pending</span>
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR INFO - POLISHED */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-[9px] font-black text-blue-900 uppercase tracking-widest mb-8">Access Perimeter</h3>
             <div className="space-y-6">
                <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                   <div className="text-2xl h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">📍</div>
                   <div className="min-w-0">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Geofence Registry</p>
                      <p className="text-[10px] font-black text-slate-700 italic truncate">{location}</p>
                   </div>
                </div>
                
                {sessionStatus === "OFF_DUTY" && (
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-2">Emergency Protocols</p>
                    <button 
                      onClick={() => setVerificationStep("CAMERA")}
                      className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-[1.2rem] hover:border-blue-400 hover:shadow-lg hover:shadow-blue-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl group-hover:scale-110 transition-transform">📷</span>
                        <div className="text-left">
                          <p className="text-[10px] font-black text-slate-800 uppercase italic">Live Camera</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Manual validation_</p>
                        </div>
                      </div>
                      <span className="text-slate-200 group-hover:text-blue-600 transition-colors">→</span>
                    </button>
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-dashed border-blue-200 text-center">
                      <p className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] leading-relaxed">
                        Authorized Perimeter: 100m
                      </p>
                    </div>
                  </div>
                )}

                {sessionStatus === "ON_SHIFT" && (
                  <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl font-black italic">✓</div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-relaxed">
                       punch verified & session active_
                    </p>
                  </div>
                )}
             </div>
          </section>

          <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
             <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Performance</h3>
             <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Ratio</span>
                  <span className="text-sm font-black italic text-blue-400">18/22</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Approved Leave</span>
                  <span className="text-sm font-black italic text-emerald-400">02</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Late Arrival</span>
                  <span className="text-sm font-black italic text-rose-400">00</span>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}