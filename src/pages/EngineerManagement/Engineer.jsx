import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Search, Plus, ChevronLeft, ChevronRight, Edit, Trash2, Eye, MoreVertical, Home } from 'lucide-react';

const Engineer = () => {
  const [data, setData] = useState([
    {
      srNo: 1,
      eid: '512',
      name: 'Raj Sharma',
      contact: '1278945620',
      area: 'Pune',
      performance: 3,
      availability: 'Online'
    },
    {
      srNo: 2,
      eid: '754',
      name: 'Raj Sharma',
      contact: '1278945620',
      area: 'Pune',
      performance: 3,
      availability: 'On Leave'
    },
    {
      srNo: 3,
      eid: '856',
      name: 'Raj Sharma',
      contact: '1278945620',
      area: 'Pune',
      performance: 3,
      availability: 'On Leave'
    },
    {
      srNo: 4,
      eid: '456',
      name: 'Raj Sharma',
      contact: '1278945620',
      area: 'Pune',
      performance: 3,
      availability: 'On Duty'
    },
    {
      srNo: 5,
      eid: '874',
      name: 'Raj Sharma',
      contact: '1278945620',
      area: 'Pune',
      performance: 3,
      availability: 'On Duty'
    }
  ]);

  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  // Performance stars component
  const PerformanceStars = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Availability badge component
  const AvailabilityBadge = ({ status }) => {
    const statusConfig = {
      Online: { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
      'On Leave': { color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
      'On Duty': { color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' }
    };

    const config = statusConfig[status] || statusConfig.Online;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color} flex items-center gap-1`}>
        <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
        {status}
      </span>
    );
  };

  // Columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: 'srNo',
        header: 'Sr.No.',
        cell: info => (
          <span className="text-gray-600 font-medium">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: 'eid',
        header: 'EID',
        cell: info => (
          <span className="font-medium">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'contact',
        header: 'Contact',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'area',
        header: 'Area',
        cell: info => (
          <span className=" text-gray-700 text-sm">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'performance',
        header: 'Performance',
        cell: info => <PerformanceStars rating={info.getValue()} />,
      },
      {
        accessorKey: 'availability',
        header: 'Availability',
        cell: info => <span className={`${info.getValue() === 'Online' ? 'text-green-800' : info.getValue() === 'On Leave' ? 'text-red-800' : 'text-green-800' } `}>
            {info.getValue()}
        </span>
      },
      {
        id: 'actions',
        header: 'Action',
        cell: () => (
          <div className="flex items-center space-x-2">
            <button className=" text-gray-600  rounded transition-colors">
              <Eye size={16} />
            </button>
            <button className=" text-gray-600  rounded transition-colors">
              <Edit size={16} />
            </button>
            <button className="  text-red-700 hover:bg-red-50 rounded transition-colors">
              <Trash2 size={16} />
            </button>
            
            <button className="  px-1 py-0.5 rounded-lg text-sm border border-red-800 text-red-800 transition-colors flex items-center gap-1">
              Assign
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!globalFilter) return data;
    
    return data.filter(engineer =>
      Object.values(engineer).some(value =>
        value.toString().toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
  }, [data, globalFilter]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = currentPage * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Table instance
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalEntries = filteredData.length;
  const startEntry = currentPage * pageSize + 1;
  const endEntry = Math.min((currentPage + 1) * pageSize, totalEntries);
  const totalPages = Math.ceil(totalEntries / pageSize);

  // For API integration
  const fetchEngineers = async (page, size, search) => {
    console.log('Fetching engineers:', { page, size, search });
    // Replace with actual API call:
    // const response = await fetch(`/api/engineers?page=${page}&size=${size}&search=${search}`);
    // const result = await response.json();
    // return result;
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchEngineers(newPage, pageSize, globalFilter);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    setGlobalFilter(searchTerm);
    setCurrentPage(0);
    fetchEngineers(0, pageSize, searchTerm);
  };

  return (
    <div className=" bg-white p-4">
      <div className=" mx-auto bg-white ">

         {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
        <button 
          onClick={() => Navigate('/dashboard')}
          className="hover:text-gray-900 transition-colors cursor-pointer"
        >
          <Home size={16} />
        </button>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span className="text-gray-900 font-medium cursor-pointer">Engineer Management</span>
      </div>
        
        {/* Header */}
        <div className=" py-4 border-b border-gray-400">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Engineer Management</h1>
        </div>

        {/* Controls */}
        <div className="px-6 py-4 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setPageSize(newSize);
                setCurrentPage(0);
                fetchEngineers(0, newSize, globalFilter);
              }}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
            >
              <option value={5}>5 Entries</option>
              <option value={10}>10 Entries</option>
              <option value={25}>25 Entries</option>
              <option value={50}>50 Entries</option>
              <option value={100}>100 Entries</option>
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search engineers..."
                value={globalFilter}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
              />
            </div>
            
            <button className="bg-[#61ae9c] text-white px-3 py-1 rounded-lg hover:bg-[#36a88e] transition-colors flex items-center justify-center gap-2">
            
              Add Service Engineers
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border-b border-gray-400">
          <table className="w-full ">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-100 border-b border-gray-400"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {startEntry} to {endEntry} of {totalEntries} Entries
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-2 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            {[...Array(Math.min(3, totalPages))].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber - 1)}
                  className={`px-3 py-2 border text-sm rounded transition-colors ${
                    currentPage === pageNumber - 1
                      ? 'bg-[#7EC1B1] text-white border-[#7EC1B1]'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="p-2 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engineer;