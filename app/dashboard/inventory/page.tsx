export default function Inventory() {
  const assets = [
    { id: "ASSET-001", name: "MacBook Pro M3", tag: "CX-LPT-22", status: "Assigned", date: "Jan 2026" },
    { id: "ASSET-002", name: "Ultra-Wide Monitor", tag: "CX-MON-05", status: "Assigned", date: "Jan 2026" },
    { id: "ASSET-003", name: "Sony Noise Cancelling Headphones", tag: "CX-AUD-09", status: "In-Repair", date: "N/A" }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4">
      <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Asset Registry</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm border-t-8 border-t-blue-600">
            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">{asset.id}</p>
            <h4 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter">{asset.name}</h4>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Tag: {asset.tag}</p>
            <div className="mt-6 flex justify-between items-center">
              <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${asset.status === 'Assigned' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                {asset.status}
              </span>
              <p className="text-[8px] font-bold text-slate-300 uppercase italic">Issued: {asset.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}