import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, CONTACT_INFO, STORE_LOCATIONS, PRODUCT_CATEGORIES } from '../constants';
import { FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  if (location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER) {
    return null;
  }
  
  return (
    <footer className="bg-gradient-to-b from-white to-pink-50 mt-16">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKT57puJ1NwlHaibn56A34UFY2OKRTd7TtgQ&s" 
                  alt="Mẹ Xíu Logo" 
                  className="w-16 h-16 rounded-full shadow-lg border-4 border-pink-100"
                />
                <div>
                  <h2 className="text-2xl font-bold text-pink-600">{CONTACT_INFO.STORE_NAME}</h2>
                  <p className="text-gray-500">Chăm sóc dinh dưỡng cho mẹ và bé</p>
                </div>
              </div>
              
              {/* Thông tin liên hệ */}
              <div className="space-y-3 mb-8 w-full">
                <p className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Hotline: {CONTACT_INFO.HOTLINE}
                </p>
                {CONTACT_INFO.CUSTOMER_SERVICE.map((service, index) => (
                  <p key={index} className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    CSKH: {service.phone} {service.hasZalo && '(Zalo)'}
                  </p>
                ))}
                <p className="flex items-center text-gray-600">
                  <span className="mr-2">✈️</span>
                  Nhận ship COD toàn quốc
                </p>
              </div>
            </div>
          </div>

          {/* Hệ thống cửa hàng */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-pink-600 pb-2 border-b-2 border-pink-100">Hệ thống cửa hàng</h3>
            <div className="space-y-4">
              {STORE_LOCATIONS.map(location => (
                <div key={location.id} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600">{location.name}: {location.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rest of the existing sections */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-pink-600 pb-2 border-b-2 border-pink-100">Sản phẩm</h3>
            <ul className="space-y-4">
              {PRODUCT_CATEGORIES.map(category => (
                <li key={category.id}>
                  <Link 
                    to={`${ROUTES.PRODUCTS}?category=${category.id}`}
                    className="text-gray-600 hover:text-pink-600 transition-colors hover:translate-x-1 inline-block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-pink-600 pb-2 border-b-2 border-pink-100">Thông tin</h3>
            <ul className="space-y-4">
              <li>
                <Link to={ROUTES.ABOUT} className="text-gray-600 hover:text-pink-600 transition-colors hover:translate-x-1 inline-block">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-pink-600 transition-colors hover:translate-x-1 inline-block">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-pink-600 transition-colors hover:translate-x-1 inline-block">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-pink-600 transition-colors hover:translate-x-1 inline-block">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-600 hover:text-pink-600 transition-colors hover:translate-x-1 inline-block">
                  Chính sách đổi trả
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-pink-100 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} {CONTACT_INFO.STORE_NAME}. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 