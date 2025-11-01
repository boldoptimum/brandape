

import React from 'react';
import { AppView, User, Order } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import StatCard from '../../components/shared/StatCard';
import OrdersIcon from '../../components/icons/OrdersIcon';
import WalletIcon from '../../components/icons/WalletIcon';


interface BuyerDashboardScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  orders: Order[];
  onViewOrder: (order: Order) => void;
  notifications: any[];
}

const getStatusClass = (status: string) => {
    switch (status) {
        case 'Delivered':
        case 'Completed': 
            return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Pending': 
        case 'Payment in Escrow':
            return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const BuyerDashboardScreen: React.FC<BuyerDashboardScreenProps> = ({ user, onNavigate, onLogout, orders, onViewOrder, notifications }) => {
    
    const userOrders = orders.filter(order => order.customerId === user.id);
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    const completedOrders = userOrders.filter(o => o.status === 'Completed' || o.status === 'Delivered').length;

    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.BUYER_DASHBOARD} notifications={notifications}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard title="Total Orders" value={userOrders.length.toString()} icon={OrdersIcon} />
                <StatCard title="Total Amount Spent" value={`N ${totalSpent.toLocaleString()}`} icon={WalletIcon} />
                <StatCard title="Completed Orders" value={completedOrders.toString()} icon={OrdersIcon} />
            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Order History</h2>
            <div className="bg-white shadow rounded overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Order ID</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Items</th>
                                <th scope="col" className="px-6 py-3">Total</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userOrders.map((order) => (
                                <tr key={order.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                        {order.id}
                                    </th>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">{order.items.length}</td>
                                    <td className="px-6 py-4 font-semibold">N {order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                     <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => onViewOrder(order)} className="font-medium text-emerald-600 hover:underline">View Details</button>
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

export default BuyerDashboardScreen;