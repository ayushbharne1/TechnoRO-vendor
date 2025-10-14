import React, { useState, useMemo } from 'react';
import { Eye, Edit, ChevronDown, Search, Home, ChevronRight } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

const Leads = () => {
  const Navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Sample data
  const [data] = useState([
    {
      id: 1,
      leadId: 'OD54487',
      customerName: 'Kathryn Murphy',
      serviceType: 'Repair',
      productModel: 'Kent Grand Plus RO',
      dateReceived: '21-10-2025',
      assignTo: 'Yash S',
      status: 'Completed'
    },
    {
      id: 2,
      leadId: 'OD54487',
      customerName: 'Courtney Henry',
      serviceType: 'Maintenance',
      productModel: 'Kent Grand Plus RO',
      dateReceived: '21-10-2025',
      assignTo: 'Yash S',
      status: 'Completed'
    },
    {
      id: 3,
      leadId: 'OD54487',
      customerName: 'Darlene Robertson',
      serviceType: 'Repair',
      productModel: 'MG678',
      dateReceived: '21-10-2025',
      assignTo: 'NA',
      status: 'Pending'
    },
    {
      id: 4,
      leadId: 'OD54487',
      customerName: 'Savannah Nguyen',
      serviceType: 'Purchase',
      productModel: 'Kent Grand Plus RO',
      dateReceived: '21-10-2025',
      assignTo: 'Yash S',
      status: 'Completed'
    },
    {
      id: 5,
      leadId: 'OD54487',
      customerName: 'Annette Black',
      serviceType: 'Purchase',
      productModel: 'MG678',
      dateReceived: '21-10-2025',
      assignTo: 'NA',
      status: 'Pending'
    },
    {
      id: 6,
      leadId: 'OD54487',
      customerName: 'Brooklyn Simmons',
      serviceType: 'Repair',
      productModel: 'Kent Grand Plus RO',
      dateReceived: '21-10-2025',
      assignTo: 'Yash S',
      status: 'Completed'
    },
    {
      id: 7,
      leadId: 'OD54487',
      customerName: 'Cody Fisher',
      serviceType: 'RO Installation',
      productModel: 'MG678',
      dateReceived: '21-10-2025',
      assignTo: 'NA',
      status: 'Pending'
    },
    {
      id: 8,
      leadId: 'OD54487',
      customerName: 'Theresa Webb',
      serviceType: 'Maintenance',
      productModel: 'Kent Grand Plus RO',
      dateReceived: '21-10-2025',
      assignTo: 'NA',
      status: 'Pending'
    },
    {
      id: 9,
      leadId: 'OD54487',
      customerName: 'Floyd Miles',
      serviceType: 'RO Installation',
      productModel: 'MG678',
      dateReceived: '21-10-2025',
      assignTo: 'Yash S',
      status: 'Completed'
    },
    {
      id: 10,
      leadId: 'OD54487',
      customerName: 'Albert Flores',
      serviceType: 'Purchase',
      productModel: 'Kent Grand Plus RO',
      dateReceived: '21-10-2025',
      assignTo: 'NA',
      status: 'Pending'
    },
    {
      id: 11,
      leadId: 'OD54488',
      customerName: 'Jane Cooper',
      serviceType: 'Repair',
      productModel: 'MG678',
      dateReceived: '22-10-2025',
      assignTo: 'Yash S',
      status: 'Completed'
    },
    {
      id: 12,
      leadId: 'OD54489',
      customerName: 'Robert Fox',
      serviceType: 'Maintenance',
      productModel: 'Kent Grand Plus RO',
      dateReceived: '22-10-2025',
      assignTo: 'NA',
      status: 'Pending'
    },
    {
      id: 13,
      leadId: 'OD54490',
      customerName: 'Jenny Wilson',
      serviceType: 'Purchase',
      productModel: 'MG678',
      dateReceived: '22-10-2025',
      assignTo: 'Yash S',
      status: 'Completed'
    },
    {
      id: 14,
      leadId: 'OD54491',
      customerName: 'Devon Lane',
      serviceType: 'RO Installation',
      productModel: 'Kent Grand Plus RO',
      dateReceived: '23-10-2025',
      assignTo: 'NA',
      status: 'Pending'
    },
    {
      id: 15,
      leadId: 'OD54492',
      customerName: 'Leslie Alexander',
      serviceType: 'Repair',
      productModel: 'MG678',
      dateReceived: '23-10-2025',
      assignTo: 'Yash S',
      status: 'Completed'
    }
  ]);

  // Filter data based on status
  const filteredData = useMemo(() => {
    if (statusFilter === 'All') return data;
    return data.filter(lead => lead.status === statusFilter);
  }, [data, statusFilter]);

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Sr.No.',
        cell: ({ row }) => row.index + 1,
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'leadId',
        header: 'Lead ID',
      },
      {
        accessorKey: 'customerName',
        header: 'Customer Name',
      },
      {
        accessorKey: 'serviceType',
        header: 'Service Type',
      },
      {
        accessorKey: 'productModel',
        header: 'Product Model',
      },
      {
        accessorKey: 'dateReceived',
        header: 'Date Received',
      },
      {
        accessorKey: 'assignTo',
        header: 'Assign To',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue();
          return (
            <span
              className={`inline-block px-3 py-1 text-sm font-medium ${
                status === 'Completed'
                  ? 'text-green-500'
                  : 'text-orange-500'
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(row.original.id)}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Edit"
            >
              <Edit size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => handleView(row.original.id)}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="View"
            >
              <Eye size={18} className="text-gray-600" />
            </button>
          </div>
        ),
        enableGlobalFilter: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleEdit = (leadId) => {
    Navigate('assignlead');
    console.log('Edit lead:', leadId);
  };

  const handleView = (leadId) => {
    Navigate('viewlead');
    // Implement navigation: Navigate('viewlead');
  };

  const handleAddLead = () => {
    Navigate('addlead');
    // Implement navigation: Navigate('addlead');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
        <button 
          onClick={() => Navigate('/dashboard')}
          className="hover:text-gray-900 transition-colors cursor-pointer"
        >
          <Home size={16} />
        </button>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span className="text-gray-900 font-medium cursor-pointer">Lead Management</span>
      </div>

      {/* Header */}
      <h1 className="text-xl font-semibold text-gray-900 mb-3">Lead Management</h1>

      <hr className="border-gray-400 mb-5" />

      {/* Controls Bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <div className="relative">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="appearance-none bg-white border border-gray-300 rounded px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <span className="text-sm text-gray-700">Entries</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent w-64"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Add Lead Button */}
          <button
            onClick={handleAddLead}
            className="text-white px-6 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: '#7EC1B1' }}
          >
            Add Lead
          </button>
        </div>
      </div>
      
      <div className="bg-white ">
        {/* Table */}
        <div className="overflow-x-auto border-b border-gray-400">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b  bg-gray-100 border-gray-400">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-gray-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between  border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {table.getFilteredRowModel().rows.length > 0 ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 : 0} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} Entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => table.setPageIndex(page - 1)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  table.getState().pagination.pageIndex + 1 === page
                    ? 'text-white'
                    : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
                style={table.getState().pagination.pageIndex + 1 === page ? { backgroundColor: '#7EC1B1' } : {}}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;