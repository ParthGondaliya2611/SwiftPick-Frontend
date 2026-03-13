import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa";
import { PiShoppingCartDuotone } from "react-icons/pi";
import Token from "../../../utils/Token";
import StarRatings from "react-star-ratings";
import { api } from "../../../utils/api";
import Layout from "../../layout/Layout";
import ProductCard from "../../components/common/ProductCard";
import ProductDetailLoader from "../../components/common/Loader/ProductDetailLoader";

const ProductDetail = () => {
  const token = Token();
  const [Product, setProduct] = useState({});
  const { id } = useParams();
  const [SimilarProducts, setSimilarProducts] = useState([]);
  const [plus, setplus] = useState(1);
  const [similarproduct, setSimilaProductLoader] = useState(true);
  const [productloader, setProductLoader] = useState(true);
  const [mainImage, setMainImage] = useState();

  const handleplus = () => {
    if (plus < 5) setplus(plus + 1);
  };

  const handleminus = () => {
    if (plus > 1) setplus(plus - 1);
  };

  const getsingleProduct = async () => {
    setProductLoader(true);
    try {
      const res = await fetch(`${api}/api/v1/singleProducts/${id}`);
      const data = await res.json();
      if (data.Success || data.success) {
        setProduct(data.product);
        getsimilarProduct(data?.product._id, data?.product.category);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProductLoader(false);
    }
  };

  const getsimilarProduct = async (pid, cid) => {
    setSimilaProductLoader(true);
    try {
      const res = await fetch(`${api}/api/v1/similar-products/${pid}/${cid}`);
      const data = await res.json();
      if (data.success || data.Success) {
        setSimilarProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSimilaProductLoader(false);
    }
  };

  useEffect(() => {
    getsingleProduct();
    // eslint-disable-next-line
  }, [id]);

  const Addcart = async () => {
    try {
      const response = await fetch(`${api}/api/v1/cart/AddProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
        body: JSON.stringify({ productId: Product._id, quantity: plus }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Product added to cart!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Product?.thumbnail?.length) {
      setMainImage(Product?.thumbnail[0]);
    }
  }, [Product]);

  return (
    <Layout title={`${Product?.name || 'Product'} - SwiftPick`}>
      <div className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productloader ? (
            <ProductDetailLoader />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Product Images Section - Sticky Left */}
              <div className="lg:col-span-7 space-y-8 lg:sticky lg:top-28">
                <div className="glass-panel overflow-hidden rounded-[3rem] p-4 border border-white/5 animate-fade-in group bg-white/[0.02]">
                  <div className="aspect-[4/5] sm:aspect-[4/3] w-full flex items-center justify-center rounded-[2.5rem] overflow-hidden bg-slate-900/40 relative">
                    <img
                      src={mainImage}
                      alt={Product?.name}
                      className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                  </div>
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {Product?.thumbnail?.map((src, index) => (
                    <button 
                      key={index}
                      onClick={() => setMainImage(src)}
                      className={`relative flex-shrink-0 w-28 h-28 rounded-[2rem] p-3 cursor-pointer transition-all duration-500 border-2 ${
                        mainImage === src 
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
                          : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain mix-blend-lighten"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info Section */}
              <div className="lg:col-span-5 flex flex-col gap-8 animate-fade-in-up">
                <div className="glass-panel rounded-[3rem] p-10 border border-white/5 space-y-8 relative overflow-hidden bg-white/[0.03]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[120px] rounded-full -mr-20 -mt-20" />
                  
                  <div className="flex flex-col gap-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                       {Product?.brand || "SwiftPick Elite"}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-[0.95]">
                      {Product?.name}
                    </h1>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-2xl border border-white/5 bg-white/5">
                      <StarRatings
                        rating={Product.rating || 0}
                        starDimension="18px"
                        starRatedColor="#fbbf24"
                        starEmptyColor="#1e293b"
                        starSpacing="2px"
                      />
                      <span className="text-sm font-black text-white ml-1">{Product.rating}</span>
                    </div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                      Authentic Review
                    </span>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-base font-medium line-clamp-3">
                    {Product?.description}
                  </p>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-black text-white italic tracking-tighter">
                        ${Product?.pricediscount}
                      </span>
                      {Product?.price !== Product?.pricediscount && (
                        <span className="text-xl text-slate-600 line-through font-bold">
                          ${Product?.price}
                        </span>
                      )}
                    </div>
                    {Product?.price !== Product?.pricediscount && (
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg font-black text-[10px] uppercase tracking-widest">
                        Save {((1 - Product?.pricediscount / Product?.price) * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>

                  <div className="space-y-6 pt-6">
                    <div className="flex items-center justify-between gap-6">
                      <div className="space-y-3 flex-1">
                        <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Quantity</h3>
                        <div className="flex items-center glass-panel p-1.5 rounded-2xl border border-white/10 w-fit h-14">
                          <button
                            className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/10 text-indigo-400 transition-all active:scale-90"
                            onClick={handleminus}
                          >
                            <FaMinus className="text-sm" />
                          </button>
                          <span className="w-12 text-center text-xl font-black text-white italic tracking-tighter">
                            {plus}
                          </span>
                          <button
                            className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/10 text-indigo-400 transition-all active:scale-90"
                            onClick={handleplus}
                          >
                            <FaPlus className="text-sm" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                         <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Stock Status</h3>
                         <div className="h-14 flex items-center px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-emerald-400 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                               In Stock
                            </span>
                         </div>
                      </div>
                    </div>

                    <button
                      onClick={Addcart}
                      className="w-full h-16 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_rgba(99,102,241,0.25)] hover:shadow-indigo-500/50 active:scale-[0.98] text-xl uppercase italic tracking-tighter ring-4 ring-indigo-500/10"
                    >
                      <PiShoppingCartDuotone className="text-2xl" />
                      Add to cart
                    </button>
                  </div>
                </div>

                {/* Meta Benefits Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "0 0 24 24", path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Pure Quality" },
                    { icon: "0 0 24 24", path: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", label: "Free Return" },
                    { icon: "0 0 24 24", path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Fast Care" }
                  ].map((benefit, i) => (
                    <div key={i} className="glass-panel p-4 py-6 rounded-3xl border border-white/5 flex flex-col items-center text-center gap-3 bg-white/[0.015] hover:bg-white/[0.03] transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox={benefit.icon} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d={benefit.path}></path></svg>
                      </div>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{benefit.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Similar Products Section */}
          {!similarproduct && SimilarProducts?.length > 0 && (
            <div className="mt-40">
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Complete the Look</h2>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10">
                {SimilarProducts?.map((product, id) => (
                  <ProductCard product={product} key={product._id || id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
