

import React from 'react';
import { AppView, User, Order } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const getStatusClass = (status: string) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

interface VendorOrdersScreenProps {
    user: User;
    onNavigate: (view: AppView) => void;
    onLogout: () => void;
    orders: Order[];
    onViewOrder: (order: Order) => void;
    notifications: any[];
}

const VendorOrdersScreen: React.FC<VendorOrdersScreenProps> = ({ user, onNavigate, onLogout, orders, onViewOrder, notifications }) => {

    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.VENDOR_ORDERS} notifications={notifications}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">Orders</h2>
                 <div className="flex space-x-2">
                    <input type="search" placeholder="Search orders..." className="px-3 py-2 border border-slate-300 rounded shadow-sm sm:text-sm bg-white" />
                    <button className="px-4 py-2 border border-slate-300 rounded text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Filter</button>
                </div>
            </div>
            
            <div className="bg-white shadow rounded overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Order ID</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Items</th>
                                <th scope="col" className="px-6 py-3">Total</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                        {order.id}
                                    </th>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4">{order.items.length}</td>
                                    <td className="px-6 py-4 font-semibold">N {order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => onViewOrder(order)} className="text-emerald-600 hover:underline text-xs">View</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-between items-center p-4">
                    <span className="text-sm text-slate-700">Showing 1 to {orders.length} of {orders.length} results</span>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 border rounded text-sm bg-white hover:bg-slate-100">Previous</button>
                        <button className="px-3 py-1 border rounded text-sm bg-white hover:bg-slate-100">Next</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VendorOrdersScreen;