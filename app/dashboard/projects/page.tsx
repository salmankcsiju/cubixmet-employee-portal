"use client";
import { useState } from "react";

export default function ProjectsManagement() {
  const [filter, setFilter] = useState("ALL");

  const projects = [
    { id: "CX-101", name: "CUBIXMET SaaS Portal", client: "Internal", status: "Active", progress: 75, lead: "Salman M." },
    { id: "CX-102", name: "E-Commerce App", client: "Casa Amora", status: "Review", progress: 90, lead: "Anshid" },
  ];

  const tasks = [
    { id: "T-501", title: "API Endpoint Security", priority: "URGENT", status: "IN_PROGRESS", assignee: "Salman" },
    { id: "T-502", title: "Geofencing Logic Test", priority: "HIGH", status: "TESTING", assignee: "Jaseel" },
    { id: "T-503", title: "Sidebar Navigation Polish", priority: "LOW", status: "DONE", assignee: "Salman" },
    { id: "T-504", title: "Database Migration", priority: "HIGH", status: "TO_DO", assignee: "Bashim" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DONE": return "bg-emerald-50 text-emerald-600";
      case "IN_PROGRESS": return "bg-blue-50 text-blue-600";
      case "TESTING": return "bg-purple-50 text-purple-600";
      default: return "bg-slate-50 text-slate-400";
    }
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700 pb-20">
      
      {/* PROJECT ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Active Sprints</p>
          <p className="text-4xl font-black text-slate-900 italic tracking-tighter">02</p>
        </div>
        <div className="bg-[#2563EB] p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Tasks Completed</p>
          <p className="text-4xl font-black italic tracking-tighter">128</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Total Efficiency</p>
          <p className="text-4xl font-black text-emerald-500 italic tracking-tighter">94%</p>
        </div>
      </div>

      {/* ACTIVE PROJECTS TABLE */}
      <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Project Portfolio</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="pb-6">Project ID</th>
                <th className="pb-6">Title</th>
                <th className="pb-6">Client</th>
                <th className="pb-6">Progress</th>
                <th className="pb-6 text-right">Lead</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {projects.map((p) => (
                <tr key={p.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="py-6 font-black text-[11px] text-blue-600 italic tracking-widest">{p.id}</td>
                  <td className="py-6 font-black text-sm text-slate-800 uppercase italic tracking-tighter">{p.name}</td>
                  <td className="py-6 text-xs font-bold text-slate-400 uppercase">{p.client}</td>
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{ width: `${p.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-slate-400">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-6 text-right text-xs font-black text-slate-700 italic uppercase">{p.lead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TASK BOARD / TICKET SYSTEM */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Live Ticket Registry</h3>
          <div className="flex gap-2">
            {["ALL", "URGENT", "TO_DO"].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all ${filter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border border-slate-100'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.filter(t => filter === "ALL" || t.priority === filter || t.status === filter).map((task) => (
            <div key={task.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center group hover:border-blue-600 transition-all border-l-8 border-l-slate-200">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-black text-blue-600 tracking-widest">{task.id}</span>
                  {task.priority === "URGENT" && <span className="h-2 w-2 bg-rose-500 rounded-full animate-pulse"></span>}
                </div>
                <h4 className="font-black text-slate-800 text-sm uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors">{task.title}</h4>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Assignee: {task.assignee}</p>
              </div>
              <div className="text-right">
                <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${getStatusColor(task.status)}`}>
                  {task.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}