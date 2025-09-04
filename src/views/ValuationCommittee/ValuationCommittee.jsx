import React, { useState, useMemo } from 'react';

// --- Helper Icons ---
const CheckCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const XCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
const ArrowDownCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>;
const RefreshCwIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>;
const XIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// --- Mock Data ---
const initialProperties = [
    { id: 1, loanNo: 'LN-001', address: '123 Amer Fort Road, Jaipur', currentValue: 14500000, proposedValue: 15000000, executiveFeedback: 'Client is firm on price. Good interest from market.', status: 'Pending Approval', valuations: { original: { amount: 15000000, date: '2025-05-10'}, revised: [{ amount: 14500000, date: '2025-09-22'}], afterPossession: [] }},
    { id: 2, loanNo: 'LN-002', address: '456 Lake Pichola, Udaipur', currentValue: 22000000, proposedValue: 21000000, executiveFeedback: 'Recommends a slight price reduction to attract buyers.', status: 'Pending Approval', valuations: { original: { amount: 22000000, date: '2025-06-01'}, revised: [], afterPossession: [] }},
    { id: 3, loanNo: 'LN-003', address: '789 Marine Drive, Mumbai', currentValue: 55000000, proposedValue: 55000000, executiveFeedback: 'High demand area, should sell quickly.', status: 'Approved', valuations: { original: { amount: 55000000, date: '2025-07-15'}, revised: [], afterPossession: [] }},
    { id: 4, loanNo: 'LN-004', address: '101 Gateway of India, Mumbai', currentValue: 71000000, proposedValue: 70000000, executiveFeedback: 'Needs minor repairs, suggesting revised value.', status: 'Revaluation Required', valuations: { original: { amount: 72000000, date: '2025-08-01'}, revised: [{ amount: 71000000, date: '2025-09-01'}], afterPossession: [] }},
];

// --- Main Component ---
export default function ValuationCommittee() {
    const [properties, setProperties] = useState(initialProperties);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    const handleCommitteeDecision = (propertyId, decision) => {
        setProperties(properties.map(p => p.id === propertyId ? { ...p, status: decision } : p));
        alert(`Property decision set to: ${decision}`);
        setSelectedProperty(null); // Close modal on decision
    };

    const getStatusChip = (status) => {
        const statuses = {
            'Pending Approval': 'bg-yellow-100 text-yellow-800', 'Approved': 'bg-green-100 text-green-800',
            'Revaluation Required': 'bg-blue-100 text-blue-800', 'Rejected': 'bg-red-100 text-red-800',
        };
        return <span className={`px-2 py-1 text-xs font-semibold leading-tight rounded-full ${statuses[status] || 'bg-gray-100'}`}>{status}</span>;
    };
    
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Valuation Committee View</h1>
                    <p className="text-gray-600 mt-1">Review and approve property valuations and sales proposals.</p>
                </header>

                <main className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="th-cell">Property / Loan No.</th>
                                    <th className="th-cell">Current Value</th>
                                    <th className="th-cell">Proposed Value</th>
                                    <th className="th-cell">Executive Feedback</th>
                                    <th className="th-cell">Status</th>
                                    <th className="th-cell text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {properties.map(prop => (
                                    <tr key={prop.id} className="hover:bg-gray-50">
                                        <td className="td-cell">
                                            <p className="font-semibold text-gray-900">{prop.address}</p>
                                            <p className="text-xs text-gray-500">{prop.loanNo}</p>
                                        </td>
                                        <td className="td-cell font-medium text-gray-800">{formatCurrency(prop.currentValue)}</td>
                                        <td className="td-cell font-medium text-indigo-600">{formatCurrency(prop.proposedValue)}</td>
                                        <td className="td-cell text-sm text-gray-600 max-w-xs truncate">{prop.executiveFeedback}</td>
                                        <td className="td-cell">{getStatusChip(prop.status)}</td>
                                        <td className="td-cell text-right">
                                            <button onClick={() => setSelectedProperty(prop)} className="btn-primary">View Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            {selectedProperty && <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} onDecision={handleCommitteeDecision} formatCurrency={formatCurrency} />}
             <style>{`
                .th-cell { padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; }
                .td-cell { padding: 1rem 1.5rem; vertical-align: middle; font-size: 0.875rem; color: #111827; white-space: nowrap; }
                .btn-primary { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: white; background-color: #4f46e5; transition: background-color 0.2s; }
                .btn-primary:hover { background-color: #4338ca; }
            `}</style>
        </div>
    );
}

// --- Details Modal ---
const PropertyDetailsModal = ({ property, onClose, onDecision, formatCurrency }) => {
    const [activeTab, setActiveTab] = useState('valuations');
    const [remarks, setRemarks] = useState('');

    const reducedPrice = property.proposedValue * 0.80;

    const handleDecisionClick = (decision) => {
        if (!remarks) {
            alert("Committee remarks are required before making a decision.");
            return;
        }
        onDecision(property.id, decision);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-5 border-b flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{property.address}</h3>
                        <p className="text-sm text-gray-500">{property.loanNo}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                </div>

                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6 px-5">
                        <TabButton id="valuations" label="Valuations" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <TabButton id="committee" label="Committee Action" activeTab={activeTab} setActiveTab={setActiveTab} />
                    </nav>
                </div>
                
                <div className="p-5 overflow-y-auto flex-grow">
                    {activeTab === 'valuations' && (
                        <div className="space-y-4">
                           <ValuationSection title="Original Valuation" valuation={property.valuations.original} formatCurrency={formatCurrency} />
                           <ValuationSection title="Revised Valuations" valuations={property.valuations.revised} formatCurrency={formatCurrency} />
                           <ValuationSection title="After-Possession Valuations" valuations={property.valuations.afterPossession} formatCurrency={formatCurrency} />
                        </div>
                    )}

                    {activeTab === 'committee' && (
                        <div>
                             <h4 className="text-lg font-semibold text-gray-800 mb-3">Make a Decision</h4>
                             <p className="mb-2 text-sm text-gray-600">Proposed Value: <span className="font-bold text-indigo-600">{formatCurrency(property.proposedValue)}</span></p>
                            <div>
                                <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Committee Remarks</label>
                                <textarea id="remarks" value={remarks} onChange={e => setRemarks(e.target.value)} rows="3" className="mt-1 block w-full input-style" placeholder="Enter decision rationale..."></textarea>
                            </div>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <button onClick={() => handleDecisionClick('Approved')} className="decision-btn bg-green-500 hover:bg-green-600"><CheckCircleIcon className="w-5 h-5 mr-2"/>Approve</button>
                                <button onClick={() => handleDecisionClick('Rejected')} className="decision-btn bg-red-500 hover:bg-red-600"><XCircleIcon className="w-5 h-5 mr-2"/>Reject</button>
                                <button onClick={() => handleDecisionClick('Revaluation Required')} className="decision-btn bg-blue-500 hover:bg-blue-600"><RefreshCwIcon className="w-5 h-5 mr-2"/>Revalue</button>
                                <button onClick={() => handleDecisionClick(`Reduced to ${formatCurrency(reducedPrice)}`)} className="decision-btn bg-yellow-500 hover:bg-yellow-600"><ArrowDownCircleIcon className="w-5 h-5 mr-2"/>Reduce (20%)</button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">Reduced price will be {formatCurrency(reducedPrice)}</p>
                        </div>
                    )}
                </div>
                 <style>{`
                    .input-style { padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; width: 100%; transition: border-color 0.2s, box-shadow 0.2s; }
                    .input-style:focus { outline: none; border-color: #4f46e5; box-shadow: 0 0 0 2px rgb(79 70 229 / 0.2); }
                    .decision-btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.6rem 1rem; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: white; transition: background-color 0.2s; }
                `}</style>
            </div>
        </div>
    );
};

const TabButton = ({ id, label, activeTab, setActiveTab }) => (
    <button onClick={() => setActiveTab(id)}
        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}>
        {label}
    </button>
);

const ValuationSection = ({ title, valuation, valuations, formatCurrency }) => (
     <div>
        <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
        <div className="space-y-2">
            {valuation && <ValuationRow valuation={valuation} formatCurrency={formatCurrency} />}
            {valuations && valuations.length > 0 ? (
                valuations.map((v, i) => <ValuationRow key={i} valuation={v} formatCurrency={formatCurrency} />)
            ) : valuations && <p className="text-sm text-gray-500 px-3">No reports found.</p>}
        </div>
    </div>
);

const ValuationRow = ({ valuation, formatCurrency }) => (
     <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md text-sm">
        <span className="font-medium text-gray-800">{formatCurrency(valuation.amount)}</span>
        <span className="text-gray-500">{new Date(valuation.date).toLocaleDateString('en-GB')}</span>
    </div>
);




// import React, { useState } from 'react';


// const CheckCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
// const XCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
// const ArrowDownCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>;
// const FileTextIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
// const AlertTriangleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
// const UsersIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
// const XIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


// const initialProperties = [
//     {
//         id: 1,
//         address: '123 Amer Fort Road, Jaipur',
//         valuations: [
//             { type: 'Original', amount: 15000000, date: '2023-05-10' },
//             { type: 'Revised', amount: 14500000, date: '2023-09-22' },
//         ],
//         committeeDecisions: [
//             { id: 101, proposal: 'Sell at ₹1.5 Cr', status: 'Approved', date: '2023-05-15', finalAmount: 15000000 },
//             { id: 102, proposal: 'Reduce price for quick sale to ₹1.45 Cr', status: 'Price Reduction', date: '2023-09-25', finalAmount: 14500000 },
//         ],
//         revaluationTriggers: [],
//     },
//     {
//         id: 2,
//         address: '456 Lake Pichola, Udaipur',
//         valuations: [{ type: 'Original', amount: 22000000, date: '2023-06-01' }],
//         committeeDecisions: [
//             { id: 201, proposal: 'Sell at ₹2.2 Cr', status: 'Rejected', date: '2023-06-05', reason: 'Market conditions unfavorable.' },
//         ],
//         revaluationTriggers: [
//              { id: 1, reason: 'Auction bid <60% of first price', date: '2023-11-20' }
//         ],
//     },
// ];

// export default function ValuationCommittee() {
//     const [properties, setProperties] = useState(initialProperties);
//     const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
//     const [isCommitteeModalOpen, setIsCommitteeModalOpen] = useState(false);
//     const [selectedProperty, setSelectedProperty] = useState(null);

//     const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

//     const openValuationModal = (property) => {
//         setSelectedProperty(property);
//         setIsValuationModalOpen(true);
//     };

//     const openCommitteeModal = (property) => {
//         setSelectedProperty(property);
//         setIsCommitteeModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsValuationModalOpen(false);
//         setIsCommitteeModalOpen(false);
//         setSelectedProperty(null);
//     };
    
//     // Logic Handlers
//     const handleAddValuation = (propertyId, newReport) => {
//         setProperties(properties.map(p => 
//             p.id === propertyId ? { ...p, valuations: [...p.valuations, { ...newReport, date: new Date().toISOString().slice(0, 10) }] } : p
//         ));
//     };

//     const handleCommitteeDecision = (propertyId, decision) => {
//          setProperties(properties.map(p => 
//             p.id === propertyId ? { ...p, committeeDecisions: [...p.committeeDecisions, { ...decision, id: Date.now(), date: new Date().toISOString().slice(0, 10) }] } : p
//         ));
//     };

//     const handleRevaluationTrigger = (propertyId) => {
//         const reason = prompt("Please enter the reason for revaluation trigger:", "Auction bid <60% of first price");
//         if (reason) {
//             setProperties(properties.map(p =>
//                 p.id === propertyId ? { ...p, revaluationTriggers: [...p.revaluationTriggers, { id: Date.now(), reason, date: new Date().toISOString().slice(0, 10) }] } : p
//             ));
//         }
//     };

//     // --- Render ---
//     return (
//         <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
//             <div className="max-w-7xl mx-auto">
//                 <header className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900">Valuation & Committee Dashboard</h1>
//                     <p className="text-gray-600 mt-1">Track property valuations, committee decisions, and critical events.</p>
//                 </header>

//                 <main className="space-y-6">
//                     {properties.map(prop => (
//                         <PropertyCard 
//                             key={prop.id} 
//                             property={prop}
//                             formatCurrency={formatCurrency}
//                             onManageValuations={() => openValuationModal(prop)}
//                             onCommitteeActions={() => openCommitteeModal(prop)}
//                             onTriggerRevaluation={() => handleRevaluationTrigger(prop.id)}
//                         />
//                     ))}
//                 </main>
//             </div>
            
//             {isValuationModalOpen && <ValuationModal property={selectedProperty} onClose={closeModal} onAddValuation={handleAddValuation} formatCurrency={formatCurrency} />}
//             {isCommitteeModalOpen && <CommitteeModal property={selectedProperty} onClose={closeModal} onNewDecision={handleCommitteeDecision} formatCurrency={formatCurrency} />}
//         </div>
//     );
// }



// const PropertyCard = ({ property, formatCurrency, onManageValuations, onCommitteeActions, onTriggerRevaluation }) => {
//     const latestValuation = property.valuations.slice(-1)[0];
//     const latestDecision = property.committeeDecisions.slice(-1)[0];

//     const getStatusChip = (status) => {
//         switch (status) {
//             case 'Approved': return <span className="chip bg-green-100 text-green-800"><CheckCircleIcon className="w-4 h-4"/>{status}</span>;
//             case 'Rejected': return <span className="chip bg-red-100 text-red-800"><XCircleIcon className="w-4 h-4"/>{status}</span>;
//             case 'Price Reduction': return <span className="chip bg-yellow-100 text-yellow-800"><ArrowDownCircleIcon className="w-4 h-4"/>{status}</span>;
//             default: return <span className="chip bg-gray-100 text-gray-800">{status}</span>;
//         }
//     };
    
//     return (
//         <div className="bg-white rounded-xl shadow-md p-5">
//             <div className="flex flex-wrap justify-between items-start gap-4">
//                 <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{property.address}</h3>
//                     <div className="flex items-center text-sm text-gray-600 mt-1">
//                         <p>Latest Valuation: <span className="font-bold">{formatCurrency(latestValuation.amount)}</span> on {latestValuation.date}</p>
//                     </div>
//                 </div>
//                 <div className="flex-shrink-0">
//                     {latestDecision && getStatusChip(latestDecision.status)}
//                 </div>
//             </div>
//             {property.revaluationTriggers.length > 0 && (
//                 <div className="mt-3 bg-orange-50 border-l-4 border-orange-400 p-3 text-orange-700 text-sm">
//                     <p className="font-bold">Revaluation Triggered!</p>
//                     <p>{property.revaluationTriggers.slice(-1)[0].reason} on {property.revaluationTriggers.slice(-1)[0].date}</p>
//                 </div>
//             )}
//             <div className="border-t mt-4 pt-4 flex flex-wrap gap-3 items-center justify-end">
//                 <button onClick={onTriggerRevaluation} className="btn-secondary"><AlertTriangleIcon className="w-4 h-4 mr-2"/>Trigger Revaluation</button>
//                 <button onClick={onManageValuations} className="btn-secondary"><FileTextIcon className="w-4 h-4 mr-2"/>Manage Valuations</button>
//                 <button onClick={onCommitteeActions} className="btn-primary"><UsersIcon className="w-4 h-4 mr-2"/>Committee Actions</button>
//             </div>
//              <style>{`
//                 .chip { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
//                 .btn-primary { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: white; background-color: #4f46e5; transition: background-color 0.2s; }
//                 .btn-primary:hover { background-color: #4338ca; }
//                 .btn-secondary { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; border: 1px solid #d1d5db; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: #374151; background-color: white; transition: background-color 0.2s; }
//                 .btn-secondary:hover { background-color: #f9fafb; }
//             `}</style>
//         </div>
//     );
// };

// const ValuationModal = ({ property, onClose, onAddValuation, formatCurrency }) => {
//     const [type, setType] = useState('Revised');
//     const [amount, setAmount] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!amount) return;
//         onAddValuation(property.id, { type, amount: parseFloat(amount) });
//         setAmount('');
//     };

//     return (
//         <ModalBase title={`Valuation Reports: ${property.address}`} onClose={onClose}>
//             <div className="space-y-3">
//                 <h4 className="font-semibold text-gray-700">Existing Reports</h4>
//                 {property.valuations.map((v, i) => (
//                     <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
//                         <span className={`font-medium ${v.type === 'Original' ? 'text-blue-600' : 'text-gray-800'}`}>{v.type}</span>
//                         <span>{formatCurrency(v.amount)}</span>
//                         <span className="text-sm text-gray-500">{v.date}</span>
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={handleSubmit} className="mt-6 border-t pt-4">
//                  <h4 className="font-semibold text-gray-700 mb-3">Add New Report</h4>
//                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                      <div>
//                         <label className="block text-sm font-medium text-gray-700">Report Type</label>
//                         <select value={type} onChange={e => setType(e.target.value)} className="input-style mt-1 w-full">
//                             <option>Revised</option>
//                             <option>After Possession</option>
//                         </select>
//                      </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Valuation Amount</label>
//                         <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 14000000" className="input-style mt-1 w-full" required />
//                      </div>
//                  </div>
//                  <div className="text-right mt-4">
//                      <button type="submit" className="btn-primary">Add Report</button>
//                  </div>
//             </form>
//         </ModalBase>
//     );
// };

// const CommitteeModal = ({ property, onClose, onNewDecision, formatCurrency }) => {
//     const [proposal, setProposal] = useState('');
//     const [reduction, setReduction] = useState(0);

//     const latestProposalAmount = property.committeeDecisions.slice(-1)[0]?.finalAmount || property.valuations.slice(-1)[0].amount;
//     const maxReduction = latestProposalAmount * 0.20;
//     const reducedPrice = latestProposalAmount - reduction;

//     const handleDecision = (status) => {
//         if (!proposal) {
//             alert("Please enter a proposal text.");
//             return;
//         }

//         const decision = { proposal, status };
//         if (status === 'Price Reduction') {
//             if (reduction <= 0 || reduction > maxReduction) {
//                  alert(`Price reduction must be between ₹1 and ${formatCurrency(maxReduction)} (20%).`);
//                  return;
//             }
//             decision.finalAmount = reducedPrice;
//         } else if (status === 'Approved') {
//             decision.finalAmount = latestProposalAmount;
//         }
        
//         onNewDecision(property.id, decision);
//         onClose();
//     };


//     return (
//          <ModalBase title={`Committee Decisions: ${property.address}`} onClose={onClose}>
//             <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
//                 <h4 className="font-semibold text-gray-700">Decision History</h4>
//                  {property.committeeDecisions.map((d) => (
//                     <div key={d.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-md text-sm">
//                         <span className="font-medium flex-1">{d.proposal}</span>
//                         <span className="font-semibold w-32 text-center">{d.status}</span>
//                         <span className="text-gray-500 w-24 text-right">{d.date}</span>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-6 border-t pt-4">
//                  <h4 className="font-semibold text-gray-700 mb-3">New Committee Proposal</h4>
//                  <div>
//                     <label className="block text-sm font-medium text-gray-700">Proposal Text</label>
//                     <textarea value={proposal} onChange={e => setProposal(e.target.value)} rows="2" className="input-style mt-1 w-full" placeholder="e.g., Approve for auction at current valuation"></textarea>
//                  </div>

//                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
//                     <h5 className="font-semibold text-indigo-800">Actions</h5>
//                     <div className="mt-2 flex flex-wrap gap-3 items-center">
//                         <button onClick={() => handleDecision('Approved')} className="btn-secondary flex-1 bg-green-500 text-white hover:bg-green-600">Approve</button>
//                         <button onClick={() => handleDecision('Rejected')} className="btn-secondary flex-1 bg-red-500 text-white hover:bg-red-600">Reject</button>
//                     </div>
//                     <div className="mt-3">
//                          <label className="block text-sm font-medium text-gray-700">Or Reduce Price (Max 20%: {formatCurrency(maxReduction)})</label>
//                          <div className="flex gap-3 mt-1">
//                             <input type="number" value={reduction} onChange={e => setReduction(Math.max(0, parseFloat(e.target.value) || 0))} className="input-style w-full" placeholder="Reduction amount"/>
//                             <button onClick={() => handleDecision('Price Reduction')} className="btn-secondary bg-yellow-500 text-white hover:bg-yellow-600">Reduce</button>
//                          </div>
//                          {reduction > 0 && <p className="text-sm mt-1 text-gray-600">New Price: <span className="font-bold">{formatCurrency(reducedPrice)}</span></p>}
//                     </div>
//                  </div>
//             </div>
//         </ModalBase>
//     );
// };

// const ModalBase = ({ title, onClose, children }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
//             <div className="p-5 border-b flex justify-between items-center">
//                 <h3 className="text-xl font-semibold">{title}</h3>
//                 <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><XIcon className="w-6 h-6"/></button>
//             </div>
//             <div className="p-5">{children}</div>
//         </div>
//          <style>{`
//             .input-style {
//                 padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem;
//                 width: 100%; transition: border-color 0.2s, box-shadow 0.2s;
//             }
//             .input-style:focus {
//                 outline: none; border-color: #4f46e5;
//                 box-shadow: 0 0 0 2px rgb(79 70 229 / 0.2);
//             }
//         `}</style>
//     </div>
// );