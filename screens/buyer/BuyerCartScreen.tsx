

import React from 'react';
import { AppView, User, CartItem } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface BuyerCartScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  notifications: any[];
}

const BuyerCartScreen: React.FC<BuyerCartScreenProps> = ({ user, onNavigate, onLogout, cart, onUpdateQuantity, onRemoveItem, notifications }) => {

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.BUYER_CART} notifications={notifications}>
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="bg-white shadow rounded p-8 text-center">
            <h3 className="text-xl text-slate-700">Your cart is empty.</h3>
            <p className="text-slate-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
            <button 
                onClick={() => onNavigate(AppView.BUYER_PRODUCTS)}
                className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium"
            >
                Start Shopping
            </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white shadow rounded overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Quantity</th>
                            <th className="px-6 py-3">Subtotal</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id} className="border-b border-slate-200">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        <span className="font-medium text-slate-800">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">N {item.price.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <input 
                                        type="number" 
                                        value={item.quantity}
                                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                                        min="1"
                                        className="w-16 text-center border-slate-300 rounded bg-white"
                                    />
                                </td>
                                <td className="px-6 py-4 font-semibold">N {(item.price * item.quantity).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-white shadow rounded p-6 h-fit">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-3">Cart Summary</h3>
                <div className="space-y-3 mt-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-medium">N {subtotal.toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-slate-600">Shipping</span>
                        <span className="font-medium">N 5,000</span>
                    </div>
                     <div className="flex justify-between font-bold text-base pt-3 border-t">
                        <span>Total</span>
                        <span>N {(subtotal + 5000).toLocaleString()}</span>
                    </div>
                </div>
                 <button 
                    onClick={() => onNavigate(AppView.BUYER_CHECKOUT)}
                    className="mt-6 w-full py-3 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-semibold"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default BuyerCartScreen;
