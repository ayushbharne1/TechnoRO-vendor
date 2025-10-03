import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  CheckCircle, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  DollarSign,
  AlertCircle,
  X,
  ArrowLeft // Icon for the back button
} from 'lucide-react';

// --- Helper Functions for Styling ---

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'available': return 'text-blue-600 bg-blue-100';
    case 'taken': return 'text-orange-600 bg-orange-100';
    case 'completed': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

// --- Sub Components ---

/**
 * Component for the Modal Backdrop and Container.
 */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  // Note: The title is now handled inside the form components for styling flexibility.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Container styled to look like the mobile screen in the image */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[95vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

/**
 * Reusable Input for the simplified Create Lead form.
 */
const SimpleInput = ({ placeholder, type = 'text', value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    // Tailwind classes matching the style from the image
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
    required
  />
);

/**
 * Component matching the "Create New Leads" screen image.
 */
const CreateLeadFormSimple = ({ formData, setFormData, onSubmit, onClose }) => (
  <div className="p-0">
    {/* Header Section matching the image */}
    <header className="flex items-center justify-start p-4 border-b border-gray-100">
      <button onClick={onClose} className="text-gray-700">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-xl font-semibold text-gray-800 flex-grow text-center mr-6">
        Create New Leads
      </h1>
    </header>

    <form onSubmit={onSubmit} className="p-4 space-y-4 scrollbar-hidden max-h-[calc(90vh-100px)] overflow-y-auto">
      
      <SimpleInput
        placeholder="Customer Name"
        value={formData.customer}
        onChange={(e) => setFormData({...formData, customer: e.target.value})}
      />
      
      <SimpleInput
        placeholder="Address"
        value={formData.location}
        onChange={(e) => setFormData({...formData, location: e.target.value})}
      />
      
      <SimpleInput
        placeholder="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
      />
      
      <SimpleInput
        placeholder="Type Of Service"
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
      />
      
      <SimpleInput
        placeholder="Date"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({...formData, date: e.target.value})}
      />
      
      <SimpleInput
        placeholder="Time"
        type="time"
        value={formData.time}
        onChange={(e) => setFormData({...formData, time: e.target.value})}
      />

      {/* Submit Button - Styled to match the image's green/teal color */}
      <button
        type="submit"
        className="w-full py-3 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out mt-8"
        style={{ backgroundColor: '#78C2AD' }} // The specific green color from the image
      >
        Add Client Data
      </button>
      
      {/* Placeholder for the illustration */}
      <div className="mt-8 pt-4">
          <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center">
              <span className="text-gray-400 text-sm">Illustration Placeholder</span>
              {/* This is where the server/person illustration would go */}
          </div>
      </div>
    </form>
  </div>
);

/**
 * Full form for editing/updating existing leads.
 */
const FullLeadForm = ({ onSubmit, buttonText, formData, setFormData }) => (
    <div className="p-4 ">
        <h2 className="text-xl font-semibold mb-4">Edit Lead Details</h2>
        <form onSubmit={onSubmit} className="p-4 space-y-4 max-h-[calc(90vh-100px)] overflow-y-auto scrollbar-hidden">
            {/* Full form fields here: Title, Customer, Location, Phone, Email, Budget, Category, Priority, Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input type="text" value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
            </div>
            {/* ... other comprehensive fields (Location, Phone, Email, Budget, etc.) ... */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (Address)</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <input type="text" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} placeholder="e.g., $500-800" className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (Type of Service)</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="Installation">Installation</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Repair">Repair</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
            </div>
            <button type="submit" className="w-full bg-[#7EC1B1] text-white py-2 px-4 rounded-md hover:bg-[#60B1a0] transition-colors">{buttonText}</button>
        </form>
    </div>
);

/**
 * Component for displaying a single lead item.
 */
const LeadCard = ({ lead, handleTakeLead, openEditModal, handleUpdateLeadStatus }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{lead.title}</h3>
        <div className="flex gap-2 mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
            {lead.priority.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
            {lead.status.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {lead.status === 'available' && (
          <button
            onClick={() => handleTakeLead(lead.id)}
            className="bg-[#7EC1B1] text-white px-3 py-1 rounded-md text-sm hover:bg-[#60B1a0] transition-colors"
          >
            Take Lead
          </button>
        )}
        {lead.assignedTo === 'current_vendor' && (
          <button
            onClick={() => openEditModal(lead)}
            className="bg-[#7EC1B1] text-white px-3 py-1 rounded-md text-sm hover:bg-[#60B1a0] transition-colors flex items-center justify-center"
            title="Edit Lead"
          >
            <Edit size={14} />
          </button>
        )}
      </div>
    </div>
    
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <User size={16} />
        <span>{lead.customer}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin size={16} />
        <span>{lead.location}</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone size={16} />
        <span>{lead.phone}</span>
      </div>
      <div className="flex items-center gap-2">
        <Mail size={16} />
        <span>{lead.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <DollarSign size={16} />
        <span>{lead.budget}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <span>Created: {lead.createdDate}</span>
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-gray-200">
      <p className="text-sm text-gray-700">{lead.description}</p>
    </div>
    
    {lead.assignedTo === 'current_vendor' && lead.status !== 'completed' && (
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => handleUpdateLeadStatus(lead.id, 'taken')}
          className="bg-orange-600 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-700 transition-colors"
        >
          <Clock size={14} className="inline-block mr-1" /> Re-Open
        </button>
        <button
          onClick={() => handleUpdateLeadStatus(lead.id, 'completed')}
          className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
        >
          <CheckCircle size={14} className="inline-block mr-1" /> Complete
        </button>
      </div>
    )}
  </div>
);


// --- Main Leads Component ---

const Leads = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);

  // The simplified form fields + full form fields for editing
  const initialFormData = {
    // Simplified form fields (from image)
    customer: '',
    location: '', // Address
    phone: '',
    category: '', // Type Of Service
    date: '',     // Date
    time: '',     // Time
    // Full form fields (for edit/data generation)
    title: '',
    email: '',
    budget: '',
    description: '',
    priority: 'medium',
  };

  const [formData, setFormData] = useState(initialFormData);

  // Mock data for demonstration
  useEffect(() => {
    const mockLeads = [
      {
        id: 1,
        title: 'Water Purifier Installation',
        customer: 'John Smith',
        location: 'Downtown, City Center',
        phone: '+1 234-567-8900',
        email: 'john.smith@email.com',
        budget: '$500-800',
        description: 'Need RO water purifier installation for 3BHK apartment',
        status: 'available',
        priority: 'high',
        createdDate: '2024-01-15',
        assignedTo: null,
        category: 'Installation'
      },
      {
        id: 2,
        title: 'RO Service & Maintenance',
        customer: 'Sarah Johnson',
        location: 'Suburb Area, North Zone',
        phone: '+1 234-567-8901',
        email: 'sarah.j@email.com',
        budget: '$100-200',
        description: 'Regular maintenance required for existing RO system',
        status: 'taken',
        priority: 'medium',
        createdDate: '2024-01-14',
        assignedTo: 'current_vendor',
        category: 'Maintenance'
      },
      {
        id: 3,
        title: 'Commercial Water System',
        customer: 'Tech Corp Ltd',
        location: 'Business District',
        phone: '+1 234-567-8902',
        email: 'procurement@techcorp.com',
        budget: '$2000-5000',
        description: 'Large scale water purification system for office building',
        status: 'available',
        priority: 'high',
        createdDate: '2024-01-13',
        assignedTo: null,
        category: 'Commercial'
      }
    ];
    setLeads(mockLeads);
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'available' ? lead.status === 'available' :
                       activeTab === 'my-leads' ? lead.assignedTo === 'current_vendor' :
                       true;
    
    // The filterStatus here filters by Priority ('high', 'medium', 'low')
    const matchesFilter = filterStatus === 'all' || lead.priority === filterStatus;
    
    return matchesSearch && matchesTab && matchesFilter;
  });

  const handleTakeLead = (leadId) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: 'taken', assignedTo: 'current_vendor' }
        : lead
    ));
  };

  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus }
        : lead
    ));
  };

  // Logic for the simplified "Create New Leads" form
  const handleCreateLead = (e) => {
    e.preventDefault();
    const newLead = {
      id: Date.now(),
      // Auto-generate complex fields from simple inputs
      title: `${formData.category || 'Service'} request from ${formData.customer}`, 
      email: 'No Email Provided', 
      budget: 'Negotiable', 
      description: `Service required at ${formData.location} on ${formData.date} at ${formData.time}. Customer phone: ${formData.phone}`,
      priority: formData.priority || 'medium', // Use default or form priority
      
      // Use the simple form fields
      customer: formData.customer,
      location: formData.location,
      phone: formData.phone,
      category: formData.category, 
      
      // Fixed status fields
      status: 'available',
      createdDate: new Date().toISOString().split('T')[0],
      assignedTo: null
    };
    setLeads([...leads, newLead]);
    setFormData(initialFormData); // Reset form
    setShowCreateModal(false);
  };

  // Logic for the comprehensive "Edit Lead" form
  const handleEditLead = (e) => {
    e.preventDefault();
    setLeads(leads.map(lead => 
      lead.id === selectedLead.id 
        ? { 
            ...lead, 
            ...formData, 
            location: formData.location, // Address
            category: formData.category, // Type of Service
            // Preserve creation data
            createdDate: lead.createdDate,
            assignedTo: lead.assignedTo,
            status: lead.status
        }
        : lead
    ));
    setShowEditModal(false);
    setSelectedLead(null);
  };

  const openEditModal = (lead) => {
    setSelectedLead(lead);
    // Populate formData with ALL lead properties for editing
    setFormData({
      title: lead.title,
      customer: lead.customer,
      location: lead.location,
      phone: lead.phone,
      email: lead.email,
      budget: lead.budget,
      description: lead.description,
      priority: lead.priority,
      category: lead.category,
      // Date and Time fields are mock defaults as they aren't stored in the mock data
      date: new Date().toISOString().split('T')[0],
      time: '10:00'
    });
    setShowEditModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setFormData(initialFormData); // Reset form on close
  }


  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
        <button
          onClick={() => {
            setFormData(initialFormData); // Reset to simple state before opening
            setShowCreateModal(true);
          }}
          className="bg-[#7EC1B1] text-white px-4 py-2 rounded-md hover:bg-[#60b1a0] cursor-pointer transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create Lead
        </button>
      </div>

      {/* --- Tabs --- */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'available', label: 'Available Leads', count: leads.filter(l => l.status === 'available').length },
            { id: 'my-leads', label: 'My Leads', count: leads.filter(l => l.assignedTo === 'current_vendor').length },
            { id: 'all', label: 'All Leads', count: leads.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-[#60b1a0] text-[#60b1a0]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* --- Search and Filters --- */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search leads by title, customer, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* --- Leads Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <LeadCard 
              key={lead.id} 
              lead={lead} 
              handleTakeLead={handleTakeLead} 
              openEditModal={openEditModal}
              handleUpdateLeadStatus={handleUpdateLeadStatus}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* --- Create Lead Modal (Uses the simplified form matching the image) --- */}
      <Modal
        isOpen={showCreateModal}
        onClose={closeCreateModal}
      >
        <CreateLeadFormSimple 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleCreateLead} 
            onClose={closeCreateModal}
        />
      </Modal>

      {/* --- Edit Lead Modal (Uses the full form for comprehensive editing) --- */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <FullLeadForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleEditLead} 
            buttonText="Update Lead" 
        />
      </Modal>
    </div>
  );
};

export default Leads;