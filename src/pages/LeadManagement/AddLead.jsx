import React, { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';

const AddLead = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phoneNo: '',
    serviceType: '',
    productModel: '',
    dateReceived: '',
    status: 'Pending'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNo.replace(/[+\-\s]/g, ''))) {
      newErrors.phoneNo = 'Please enter a valid phone number';
    }
    
    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Service type is required';
    }
    
    if (!formData.productModel.trim()) {
      newErrors.productModel = 'Product model is required';
    }
    
    if (!formData.dateReceived) {
      newErrors.dateReceived = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // API Integration point - Replace with your actual API endpoint
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Lead added successfully:', data);
        // Reset form after successful submission
        setFormData({
          customerName: '',
          address: '',
          phoneNo: '',
          serviceType: '',
          productModel: '',
          dateReceived: '',
          status: 'Pending'
        });
        alert('Lead added successfully!');
      } else {
        throw new Error('Failed to add lead');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Navigate back or reset form
    setFormData({
      customerName: '',
      address: '',
      phoneNo: '',
      serviceType: '',
      productModel: '',
      dateReceived: '',
      status: 'Pending'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium">Lead Management</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-600">Add Lead</span>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-900">Add Leads</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Priya Sharma"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition ${
                  errors.customerName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Maharashtra, India"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Phone No */}
            <div>
              <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700 mb-2">
                Phone No
              </label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
                placeholder="91+1258794560"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition ${
                  errors.phoneNo ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phoneNo && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNo}</p>
              )}
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <input
                type="text"
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                placeholder="Repair"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition ${
                  errors.serviceType ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.serviceType && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
              )}
            </div>

            {/* Product Model */}
            <div>
              <label htmlFor="productModel" className="block text-sm font-medium text-gray-700 mb-2">
                Product Model
              </label>
              <input
                type="text"
                id="productModel"
                name="productModel"
                value={formData.productModel}
                onChange={handleInputChange}
                placeholder="MSF456"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition ${
                  errors.productModel ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.productModel && (
                <p className="mt-1 text-sm text-red-600">{errors.productModel}</p>
              )}
            </div>

            {/* Date Received */}
            <div>
              <label htmlFor="dateReceived" className="block text-sm font-medium text-gray-700 mb-2">
                Date Received
              </label>
              <input
                type="date"
                id="dateReceived"
                name="dateReceived"
                value={formData.dateReceived}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition ${
                  errors.dateReceived ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dateReceived && (
                <p className="mt-1 text-sm text-red-600">{errors.dateReceived}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none transition bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-2.5 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#6db0a0] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLead;