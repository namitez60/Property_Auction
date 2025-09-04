import React, { useState } from 'react';


const CheckCircleIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const XCircleIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
const HandshakeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;
const XIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;


const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
const initialProperties = [
    { id: 'PROP123', name: 'Sunrise Villa, Jaipur', lastAuctionPrice: 5000000, status: 'Available', treaty: null, settlement: null },
    { id: 'PROP456', name: 'Lakeview Apt, Udaipur', lastAuctionPrice: 3200000, status: 'Offer Pending Approval', treaty: { buyer: 'Rohan Mehta', offer: 3250000, status: 'Pending', payments: { p50_1: null, p50_2: null } }, settlement: null },
    { id: 'PROP789', name: 'Heritage Haveli, Jodhpur', lastAuctionPrice: 8500000, status: 'Treaty Approved', treaty: { buyer: 'Sneha Verma', offer: 8600000, status: 'Approved', payments: { p50_1: null, p50_2: null } }, settlement: null },
    { id: 'PROP101', name: 'Commercial Plot, Bhiwadi', lastAuctionPrice: 4200000, status: 'Settled', treaty: null, settlement: { amount: 3800000, date: '2025-08-15' } },
];

const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-5 border-b flex justify-between items-center"><h3 className="text-xl font-semibold">{title}</h3><button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6"/></button></div>
            {children}
        </div>
    </div>
);
const OfferModal = ({ property, onClose, onSubmit }) => {
    const [offer, setOffer] = useState(property.lastAuctionPrice);
    const [buyer, setBuyer] = useState('');
    const isValid = offer >= property.lastAuctionPrice && buyer.trim() !== '';

    return (
        <Modal title={`Make Offer for ${property.name}`} onClose={onClose}>
            <div className="p-6 space-y-4">
                <div><label className="label-style">Last Auction Price</label><p className="p-2 bg-gray-100 rounded-md font-mono">{formatCurrency(property.lastAuctionPrice)}</p></div>
                <div><label htmlFor="buyer" className="label-style">Buyer Name</label><input id="buyer" value={buyer} onChange={e => setBuyer(e.target.value)} className="input-style"/></div>
                <div><label htmlFor="offer" className="label-style">Offer Amount</label><input id="offer" type="number" value={offer} onChange={e => setOffer(Number(e.target.value))} className={`input-style ${offer < property.lastAuctionPrice ? 'border-red-500 ring-red-500' : ''}`} /></div>
                {offer < property.lastAuctionPrice && <p className="text-xs text-red-600">Offer must be equal to or greater than the last auction price.</p>}
            </div>
            <div className="modal-footer"><button onClick={onClose} className="btn-secondary">Cancel</button><button onClick={() => onSubmit(property.id, buyer, offer)} disabled={!isValid} className="btn-primary">Submit for Approval</button></div>
        </Modal>
    );
};
const PaymentModal = ({ property, onClose, onSubmit }) => {
    const { offer, payments } = property.treaty;
    const paymentAmount = offer / 2;

    return (
         <Modal title={`Record Payments for ${property.name}`} onClose={onClose}>
            <div className="p-6 space-y-4">
                <p>Total Offer: <span className="font-bold">{formatCurrency(offer)}</span></p>
                <div className="payment-row"><p>First 50% Payment ({formatCurrency(paymentAmount)})</p>{payments.p50_1 ? <span className="chip-success">Paid</span> : <button onClick={() => onSubmit(property.id, 'p50_1')} className="btn-primary text-xs">Record as Paid</button>}</div>
                <div className="payment-row"><p>Final 50% Payment ({formatCurrency(paymentAmount)})</p>{payments.p50_2 ? <span className="chip-success">Paid</span> : <button onClick={() => onSubmit(property.id, 'p50_2')} disabled={!payments.p50_1} className="btn-primary text-xs">Record as Paid</button>}</div>
            </div>
        </Modal>
    );
};

// --- Main Component ---
export default function PrivateTreatySettlements() {
    const [properties, setProperties] = useState(initialProperties);
    const [modal, setModal] = useState({ type: null, data: null });

    const handleOfferSubmit = (id, buyer, offer) => {
        setProperties(props => props.map(p => p.id === id ? { ...p, status: 'Offer Pending Approval', treaty: { buyer, offer, status: 'Pending', payments: { p50_1: null, p50_2: null } } } : p));
        setModal({ type: null, data: null });
    };

    const handleApproval = (id, decision) => {
        const newStatus = decision === 'Approved' ? 'Treaty Approved' : 'Available';
        setProperties(props => props.map(p => p.id === id ? { ...p, status: newStatus, treaty: { ...p.treaty, status: decision } } : p));
    };
    
    const handlePayment = (id, stage) => {
        setProperties(props => props.map(p => {
            if (p.id === id) {
                const updatedPayments = { ...p.treaty.payments, [stage]: new Date().toISOString() };
                const isComplete = updatedPayments.p50_1 && updatedPayments.p50_2;
                return { ...p, treaty: { ...p.treaty, payments: updatedPayments }, status: isComplete ? 'Payment Complete' : p.status };
            }
            return p;
        }));
        setModal({type: null, data: null});
    };

    const StatusChip = ({ status }) => {
        const statuses = { 'Available': 'chip-gray', 'Offer Pending Approval': 'chip-yellow', 'Treaty Approved': 'chip-blue', 'Payment Complete': 'chip-success', 'Settled': 'chip-green' };
        return <span className={`chip ${statuses[status]}`}>{status}</span>;
    };
    
    return (
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
            {modal.type === 'offer' && <OfferModal property={modal.data} onClose={() => setModal({ type: null, data: null })} onSubmit={handleOfferSubmit} />}
            {modal.type === 'payment' && <PaymentModal property={modal.data} onClose={() => setModal({ type: null, data: null })} onSubmit={handlePayment} />}

            <header className="mb-8"><h1 className="text-3xl font-bold text-gray-900">Private Treaty & Settlements</h1><p className="text-md text-gray-500 mt-1">Manage sales for failed auctions and record settlements.</p></header>
            
            <main className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="th-cell">Property</th>
                                <th className="th-cell">Last Auction Price</th>
                                <th className="th-cell">Current Offer</th>
                                <th className="th-cell">Status</th>
                                <th className="th-cell text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {properties.map(prop => (
                                <tr key={prop.id}>
                                    <td className="td-cell font-semibold">{prop.name}</td>
                                    <td className="td-cell">{formatCurrency(prop.lastAuctionPrice)}</td>
                                    <td className="td-cell">{prop.treaty?.offer ? formatCurrency(prop.treaty.offer) : <span className="text-gray-400">N/A</span>}</td>
                                    <td className="td-cell"><StatusChip status={prop.status} /></td>
                                    <td className="td-cell text-right space-x-2">
                                        {prop.status === 'Available' && <button onClick={() => setModal({ type: 'offer', data: prop })} className="btn-primary">Make Offer</button>}
                                        {prop.status === 'Offer Pending Approval' && (<><button onClick={() => handleApproval(prop.id, 'Approved')} className="btn-success"><CheckCircleIcon className="w-4 h-4 mr-1"/>Approve</button><button onClick={() => handleApproval(prop.id, 'Rejected')} className="btn-danger"><XCircleIcon className="w-4 h-4 mr-1"/>Reject</button></>)}
                                        {prop.status === 'Treaty Approved' && <button onClick={() => setModal({ type: 'payment', data: prop })} className="btn-primary">Record Payment</button>}
                                        {prop.status === 'Available' && <button onClick={() => alert('Opening settlement form...')} className="btn-secondary"><HandshakeIcon className="w-4 h-4 mr-1"/>Settle</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
             <style>{`
                .label-style { display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151; }
                .input-style { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; }
                .input-style:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px #bfdbfe; }
                .btn-primary { display: inline-flex; align-items: center; padding: 0.5rem 1rem; border-radius: 0.375rem; color: white; background-color: #4f46e5; font-weight: 500; }
                .btn-primary:disabled { background-color: #a5b4fc; cursor: not-allowed; }
                .btn-secondary { display: inline-flex; align-items: center; padding: 0.5rem 1rem; border-radius: 0.375rem; color: #374151; background-color: white; border: 1px solid #d1d5db; font-weight: 500; }
                .btn-success { display: inline-flex; align-items: center; padding: 0.5rem 1rem; border-radius: 0.375rem; color: white; background-color: #16a34a; font-weight: 500; }
                .btn-danger { display: inline-flex; align-items: center; padding: 0.5rem 1rem; border-radius: 0.375rem; color: white; background-color: #dc2626; font-weight: 500; }
                .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #e5e7eb; display: flex; justify-content: flex-end; gap: 0.75rem; background-color: #f9fafb; }
                .th-cell { padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #4b5563; text-transform: uppercase; }
                .td-cell { padding: 1rem 1.5rem; font-size: 0.875rem; color: #111827; }
                .chip { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
                .chip-gray { background-color: #f3f4f6; color: #4b5563; } .chip-yellow { background-color: #fef9c3; color: #854d0e; }
                .chip-blue { background-color: #dbeafe; color: #1d4ed8; } .chip-green { background-color: #dcfce7; color: #166534; }
                .chip-success { background-color: #dcfce7; color: #16a34a; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600; }
                .payment-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; }
            `}</style>
        </div>
    );
}






// import React, { useState } from 'react';

// // A reusable component for input fields to keep the code DRY
// const InputField = ({ id, label, type = 'text', value, onChange, placeholder, required = false }) => (
//   <div>
//     <label htmlFor={id} className="block text-sm font-medium text-gray-700">
//       {label}
//     </label>
//     <div className="mt-1">
//       <input
//         type={type}
//         name={id}
//         id={id}
//         value={value}
//         onChange={onChange}
//         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//         placeholder={placeholder}
//         required={required}
//       />
//     </div>
//   </div>
// );

// export default function PrivateTreatySettlements() {
//   // State for the settlement receipts table
//   const [receipts, setReceipts] = useState([
//     { id: 'R001', date: '2025-08-01', amount: 50000 },
//     { id: 'R002', date: '2025-09-02', amount: 75000 },
//   ]);

//   // State for the new receipt form
//   const [newReceipt, setNewReceipt] = useState({ date: '', amount: '' });
  
//   const totalSettlementAmount = 200000; // Example total settlement amount
//   const totalPaid = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
//   const remainingBalance = totalSettlementAmount - totalPaid;

//   const handleReceiptChange = (e) => {
//     const { name, value } = e.target;
//     setNewReceipt(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleAddReceipt = (e) => {
//     e.preventDefault();
//     if (!newReceipt.date || !newReceipt.amount) {
//       alert('Please fill in all fields for the receipt.');
//       return;
//     }
//     const newId = `R${(receipts.length + 1).toString().padStart(3, '0')}`;
//     setReceipts([...receipts, { id: newId, ...newReceipt, amount: parseFloat(newReceipt.amount) }]);
//     setNewReceipt({ date: '', amount: '' }); // Reset form
//   };

//   return (
//     <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Private Treaty & Settlements</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
//         {/* Section 1: Private Treaty Sale */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
//             Private Treaty Sale
//           </h2>
//           <form className="space-y-4">
//             <InputField id="assetId" label="Property / Asset ID" placeholder="e.g., PROP12345" />
//             <div>
//                <label className="block text-sm font-medium text-gray-700">Last Auction Price</label>
//                <p className="mt-1 text-lg font-mono p-2 bg-gray-100 rounded-md">$ 250,000.00</p>
//             </div>
//             <InputField id="salePrice" label="Proposed Sale Price" type="number" placeholder="Must be >= last auction price" />
//             <InputField id="buyerName" label="Proposed Buyer Name" placeholder="e.g., John Doe" />
//             <button
//               type="submit"
//               className="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Submit for Approval
//             </button>
//           </form>
//         </div>

//         {/* Section 2: Record Settlement */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
//             Record Settlement / Normalization
//           </h2>
//           <form className="space-y-4">
//              <InputField id="borrowerId" label="Borrower Account No." placeholder="e.g., LN78910" />
//              <InputField id="settlementDate" label="Settlement Date" type="date" />
//              <InputField id="approvingAuthority" label="Approving Authority" placeholder="e.g., Management Committee, DRT" />
//              <div>
//                 <label htmlFor="approvalDetails" className="block text-sm font-medium text-gray-700">
//                   Approval Details / Reference
//                 </label>
//                 <div className="mt-1">
//                   <textarea
//                     id="approvalDetails"
//                     name="approvalDetails"
//                     rows={3}
//                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     placeholder="e.g., Approved in meeting held on 2025-08-15, Ref: MC/2025/S-04"
//                   ></textarea>
//                 </div>
//              </div>
//              <button
//               type="submit"
//               className="w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//             >
//               Record Settlement
//             </button>
//           </form>
//         </div>

//         {/* Section 3: Receipt Tracking for Settlement Payments */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
//             Receipt Tracking for Settlement Payments
//           </h2>

//           {/* Form to add a new receipt */}
//           <form onSubmit={handleAddReceipt} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6 p-4 border rounded-md bg-gray-50">
//             <InputField id="date" name="date" label="Payment Date" type="date" value={newReceipt.date} onChange={handleReceiptChange} />
//             <InputField id="amount" name="amount" label="Amount Received" type="number" value={newReceipt.amount} onChange={handleReceiptChange} placeholder="0.00" />
//             <div>
//               <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700">Payment Mode</label>
//               <select id="paymentMode" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//                 <option>Bank Transfer</option>
//                 <option>Cheque</option>
//                 <option>Demand Draft</option>
//               </select>
//             </div>
//             <button type="submit" className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//               Add Receipt
//             </button>
//           </form>

//           {/* Table of existing receipts */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt ID</th>
//                   <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {receipts.map((receipt) => (
//                   <tr key={receipt.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.date}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$ {receipt.amount.toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//            {/* Summary of payments */}
//            <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-end space-x-8">
//                 <div className="text-right">
//                     <p className="text-sm text-gray-600">Total Settlement Amount</p>
//                     <p className="text-xl font-semibold text-gray-800">$ {totalSettlementAmount.toLocaleString()}</p>
//                 </div>
//                 <div className="text-right">
//                     <p className="text-sm text-gray-600">Total Paid</p>
//                     <p className="text-xl font-semibold text-green-600">$ {totalPaid.toLocaleString()}</p>
//                 </div>
//                 <div className="text-right">
//                     <p className="text-sm text-gray-600">Remaining Balance</p>
//                     <p className="text-xl font-semibold text-red-600">$ {remainingBalance.toLocaleString()}</p>
//                 </div>
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }