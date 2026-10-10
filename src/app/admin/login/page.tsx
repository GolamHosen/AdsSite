import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { Wind } from "lucide-react";

export const metadata = {
  title: "Admin Login – Adsoxygen",
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0c3234] px-6 py-12 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#AEFF1C]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#006402]/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#104042]/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#AEFF1C] text-[#104042] shadow-md">
            <Wind className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-white font-display tracking-tight">Adsoxygen</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#AEFF1C] -mt-1">
              Admin Portal
            </span>
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-white font-display">Welcome back</h1>
        <p className="mt-1 text-sm text-white/60">Sign in to manage campaigns and leads.</p>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
