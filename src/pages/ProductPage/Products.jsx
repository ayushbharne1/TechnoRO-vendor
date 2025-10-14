import React, { use, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Eye, Edit2, Trash2, EditIcon, Home, ChevronRight } from "lucide-react";
// import { useProducts } from "../hooks/useProducts"; // Remove this

const Products = () => {
  const Navigate = useNavigate();
  // Placeholder state for products, loading, and error
  const [products, setProducts] = useState([
    {
      id: 1,
      category: "Electronics",
      name: "Smartphone",
      price: "$299",
      warranty: "1 Year",
      description: "A high-quality smartphone with advanced features.",
    },
    {
      id: 2,
      category: "Appliances",
      name: "Washing Machine",
      price: "$499",
      warranty: "2 Years",
      description: "Efficient washing machine with multiple modes.",
    },
    // Add more sample products as needed
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace with API call in the future
  // useEffect(() => {
  //   setLoading(true);
  //   fetch('/api/products')
  //     .then(res => res.json())
  //     .then(data => {
  //       setProducts(data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setError("Failed to fetch products");
  //       setLoading(false);
  //     });
  // }, []);

  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Sr.No." },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "name", header: "Product Name" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "warranty", header: "Warranty" },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
          <span className="truncate block max-w-[200px] text-gray-500">
            {getValue()}
          </span>
        ),
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button className="text-gray-700 hover:text-black"
            onClick={() => Navigate("/products/productdetail")}
            >
              <Eye size={18} />
            </button>
            <button className="text-green-600 hover:text-green-700"
            onClick={() => Navigate("/products/updateproduct")}
            >
              <EditIcon size={18} />
            </button>
            <button className="text-red-500 hover:text-red-600">
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading products...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center py-8">
        ⚠️ {error}
      </div>
    );

  return (
    <div className="bg-white min-h-screen p-4  font-inter">
      {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <button 
                  onClick={() => console.log('Navigate to home')}
                  className="hover:text-gray-900 transition-colors"
                >
                  <Home size={16} />
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button onClick={()=>{Navigate("/products")}} className="text-gray-900 font-medium cursor-pointer">Product</button>
                
              </div>

      <h1 className="text-lg font-semibold text-gray-800 mb-6">Product List</h1>
      <hr className="border-gray-400 mb-6" />

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Show</span>
          <select
            className="border border-gray-300 rounded-md text-sm px-2 py-1.5 focus:outline-none"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-gray-600 text-sm">Entries</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full sm:w-64 px-5 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent"
          />
          <button
            onClick={() => Navigate("/products/addproduct")}
            className="bg-[#6AB8A7] text-white text-sm px-4 py-2 rounded-md hover:bg-[#5AA494] transition">
            Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white  border-b  border-gray-400 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-900 font-medium ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left border-b border-gray-400"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            products.length
          )}{" "}
          of {products.length} Entries
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`px-3 py-1 border rounded-md ${
              table.getCanPreviousPage()
                ? "bg-white text-gray-700 hover:bg-gray-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`px-3 py-1 border rounded-md ${
                table.getState().pagination.pageIndex === i
                  ? "bg-[#6AB8A7] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`px-3 py-1 border rounded-md ${
              table.getCanNextPage()
                ? "bg-white text-gray-700 hover:bg-gray-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;