import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import ProductCard from "../../components/common/ProductCard";
import { api } from "../../../utils/api";
import Layout from "../../layout/Layout";
import { slides } from "../../data/HomePageData";
import { categoryphotos } from "../../data/HomePageData";
import ProductCardLoader from "../../components/common/Loader/ProductCardLoader";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [filters] = useState([]);
  const [checked] = useState([]);
  const [page] = useState(1);
  const [perpage] = useState(10);
  const [productloader, setProductLoader] = useState(true);

  const filterProducts = async () => {
    setProductLoader(true);
    try {
      const res = await fetch(
        `${api}/api/v1/products?checked=${checked}&filters=${filters}&perpage=${perpage}&page=${page}`
      );
      const data = await res.json();
      setproducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setProductLoader(false);
    }
  };

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line
  }, [checked, filters, page]);

  return (
    <Layout title="Home - SwiftPick">
      {/* Hero Carousel Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none z-10" />
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={slides?.length > 1}
          autoplay={slides?.length > 1 ? {
            delay: 4000,
            disableOnInteraction: false,
          } : false}
          pagination={slides?.length > 1 ? {
            clickable: true,
            dynamicBullets: true,
          } : false}
          navigation={slides?.length > 1}
          modules={[Pagination, Navigation, Autoplay]}
          className="home-swiper h-[400px] md:h-[600px]"
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={slide?.image}
                  alt={slide.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-8 md:px-20">
                  <div className="max-w-2xl animate-fade-in-up">
                    <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-indigo-500/30 mb-6">
                      SwiftPick Exclusive
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter italic uppercase leading-tight">
                      {slide.label || "New Collection"}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg font-medium leading-relaxed">
                      {slide.description || "Discover the latest trends in high-quality fashion and accessories. Shop now for exclusive offers."}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Link to="/products/all" className="inline-flex items-center px-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-2xl transition-all shadow-[0_20px_50px_rgba(99,102,241,0.4)] hover:shadow-indigo-500/60 active:scale-95 uppercase tracking-tighter italic text-lg">
                        Explore Collection <FaLongArrowAltRight className="ml-3" />
                      </Link>
                      <button className="px-10 py-5 glass border border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-tighter italic active:scale-95 text-lg backdrop-blur-xl shadow-2xl">
                        View Deals
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Premium Promotional / Ad Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3.5rem] p-1 border border-white/5 bg-white/[0.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />
          <div className="relative glass-panel rounded-[3.4rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-white/10 overflow-hidden">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-indigo-500/30">
                Premium Partner Sphere
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Inventory</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl font-medium">
                Join our exclusive partner network and reach millions of elite shoppers. Forge your brand's presence in the SwiftPick ecosystem today.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
                <button className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-tighter italic active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] text-lg">
                  Partner With Us
                </button>
                <button className="px-12 py-5 glass border border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-tighter italic active:scale-95 shadow-2xl backdrop-blur-xl text-lg">
                  View Analytics
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-square relative group">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-indigo-500/30 transition-all" />
              <div className="relative w-full h-full glass-panel rounded-[3rem] border border-white/10 flex items-center justify-center p-8 overflow-hidden group-hover:scale-105 transition-transform duration-700">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-3xl mx-auto mb-6 shadow-2xl shadow-indigo-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                  <p className="text-2xl font-black text-white italic uppercase tracking-tighter">Forge Reality</p>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">SwiftPick Ecosystem v2.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Bubbles Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">SHOP BY CATEGORY</h1>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categoryphotos?.map((photos, index) => (
            <Link to={`/products/${photos.label}`} key={index} className="group">
              <div className="glass-card rounded-[2.5rem] p-4 flex flex-col items-center gap-4 transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-24 h-24 rounded-full bg-slate-900/50 p-2 overflow-hidden border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                  <img
                    src={photos?.image}
                    alt={photos.label}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-slate-300 font-bold text-center group-hover:text-indigo-400 transition-colors truncate w-full px-2">
                  {photos.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight uppercase">Featured Products</h2>
              <p className="text-slate-400 mt-2">Our hand-picked selection for you</p>
            </div>
            <Link
              to="/products/all"
              className="group flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors bg-indigo-500/10 px-6 py-3 rounded-2xl border border-indigo-500/20"
            >
              See All <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {productloader ? (
              [...Array(5)].map((_, id) => (
                <ProductCardLoader key={id} />
              ))
            ) : (
              products?.slice(0, 10).map((product, id) => (
                <ProductCard product={product} key={product._id || id} />
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
