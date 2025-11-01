

import React, { useState, useEffect } from 'react';
import { AppView, User, Product, Category } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface AddEditProductScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  product: Product | null;
  onSave: (productData: Omit<Product, 'id' | 'sales' | 'vendorId' | 'rating' | 'reviewCount' | 'reviews'>) => void;
  onCancel: () => void;
  notifications: any[];
  categories: Category[];
}

const AddEditProductScreen: React.FC<AddEditProductScreenProps> = ({ user, onNavigate, onLogout, product, onSave, onCancel, notifications, categories }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [status, setStatus] = useState('Active');
  
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryName(product.category);
      setSubcategory(product.subcategory || '');
      setStatus(product.status);
    }
  }, [product]);

  useEffect(() => {
    if (categoryName) {
      const selectedCat = categories.find(c => c.name === categoryName);
      const subs = selectedCat?.subcategories || [];
      setAvailableSubcategories(subs);
      // Reset subcategory if it's not in the new list of available subcategories
      if (!subs.includes(subcategory)) {
        setSubcategory('');
      }
    } else {
      setAvailableSubcategories([]);
      setSubcategory('');
    }
  }, [categoryName, categories, subcategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      price,
      stock,
      category: categoryName,
      subcategory,
      status,
      imageUrl: product?.imageUrl || '',
      images: product?.images || [],
      specs: product?.specs || [],
    });
  };
  
  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.VENDOR_PRODUCTS} notifications={notifications}>
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Product Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm bg-white"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm bg-white"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Price (N)</label>
              <input type="number" value={price || ''} onChange={e => setPrice(Number(e.target.value))} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm bg-white"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Stock Quantity</label>
              <input type="number" value={stock || ''} onChange={e => setStock(Number(e.target.value))} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm bg-white"/>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <select value={categoryName} onChange={e => setCategoryName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm bg-white">
                <option value="">Select a category</option>
                {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Sub-category</label>
              <select value={subcategory} onChange={e => setSubcategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm bg-white" disabled={availableSubcategories.length === 0}>
                <option value="">Select sub-category (optional)</option>
                {availableSubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded shadow-sm bg-white">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onCancel} className="px-6 py-2 border border-slate-300 rounded shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-100">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded shadow-sm hover:bg-emerald-700 text-sm font-medium">Save Product</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddEditProductScreen;