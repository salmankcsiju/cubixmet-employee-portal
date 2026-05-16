"use client";
import { useState } from "react";

export default function TodoManagement() {
  const [tasks, setTasks] = useState([
    { id: 101, title: "Configure Geofencing API for Employee Portal", priority: "High", status: "In-Progress", deadline: "May 15" },
    { id: 102, title: "Fix Hydration Error in Dashboard Sidebar", priority: "Urgent", status: "To-Do", deadline: "Today" },
    { id: 103, title: "Database Schema Migration to PostgreSQL", priority: "Medium", status: "Done", deadline: "May 10" },
    { id: 104, title: "Design Mobile Responsive Login Page", priority: "Low", status: "Testing", deadline: "May 18" },
    { id: 105, title: "Implement JWT Authentication Flow", priority: "High", status: "Done", deadline: "May 08" },
    { id: 106, title: "Add Lunch Break Toggle in Attendance Section", priority: "Medium", status: "In-Progress", deadline: "May 14" }
  ]);

  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask,
      priority: newPriority,
      status: "To-Do",
      deadline: "Pending",
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "In-Progress": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Testing": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-slate-50 text-slate-400 border-slate-100";
    }
  };

  return (
    <div className="max-w-6xl space-y-10 animate-in fade-in duration-500 pb-20">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-blue-950">Sprint Backlog_</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Cubixmet Internal Operations</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Sprint Progress</p>
          <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
            <div 
              className="h-full bg-blue-600 transition-all duration-1000" 
              style={{ width: `${(tasks.filter(t => t.status === "Done").length / tasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <section className="lg:col-span-1">
          <form onSubmit={addTask} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-10">
            <h3 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-6 text-center">Create Ticket</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Brief Task Title..." 
                className="w-full bg-slate-50 p-5 rounded-2xl border-none font-bold text-xs outline-none focus:ring-2 ring-blue-100 transition-all"
              />
              <select 
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full bg-slate-50 p-5 rounded-2xl border-none font-black text-[10px] uppercase tracking-widest outline-none cursor-pointer"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button type="submit" className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase italic text-[10px] tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl">
                Deploy Task +
              </button>
            </div>
          </form>
        </section>

        <section className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-4 px-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <p className="col-span-2">Task Description</p>
            <p>Priority</p>
            <p className="text-right">State</p>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="group flex justify-between items-center p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:border-blue-600 transition-all cursor-default"
              >
                <div className="flex items-center gap-6 col-span-2">
                  <div className={`h-2 w-2 rounded-full ${task.status === "Done" ? "bg-emerald-500" : "bg-blue-600 animate-pulse"}`}></div>
                  <div>
                    <h4 className={`font-black uppercase italic tracking-tighter text-sm ${task.status === "Done" ? "text-slate-400 line-through" : "text-slate-800"}`}>
                      {task.title}
                    </h4>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">ID: CX-{task.id} • Deadline: {task.deadline}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-1/2">
                   <p className={`text-[9px] font-black uppercase tracking-tighter ${task.priority === "Urgent" ? "text-rose-500" : "text-slate-400"}`}>
                     {task.priority}
                   </p>
                   <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getStatusColor(task.status)}`}>
                     {task.status}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}