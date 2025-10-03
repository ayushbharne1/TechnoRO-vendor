import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";



const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="sticky top-0 h-[calc(100vh-64px)]">{/* Adjust height to navbar height if needed */}
          <Sidebar />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
