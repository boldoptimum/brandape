

import React, { useState, useEffect } from 'react';
import { AppView, User, UserType } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ArrowLeftIcon from '../../components/icons/ArrowLeftIcon';

interface AdminEditUserScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  editingUser: User | null;
  onUpdateUser: (updatedUser: User) => void;
  notifications: any[];
}

const AdminEditUserScreen: React.FC<AdminEditUserScreenProps> = ({ user, onNavigate, onLogout, editingUser, onUpdateUser, notifications }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>(UserType.BUYER);
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Suspended'>('Active');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setUserType(editingUser.type);
      setStatus(editingUser.status);
    }
  }, [editingUser]);

  if (!editingUser) {
    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_USERS} notifications={notifications}>
            <div className="text-center">
                <h2 className="text-xl font-semibold text-slate-700">No User Selected</h2>
                <p className="text-slate-500 mt-2">Please go back and select a user to edit.</p>
                <button onClick={() => onNavigate(AppView.ADMIN_USERS)} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                    Back to Users
                </button>
            </div>
        </DashboardLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill out all required fields.");
      return;
    }
    onUpdateUser({
      ...editingUser,
      name,
      email,
      type: userType,
      status,
    });
  };
  
  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_USERS} notifications={notifications}>
       <div>
         <button onClick={() => onNavigate(AppView.ADMIN_USERS)} className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Users
        </button>
        <div className="bg-white shadow rounded p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Edit User: {editingUser.name}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">User Type</label>
                    <select value={userType} onChange={e => setUserType(Number(e.target.value) as UserType)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded bg-white">
                        <option value={UserType.BUYER}>Buyer</option>
                        <option value={UserType.VENDOR}>Vendor</option>
                        <option value={UserType.SUPPORT_AGENT}>Support Agent</option>
                        <option value={UserType.SUPER_ADMIN}>Super Admin</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Account Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value as User['status'])} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded bg-white">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
                 <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={() => onNavigate(AppView.ADMIN_USERS)} className="px-6 py-2 border border-slate-300 rounded shadow-sm text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded shadow-sm hover:bg-emerald-700 text-sm font-medium">Update User</button>
                </div>
            </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminEditUserScreen;