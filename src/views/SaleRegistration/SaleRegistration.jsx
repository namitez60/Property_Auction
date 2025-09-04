import React, { useState } from 'react';


const FileTextIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const CalendarIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const KeyIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>;
const UploadCloudIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16l-4-4-4 4M12 12v9"></path><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"></path><path d="M16 16l-4-4-4 4"></path></svg>;
const AlertTriangleIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const CheckCircleIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;


const initialSalesData = [
    { id: 'SALE002', property: { name: 'Heritage Haveli, Jodhpur' }, buyer: { name: 'Sneha Verma' }, salePrice: 8700000, status: 'Pending Registration', tasks: { saleCertificate: { status: 'Completed', date: '2025-09-02T10:00:00Z' }, authorizationLetter: { status: 'Pending', date: null }, registrar: { status: 'Pending', date: null, document: null }, keyHandover: { status: 'Pending', date: null } }, refund: { required: false, status: 'N/A' } },
    { id: 'SALE004', property: { name: 'Modern Penthouse, Gurgaon' }, buyer: { name: 'Karan Malhotra' }, salePrice: 12500000, status: 'Completed', tasks: { saleCertificate: { status: 'Completed', date: '2025-08-15T11:00:00Z' }, authorizationLetter: { status: 'Completed', date: '2025-08-16T14:00:00Z' }, registrar: { status: 'Completed', date: '2025-08-25T15:30:00Z', document: 'reg_ack_PROP999.pdf' }, keyHandover: { status: 'Completed', date: '2025-08-28T12:00:00Z' } }, refund: { required: false, status: 'N/A' } },
    { id: 'SALE005', property: { name: 'Commercial Plot, Bhiwadi' }, buyer: { name: 'Anjali Desai' }, salePrice: 4500000, status: 'Refund Initiated', tasks: { saleCertificate: { status: 'Completed', date: '2025-08-20T09:00:00Z' }, authorizationLetter: { status: 'Completed', date: '2025-08-21T11:00:00Z' }, registrar: { status: 'Failed', date: null, document: null }, keyHandover: { status: 'Blocked', date: null } }, refund: { required: true, status: 'Processing', reason: 'Land use conversion not approved by local authority.' } },
];

const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';

const TaskRow = ({ icon, title, task, children, completedText }) => {
    const isCompleted = task.status === 'Completed';
    const isPending = task.status === 'Pending';
    const isBlocked = task.status === 'Blocked' || task.status === 'Failed';
    return (
        <div className={`p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isCompleted ? 'bg-green-50' : isBlocked ? 'bg-red-50' : 'bg-gray-50'}`}>
            <div className="flex items-center">
                <div className={`mr-4 ${isCompleted ? 'text-green-500' : isBlocked ? 'text-red-500' : 'text-gray-400'}`}>{icon}</div>
                <div>
                    <h4 className={`font-semibold ${isCompleted ? 'text-green-800' : isBlocked ? 'text-red-800' : 'text-gray-800'}`}>{title}</h4>
                    {isCompleted && <p className="text-xs text-green-600">{completedText}</p>}
                    {isBlocked && <p className="text-xs text-red-600">This step cannot proceed.</p>}
                </div>
            </div>
            {isPending && <div className="w-full sm:w-auto flex-shrink-0">{children}</div>}
        </div>
    );
};

const SaleRegistrationCard = ({ sale, onUpdateTask, onProcessRefund }) => {
    const [regDate, setRegDate] = useState('');
    const [ackFile, setAckFile] = useState(null);

    const handleRecordRegistration = () => {
        if (!regDate || !ackFile) {
            alert('Please provide both registration date and acknowledgment file.');
            return;
        }
        onUpdateTask(sale.id, 'registrar', { date: regDate, document: ackFile.name });
    };

    const getStatusChip = (status) => {
        const classes = { 'Pending Registration': 'bg-blue-100 text-blue-800', 'Completed': 'bg-green-100 text-green-800', 'Refund Initiated': 'bg-yellow-100 text-yellow-800' };
        return <span className={`px-3 py-1 text-xs font-medium rounded-full ${classes[status] || 'bg-gray-100'}`}>{status}</span>;
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border mb-8 hover:shadow-lg">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{sale.property.name}</h2>
                    <p className="text-sm text-gray-500">Buyer: {sale.buyer.name} (Sale ID: {sale.id})</p>
                </div>
                <div className="mt-1">{getStatusChip(sale.status)}</div>
            </div>
            <div className="p-6 space-y-4">
                <TaskRow icon={<FileTextIcon className="w-6 h-6"/>} title="Sale Certificate" task={sale.tasks.saleCertificate} completedText={`Generated on ${formatDate(sale.tasks.saleCertificate.date)}`}>
                    <button onClick={() => onUpdateTask(sale.id, 'saleCertificate')} className="btn-primary">Generate</button>
                </TaskRow>
                <TaskRow icon={<FileTextIcon className="w-6 h-6"/>} title="Employee Authorization Letter" task={sale.tasks.authorizationLetter} completedText={`Generated on ${formatDate(sale.tasks.authorizationLetter.date)}`}>
                    <button onClick={() => onUpdateTask(sale.id, 'authorizationLetter')} disabled={sale.tasks.saleCertificate.status !== 'Completed'} className="btn-primary">Generate</button>
                </TaskRow>
                <TaskRow icon={<CalendarIcon className="w-6 h-6"/>} title="Registration with Registrar" task={sale.tasks.registrar} completedText={`Registered on ${formatDate(sale.tasks.registrar.date)} - Doc: ${sale.tasks.registrar.document}`}>
                    <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
                        <input type="date" value={regDate} onChange={e => setRegDate(e.target.value)} className="input-style" />
                        <label htmlFor={`ack-upload-${sale.id}`} className="btn-secondary flex-1 cursor-pointer"><UploadCloudIcon className="mr-2 h-4 w-4"/><span>{ackFile ? ackFile.name : 'Acknowledgment'}</span></label>
                        <input id={`ack-upload-${sale.id}`} type="file" className="hidden" onChange={e => setAckFile(e.target.files[0])} />
                        <button onClick={handleRecordRegistration} disabled={sale.tasks.authorizationLetter.status !== 'Completed'} className="btn-primary">Submit</button>
                    </div>
                </TaskRow>
                <TaskRow icon={<KeyIcon className="w-6 h-6"/>} title="Key Handover & Final Documents" task={sale.tasks.keyHandover} completedText={`Handed over on ${formatDate(sale.tasks.keyHandover.date)}`}>
                    <button onClick={() => onUpdateTask(sale.id, 'keyHandover')} disabled={sale.tasks.registrar.status !== 'Completed'} className="btn-success">Mark as Complete</button>
                </TaskRow>
            </div>
            {sale.refund.required && (
                <div className="p-6 border-t">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-start">
                        <AlertTriangleIcon className="h-6 w-6 text-yellow-500 mr-4" />
                        <div>
                            <h3 className="font-bold text-yellow-800">Refund Required</h3>
                            <p className="text-sm text-yellow-700 mt-1"><strong>Reason:</strong> {sale.refund.reason}</p>
                            <div className="mt-3">
                                {sale.refund.status === 'Processing' ? (
                                    <button onClick={() => onProcessRefund(sale.id)} className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded hover:bg-yellow-600">Process Refund</button>
                                ) : <p className="text-sm font-semibold text-yellow-900">Status: {sale.refund.status}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function SaleRegistration() {
    const [sales, setSales] = useState(initialSalesData);

    const handleUpdateTask = (saleId, taskName, data) => {
        setSales(prevSales => prevSales.map(sale => {
            if (sale.id === saleId) {
                const updatedTasks = { ...sale.tasks };
                updatedTasks[taskName] = { 
                    status: 'Completed', 
                    date: data?.date || new Date().toISOString(),
                    document: data?.document || null
                };
             
                const newStatus = taskName === 'keyHandover' ? 'Completed' : sale.status;
                return { ...sale, tasks: updatedTasks, status: newStatus };
            }
            return sale;
        }));
    };

    const handleProcessRefund = (saleId) => {
        if (window.confirm('Are you sure you want to mark this refund as completed?')) {
            setSales(prevSales => prevSales.map(sale => {
                if (sale.id === saleId) {
                    return { ...sale, refund: { ...sale.refund, status: 'Completed' } };
                }
                return sale;
            }));
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Sale & Registration</h1>
                    <p className="text-md text-gray-500 mt-1">Complete the final steps for property registration and handover.</p>
                </header>
                <div>
                    {sales.map(sale => (
                        <SaleRegistrationCard key={sale.id} sale={sale} onUpdateTask={handleUpdateTask} onProcessRefund={handleProcessRefund} />
                    ))}
                    {sales.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                            <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties in registration phase</h3>
                            <p className="mt-1 text-sm text-gray-500">All paid properties will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                .btn-primary { padding: 0.5rem 1rem; background-color: #4f46e5; color: white; font-size: 0.875rem; font-weight: 600; border-radius: 0.5rem; transition: background-color 0.2s; }
                .btn-primary:hover { background-color: #4338ca; }
                .btn-primary:disabled { background-color: #a5b4fc; cursor: not-allowed; }
                .btn-secondary { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; background-color: #4b5563; color: white; font-size: 0.875rem; font-weight: 600; border-radius: 0.5rem; transition: background-color 0.2s; }
                .btn-secondary:hover { background-color: #374151; }
                .btn-success { padding: 0.5rem 1rem; background-color: #16a34a; color: white; font-size: 0.875rem; font-weight: 600; border-radius: 0.5rem; transition: background-color 0.2s; }
                .btn-success:hover { background-color: #15803d; }
                .btn-success:disabled { background-color: #86efac; cursor: not-allowed; }
                .input-style { border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); font-size: 0.875rem; padding: 0.5rem 0.75rem; }
            `}</style>
        </div>
    );
}








