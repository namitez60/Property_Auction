import React, { useState, useMemo } from 'react';

// --- Helper Icons ---
const EyeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const UserCheckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>
  </svg>
);
const BuildingIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="8" y1="20" x2="8" y2="4"></line><line x1="16" y1="20" x2="16" y2="4"></line><line x1="12" y1="20" x2="12" y2="4"></line>
    </svg>
);
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
const RefreshCwIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
);

// --- Mock Data ---
const initialData = {
    'Rajasthan': {
        properties: [
            { id: 1, address: '123 Amer Fort Road, Jaipur', status: 'For Sale', value: 15000000, executiveId: 1, reports: [{ id: 101, exec: 'Anjali Sharma', price: '₹1.5 Cr', details: 'Client interested, wants to negotiate.', photoCount: 3, videoCount: 1 }] },
            { id: 2, address: '456 Lake Pichola, Udaipur', status: 'Under Offer', value: 22000000, executiveId: 2, reports: [{ id: 102, exec: 'Rohan Singh', price: '₹2.2 Cr', details: 'Broker Mr. Verma brought a potential buyer.', photoCount: 5, videoCount: 2 }] },
            { id: 6, address: '789 Mehrangarh Fort, Jodhpur', status: 'Sold', value: 18000000, executiveId: 1, reports: [] },
        ],
        executives: [
            { id: 1, name: 'Anjali Sharma', email: 'anjali.s@example.com' },
            { id: 2, name: 'Rohan Singh', email: 'rohan.s@example.com' },
        ]
    },
    'Maharashtra': {
        properties: [
            { id: 3, address: '789 Marine Drive, Mumbai', status: 'For Sale', value: 55000000, executiveId: 3, reports: [] },
            { id: 4, address: '101 Gateway of India, Mumbai', status: 'Sold', value: 72000000, executiveId: 3, reports: [] },
            { id: 5, address: '212 Shaniwar Wada, Pune', status: 'For Sale', value: 12000000, executiveId: 4, reports: [] },
        ],
        executives: [
            { id: 3, name: 'Priya Patel', email: 'priya.p@example.com' },
            { id: 4, name: 'Vikram Bhosle', email: 'vikram.b@example.com' },
        ]
    }
};

// --- Helper Components ---
const ReportsModal = ({ property, onClose, executives }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
            <div className="p-6 border-b flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">Reports for {property.address}</h3>
                    <p className="text-sm text-gray-500">Assigned to: {executives.find(e => e.id === property.executiveId)?.name}</p>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><XIcon className="w-6 h-6"/></button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                {property.reports.length > 0 ? property.reports.map(report => (
                    <div key={report.id} className="border rounded-lg p-4 bg-gray-50">
                        <p className="font-semibold text-gray-700">Tentative Price: <span className="text-indigo-600">{report.price}</span></p>
                        <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">Details:</span> {report.details}</p>
                        <p className="text-xs text-right text-gray-400 mt-2">Submitted by: {report.exec}</p>
                    </div>
                )) : <p className="text-center text-gray-500 py-8">No reports submitted for this property yet.</p>}
            </div>
        </div>
    </div>
);

const ReassignModal = ({ property, executives, onClose, onReassign }) => {
    const [newExecutiveId, setNewExecutiveId] = useState(property.executiveId);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">Reassign Property</h3>
            <p className="text-sm text-gray-500">{property.address}</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="executive" className="block text-sm font-medium text-gray-700">Select New Executive</label>
              <select id="executive" value={newExecutiveId} onChange={(e) => setNewExecutiveId(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
                {executives.map(exec => <option key={exec.id} value={exec.id}>{exec.name}</option>)}
              </select>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300">Cancel</button>
            <button onClick={() => onReassign(property.id, newExecutiveId)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">Confirm Reassignment</button>
          </div>
        </div>
      </div>
    );
};

const KpiCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="bg-indigo-100 text-indigo-600 rounded-full p-3">{icon}</div>
    </div>
);

// --- Main Component ---
export default function StateHeads() {
    const [data, setData] = useState(initialData);
    const [selectedState, setSelectedState] = useState('Rajasthan');
    const [modal, setModal] = useState({ type: null, data: null }); // type: 'reports' or 'reassign'
    
    const currentStateData = data[selectedState];

    // Performance calculations
    const executivePerformance = useMemo(() => {
        return currentStateData.executives.map(exec => {
            const assignedProperties = currentStateData.properties.filter(p => p.executiveId === exec.id);
            const soldProperties = assignedProperties.filter(p => p.status === 'Sold');
            const totalValue = assignedProperties.reduce((sum, p) => sum + p.value, 0);
            return {
                ...exec,
                propertyCount: assignedProperties.length,
                soldCount: soldProperties.length,
                totalValue,
            };
        });
    }, [currentStateData]);

    const kpis = useMemo(() => {
        const totalValue = currentStateData.properties.reduce((sum, p) => sum + p.value, 0);
        const soldProperties = currentStateData.properties.filter(p => p.status === 'Sold');
        const avgSalePrice = soldProperties.length > 0 ? soldProperties.reduce((sum, p) => sum + p.value, 0) / soldProperties.length : 0;
        return {
            totalValue: `₹${(totalValue / 10000000).toFixed(2)} Cr`,
            propertiesSold: soldProperties.length,
            avgSalePrice: `₹${(avgSalePrice / 10000000).toFixed(2)} Cr`,
        };
    }, [currentStateData]);

    const handleReassign = (propertyId, newExecutiveId) => {
        setData(prevData => {
            const updatedProperties = prevData[selectedState].properties.map(p => 
                p.id === propertyId ? { ...p, executiveId: newExecutiveId } : p
            );
            return {
                ...prevData,
                [selectedState]: { ...prevData[selectedState], properties: updatedProperties }
            };
        });
        setModal({ type: null, data: null });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'For Sale': return 'bg-green-100 text-green-800';
            case 'Under Offer': return 'bg-yellow-100 text-yellow-800';
            case 'Sold': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">State Head Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage properties, executives, and review reports for your state.</p>
                </header>
                
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">Select State</label>
                        <select id="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
                            className="mt-1 block w-full sm:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
                            {Object.keys(data).map(state => <option key={state}>{state}</option>)}
                        </select>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <KpiCard title="Total Property Value" value={kpis.totalValue} icon={<BuildingIcon className="w-6 h-6"/>} />
                    <KpiCard title="Properties Sold" value={kpis.propertiesSold} icon={<UserCheckIcon className="w-6 h-6"/>} />
                    <KpiCard title="Avg. Sale Price" value={kpis.avgSalePrice} icon={<EyeIcon className="w-6 h-6"/>} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Properties Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Properties in {selectedState}</h2>
                        <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
                            {currentStateData.properties.map(prop => {
                                const executive = currentStateData.executives.find(e => e.id === prop.executiveId);
                                return (
                                <div key={prop.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{prop.address}</p>
                                            <p className="text-sm text-gray-500">Assigned to: {executive?.name || 'Unassigned'}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(prop.status)}`}>{prop.status}</span>
                                    </div>
                                    <div className="flex items-center justify-end space-x-2 mt-2">
                                        <button onClick={() => setModal({ type: 'reports', data: prop })} className="action-button text-indigo-600 bg-indigo-100 hover:bg-indigo-200">
                                            <EyeIcon className="w-4 h-4 mr-2"/> View Reports ({prop.reports.length})
                                        </button>
                                         <button onClick={() => setModal({ type: 'reassign', data: prop })} className="action-button text-gray-600 bg-gray-100 hover:bg-gray-200">
                                            <RefreshCwIcon className="w-4 h-4 mr-2"/> Reassign
                                        </button>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                    {/* Executives Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Executives Performance</h2>
                         <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
                            {executivePerformance.map(exec => (
                                <div key={exec.id} className="p-3 border rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="font-semibold">{exec.name}</p>
                                            <p className="text-sm text-gray-500">{exec.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                        <div>
                                            <p className="text-xs text-gray-500">Assigned</p>
                                            <p className="font-bold text-gray-800">{exec.propertyCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Sold</p>
                                            <p className="font-bold text-green-600">{exec.soldCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Portfolio Value</p>
                                            <p className="font-bold text-indigo-600">₹{(exec.totalValue / 10000000).toFixed(2)} Cr</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {modal.type === 'reports' && <ReportsModal property={modal.data} onClose={() => setModal({type: null, data: null})} executives={currentStateData.executives} />}
            {modal.type === 'reassign' && <ReassignModal property={modal.data} executives={currentStateData.executives} onClose={() => setModal({type: null, data: null})} onReassign={handleReassign} />}
            
            <style>{`.action-button { display: inline-flex; align-items: center; padding: 4px 10px; border: 1px solid transparent; font-size: 0.75rem; font-weight: 500; border-radius: 0.375rem; transition: background-color 0.2s; }`}</style>
        </div>
    );
}




