import React from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { FaTag, FaFileAlt, FaDollarSign, FaHashtag, FaStar, FaBox } from "react-icons/fa";

const ProductForm = ({ data, handleinput, createproduct, id, handlefile }) => {
  const InputGroup = ({ label, name, type, value, placeholder, icon: Icon, step }) => (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-colors">
          <Icon className="text-sm" />
        </div>
        <input
          name={name}
          required
          type={type}
          step={step}
          onChange={handleinput}
          value={value}
          placeholder={placeholder}
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <form className="space-y-8" onSubmit={createproduct}>
        <InputGroup 
          label="Product Name" 
          name="name" 
          type="text" 
          value={data.name} 
          placeholder="Astro Edition X1" 
          icon={FaTag} 
        />
        
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Description</label>
          <div className="relative group">
            <div className="absolute top-4 left-5 pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-colors">
              <FaFileAlt className="text-sm" />
            </div>
            <textarea
              name="description"
              required
              rows="4"
              onChange={handleinput}
              value={data.description}
              placeholder="Detail the essence of this product..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-3xl py-4 pl-12 pr-6 text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <InputGroup 
            label="Base Price" 
            name="price" 
            type="number" 
            value={data.price} 
            placeholder="0.00" 
            icon={FaDollarSign} 
          />
          <InputGroup 
            label="Discounted Price" 
            name="pricediscount" 
            type="number" 
            value={data.pricediscount} 
            placeholder="0.00" 
            icon={FaDollarSign} 
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <InputGroup 
            label="Brand Entity" 
            name="brand" 
            type="text" 
            value={data.brand} 
            placeholder="SwiftPick" 
            icon={FaHashtag} 
          />
          <InputGroup 
            label="Category Matrix" 
            name="category" 
            type="text" 
            value={data.category} 
            placeholder="Elite" 
            icon={FaBox} 
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <InputGroup 
            label="Initial Rating" 
            name="rating" 
            type="number" 
            step="0.1"
            value={data.rating} 
            placeholder="4.5" 
            icon={FaStar} 
          />
          <InputGroup 
            label="Inventory Stock" 
            name="stock" 
            type="number" 
            value={data.stock} 
            placeholder="100" 
            icon={FaBox} 
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Visual Assets</label>
          <div className="flex items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.03] hover:border-indigo-500/30 transition-all group relative cursor-pointer">
            <input
              type="file"
              name="thumbnail"
              onChange={handlefile}
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <IoCloudUploadSharp className="text-3xl" />
              </div>
              <p className="text-sm font-black text-white uppercase italic tracking-tighter">Upload High-Res Textures</p>
              <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mt-2">Drag & Drop or Tap and Select</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-6 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-[2rem] flex items-center justify-center gap-4 transition-all shadow-[0_20px_50px_rgba(99,102,241,0.3)] active:scale-[0.98] text-2xl italic tracking-tighter uppercase"
        >
          {id ? "Sync Changes" : "Forge Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;


