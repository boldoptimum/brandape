

import React from 'react';
import { AppView, User, UserType } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface AdminUsersScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  users: User[];
  onDeactivateUser: (user: User) => void;
  onViewKyc: (user: User) => void;
  onEditUser: (user: User) => void;
  notifications: any[];
}

const getUserTypeString = (type: UserType) => {
    switch (type) {
        case UserType.BUYER: return 'Buyer';
        case UserType.VENDOR: return 'Vendor';
        case UserType.SUPPORT_AGENT: return 'Support';
        case UserType.SUPER_ADMIN: return 'Admin';
        default: return 'Unknown';
    }
};

const getUserTypeClass = (type: UserType) => {
    switch (type) {
        case UserType.BUYER: return 'bg-blue-100 text-blue-800';
        case UserType.VENDOR: return 'bg-green-100 text-green-800';
        case UserType.SUPPORT_AGENT: return 'bg-yellow-100 text-yellow-800';
        case UserType.SUPER_ADMIN: return 'bg-purple-100 text-purple-800';
        default: return 'bg-slate-100 text-slate-800';
    }
}

const getKycStatusClass = (status: User['kycStatus']) => {
    switch (status) {
        case 'Verified': return 'bg-green-100 text-green-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const AdminUsersScreen: React.FC<AdminUsersScreenProps> = ({ user, onNavigate, onLogout, users, onDeactivateUser, onViewKyc, onEditUser, notifications }) => {
    
    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_USERS} notifications={notifications}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">User Management</h2>
                 <button onClick={() => onNavigate(AppView.ADMIN_ADD_EDIT_USER)} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add User
                </button>
            </div>
            <div className="bg-white shadow rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">User Type</th>
                                <th scope="col" className="px-6 py-3">KYC Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">{u.name}</td>
                                    <td className="px-6 py-4">{u.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUserTypeClass(u.type)}`}>
                                            {getUserTypeString(u.type)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getKycStatusClass(u.kycStatus)}`}>
                                            {u.kycStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-4">
                                            <button onClick={() => onEditUser(u)} className="text-emerald-600 hover:underline text-xs">Edit</button>
                                            {(u.kycStatus === 'Pending' || u.kycStatus === 'Rejected') && (
                                                <button onClick={() => onViewKyc(u)} className="text-blue-600 hover:underline text-xs">Review KYC</button>
                                            )}
                                            <button 
                                                onClick={() => onDeactivateUser(u)}
                                                className="text-red-600 hover:underline text-xs"
                                                disabled={u.id === user.id} // Admin can't deactivate themselves
                                            >
                                                Deactivate
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminUsersScreen;