import React from "react";
import { FaTrash, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";

const AddressData = ({ Address, isChecked, handledetail, deleteAddress }) => {
  return (
    <div 
      className={`relative group transition-all duration-500 rounded-[2rem] border overflow-hidden ${
        isChecked 
        ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_40px_rgba(99,102,241,0.1)]" 
        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
      }`}
    >
      <label className="flex items-start p-8 cursor-pointer w-full">
        <input
          id={`Address-${Address._id}`}
          name="Address"
          type="radio"
          checked={isChecked}
          onChange={() => handledetail(Address)}
          className="sr-only"
        />
        
        <div className="flex-1 flex gap-6">
          <div className={`mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isChecked ? "border-indigo-500 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "border-slate-700 bg-transparent"
          }`}>
            {isChecked && <div className="h-2 w-2 rounded-full bg-white animate-pulse" />}
          </div>

          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <FaUser className="text-indigo-400 text-xs" />
              <p className="text-xl font-black text-white italic tracking-tighter uppercase">
                {Address.firstname} {Address.lastname}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-slate-500 text-sm mt-1" />
                <div className="text-slate-400 font-medium leading-relaxed">
                  <p>{Address.streetAddress}</p>
                  <p>{Address.city}, {Address.state} {Address.postcode}</p>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mt-1">{Address.country}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <FaPhone className="text-slate-500 text-sm" />
                <p className="text-slate-400 font-bold">{Address.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </label>

      {/* Delete Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          deleteAddress(Address._id, e);
        }}
        className="absolute top-6 right-6 p-4 rounded-2xl bg-white/5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all active:scale-90 border border-transparent hover:border-red-500/20"
      >
        <FaTrash className="text-sm" />
      </button>

      {/* Glass Glow */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};

export default AddressData;
