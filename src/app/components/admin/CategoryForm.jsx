import React from "react";
import { FaLayerGroup, FaPlusSquare } from "react-icons/fa";

const CategoryForm = ({ handleSubmit, handleinput, value, id }) => {
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
            Category Name
          </label>
          <div className="relative group flex items-center gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-colors">
                <FaLayerGroup className="text-sm" />
              </div>
              <input
                type="text"
                name="name"
                value={value}
                onChange={handleinput}
                placeholder="Elite Collection"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                required
              />
            </div>
            
            <button
              type="submit"
              className="h-[60px] px-8 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-[0_10px_30px_rgba(99,102,241,0.2)] active:scale-[0.98] flex items-center gap-3 uppercase italic tracking-tighter"
            >
              <FaPlusSquare className="text-lg" />
              <span>{id ? "Sync" : "Forge"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
