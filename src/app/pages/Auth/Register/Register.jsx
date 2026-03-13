import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../../utils/api";
import Layout from "../../../layout/Layout";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaArrowRight } from "react-icons/fa";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleinput = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem(
          "auth",
          JSON.stringify({ token: data.token, user: data.user })
        );
        toast.success("Welcome to the SwiftPick family!");
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Join SwiftPick - Elite Shopping">
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 lg:px-8 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full -mr-64 -mt-64 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full -ml-64 -mb-64 animate-pulse" />

        <div className="glass-panel w-full max-w-[550px] rounded-[3.5rem] p-12 border border-white/5 shadow-2xl relative z-10 animate-fade-in-up">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">Create Account</h1>
            <p className="text-slate-500 font-bold text-sm tracking-wider uppercase">Join the future of e-commerce</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FaUser />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={handleinput}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  onChange={handleinput}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Password */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <FaLock />
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={handleinput}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <FaPhone />
                  </div>
                  <input
                    name="phone"
                    type="text"
                    placeholder="+91 0000000000"
                    required
                    onChange={handleinput}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/30 active:scale-95 text-lg uppercase tracking-widest flex items-center justify-center gap-3 mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Forging Account...
                </div>
              ) : (
                <>Sign Up <FaArrowRight className="text-sm" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-white transition-colors ml-2 underline decoration-2 underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
