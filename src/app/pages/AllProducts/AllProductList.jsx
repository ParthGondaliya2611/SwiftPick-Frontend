import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Drawer from "@mui/material/Drawer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/common/ProductCard";
import { FormControl, MenuItem, Select, ThemeProvider, createTheme } from "@mui/material";
import { api } from "../../../utils/api";
import { Prices } from "../../data/PricesFilterData";
import Layout from "../../layout/Layout";

// Dark theme for MUI components
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    background: {
      paper: '#0f172a',
    },
  },
});

const AllProductList = () => {
  const [products, setproducts] = useState([]);
  const [category, setcategory] = useState();
  const [pricefilter, setPriceFilter] = useState([]);
  const [categoryfilter, setCategoryFilter] = useState([]);
  const [sortValue, setSortValue] = useState("Select...");
  const [priceischecked, setPriceIsCheked] = useState("");
  const [producttotal, setProductTotal] = useState(0);
  const [page, setpage] = useState(1);
  const [perpage] = useState(20);
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [productloader, setProductLoader] = useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCategoryFilter = (ischecked, name) => {
    let selectedCategory = [...categoryfilter];
    if (ischecked) {
      selectedCategory.push(name);
    } else {
      selectedCategory = selectedCategory.filter((c) => c !== name);
    }
    setCategoryFilter(selectedCategory);
    filterProducts(selectedCategory, pricefilter);
  };

  useEffect(() => {
    if (slug !== "all") {
      handleCategoryFilter(true, slug);
    }
    // eslint-disable-next-line
  }, []);

  const handlePricesFilter = (ischecked, name) => {
    setPriceIsCheked(name);
    if (priceischecked === name) {
      setPriceIsCheked(null);
    } else {
      setPriceIsCheked(name);
    }

    let selectedPrice = [...pricefilter];
    if (ischecked) {
      selectedPrice.push(name);
    } else {
      selectedPrice = selectedPrice.filter((c) => c !== name);
    }
    setPriceFilter(selectedPrice);
    filterProducts(categoryfilter, selectedPrice);
  };

  const Categories = async () => {
    try {
      const res = await fetch(`${api}/api/v1/category/categories`);
      const data = await res.json();
      setcategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Categories();
  }, []);

  const handlePreviousPage = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(producttotal / perpage)) {
      setpage(page + 1);
    }
  };

  const handlePageClick = (pageNum) => {
    setpage(pageNum);
  };

  const getRange = () => {
    const start = (page - 1) * perpage + 1;
    const end = Math.min(page * perpage, producttotal);
    return { start, end };
  };

  const { start, end } = getRange();

  const filterProducts = async (
    selectedCategories = categoryfilter,
    selectedPrices = pricefilter
  ) => {
    setProductLoader(true);
    try {
      const res = await fetch(
        `${api}/api/v1/products?checked=${selectedCategories}&filters=${selectedPrices}&perpage=${perpage}&page=${page}`
      );
      const data = await res.json();
      setproducts(data.products || []);
      setProductTotal(data.count || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setProductLoader(false);
    }
  };

  useEffect(() => {
    filterProducts(categoryfilter, pricefilter);
    // eslint-disable-next-line
  }, [categoryfilter, pricefilter, page]);

  const sorting = (e) => {
    const sortType = e.target.value;
    setSortValue(sortType);
    let sortedProducts = [...products];

    if (sortType === "priceHighToLow") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === "priceLowToHigh") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "nameAToZ") {
      sortedProducts = sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortType === "nameZToA") {
      sortedProducts = sortedProducts.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    setproducts(sortedProducts);
  };

  return (
    <Layout title="All-Products SwiftPick">
      <div className="min-h-screen bg-slate-950 pb-20 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden md:block w-64 flex-shrink-0 group">
              <div className="glass-panel rounded-3xl p-6 sticky top-28 space-y-8 border border-white/5 group-hover:border-indigo-500/20 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <FilterAltIcon className="text-indigo-400" /> Filters
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Price Filter */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Price Range</h4>
                      <div className="space-y-3">
                        {Prices.map((option, id) => (
                          <label key={option.name} className="flex items-center group/item cursor-pointer">
                            <input
                              type="checkbox"
                              className="h-5 w-5 rounded-lg border-white/10 bg-white/5 text-indigo-600 focus:ring-offset-slate-950 focus:ring-indigo-500 transition-all cursor-pointer"
                              checked={option.value === priceischecked}
                              onChange={(e) => handlePricesFilter(e.target.checked, option.value)}
                            />
                            <span className="ml-3 text-slate-300 group-hover/item:text-white transition-colors">
                              {option.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Categories</h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {category?.map((option, id) => (
                          <label key={id} className="flex items-center group/item cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={option.name === slug}
                              onChange={(e) => handleCategoryFilter(e.target.checked, option.name)}
                              className="h-5 w-5 rounded-lg border-white/10 bg-white/5 text-indigo-600 focus:ring-offset-slate-950 focus:ring-indigo-500 transition-all cursor-pointer"
                            />
                            <span className="ml-3 text-slate-300 group-hover/item:text-white transition-colors">
                              {option.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 glass-panel rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleDrawer(true)}
                    className="md:hidden flex items-center gap-2 glass px-4 py-2 rounded-xl text-slate-300 hover:text-white transition-colors"
                  >
                    <FilterAltIcon /> <span>Filters</span>
                  </button>
                  <p className="text-sm text-slate-400">
                    Showing <span className="text-white font-bold">{start}-{end}</span> of <span className="text-white font-bold">{producttotal}</span> items
                  </p>
                </div>

                <ThemeProvider theme={darkTheme}>
                  <FormControl size="small" className="w-full sm:w-48">
                    <Select
                      value={sortValue}
                      onChange={sorting}
                      className="glass rounded-xl border-none outline-none"
                      sx={{
                        '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        color: 'white',
                      }}
                    >
                      <MenuItem value="Select...">Sort By: Default</MenuItem>
                      <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                      <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                      <MenuItem value="nameAToZ">Name: A to Z</MenuItem>
                      <MenuItem value="nameZToA">Name: Z to A</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>
              </div>

              {/* Product Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${products.length === 0 ? 'min-h-[400px] flex items-center justify-center' : ''}`}>
                {products.length === 0 && !productloader ? (
                  <div className="col-span-full text-center py-20 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                      <FilterAltIcon className="text-4xl text-slate-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Products Found</h2>
                    <p className="text-slate-400">Try adjusting your filters or search criteria.</p>
                  </div>
                ) : (
                  <>
                    {products?.map((product, id) => (
                      productloader ? (
                        <div key={id} className="glass-card rounded-2xl p-4 h-[450px] animate-pulse">
                          <div className="bg-white/5 rounded-xl h-56 mb-4" />
                          <div className="h-6 bg-white/5 rounded w-3/4 mb-2" />
                          <div className="h-4 bg-white/5 rounded w-full mb-1" />
                          <div className="h-4 bg-white/5 rounded w-full mb-4" />
                          <div className="mt-auto flex justify-between">
                            <div className="h-8 bg-white/5 rounded w-1/3" />
                            <div className="h-6 bg-white/5 rounded w-1/4" />
                          </div>
                        </div>
                      ) : (
                        <ProductCard product={product} key={product._id || id} />
                      )
                    ))}
                  </>
                )}
              </div>

              {/* Pagination */}
              {producttotal > perpage && (
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex items-center gap-1 p-1 glass-panel rounded-2xl border border-white/5">
                    <button
                      onClick={handlePreviousPage}
                      className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                      disabled={page === 1}
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    
                    <div className="flex items-center gap-1 px-4">
                      {[...Array(Math.ceil(producttotal / perpage)).keys()].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageClick(index + 1)}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                            page === index + 1
                              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                              : "text-slate-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleNextPage}
                      className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                      disabled={page === Math.ceil(producttotal / perpage)}
                    >
                      <ChevronRightIcon className="h-6 w-6" />
                    </button>
                  </nav>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              backgroundColor: '#0f172a',
              backgroundImage: 'none',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              padding: '24px',
              color: 'white'
            }
          }}
        >
          <div className="space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FilterAltIcon className="text-indigo-400" /> Filter Items
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase mb-4">Price Range</h4>
                <div className="space-y-3">
                  {Prices.map((option, id) => (
                    <label key={option.name} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={option.value === priceischecked}
                        onChange={(e) => handlePricesFilter(e.target.checked, option.value)}
                        className="h-6 w-6 rounded-lg bg-white/5 border-white/10 text-indigo-500 focus:ring-indigo-500"
                      />
                      <span>{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase mb-4">Categories</h4>
                <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                  {category?.map((option, id) => (
                    <label key={id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked={option.name === slug}
                        onChange={(e) => handleCategoryFilter(e.target.checked, option.name)}
                        className="h-6 w-6 rounded-lg bg-white/5 border-white/10 text-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="truncate">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={toggleDrawer(false)}
              className="w-full py-4 bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-transform"
            >
              Apply Filters
            </button>
          </div>
        </Drawer>
      </div>
    </Layout>
  );
};

export default AllProductList;
