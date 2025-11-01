
import React, { useState } from 'react';
import { AppView, User, KycField } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ArrowLeftIcon from '../../components/icons/ArrowLeftIcon';

interface AdminKycSettingsScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  kycFields: KycField[];
  onUpdateKycFields: (fields: KycField[]) => void;
  notifications: any[];
}

const AdminKycSettingsScreen: React.FC<AdminKycSettingsScreenProps> = ({ user, onNavigate, onLogout, kycFields, onUpdateKycFields, notifications }) => {
  const [fields, setFields] = useState<KycField[]>(kycFields);

  const handleAddField = () => {
    setFields([...fields, { id: `new_${Date.now()}`, label: '', type: 'text' }]);
  };

  const handleFieldChange = (id: string, newLabel: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, label: newLabel } : f));
  };
  
  const handleRemoveField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSaveChanges = () => {
    const validFields = fields.filter(f => f.label.trim() !== '');
    onUpdateKycFields(validFields);
  };
  
  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.SETTINGS} notifications={notifications}>
       <div>
         <button onClick={() => onNavigate(AppView.SETTINGS)} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to General Settings
        </button>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">KYC Document Requirements</h2>
            <p className="text-sm text-gray-600 mb-6">Configure the fields required for user KYC verification. These fields will be shown to users on the submission form.</p>
            <div className="space-y-4">
                {fields.map((field) => (
                    <div key={field.id} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={field.label}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder="Enter field label"
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        />
                         <select className="px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm">
                            <option value="file">File Upload</option>
                            <option value="text">Text Input</option>
                        </select>
                        <button onClick={() => handleRemoveField(field.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-md">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-between">
                <button onClick={handleAddField} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Add Field</button>
                <button onClick={handleSaveChanges} className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium">Save Changes</button>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminKycSettingsScreen;