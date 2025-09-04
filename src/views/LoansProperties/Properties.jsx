import React, { useState, useMemo } from 'react';


const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const UploadCloudIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 16l-4-4-4 4M12 12v9"></path><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"></path><path d="M16 16l-4-4-4 4"></path>
    </svg>
);
const LinkIcon = (props) => (

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.72-1.72"></path>
    </svg>
);
const EditIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);
const TrashIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);
const XIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const TagIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
);

const StatusBadge = ({ status }) => {
  const statusClasses = {
    'For Sale': 'bg-blue-100 text-blue-800',
    'Under Offer': 'bg-yellow-100 text-yellow-800',
    'Sold': 'bg-green-100 text-green-800',
    'Archived': 'bg-gray-100 text-gray-800',
    'In Litigation': 'bg-red-100 text-red-800',
  };
  return <span className={`px-2.5 py-1 text-xs font-semibold leading-tight rounded-full ${statusClasses[status] || 'bg-gray-200 text-gray-800'}`}>{status}</span>;
};



const PropertyDetailsModal = ({ property, onClose }) => {
    const [activeTab, setActiveTab] = useState('general');
    if (!property) return null;
    const tabs = [
        { id: 'general', label: 'General Info' }, { id: 'valuation', label: 'Valuation' },
        { id: 'auction', label: 'Auction Status' }, { id: 'payments', label: 'Payments' },
        { id: 'documents', label: 'Documents' }, { id: 'history', label: 'History' },
    ];
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Property Details</h3>
                        <p className="text-sm text-gray-500">{property.propertyId} - {property.address}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"><XIcon className="w-6 h-6" /></button>
                </div>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="p-6 overflow-y-auto">
                    {activeTab === 'general' && <div>General Information content...</div>}
                    {activeTab === 'valuation' && <div>Valuation details...</div>}
                    {activeTab === 'auction' && <div>Auction Status and history...</div>}
                    {activeTab === 'payments' && <div>Payment records...</div>}
                    {activeTab === 'documents' && <div>Attached documents list...</div>}
                    {activeTab === 'history' && <div>Property event history log...</div>}
                </div>
            </div>
        </div>
    );
};


const PropertyFormModal = ({ isOpen, onClose, isEditing, formData, handleInputChange, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Property' : 'Add New Property'}</h3>
            <button type="button" onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">Property ID</label>
              <input type="text" name="propertyId" id="propertyId" value={formData.propertyId} onChange={handleInputChange} className="mt-1 block w-full input-style" required />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full input-style" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full input-style" required />
                </div>
                <div>
                  <label htmlFor="posAmount" className="block text-sm font-medium text-gray-700">POS Amount</label>
                  <input type="number" name="posAmount" id="posAmount" value={formData.posAmount} onChange={handleInputChange} className="mt-1 block w-full input-style" placeholder="0" />
                </div>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleInputChange} className="mt-1 block w-full select-style">
                <option>For Sale</option>
                <option>Under Offer</option>
                <option>Sold</option>
                <option>Archived</option>
                <option>In Litigation</option>
              </select>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">{isEditing ? 'Save Changes' : 'Add Property'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Properties() {
  const initialFormState = {
    id: null, propertyId: '', address: '', city: '', posAmount: '', status: 'For Sale',
  };

  const [properties, setProperties] = useState([
    { id: 1, propertyId: 'PROP-001', address: '456 Oak Avenue', city: 'Springfield', posAmount: 150000, status: 'For Sale' },
    { id: 2, propertyId: 'PROP-002', address: '789 Pine Street', city: 'Shelbyville', posAmount: 320000, status: 'Under Offer' },
    { id: 3, propertyId: 'PROP-003', address: '101 Maple Drive', city: 'Capital City', posAmount: 0, status: 'Sold' },
    { id: 4, propertyId: 'PROP-004', address: '212 Birch Road', city: 'Springfield', posAmount: 220000, status: 'In Litigation' },
    { id: 5, propertyId: 'PROP-005', address: '333 Cedar Lane', city: 'Ogdenville', posAmount: 95000, status: 'For Sale' },
  ]);

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); 
  const [filters, setFilters] = useState({
    propertyId: '', address: '', city: '', posAmount: '', status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
        return (
            prop.propertyId.toLowerCase().includes(filters.propertyId.toLowerCase()) &&
            prop.address.toLowerCase().includes(filters.address.toLowerCase()) &&
            prop.city.toLowerCase().includes(filters.city.toLowerCase()) &&
            (filters.posAmount === '' || prop.posAmount.toString().includes(filters.posAmount)) &&
            (filters.status === '' || prop.status === filters.status)
        );
    });
  }, [properties, filters]);

  // --- CRUD Handlers ---

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.address || !formData.city || !formData.propertyId) return;

    if (isEditing) {
      setProperties(properties.map(prop => (prop.id === formData.id ? formData : prop)));
    } else {
      const newProperty = { ...formData, id: Date.now(), posAmount: Number(formData.posAmount) || 0 };
      setProperties([...properties, newProperty]);
    }
    setIsFormModalOpen(false); // Close modal on submit
  };
  
  const handleAddProperty = () => {
    setIsEditing(false);
    setFormData(initialFormState);
    setIsFormModalOpen(true);
  };

  const handleEditProperty = (property) => {
    setIsEditing(true);
    setFormData(property);
    setIsFormModalOpen(true);
  };
  
  const handleDeleteProperty = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
        setProperties(properties.filter(prop => prop.id !== id));
    }
  };

  const handleUploadDocs = (propId) => alert(`Uploading documents for ${propId}`);
  const handleLinkLoans = (propId) => alert(`Linking loans for ${propId}`);
  const handleClassify = (propId) => alert(`Classifying property ${propId}`);

  return (
    <>
      <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      <PropertyFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        isEditing={isEditing}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
                <p className="text-gray-600 mt-1">Search, manage, and review your real estate assets.</p>
            </header>

            <main>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                       <h2 className="text-xl font-semibold">Properties ({filteredProperties.length})</h2>
                       <button onClick={handleAddProperty} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                           <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
                           Add Property
                       </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <input type="text" name="propertyId" placeholder="Filter by Property ID..." value={filters.propertyId} onChange={handleFilterChange} className="input-style" />
                        <input type="text" name="address" placeholder="Filter by Address..." value={filters.address} onChange={handleFilterChange} className="input-style" />
                        <input type="text" name="city" placeholder="Filter by City..." value={filters.city} onChange={handleFilterChange} className="input-style" />
                        <input type="number" name="posAmount" placeholder="Filter by POS Amount..." value={filters.posAmount} onChange={handleFilterChange} className="input-style" />
                        <select name="status" value={filters.status} onChange={handleFilterChange} className="select-style">
                            <option value="">All Statuses</option>
                            <option>For Sale</option>
                            <option>Under Offer</option>
                            <option>Sold</option>
                            <option>Archived</option>
                            <option>In Litigation</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map(prop => (
                            <div key={prop.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <div className="p-5 flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="font-bold text-lg text-indigo-700">{prop.propertyId}</p>
                                            <p className="text-sm text-gray-600">{prop.address}, {prop.city}</p>
                                        </div>
                                        <StatusBadge status={prop.status} />
                                    </div>
                                    <p className="text-gray-800 font-semibold text-xl">
                                        POS: ${Number(prop.posAmount).toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-3 bg-gray-50 border-t border-gray-200 rounded-b-xl flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <button onClick={() => handleEditProperty(prop)} title="Edit Property" className="action-button"><EditIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleUploadDocs(prop.propertyId)} title="Upload Docs" className="action-button"><UploadCloudIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleLinkLoans(prop.propertyId)} title="Link Loans" className="action-button"><LinkIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleClassify(prop.propertyId)} title="Classify" className="action-button"><TagIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDeleteProperty(prop.id)} title="Delete Property" className="action-button text-gray-500 hover:text-red-600 hover:bg-red-100"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                    <button onClick={() => setSelectedProperty(prop)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="md:col-span-2 xl:col-span-3 text-center py-16 bg-white rounded-xl shadow-md">
                            <p className="text-gray-500 font-semibold">No properties match the current filters.</p>
                            <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
          <style>{`
              .input-style, .select-style {
                  padding: 0.5rem 0.75rem; background-color: white; border: 1px solid #D1D5DB; border-radius: 0.375rem;
                  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); transition: border-color 0.2s, box-shadow 0.2s;
                  font-size: 0.875rem; width: 100%;
              }
              .input-style:focus, .select-style:focus {
                  outline: none; border-color: #4F46E5; box-shadow: 0 0 0 3px rgb(79 70 229 / 0.2);
              }
              .select-style {
                  -webkit-appearance: none; -moz-appearance: none; appearance: none;
                  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                  background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem;
              }
              .action-button {
                  padding: 0.5rem; color: #4B5563; border-radius: 9999px; transition: color 0.2s, background-color 0.2s;
              }
              .action-button:hover {
                  color: #111827; background-color: #E5E7EB;
              }
           `}</style>
      </div>
    </>
  );
}





