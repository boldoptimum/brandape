

import React, { useState } from 'react';
import { AppView, User, Category } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface AdminCategoriesScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  categories: Category[];
  onAddCategory: (name: string) => void;
  onUpdateCategory: (id: string, newName: string) => void;
  onDeleteCategory: (category: Category) => void;
  onAddSubCategory: (categoryId: string, subCategoryName: string) => void;
  onDeleteSubCategory: (categoryId: string, subCategoryName: string) => void;
  notifications: any[];
}

const AdminCategoriesScreen: React.FC<AdminCategoriesScreenProps> = ({ user, onNavigate, onLogout, categories, onAddCategory, onUpdateCategory, onDeleteCategory, onAddSubCategory, onDeleteSubCategory, notifications }) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');
    const [newSubCategory, setNewSubCategory] = useState<{[key: string]: string}>({});

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
            onAddCategory(newCategoryName.trim());
            setNewCategoryName('');
        }
    };

    const handleEditStart = (category: Category) => {
        setEditingCategoryId(category.id);
        setEditingCategoryName(category.name);
    };

    const handleEditSave = (id: string) => {
        if (editingCategoryName.trim()) {
            onUpdateCategory(id, editingCategoryName.trim());
        }
        setEditingCategoryId(null);
        setEditingCategoryName('');
    };

    const handleSubCategoryChange = (categoryId: string, value: string) => {
      setNewSubCategory(prev => ({...prev, [categoryId]: value}));
    };

    const handleAddSub = (categoryId: string) => {
      const subCategoryName = newSubCategory[categoryId]?.trim();
      if(subCategoryName) {
        onAddSubCategory(categoryId, subCategoryName);
        setNewSubCategory(prev => ({...prev, [categoryId]: ''}));
      }
    }

    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_CATEGORIES} notifications={notifications}>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">Manage Product Categories</h2>
                
                <div className="bg-white shadow rounded p-6 mb-8">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Add New Category</h3>
                    <form onSubmit={handleAdd} className="flex space-x-2">
                        <input 
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="New category name"
                            className="flex-grow px-3 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"
                        />
                        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm font-medium">Add</button>
                    </form>
                </div>

                <div className="bg-white shadow rounded overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-500">
                          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                              <tr>
                                  <th className="px-6 py-3">Category</th>
                                  <th className="px-6 py-3">Sub-categories</th>
                                  <th className="px-6 py-3 text-right">Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {categories.map(category => (
                                  <tr key={category.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                      <td className="px-6 py-4 align-top w-1/3">
                                          {editingCategoryId === category.id ? (
                                              <input 
                                                  type="text"
                                                  value={editingCategoryName}
                                                  onChange={(e) => setEditingCategoryName(e.target.value)}
                                                  className="px-2 py-1 border border-slate-300 rounded sm:text-sm bg-white"
                                                  autoFocus
                                                  onBlur={() => handleEditSave(category.id)}
                                                  onKeyDown={(e) => e.key === 'Enter' && handleEditSave(category.id)}
                                              />
                                          ) : (
                                              <span className="font-medium text-slate-900">{category.name}</span>
                                          )}
                                      </td>
                                      <td className="px-6 py-4 align-top">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                          {(category.subcategories || []).map(sub => (
                                            <div key={sub} className="bg-slate-200 text-slate-700 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                              {sub}
                                              <button onClick={() => onDeleteSubCategory(category.id, sub)} className="ml-2 text-slate-500 hover:text-slate-800">&times;</button>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="flex space-x-2">
                                          <input 
                                            type="text" 
                                            placeholder="New sub-category"
                                            value={newSubCategory[category.id] || ''}
                                            onChange={e => handleSubCategoryChange(category.id, e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleAddSub(category.id)}
                                            className="px-2 py-1 border border-slate-300 rounded sm:text-sm w-40 bg-white"
                                          />
                                          <button onClick={() => handleAddSub(category.id)} className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-700 text-xs font-medium">Add</button>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 text-right align-top">
                                          {editingCategoryId === category.id ? (
                                              <button onClick={() => handleEditSave(category.id)} className="font-medium text-emerald-600 hover:underline text-xs">Save</button>
                                          ) : (
                                              <div className="flex justify-end space-x-4">
                                                  <button onClick={() => handleEditStart(category)} className="font-medium text-emerald-600 hover:underline text-xs">Edit</button>
                                                  <button onClick={() => onDeleteCategory(category)} className="font-medium text-red-600 hover:underline text-xs">Delete</button>
                                              </div>
                                          )}
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

export default AdminCategoriesScreen;