import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import { api } from "../../../../utils/api";
import { toast } from "react-toastify";
import { FaEnvelope, FaPaperPlane, FaLock } from "react-icons/fa";

const ForgetPasswordLink = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${api}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        toast.success("Recovery link dispatched to your inbox!");
      } else {
        toast.error(data.message || "Failed to send recovery link");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error syncing with the security matrix");
      toast.error("Transmission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Forgot Password - SwiftPick">
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-20">
        <div className="glass-panel w-full max-w-md rounded-[3rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden animate-fade-in-up">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                <FaLock className="text-3xl text-indigo-400" />
              </div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                Password <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Recovery</span>
              </h2>
              <p className="text-slate-500 mt-4 font-medium">
                Enter your identity to receive a secure recovery matrix link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Email Identity
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-colors">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nexus@swiftpick.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-[0_20px_50px_rgba(99,102,241,0.2)] active:scale-[0.98] flex items-center justify-center gap-3 uppercase italic tracking-tighter text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Syncing Matrix...
                  </div>
                ) : (
                  <>
                    Send Recovery Link <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>
            </form>

            {message && (
              <div className="mt-10 glass bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-3xl animate-fade-in text-center">
                <p className="text-indigo-400 font-bold text-sm leading-relaxed">
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPasswordLink;
