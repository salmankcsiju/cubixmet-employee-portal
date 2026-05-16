"use client";
import { useState } from "react";

export default function ProjectsManagement() {
  const [selectedProjectId, setSelectedProjectId] = useState("CX-101");

  const projects = [
    { 
      id: "CX-101", 
      name: "CUBIXMET SaaS Portal", 
      client: "Internal", 
      status: "Active", 
      progress: 75, 
      lead: "Salman M.",
      color: "bg-blue-600",
      pastActivity: [
        { id: 1, type: "milestone", title: "Authentication System", date: "May 01", desc: "Implemented JWT and multi-tenant logic." },
        { id: 2, type: "update", title: "UI Refresh", date: "May 05", desc: "Updated dashboard with new glassmorphism theme." },
        { id: 3, type: "fix", title: "Auth Persistence", date: "May 08", desc: "Resolved session timeout issue in mobile view." }
      ],
      currentTasks: [
        { id: "T-501", title: "Geofencing API Polish", priority: "URGENT", status: "IN_PROGRESS" },
        { id: "T-502", title: "Mobile Layout Fixes", priority: "HIGH", status: "TO_DO" },
        { id: "T-503", title: "Export to CSV Module", priority: "MEDIUM", status: "TO_DO" }
      ]
    },
    { 
      id: "CX-102", 
      name: "E-Commerce App", 
      client: "Casa Amora", 
      status: "Review", 
      progress: 92, 
      lead: "Anshid",
      color: "bg-emerald-500",
      pastActivity: [
        { id: 4, type: "milestone", title: "Payment Gateway", date: "Apr 28", desc: "Integrated Razorpay with custom flow." },
        { id: 5, type: "update", title: "Product Catalog", date: "May 02", desc: "Optimized image loading for high-res assets." }
      ],
      currentTasks: [
        { id: "T-601", title: "Final UAT Session", priority: "URGENT", status: "TESTING" },
        { id: "T-602", title: "Performance Profiling", priority: "MEDIUM", status: "IN_PROGRESS" }
      ]
    },
    { 
      id: "CX-103", 
      name: "Inventory System", 
      client: "Internal", 
      status: "Planning", 
      progress: 15, 
      lead: "Bashim",
      color: "bg-amber-500",
      pastActivity: [
        { id: 6, type: "milestone", title: "Database Architecture", date: "May 10", desc: "Finalized schema for real-time tracking." }
      ],
      currentTasks: [
        { id: "T-701", title: "QR Code Generator", priority: "HIGH", status: "TO_DO" },
        { id: "T-702", title: "Stock Alert Logic", priority: "MEDIUM", status: "TO_DO" }
      ]
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DONE": return "bg-emerald-50 text-emerald-600";
      case "IN_PROGRESS": return "bg-blue-50 text-blue-600";
      case "TESTING": return "bg-purple-50 text-purple-600";
      case "URGENT": return "bg-rose-50 text-rose-600";
      default: return "bg-slate-50 text-slate-400";
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700 pb-20">
      
      {/* HEADER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Projects</p>
          <p className="text-2xl font-black text-slate-900 italic tracking-tighter">{projects.length}</p>
        </div>
        <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-100">
          <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">Active Tasks</p>
          <p className="text-2xl font-black italic tracking-tighter">
            {projects.reduce((acc, p) => acc + p.currentTasks.length, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Velocity</p>
          <p className="text-2xl font-black text-emerald-500 italic tracking-tighter">94%</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Milestones Reached</p>
          <p className="text-2xl font-black text-indigo-600 italic tracking-tighter">42</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: PROJECT REGISTRY */}
        <section className="lg:col-span-5 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Project Registry</h3>
            <button className="text-[9px] font-black text-blue-600 uppercase border-b-2 border-blue-100">Add New +</button>
          </div>
          
          <div className="space-y-3">
            {projects.map((p) => (
              <div 
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`group p-6 rounded-[2.5rem] border transition-all cursor-pointer relative overflow-hidden ${
                  selectedProjectId === p.id 
                  ? "bg-white border-blue-600 shadow-xl shadow-blue-50 ring-4 ring-blue-50" 
                  : "bg-white border-slate-100 hover:border-blue-200 shadow-sm"
                }`}
              >
                {selectedProjectId === p.id && (
                  <div className={`absolute top-0 left-0 w-2 h-full ${p.color}`}></div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-widest mb-1 block ${selectedProjectId === p.id ? 'text-blue-600' : 'text-slate-400'}`}>
                      {p.id}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                    p.status === 'Review' ? 'bg-amber-50 text-amber-600' : 
                    'bg-slate-50 text-slate-400'
                  }`}>
                    {p.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div className={`h-full transition-all duration-1000 ${p.color}`} style={{ width: `${p.progress}%` }}></div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 italic">{p.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: ACTIVITY STREAM */}
        <section className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 lg:p-10 rounded-[3.5rem] border border-slate-100 shadow-sm min-h-[600px] flex flex-col">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Activity Stream</p>
                <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
                  {selectedProject.name}_
                </h3>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Project Lead</p>
                <p className="text-xs font-black text-slate-700 uppercase italic tracking-tighter">{selectedProject.lead}</p>
              </div>
            </div>

            <div className="flex-1 space-y-12">
              {/* ACTIVE ACTIVITIES (CURRENT) */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  Active Sprints
                </h4>
                <div className="space-y-3">
                  {selectedProject.currentTasks.map((task) => (
                    <div key={task.id} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-400 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-xs group-hover:scale-110 transition-transform font-black text-[10px] text-blue-600 italic">
                          {task.id.split('-')[1]}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800 uppercase italic tracking-tighter">{task.title}</p>
                          <div className="flex gap-2 mt-1">
                            <span className={`text-[8px] font-black uppercase tracking-widest ${
                              task.priority === 'URGENT' ? 'text-rose-500' : 'text-slate-400'
                            }`}>{task.priority}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAST ACTIVITIES (HISTORY) */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Past Milestones</h4>
                <div className="relative pl-8 space-y-8 border-l border-slate-100 ml-3">
                  {selectedProject.pastActivity.map((activity) => (
                    <div key={activity.id} className="relative">
                      <div className="absolute -left-[41px] top-0 h-6 w-6 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center z-10">
                        <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-[10px] font-black text-slate-800 uppercase italic tracking-tighter">{activity.title}</p>
                          <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{activity.date}</p>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                          {activity.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Empty state if no past activity */}
                  {selectedProject.pastActivity.length === 0 && (
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">No past milestones recorded</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 flex justify-between items-center">
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all">View Full Report</button>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-black uppercase italic">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[8px] font-black text-blue-600">
                  +2
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}