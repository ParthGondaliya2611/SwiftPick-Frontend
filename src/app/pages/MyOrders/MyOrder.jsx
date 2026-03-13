import React, { useEffect, useState } from "react";
import Token from "../../../utils/Token";
import { toast } from "react-toastify";
import NotFound from "../../components/common/ItemNotFound";
import { api } from "../../../utils/api";
import Layout from "../../layout/Layout";
import { FaBoxOpen, FaCalendarAlt, FaShippingFast, FaTimesCircle } from "react-icons/fa";

const MyOrder = () => {
  const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Token();

  const cancelorder = async (pid) => {
    try {
      const res = await fetch(
        `${api}/api/v1/Order/cancelorder`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
          body: JSON.stringify({ orderId: pid }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Order cancelled");
        getorders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getorders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${api}/api/v1/Order/getorder`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
        }
      );

      const data = await response.json();
      setorderData(data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token.token) {
      getorders();
    }
    // eslint-disable-next-line
  }, [token.token]);

  return (
    <Layout title="My Orders - SwiftPick">
      <div className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Order History</h1>
              <p className="text-slate-500 mt-2">Manage and track your recent purchases</p>
            </div>
          </div>

          <div className="space-y-8">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden animate-pulse">
                  <div className="bg-white/5 px-8 py-6 flex justify-between gap-6">
                    <div className="flex gap-6">
                      <div className="space-y-2">
                        <div className="h-2 w-16 bg-white/10 rounded" />
                        <div className="h-4 w-24 bg-white/20 rounded" />
                      </div>
                      <div className="h-10 w-px bg-white/10" />
                      <div className="space-y-2">
                        <div className="h-2 w-16 bg-white/10 rounded" />
                        <div className="h-4 w-32 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="h-10 w-24 bg-white/20 rounded-xl" />
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex gap-6 items-center">
                       <div className="w-24 h-24 bg-white/10 rounded-2xl" />
                       <div className="flex-1 space-y-3">
                          <div className="h-4 w-1/2 bg-white/10 rounded" />
                          <div className="h-3 w-1/4 bg-white/10 rounded" />
                       </div>
                    </div>
                  </div>
                </div>
              ))
            ) : orderData.length === 0 ? (
              <div className="glass-panel py-20 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6 text-slate-700">
                  <FaBoxOpen className="text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">No Orders Found</h2>
                <NotFound empty="It seems you haven't placed any orders yet." redirect="Start Shopping" />
              </div>
            ) : (
              orderData.map((order, index) => (
                <div key={index} className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden animate-fade-in-up shadow-xl hover:border-indigo-500/20 transition-all group" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Order Header */}
                  <div className="bg-white/5 px-8 py-6 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-slate-500 text-xs font-black uppercase tracking-widest block mb-1">Order Status</span>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full animate-pulse ${order.status === 'Pending' ? 'bg-amber-400' : 'bg-red-500'}`} />
                          <span className={`text-sm font-black uppercase tracking-wider ${order.status === 'Pending' ? 'text-amber-400' : 'text-red-500'}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="h-10 w-px bg-white/10 hidden sm:block" />
                      <div>
                        <span className="text-slate-500 text-xs font-black uppercase tracking-widest block mb-1">Payment</span>
                        <span className="text-sm text-slate-200 font-bold">
                          {order.paymentMethod === 'card' ? 'Visa •••• 4242' : 'Cash on Delivery'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {order.status === "Pending" && (
                        <button
                          onClick={() => cancelorder(order._id)}
                          className="px-6 py-2.5 rounded-xl glass border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-bold flex items-center gap-2"
                        >
                          <FaTimesCircle /> Cancel Order
                        </button>
                      )}
                      <div className="text-right">
                        <span className="text-slate-500 text-xs font-black uppercase tracking-widest block mb-1">Total Amount</span>
                        <span className="text-xl font-black text-white">$ {order?.products?.reduce((acc, p) => acc + (p?.product?.pricediscount * p.quantity), 0) || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Products */}
                      <div className="lg:col-span-8 space-y-4">
                        {order?.products?.map((product, pId) => (
                          <div key={pId} className="flex items-center gap-6 glass p-4 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="w-24 h-24 bg-slate-900 rounded-2xl p-2 flex-shrink-0">
                              <img
                                src={product?.product?.thumbnail[0]}
                                alt={product?.product?.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-black text-lg uppercase tracking-tight line-clamp-1">{product.product?.name}</h3>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-indigo-400 font-black text-lg">${product?.product?.pricediscount}</span>
                                <span className="text-slate-500 font-bold text-sm">Quantity: {product.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Address */}
                      <div className="lg:col-span-4 bg-indigo-500/5 rounded-3xl p-6 border border-indigo-500/10 h-fit">
                        <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                          <FaShippingFast className="text-indigo-400" /> Delivery Address
                        </h4>
                        <div className="text-slate-200 text-sm space-y-1">
                          <p className="font-black text-white text-base mb-2">
                            {order?.address?.firstname} {order?.address?.lastname}
                          </p>
                          <p className="flex items-center gap-2 hover:text-indigo-300 transition-colors cursor-pointer">
                            <span>{order?.address?.email}</span>
                          </p>
                          <p>{order?.address?.phone}</p>
                          <div className="pt-3 mt-3 border-t border-white/5">
                            <p>{order?.address?.streetAddress}</p>
                            <p>{order?.address?.city}, {order?.address?.state}</p>
                            <p className="font-bold text-slate-400">{order?.address?.postcode}, {order?.address?.country}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyOrder;
