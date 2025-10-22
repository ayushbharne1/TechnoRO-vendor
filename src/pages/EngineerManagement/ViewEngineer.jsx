import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { MapPin, Smartphone, Lock, CheckCircle, Clock, XCircle, PieChart, Eye, ChevronDown } from 'lucide-react';

// Mock data - replace with API data
const mockData = [
  { id: 1, leadId: 'OD54487', customerName: 'Kathryn Murphy', serviceType: 'RO Installation', productModel: 'MG678', orderDate: '21-10-2025', status: 'New' },
  { id: 2, leadId: 'OD54487', customerName: 'Courtney Henry', serviceType: 'RO Uninstallation', productModel: 'MG678', orderDate: '21-10-2025', status: 'New' },
  { id: 3, leadId: 'OD54487', customerName: 'Darlene Robertson', serviceType: 'RO Installation', productModel: 'MG678', orderDate: '21-10-2025', status: 'In-progress' },
  { id: 4, leadId: 'OD54487', customerName: 'Savannah Nguyen', serviceType: 'RO Installation', productModel: 'MG678', orderDate: '21-10-2025', status: 'In-progress' },
  { id: 5, leadId: 'OD54487', customerName: 'Annette Black', serviceType: 'RO Installation', productModel: 'MG678', orderDate: '21-10-2025', status: 'In-progress' },
  { id: 6, leadId: 'OD54487', customerName: 'Brooklyn Simmons', serviceType: 'RO Uninstallation', productModel: 'MG678', orderDate: '21-10-2025', status: 'Completed' },
  { id: 7, leadId: 'OD54487', customerName: 'Cody Fisher', serviceType: 'RO Installation', productModel: 'MG678', orderDate: '21-10-2025', status: 'Completed' },
  { id: 8, leadId: 'OD54487', customerName: 'Theresa Webb', serviceType: 'RO Installation', productModel: 'MG678', orderDate: '21-10-2025', status: 'Completed' },
  { id: 9, leadId: 'OD54487', customerName: 'Floyd Miles', serviceType: 'RO Installation', productModel: 'MG678', orderDate: '21-10-2025', status: 'Completed' },
  { id: 10, leadId: 'OD54487', customerName: 'Albert Flores', serviceType: 'RO Uninstallation', productModel: 'MG678', orderDate: '21-10-2025', status: 'Completed' },
];

const ViewEngineer = () => {
  const [data] = useState(mockData);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);

  // Column definitions
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Sr.No.',
        cell: info => info.getValue(),
        size: 80,
      },
      {
        accessorKey: 'leadId',
        header: 'Lead ID',
        cell: info => info.getValue(),
        size: 120,
      },
      {
        accessorKey: 'customerName',
        header: 'Customer Name',
        cell: info => info.getValue(),
        size: 180,
      },
      {
        accessorKey: 'serviceType',
        header: 'Service Type',
        cell: info => info.getValue(),
        size: 180,
      },
      {
        accessorKey: 'productModel',
        header: 'Product Model',
        cell: info => info.getValue(),
        size: 150,
      },
      {
        accessorKey: 'orderDate',
        header: 'Order Date',
        cell: info => info.getValue(),
        size: 130,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          const statusColors = {
            'New': 'text-yellow-600 bg-yellow-50',
            'In-progress': 'text-blue-600 bg-blue-50',
            'Completed': 'text-green-600 bg-green-50',
          };
          return (
            <span className={`px-3 py-1 rounded-md text-sm font-medium ${statusColors[status]}`}>
              {status}
            </span>
          );
        },
        size: 130,
      },
      {
        id: 'action',
        header: 'Action',
        cell: () => (
          <button className="text-blue-600 hover:text-blue-800">
            <Eye className="w-5 h-5" />
          </button>
        ),
        size: 100,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  const filteredData = useMemo(() => {
    if (!statusFilter) return data;
    return data.filter(item => item.status === statusFilter);
  }, [data, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-600">Engineer Management</span>
        <span className="text-gray-400">›</span>
        <span className="text-blue-600">Service Engineer Details</span>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Service Engineer Details</h1>

      {/* Engineer Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Kathryn Murphy</h2>
          <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium">
            Available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Section */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Assigned Area</span>
              </div>
              <p className="text-gray-500 text-sm">4140 Parker Rd. Allentown, New Mexico 31134</p>
            </div>
            
            {/* Map placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect fill='%23e5e7eb' width='400' height='200'/%3E%3Cpath fill='%239ca3af' d='M0 150 Q100 100 200 150 T400 150 L400 200 L0 200 Z'/%3E%3Cpath fill='%236b7280' d='M50 120 Q150 80 250 120 T450 120' stroke='%234b5563' stroke-width='2' fill='none'/%3E%3C/svg%3E"
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span className="text-sm font-medium">Skill</span>
              </div>
              <p className="text-gray-500 text-sm">RO Installation & Uninstallation</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Smartphone className="w-4 h-4" />
                <span className="text-sm font-medium">Phone No.</span>
              </div>
              <p className="text-gray-500 text-sm">+91 98765 43210</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Password</span>
              </div>
              <p className="text-gray-500 text-sm">Password@123</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-purple-50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Leads Handled</p>
              <p className="text-2xl font-bold text-gray-900">8,478</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Ongoing Leads</p>
              <p className="text-2xl font-bold text-gray-900">234</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Leads Rejected</p>
              <p className="text-2xl font-bold text-gray-900">34</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">94 %</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <PieChart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Leads Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Assigned Leads</h3>

        {/* Table Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="appearance-none border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
            <span className="text-sm text-gray-600">Entries</span>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full md:w-64 border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm text-gray-600">
            Showing {table.getState().pagination.pageIndex * pageSize + 1} to{' '}
            {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, data.length)} of{' '}
            {data.length} Entries
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[1, 2, 3].map(page => (
              <button
                key={page}
                onClick={() => table.setPageIndex(page - 1)}
                className={`px-4 py-2 text-sm border rounded-md ${
                  table.getState().pagination.pageIndex === page - 1
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEngineer;