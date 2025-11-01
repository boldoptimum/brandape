

import React, { useState } from 'react';
import { AppView, User, CartItem } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface BuyerCheckoutScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  cart: CartItem[];
  onPlaceOrder: (useEscrow: boolean) => void;
  notifications: any[];
}

const BuyerCheckoutScreen: React.FC<BuyerCheckoutScreenProps> = ({ user, onNavigate, onLogout, cart, onPlaceOrder, notifications }) => {
  const [step, setStep] = useState(1);
  const [useEscrow, setUseEscrow] = useState(true);
  
  const isKycVerified = user.kycStatus === 'Verified';

  const handleConfirmOrder = () => {
    onPlaceOrder(useEscrow);
    setStep(3); // Move to confirmation step
  };
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderStep = () => {
    switch(step) {
        case 1: // Shipping
            return (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Full Name</label>
                            <input type="text" defaultValue={user.name} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded bg-white" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Address</label>
                            <input type="text" placeholder="123 Main St" defaultValue={user.address.street} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded bg-white" />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => setStep(2)} className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Continue to Payment</button>
                        </div>
                    </div>
                </div>
            );
        case 2: // Payment
            return (
                 <div>
                    <h3 className="text-lg font-semibold mb-4">Payment & Order Summary</h3>
                     <div className="mt-4 p-4 border rounded bg-slate-50 space-y-2">
                        <div className="flex justify-between text-sm"><span>Subtotal:</span> <span>N {subtotal.toLocaleString()}</span></div>
                        <div className="flex justify-between text-sm"><span>Shipping:</span> <span>N 5,000</span></div>
                        <div className="flex justify-between font-bold border-t pt-2"><span>Total:</span> <span>N {(subtotal + 5000).toLocaleString()}</span></div>
                    </div>

                    <div className="mt-6 p-4 border-2 border-emerald-200 rounded bg-emerald-50">
                        <div className="flex items-start">
                            <input 
                                id="escrow" 
                                name="escrow" 
                                type="checkbox" 
                                checked={useEscrow}
                                onChange={(e) => setUseEscrow(e.target.checked)}
                                className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded" 
                            />
                            <div className="ml-3 text-sm">
                                <label htmlFor="escrow" className="font-medium text-slate-900">Use Escrow Protection</label>
                                <p className="text-slate-500">Your payment will be held securely until you confirm delivery of your order. Highly recommended for all transactions.</p>
                            </div>
                        </div>
                    </div>

                    {!isKycVerified && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-center text-sm text-yellow-800">
                            You must <button onClick={() => onNavigate(AppView.KYC_SUBMISSION)} className="font-bold underline">verify your account (KYC)</button> before you can place an order.
                        </div>
                    )}
                    
                    <div className="flex justify-between mt-6">
                         <button onClick={() => setStep(1)} className="px-6 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300">Back to Shipping</button>
                        <button 
                            onClick={handleConfirmOrder} 
                            disabled={!isKycVerified}
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            );
        case 3: // Confirmation
            return (
                <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-2xl font-semibold mt-4 text-slate-800">Order Placed Successfully!</h3>
                    <p className="text-slate-600 mt-2">Thank you for your purchase. You can track your order in the dashboard.</p>
                    <button
                        onClick={() => onNavigate(AppView.BUYER_DASHBOARD)}
                        className="mt-8 px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium"
                    >
                        Back to Dashboard
                    </button>
                </div>
            );
        default:
            return null;
    }
  }

  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.BUYER_CART} notifications={notifications}>
        <div className="bg-white p-8 rounded shadow max-w-2xl mx-auto">
            <div className="flex justify-between mb-8 border-b pb-4">
                <div className={`flex items-center ${step >= 1 ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 1 ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}`}>1</span>
                    <span className="ml-2 font-medium">Shipping</span>
                </div>
                 <div className="flex-1 h-px bg-slate-300 self-center mx-4"></div>
                <div className={`flex items-center ${step >= 2 ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 2 ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}`}>2</span>
                    <span className="ml-2 font-medium">Payment</span>
                </div>
                 <div className="flex-1 h-px bg-slate-300 self-center mx-4"></div>
                <div className={`flex items-center ${step >= 3 ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 3 ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}`}>3</span>
                    <span className="ml-2 font-medium">Confirmation</span>
                </div>
            </div>
            {renderStep()}
        </div>
    </DashboardLayout>
  );
};

export default BuyerCheckoutScreen;
