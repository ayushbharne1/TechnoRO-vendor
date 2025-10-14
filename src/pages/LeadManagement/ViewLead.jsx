import { Briefcase, Calendar, Car, ChevronRight, Home, MapPin, Package, Phone, PhoneIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const ViewLead = () => {
    const Navigate = useNavigate();
  // Placeholder state for future API integration
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate API call (replace with real API later)
  useEffect(() => {
    setLoading(true);
    // Simulated data, replace with API fetch
    setTimeout(() => {
      setLead({
        id: "OD54875",
        name: "Kathryn Murphy",
        status: "Pending",
        address: "4140 Parker Rd. Allentown, New Mexico 31134",
        phone: "+91 98765 43210",
        serviceType: "Repair",
        product: "Kent Grand Plus RO",
        serviceDateTime: "NA",
        assignTo: "NA",
        problemDescription:
          "Water leakage from the purifier tank, slow water flow and unusual sounds.",
        priceDetails: {
          price: 2499,
          discount: 500,
          platformFee: 1,
          debitCardOff: 100,
          deliveryCharges: 0,
          total: 1900,
        },
        offer: {
          text: "1 Offer Applied On This Order",
          detail: "Debit Card Off ₹100",
        },
        paymentMode: "Debit Card",
        mapImage: "/map-placeholder.png",
        lat: 40.6084,
        lng: -75.4902, // Place a map image in public folder
      });
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-red-500 text-center py-8">
        Lead not found.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-6  font-inter">
     {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <button 
                  onClick={() => Navigate("/dashboard")}
                  className="hover:text-gray-900 transition-colors cursor-pointer "
                >
                  <Home size={16} />
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button onClick={()=>{Navigate("/leads")}} className="text-gray-900 font-medium cursor-pointer">Lead Management</button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button className="text-gray-900 font-medium cursor-pointer">View Lead</button>
              </div>
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Lead Details</h2>
      <hr className="border-gray-200 mb-6" />

      {/* Card */}
      <div className="bg-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{lead.name}</h3>
            <div className="text-gray-500 text-sm mt-1">Lead ID: {lead.id}</div>
          </div>
          <span className={`${
                lead.status === "Completed"
                    ? "bg-green-500"
                    : lead.status === "Pending"
                    ? "bg-yellow-500"
                    : lead.status === "Cancelled"
                    ? "bg-red-500"
                    : ""
                } text-white px-5 py-2 rounded-full font-semibold text-sm mt-4 md:mt-0`}>
            {lead.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Left: Address & Map */}
          <div>
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <MapPin className="h-5 w-5 text-[#6AB8A7]" />
            <span className="font-medium">Service Address</span>
          </div>
          <div className="text-[#6AB8A7] text-sm mb-3">{lead.address}</div>
          <div className=" w-3/4 h-54 border overflow-hidden">
            <MapContainer
              center={[lead.lat, lead.lng]}
              zoom={13}
              style={{ width: "100%", height: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lead.lat, lead.lng]}>
                <Popup>
                  {lead.address}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          </div>
          
          {/* <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="h-5 w-5 text-[#6AB8A7]" />
              <span className="font-medium">Service Address</span>
            </div>
            <div className="text-[#6AB8A7] text-sm mb-3">{lead.address}</div>
            <img
              src={lead.mapImage}
              alt="Map"
              className=" w-full h-48 object-cover border"
            />
          </div> */}
          {/* Right: Details */}
          <div className="grid grid-cols-1 gap-2 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-[#6AB8A7]" />
              <span className="font-medium">Phone No.</span>
              <span className="text-[#6AB8A7] ml-2">{lead.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#6AB8A7]" />
              <span className="font-medium">Service Type</span>
              <span className="text-[#6AB8A7] ml-2">{lead.serviceType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[#6AB8A7]" />
              <span className="font-medium">Product</span>
              <span className="text-[#6AB8A7] ml-2">{lead.product}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#6AB8A7]" />
              <span className="font-medium">Service Date & Time</span>
              <span className="text-[#6AB8A7] ml-2">{lead.serviceDateTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#6AB8A7]" />
              <span className="font-medium">Assign To</span>
              <span className="text-[#6AB8A7] ml-2">{lead.assignTo}</span>
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="flex items-center gap-2 mt-6 mb-1 ">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7"/><path d="M9 6v3l2 2"/></svg>
          <span className="font-medium">Problem Description</span>
        </div>
        <div className="text-[#6AB8A7] text-sm mb-4">
          {lead.problemDescription}
        </div>
      </div>

      {/* Price Details */}
      <div className="bg-white border border-gray-400 p-6 mb-6">
        <div className="font-medium text-gray-800 mb-3">Price Details</div>
        <hr className="border-gray-300 mb-4" />
        <div className="text-sm text-gray-700">
          <div className="flex justify-between py-1">
            <span>Price (1 Items)</span>
            <span>₹{lead.priceDetails.price}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Discount</span>
            <span className="text-green-600">-₹{lead.priceDetails.discount}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Platform Fee</span>
            <span>₹{lead.priceDetails.platformFee}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Debit Card Off</span>
            <span className="text-green-600">-₹{lead.priceDetails.debitCardOff}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Delivery Charges</span>
            <span>
              {lead.priceDetails.deliveryCharges === 0 ? (
                <span className="text-gray-400 line-through">₹100</span>
              ) : (
                <>₹{lead.priceDetails.deliveryCharges}</>
              )}{" "}
              <span className="text-[#6AB8A7] font-medium ml-1">
                {lead.priceDetails.deliveryCharges === 0 ? "Free" : ""}
              </span>
            </span>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span>₹{lead.priceDetails.total}</span>
          </div>
          <hr className="my-2 border-gray-300" />

          {/* Offer */}
          <div className="flex items-center gap-2 mt-3 text-[#6AB8A7]">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7"/><path d="M9 6v3l2 2"/></svg>
            <span className="font-medium">{lead.offer.text}</span>
            <span className="text-gray-500 text-xs">{lead.offer.detail}</span>
          </div>
        </div>
      </div>

      {/* Payment Mode */}
      <div className="bg-white  border border-gray-400 p-4">
        <span className="font-medium text-gray-700">
          Payment Mode : <span className="text-gray-600">{lead.paymentMode}</span>
        </span>
      </div>
    </div>
  );
};

export default ViewLead;