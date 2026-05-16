"use client";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    // ലോഗൗട്ട് ചെയ്യുമ്പോൾ ഹോം പേജിലേക്കോ ലോഗിൻ പേജിലേക്കോ പോകാൻ
    router.push('/');
  };

  return (
    <div className="max-w-4xl space-y-6 lg:space-y-8 animate-in zoom-in-95 duration-500">
      {/* Profile Info Card */}
      <div className="bg-white p-6 lg:p-12 rounded-3xl lg:rounded-[3.5rem] border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10 mb-8 lg:mb-12 border-b border-slate-50 pb-8 lg:pb-12 text-center sm:text-left">
           <div className="w-24 h-24 lg:w-32 lg:h-32 bg-blue-600 rounded-3xl lg:rounded-[2.5rem] flex items-center justify-center text-3xl lg:text-5xl font-black text-white italic shadow-2xl shadow-blue-200 shrink-0">S</div>
           <div>
              <h2 className="text-2xl lg:text-4xl font-black uppercase text-blue-950 tracking-tighter">Muhammed Salman M.</h2>
              <p className="text-blue-600 font-black uppercase text-[10px] lg:text-[11px] tracking-[0.2em] mt-2">Senior Full-Stack Engineer | CUBIXMET_</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 text-[10px] lg:text-[11px] font-black uppercase tracking-widest">
           <div className="space-y-6">
              <div>
                <p className="text-slate-300 mb-2">Primary Credentials</p>
                <p className="text-slate-700 italic text-sm tracking-normal">salman@cubixmet.com</p>
                <p className="text-slate-700 italic text-sm tracking-normal mt-1">+91 9876543210</p>
              </div>
           </div>
           <div className="space-y-6">
              <div>
                <p className="text-slate-300 mb-2">Deployment Registry</p>
                <p className="text-slate-700 italic text-sm tracking-normal">Emp ID: CX-2026-08</p>
                <p className="text-slate-700 italic text-sm tracking-normal mt-1">Location: Naduvath, KL</p>
              </div>
           </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="bg-rose-50 p-6 lg:p-10 rounded-3xl lg:rounded-[3rem] border border-rose-100 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left group">
        <div>
          <h3 className="text-blue-900 font-black uppercase tracking-tighter text-lg">Terminate Session_</h3>
          <p className="text-rose-400 text-[9px] lg:text-[10px] font-black uppercase tracking-widest mt-1">Ensure all active logs are synced before exit</p>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full sm:w-auto bg-rose-500 text-white px-8 lg:px-10 py-4 lg:py-5 rounded-xl lg:rounded-2xl font-black uppercase italic text-[10px] lg:text-xs tracking-[0.2em] shadow-xl shadow-rose-200 hover:bg-rose-600 hover:scale-105 transition-all"
        >
          Logout Session →
        </button>
      </div>
    </div>
  );
}