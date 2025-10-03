import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import arrowup from "../assets/arrow-up.png";
import arrowdown from "../assets/arrow-down.png";
import edit from "../assets/edit.png";
import trash from "../assets/trash.png";

const Product = () => {
    const [rows, setRows] = useState([
        { id: 1, category: "Web", product: "Filter membrane", price: "$3000", warranty: "NA", status: "Published" },
        { id: 2, category: "Optimization", product: "On-page & Off-page", price: "$1500", warranty: "NA", status: "UnPublished" },
        { id: 3, category: "Graphic Design", product: "Logo & Branding", price: "$1000", warranty: "NA", status: "Published" },
        { id: 4, category: "Marketing", product: "Social Media Marketing", price: "$2000", warranty: "6 months", status: "UnPublished" },
    ]);

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const handleClick = () => navigate('/addproduct');
    const handleRowsPerPage = (e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    };

    const filteredRows = rows.filter((row) =>
        row.product.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) setPage(newPage);
    };

    return (
        <div className="bg-gray-100 ">
            <div className="bg-white flex justify-between my-4 p-6 text-gray-600 font-semibold">
                <div>
                    <span>Show</span>
                    <input type="number" value={rowsPerPage} onChange={handleRowsPerPage} className="p-2 border mx-4" min="1" max="50" />
                    <span>Entries</span>
                </div>
                <div>
                    <label>Search:</label>
                    <input type="text" placeholder="Search product" value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 border rounded ml-2" />
                </div>
                <button onClick={handleClick} className="bg-[#7EC1B1] w-[200px] text-white p-2 rounded-lg">Add Product</button>
            </div>

            <div className="bg-white p-5">
                <table className="table-auto w-full border border-gray-400">
                    <thead>
                        <tr className="bg-gray-300 text-xl text-center">
                            <th className="h-[80px]">Sr. No.<img src={arrowup} alt="up" className="inline w-4 h-6 ml-2" />
                                <img src={arrowdown} alt="down" className="inline w-4 h-6 " /> </th>
                            <th className="p-2">
                                Category
                                <img src={arrowup} alt="up" className="inline w-4 h-6 ml-2" /><img src={arrowdown} alt="down" className="inline w-4 h-6" /></th>
                            <th className="p-2"> Product Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Warranty</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {paginatedRows.map((row, index) => (
                            <tr key={row.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-gray-500 font-semibold h-[80px]`}>
                                <td className="p-2">{row.id}</td>
                                <td className="p-2">{row.category}</td>
                                <td className="p-2">{row.product}</td>
                                <td className="p-2">{row.price}</td>
                                <td className="p-2">{row.warranty}</td>
                                <td >
                                    <div className={`p-2 ${row.status === "Published" ? "text-blue-500" : "text-red-500"} border rounded-4xl`}>{row.status}
                                    </div>
                                </td>
                                <td className="p-2 pt-5 flex gap-4 justify-center">
                                    <div className="bg-[#007AFF] h-[36px] w-[36px] p-2 rounded"><img src={edit} alt="edit" className="w-5 h-5 cursor-pointer" /></div>
                                    <div className="bg-[#C17E7F] p-2 h-[36px] w-[36px] rounded"><img src={trash} alt="delete" className="w-5 h-5 cursor-pointer" /></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center font-semibold text-xl text-gray-700 mt-10">
                    <span>Showing {Math.min((page - 1) * rowsPerPage + 1, filteredRows.length)} to {Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} entries</span>
                    <div className="flex gap-2 text-[#7EC1B1] text-lg">
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-4 py-2 border border-[#7EC1B1] rounded-lg">Previous</button>
                        {[...Array(totalPages)].map((_, idx) => (
                            <button key={idx} onClick={() => handlePageChange(idx + 1)} className={`p-2 border rounded-lg border-[#7EC1B1] ${page === idx + 1 ? "bg-[#7EC1B1] text-white" : ""} w-[40px]`}>{idx + 1}</button>
                        ))}
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-4 py-2 border border-[#7EC1B1] rounded-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;