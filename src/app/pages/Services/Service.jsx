import React from 'react';
import { IoRocketSharp, IoHeadset, IoRepeat } from 'react-icons/io5';
import Layout from '../../layout/Layout';

const Service = () => {
  return (
    <Layout title="Service - SwiftPick"> 
      <div className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20 animate-fade-in text-nowrap">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
               Service Matrix
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Capabilities</span>
            </h1>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto font-medium text-lg leading-relaxed whitespace-normal">
              We've engineered a suite of customer-centric utilities designed to streamline your premium acquisition flow.
            </p>
          </div>
  
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <IoRocketSharp className="w-12 h-12" />, 
                title: "Sonic Logistic", 
                desc: "Accelerated global delivery network. Free priority transit on all acquisitions exceeding $50.", 
                cta: "Transit Network" 
              },
              { 
                icon: <IoHeadset className="w-12 h-12" />, 
                title: "24/7 Core Support", 
                desc: "Direct access to our dedicated experts. Available around the clock to ensure absolute satisfaction.", 
                cta: "Access Support" 
              },
              { 
                icon: <IoRepeat className="w-12 h-12" />, 
                title: "Fluid Returns", 
                desc: "Our zero-friction return protocol. 30-day window for seamless product reclamation.", 
                cta: "Return Protocol" 
              }
            ].map((service, i) => (
              <div key={i} className="glass-panel group rounded-[3rem] p-10 border border-white/5 hover:border-indigo-500/20 transition-all duration-700 text-center flex flex-col items-center bg-white/[0.02] animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform shadow-2xl shadow-indigo-500/10 ring-1 ring-white/5">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">
                  {service.title}
                </h2>
                <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-auto">
                    <button className="px-8 py-3 glass border border-white/10 text-white font-black rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-[10px] italic active:scale-95">
                      {service.cta}
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Service;

