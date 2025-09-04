import React, { useState, useMemo } from 'react';


const UploadCloudIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 16l-4-4-4 4M12 12v9"></path><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"></path><path d="M16 16l-4-4-4 4"></path>
    </svg>
);
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
const BuildingIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="8" y1="20" x2="8" y2="4"></line><line x1="16" y1="20" x2="16" y2="4"></line><line x1="12" y1="20" x2="12" y2="4"></line></svg>
);
const AlertCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

// --- Mock Data ---
const mockAssignedProperties = [
    { id: 1, address: '123 Amer Fort Road, Jaipur', status: 'For Sale', city: 'Jaipur', lastReportDate: '2025-08-28', reports: [ { id: 101, date: '2025-08-28', price: '₹1.5 Cr', details: 'Client interested, wants to negotiate.', files: 5 } ]},
    { id: 4, address: '987 Juhu Beach, Mumbai', status: 'For Sale', city: 'Mumbai', lastReportDate: null, reports: [] },
    { id: 5, address: '456 MG Road, Pune', status: 'Under Offer', city: 'Pune', lastReportDate: '2025-09-02', reports: [ { id: 102, date: '2025-09-02', price: '₹2.1 Cr', details: 'Received an offer from a verified buyer.', files: 3 }, { id: 103, date: '2025-08-15', price: '₹2.2 Cr', details: 'Initial inspection completed.', files: 8 } ]},
];

// --- Helper Components ---
const KpiCard = ({ title, value, icon, color }) => (
    <div className={`bg-white rounded-xl shadow p-5 flex items-start justify-between`}>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
    </div>
);

export default function SalesExecutives() {
    const [properties, setProperties] = useState(mockAssignedProperties);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [fileCount, setFileCount] = useState(0);

    const kpis = useMemo(() => ({
        total: properties.length,
        needsReport: properties.filter(p => p.reports.length === 0).length,
    }), [properties]);

    const handleOpenModal = (property) => {
        setSelectedProperty(property);
        setIsModalOpen(true);
        setFileCount(0);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProperty(null);
    };

    const handleSubmitReport = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newReport = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            price: formData.get('price'),
            details: formData.get('details'),
            files: fileCount
        };

        setProperties(prevProperties =>
            prevProperties.map(prop =>
                prop.id === selectedProperty.id
                    ? { ...prop, reports: [newReport, ...prop.reports], lastReportDate: newReport.date }
                    : prop
            )
        );
        
        alert('Report submitted successfully!');
        handleCloseModal();
    };
    
    const handleFileChange = (e) => {
        setFileCount(e.target.files ? e.target.files.length : 0);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Sales Executive Portal</h1>
                    <p className="text-gray-600 mt-1">Welcome! Here are your assigned properties and tasks.</p>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <KpiCard title="Total Assigned Properties" value={kpis.total} icon={<BuildingIcon className="w-6 h-6"/>} color="bg-indigo-100 text-indigo-600" />
                    <KpiCard title="Properties Needing Report" value={kpis.needsReport} icon={<AlertCircleIcon className="w-6 h-6"/>} color="bg-red-100 text-red-600" />
                </div>
                
                <main className="bg-white rounded-xl shadow-md">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">My Property Portfolio</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {properties.map(prop => (
                            <div key={prop.id} className="p-4 md:p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                                <div>
                                    <p className="font-semibold text-gray-900">{prop.address}</p>
                                    <p className="text-sm text-gray-500">{prop.city}</p>
                                </div>
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="text-sm text-center">
                                         <p className="text-gray-500">Last Activity</p>
                                         <p className="font-medium text-gray-800">{prop.lastReportDate ? new Date(prop.lastReportDate).toLocaleDateString() : 'None'}</p>
                                    </div>
                                     <div className="text-sm text-center">
                                         <p className="text-gray-500">Reports</p>
                                         <p className="font-medium text-gray-800">{prop.reports.length}</p>
                                    </div>
                                    <button onClick={() => handleOpenModal(prop)} className="action-button">
                                        <UploadCloudIcon className="w-5 h-5 mr-2" />
                                        View / Add Report
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Upload Report Modal */}
            {isModalOpen && selectedProperty && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">Property Activity</h3>
                                <p className="text-sm text-gray-500">{selectedProperty.address}</p>
                            </div>
                            <button type="button" onClick={handleCloseModal} className="p-1 rounded-full hover:bg-gray-200"><XIcon className="w-6 h-6"/></button>
                        </div>

                        {/* Past Reports */}
                        <div className="p-6 space-y-4 overflow-y-auto">
                            <h4 className="font-semibold text-gray-800">Past Reports</h4>
                            {selectedProperty.reports.length > 0 ? (
                                <div className="space-y-3 border-l-2 border-gray-200 ml-2 pl-4">
                                {selectedProperty.reports.map(report => (
                                    <div key={report.id} className="relative">
                                         <div className="absolute -left-[23px] top-1 h-3 w-3 bg-indigo-600 rounded-full border-2 border-white"></div>
                                        <p className="text-xs text-gray-500">{new Date(report.date).toLocaleString()}</p>
                                        <p className="font-semibold text-gray-700">Price Feedback: <span className="text-indigo-600">{report.price}</span></p>
                                        <p className="text-sm text-gray-600 mt-1">{report.details}</p>
                                        <p className="text-xs text-gray-400 mt-1">Files Uploaded: {report.files}</p>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No reports have been submitted for this property.</p>
                            )}
                        </div>

                        {/* New Report Form */}
                        <form onSubmit={handleSubmitReport} className="border-t">
                            <div className="p-6 space-y-4">
                                <h4 className="font-semibold text-gray-800">Submit New Report</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Photos & Videos</label>
                                    <label htmlFor="file-upload" className="file-drop-zone">
                                        <UploadCloudIcon className="mx-auto h-10 w-10 text-gray-400"/>
                                        <span className="mt-2 block text-sm text-gray-600">
                                            <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                                        </span>
                                        <p className="text-xs text-gray-500">{fileCount > 0 ? `${fileCount} file(s) selected` : 'PNG, JPG, MP4 up to 10MB'}</p>
                                        <input id="file-upload" name="files" type="file" className="sr-only" multiple onChange={handleFileChange} />
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Tentative Price Feedback</label>
                                    <input type="text" name="price" id="price" className="mt-1 block w-full input-style" placeholder="e.g., ₹1.5 Cr" required />
                                </div>
                                <div>
                                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">Buyer / Broker Details</label>
                                    <textarea name="details" id="details" rows="3" className="mt-1 block w-full input-style" placeholder="Enter any details about potential buyers or brokers..." required></textarea>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">Submit Report</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <style>{`
                .input-style { padding: 0.5rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; width: 100%; transition: border-color 0.2s, box-shadow 0.2s; }
                .input-style:focus { outline: none; border-color: #4F46E5; box-shadow: 0 0 0 2px rgb(79 70 229 / 0.2); }
                .action-button { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: white; background-color: #4338CA; transition: background-color 0.2s; }
                .action-button:hover { background-color: #3730A3; }
                .file-drop-zone { display: block; text-align: center; padding: 1.5rem; border: 2px dashed #D1D5DB; border-radius: 0.375rem; cursor: pointer; transition: border-color 0.2s; }
                .file-drop-zone:hover { border-color: #4F46E5; }
            `}</style>
        </div>
    );
}






