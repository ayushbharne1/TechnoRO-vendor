import { NavLink } from "react-router-dom";
import { Home, Package, Users, Database, BarChart2, Bell, MapPin, ClipboardList } from "lucide-react";

//#7EC1B1
const Sidebar = () => {
  return (
    <aside className="w-69 bg-white text-[#36a88e] h-full flex flex-col border-r-2 border-gray-400">
      
      <nav className="flex-1 p-4 space-y-3 text-medium  tracking-wide ">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3  px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <Home className="h-5 w-5" /> Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <Package className="h-5 w-5" /> Product
        </NavLink>

        <NavLink
          to="/leads"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <ClipboardList className="h-5 w-5" /> Lead Management
        </NavLink>
        

        <NavLink
          to="/engineers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <Users className="h-5 w-5 " />Engineer Management
        </NavLink>
        
        <NavLink
          to="/city"
          className={({ isActive }) =>
            `flex items-center gap-3  px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <MapPin className="h-5 w-5" /> City
        </NavLink>


        <NavLink
          to="/Services"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <Package className="h-5 w-5" /> Services
        </NavLink>
        


         <NavLink
          to="/customers"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <Package className="h-5 w-5" /> Customer
        </NavLink>


        

        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <Database className="h-5 w-5" /> Inventory
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <BarChart2 className="h-5 w-5" /> Reports
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#7EC1B1] hover:text-white ${
              isActive ? "bg-[#7EC1B1] text-white" : ""
            }`
          }
        >
          <Bell className="h-5 w-5" /> Notifications
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
