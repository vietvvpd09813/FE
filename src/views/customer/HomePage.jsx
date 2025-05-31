import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';
import { addToCart } from '../../utils/cartStorage';
import Banner from '../../components/Banner';
import { useGetSellingProductsQuery } from '../../services/products.service';
import { useGetCategoriesQuery } from '../../services/category.service';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useRef } from 'react';
import { useGetVideosQuery } from '../../services/video.service';
import BannerPopup from '../../components/BannerPopup';

const HomePage = () => {
  const { ref: videoRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
    rootMargin: '-100px'
  });
  
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { data: videoResponse } = useGetVideosQuery();
  const video = videoResponse?.data?.[0];

  // Transform YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    // Handle youtu.be URLs
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop().split('?')[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0&showinfo=0&enablejsapi=1`;
    }
    // Handle youtube.com URLs
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0&showinfo=0&enablejsapi=1`;
  };

  const {data: categories1} = useGetCategoriesQuery();
  const categorylist = categories1?.data || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const getItemsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // Mobile
      if (window.innerWidth < 768) return 3; // Tablet Small
      if (window.innerWidth < 1024) return 4; // Tablet Large
      return 6; // Desktop
    }
    return 6;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemWidth = 100 / itemsToShow;

  useEffect(() => {
    const interval = setInterval(() => {
      if (categorylist.length > 0) {
        setCurrentIndex((prev) => (prev === categorylist.length - 1 ? 0 : prev + 1));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [categorylist.length]);

  useEffect(() => {
    if (currentIndex === categorylist.length) {
      setTimeout(() => {
        sliderRef.current.style.transition = 'none';
        setCurrentIndex(0);
        setTimeout(() => {
          sliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }, 50);
      }, 500);
    }
  }, [currentIndex, categorylist.length]);

  const {data: products} = useGetSellingProductsQuery();
  const productlist = products?.data || [];

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white pt-[64px] md:pt-[72px]">
      <BannerPopup />
      <Banner />
      
      {/* Categories section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-pink-600">Danh mục sản phẩm</h2>
          
          <div className="relative max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="overflow-hidden">
              <div 
                ref={sliderRef}
                className="flex"
                style={{
                  transform: `translateX(-${currentIndex * itemWidth}%)`,
                  transition: 'transform 500ms ease-in-out'
                }}
              >
                {[...categorylist, ...categorylist].map((category, index) => (
                  <Link 
                    key={`${category.id}-${index}`}
                    to={`${ROUTES.PRODUCTS}?category=${category.id}`} 
                    className="flex-shrink-0 px-1 sm:px-2 md:px-3 lg:px-4"
                    style={{ 
                      width: `${itemWidth}%`
                    }}
                  >
                    <div className="bg-gradient-to-b from-pink-50 to-white rounded-lg sm:rounded-xl shadow-sm text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 p-2 sm:p-3 md:p-4">
                      <div className="aspect-square w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-2 sm:mb-3 relative">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-contain rounded-full bg-pink-50 p-1.5 sm:p-2"
                          />
                        ) : (
                          <div className="w-full h-full bg-pink-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 6h-4V4a1 1 0 00-1-1H9a1 1 0 00-1 1v2H4a1 1 0 00-1 1v3c0 .5.5 1 1 1v8a2 2 0 002 2h12a2 2 0 002-2v-8c.5 0 1-.5 1-1V7a1 1 0 00-1-1zM9 4h6v2H9V4zm10 16H5v-8h14v8z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-pink-600 text-xs sm:text-sm md:text-base truncate px-1 sm:px-2">{category.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {categorylist.length > itemsToShow && (
              <>
                {/* Navigation Arrows */}
                <button
                  className="absolute -left-2 sm:-left-3 md:-left-4 top-1/2 transform -translate-y-1/2 bg-white p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-md sm:shadow-lg hover:bg-pink-50 transition-colors"
                  onClick={() => {
                    const newIndex = currentIndex === 0 ? categorylist.length - 1 : currentIndex - 1;
                    setCurrentIndex(newIndex);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute -right-2 sm:-right-3 md:-right-4 top-1/2 transform -translate-y-1/2 bg-white p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-md sm:shadow-lg hover:bg-pink-50 transition-colors"
                  onClick={() => {
                    const newIndex = currentIndex === categorylist.length - 1 ? 0 : currentIndex + 1;
                    setCurrentIndex(newIndex);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Products section */}
      <section className="py-16 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-pink-600">Sản phẩm đang bán</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Khám phá các sản phẩm đang được bán tại cửa hàng
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productlist.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', product.id)}>
                  <div className="relative pt-[100%] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-4 hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link 
                    to={ROUTES.PRODUCT_DETAIL.replace(':id', product.id)}
                    className="block text-lg font-semibold text-gray-800 hover:text-pink-600 transition-colors mb-2 line-clamp-2"
                  >
                    {product.name}
                  </Link>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-pink-600">
                      {formatCurrency(product.price)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why choose us section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-pink-600">Tại sao chọn chúng tôi?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-pink-50 to-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-pink-600">Chất lượng đảm bảo</h3>
              <p className="text-gray-600">Chúng tôi cam kết cung cấp các sản phẩm sữa chất lượng cao, đạt tiêu chuẩn an toàn thực phẩm.</p>
            </div>
            
            <div className="bg-gradient-to-b from-pink-50 to-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-pink-600">Giao hàng nhanh chóng</h3>
              <p className="text-gray-600">Dịch vụ giao hàng nhanh chóng trong ngày giúp bạn tiết kiệm thời gian và luôn có sản phẩm tươi mới.</p>
            </div>
            
            <div className="bg-gradient-to-b from-pink-50 to-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-pink-600">Hỗ trợ khách hàng</h3>
              <p className="text-gray-600">Đội ngũ tư vấn tận tâm, sẵn sàng hỗ trợ bạn 24/7 với mọi thắc mắc về sản phẩm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-pink-600">Đánh giá từ khách hàng</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Khám phá những trải nghiệm thực tế từ khách hàng đã tin tưởng và sử dụng sản phẩm của chúng tôi
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Nguyễn Thị Hương</h4>
                  <p className="text-gray-500 text-sm">Khách hàng thân thiết</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">"Sản phẩm sữa tươi ngon, đóng gói cẩn thận. Dịch vụ giao hàng nhanh chóng và nhân viên rất thân thiện. Tôi rất hài lòng và sẽ tiếp tục ủng hộ!"</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Trần Văn Nam</h4>
                  <p className="text-gray-500 text-sm">Khách hàng mới</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">"Lần đầu mua hàng nhưng rất ấn tượng với chất lượng sản phẩm. Giá cả hợp lý, đặc biệt là dịch vụ chăm sóc khách hàng rất tốt. Chắc chắn sẽ quay lại!"</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Lê Thị Mai</h4>
                  <p className="text-gray-500 text-sm">Khách hàng VIP</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">"Đã tin dùng sản phẩm được hơn 2 năm. Chất lượng luôn ổn định, đội ngũ tư vấn nhiệt tình. Các chương trình khuyến mãi hấp dẫn. Rất đáng để trải nghiệm!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoRef} className="relative bg-black">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-screen">
          {/* Video iframe */}
          <div className="absolute inset-0">
            {video && (
              <iframe
                className={`w-full h-full transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                src={getEmbedUrl(video.url)}
                title={video.title || 'Featured Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="eager"
                onLoad={() => setIsVideoLoaded(true)}
              />
            )}
          </div>

          {/* Overlay with content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10">
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <div className="max-w-2xl text-white space-y-4 md:space-y-6 lg:space-y-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    Khám phá chất lượng <br className="hidden sm:block"/>
                    <span className="text-pink-500">tạo nên thương hiệu</span>
                  </h2>
                  
                  <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-200">
                        Quy trình sản xuất khép kín, hiện đại
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-200">
                        Nguyên liệu tuyển chọn kỹ càng
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-200">
                        Đạt chuẩn chất lượng quốc tế
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 md:pt-6">
                    <Link
                      to={ROUTES.PRODUCTS}
                      className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-pink-600 text-white font-medium rounded-full hover:bg-pink-700 transition-colors text-sm sm:text-base group"
                    >
                      Khám phá ngay
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 