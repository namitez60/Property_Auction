import React, { useState } from 'react';



const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">{title}</h3>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  </div>
);

const InputGroup = ({ label, id, type = "text", placeholder, value, onChange, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    {type === 'select' ? (
        <select id={id} name={id} value={value} onChange={onChange} className="input-style">
            {children}
        </select>
    ) : (
        <input type={type} id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} className="input-style" />
    )}
  </div>
);

const FileUpload = ({ label, id, onFileChange, selectedFile }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
            <div className="text-center">
                <Icon path="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 17.25z" className="mx-auto h-10 w-10 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor={id} className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500">
                        <span>Upload a file</span>
                        <input id={id} name={id} type="file" className="sr-only" onChange={onFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                 {selectedFile ? (
                    <p className="text-xs leading-5 text-green-600 font-medium mt-1">{selectedFile.name}</p>
                ) : (
                    <p className="text-xs leading-5 text-gray-600">PDF, PNG, JPG up to 10MB</p>
                )}
            </div>
        </div>
    </div>
);




export default function AuctionSetup() {
  const [formData, setFormData] = useState({
    auctionDate: new Date().toISOString().slice(0, 10),
    venue: '',
    channel: 'Online',
  });
  
  const [uploadedFiles, setUploadedFiles] = useState({
      newspaperProof: null,
      undertaking: null,
      bidForm: null,
      brokerRegistration: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e, fileType) => {
    if (e.target.files.length > 0) {
      setUploadedFiles(prevState => ({ ...prevState, [fileType]: e.target.files[0] }));
    }
  };

  const handleAction = (action) => {
      alert(`${action} action triggered!`);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Auction Setup</h1>
          <p className="text-md text-gray-500 mt-1">Configure notice details, upload proofs, and manage the auction schedule.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          

          <div className="lg:col-span-2">
            <Card title="Auction Notice Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                    label="Auction Date"
                    id="auctionDate"
                    type="date"
                    value={formData.auctionDate}
                    onChange={handleInputChange}
                />
                 <InputGroup
                    label="Channel"
                    id="channel"
                    type="select"
                    value={formData.channel}
                    onChange={handleInputChange}
                >
                    <option>Online</option>
                    <option>Physical</option>
                    <option>Hybrid</option>
                </InputGroup>
              </div>
              <InputGroup
                    label="Venue / Platform"
                    id="venue"
                    placeholder="e.g., Hotel Marriott, Jaipur or online platform URL"
                    value={formData.venue}
                    onChange={handleInputChange}
                />
            </Card>
          </div>
          

          <div className="lg:col-span-1 space-y-8">
            <Card title="Document Uploads">
                <FileUpload 
                    label="Newspaper Proof" 
                    id="newspaper-proof" 
                    onFileChange={(e) => handleFileChange(e, 'newspaperProof')}
                    selectedFile={uploadedFiles.newspaperProof}
                />
                <FileUpload 
                    label="Undertaking Document" 
                    id="undertaking-doc" 
                    onFileChange={(e) => handleFileChange(e, 'undertaking')}
                    selectedFile={uploadedFiles.undertaking}
                />
                 <FileUpload 
                    label="Bid Form" 
                    id="bid-form" 
                    onFileChange={(e) => handleFileChange(e, 'bidForm')}
                    selectedFile={uploadedFiles.bidForm}
                />
                 <FileUpload 
                    label="Broker Registration Form" 
                    id="broker-reg-form" 
                    onFileChange={(e) => handleFileChange(e, 'brokerRegistration')}
                    selectedFile={uploadedFiles.brokerRegistration}
                />
            </Card>

            <div className="flex flex-col space-y-3">
                <button onClick={() => handleAction('Schedule')} className="action-btn bg-blue-600 hover:bg-blue-700 text-white">
                    Schedule Auction
                </button>
                <button onClick={() => handleAction('Publish')} className="action-btn bg-green-600 hover:bg-green-700 text-white">
                    Publish Now
                </button>
                <button onClick={() => handleAction('Cancel')} className="action-btn bg-red-600 hover:bg-red-700 text-white">
                    Cancel Auction
                </button>
            </div>
          </div>
        </main>
      </div>
      <style>{`
        .input-style {
          width: 100%;
          padding: 0.5rem 1rem;
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          transition: ring 0.2s, border-color 0.2s;
        }
        .input-style:focus {
          outline: none;
          border-color: #3b82f6;
          --tw-ring-color: #3b82f6;
          --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
          --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
          box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        }
        .action-btn {
            width: 100%;
            padding: 0.75rem 1rem;
            font-weight: 600;
            border-radius: 0.5rem;
            transition: background-color 0.2s, box-shadow 0.2s;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        }
         .action-btn:focus {
            outline: none;
            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
            --tw-ring-color: rgba(96, 165, 250, 0.5);
         }
      `}</style>
    </div>
  );
}











