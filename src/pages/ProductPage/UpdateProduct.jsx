import React, { useState } from 'react';
import { X, Upload, Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: 'RO Membrane',
    category: 'Spare Parts',
    price: '1299',
    warranty: 'NA',
    description: 'Lorem ipsum dolor sit amet consectetur. Tempus sem tellus euismod vitae. Enim turpis ac elementum eget in sit enim. Auctor magna maecenas id mi nec.',
    status: 'Publish',
    images: [
      'https://via.placeholder.com/150/8B7355/ffffff?text=Image+1',
      'https://via.placeholder.com/150/2E9CA8/ffffff?text=Image+2',
      'https://via.placeholder.com/150/666666/ffffff?text=Image+3',
      'https://via.placeholder.com/150/A4B8D3/ffffff?text=Image+4'
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageDelete = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    try {
      // API integration point
      // const response = await fetch('YOUR_API_ENDPOINT/products/:id', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  return (
    <div className="min-h-screen bg-white">
       {/* Breadcrumb */}
              <div className="flex items-center gap-2 p-4 text-sm text-gray-600">
                <button 
                  onClick={() => console.log('Navigate to home')}
                  className="hover:text-gray-900 transition-colors"
                >
                  <Home size={16} />
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button onClick={()=>{Navigate("/products")}} className="text-gray-900 font-medium cursor-pointer">Product</button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button className="text-gray-900 font-medium cursor-pointer">Update Product</button>
                
              </div>

      {/* Main Content */}
      <div className="px-4 ">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Update Product</h1>
        
        <div className="bg-white ">
          <div className=" space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
              />
            </div>

            {/* Product Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent appearance-none bg-white"
              >
                <option value="Spare Parts" className="text-gray-700">Spare Parts</option>
                <option value="Electronics" className="text-gray-700">Electronics</option>
                <option value="Accessories" className="text-gray-700">Accessories</option>
                <option value="Components" className="text-gray-700">Components</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">₹</span>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
                />
              </div>
            </div>

            {/* Warranty */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Warranty
              </label>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent"
              />
            </div>

            {/* Product Images */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {/* Image Grid */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload Area */}
                <div className="text-center">
                  <input
                    type="file"
                    id="imageUpload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer inline-flex flex-col items-center"
                  >
                    <Upload className="text-gray-400 mb-2" size={24} />
                    <span className="text-gray-700 font-medium">Upload photo</span>
                    <span className="text-gray-500 text-sm">Upload clear photo of Product</span>
                  </label>
                </div>

                {formData.images.length < 3 && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => document.getElementById('imageUpload').click()}
                      className="text-teal-500 text-sm font-medium"
                    >
                      + Add More Image (Max 3)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent resize-none"
              />
            </div>

            {/* Product Status */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent appearance-none bg-white"
              >
                <option value="Publish" className="text-gray-700">Publish</option>
                <option value="Draft" className="text-gray-700">Draft</option>
                <option value="Inactive" className="text-gray-700">Inactive</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t px-8 py-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2.5 border-2 border-teal-500 text-teal-500 rounded-lg font-medium hover:bg-teal-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-2.5 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;