import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { POST_STATUS, POST_STATUS_LABELS } from '../../../constants';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useUploadImageMutation,
  useGetPostByIdQuery,
} from '../../../services/post.service';
import { useNavigate, useParams } from 'react-router-dom';

const defaultForm = {
  title: '',
  content: '',
  excerpt: '',
  status: POST_STATUS.DRAFT,
  metaTitle: '',
  metaDescription: '',
  featured: false,
  thumbnail: null,
  images: [],
};

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef();

  // RTK Query hooks
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data, isLoading } = useGetPostByIdQuery(id, { skip: !id });

  // State
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Khi có data (edit), set lại form
  useEffect(() => {
    if (id && data) {
      setForm({
        ...defaultForm,
        ...data,
        thumbnail: null, // reset thumbnail input (chỉ upload mới)
      });
    }
  }, [id, data]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleQuillChange = (value) => {
    setForm({ ...form, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          data.append('images', JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          data.append(key, value);
        }
      });
      if (id) {
        await updatePost({ id, body: data }).unwrap();
      } else {
        await createPost(data).unwrap();
      }
      navigate('/admin/posts');
    } catch (err) {
      setErrors(err?.data?.errors || {});
    } finally {
      setSubmitting(false);
    }
  };

  // Quill modules: custom image upload handler
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: async () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();
          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              try {
                const res = await uploadImage(file).unwrap();
                const url = res?.data?.url;
                if (url) {
                  const quill = quillRef.current.getEditor();
                  const range = quill.getSelection();
                  quill.insertEmbed(range.index, 'image', url);
                }
              } catch (err) {
                alert('Upload ảnh thất bại!');
              }
            }
          };
        }
      }
    }
  };

  if (id && isLoading) {
    return <div>Đang tải dữ liệu bài viết...</div>;
  }

  return (
    <form className="max-w-2xl mx-auto bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Tiêu đề bài viết</label>
        <input type="text" name="title" className="input input-bordered w-full" value={form.title} onChange={handleChange} required minLength={5} maxLength={200} />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Nội dung</label>
        <ReactQuill
          ref={quillRef}
          value={form.content}
          onChange={handleQuillChange}
          modules={modules}
          theme="snow"
          className="bg-white"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Tóm tắt</label>
        <textarea name="excerpt" className="textarea textarea-bordered w-full" value={form.excerpt} onChange={handleChange} maxLength={500} />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Trạng thái</label>
          <select name="status" className="select select-bordered w-full" value={form.status} onChange={handleChange}>
            {Object.entries(POST_STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex items-center gap-2 mt-7">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          <label>Bài viết nổi bật</label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Ảnh thumbnail</label>
        <input type="file" name="thumbnail" accept="image/*" className="file-input file-input-bordered w-full" onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Meta Title</label>
        <input type="text" name="metaTitle" className="input input-bordered w-full" value={form.metaTitle} onChange={handleChange} maxLength={60} />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Meta Description</label>
        <textarea name="metaDescription" className="textarea textarea-bordered w-full" value={form.metaDescription} onChange={handleChange} maxLength={160} />
      </div>
      {/* TODO: Thêm UI upload nhiều ảnh gallery nếu cần */}
      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Đang lưu...' : 'Lưu bài viết'}
        </button>
      </div>
    </form>
  );
};

export default PostForm; 