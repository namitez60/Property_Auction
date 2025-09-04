import React, { useState } from 'react';


const UserPlusIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>;
const PencilIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0l2.652 2.652M12 21v-4.5m0 4.5h4.5" /></svg>;
const ToggleOnIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>;
const ToggleOffIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>;
const XIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;



const initialUsers = [
    { id: 1, name: 'Rakesh Gupta', email: 'rakesh.g@example.com', role: 'State Head', reportsTo: 'Management', status: 'Active' },
    { id: 2, name: 'Anjali Sharma', email: 'anjali.s@example.com', role: 'Sales Executive', reportsTo: 'Rakesh Gupta', status: 'Active' },
    { id: 3, name: 'Vikram Singh', email: 'vikram.s@example.com', role: 'Sales Executive', reportsTo: 'Rakesh Gupta', status: 'Inactive' },
    { id: 4, name: 'Priya Patel', email: 'priya.p@example.com', role: 'State Head', reportsTo: 'Management', status: 'Active' },
    { id: 5, name: 'Suresh Kumar', email: 'suresh.k@example.com', role: 'Admin', reportsTo: 'System', status: 'Active' },
];
const roles = ['Admin', 'State Head', 'Sales Executive'];


const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-semibold leading-tight rounded-full ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {status}
    </span>
);

const UserModal = ({ isOpen, onClose, onSave, user, stateHeads }) => {
    const [formData, setFormData] = useState(user || { name: '', email: '', role: 'Sales Executive', reportsTo: '', status: 'Active' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-5 border-b flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{user?.id ? 'Edit User' : 'Add New User'}</h3>
                        <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6"/></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label htmlFor="name" className="label-style">Full Name</label><input id="name" name="name" value={formData.name} onChange={handleChange} className="input-style" required /></div>
                            <div><label htmlFor="email" className="label-style">Email Address</label><input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="input-style" required /></div>
                        </div>
                        <div><label htmlFor="role" className="label-style">Assign Role</label><select id="role" name="role" value={formData.role} onChange={handleChange} className="input-style">{roles.map(r => <option key={r}>{r}</option>)}</select></div>
                        {formData.role === 'Sales Executive' && (
                            <div><label htmlFor="reportsTo" className="label-style">Link to State Head</label><select id="reportsTo" name="reportsTo" value={formData.reportsTo} onChange={handleChange} className="input-style" required><option value="">-- Select Head --</option>{stateHeads.map(h => <option key={h.id}>{h.name}</option>)}</select></div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-primary">Save User</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default function UserRoleManagement() {
    const [users, setUsers] = useState(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const stateHeads = users.filter(u => u.role === 'State Head');

    const handleOpenModal = (user = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingUser(null);
        setIsModalOpen(false);
    };

    const handleSaveUser = (userData) => {
        if (userData.id) { 
            setUsers(users.map(u => u.id === userData.id ? userData : u));
        } else { 
            const newUser = { ...userData, id: Date.now() }; 
            setUsers([...users, newUser]);
        }
        handleCloseModal();
    };

    const handleToggleStatus = (userId) => {
        const user = users.find(u => u.id === userId);
        if(window.confirm(`Are you sure you want to ${user.status === 'Active' ? 'deactivate' : 'activate'} ${user.name}?`)) {
            setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
        }
    };
    
    return (
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
             {isModalOpen && <UserModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveUser} user={editingUser} stateHeads={stateHeads} />}
            <header className="flex flex-col md:flex-row justify-between md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User & Role Management</h1>
                    <p className="text-md text-gray-500 mt-1">Create users, assign roles, and manage system access.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="btn-primary mt-4 md:mt-0"><UserPlusIcon className="w-5 h-5 mr-2"/>Add New User</button>
            </header>
            
            <main className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="th-cell">User</th>
                                <th className="th-cell">Role</th>
                                <th className="th-cell">Reports To</th>
                                <th className="th-cell">Status</th>
                                <th className="th-cell text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="td-cell"><div className="font-semibold">{user.name}</div><div className="text-xs text-gray-500">{user.email}</div></td>
                                    <td className="td-cell">{user.role}</td>
                                    <td className="td-cell">{user.reportsTo}</td>
                                    <td className="td-cell"><StatusBadge status={user.status}/></td>
                                    <td className="td-cell text-right space-x-2">
                                        <button onClick={() => handleOpenModal(user)} title="Edit" className="action-btn hover:bg-blue-100 text-blue-600"><PencilIcon className="w-5 h-5"/></button>
                                        {user.status === 'Active' ? (
                                            <button onClick={() => handleToggleStatus(user.id)} title="Deactivate" className="action-btn hover:bg-red-100 text-red-600"><ToggleOffIcon className="w-5 h-5"/></button>
                                        ) : (
                                            <button onClick={() => handleToggleStatus(user.id)} title="Activate" className="action-btn hover:bg-green-100 text-green-600"><ToggleOnIcon className="w-5 h-5"/></button>
                                        )}
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
                .btn-primary { display: inline-flex; align-items: center; padding: 0.6rem 1.2rem; border-radius: 0.5rem; color: white; background-color: #4f46e5; font-weight: 600; }
                .btn-secondary { padding: 0.5rem 1rem; border-radius: 0.375rem; color: #374151; background-color: white; border: 1px solid #d1d5db; font-weight: 500; }
                .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid #e5e7eb; display: flex; justify-content: flex-end; gap: 0.75rem; background-color: #f9fafb; border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; }
                .th-cell { padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #4b5563; text-transform: uppercase; }
                .td-cell { padding: 1rem 1.5rem; font-size: 0.875rem; color: #111827; }
                .action-btn { padding: 0.5rem; border-radius: 9999px; transition: background-color 0.2s; }
            `}</style>
        </div>
    );
}