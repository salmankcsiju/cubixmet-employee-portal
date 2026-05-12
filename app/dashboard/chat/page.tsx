export default function TeamChat() {
  const contacts = ["Anshid (Lead)", "Jaseel (QA)", "Bashim (Dev)", "Amnas (Dev)"];
  
  return (
    <div className="h-[600px] flex bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden animate-in zoom-in-95">
      {/* Sidebar - Contacts */}
      <div className="w-64 bg-slate-50 border-r border-slate-100 p-8">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic text-center">Active Sync</h3>
        <div className="space-y-4">
          {contacts.map((name, i) => (
            <div key={i} className="flex items-center gap-3 cursor-pointer group">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <p className="text-[11px] font-black text-slate-600 group-hover:text-blue-600 uppercase italic">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-md">
           <p className="font-black italic text-slate-800 uppercase tracking-tighter">Internal Operations Chat</p>
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">4 Online</span>
        </div>
        <div className="flex-1 p-8 space-y-6 overflow-y-auto bg-slate-50/30">
           <div className="max-w-xs bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Anshid</p>
              <p className="text-xs font-medium text-slate-700">Salman, did you finalize the Geofencing API?</p>
           </div>
           <div className="max-w-xs bg-blue-600 p-4 rounded-2xl rounded-tr-none shadow-xl ml-auto">
              <p className="text-xs font-medium text-white">Yes, testing the deployment now. Will sync in 5 mins.</p>
           </div>
        </div>
        <div className="p-6 bg-white border-t border-slate-100 flex gap-4">
          <input type="text" placeholder="WRITE YOUR MESSAGE..." className="flex-1 bg-slate-50 p-4 rounded-2xl outline-none font-bold text-xs" />
          <button className="bg-slate-900 text-white px-8 rounded-2xl font-black italic text-xs uppercase tracking-widest">Send</button>
        </div>
      </div>
    </div>
  );
}