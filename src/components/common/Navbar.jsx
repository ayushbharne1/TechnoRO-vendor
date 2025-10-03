import { useState } from "react";
import { Bell, User, LogOut } from "lucide-react"; // icons from lucide-react
import Logo from "../../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { LuBell } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import user from "../../assets/user.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center border-b-2 border-gray-400">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="Vendor Logo"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-xl font-bold text-gray-700">Techno RO</h1>
      </div>

      {/* Center - Search Bar */}
      <div className='relative w-[400px] font-medium'>
        <span className='absolute left-3 top-3 text-xl'><CiSearch /></span>
        <input 
          type='text' 
          placeholder='Search' 
          className='focus:outline-none focus:ring-2 bg-[#EBF2F1] focus:ring-blue-200 border border-gray-400 px-9 py-2 w-full rounded-full' 
        />              
      </div>

      {/* Right - Notifications and User Profile */}
      <div className='flex space-x-6 items-center'>
        <div className='relative flex items-center justify-between'>
          <span className='text-3xl px-4 border-l-2 border-r-2 border-gray-400'><LuBell /></span>
          <span className='absolute z-10 text-[10px] -top-2 right-5 bg-red-600 text-white rounded-full px-1 py-0.5'>2</span>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <img src={user} className='w-[] h-[]' alt='user-icon'/>
          </div>
          <div className=''>
            <p className='font-medium text-sm'>Kristin Watson</p>
            <p className='text-xs'>Designation</p>
          </div>
          <div className="relative inline-block">
            {/* Button to open dropdown (only shows arrow) */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="px-4 py-2 rounded-md flex items-center"
            >
              <IoIosArrowDown />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-4 mt-2 w-22 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
