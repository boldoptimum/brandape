

import React from 'react';
import { AppView, User, Dispute } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface SupportDisputesScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  disputes: Dispute[];
  onViewDispute: (dispute: Dispute) => void;
  notifications: any[];
}

const getStatusClass = (status: string) => {
    switch (status) {
        case 'Resolved': return 'bg-green-100 text-green-800';
        case 'In Progress': return 'bg-blue-100 text-blue-800';
        case 'Open': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const SupportDisputesScreen: React.FC<SupportDisputesScreenProps> = ({ user, onNavigate, onLogout, disputes, onViewDispute, notifications }) => {

    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.SUPPORT_DISPUTES} notifications={notifications}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Dispute Resolution Center</h2>
                 <div className="flex space-x-2">
                    <input type="search" placeholder="Search by Order ID, user..." className="px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-64" />
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Filter</button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Case ID</th>
                                <th scope="col" className="px-6 py-3">Order ID</th>
                                <th scope="col" className="px-6 py-3">Date Opened</th>
                                <th scope="col" className="px-6 py-3">Buyer</th>
                                <th scope="col" className="px-6 py-3">Vendor</th>
                                <th scope="col" className="px-6 py-3">Reason</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disputes.map((dispute) => (
                                <tr key={dispute.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                        {dispute.id}
                                    </th>
                                    <td className="px-6 py-4">{dispute.orderId}</td>
                                    <td className="px-6 py-4">{dispute.date}</td>
                                    <td className="px-6 py-4">{dispute.buyer}</td>
                                    <td className="px-6 py-4">{dispute.vendor}</td>
                                    <td className="px-6 py-4">{dispute.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(dispute.status)}`}>
                                            {dispute.status}
                                        </span>
                                    </td>
                                     <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => onViewDispute(dispute)} className="font-medium text-emerald-600 hover:underline">View Case</button>
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

export default SupportDisputesScreen;