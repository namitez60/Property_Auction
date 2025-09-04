import React, { useState } from 'react';


const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);


function MasterListManager({ title, items, setItems }) {
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null); // { id, name }

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim() === '') return;
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: newId, name: newItem.trim() }]);
    setNewItem('');
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (!editingItem || editingItem.name.trim() === '') return;
    setItems(items.map(item => item.id === editingItem.id ? { ...item, name: editingItem.name.trim() } : item));
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`Add new ${title.toLowerCase()}...`}
          className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Add</button>
      </form>
      <ul className="divide-y divide-gray-200">
        {items.map(item => (
          <li key={item.id} className="flex justify-between items-center py-3">
            {editingItem && editingItem.id === item.id ? (
              <form onSubmit={handleUpdateItem} className="flex-grow flex gap-2">
                 <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    className="flex-grow block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    autoFocus
                />
                <button type="submit" className="rounded-md bg-green-600 px-3 py-1 text-sm text-white">Save</button>
                <button type="button" onClick={() => setEditingItem(null)} className="rounded-md bg-gray-200 px-3 py-1 text-sm">Cancel</button>
              </form>
            ) : (
                <>
                <span className="text-gray-700">{item.name}</span>
                <div className="flex gap-3">
                    <button onClick={() => setEditingItem({ id: item.id, name: item.name })} className="text-gray-500 hover:text-blue-600"><PencilIcon /></button>
                    <button onClick={() => handleDeleteItem(item.id)} className="text-gray-500 hover:text-red-600"><TrashIcon /></button>
                </div>
                </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


function UserRolesManager() {
    return <div className="bg-white p-6 rounded-lg shadow-md">... (User Roles & Permissions UI) ...</div>;
}



export default function Masters() {
  const [activeTab, setActiveTab] = useState('propertyTypes');

 
  const [propertyTypes, setPropertyTypes] = useState([
    { id: 1, name: 'Residential House' }, { id: 2, name: 'Commercial Shop' }, { id: 3, name: 'Industrial Plot' }, { id: 4, name: 'Agricultural Land' }, { id: 5, name: 'Apartment / Flat' }
  ]);
  const [auctionStages, setAuctionStages] = useState([
    { id: 1, name: 'Pending Valuation' }, { id: 2, name: 'Pending Committee Approval' }, { id: 3, name: 'Auction Scheduled' }, { id: 4, name: 'Auction Published' }, { id: 5, name: 'Auction Failed' }, { id: 6, name: 'Sold'}
  ]);
   const [nonSalabilityReasons, setNonSalabilityReasons] = useState([
    { id: 1, name: 'Litigation Pending' }, { id: 2, name: 'Property Locked / No Access' }, { id: 3, name: 'Encroachment' }, { id: 4, name: 'Title Deed Not Available' }
  ]);
  const [cities, setCities] = useState([
      { id: 1, name: 'Jaipur' }, { id: 2, name: 'Mumbai' }, { id: 3, name: 'Delhi' }, { id: 4, name: 'Bengaluru' }, { id: 5, name: 'Chennai' }
  ]);
  const [states, setStates] = useState([
      { id: 1, name: 'Rajasthan' }, { id: 2, name: 'Maharashtra' }, { id: 3, name: 'Karnataka' }, { id: 4, name: 'Tamil Nadu' }, { id: 5, name: 'Uttar Pradesh' }
  ]);

  const tabs = [
    { id: 'propertyTypes', label: 'Property Types' },
    { id: 'stages', label: 'Auction Stages' },
    { id: 'reasons', label: 'Non-Salability Reasons' },
    { id: 'cities', label: 'Cities' },
    { id: 'states', label: 'States' },
    { id: 'roles', label: 'User Roles & Permissions' },
  ];

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Masters & Settings</h1>

  
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

    
      <div className="mt-8">
        {activeTab === 'propertyTypes' && (
          <MasterListManager title="Property Types" items={propertyTypes} setItems={setPropertyTypes} />
        )}
        {activeTab === 'stages' && (
           <MasterListManager title="Auction Stages" items={auctionStages} setItems={setAuctionStages} />
        )}
        {activeTab === 'reasons' && (
          <MasterListManager title="Non-Salability Reasons" items={nonSalabilityReasons} setItems={setNonSalabilityReasons} />
        )}
        {activeTab === 'cities' && (
          <MasterListManager title="Cities" items={cities} setItems={setCities} />
        )}
        {activeTab === 'states' && (
          <MasterListManager title="States" items={states} setItems={setStates} />
        )}
        {activeTab === 'roles' && (
         
          <UserRolesManager />
        )}
      </div>
    </div>
  );
}





