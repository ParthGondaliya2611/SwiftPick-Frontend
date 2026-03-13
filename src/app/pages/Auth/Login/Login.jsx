import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../../utils/api";
import Layout from "../../../layout/Layout";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

export function Login() {
  const location = useLocation();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Welcome back to SwiftPick!");
        localStorage.setItem(
          "auth",
          JSON.stringify({ token: data.token, user: data.user })
        );
        navigate(location.state || "/");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login - SwiftPick">
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse-slow" />

        <div className="glass-panel w-full max-w-[480px] rounded-[3rem] p-10 border border-white/5 shadow-2xl relative z-10 animate-fade-in-up">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-bold text-sm tracking-wider uppercase">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleInput}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="block text-xs font-black text-slate-500 uppercase tracking-widest">
                  Password
                </label>
                <NavLink to="/forgetpasswordlink" className="text-xs font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">
                  Forgot?
                </NavLink>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FaLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleInput}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/30 active:scale-95 text-lg uppercase tracking-widest flex items-center justify-center gap-3 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Authenticating...
                </div>
              ) : (
                <>Sign In <FaArrowRight className="text-sm" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">
              New to SwiftPick?{" "}
              <Link to="/register" className="text-indigo-400 hover:text-white transition-colors ml-2 underline decoration-2 underline-offset-4">
                Join the Elite
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;

