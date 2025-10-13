import { useState } from 'react';
import { Upload, Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    price: '',
    warranty: '',
    productImages: [],
    productDescription: '',
    productStatus: 'Publish'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        productImages: [...prev.productImages, ...files]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    if (!formData.productCategory) {
      newErrors.productCategory = 'Product category is required';
    }
    if (!formData.price) {
      newErrors.price = 'Price is required';
    }
    if (formData.productImages.length === 0) {
      newErrors.productImages = 'At least one product image is required';
    }
    if (!formData.productDescription.trim()) {
      newErrors.productDescription = 'Product description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const apiFormData = new FormData();
    apiFormData.append('productName', formData.productName);
    apiFormData.append('productCategory', formData.productCategory);
    apiFormData.append('price', formData.price);
    apiFormData.append('warranty', formData.warranty);
    apiFormData.append('productDescription', formData.productDescription);
    apiFormData.append('productStatus', formData.productStatus);
    
    formData.productImages.forEach((image) => {
      apiFormData.append('productImages', image);
    });

    try {
      // API Integration Example:
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   body: apiFormData
      // });
      // const data = await response.json();
      
      console.log('Form Data:', formData);
      console.log('API FormData prepared for submission');
      alert('Product added successfully!');
      
      setFormData({
        productName: '',
        productCategory: '',
        price: '',
        warranty: '',
        productImages: [],
        productDescription: '',
        productStatus: 'Publish'
      });
      setErrors({});
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add product');
    }
  };

  const handleCancel = () => {
    setFormData({
      productName: '',
      productCategory: '',
      price: '',
      warranty: '',
      productImages: [],
      productDescription: '',
      productStatus: 'Publish'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className=" mx-auto">
        {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <button 
                  onClick={() => console.log('Navigate to home')}
                  className="hover:text-gray-900 transition-colors"
                >
                  <Home size={16} />
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button onClick={()=>{Navigate("/products")}} className="text-gray-900 font-medium">Product</button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button onClick={()=>{Navigate("/products")}} className="text-gray-900 font-medium">Add Product</button>
              </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-6">Add Product</h1>

        <div className="bg-white ">
          <div className=" space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Enter Product Name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
              />
              {errors.productName && (
                <p className="mt-1 text-sm text-red-500">{errors.productName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Product Category <span className="text-red-500">*</span>
              </label>
              <select
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
              </select>
              {errors.productCategory && (
                <p className="mt-1 text-sm text-red-500">{errors.productCategory}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter Price"
                step="0.01"
                min="0"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Warranty
              </label>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleInputChange}
                placeholder="Enter Warranty"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Product Image <span className="text-red-500">*</span>
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-sm p-8">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-700 mb-1">Upload photo</div>
                  <div className="text-xs text-gray-500 mb-4">Upload clear photo of Product</div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-sm cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    Choose Files
                  </label>
                </div>
              </div>

              {formData.productImages.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {formData.productImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-sm border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => document.getElementById('image-upload').click()}
                className="mt-3 text-sm text-teal-500 hover:text-teal-600"
              >
                + Add More Image
              </button>
              
              {errors.productImages && (
                <p className="mt-1 text-sm text-red-500">{errors.productImages}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Product Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                placeholder="Write Product Description"
                rows="6"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent resize-none"
              />
              {errors.productDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.productDescription}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Product Status <span className="text-red-500">*</span>
              </label>
              <select
                name="productStatus"
                value={formData.productStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent appearance-none bg-white"
              >
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2.5 border border-gray-300 rounded-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-2.5 bg-teal-500 text-white rounded-sm font-medium hover:bg-teal-600 transition-colors"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;