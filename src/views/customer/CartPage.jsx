import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';
import {
  getCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getCartTotal
} from '../../utils/cartStorage';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// Định nghĩa style chung cho SweetAlert2
const swalConfig = {
  width: '300px',
  padding: '1.5rem',
  showClass: {
    popup: 'animate__animated animate__fadeIn animate__faster'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOut animate__faster'
  },
  showCancelButton: true,
  confirmButtonColor: '#DB2777',
  cancelButtonColor: '#ffffff',
  confirmButtonText: 'Xóa sản phẩm',
  cancelButtonText: 'Không',
  reverseButtons: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  stopKeydownPropagation: false,
  scrollbarPadding: false,
  heightAuto: false,
  customClass: {
    popup: 'rounded-xl shadow-xl',
    title: 'text-lg font-medium text-gray-800 pb-1',
    htmlContainer: 'text-sm text-gray-600',
    actions: 'gap-2 px-2 pb-2',
    confirmButton: 'rounded-lg text-xs font-medium px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white min-w-[100px] shadow-sm',
    cancelButton: 'rounded-lg text-xs font-medium px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 min-w-[100px] shadow-sm',
    container: 'backdrop-blur-sm',
    overlay: 'bg-gray-900/50'
  },
  backdrop: `
    rgba(0,0,0,0.4)
    left 0
    top 0
    width 100%
    height 100%
    position fixed
    backdrop-filter: blur(2px)
  `
};

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const cartData = getCart();
    setCart(cartData);
    setTotalAmount(getCartTotal());
  }, []);
  
  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) quantity = 1;
    const updatedCart = updateCartItemQuantity(productId, quantity);
    setCart(updatedCart);
    setTotalAmount(getCartTotal());
  };
  
  const handleRemoveItem = async (productId, productName) => {
    const result = await Swal.fire({
      ...swalConfig,
      title: 'Xóa sản phẩm',
      confirmButtonText: 'Xóa',
      html: `
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div class="text-center space-y-1">
            <p class="text-sm">Bạn có chắc chắn muốn xóa</p>
            <p class="text-sm font-medium text-pink-600 max-w-[200px] truncate">${productName}</p>
            <p class="text-sm">khỏi giỏ hàng?</p>
          </div>
        </div>
      `
    });

    if (result.isConfirmed) {
      const updatedCart = removeFromCart(productId);
      setCart(updatedCart);
      setTotalAmount(getCartTotal());
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    }
  };
  
  const handleClearCart = async () => {
    const result = await Swal.fire({
      ...swalConfig,
      title: 'Xóa giỏ hàng',
      confirmButtonText: 'Xóa tất cả',
      html: `
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div class="text-center space-y-1">
            <p class="text-sm">Bạn có chắc chắn muốn xóa</p>
            <p class="text-sm font-medium text-pink-600">tất cả sản phẩm</p>
            <p class="text-sm">trong giỏ hàng?</p>
          </div>
        </div>
      `
    });

    if (result.isConfirmed) {
      clearCart();
      setCart([]);
      setTotalAmount(0);
      toast.success('Đã xóa toàn bộ giỏ hàng');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-lg text-gray-600 mb-6">Giỏ hàng của bạn đang trống</p>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Sản phẩm ({cart.reduce((total, item) => total + item.quantity, 0)})
                    </h2>
                    <button
                      onClick={handleClearCart}
                      className="text-pink-600 hover:text-pink-800 text-sm font-medium"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                </div>
                
                <ul className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-contain rounded-lg shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%236b7280" text-anchor="middle">Hình ảnh không khả dụng</text></svg>';
                            }}
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <Link 
                                to={`${ROUTES.PRODUCTS}/${item.id}`}
                                className="font-semibold text-lg text-gray-900 hover:text-pink-600 transition-colors"
                              >
                                {item.name}
                              </Link>
                            </div>
                            <div className="mt-4 sm:mt-0">
                              <span className="font-semibold text-lg text-pink-600">
                                {formatCurrency(item.price)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="bg-gray-100 text-gray-600 hover:bg-gray-200 h-8 w-8 rounded-l-lg flex items-center justify-center transition-colors"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                className="h-8 w-16 text-center border-y border-gray-200 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="bg-gray-100 text-gray-600 hover:bg-gray-200 h-8 w-8 rounded-r-lg flex items-center justify-center transition-colors"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-2"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <span className="text-sm font-medium">Xóa</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Tổng tiền</span>
                      <span className="text-xl font-bold text-pink-600">{formatCurrency(totalAmount)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Đã bao gồm VAT (nếu có)</p>
                  </div>
                  
                  <Link
                    to={ROUTES.CHECKOUT}
                    className="block w-full bg-pink-600 text-white text-center py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 mt-6"
                  >
                    Tiến hành thanh toán
                  </Link>
                  
                  <Link
                    to={ROUTES.PRODUCTS}
                    className="block w-full text-center py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;