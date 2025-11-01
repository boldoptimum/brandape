

import React, { useState } from 'react';
import { AppView, User, HomepageContent } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface AdminContentScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  content: HomepageContent;
  onUpdateContent: (content: HomepageContent) => void;
  notifications: any[];
}

const AdminContentScreen: React.FC<AdminContentScreenProps> = ({ user, onNavigate, onLogout, content, onUpdateContent, notifications }) => {
  const [localContent, setLocalContent] = useState<HomepageContent>(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContent(localContent);
  };
  
  const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
    const newFeatures = [...localContent.features];
    newFeatures[index] = {...newFeatures[index], [field]: value};
    setLocalContent({...localContent, features: newFeatures});
  };

  const handleDeliveryChange = (field: keyof HomepageContent['deliverySection'], value: string) => {
    setLocalContent({
        ...localContent, 
        deliverySection: {
            ...localContent.deliverySection, 
            [field]: value
        }
    });
  };

  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_CONTENT_MANAGEMENT} notifications={notifications}>
       <div>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Homepage Content Management</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hero Section */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Hero Section</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                            <input type="text" value={localContent.heroTitle} onChange={e => setLocalContent({...localContent, heroTitle: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                            <textarea value={localContent.heroSubtitle} onChange={e => setLocalContent({...localContent, heroSubtitle: e.target.value})} rows={3} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hero Background Image URL</label>
                            <input type="text" value={localContent.heroImageUrl} onChange={e => setLocalContent({...localContent, heroImageUrl: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                        </div>
                    </div>
                </div>
                {/* Promotion Section */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Promotion Section</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Promotion Text (e.g., "37% OFF")</label>
                            <input type="text" value={localContent.promoText} onChange={e => setLocalContent({...localContent, promoText: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Promotion Background Image URL</label>
                            <input type="text" value={localContent.promoImageUrl} onChange={e => setLocalContent({...localContent, promoImageUrl: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                        </div>
                    </div>
                </div>
                {/* Features Section */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Features Section</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {localContent.features.map((feature, index) => (
                            <div key={index} className="border p-4 rounded-md space-y-2">
                                <label className="block text-sm font-bold text-gray-700">Feature {index + 1}: {feature.icon.replace('Icon','')}</label>
                                 <div>
                                    <label className="block text-xs font-medium text-gray-600">Title</label>
                                    <input type="text" value={feature.title} onChange={e => handleFeatureChange(index, 'title', e.target.value)} required className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600">Description</label>
                                    <input type="text" value={feature.description} onChange={e => handleFeatureChange(index, 'description', e.target.value)} required className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
                {/* Delivery Section */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Delivery Section</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" value={localContent.deliverySection.title} onChange={e => handleDeliveryChange('title', e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea value={localContent.deliverySection.description} onChange={e => handleDeliveryChange('description', e.target.value)} rows={3} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Sub-description</label>
                            <input type="text" value={localContent.deliverySection.subDescription} onChange={e => handleDeliveryChange('subDescription', e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Button Text</label>
                            <input type="text" value={localContent.deliverySection.buttonText} onChange={e => handleDeliveryChange('buttonText', e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input type="text" value={localContent.deliverySection.imageUrl} onChange={e => handleDeliveryChange('imageUrl', e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
                        </div>
                    </div>
                </div>


                 <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium">Save All Changes</button>
                </div>
            </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminContentScreen;