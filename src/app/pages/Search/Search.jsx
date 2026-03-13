import React from "react";
import { useSearch } from "../../../context/SearchContext";
import Layout from "../../layout/Layout";
import NotFound from "../../components/common/ItemNotFound";
import ProductCard from "../../components/common/ProductCard";
import { FaSearch, FaBoxes } from "react-icons/fa";

const Search = () => {
  const { values } = useSearch();

  return (
    <Layout title="Search Exploration - SwiftPick">
      <div className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Cinematic Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                  <FaSearch className="text-sm" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Discovery Engine v2.0
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                Exploration <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Matrix</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-xl">
                Synthesizing results for your query. Found <span className="text-white font-bold">{values?.results?.length || 0}</span> matches in current inventory.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl">
              <FaBoxes className="text-indigo-400" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Results Synced</span>
                <span className="text-white font-black italic tracking-tighter text-lg">{values?.results?.length || 0} UNITS</span>
              </div>
            </div>
          </div>

          {/* Results Grid or Empty State */}
          {values?.results?.length === 0 ? (
            <div className="glass-panel py-20 rounded-[3.5rem] border border-white/5 flex flex-col items-center justify-center animate-fade-in text-center shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
               <div className="relative z-10 max-w-2xl mx-auto px-6">
                <div className="w-24 h-24 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mb-8 mx-auto text-slate-700 shadow-inner">
                  <FaSearch className="text-4xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tighter italic">No Matches Found</h2>
                <div className="glass bg-white/5 p-8 rounded-3xl border border-white/10 mb-10">
                   <NotFound
                    empty="The matrix returned no results for your search. Try broadening your exploration parameters."
                    redirect="Back to Collections"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 animate-fade-in-up">
              {values.results?.map((product, index) => (
                <div key={index} style={{ animationDelay: `${index * 50}ms` }} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
