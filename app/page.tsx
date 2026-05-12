"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      router.push("/dashboard");
    } else {
      setError("Authorization credentials required.");
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-sans p-4 sm:p-6">
      <div className="w-full max-w-[420px] bg-white p-6 sm:p-12 rounded-3xl sm:rounded-4xl shadow-2xl shadow-blue-100/20 border border-slate-100 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tighter uppercase italic">Cubixmet_</h1>
          <p className="text-slate-400 text-[9px] sm:text-[10px] font-black mt-2 uppercase tracking-[0.3em]">Access Management Portal</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white text-sm font-bold transition-all"
              autoComplete="username"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white text-sm font-bold transition-all"
              autoComplete="current-password"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-[11px] text-center hover:bg-blue-700 transition-all uppercase italic tracking-widest shadow-lg shadow-blue-100"
            >
              Sign In
            </button>
          </div>
        </form>

        {error && (
          <div className="text-rose-500 text-[10px] font-black mt-4 text-center uppercase tracking-widest animate-pulse">
            {error}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
            onClick={() => { router.push("/dashboard"); }}
          >
            Bypass Authentication →
          </button>
          
          <p className="text-slate-200 text-[8px] font-bold uppercase tracking-widest">
            Identity Service v3.0
          </p>
        </div>
      </div>
    </div>
  );
}