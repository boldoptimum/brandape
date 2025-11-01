

import React from 'react';
import { AppView, User, KycField } from '../types';
import DashboardLayout from '../components/layouts/DashboardLayout';
import FileUpload from '../components/shared/FileUpload';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

interface KycScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  onKycSubmit: () => void;
  notifications: any[];
  kycFields: KycField[];
}

const KycScreen: React.FC<KycScreenProps> = ({ user, onNavigate, onLogout, onKycSubmit, notifications, kycFields }) => {

  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.SETTINGS} notifications={notifications}>
      <div>
        <button onClick={() => onNavigate(AppView.SETTINGS)} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Settings
        </button>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Submit Verification Documents</h2>
            <p className="text-sm text-gray-600 mb-6">Please upload clear copies of the required documents. Your information is kept secure and confidential.</p>

            <form onSubmit={(e) => { e.preventDefault(); onKycSubmit(); }} className="space-y-6">
                
                {kycFields.map(field => {
                    if (field.type === 'file') {
                        return <FileUpload key={field.id} label={field.label} />;
                    }
                    return (
                        <div key={field.id}>
                            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                    );
                })}

                <div className="flex items-start">
                    <input id="kyc-consent" name="kyc-consent" type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-1" required />
                    <label htmlFor="kyc-consent" className="ml-2 block text-sm text-gray-800">I confirm that the documents provided are authentic and belong to me.</label>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                        Submit for Review
                    </button>
                </div>
            </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KycScreen;
