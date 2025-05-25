import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectIsAdmin } from '../store/authSlice';
import { ROUTES } from '../constants';

export const RequireAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  
  console.log('RequireAuth - Auth State:', { 
    isAuthenticated,
    currentPath: location.pathname,
    from: location.state?.from
  });
  
  if (!isAuthenticated) {
    // Lưu lại trang người dùng đang cố truy cập
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  
  return <Outlet />;
};

export const RequireAdmin = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const location = useLocation();
  
  console.log('RequireAdmin - Auth State:', { 
    isAuthenticated, 
    isAdmin,
    currentPath: location.pathname,
    from: location.state?.from
  });
  
  if (!isAuthenticated) {
    console.log(1)
    console.log('Not authenticated, redirecting to admin login');
    // Lưu lại trang admin đang cố truy cập
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  
  if (!isAdmin) {
    console.log('Not admin, redirecting to unauthorized');
    return <Navigate to={ROUTES.UNAUTHORIZED} state={{ 
      message: 'Bạn không có quyền truy cập trang quản trị',
      from: location.pathname 
    }} replace />;
  }
  
  console.log('Auth check passed, rendering admin route');
  return <Outlet />;
}; 