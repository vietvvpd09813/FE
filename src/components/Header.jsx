import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES, PRODUCT_CATEGORIES, CONTACT_INFO } from '../constants';
import { getCartFromLocalStorage } from '../utils/localStorage';
import { FaPhone, FaShoppingCart, FaUser, FaCommentDots } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateCartCount = useCallback(() => {
    const cart = getCartFromLocalStorage();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, []);

  useEffect(() => {
    updateCartCount();
    
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, [updateCartCount]);

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  // Don't render header on login page
  if (location.pathname === ROUTES.LOGIN) {
    return null;
  }

  return (
    <>
      <header className={`fixed w-full top-0 z-40 transform-gpu transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        {/* Top bar - only visible when not scrolled on desktop */}
        <div className={`bg-pink-100 text-pink-800 overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0' : 'h-8'} hidden sm:block`}>
          <div className="container mx-auto px-4 flex justify-between items-center text-xs h-full">
            <div className="flex items-center space-x-4">
              <a href={`tel:${CONTACT_INFO.HOTLINE}`} className="hover:text-pink-600 flex items-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Hotline: {CONTACT_INFO.HOTLINE}
              </a>
              <span className="hidden md:inline">|</span>
              <div className="hidden md:flex items-center space-x-4">
                {CONTACT_INFO.CUSTOMER_SERVICE.map((service, index) => (
                  <a key={index} href={`tel:${service.phone}`} className="hover:text-pink-600 flex items-center transition-colors">
                    <RiCustomerService2Fill className="h-3 w-3 mr-1" />
                    CSKH: {service.phone} {service.hasZalo && '(Zalo)'}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <span className="mr-2">✈️</span>
                Nhận ship COD toàn quốc
              </span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to={ROUTES.HOME} className="flex items-center flex-shrink-0">
                <div className={`transition-all duration-300 ${isScrolled ? 'h-8 w-8' : 'h-10 w-10'} flex items-center justify-center`}>
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKT57puJ1NwlHaibn56A34UFY2OKRTd7TtgQ&s" 
                    alt="Mẹ Xíu Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="ml-2">
                  <span className={`block font-bold text-pink-600 transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>Mẹ Xíu</span>
                  <span className={`text-gray-500 transition-all duration-300 ${isScrolled ? 'text-xs' : 'text-sm'} hidden sm:inline`}>Sữa mẹ và bé</span>
                </div>
              </Link>

              {/* Desktop Navigation Menu */}
              <nav className="hidden lg:block flex-1 max-w-xl mx-8">
                <ul className="flex justify-center space-x-8">
                  <li>
                    <Link
                      to={ROUTES.HOME}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={ROUTES.PRODUCTS}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                    >
                      Sản phẩm
                    </Link>
                  </li>
                  <li className="relative group">
                    <div
                      className="flex items-center text-gray-700 hover:text-pink-600 transition-colors font-medium cursor-pointer"
                    >
                      <span>Danh mục</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div 
                      className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg py-2 transform-gpu z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    >
                      {PRODUCT_CATEGORIES.slice(0, 6).map((category) => (
                        <Link
                          key={category.id}
                          to={`${ROUTES.PRODUCTS}?category=${category.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                          onClick={() => {
                            window.scrollTo(0, 0);
                          }}
                        >
                          {category.name}
                        </Link>
                      ))}
                      <Link
                        to={ROUTES.PRODUCTS}
                        className="block px-4 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50 border-t border-gray-100 mt-1"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        Xem thêm →
                      </Link>
                    </div>
                  </li>
                  
                  <li>
                    <Link
                      to="/about"
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                    >
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                    >
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Right side icons */}
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden text-gray-700 hover:text-pink-600 transition-colors focus:outline-none"
                  aria-label="Toggle menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>

                {/* Cart & Profile */}
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <Link to={ROUTES.CART} className="text-gray-700 hover:text-pink-600 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-[280px] h-full bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="py-4">
              <Link
                to={ROUTES.HOME}
                className="block px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Trang chủ
              </Link>
              <div className="px-4 py-2.5">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center justify-between w-full text-gray-700"
                >
                  <span>Danh mục</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`mt-2 space-y-1 ${isCategoryDropdownOpen ? 'block' : 'hidden'}`}>
                  {PRODUCT_CATEGORIES.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      to={`${ROUTES.PRODUCTS}?category=${category.id}`}
                      className="block pl-4 py-2 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    to={ROUTES.PRODUCTS}
                    className="block pl-4 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50 border-t border-gray-100 mt-1"
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Xem thêm →
                  </Link>
                </div>
              </div>
              <Link
                to={ROUTES.PRODUCTS}
                className="block px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Sản phẩm
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Giới thiệu
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Liên hệ
              </Link>
            </nav>

            <div className="border-t py-4">
              <Link
                to="/tracking"
                className="block px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Theo dõi đơn hàng
              </Link>
              <Link
                to="/stores"
                className="block px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Hệ thống cửa hàng
              </Link>
              <a
                href="tel:1900123456"
                className="block px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Hotline: 1900 123 456
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Header;
