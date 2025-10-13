import { ChevronRight, Home } from 'lucide-react';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';


const stats = [
  { title: "Total Lead Recieved", value: 245, change: "+4%", icon: "/totallead.svg" },
  { title: "Assigned Leads", value: 245, change: "+3%", icon: "/assignedlead.svg" },
  { title: "Pending Leads", value: 225, change: "+4%", icon: "/pendinglead.svg" },
  { title: "Completed Jobs", value: 245, change: "+5%", icon: "/completedjob.svg" },
  { title: "Total Engineers", value: 245, change: "+2%", icon: "/totalengineer.svg" },
  { title: "Total Product", value: 105, change: "+10%", icon: "/totalproduct.svg" },
];
  const data = [
    { x: '5k', blue: 22, red: 26 },
    { x: '10k', blue: 73, red: 35 },
    { x: '15k', blue: 35, red: 40 },
    { x: '20k', blue: 40, red: 47 },
    { x: '25k', blue: 52, red: 55 },
    { x: '30k', blue: 42, red: 35 },
    { x: '35k', blue: 28, red: 93 },
    { x: '40k', blue: 58, red: 42 },
    { x: '45k', blue: 28, red: 68 },
    { x: '50k', blue: 35, red: 45 },
    { x: '55k', blue: 95, red: 59 },
    { x: '60k', blue: 48, red: 22 }
  ];

const Dashboard = () => {
  return (
    <div className="bg-[#EBF2F1] min-h-full p-2 ">
      {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <button 
                  className="hover:text-gray-900 transition-colors"
                >
                  <Home size={16} />
                </button>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <button className="text-gray-900 font-medium cursor-pointer">Dashboard</button>
                
              </div>

      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-800 mb-2">Dashboard</h1>
      <hr className="border-gray-300 mb-4" />

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-md px-6 py-8 flex items-center gap-4 border border-gray-100  transition"
          >
            <div className="flex-shrink-0">
              <img src={stat.icon} alt={stat.title} className="w-10 h-10" />
            </div>
            <div>
              <p className="text-black font-[500] text-2xl ml-2 ">{stat.title}</p>
              <h2 className="text-xl font-medim ml-2 text-gray-800">{stat.value}</h2>
              <p className="text-green-500 text-sm ml-2 font-semibold">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-[70vh] bg-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
        <select className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white">
          <option>Daily</option>
        </select>
      </div>
      
      <div className="h-50">
        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="x" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#999', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#999', fontSize: 12 }}
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <Line 
            type="linear" 
            dataKey="blue" 
            stroke="#60a5fa" 
            strokeWidth={2}
            dot={false}
          />
          <Line 
            type="linear" 
            dataKey="red" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
              </ResponsiveContainer>
      </div>
   
    </div>
    </div>
  );
};

export default Dashboard;