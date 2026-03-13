import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../../components/common/ItemNotFound";
import Token from "../../../utils/Token";
import FetchcartData from "../../../utils/CartData";
import { useCart } from "../../../context/CartContext";
import { api } from "../../../utils/api";
import Layout from "../../layout/Layout";
import CartLoader from "../../components/common/Loader/CartLoader";
import { FaTrash, FaShoppingBasket, FaArrowRight, FaLock } from "react-icons/fa";

export function Cart() {
  const token = Token();
  const { setcart } = useCart();
  const [productsdata, setProductData] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartloader, setCartLoader] = useState(true);

  const getcartProduct = async () => {
    setCartLoader(true); // Ensure CartLoader is set to true at the start
    try {
      const data = await FetchcartData(token);
      const subtotal = data?.cart?.products?.reduce((accumulator, product) => {
        return (accumulator +=
          product?.product?.pricediscount * product.quantity);
      }, 0);
      setTotal(subtotal);
      setProductData(data?.cart?.products);
      setcart(data?.cart?.products?.length);
    } catch (error) {
      console.log(error);
    } finally {
      setCartLoader(false); // Ensure CartLoader is set to false regardless of success or failure
    }
  };

  useEffect(() => {
    if (token?.token) {
      getcartProduct();
    } else {
      setCartLoader(false);
    }
    // eslint-disable-next-line
  }, [token?.token]);

  const filterCart = async (productid, quantity) => {
    try {
      await fetch(`${api}/api/v1/cart/filtercart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
        body: JSON.stringify({ pid: productid, nquantity: quantity }),
      });
      getcartProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Your Cart - SwiftPick">
      <div className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Shopping Cart</h1>
            {productsdata?.length > 0 && (
              <span className="glass px-4 py-2 rounded-full text-indigo-400 font-bold text-sm">
                {productsdata.length} Items
              </span>
            )}
          </div>

          {!token?.token ? (
            <div className="glass-panel py-20 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center animate-fade-in text-center max-w-2xl mx-auto mt-10">
              <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6 text-indigo-500">
                <FaLock className="text-3xl" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">Please Log In</h2>
              <p className="text-slate-500 mb-10 max-w-md">You need to be logged in to view your shopping cart and complete your purchase.</p>
              <Link
                to="/login"
                className="px-10 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95 uppercase tracking-widest text-sm"
              >
                Log in to Account
              </Link>
            </div>
          ) : cartloader ? (
            <CartLoader />
          ) : productsdata?.length === 0 ? (
            <div className="glass-panel py-20 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center animate-fade-in text-center max-w-2xl mx-auto mt-10">
              <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6 text-slate-700">
                <FaShoppingBasket className="text-4xl" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">Cart is Empty</h2>
              <NotFound empty="Your basket is feeling a bit light." redirect="Start Shopping" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Product List */}
              <div className="lg:col-span-8 space-y-6">
                {productsdata?.map((products, id) => (
                  <div key={id} className="glass-panel group rounded-[2.5rem] p-6 border border-white/5 hover:border-indigo-500/20 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${id * 100}ms` }}>
                    <div className="flex flex-col sm:flex-row gap-8 items-center">
                      {/* Product Image */}
                      <div className="w-40 h-40 bg-slate-900/50 rounded-3xl p-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 overflow-hidden relative">
                        <img
                          src={products.product?.thumbnail[0]}
                          alt={products.product?.name}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 w-full text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">
                            {products.product?.name}
                          </h3>
                          <span className="text-2xl font-black text-indigo-400 leading-none">
                            ${(products.product?.pricediscount * products.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <p className="text-slate-500 mt-2 text-sm line-clamp-1 font-bold">
                          Premium Quality E-commerce Item
                        </p>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 mt-8">
                          <div className="flex items-center gap-4 glass bg-white/5 rounded-2xl px-4 py-2 border border-white/5">
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Qty</span>
                            <select
                              value={products.quantity || 1}
                              onChange={(e) => filterCart(products._id, parseInt(e.target.value))}
                              className="bg-transparent text-white font-bold outline-none cursor-pointer"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                                <option key={qty} value={qty} className="bg-slate-900">
                                  {qty}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            onClick={() => filterCart(products.product._id)}
                            className="flex items-center gap-2 text-slate-500 hover:text-red-400 font-black text-xs uppercase tracking-widest transition-colors"
                          >
                            <FaTrash className="text-sm" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 sticky top-28">
                <div className="glass-panel rounded-[3rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[100px] rounded-full" />
                  
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8 pb-4 border-b border-white/5">Order Summary</h2>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between text-slate-400 font-bold uppercase tracking-widest text-xs">
                      <span>Subtotal</span>
                      <span className="text-white">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 font-bold uppercase tracking-widest text-xs">
                      <span>Shipping</span>
                      <span className="text-emerald-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-slate-400 font-bold uppercase tracking-widest text-xs">
                      <span>Estimated Tax</span>
                      <span className="text-white">$0.00</span>
                    </div>
                    
                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                      <span className="text-xl font-black text-white uppercase italic tracking-tighter">Total</span>
                      <span className="text-4xl font-black text-indigo-400">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="w-full py-5 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/40 active:scale-95 text-lg flex items-center justify-center gap-3 uppercase tracking-widest"
                  >
                    Checkout Now <FaArrowRight className="text-sm" />
                  </Link>

                  <Link to="/" className="block text-center mt-6 text-slate-500 hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

