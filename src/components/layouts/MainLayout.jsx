import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import LoadingPage from "../../pages/LoadingPage";
import { useEffect, useState } from "react";



const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />; //No layout applied here
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="sticky top-0 h-[calc(100vh-64px)]">{/* Adjust height to navbar height if needed */}
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 bg-[#EBF2F1]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
