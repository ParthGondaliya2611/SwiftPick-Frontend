import React from "react";
import { IoCall, IoMail, IoLocation } from "react-icons/io5"; // Icons for contact info
import Layout from "../../layout/Layout";

const Contact = () => {
  return (
    <Layout title="Conatct - SwiftPick">
      <div className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
               Support Nexus
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Excellence</span>
            </h1>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              Facing an issue or have a premium query? Our specialized support team is here to forge solutions for your SwiftPick experience.
            </p>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="lg:col-span-7 glass-panel rounded-[3rem] p-10 border border-white/5 relative overflow-hidden bg-white/[0.03] animate-fade-in-up">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -mr-20 -mt-20" />
              
              <h2 className="text-3xl font-black text-white mb-10 italic tracking-tighter uppercase">Send a Message</h2>
              
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Alex Mercer"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2">Email Identity</label>
                    <input
                      type="email"
                      placeholder="alex@nexus.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2">Your Inquiry</label>
                  <textarea
                    placeholder="Describe your requirement in detail..."
                    rows="6"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full h-16 bg-white text-slate-950 font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-slate-200 active:scale-[0.98] text-xl uppercase italic tracking-tighter"
                >
                  Dispatch Message
                </button>
              </form>
            </div>
  
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { icon: <IoCall className="text-2xl" />, label: "Global Hotline", value: "+1 (888) SWIFT-PICK", color: "indigo" },
                { icon: <IoMail className="text-2xl" />, label: "Neural Inbox", value: "support@swiftpick.io", color: "cyan" },
                { icon: <IoLocation className="text-2xl" />, label: "Command Center", value: "Silicon Tower, Tech District, SV-101", color: "purple" }
              ].map((info, i) => (
                <div key={i} className="glass-panel group rounded-[2.5rem] p-8 border border-white/5 hover:border-indigo-500/20 transition-all duration-500 flex items-center gap-6 bg-white/[0.02] animate-fade-in-up" style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                  <div className={`w-14 h-14 rounded-2xl bg-${info.color}-500/10 flex items-center justify-center text-${info.color}-400 group-hover:scale-110 transition-transform shadow-lg shadow-${info.color}-500/10`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{info.label}</h3>
                    <p className="text-white font-black text-lg italic tracking-tighter leading-none">{info.value}</p>
                  </div>
                </div>
              ))}
              
              {/* Additional Glassy Card */}
              <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                    "We don't just solve tickets; we forge lasting partnerships with our community of elite shoppers."
                 </p>
                 <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-1bg-indigo-500 rounded-full" />
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">SwiftPick Leadership</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
