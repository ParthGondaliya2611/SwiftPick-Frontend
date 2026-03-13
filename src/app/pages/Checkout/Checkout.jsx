import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FetchcartData from "../../../utils/CartData";
import Token from "../../../utils/Token";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { api } from "../../../utils/api";
import Layout from "../../layout/Layout";
import CreateAddressForm from "../../components/address/CreateAddressForm";
import AddressData from "../../components/address/AddressCard";
import CartLoader from "../../components/common/Loader/CartLoader";
import { FaAddressCard, FaCreditCard, FaMoneyBillWave, FaShoppingBag } from "react-icons/fa";

const Checkout = () => {
  const [Address, setAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    postcode: "",
    country: "india",
  });
  const token = Token();

  const [Addressdata, setAddressdata] = useState([]);
  const [productdata, setProductsData] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [total, setTotal] = useState(0);
  const [paymentmethod, setPaymentMethod] = useState("cash");
  const [checkoutloader, setCheckoutLoader] = useState(true);

  const getcartproduct = async () => {
    setCheckoutLoader(true);
    try {
      const data = await FetchcartData(token);
      setProductsData(data?.cart?.products);

      const subtotal = data.cart.products.reduce((accumulator, product) => {
        return (accumulator +=
          product?.product?.pricediscount * product.quantity);
      }, 0);
      setTotal(subtotal);
    } catch (error) {
      console.log(error);
    } finally {
      setCheckoutLoader(false);
    }
  };

  useEffect(() => {
    getcartproduct();
    // eslint-disable-next-line
  }, []);

  const handleinput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddress({ ...Address, [name]: value });
  };

  const handlecountry = (e) => {
    const selectedcountry = e.target.value;
    setAddress((prev) => {
      return {
        ...prev,
        country: selectedcountry,
      };
    });
  };

  const handledetail = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    if (Addressdata.length > 0) {
      handledetail(Addressdata[0]);
    }
  }, [Addressdata]);

  const handlepayment = (name) => {
    setPaymentMethod(name);
  };

  const createAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/api/v1/Address/newaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
        body: JSON.stringify(Address),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Address added successfully");
        getaddress();
        handleReset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getaddress = async () => {
    try {
      const res = await fetch(`${api}/api/v1/Address/getaddress`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
      });
      const data = await res.json();
      setAddressdata(data.Address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setAddress({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      postcode: "",
      country: "india",
    });
  };

  useEffect(() => {
    if (token.token) {
      getaddress();
    }
    // eslint-disable-next-line
  }, [token.token]);

  const deleteAddress = async (id, e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/api/v1/Address/deleteaddress/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
      });
      const data = await res.json();
      if (data.success) {
        getaddress();
        toast.info("Address removed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Order = async () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }
    try {
      const res = await fetch(`${api}/api/v1/Order/neworder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
        body: JSON.stringify({
          products: productdata,
          address: selectedAddress,
          paymentMethod: paymentmethod,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Order Placed Successfully");
      }
      if (paymentmethod === "card") {
        const stripe = await loadStripe(
          "pk_test_51Q0zMXIdk8DdaDV07FA0FesFbYcY5V18iSXxnnQbhRLFN3064Y0mGw53Qj4n1Zvyilu1nECnjln6c3LeOHUmdYh900GEA5s4K7"
        );
        await stripe.redirectToCheckout({
          sessionId: data?.sessionId,
        });
      }
    } catch (error) {
      console.log("Error in placing order: ", error);
    }
  };

  return (
    <Layout title="Checkout - SwiftPick">
      <div className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white mb-10 tracking-tighter uppercase italic">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Information & Address */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Personal Information Form */}
              <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 animate-fade-in-up">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <FaAddressCard className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Shipping Details</h2>
                    <p className="text-slate-500 text-sm">Where should we send your order?</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <CreateAddressForm
                    handleinput={handleinput}
                    Address={Address}
                    handlecountry={handlecountry}
                  />
                  
                  <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 rounded-xl glass text-slate-400 font-bold hover:text-white transition-all"
                    >
                      Reset
                    </button>
                    <button
                      onClick={createAddress}
                      className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                      Save New Address
                    </button>
                  </div>
                </div>
              </div>

              {/* Saved Addresses */}
              <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 animate-fade-in-up delay-100">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Select Shipping Address</h3>
                <div className="space-y-4">
                  {Addressdata.length === 0 ? (
                    <div className="text-center py-8 glass rounded-2xl border border-dashed border-white/10">
                      <p className="text-slate-500">No saved addresses found.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {Addressdata.map((address, i) => (
                        <div 
                          key={i} 
                          onClick={() => handledetail(address)}
                          className={`relative cursor-pointer transition-all duration-300 ${selectedAddress?._id === address._id ? 'scale-[1.02]' : ''}`}
                        >
                          <AddressData
                            Address={address}
                            isChecked={selectedAddress?._id === address._id}
                            handledetail={handledetail}
                            deleteAddress={deleteAddress}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 animate-fade-in-up delay-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <FaCreditCard className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Payment Method</h2>
                    <p className="text-slate-500 text-sm">Choose how you'd like to pay</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentmethod === 'cash' ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 glass hover:border-white/10'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentmethod === 'cash'}
                      onChange={() => handlepayment('cash')}
                      className="hidden"
                    />
                    <FaMoneyBillWave className={`text-2xl ${paymentmethod === 'cash' ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <div>
                      <span className={`block font-bold ${paymentmethod === 'cash' ? 'text-white' : 'text-slate-400'}`}>Cash on Delivery</span>
                      <span className="text-xs text-slate-500">Pay when you receive</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentmethod === 'card' ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 glass hover:border-white/10'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentmethod === 'card'}
                      onChange={() => handlepayment('card')}
                      className="hidden"
                    />
                    <FaCreditCard className={`text-2xl ${paymentmethod === 'card' ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <div>
                      <span className={`block font-bold ${paymentmethod === 'card' ? 'text-white' : 'text-slate-400'}`}>Online Payment</span>
                      <span className="text-xs text-slate-500">Secure Stripe payment</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Side: Order Summary */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5 animate-fade-in-up shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <FaShoppingBag className="text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Order Summary</h2>
                </div>

                {checkoutloader ? (
                  <CartLoader />
                ) : (
                  <div className="space-y-6">
                    <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                      {productdata?.map((item) => (
                        <div key={item.product?._id} className="flex gap-4 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 p-2 rounded-xl transition-colors">
                          <div className="w-20 h-20 rounded-xl overflow-hidden glass p-2 flex-shrink-0">
                            <img
                              src={item.product?.thumbnail[0]}
                              alt={item.product?.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <h4 className="text-white font-bold text-sm line-clamp-1">{item.product?.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-slate-500 text-xs font-bold">Qty: {item.quantity}</span>
                              <span className="text-indigo-400 font-black">${item.product?.pricediscount * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-6 mt-6 border-t border-white/5">
                      <div className="flex justify-between text-slate-400 font-bold">
                        <span>Subtotal</span>
                        <span>${total}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 font-bold">
                        <span>Shipping</span>
                        <span className="text-emerald-400">FREE</span>
                      </div>
                      <div className="flex justify-between items-center text-white pt-4 border-t border-white/10">
                        <span className="text-xl font-black uppercase tracking-wider">Total</span>
                        <span className="text-3xl font-black text-indigo-400">${total}</span>
                      </div>
                    </div>

                    <button
                      onClick={Order}
                      className="w-full py-5 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/40 active:scale-[0.98] mt-8 text-lg flex items-center justify-center gap-3 uppercase tracking-widest"
                    >
                      {paymentmethod === "card" ? <><FaCreditCard /> Pay & Place Order</> : <><FaShoppingBag /> Confirm Order</>}
                    </button>

                    <Link to="/" className="block text-center text-slate-500 hover:text-indigo-400 font-bold text-sm transition-colors mt-4">
                      Continue Shopping &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
