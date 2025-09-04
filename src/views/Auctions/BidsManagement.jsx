import React, { useState } from 'react';


const mockBids = [
  {
    id: 'BID78901',
    bidder: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      avatarUrl: 'https://placehold.co/40x40/d1d5db/4b5563?text=AS'
    },
    property: {
      name: 'Sunrise Villa, Jaipur',
      id: 'PROP123'
    },
    amount: 5250000, 
    date: '2025-09-04T10:30:00Z',
    status: 'Winning',
    documents: ['kyc_sharma.pdf', 'loan_approval_sharma.pdf']
  },
  {
    id: 'BID78902',
    bidder: {
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      avatarUrl: 'https://placehold.co/40x40/fbcfe8/9d3799?text=PP'
    },
    property: {
      name: 'Sunrise Villa, Jaipur',
      id: 'PROP123'
    },
    amount: 5100000,
    date: '2025-09-04T09:45:00Z',
    status: 'Outbid',
    documents: ['kyc_patel.pdf']
  },
  {
    id: 'BID78903',
    bidder: {
      name: 'Rohan Mehta',
      email: 'rohan.mehta@example.com',
      avatarUrl: 'https://placehold.co/40x40/cce7f5/1e40af?text=RM'
    },
    property: {
      name: 'Lakeview Apartment, Udaipur',
      id: 'PROP456'
    },
    amount: 3500000,
    date: '2025-09-03T14:00:00Z',
    status: 'Pending Review',
    documents: ['kyc_mehta.pdf', 'bank_statement_mehta.pdf']
  },
  {
    id: 'BID78904',
    bidder: {
        name: 'Sneha Verma',
        email: 'sneha.verma@example.com',
        avatarUrl: 'https://placehold.co/40x40/fed7aa/c2410c?text=SV'
    },
    property: {
        name: 'Heritage Haveli, Jodhpur',
        id: 'PROP789'
    },
    amount: 8700000,
    date: '2025-09-02T18:15:00Z',
    status: 'Accepted',
    documents: ['kyc_verma.pdf', 'proof_of_funds_verma.pdf']
  },
  {
    id: 'BID78905',
    bidder: {
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        avatarUrl: 'https://placehold.co/40x40/bbf7d0/166534?text=VS'
    },
    property: {
        name: 'Lakeview Apartment, Udaipur',
        id: 'PROP456'
    },
    amount: 3450000,
    date: '2025-09-03T11:20:00Z',
    status: 'Rejected',
    documents: []
  },
];



const SearchIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FilterIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const DownloadIcon = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const MoreHorizontalIcon = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
    </svg>
);

const StatusBadge = ({ status }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full inline-block";
  const statusClasses = {
    'Winning': 'bg-green-100 text-green-800',
    'Outbid': 'bg-yellow-100 text-yellow-800',
    'Pending Review': 'bg-blue-100 text-blue-800',
    'Accepted': 'bg-emerald-100 text-emerald-800',
    'Rejected': 'bg-red-100 text-red-800',
  };
  return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};



export default function BidsManagement() {
  const [bids, setBids] = useState(mockBids);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBids = bids
    .filter(bid => {
      const bidderName = bid.bidder.name.toLowerCase();
      const propertyName = bid.property.name.toLowerCase();
      const search = searchTerm.toLowerCase();
      return bidderName.includes(search) || propertyName.includes(search);
    })
    .filter(bid => {
      if (statusFilter === 'All') return true;
      return bid.status === statusFilter;
    });

  const uniqueStatuses = ['All', ...new Set(mockBids.map(bid => bid.status))];

  const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
      }).format(amount);
  }

  const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-IN', options);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Bids Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage all bids placed on properties.
          </p>
        </div>

     
        <div className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by bidder or property..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                     <FilterIcon className="text-gray-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                    >
                        {uniqueStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

       
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">Bidder</th>
                            <th scope="col" className="px-6 py-3">Property</th>
                            <th scope="col" className="px-6 py-3">Bid Amount</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Documents</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBids.length > 0 ? (
                            filteredBids.map((bid) => (
                            <tr key={bid.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img className="w-10 h-10 rounded-full" src={bid.bidder.avatarUrl} alt={`${bid.bidder.name} avatar`} />
                                        <div className="pl-3">
                                            <div className="font-semibold text-gray-900">{bid.bidder.name}</div>
                                            <div className="text-gray-500">{bid.bidder.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-medium text-gray-800">{bid.property.name}</div>
                                  <div className="text-xs text-gray-400">ID: {bid.property.id}</div>
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900 text-base">{formatCurrency(bid.amount)}</td>
                                <td className="px-6 py-4">{formatDate(bid.date)}</td>
                                <td className="px-6 py-4"><StatusBadge status={bid.status} /></td>
                                <td className="px-6 py-4">
                                    {bid.documents.length > 0 ? (
                                        <div className="flex flex-col space-y-1">
                                            {bid.documents.map(doc => (
                                                <a href="#" key={doc} className="flex items-center text-blue-600 hover:text-blue-800 hover:underline text-xs">
                                                    <DownloadIcon className="mr-1.5" />
                                                    {doc}
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-xs italic">No documents</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
                                      <MoreHorizontalIcon />
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-500">
                                    No bids found for the selected criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-between items-center p-4 border-t">
                <span className="text-sm text-gray-700">
                    Showing <span className="font-semibold">1</span> to <span className="font-semibold">{filteredBids.length}</span> of <span className="font-semibold">{bids.length}</span> Results
                </span>
                <div className="inline-flex rounded-md shadow-sm">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
                        Previous
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-r border-gray-300 rounded-r-md hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}


