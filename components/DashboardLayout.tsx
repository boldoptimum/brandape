

import React, { useState } from 'react';
import BrandApeLogo from './icons/BrandApeLogo';
import { User, AppView, Notification, UserType } from '../types';
import NotificationIcon from './icons/NotificationIcon';
import DashboardIcon from './icons/DashboardIcon';
import ProductsIcon from './icons/ProductsIcon';
import OrdersIcon from './icons/OrdersIcon';
import CustomersIcon from './icons/CustomersIcon';
import WalletIcon from './icons/WalletIcon';
import SettingsIcon from './icons/SettingsIcon';
import DisputesIcon from './icons/DisputesIcon';
import KycIcon from './icons/KycIcon';
import ContentIcon from './icons/ContentIcon';
import CategoryIcon from './icons/CategoryIcon';
import LogoutIcon from './icons/LogoutIcon';
import CartIcon from './icons/CartIcon';

interface DashboardLayoutProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  children: React.ReactNode;
  activeView: AppView;
  notifications: Notification[];
}

const KycBanner: React.FC<{user: User, onNavigate: (view: AppView) => void, onClose: () => void}> = ({user, onNavigate, onClose}) => {
    if (user.kycStatus === 'Verified' || user.kycStatus === 'Pending') return null;
    
    let message = 'Your account is not verified. Complete KYC to access all features.';
    if (user.kycStatus === 'Rejected') {
        message = `Your KYC submission was rejected: ${user.kycRejectionReason || 'No reason provided.'}`;
    }

    return (
        <div className="bg-yellow-100/80 backdrop-blur-sm border-b border-yellow-200 p-3 text-sm text-yellow-800">
            <div className="container mx-auto flex justify-between items-center">
                <p>{message}</p>
                <div className="flex items-center space-x-4">
                    <button onClick={() => onNavigate(AppView.KYC_SUBMISSION)} className="font-semibold underline">
                        {user.kycStatus === 'Not Submitted' ? 'Verify Now' : 'Resubmit'}
                    </button>
                    <button onClick={onClose} className="text-xl font-bold" aria-label="Close KYC banner">&times;</button>
                </div>
            </div>
        </div>
    )
}

const vendorNavLinks = {
  dashboard: { view: AppView.VENDOR_DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
  groups: [
    { group: 'Store', links: [
        { view: AppView.VENDOR_PRODUCTS, label: 'Products', icon: ProductsIcon },
        { view: AppView.VENDOR_ORDERS, label: 'Orders', icon: OrdersIcon },
        { view: AppView.VENDOR_CUSTOMERS, label: 'Customers', icon: CustomersIcon },
    ]},
    { group: 'Finance', links: [
        { view: AppView.VENDOR_WALLET, label: 'Wallet', icon: WalletIcon },
    ]},
    { group: 'Account', links: [
        { view: AppView.SETTINGS, label: 'Settings', icon: SettingsIcon },
    ]},
  ]
};

const buyerNavLinks = {
  dashboard: { view: AppView.BUYER_DASHBOARD, label: 'My Orders', icon: OrdersIcon },
  groups: [
    { group: 'Shop', links: [
        { view: AppView.BUYER_PRODUCTS, label: 'Browse Products', icon: ProductsIcon },
        { view: AppView.BUYER_CART, label: 'Shopping Cart', icon: CartIcon },
    ]},
    { group: 'Account', links: [
        { view: AppView.SETTINGS, label: 'Settings', icon: SettingsIcon },
    ]},
  ]
};

const supportNavLinks = {
  dashboard: { view: AppView.SUPPORT_DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
  groups: [
    { group: 'Workspace', links: [
        { view: AppView.SUPPORT_DISPUTES, label: 'Disputes', icon: DisputesIcon },
    ]},
    { group: 'Account', links: [
        { view: AppView.SETTINGS, label: 'Settings', icon: SettingsIcon },
    ]},
  ]
};

const adminNavLinks = {
  dashboard: { view: AppView.ADMIN_DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
  groups: [
    { group: 'Management', links: [
        { view: AppView.ADMIN_USERS, label: 'Users', icon: CustomersIcon },
        { view: AppView.ADMIN_ORDERS, label: 'Orders', icon: OrdersIcon },
        { view: AppView.ADMIN_CATEGORIES, label: 'Categories', icon: CategoryIcon },
    ]},
    { group: 'Platform', links: [
        { view: AppView.ADMIN_KYC_SUBMISSIONS, label: 'KYC Submissions', icon: KycIcon },
        { view: AppView.ADMIN_CONTENT_MANAGEMENT, label: 'Homepage Content', icon: ContentIcon },
    ]},
    { group: 'Account', links: [
        { view: AppView.SETTINGS, label: 'Settings', icon: SettingsIcon },
    ]},
  ]
};

const NavButton: React.FC<{
  view: AppView;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}> = ({ view, label, Icon, activeView, onNavigate }) => (
    <button
        onClick={() => onNavigate(view)}
        className={`w-full flex items-center px-4 py-2.5 text-left text-sm font-medium rounded ${
            activeView === view
            ? 'text-white bg-emerald-600 shadow-md'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
    >
        <Icon className="h-5 w-5 mr-3" />
        <span>{label}</span>
    </button>
);


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onNavigate, onLogout, children, activeView, notifications }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showKycBanner, setShowKycBanner] = useState(true);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const isActionableUser = user.type === UserType.BUYER || user.type === UserType.VENDOR;

  const getNavLinks = () => {
    switch(user.type) {
      case UserType.VENDOR: return vendorNavLinks;
      case UserType.BUYER: return buyerNavLinks;
      case UserType.SUPPORT_AGENT: return supportNavLinks;
      case UserType.SUPER_ADMIN: return adminNavLinks;
      default: return { dashboard: null, groups: [] };
    }
  };
  const navConfig = getNavLinks();


  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white border-r border-slate-200 flex flex-col z-30`}>
        <div className="flex items-center justify-center p-6 border-b border-slate-200">
          <button onClick={() => onNavigate(AppView.HOME)}>
            <BrandApeLogo className="h-6 w-auto text-black" />
          </button>
        </div>
        <nav className="mt-4 px-4 flex-grow">
            {navConfig.dashboard && (
                <NavButton
                    view={navConfig.dashboard.view}
                    label={navConfig.dashboard.label}
                    Icon={navConfig.dashboard.icon}
                    activeView={activeView}
                    onNavigate={onNavigate}
                />
            )}
            
            <hr className="my-4 border-slate-200" />

            {navConfig.groups.map((group) => (
                <div key={group.group} className="mb-4">
                <h3 className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">{group.group}</h3>
                {group.links.map(({ view, label, icon: Icon }) => (
                    <NavButton
                        key={label}
                        view={view}
                        label={label}
                        Icon={Icon}
                        activeView={activeView}
                        onNavigate={onNavigate}
                    />
                ))}
                </div>
            ))}
        </nav>
         <div className="px-4 pb-4">
            <button
                onClick={onLogout}
                className="w-full flex items-center px-4 py-2.5 text-left text-sm font-medium rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
                <LogoutIcon className="h-5 w-5 mr-3" />
                <span>Logout</span>
            </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white border-b border-slate-200">
          <div className="flex items-center">
            <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="text-slate-500 focus:outline-none md:hidden">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-slate-800 ml-2">
              Welcome, {user.name.split(' ')[0]}!
            </h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative">
                <button onClick={() => setNotificationOpen(!notificationOpen)} className="relative p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                    <NotificationIcon className="h-6 w-6 text-slate-600" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>
                    )}
                </button>
                {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-xl overflow-hidden z-20">
                        <div className="p-4 font-semibold text-sm text-slate-800 border-b">Notifications</div>
                        <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? notifications.map(notif => (
                            <div key={notif.id} className={`p-4 text-sm border-b hover:bg-slate-100 ${!notif.read ? 'bg-emerald-50' : ''}`}>
                                <p className="text-slate-700">{notif.message}</p>
                                <p className="text-xs text-slate-400 mt-1">{new Date(notif.date).toLocaleString()}</p>
                            </div>
                        )) : (
                            <p className="p-4 text-sm text-slate-500">No new notifications.</p>
                        )}
                        </div>
                    </div>
                )}
             </div>
            <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center">
                    <img src={user.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full" />
                <div className="ml-2 text-left hidden sm:block">
                    <p className="text-sm font-medium text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                </button>
                 {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-1 z-20" onMouseLeave={() => setProfileOpen(false)}>
                        <button onClick={() => { onNavigate(AppView.SETTINGS); setProfileOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                          <SettingsIcon className="w-4 h-4 mr-2" />
                          Settings
                        </button>
                        <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                          Logout
                        </button>
                    </div>
                )}
            </div>
          </div>
        </header>

        {/* KYC Banner */}
        {isActionableUser && showKycBanner && <KycBanner user={user} onNavigate={onNavigate} onClose={() => setShowKycBanner(false)} />}

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;