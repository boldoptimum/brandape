

import React from 'react';
import { AppView, User, Product, Order, UserType } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import StatCard from '../../components/shared/StatCard';
import BarChart from '../../components/shared/BarChart';

import ProductsIcon from '../../components/icons/ProductsIcon';
import OrdersIcon from '../../components/icons/OrdersIcon';
import CustomersIcon from '../../components/icons/CustomersIcon';
import WalletIcon from '../../components/icons/WalletIcon';

interface AdminDashboardScreenProps {
    user: User;
    onNavigate: (view: AppView) => void;
    onLogout: () => void;
    users: User[];
    products: Product[];
    orders: Order[];
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

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ user, onNavigate, onLogout, users, products, orders, notifications }) => {
    
    const totalRevenue = orders.reduce((sum, order) => order.status === 'Delivered' ? sum + order.total : sum, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalUsers = users.length;
    
    const userTypeData = [
        { label: 'Buyers', value: users.filter(u => u.type === UserType.BUYER).length },
        { label: 'Vendors', value: users.filter(u => u.type === UserType.VENDOR).length },
        { label: 'Support', value: users.filter(u => u.type === UserType.SUPPORT_AGENT).length },
        { label: 'Admins', value: users.filter(u => u.type === UserType.SUPER_ADMIN).length },
    ];

    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_DASHBOARD} notifications={notifications}>
            <div>
                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Revenue" value={`N ${Intl.NumberFormat().format(totalRevenue)}`} icon={WalletIcon} />
                    <StatCard title="Total Orders" value={totalOrders.toString()} icon={OrdersIcon} />
                    <StatCard title="Total Products" value={totalProducts.toString()} icon={ProductsIcon} />
                    <StatCard title="Total Users" value={totalUsers.toString()} icon={CustomersIcon} />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* User List */}
                    <div className="lg:col-span-2 bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Users</h3>
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-500">
                               <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">User Type</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                 <tbody>
                                    {users.slice(0, 5).map(u => (
                                        <tr key={u.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                            <td className="px-6 py-4 font-medium text-slate-900 flex items-center space-x-3">
                                                <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full" />
                                                <span>{u.name}</span>
                                            </td>
                                            <td className="px-6 py-4">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUserTypeClass(u.type)}`}>
                                                    {getUserTypeString(u.type)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-xs">{u.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                     {/* User Type Distribution */}
                    <div className="lg:col-span-1">
                        <BarChart data={userTypeData} title="User Distribution" />
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default AdminDashboardScreen;