import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/DashboardPannel";
import { toast } from "react-toastify";
import { api } from "../../../utils/api";
import ProductForm from "../../components/admin/ProductForm";
import { FaEdit, FaTrash, FaBoxOpen, FaLayerGroup } from "react-icons/fa";

const CreateProduct = () => {
  const [Product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    pricediscount: "",
    thumbnail: "",
    brand: "",
    category: "",
    rating: "",
    stock: "",
  });
  const [id, setid] = useState();
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState([]);

  const itemsPerPage = 10;

  const handleEdit = (product) => {
    setid(product._id);
    setProduct(product);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleinput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setProduct({ ...Product, [name]: value });
  };

  const handlefile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/v1/products`);
      const data = await response.json();
      setproducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createproduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("thumbnail", file); 
    });
    formData.append("name", Product.name);
    formData.append("description", Product.description);
    formData.append("price", Product.price);
    formData.append("pricediscount", Product.pricediscount);
    formData.append("brand", Product.brand);
    formData.append("category", Product.category);
    formData.append("rating", Product.rating);
    formData.append("stock", Product.stock);
    const token = JSON.parse(localStorage.getItem("auth")).token;

    try {
      if (id) {
        const res = await fetch(`${api}/api/v1/update-product/${id}`, {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          toast.success("Product Updated Successfully");
          setProduct("");
          setid("");
          getProducts();
        } else {
          toast.error("Failed to Update Product");
        }
      } else {
        const response = await fetch(`${api}/api/v1/create-product`, {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          toast.success("Product Created Successfully");
          getProducts();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (product) => {
    if(!window.confirm("Are you sure you want to delete this product?")) return;
    setSubmitting(true);
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;
      const res = await fetch(`${api}/api/v1/delete-product/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Product deleted Successfully");
        getProducts();
      } else {
        toast.error("Failed to delete Product");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout description="Dashboard-Create Product">
      <div className="min-h-screen bg-slate-950 text-white pb-20 pt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AdminMenu />

          <div className="grid lg:grid-cols-12 gap-10">
            {/* FORM SECTION */}
            <div className="lg:col-span-5 animate-fade-in">
              <div className="glass-panel p-8 rounded-[3rem] border border-white/5 bg-white/[0.03]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <FaBoxOpen />
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                   {id ? "Update Essence" : "Infuse New Product"}
                  </h3>
                </div>
                <ProductForm
                  data={Product}
                  handleinput={handleinput}
                  createproduct={createproduct}
                  handlefile={handlefile}
                  id={id}
                />
              </div>
            </div>

            {/* PRODUCT LIST SECTION */}
            <div className="lg:col-span-7 animate-fade-in-up">
              <div className="glass-panel rounded-[3rem] border border-white/5 bg-white/[0.02] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <FaLayerGroup />
                    </div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Inventory Matrix</h3>
                  </div>
                  <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {products.length} Units Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Product Info</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Price Dynamics</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        [...Array(5)].map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            <td className="px-8 py-6">
                              <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl" />
                                <div className="space-y-2">
                                  <div className="h-4 w-32 bg-white/10 rounded" />
                                  <div className="h-2 w-16 bg-white/5 rounded" />
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                               <div className="h-6 w-16 bg-white/10 rounded" />
                            </td>
                            <td className="px-8 py-6 text-right">
                               <div className="flex justify-end gap-3">
                                  <div className="w-10 h-10 bg-white/5 rounded-xl" />
                                  <div className="w-10 h-10 bg-white/5 rounded-xl" />
                               </div>
                            </td>
                          </tr>
                        ))
                      ) : displayedProducts.map((product) => (
                        <tr key={product._id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-all group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 overflow-hidden p-2">
                                <img src={product.thumbnail[0]} alt="" className="w-full h-full object-contain mix-blend-lighten" />
                              </div>
                              <div>
                                <p className="font-black text-white italic uppercase tracking-tighter">{product.name}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{product.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="text-white font-black italic tracking-tighter uppercase text-lg">${product.pricediscount}</span>
                              <span className="text-slate-600 font-bold text-xs line-through">${product.price}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                              <button
                                onClick={() => handleEdit(product)}
                                className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all border border-indigo-500/20"
                                disabled={submitting}
                              >
                                <FaEdit className="text-xs" />
                              </button>
                              <button
                                onClick={() => deleteProduct(product)}
                                className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                disabled={submitting}
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION */}
                <div className="p-8 border-t border-white/5 flex justify-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all border ${
                        currentPage === index + 1
                          ? "bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                          : "bg-white/5 text-slate-500 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

