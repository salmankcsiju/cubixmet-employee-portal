export default function Reimburse() {
  return (
    <div className="max-w-2xl bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm animate-in fade-in">
       <h2 className="text-2xl font-black italic uppercase mb-8">Expense Reimbursement</h2>
       <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <input type="text" placeholder="EXPENSE NAME" className="bg-slate-50 p-5 rounded-2xl border-none font-black text-[10px] outline-none" />
             <input type="number" placeholder="AMOUNT (INR)" className="bg-slate-50 p-5 rounded-2xl border-none font-black text-[10px] outline-none" />
          </div>
          <textarea placeholder="DESCRIPTION" className="w-full bg-slate-50 p-5 rounded-2xl border-none font-black text-[10px] outline-none min-h-[100px]" />
          <button className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase italic text-xs">Submit Claim</button>
       </form>
    </div>
  );
}