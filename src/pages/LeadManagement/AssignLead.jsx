import React, { use, useState } from 'react';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssignLead = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    leadAssignTo: '',
    nearestServiceEngineer: '',
    serviceDate: '',
    startTime: '',
    endTime: '',
    note: ''
  });

  // Mock data - replace with API call
  const serviceEngineers = [
    { id: 1, name: 'Service Engineer' },
    { id: 2, name: 'John Smith' },
    { id: 3, name: 'Sarah Johnson' },
    { id: 4, name: 'Mike Wilson' }
  ];

  const nearestEngineers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Robert Brown' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // API Integration point
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/assign-lead', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
      console.log('Form submitted:', formData);
      alert('Lead assigned successfully!');
    } catch (error) {
      console.error('Error assigning lead:', error);
      alert('Failed to assign lead');
    }
  };

  const handleCancel = () => {
    setFormData({
      leadAssignTo: '',
      nearestServiceEngineer: '',
      serviceDate: '',
      startTime: '',
      endTime: '',
      note: ''
    });
  };

  return (
    <div className="min-h-screen bg-white p-4 ">
      <div className="w-full mx-auto bg-white">
        {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
        <button 
          onClick={() => Navigate('/dashboard')}
          className="hover:text-gray-900 transition-colors cursor-pointer"
        >
          <Home size={16} />
        </button>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span onClick={() => Navigate('/leads')} className="text-gray-900 font-medium cursor-pointer">Lead Management</span>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span  className="text-gray-900 font-medium cursor-pointer">Assign Lead</span>
      </div>

        {/* Header */}
        <div className=" py-3 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Assign Leads</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='mt-5'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lead Assign To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lead Assign To
              </label>
              <div className="relative">
                <select
                  value={formData.leadAssignTo}
                  onChange={(e) => handleInputChange('leadAssignTo', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300  appearance-none focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent text-gray-700"
                >
                  <option value="">Service Engineer</option>
                  {serviceEngineers.map(eng => (
                    <option key={eng.id} value={eng.id}>{eng.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Select Nearest Service Engineer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Nearest Service Engineer
              </label>
              <div className="relative">
                <select
                  value={formData.nearestServiceEngineer}
                  onChange={(e) => handleInputChange('nearestServiceEngineer', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent text-gray-700"
                >
                  <option value="">John Doe</option>
                  {nearestEngineers.map(eng => (
                    <option key={eng.id} value={eng.id}>{eng.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Service Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent text-gray-700"
                  placeholder="28 Oct 2025"
                />
                
              </div>
            </div>

            {/* Service Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Time
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent text-gray-700"
                    placeholder="10:00 AM"
                  />
                  
                </div>
                <div className="relative flex-1">
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent text-gray-700"
                    placeholder="12:00 PM"
                  />
                  
                </div>
              </div>
            </div>
          </div>

          {/* Note/Comment */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note/ Comment
            </label>
            <textarea
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent text-gray-700 resize-none"
              placeholder="Write Product Description"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2.5 border border-[#7EC1B1] text-[#7EC1B1] hover:bg-gray-50  transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-[#79b8a9] text-white hover:bg-[#7EC1B1] transition-colors font-medium"
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignLead;