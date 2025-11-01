

import React, { useState } from 'react';
import { AppView, User, Order, Transaction } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import StatCard from '../../components/shared/StatCard';
import WalletIcon from '../../components/icons/WalletIcon';

interface VendorWalletScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  orders: Order[];
  transactions: Transaction[];
  notifications: any[];
  onRequestPayout: (amount: number) => void;
}

const getStatusClass = (status: string) => {
    switch(status) {
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Failed': return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-slate-800';
    }
}

const VendorWalletScreen: React.FC<VendorWalletScreenProps> = ({ user, onNavigate, onLogout, orders, transactions, notifications, onRequestPayout }) => {
  const [payoutAmount, setPayoutAmount] = useState(0);

  const totalRevenue = orders.reduce((sum, order) => (order.status === 'Completed' || order.status === 'Delivered') ? sum + order.total : sum, 0);
  const pendingFunds = orders.reduce((sum, order) => (order.status === 'Payment in Escrow' || order.status === 'Shipped') ? sum + order.total : sum, 0);
  
  const totalPayouts = transactions.filter(t => t.type === 'Payout' && t.status !== 'Failed').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalFees = transactions.filter(t => t.type === 'Fee').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const availableForPayout = totalRevenue - totalPayouts - totalFees;
  const isKycVerified = user.kycStatus === 'Verified';

  const handleRequest = () => {
    if (payoutAmount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (payoutAmount > availableForPayout) {
        alert("Withdrawal amount cannot be greater than available balance.");
        return;
    }
    onRequestPayout(payoutAmount);
    setPayoutAmount(0);
  }


  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.VENDOR_WALLET} notifications={notifications}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Wallet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Available for Payout" value={`N ${availableForPayout.toLocaleString()}`} icon={WalletIcon} />
        <StatCard title="Pending Funds (in Escrow)" value={`N ${pendingFunds.toLocaleString()}`} icon={WalletIcon} />
        <StatCard title="Total Revenue" value={`N ${totalRevenue.toLocaleString()}`} icon={WalletIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Request Payout</h3>
          {isKycVerified ? (
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Amount to Withdraw</label>
                <input 
                    type="number" 
                    value={payoutAmount || ''}
                    onChange={(e) => setPayoutAmount(Number(e.target.value))}
                    placeholder={`Max N ${availableForPayout.toLocaleString()}`} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Bank Account</label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                    <option>GTBank - **** **** **** 1234</option>
                    <option>First Bank - **** **** **** 5678</option>
                </select>
                </div>
                <button onClick={handleRequest} className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Request Withdrawal</button>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-center text-sm text-yellow-800">
                You must <button onClick={() => onNavigate(AppView.KYC_SUBMISSION)} className="font-bold underline">verify your account (KYC)</button> before you can withdraw funds.
            </div>
          )}
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
           <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                    <td className="px-6 py-4 text-slate-600">{t.date}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{t.type}</td>
                                    <td className="px-6 py-4 text-slate-500">{t.description}</td>
                                    <td className={`px-6 py-4 font-semibold ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {t.amount > 0 ? `+ N ${t.amount.toLocaleString()}` : `- N ${Math.abs(t.amount).toLocaleString()}`}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(t.status)}`}>
                                            {t.status}
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

export default VendorWalletScreen;