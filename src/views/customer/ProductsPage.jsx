import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES, PRODUCT_CATEGORIES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';
import { addToCart } from '../../utils/cartStorage';
import { useGetCategoriesQuery } from '../../services/category.service';
import { useGetProductsQuery } from '../../services/products.service';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  const { data: productsData, isLoading, error } = useGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data: categories } = useGetCategoriesQuery();
  const categoryList = categories?.data || [];
  
  const filterProducts = useCallback(() => {
    if (productsData?.data) {
      let result = [...productsData.data];
      
      // Filter by category
      if (category) {
        result = result.filter(product => product.category_id === parseInt(category));
      }
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(term) || 
          (product.description && product.description.toLowerCase().includes(term))
        );
      }
      
      // Filter by price range
      if (priceRange.min) {
        result = result.filter(product => parseFloat(product.price) >= Number(priceRange.min));
      }
      if (priceRange.max) {
        result = result.filter(product => parseFloat(product.price) <= Number(priceRange.max));
      }
      
      // Sort products
      if (sortOption) {
        switch (sortOption) {
          case 'price-asc':
            result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
          case 'price-desc':
            result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
          case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-desc':
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            break;
        }
      }
      
      setFilteredProducts(result);
    }
  }, [productsData, category, searchTerm, sortOption, priceRange]);
  
  useEffect(() => {
    filterProducts();
  }, [filterProducts]);
  
  const handleAddToCart = useCallback((product) => {
    console.log("product", product);
    addToCart(product, 1);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
  }, []);
  
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    // The filtering happens in the useEffect
  }, []);
  
  const handleCategoryChange = useCallback((catId) => {
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);
  
  const handlePriceRangeChange = useCallback((e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  const handleSortChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);
  
  const handleReset = useCallback(() => {
    setSearchTerm('');
    setSortOption('');
    setPriceRange({ min: '', max: '' });
    setSearchParams({});
  }, [setSearchParams]);
  
  return (
    <div className="container mx-auto px-4 pt-32 pb-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="font-semibold text-lg mb-4 text-gray-800">Danh mục</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors ${!category ? 'bg-pink-50 text-pink-600 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  Tất cả sản phẩm
                </button>
              </li>
              {categoryList.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-2 py-1.5 rounded transition-colors ${category === cat.id.toString() ? 'bg-pink-50 text-pink-600 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="font-semibold text-lg mb-4 text-gray-800">Giá</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Tối thiểu</label>
                <input
                  type="number"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceRangeChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors"
                  placeholder="VND"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Tối đa</label>
                <input
                  type="number"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceRangeChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors"
                  placeholder="VND"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <button
              onClick={handleReset}
              className="w-full bg-pink-600 text-white py-2.5 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              {/* Search form */}
              <form onSubmit={handleSearch} className="flex flex-1 max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors"
                  placeholder="Tìm kiếm sản phẩm..."
                />
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-6 py-2 rounded-r-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
              
              {/* Sort select */}
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors text-gray-700"
              >
                <option value="">Sắp xếp theo</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên: A-Z</option>
                <option value="name-desc">Tên: Z-A</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">Đã xảy ra lỗi khi tải sản phẩm.</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <p className="mb-6 text-gray-500">Hiển thị {filteredProducts.length} sản phẩm</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group"
                  >
                    <Link to={`${ROUTES.PRODUCTS}/${product.id}`} className="block relative">
                      <img
                        src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                        alt={product.name}
                        className="w-full h-auto aspect-[4/3] object-contain  transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                    
                    <div className="p-4">
                      <Link to={`${ROUTES.PRODUCTS}/${product.id}`}>
                        <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-pink-600 transition-colors line-clamp-2">{product.name}</h3>
                      </Link>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xl font-bold text-pink-600">{formatCurrency(parseFloat(product.price))}</span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-pink-600 text-white px-3 py-1.5 rounded hover:bg-pink-700 transition-colors text-sm flex items-center font-medium"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-yellow-700">Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 