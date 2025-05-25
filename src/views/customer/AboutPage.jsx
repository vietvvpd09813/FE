import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-50 to-pink-100 pt-24 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Mẹ Xíu - Nơi Gửi Gắm <span className="text-pink-600">Niềm Tin</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Chúng tôi tự hào là điểm đến tin cậy cho những sản phẩm sữa và đồ uống chất lượng cao. 
                Với hơn 5 năm kinh nghiệm, Mẹ Xíu đã và đang phục vụ hơn 10,000+ khách hàng thân thiết.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/products" 
                  className="inline-block bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition-colors font-medium text-sm md:text-base"
                >
                  Khám phá sản phẩm
                </Link>
                <a 
                  href="#contact" 
                  className="inline-block border-2 border-pink-600 text-pink-600 px-6 py-2.5 rounded-lg hover:bg-pink-600 hover:text-white transition-colors font-medium text-sm md:text-base"
                >
                  Liên hệ ngay
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-6/470670409_1104451181381693_4156235896700417232_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=669761&_nc_eui2=AeGo2ibUMh7enpFkuRwj5McV4BATTBhRKk_gEBNMGFEqT1-OBSJdvt4kp9-YkDGF5pVfDgIT6PcKEwzTxpK7Y6QG&_nc_ohc=J-9KezUoDqgQ7kNvwEFQVqO&_nc_oc=AdkDw07UVcPZUpMjGPUhR9AfW_0zxcFNIpD2t1ohZGGaaNKJ4itVcHwSShqNY0KyWBg&_nc_zt=23&_nc_ht=scontent.fdad5-1.fna&_nc_gid=l9rtvh5F9rMm8aXcRMI8GA&oh=00_AfLWIvgrv3K_ZyI-NKnEnMnJiAfeu_d5rmhJxMQGn6HLfQ&oe=683707D3" 
                  alt="Mẹ Xíu Store" 
                  className="rounded-lg shadow-2xl w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-pink-600">5+</p>
                      <p className="text-xs md:text-sm text-gray-600">Năm kinh nghiệm</p>
                    </div>
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-pink-600">10k+</p>
                      <p className="text-xs md:text-sm text-gray-600">Khách hàng</p>
                    </div>
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-pink-600">100+</p>
                      <p className="text-xs md:text-sm text-gray-600">Sản phẩm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Tại sao chọn Mẹ Xíu?
            </h2>
            <p className="text-gray-600">
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất với những giá trị cốt lõi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Chất Lượng Đảm Bảo</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sản phẩm chính hãng 100%
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Kiểm định nghiêm ngặt
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Bảo quản theo tiêu chuẩn
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Dịch Vụ Chuyên Nghiệp</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Giao hàng nhanh chóng
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Đổi trả trong 7 ngày
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Hỗ trợ 24/7
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Ưu Đãi Hấp Dẫn</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Tích điểm đổi quà
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Giảm giá thành viên
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Quà tặng sinh nhật
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://scontent.fdad5-1.fna.fbcdn.net/v/t39.30808-6/470670409_1104451181381693_4156235896700417232_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=669761&_nc_eui2=AeGo2ibUMh7enpFkuRwj5McV4BATTBhRKk_gEBNMGFEqT1-OBSJdvt4kp9-YkDGF5pVfDgIT6PcKEwzTxpK7Y6QG&_nc_ohc=J-9KezUoDqgQ7kNvwEFQVqO&_nc_oc=AdkDw07UVcPZUpMjGPUhR9AfW_0zxcFNIpD2t1ohZGGaaNKJ4itVcHwSShqNY0KyWBg&_nc_zt=23&_nc_ht=scontent.fdad5-1.fna&_nc_gid=l9rtvh5F9rMm8aXcRMI8GA&oh=00_AfLWIvgrv3K_ZyI-NKnEnMnJiAfeu_d5rmhJxMQGn6HLfQ&oe=683707D3" 
                  alt="Mẹ Xíu Story" 
                  className="rounded-lg shadow-lg w-full h-[300px] object-cover"
                />
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Mẹ Xíu được thành lập vào năm 2019, bắt đầu từ một cửa hàng nhỏ với mong muốn mang đến những sản phẩm 
                  sữa và đồ uống chất lượng cao cho mọi gia đình Việt Nam.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Trải qua hơn 5 năm phát triển, chúng tôi đã mở rộng quy mô với hệ thống cửa hàng trên toàn quốc, 
                  phục vụ hơn 10,000 khách hàng thân thiết.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Với phương châm "Chất lượng là danh dự", Mẹ Xíu luôn đặt sự an toàn và sức khỏe của khách hàng 
                  lên hàng đầu, cam kết mang đến những sản phẩm tốt nhất với giá cả hợp lý nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Cam Kết Của Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">An Toàn</h3>
              <p className="text-gray-600">
                Đảm bảo vệ sinh an toàn thực phẩm theo tiêu chuẩn quốc tế
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Nhanh Chóng</h3>
              <p className="text-gray-600">
                Giao hàng trong vòng 2 giờ trong khu vực nội thành
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Giá Cả</h3>
              <p className="text-gray-600">
                Cam kết giá tốt nhất thị trường, đảm bảo chất lượng
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Uy Tín</h3>
              <p className="text-gray-600">
                Được tin tưởng bởi hơn 10,000 khách hàng thân thiết
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
              Liên Hệ Với Chúng Tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Điện Thoại</h3>
                <p className="text-gray-600 text-sm md:text-base">Hotline: 0123 456 789</p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600 text-sm md:text-base">info@mexiu.com</p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Địa Chỉ</h3>
                <p className="text-gray-600 text-sm md:text-base">123 Đường ABC, Quận XYZ</p>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
                Gửi Tin Nhắn Cho Chúng Tôi
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Họ và tên</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Tin nhắn</label>
                  <textarea
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                    rows="4"
                    placeholder="Nhập tin nhắn"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition-colors font-medium text-sm md:text-base"
                  >
                    Gửi tin nhắn
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 