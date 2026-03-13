import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaCity } from "react-icons/fa";

const CreateAddressForm = ({ handleinput, handlecountry, Address }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
      <div className="sm:col-span-3">
        <label htmlFor="first-name" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          First Name
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <FaUser className="text-sm" />
          </div>
          <input
            id="first-name"
            name="firstname"
            type="text"
            onChange={handleinput}
            value={Address.firstname}
            autoComplete="given-name"
            placeholder="John"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="last-name" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          Last Name
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <FaUser className="text-sm" />
          </div>
          <input
            id="last-name"
            name="lastname"
            type="text"
            onChange={handleinput}
            value={Address.lastname}
            autoComplete="family-name"
            placeholder="Doe"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="email" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <FaEnvelope className="text-sm" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleinput}
            value={Address.email}
            autoComplete="email"
            placeholder="john@example.com"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="phone" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          Phone Number
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <FaPhone className="text-sm" />
          </div>
          <input
            id="phone"
            name="phone"
            type="number"
            onChange={handleinput}
            value={Address.phone}
            autoComplete="phone"
            placeholder="1234567890"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="street-address" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          Street Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <FaMapMarkerAlt className="text-sm" />
          </div>
          <input
            id="street-address"
            name="streetAddress"
            type="text"
            onChange={handleinput}
            value={Address.streetAddress}
            autoComplete="street-address"
            placeholder="123 Luxury Lane"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="country" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          Country
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <FaGlobe className="text-sm" />
          </div>
          <select
            id="country"
            name="country"
            onChange={(e) => handlecountry(e)}
            value={Address.country}
            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold appearance-none cursor-pointer"
          >
            <option className="bg-slate-900">United States</option>
            <option className="bg-slate-900">Canada</option>
            <option className="bg-slate-900">United Kingdom</option>
            <option className="bg-slate-900">India</option>
            <option className="bg-slate-900">Germany</option>
            <option className="bg-slate-900">France</option>
            {/* ... other options can be added here or mapped ... */}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="city" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          City
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <FaCity className="text-sm" />
          </div>
          <input
            id="city"
            name="city"
            type="text"
            onChange={handleinput}
            value={Address.city}
            autoComplete="address-level2"
            placeholder="New York"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="state" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          State / Province
        </label>
        <input
          id="state"
          name="state"
          type="text"
          onChange={handleinput}
          value={Address.state}
          autoComplete="address-level1"
          placeholder="New York"
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
        />
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="postcode" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1 mb-2">
          ZIP / Postal Code
        </label>
        <input
          id="postcode"
          name="postcode"
          type="text"
          onChange={handleinput}
          value={Address.postcode}
          autoComplete="postcode"
          placeholder="10001"
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
        />
      </div>
    </div>
  );
};

export default CreateAddressForm;


