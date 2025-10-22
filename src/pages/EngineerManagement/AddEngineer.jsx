import { useState } from 'react';
import { ChevronDown, ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddEngineer = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNo: '',
    password: '',
    skill: '',
    assignedArea: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Service Engineer Added Successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white p-4">
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
        
        className="text-gray-900 font-medium cursor-pointer">Add Engineer</span>
      </div>
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800 mb-8 pb-4 pt-4 border-b border-gray-200">
          Add Service Engineer
        </h1>

        {/* Form */}
        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="fullName"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent"
              />
            </div>

            {/* Select Skill */}
            <div>
              
              <label className="block text-gray-700 font-medium mb-2">
                Select Skill
              </label>
              <div className="relative">
                <select
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent bg-white"
                >
                  <option value="">Select</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="hvac">HVAC</option>
                  <option value="carpentry">Carpentry</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Phone No */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone No.
              </label>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent"
              />
            </div>

            {/* Assigned Area */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Assigned Area
              </label>
              <input
                type="text"
                name="assignedArea"
                value={formData.assignedArea}
                onChange={handleChange}
                placeholder="Enter Assigned Area"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent"
              />
            </div>

            {/* Password - spans single column */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7EB1C1] focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-16 py-3 rounded-md transition-colors duration-200"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddEngineer;