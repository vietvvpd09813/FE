// API URL
export const BASE_URL = 'http://localhost:8000/api';

// Đường dẫn
export const ROUTES = {
  // Customer routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  UNAUTHORIZED: '/unauthorized',
  PROFILE: '/profile',
  
  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_CATEGORY_ADD: '/admin/categories/add',
  ADMIN_CATEGORY_EDIT: '/admin/categories/edit/:id',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_ADD: '/admin/products/add',
  ADMIN_PRODUCT_EDIT: '/admin/products/edit/:id',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER_DETAIL: '/admin/orders/:id',
  ADMIN_USERS: '/admin/users',
  ADMIN_VIDEOS: '/admin/videos',
  ADMIN_SLIDERS: '/admin/sliders',
};

// Loại sản phẩm
export const PRODUCT_CATEGORIES = [
  { id: 'milk', name: 'Sữa tươi', image: null },
  { id: 'condensed', name: 'Sữa đặc', image: null },
  { id: 'yogurt', name: 'Sữa chua', image: null },
  { id: 'powder', name: 'Sữa bột', image: null },
  { id: 'drinkable_yogurt', name: 'Sữa chua uống', image: null },
  { id: 'plant', name: 'Sữa thực vật', image: null },
];

// Trạng thái đơn hàng
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Thông tin liên hệ
export const CONTACT_INFO = {
  STORE_NAME: 'THẾ GIỚI SỮA MẸ XÍU',
  HOTLINE: '0906532932',
  CUSTOMER_SERVICE: [
    { phone: '0902741222', hasZalo: true },
    { phone: '0798932932', hasZalo: true }
  ]
};

// Địa chỉ cửa hàng
export const STORE_LOCATIONS = [
  {
    id: 1,
    name: 'CN1',
    address: '84 ÂU CƠ, HOÀ KHÁNH BẮC, LIÊN CHIỂU, ĐÀ NẴNG'
  },
  {
    id: 3,
    name: 'CN3',
    address: '368 TÔN ĐẢN, HOÀ AN, CẨM LỆ, ĐÀ NẴNG'
  },
  {
    id: 4,
    name: 'CN4',
    address: 'DT 602 HOÀ SƠN, AN NGÃI ĐÔNG, HOÀ VANG, ĐÀ NẴNG (Sát bên Nhà Thuốc Long Châu)'
  },
  {
    id: 5,
    name: 'CN5',
    address: '865 Nguyễn Lương Bằng'
  }
];

// Video Status
export const VIDEO_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}; 