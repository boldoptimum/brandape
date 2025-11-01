

import React from 'react';
import { AppView, User, Dispute } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import StatCard from '../../components/shared/StatCard';
import DisputesIcon from '../../components/icons/DisputesIcon';

interface SupportDashboardScreenProps {
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

const SupportDashboardScreen: React.FC<SupportDashboardScreenProps> = ({ user, onNavigate, onLogout, disputes, onViewDispute, notifications }) => {

    const openDisputes = disputes.filter(d => d.status === 'Open');
    const resolvedDisputes = disputes.filter(d => d.status === 'Resolved').length;
    const inProgressDisputes = disputes.filter(d => d.status === 'In Progress').length;


    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.SUPPORT_DASHBOARD} notifications={notifications}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Open Disputes" value={openDisputes.length.toString()} icon={DisputesIcon} />
                <StatCard title="Resolved Disputes" value={resolvedDisputes.toString()} icon={DisputesIcon} />
                <StatCard title="In Progress" value={inProgressDisputes.toString()} icon={DisputesIcon} />
            </div>
            <div className="mt-8 bg-white p-6 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Recent Open Disputes</h3>
                    <button onClick={() => onNavigate(AppView.SUPPORT_DISPUTES)} className="text-sm font-medium text-emerald-600 hover:underline">View All</button>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Case ID</th>
                                <th scope="col" className="px-6 py-3">Order ID</th>
                                <th scope="col" className="px-6 py-3">Buyer</th>
                                <th scope="col" className="px-6 py-3">Reason</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openDisputes.slice(0, 5).map((dispute) => (
                                <tr key={dispute.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                        {dispute.id}
                                    </th>
                                    <td className="px-6 py-4">{dispute.orderId}</td>
                                    <td className="px-6 py-4">{dispute.buyer}</td>
                                    <td className="px-6 py-4">{dispute.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(dispute.status)}`}>
                                            {dispute.status}
                                        </span>
                                    </td>
                                     <td className="px-6 py-4">
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

export default SupportDashboardScreen;