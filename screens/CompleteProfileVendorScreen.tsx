

import React, { useState } from 'react';
import { AppView } from '../types';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import FileUpload from '../components/shared/FileUpload';

interface CompleteProfileVendorScreenProps {
  onNavigate: (view: AppView) => void;
  onFinish: (name: string) => void;
}

type Tab = 'Business Info' | 'Founding Info' | 'Contact';

const BusinessInfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

const FoundingInfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

const ContactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

const TabButton: React.FC<{active: boolean, onClick: () => void, children: React.ReactNode, Icon: React.FC<React.SVGProps<SVGSVGElement>>}> = ({active, onClick, children, Icon}) => (
    <button onClick={onClick} className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full ${active ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:bg-slate-200'}`}>
        <Icon className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
        <span>{children}</span>
    </button>
);


const CompleteProfileVendorScreen: React.FC<CompleteProfileVendorScreenProps> = ({ onNavigate, onFinish }) => {
    const [activeTab, setActiveTab] = useState<Tab>('Business Info');
    const [companyName, setCompanyName] = useState('');
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Business Info': return <BusinessInfoTab companyName={companyName} setCompanyName={setCompanyName} onNext={() => setActiveTab('Founding Info')} />;
            case 'Founding Info': return <FoundingInfoTab onBack={() => setActiveTab('Business Info')} onNext={() => setActiveTab('Contact')} />;
            case 'Contact': return <ContactTab onBack={() => setActiveTab('Founding Info')} onFinish={() => onFinish(companyName || "New Vendor")} />;
            default: return null;
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-slate-50">
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => onNavigate(AppView.VERIFY_EMAIL)} className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back
                </button>
                <div className="text-right">
                    <p className="text-xs text-slate-500">STEP 02/03</p>
                    <p className="text-sm font-semibold text-slate-700">Residency Info.</p>
                </div>
            </div>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Complete Your Profile!</h1>
                <p className="mt-2 text-slate-600">For the purpose of industry regulation, your details are required.</p>
            </div>

            <div className="flex justify-center space-x-2 sm:space-x-4 p-1 bg-slate-200 rounded-full mb-8 max-w-lg mx-auto">
                <TabButton active={activeTab === 'Business Info'} onClick={() => setActiveTab('Business Info')} Icon={BusinessInfoIcon}>Business Info</TabButton>
                <TabButton active={activeTab === 'Founding Info'} onClick={() => setActiveTab('Founding Info')} Icon={FoundingInfoIcon}>Founding Info</TabButton>
                <TabButton active={activeTab === 'Contact'} onClick={() => setActiveTab('Contact')} Icon={ContactIcon}>Contact</TabButton>
            </div>
            
            <div className="border rounded bg-white p-6">
                {renderContent()}
            </div>
        </div>
    );
};

const BusinessInfoTab: React.FC<{companyName: string, setCompanyName: (name: string) => void, onNext: () => void}> = ({companyName, setCompanyName, onNext}) => (
    <div className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">Identification & CAC</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <FileUpload label="Upload CAC" />
            <FileUpload label="Upload Identification" />
        </div>
        <div>
            <label htmlFor="company-name" className="block text-sm font-medium text-slate-700">Company name</label>
            <input id="company-name" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white" />
        </div>
        <div className="flex justify-end pt-4">
            <button onClick={onNext} className="inline-flex items-center justify-center py-2 px-6 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                Save & Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
        </div>
    </div>
);

const FoundingInfoTab: React.FC<{onBack: () => void, onNext: () => void}> = ({onBack, onNext}) => (
    <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700">Organization Type</label>
                <select className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                    <option>Select...</option>
                    <option>Limited Liability</option>
                    <option>Sole Proprietorship</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Industry Types</label>
                 <select className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                    <option>Select...</option>
                    <option>Agriculture</option>
                    <option>Textiles</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Team Size</label>
                 <select className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                    <option>Select...</option>
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>50+</option>
                </select>
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
                <label className="block text-sm font-medium text-slate-700">Year of Establishment</label>
                <input type="text" placeholder="dd/mm/yyyy" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"/>
                <span className="absolute right-3 top-8 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></span>
            </div>
             <div className="relative">
                <label className="block text-sm font-medium text-slate-700">Company Website</label>
                <input type="text" placeholder="Website url..." className="mt-1 block w-full pl-10 pr-3 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"/>
                <span className="absolute left-3 top-8 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></span>
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-700">Company Vision</label>
            <div className="mt-1 border border-slate-300 rounded">
                <div className="p-2 border-b flex space-x-2 text-slate-500">
                    <button type="button" className="p-1 hover:bg-slate-100 rounded">B</button>
                    <button type="button" className="p-1 hover:bg-slate-100 rounded">I</button>
                    <button type="button" className="p-1 hover:bg-slate-100 rounded">U</button>
                </div>
                <textarea rows={4} placeholder="Tell us about your company vision..." className="block w-full px-3 py-2 border-0 focus:ring-0 sm:text-sm bg-white"></textarea>
            </div>
        </div>
        <div className="flex justify-between pt-4">
            <button onClick={onBack} className="inline-flex items-center justify-center py-2 px-6 border border-slate-300 rounded shadow-sm text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">Previous</button>
            <button onClick={onNext} className="inline-flex items-center justify-center py-2 px-6 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Save & Next</button>
        </div>
    </div>
);

const ContactTab: React.FC<{onBack: () => void, onFinish: () => void}> = ({onBack, onFinish}) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-slate-700">Map Location</label>
            <input type="text" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white" />
        </div>
        <div className="relative">
            <label className="block text-sm font-medium text-slate-700">Phone</label>
            <div className="mt-1 flex">
                 <select className="inline-flex items-center px-3 rounded-l border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                    <option>🇧🇩 +880</option>
                 </select>
                <input type="text" placeholder="Phone number..." className="flex-1 block w-full min-w-0 rounded-none rounded-r sm:text-sm border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 bg-white"/>
            </div>
        </div>
         <div className="relative">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input type="email" placeholder="Email address" className="mt-1 block w-full pl-10 pr-3 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"/>
            <span className="absolute left-3 top-8 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
        </div>
        <div className="flex justify-between pt-4">
            <button onClick={onBack} className="inline-flex items-center justify-center py-2 px-6 border border-slate-300 rounded shadow-sm text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">Previous</button>
            <button onClick={onFinish} className="inline-flex items-center justify-center py-2 px-6 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                Finish Editing
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
        </div>
    </div>
);


export default CompleteProfileVendorScreen;
