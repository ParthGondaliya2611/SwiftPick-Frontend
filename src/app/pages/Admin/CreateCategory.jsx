import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/DashboardPannel";
import { toast } from "react-toastify";
import { api } from "../../../utils/api";
import CategoryForm from "../../components/admin/CategoryForm";
import { FaEdit, FaTrash, FaLayerGroup, FaPlusSquare } from "react-icons/fa";

const CreateCategory = () => {
  const [categories, setcategory] = useState([]);
  const [Name, setName] = useState("");
  const [id, setid] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  //create category
  const handleinput = (e) => {
    setName(e.target.value);
  };

  const handleEdit = (category) => {
    setName(category.name);
    setid(category._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = JSON.parse(localStorage.getItem("auth")).token;
    try {
      if (id) {
        const res = await fetch(
          `${api}/api/v1/category/update-category/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ name: Name }),
          }
        );
        const data = await res.json();
        if (data.success) {
          toast.success("Category updated successfully");
          getAllCategory();
          setName("");
          setid("");
        } else {
          toast.error(data.message || "Failed to update");
        }
      } else {
        const res = await fetch(
          `${api}/api/v1/category/create-category`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ name: Name }),
          }
        );
        const data = await res.json();
        if (res.ok) {
          toast.success(`${data.category.name} Category created`);
          getAllCategory();
          setName("");
        } else {
          toast.error(data.message || "Creation failed");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  //Delete category
  const DeleteCategory = async (category) => {
    if(!window.confirm("Are you sure you want to delete this category?")) return;
    setSubmitting(true);
    const token = JSON.parse(localStorage.getItem("auth")).token;

    try {
      const res = await fetch(
        `${api}/api/v1/category/delete-category/${category._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Category Deleted Successfully");
        getAllCategory();
      } else {
        toast.error(data.message || "Deletion failed");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setSubmitting(false);
    }
  };

  //get the category
  const getAllCategory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/v1/category/categories`);
      const data = await res.json();
      setcategory(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title="Dashboard - Create Category">
      <div className="min-h-screen bg-slate-950 text-white pb-20 pt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AdminMenu />

          <div className="grid lg:grid-cols-12 gap-10">
            {/* FORM SECTION */}
            <div className="lg:col-span-5 animate-fade-in">
              <div className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-white/[0.03]">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <FaLayerGroup className="text-xl" />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">
                    {id ? "Refine Sphere" : "Forge Domain"}
                  </h3>
                </div>
                
                <CategoryForm
                  value={Name}
                  handleinput={handleinput}
                  handleSubmit={handleSubmit}
                  id={id}
                />
              </div>
            </div>

            {/* LIST SECTION */}
            <div className="lg:col-span-7 animate-fade-in-up">
              <div className="glass-panel rounded-[3rem] border border-white/5 bg-white/[0.02] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <FaPlusSquare />
                    </div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Class Hierarchy</h3>
                  </div>
                  <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {categories?.length || 0} Domains
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Category Identity</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        [...Array(5)].map((_, i) => (
                           <tr key={i} className="animate-pulse">
                              <td className="px-10 py-6">
                                 <div className="flex gap-4 items-center">
                                    <div className="w-2 h-2 rounded-full bg-white/10" />
                                    <div className="h-6 w-32 bg-white/10 rounded" />
                                 </div>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <div className="flex justify-end gap-3">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl" />
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl" />
                                 </div>
                              </td>
                           </tr>
                        ))
                      ) : categories?.map((category) => (
                        <tr key={category._id} className="border-b border-white/[0.02] hover:bg-white/[0.03] transition-all group">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                              <p className="font-black text-white italic uppercase tracking-tighter text-lg">{category.name}</p>
                            </div>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                              <button
                                onClick={() => handleEdit(category)}
                                className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all border border-indigo-500/20"
                                disabled={submitting}
                              >
                                <FaEdit className="text-lg" />
                              </button>
                              <button
                                onClick={() => DeleteCategory(category)}
                                className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                disabled={submitting}
                              >
                                <FaTrash className="text-lg" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {(!categories || categories.length === 0) && (
                    <div className="p-20 text-center">
                      <p className="text-slate-500 font-black uppercase italic tracking-widest">No Domains Found In Current Reality</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
