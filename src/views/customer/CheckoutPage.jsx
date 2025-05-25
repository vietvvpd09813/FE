import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';
import { getCart, getCartTotal, clearCart } from '../../utils/cartStorage';
import toast, { Toaster } from 'react-hot-toast';
import { useCreateOrderMutation } from '../../services/order.sevice';

const CheckoutPage = () => {
  const [addOrder, {isLoading}] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [captcha, setCaptcha] = useState({ value: '', userInput: '', error: '' });
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Generate random captcha string
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha({
      value: result,
      userInput: ''
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Load cart data from localStorage when component mounts
  useEffect(() => {
    const cartData = getCart();
    if (cartData.length === 0) {
      toast.error('Giỏ hàng trống, vui lòng thêm sản phẩm');
      navigate(ROUTES.PRODUCTS);
      return;
    }
    setCart(cartData);
    setTotalAmount(getCartTotal());
  }, [navigate]);

  const validateVietnamesePhone = (phone) => {
    // Regex for Vietnamese phone numbers
    const phoneRegex = /^(0|\+84)([35789][0-9]{8}|1[2689][0-9]{8})$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'captcha') {
      setCaptcha(prev => ({ ...prev, userInput: value.toUpperCase(), error: '' }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate phone number on change
    if (name === 'phone') {
      if (!value) {
        setPhoneError('Vui lòng nhập số điện thoại');
      } else if (!validateVietnamesePhone(value)) {
        setPhoneError('Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validateVietnamesePhone(formData.phone)) {
      toast.error('Số điện thoại không hợp lệ');
      return;
    }

    // Validate captcha
    if (!captcha.userInput) {
      setCaptcha(prev => ({ ...prev, error: 'Vui lòng nhập mã xác nhận' }));
      return;
    }

    if (captcha.userInput !== captcha.value) {
      setCaptcha(prev => ({ ...prev, error: 'Mã xác nhận không đúng' }));
      return;
    }

    try {
      const orderItems = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const orderData = {
        ...formData,
        items: orderItems,
        total: totalAmount
      };

      const response = await addOrder(orderData).unwrap();
      
      clearCart();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Show success toast with custom styling
      toast.success(
        <div className="text-sm">
          <p className="font-medium mb-1">Đặt hàng thành công!</p>
          <p className="text-gray-600">Tổng giá trị: {formatCurrency(totalAmount)}</p>
          <p className="text-gray-600">Nhân viên sẽ liên hệ SĐT: {formData.phone}</p>
        </div>,
        {
          duration: 5000,
          style: {
            minWidth: '300px',
          },
        }
      );
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 3000);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
      console.error('Order error:', error);
      generateCaptcha();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Toaster 
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: '#10B981',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
        }}
      />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <Link
            to={ROUTES.CART}
            className="text-pink-600 hover:text-pink-700 font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại giỏ hàng
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Danh sách sản phẩm */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Sản phẩm đã chọn ({cart.reduce((total, item) => total + item.quantity, 0)})
              </h2>
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%236b7280" text-anchor="middle">Hình ảnh không khả dụng</text></svg>';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Số lượng: {item.quantity}</p>
                      <p className="text-base font-medium text-pink-600 mt-1">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-medium text-gray-900">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Tổng tiền</span>
                  <span className="text-xl font-bold text-pink-600">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form thông tin */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin khách hàng</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-xl border ${phoneError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  placeholder="Nhập số điện thoại của bạn (VD: 0912345678)"
                />
                {phoneError && (
                  <p className="mt-2 text-sm text-red-600">{phoneError}</p>
                )}
              </div>

              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-2">
                  Mã xác nhận
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 px-4 py-3 rounded-xl font-bold text-xl tracking-wider">
                      {captcha.value}
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-pink-600 hover:text-pink-700"
                    >
                      Đổi mã khác
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="captcha"
                      name="captcha"
                      value={captcha.userInput}
                      onChange={handleInputChange}
                      required
                      maxLength={6}
                      disabled={isLoading}
                      className={`w-full px-4 py-3 rounded-xl border ${captcha.error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed uppercase`}
                      placeholder="Nhập mã xác nhận"
                    />
                    {captcha.error && (
                      <p className="mt-2 text-sm text-red-600">{captcha.error}</p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 text-white py-4 px-6 rounded-xl text-lg font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors mt-8 disabled:bg-pink-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  'Xác nhận đặt hàng'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 