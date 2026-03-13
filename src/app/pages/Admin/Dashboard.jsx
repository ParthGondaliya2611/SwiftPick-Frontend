import { useEffect, useState } from "react";
import Token from "../../../utils/Token";
import { api } from "../../../utils/api";
import DashboardPannel from "../../layout/DashboardPannel";
import Layout from "../../layout/Layout";
import { FaUser, FaEnvelope, FaPhone, FaShieldAlt, FaCamera } from "react-icons/fa";

const Dashboard = () => {
  const token = Token();
  const [Register, setRegister] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });
  const [Value, setValue] = useState({});
  const [update, setUpdate] = useState(false);

  const handleinput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setRegister({ ...Register, [name]: value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${api}/api/v1/auth/update-User/${token?.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
          body: JSON.stringify(Register),
        }
      );
      const data = await response.json();
      if (response.ok) {
        let existingAuth = JSON.parse(localStorage.getItem("auth"));
        if (existingAuth && existingAuth.user) {
          existingAuth.user.name = data.user.name;
          existingAuth.user.email = data.user.email;
          existingAuth.user.phone = data.user.phone;
          existingAuth.user.role = data.user.role;
        } else {
          existingAuth = { user: data.user };
        }
        localStorage.setItem("auth", JSON.stringify(existingAuth));
        setUpdate(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const singleUser = async () => {
    try {
      const response = await fetch(`${api}/api/v1/auth/singleUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
      });
      const data = await response.json();
      setValue(data.user);
      setUpdate(false);
      setRegister(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleUser();
   // eslint-disable-next-line
  }, [update]);

  return (
    <Layout title={`Command Center - ${Value.name || "User"}`}>
      <div className="min-h-screen bg-slate-950 text-white pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardPannel />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* PROFILE OVERVIEW */}
            <div className="lg:col-span-5 space-y-8 animate-fade-in">
              <div className="glass-panel rounded-[3rem] p-10 border border-white/5 relative overflow-hidden bg-white/[0.02]">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-[100px] rounded-full" />
                
                <div className="flex flex-col items-center text-center">
                  <div className="relative group mb-6">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-500/10 border-2 border-indigo-500/20 flex items-center justify-center p-2 group-hover:border-indigo-500/50 transition-all overflow-hidden shadow-2xl">
                      <FaUser className="text-6xl text-indigo-400 opacity-50" />
                      <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <FaCamera className="text-2xl text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                    {Value.name}
                  </h2>
                  <span className="px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-widest mt-2">
                    {Value.role} Account
                  </span>
                </div>

                <div className="mt-10 space-y-4">
                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                      <p className="font-bold text-white">{Value.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone Number</p>
                      <p className="font-bold text-white">{Value.phone || "Not Set"}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 bg-gradient-to-br from-indigo-500/10 to-transparent flex items-center gap-6">
                <div className="h-16 w-16 rounded-[1.5rem] bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <div>
                  <h4 className="font-black text-white italic tracking-tighter uppercase text-xl italic underline underline-offset-4 decoration-indigo-500/30">Verified Security</h4>
                  <p className="text-xs text-slate-400 mt-1 font-medium italic tracking-wide">Your data is encrypted with 256-bit SSL protocols.</p>
                </div>
              </div>
            </div>

            {/* UPDATE FORM */}
            <div className="lg:col-span-7 animate-fade-in-up">
              <div className="glass-panel rounded-[3rem] p-10 border border-white/5 bg-white/[0.03]">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-10 border-l-4 border-indigo-500 pl-6 leading-none">
                  Edit Profile
                </h3>
                
                <form className="space-y-8" onSubmit={updateProfile}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Full Name</label>
                      <input
                        name="name"
                        required
                        type="text"
                        value={Register.name}
                        onChange={handleinput}
                        placeholder="Master Chief"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Identity</label>
                      <input
                        name="email"
                        required
                        type="email"
                        value={Register.email}
                        onChange={handleinput}
                        placeholder="chief@halo.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Mobile Number</label>
                      <input
                        name="phone"
                        required
                        type="tel"
                        value={Register.phone}
                        onChange={handleinput}
                        placeholder="+1 234 567 890"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Platform Role</label>
                      <input
                        name="role"
                        disabled
                        type="text"
                        value={Register.role}
                        className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-4 px-6 text-slate-500 outline-none font-black uppercase tracking-widest cursor-not-allowed italic"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-6 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-3xl transition-all shadow-[0_20px_50px_rgba(99,102,241,0.2)] active:scale-[0.98] text-xl uppercase italic tracking-tighter"
                  >
                    Sync Credentials
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
