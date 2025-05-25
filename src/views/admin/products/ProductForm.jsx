import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetCategoriesQuery } from '../../../services/category.service';
import { useCreateProductMutation, useUpdateProductMutation } from '../../../services/products.service';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { data: categories } = useGetCategoriesQuery();
  const categoryList = categories?.data || [];
  
  const [addProduct, {isLoading: isAdding}] = useCreateProductMutation();
  const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category_id: '',
    image: null
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load product data when editing
  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:8000/api/products/${id}`);
          const data = await response.json();
          if (data.success && data.data) {
            const product = data.data;
            setFormData({
              name: product.name || '',
              price: product.price?.toString() || '',
              description: product.description || '',
              category_id: product.category_id?.toString() || '',
              image: null
            });
          }
        } catch (error) {
          console.error('Failed to fetch product:', error);
          setFormError('Không thể tải thông tin sản phẩm');
        }
      }
    };

    loadProduct();
  }, [id]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.name.trim()) {
      setFormError('Vui lòng nhập tên sản phẩm');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setFormError('Vui lòng nhập giá hợp lệ');
      return;
    }
    if (!formData.category_id) {
      setFormError('Vui lòng chọn danh mục');
      return;
    }

    try {
      setIsSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('price', Number(formData.price));
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('category_id', Number(formData.category_id));
      
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }

      if (id) {
        await updateProduct({ id, body: formDataToSend }).unwrap();
      } else {
        await addProduct(formDataToSend).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error('Failed to save product:', error);
      setFormError(error.data?.message || 'Có lỗi xảy ra khi lưu sản phẩm');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate('/admin/products');
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999]" 
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-[10000] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-2">
          <div className="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
            {/* Header */}
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {id ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
                </h3>
                <button
                  type="button"
                  className="rounded-md bg-gray-50 text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleClose}
                >
                  <span className="sr-only">Đóng</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {formError && (
                <div className="p-2 bg-red-50 border-l-4 border-red-400 text-red-700">
                  <p className="text-sm">{formError}</p>
                </div>
              )}

              {/* Tên sản phẩm */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 text-gray-900 bg-gray-50 placeholder:text-gray-400 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-pink-500 transition-colors sm:text-sm"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Giá */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá (VNĐ)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 text-gray-900 bg-gray-50 placeholder:text-gray-400 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-pink-500 transition-colors sm:text-sm"
                    placeholder="Nhập giá"
                  />
                </div>

                {/* Danh mục */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 text-gray-900 bg-gray-50 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-pink-500 transition-colors sm:text-sm"
                  >
                    <option value="">Chọn danh mục</option>
                    {categoryList.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  className="block w-full px-4 py-2 text-gray-900 bg-gray-50 placeholder:text-gray-400 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-pink-500 transition-colors sm:text-sm"
                  placeholder="Nhập mô tả sản phẩm"
                ></textarea>
              </div>

              {/* Hình ảnh */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hình ảnh
                </label>
                <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-3">
                  <div className="text-center">
                    <svg className="mx-auto h-6 w-6 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>
                    <div className="mt-2 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-pink-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-pink-600 focus-within:ring-offset-2 hover:text-pink-500"
                      >
                        <span>Tải ảnh lên</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">hoặc kéo thả vào đây</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF tối đa 10MB</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-4 py-3 -mx-4 mt-4 flex justify-end space-x-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-lg bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 disabled:opacity-50"
                >
                  {isSubmitting ? 'Đang xử lý...' : (id ? "Cập nhật" : "Thêm mới")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm; 