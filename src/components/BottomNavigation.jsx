import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants';
import { FaHome, FaList, FaShoppingCart } from 'react-icons/fa';

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="mobile-bottom-nav safe-area-padding lg:hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center">
          <Link
            to={ROUTES.HOME}
            className={`flex flex-col items-center p-2 ${
              isActive(ROUTES.HOME) ? 'text-pink-600' : 'text-gray-600'
            }`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <FaHome className="text-xl mb-1" />
            <span className="text-xs">Trang chủ</span>
          </Link>

          <Link
            to={ROUTES.PRODUCTS}
            className={`flex flex-col items-center p-2 ${
              isActive(ROUTES.PRODUCTS) ? 'text-pink-600' : 'text-gray-600'
            }`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <FaList className="text-xl mb-1" />
            <span className="text-xs">Sản phẩm</span>
          </Link>

          <Link
            to={ROUTES.CART}
            className={`flex flex-col items-center p-2 ${
              isActive(ROUTES.CART) ? 'text-pink-600' : 'text-gray-600'
            }`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <FaShoppingCart className="text-xl mb-1" />
            <span className="text-xs">Giỏ hàng</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation; 