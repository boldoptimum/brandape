
import React from 'react';
import { AppView, User, Order } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ArrowLeftIcon from '../../components/icons/ArrowLeftIcon';

interface AdminOrderDetailScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  order: Order | null;
  onBack: () => void;
  notifications: any[];
}

const getStatusClass = (status: string) => {
    switch (status) {
        case 'Completed':
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Payment in Escrow':
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': 
        case 'Refunded':
        case 'Disputed': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminOrderDetailScreen: React.FC<AdminOrderDetailScreenProps> = ({ user, onNavigate, onLogout, order, onBack, notifications }) => {
    
    if (!order) {
        return (
            <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_ORDERS} notifications={notifications}>
                <div className="text-center bg-white p-8 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-700">Order Not Found</h2>
                    <button onClick={onBack} className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-medium">
                        Back to Orders
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_ORDERS} notifications={notifications}>
            <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to All Orders
            </button>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start border-b pb-4 mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
                            <p className="text-sm text-gray-500">Placed on {order.date}</p>
                        </div>
                        <div>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Items Ordered</h3>
                        <ul className="divide-y divide-gray-200">
                            {order.items.map(item => (
                                <li key={item.id} className="py-4 flex items-center">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="ml-4 flex-1">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-800">N {item.price.toLocaleString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="flex justify-end items-center pt-4 border-t gap-4">
                        <div className="text-right">
                            <p className="text-gray-500">Total</p>
                            <p className="text-2xl font-bold text-gray-900">N {order.total.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Tracking</h3>
                    <div className="space-y-4">
                    {order.trackingHistory.map((event, index) => (
                        <div key={index} className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index === 0 ? 'bg-emerald-500 text-white' : 'bg-gray-300'}`}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M20 10a10 10 0 11-20 0 10 10 0 0120 0z"></path></svg>
                                    </div>
                                </div>
                                {index < order.trackingHistory.length - 1 && <div className="w-px flex-grow bg-gray-300"></div>}
                            </div>
                            <div className="pb-4">
                                <p className="font-semibold text-gray-800">{event.status}</p>
                                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
                                {event.location && <p className="text-sm text-gray-500">Location: {event.location}</p>}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminOrderDetailScreen;