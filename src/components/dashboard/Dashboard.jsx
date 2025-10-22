import { ChevronRight, Home } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const stats = [
  { title: "Total Lead Recieved", value: 245, change: "+4%", icon: "/totallead.svg" },
  { title: "Assigned Leads", value: 245, change: "+3%", icon: "/assignedlead.svg" },
  { title: "Pending Leads", value: 225, change: "+4%", icon: "/pendinglead.svg" },
  { title: "Completed Jobs", value: 245, change: "+5%", icon: "/completedjob.svg" },
  { title: "Total Engineers", value: 245, change: "+2%", icon: "/totalengineer.svg" },
  { title: "Total Product", value: 105, change: "+10%", icon: "/totalproduct.svg" },
];

  // Data precisely matching the image chart pattern
  const data = [
    { day: 1, Sales: 82, Profit: 80 },
    { day: 2, Sales: 78, Profit: 76 },
    { day: 3, Sales: 62, Profit: 58 },
    { day: 4, Sales: 85, Profit: 80 },
    { day: 5, Sales: 82, Profit: 75 },
    { day: 6, Sales: 78, Profit: 68 },
    { day: 7, Sales: 82, Profit: 78 },
    { day: 8, Sales: 62, Profit: 58 },
    { day: 9, Sales: 55, Profit: 40 },
    { day: 10, Sales: 62, Profit: 60 },
    { day: 11, Sales: 92, Profit: 82 },
    { day: 12, Sales: 82, Profit: 58 },
    { day: 13, Sales: 42, Profit: 42 },
    { day: 14, Sales: 52, Profit: 48 },
    { day: 15, Sales: 28, Profit: 22 },
    { day: 16, Sales: 85, Profit: 22 },
    { day: 17, Sales: 38, Profit: 32 },
    { day: 18, Sales: 98, Profit: 82 },
    { day: 19, Sales: 78, Profit: 75 },
    { day: 20, Sales: 28, Profit: 25 },
    { day: 21, Sales: 38, Profit: 32 },
    { day: 22, Sales: 8, Profit: 40 },
    { day: 23, Sales: 90, Profit: 88 },
    { day: 24, Sales: 78, Profit: 75 },
    { day: 25, Sales: 38, Profit: 35 },
    { day: 26, Sales: 2, Profit: 2 },
    { day: 27, Sales: 2, Profit: 2 },
    { day: 28, Sales: 2, Profit: 2 },
    { day: 29, Sales: 2, Profit: 2 },
    { day: 30, Sales: 2, Profit: 2 },
    { day: 31, Sales: 2, Profit: 2 },
  ];

  const CustomLegend = () => (
    <div className="flex justify-center items-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-white border-2 border-blue-500"></div>
        <span className="text-sm text-gray-600">Sales</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-white border-2 border-orange-400"></div>
        <span className="text-sm text-gray-600">Profit</span>
      </div>
    </div>
  );

const Dashboard = () => {
    const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('October');

  return (
    <div className="bg-white min-h-full p-4">
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
            className="bg-gray-100 rounded-md px-6 py-8 flex items-center gap-4 border border-gray-100  transition"
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
      <div className="w-full h-[70vh] bg-gray-100 rounded-lg p-4"> 
      <div className="rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 ">
          <h2 className="text-xl font-semibold text-gray-800">Revenue Summary</h2>
          <div className="flex gap-3">
            <select 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <select 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className='bg-white py-4'>
          <ResponsiveContainer width="100%" height={400} className="">
          <LineChart 
            data={data}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${value}k`}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              formatter={(value) => `${value}k`}
            />
            <Line 
              type="linear" 
              dataKey="Sales" 
              stroke="#6366f1" 
              strokeWidth={2}
              dot={{ fill: 'white', strokeWidth: 2, r: 4, stroke: '#6366f1' }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="linear" 
              dataKey="Profit" 
              stroke="#fb923c" 
              strokeWidth={2}
              dot={{ fill: 'white', strokeWidth: 2, r: 4, stroke: '#fb923c' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        <CustomLegend />
        </div>
      </div>
    </div>
   
    </div>
   
  );
};

export default Dashboard;