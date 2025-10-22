import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Home, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpdateEngineer = () => {
    const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: 'Kathryn Murphy',
    email: 'abc@gmail.com',
    phoneNo: '9876543210',
    password: 'Password@123',
    skill: 'RO Installation & Uninstallation',
    assignedArea: '4140 Parker Rd. Allentown, New Mexico 31134'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white p-4">
               {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
        <button 
          onClick={() => Navigate('/dashboard')}
          className="hover:text-gray-900 transition-colors cursor-pointer"
        >
          <Home size={16} />
        </button>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span 
        onClick={() => Navigate('/engineers')} 
        className="text-gray-900 font-medium cursor-pointer">Engineer Management</span>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span
        
        className="text-gray-900 font-medium cursor-pointer">Update Engineer</span>
      </div>

      {/* Form Container */}
      <div className="">
        <h1 className="text-xl font-semibold text-gray-800 mb-6 mt-5">Edit Service Engineer</h1>
        <hr className='text-gray-300'/>
        
        <div className="bg-white">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="fullName"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent text-gray-700"
                />
              </div>

              {/* Select Skill */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Skill
                </label>
                <div className="relative">
                  <select
                    name="skill"
                    value={formData.skill}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent text-gray-700 appearance-none bg-white"
                  >
                    <option>RO Installation & Uninstallation</option>
                    <option>AC Installation & Repair</option>
                    <option>Plumbing Services</option>
                    <option>Electrical Services</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Phone No */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone No.
                </label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent text-gray-700"
                />
              </div>
              

              {/* Assigned Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Area
                </label>
                <input
                  type="text"
                  name="assignedArea"
                  value={formData.assignedArea}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent text-gray-700"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-16 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateEngineer;