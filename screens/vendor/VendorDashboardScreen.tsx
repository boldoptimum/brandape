
import React from 'react';
import { AppView, User, Product, Order } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import StatCard from '../../components/shared/StatCard';
import BarChart from '../../components/shared/BarChart';
import WalletIcon from '../../components/icons/WalletIcon';
import OrdersIcon from '../../components/icons/OrdersIcon';
import ProductsIcon from '../../components/icons/ProductsIcon';

const getStatusClass = (status: string) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

interface VendorDashboardScreenProps {
    user: User;
    onNavigate: (view: AppView) => void;
    onLogout: () => void;
    products: Product[];
    orders: Order[];
    notifications: any[];
}

const VendorDashboardScreen: React.FC<VendorDashboardScreenProps> = ({ user, onNavigate, onLogout, products, orders, notifications }) => {
    
    const totalRevenue = orders.reduce((sum, order) => order.status === 'Delivered' ? sum + order.total : sum, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;

    const salesData = [
        { label: 'Jan', value: 120000 },
        { label: 'Feb', value: 180000 },
        { label: 'Mar', value: 150000 },
        { label: 'Apr', value: 210000 },
        { label: 'May', value: 250000 },
        { label: 'Jun', value: 230000 },
    ];

    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.VENDOR_DASHBOARD} notifications={notifications}>
            <div>
                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard title="Total Revenue" value={`N ${Intl.NumberFormat().format(totalRevenue)}`} change="12.5%" changeType="increase" icon={WalletIcon} />
                    <StatCard title="Total Orders" value={totalOrders.toString()} change="2.3%" changeType="increase" icon={OrdersIcon} />
                    <StatCard title="Total Products" value={totalProducts.toString()} icon={ProductsIcon} />
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Chart */}
                    <div className="lg:col-span-2">
                         <BarChart data={salesData} title="Sales Analytics (Last 6 Months)" />
                    </div>
                    {/* Top Products */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Selling Products</h3>
                        <ul className="space-y-4">
                            {products.slice(0, 4).map(p => (
                                <li key={p.id} className="flex items-center space-x-3">
                                    <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded object-cover" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-800">{p.name}</p>
                                        <p className="text-xs text-slate-500">{p.sales} sales</p>
                                    </div>
                                    <p className="text-sm font-semibold">N {p.price.toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="mt-8 bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Orders</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">Customer</th>
                                    <th scope="col" className="px-6 py-3">Total</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 5).map(order => (
                                    <tr key={order.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium">{order.id}</td>
                                        <td className="px-6 py-4">{order.customer}</td>
                                        <td className="px-6 py-4">N{order.total.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VendorDashboardScreen;
