import React, { useState, useMemo } from 'react';



const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const EditIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const BuildingIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path>
        <path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M8 10h.01"></path>
        <path d="M8 14h.01"></path><path d="M16 14h.01"></path>
    </svg>
);

const FileTextIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

const XIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);



const StatusBadge = ({ status }) => {
  const baseClasses = "px-2.5 py-1 text-xs font-semibold leading-tight rounded-full";
  const statusClasses = {
    'Active': 'bg-green-100 text-green-800',
    'Paid Off': 'bg-blue-100 text-blue-800',
    'Default': 'bg-red-100 text-red-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
  };
  return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};


const LoanDetailsModal = ({ loan, onClose }) => {
    if (!loan) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900">Loan Details: {loan.loanNo}</h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div><strong className="text-gray-600">Borrower:</strong> <span className="text-gray-800">{loan.borrower}</span></div>
                    <div><strong className="text-gray-600">Date:</strong> <span className="text-gray-800">{new Date(loan.date).toLocaleDateString()}</span></div>
                    <div><strong className="text-gray-600">Loan Amount:</strong> <span className="text-gray-800">${Number(loan.amount).toLocaleString()}</span></div>
                    <div><strong className="text-gray-600">Principal Outstanding (POS):</strong> <span className="text-gray-800">${Number(loan.pos).toLocaleString()}</span></div>
                    <div><strong className="text-gray-600">Loan Type:</strong> <span className="text-gray-800">{loan.loanType}</span></div>
                    <div><strong className="text-gray-600">Status:</strong> <StatusBadge status={loan.status} /></div>
                </div>
                <div className="p-6 border-t border-gray-200">
                     <h4 className="text-lg font-semibold text-gray-800 mb-3">Linked Properties</h4>
                     {loan.linkedProperties.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                           {loan.linkedProperties.map(prop => <li key={prop}>{prop}</li>)}
                        </ul>
                     ) : (
                        <p className="text-gray-500">No properties are linked to this loan.</p>
                     )}
                </div>
                 <div className="px-6 py-3 bg-gray-50 rounded-b-xl text-right">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};



export default function Loans() {
  const initialFormState = {
    id: null,
    loanNo: '',
    borrower: '',
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    pos: '',
    loanType: 'Personal',
    status: 'Active',
    linkedProperties: [],
  };

  const [loans, setLoans] = useState([
    { id: 1, loanNo: 'LN-001', borrower: 'Alice Johnson', date: '2025-08-15', amount: 50000, pos: 45000, loanType: 'Personal', status: 'Active', linkedProperties: ['123 Maple St'] },
    { id: 2, loanNo: 'LN-002', borrower: 'Bob Williams', date: '2025-07-20', amount: 250000, pos: 225000, loanType: 'Home', status: 'Active', linkedProperties: ['456 Oak Ave'] },
    { id: 3, loanNo: 'LN-003', borrower: 'Charlie Brown', date: '2025-09-01', amount: 25000, pos: 25000, loanType: 'Auto', status: 'Processing', linkedProperties: [] },
    { id: 4, loanNo: 'LN-004', borrower: 'Diana Miller', date: '2024-05-10', amount: 15000, pos: 0, loanType: 'Personal', status: 'Paid Off', linkedProperties: [] },
    { id: 5, loanNo: 'LN-005', borrower: 'Ethan Smith', date: '2024-11-30', amount: 500000, pos: 480000, loanType: 'Business', status: 'Active', linkedProperties: ['789 Pine Ln', '101 Birch Rd'] },
    { id: 6, loanNo: 'LN-006', borrower: 'Fiona Davis', date: '2023-01-25', amount: 75000, pos: 75000, loanType: 'Home', status: 'Default', linkedProperties: ['212 Cedar Ct'] },
  ]);

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [filters, setFilters] = useState({
      loanNo: '',
      borrower: '',
      pos: '',
      date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filters, [name]: value });
  };

  const filteredLoans = useMemo(() => {
    return loans.filter(loan => {
        return (
            loan.loanNo.toLowerCase().includes(filters.loanNo.toLowerCase()) &&
            loan.borrower.toLowerCase().includes(filters.borrower.toLowerCase()) &&
            (filters.pos === '' || loan.pos.toString().includes(filters.pos)) &&
            (filters.date === '' || loan.date.includes(filters.date))
        );
    });
  }, [loans, filters]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.loanNo || !formData.borrower || !formData.amount) return;

    if (isEditing) {
      setLoans(loans.map(loan => (loan.id === formData.id ? formData : loan)));
      setIsEditing(false);
    } else {
      const newLoan = { ...formData, id: Date.now() };
      setLoans([...loans, newLoan]);
    }
    setFormData(initialFormState);
  };

  const handleEditClick = (loan) => {
    setIsEditing(true);
    setFormData({ ...loan });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      setLoans(loans.filter(loan => loan.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(initialFormState);
  }


  const handleLinkProperties = (loanNo) => alert(`Opening dialog to link properties for ${loanNo}...`);
  const handleUploadDocs = (loanNo) => alert(`Opening dialog to upload documents for ${loanNo}...`);

  return (
    <>
      <LoanDetailsModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />

      <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Loan Management</h1>
            <p className="text-gray-600 mt-1">Add, view, and manage your loan portfolio.</p>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md sticky top-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <PlusIcon className="w-6 h-6 mr-2 text-indigo-600" />
                  {isEditing ? 'Update Loan' : 'Add New Loan'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="loanNo" className="block text-sm font-medium text-gray-700">Loan No.</label>
                    <input type="text" name="loanNo" id="loanNo" value={formData.loanNo} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                  </div>
                  <div>
                    <label htmlFor="borrower" className="block text-sm font-medium text-gray-700">Borrower</label>
                    <input type="text" name="borrower" id="borrower" value={formData.borrower} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                          <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required placeholder="$" />
                      </div>
                      <div>
                          <label htmlFor="pos" className="block text-sm font-medium text-gray-700">POS</label>
                          <input type="number" name="pos" id="pos" value={formData.pos} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="$" />
                      </div>
                   </div>
                  <div>
                    <label htmlFor="loanType" className="block text-sm font-medium text-gray-700">Loan Type</label>
                    <select name="loanType" id="loanType" value={formData.loanType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Personal</option><option>Home</option><option>Auto</option><option>Business</option><option>Education</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-3 pt-2">
                    <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                      {isEditing ? 'Update Loan' : 'Save Loan'}
                    </button>
                    {isEditing && (
                      <button type="button" onClick={handleCancelEdit} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

      
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-xl font-semibold mb-4">Current Loans ({filteredLoans.length})</h2>
     
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <input type="text" name="loanNo" placeholder="Filter by Loan No..." value={filters.loanNo} onChange={handleFilterChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                          <input type="text" name="borrower" placeholder="Filter by Borrower..." value={filters.borrower} onChange={handleFilterChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                          <input type="text" name="pos" placeholder="Filter by POS..." value={filters.pos} onChange={handleFilterChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                          <input type="date" name="date" value={filters.date} onChange={handleFilterChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                      </div>
                    </div>
                   
                   
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan No.</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">POS</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Properties</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLoans.length > 0 ? (
                                    filteredLoans.map(loan => (
                                        <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => setSelectedLoan(loan)} className="text-indigo-600 hover:text-indigo-900 hover:underline">{loan.loanNo}</button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{loan.borrower}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${Number(loan.amount).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${Number(loan.pos).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(loan.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">{loan.linkedProperties.length}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={loan.status} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button onClick={() => handleLinkProperties(loan.loanNo)} title="Link Properties" className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"><BuildingIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => handleUploadDocs(loan.loanNo)} title="Upload Documents" className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"><FileTextIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => handleEditClick(loan)} title="Edit Loan" className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"><EditIcon className="w-5 h-5"/></button>
                                                    <button onClick={() => handleDeleteClick(loan.id)} title="Delete Loan" className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"><TrashIcon className="w-5 h-5"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-sm text-gray-500">
                                            No loans match the current filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}







