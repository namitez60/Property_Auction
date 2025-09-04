import React, { useState, useMemo } from 'react';


const CheckCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const ClockIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AlertCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const DownloadIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const XIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


const CURRENT_DATE = new Date('2025-09-04T12:00:00Z');
const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const initialSalesData = [
    { id: 'SALE001', propertyName: 'Sunrise Villa, Jaipur', bidder: 'Aarav Sharma', bidAmount: 5250000, auctionEndDate: '2025-08-20T17:00:00Z', paymentStages: { emd: { status: 'Paid', amount: 525000, dueDate: '2025-08-22T23:59:59Z', paidDate: '2025-08-21T10:00:00Z' }, p25: { status: 'Due', amount: 787500, dueDate: '2025-09-05T23:59:59Z', paidDate: null }, p75: { status: 'Pending', amount: 3937500, dueDate: '2025-10-20T23:59:59Z', paidDate: null } }, extension: null },
    { id: 'SALE002', propertyName: 'Heritage Haveli, Jodhpur', bidder: 'Sneha Verma', bidAmount: 8700000, auctionEndDate: '2025-08-15T17:00:00Z', paymentStages: { emd: { status: 'Paid', amount: 870000, dueDate: '2025-08-17T23:59:59Z', paidDate: '2025-08-16T14:30:00Z' }, p25: { status: 'Paid', amount: 1305000, dueDate: '2025-09-01T23:59:59Z', paidDate: '2025-08-30T11:00:00Z' }, p75: { status: 'Pending', amount: 6525000, dueDate: '2025-10-15T23:59:59Z', paidDate: null } }, extension: { stage: 'p75', newDate: '2025-11-15T23:59:59Z', reason: 'Bank loan disbursement delay.', status: 'Pending' } },
    { id: 'SALE003', propertyName: 'Lakeview Apt, Udaipur', bidder: 'Rohan Mehta', bidAmount: 3500000, auctionEndDate: '2025-08-10T17:00:00Z', paymentStages: { emd: { status: 'Paid', amount: 350000, dueDate: '2025-08-12T23:59:59Z', paidDate: '2025-08-11T09:00:00Z' }, p25: { status: 'Overdue', amount: 525000, dueDate: '2025-08-27T23:59:59Z', paidDate: null }, p75: { status: 'Pending', amount: 2625000, dueDate: '2025-10-10T23:59:59Z', paidDate: null } }, extension: null },
];



const PaymentStatusCell = ({ stage }) => {
    if (!stage) return <span className="text-gray-400">N/A</span>;
    const statusMap = {
        Paid: { icon: <CheckCircleIcon className="w-4 h-4 text-green-500" />, text: 'text-green-700' },
        Due: { icon: <ClockIcon className="w-4 h-4 text-blue-500" />, text: 'text-blue-700' },
        Overdue: { icon: <AlertCircleIcon className="w-4 h-4 text-red-500" />, text: 'text-red-700' },
        Pending: { icon: null, text: 'text-gray-500' },
    };
    const { icon, text } = statusMap[stage.status] || statusMap.Pending;
    return (
        <div className="flex flex-col">
            <span className={`font-semibold ${text}`}>{formatCurrency(stage.amount)}</span>
            <span className={`flex items-center text-xs ${text}`}>{icon && <span className="mr-1">{icon}</span>}{stage.status}</span>
        </div>
    );
};

const RecordPaymentModal = ({ sale, onClose, onConfirm }) => {
    const [selectedStage, setSelectedStage] = useState('');
    const unpaidStages = Object.entries(sale.paymentStages).filter(([_, stage]) => stage.status !== 'Paid');

    return (
      <div className="modal-backdrop">
        <div className="modal-container">
          <div className="modal-header">
            <h3>Record Payment for {sale.propertyName}</h3>
            <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
          </div>
          <div className="p-6">
            <p className="mb-4 text-sm">Select the payment stage to mark as paid.</p>
            <select value={selectedStage} onChange={e => setSelectedStage(e.target.value)} className="input-style">
              <option value="">-- Select Stage --</option>
              {unpaidStages.map(([key, stage]) => <option key={key} value={key}>{`(${key.toUpperCase()}) ${formatCurrency(stage.amount)}`}</option>)}
            </select>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn-secondary">Cancel</button>
            <button onClick={() => onConfirm(sale.id, selectedStage)} disabled={!selectedStage} className="btn-primary">Confirm Payment</button>
          </div>
        </div>
      </div>
    );
};

const ManageExtensionModal = ({ sale, onClose, onConfirm }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="modal-header"><h3>Review Extension Request</h3><button onClick={onClose}><XIcon className="w-6 h-6" /></button></div>
                <div className="p-6">
                    <p className="text-sm"><strong>Property:</strong> {sale.propertyName}</p>
                    <p className="text-sm"><strong>Bidder:</strong> {sale.bidder}</p>
                    <p className="text-sm"><strong>Stage:</strong> {sale.extension.stage.toUpperCase()}</p>
                    <p className="text-sm"><strong>Original Due Date:</strong> {formatDate(sale.paymentStages[sale.extension.stage].dueDate)}</p>
                    <p className="text-sm"><strong>Requested Due Date:</strong> {formatDate(sale.extension.newDate)}</p>
                    <p className="text-sm mt-2 p-3 bg-gray-50 rounded-md"><strong>Reason:</strong> "{sale.extension.reason}"</p>
                </div>
                <div className="modal-footer">
                    <button onClick={() => onConfirm(sale.id, 'Rejected')} className="btn-danger">Reject</button>
                    <button onClick={() => onConfirm(sale.id, 'Approved')} className="btn-success">Approve</button>
                </div>
            </div>
        </div>
    );
};


export default function PostAuctionPayments() {
    const [sales, setSales] = useState(initialSalesData);
    const [modal, setModal] = useState({ type: null, data: null });

    const getNextDueDate = (sale) => {
        const upcoming = Object.values(sale.paymentStages).find(s => s.status === 'Due' || s.status === 'Overdue');
        return upcoming ? formatDate(upcoming.dueDate) : 'N/A';
    };
    
    const handleRecordPayment = (saleId, stageKey) => {
        setSales(prevSales => prevSales.map(sale => {
            if (sale.id === saleId) {
                const updatedStages = { ...sale.paymentStages };
                updatedStages[stageKey] = { ...updatedStages[stageKey], status: 'Paid', paidDate: CURRENT_DATE.toISOString() };
                
                
                if (stageKey === 'emd' && updatedStages.p25.status === 'Pending') updatedStages.p25.status = 'Due';
                if (stageKey === 'p25' && updatedStages.p75.status === 'Pending') updatedStages.p75.status = 'Due';

                return { ...sale, paymentStages: updatedStages };
            }
            return sale;
        }));
        setModal({ type: null, data: null });
    };
    
    const handleManageExtension = (saleId, decision) => {
        setSales(prevSales => prevSales.map(sale => {
            if (sale.id === saleId) {
                const updatedSale = { ...sale, extension: { ...sale.extension, status: decision } };
                if (decision === 'Approved') {
                    const stageKey = sale.extension.stage;
                    updatedSale.paymentStages[stageKey].dueDate = sale.extension.newDate;
                }
                return updatedSale;
            }
            return sale;
        }));
        setModal({ type: null, data: null });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-sans">
            {modal.type === 'payment' && <RecordPaymentModal sale={modal.data} onClose={() => setModal({ type: null, data: null })} onConfirm={handleRecordPayment} />}
            {modal.type === 'extension' && <ManageExtensionModal sale={modal.data} onClose={() => setModal({ type: null, data: null })} onConfirm={handleManageExtension} />}

            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Post-Auction & Payments</h1>
                    <p className="text-md text-gray-500 mt-1">Track payments and manage sale completion for won auctions.</p>
                </header>

                <main className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="th-cell">Property & Bidder</th>
                                    <th className="th-cell">Bid Amount</th>
                                    <th className="th-cell">EMD (10%)</th>
                                    <th className="th-cell">25% Payment</th>
                                    <th className="th-cell">75% Balance</th>
                                    <th className="th-cell">Next Due Date</th>
                                    <th className="th-cell">Extension</th>
                                    <th className="th-cell text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sales.map(sale => (
                                    <tr key={sale.id} className="hover:bg-gray-50">
                                        <td className="td-cell"><p className="font-semibold">{sale.propertyName}</p><p className="text-xs text-gray-500">{sale.bidder}</p></td>
                                        <td className="td-cell font-bold text-green-600">{formatCurrency(sale.bidAmount)}</td>
                                        <td className="td-cell"><PaymentStatusCell stage={sale.paymentStages.emd} /></td>
                                        <td className="td-cell"><PaymentStatusCell stage={sale.paymentStages.p25} /></td>
                                        <td className="td-cell"><PaymentStatusCell stage={sale.paymentStages.p75} /></td>
                                        <td className="td-cell font-semibold text-red-600">{getNextDueDate(sale)}</td>
                                        <td className="td-cell">
                                            {sale.extension ? (
                                                sale.extension.status === 'Pending' ? (
                                                    <button onClick={() => setModal({type: 'extension', data: sale})} className="btn-warning text-xs">Review Request</button>
                                                ) : <span className={`font-semibold text-sm ${sale.extension.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>{sale.extension.status}</span>
                                            ) : <span className="text-gray-400 text-xs">None</span>}
                                        </td>
                                        <td className="td-cell text-right space-x-2">
                                            <button onClick={() => setModal({ type: 'payment', data: sale })} className="btn-secondary text-xs">Record Payment</button>
                                            <button onClick={() => alert(`Generating letter for ${sale.propertyName}`)} className="btn-secondary text-xs"><DownloadIcon className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
             <style>{`
                .th-cell { padding: 0.75rem 1.25rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; }
                .td-cell { padding: 1rem 1.25rem; vertical-align: middle; font-size: 0.875rem; color: #111827; }
                .input-style { width: 100%; padding: 0.5rem 1rem; background-color: #f9fafb; border: 1px solid #d1d5db; border-radius: 0.5rem; }
                .btn-primary { padding: 0.5rem 1rem; border-radius: 0.375rem; color: white; background-color: #4f46e5; font-weight: 500; }
                .btn-primary:disabled { background-color: #a5b4fc; cursor: not-allowed; }
                .btn-secondary { padding: 0.5rem 1rem; border-radius: 0.375rem; color: #374151; background-color: white; border: 1px solid #d1d5db; font-weight: 500; }
                .btn-success { padding: 0.5rem 1rem; border-radius: 0.375rem; color: white; background-color: #16a34a; font-weight: 500; }
                .btn-danger { padding: 0.5rem 1rem; border-radius: 0.375rem; color: white; background-color: #dc2626; font-weight: 500; }
                .btn-warning { padding: 0.5rem 1rem; border-radius: 0.375rem; color: #854d0e; background-color: #fef9c3; border: 1px solid #fde68a; font-weight: 500; }
                .modal-backdrop { position: fixed; inset: 0; background-color: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 50; }
                .modal-container { background-color: white; border-radius: 0.75rem; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); width: 100%; max-width: 32rem; }
                .modal-header { padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
                .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #e5e7eb; display: flex; justify-content: flex-end; gap: 0.75rem; background-color: #f9fafb; border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; }
            `}</style>
        </div>
    );
}










