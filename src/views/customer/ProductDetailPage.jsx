import { useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';
import { addToCart } from '../../utils/cartStorage';
import { useGetProductByIdQuery } from '../../services/products.service';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { data: response, isLoading, error } = useGetProductByIdQuery(id);
  const product = response?.data;
  
  const handleQuantityChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  }, []);
  
  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }, [quantity]);
  
  const increaseQuantity = useCallback(() => {
    setQuantity(prev => prev + 1);
  }, []);
  
  const handleAddToCart = useCallback(async () => {
    if (product) {
      try {
        setIsAddingToCart(true);
        addToCart(product, quantity);
        toast.success(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`, {
          duration: 2000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
      } catch (error) {
        toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng', {
          duration: 2000,
          position: 'top-center',
        });
      } finally {
        setIsAddingToCart(false);
      }
    }
  }, [product, quantity]);

  const handleBuyNow = useCallback(async () => {
    if (product) {
      try {
        setIsAddingToCart(true);
        addToCart(product, quantity);
        toast.success(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`, {
          duration: 1000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
        setTimeout(() => {
          navigate(ROUTES.CART);
        }, 1000);
      } catch (error) {
        toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng', {
          duration: 2000,
          position: 'top-center',
        });
      } finally {
        setIsAddingToCart(false);
      }
    }
  }, [product, quantity, navigate]);

  const toggleDescription = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-300 border-t-pink-600"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">Đã xảy ra lỗi khi tải thông tin sản phẩm.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">Không tìm thấy sản phẩm.</p>
                <Link to={ROUTES.PRODUCTS} className="text-sm font-medium text-yellow-700 hover:text-yellow-600 underline mt-2 inline-block">
                  Quay lại danh sách sản phẩm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to={ROUTES.HOME} className="text-gray-600 hover:text-pink-600 transition-colors">
            Trang chủ
          </Link>
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link to={ROUTES.PRODUCTS} className="text-gray-600 hover:text-pink-600 transition-colors">
            Sản phẩm
          </Link>
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image - Fixed height container */}
            <div className="relative h-[500px] overflow-hidden rounded-lg ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4 hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%236b7280" text-anchor="middle">Hình ảnh không khả dụng</text></svg>';
                }}
              />
            </div>
            
            {/* Product Info - Scrollable container if needed */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-baseline mb-6">
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-pink-600">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>
              
              {product.description && (
                <div className="prose prose-pink mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h2>
                  <div className="relative">
                    <p className={`text-gray-600 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                      {product.description}
                    </p>
                    {product.description.length > 150 && (
                      <button
                        onClick={toggleDescription}
                        className="text-pink-600 hover:text-pink-700 font-medium mt-2 flex items-center"
                      >
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                        <svg
                          className={`h-4 w-4 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {/* Product Features */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Đặc điểm nổi bật</h2>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-pink-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sản phẩm chính hãng 100%
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-pink-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Giao hàng toàn quốc
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-pink-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Đổi trả trong 7 ngày
                  </li>
                </ul>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Số lượng</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="bg-gray-100 text-gray-600 hover:bg-gray-200 h-10 w-10 rounded-l-lg flex items-center justify-center transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="h-10 w-20 text-center border-y border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="bg-gray-100 text-gray-600 hover:bg-gray-200 h-10 w-10 rounded-r-lg flex items-center justify-center transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Còn hàng</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-white border-2 border-pink-600 text-pink-600 py-3 px-6 rounded-lg hover:bg-pink-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang thêm...
                    </span>
                  ) : (
                    'Thêm vào giỏ'
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isAddingToCart}
                  className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    'Mua ngay'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shipping Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">Miễn phí vận chuyển</h3>
            </div>
            <p className="text-gray-600">Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
          </div>
          
          {/* Return Policy */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">Đổi trả dễ dàng</h3>
            </div>
            <p className="text-gray-600">Đổi trả sản phẩm trong 7 ngày nếu không hài lòng</p>
          </div>
          
          {/* Customer Support */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">Hỗ trợ 24/7</h3>
            </div>
            <p className="text-gray-600">Đội ngũ tư vấn viên luôn sẵn sàng hỗ trợ bạn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 