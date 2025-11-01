

import React, { useState } from 'react';
import { AppView, User, Product } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TrashIcon from '../../components/icons/TrashIcon';

interface AdminProductsScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onBulkDeleteProducts: (products: Product[]) => void;
  notifications: any[];
}

const getStatusClass = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800';
};

const getStockClass = (stock: number) => {
    if (stock > 50) return 'text-green-600';
    if (stock > 0) return 'text-yellow-600';
    return 'text-red-600';
};

const AdminProductsScreen: React.FC<AdminProductsScreenProps> = ({ user, onNavigate, onLogout, products, onEditProduct, onDeleteProduct, onBulkDeleteProducts, notifications }) => {
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedProductIds(products.map(p => p.id));
        } else {
            setSelectedProductIds([]);
        }
    };

    const handleSelectOne = (productId: string) => {
        if (selectedProductIds.includes(productId)) {
            setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
        } else {
            setSelectedProductIds([...selectedProductIds, productId]);
        }
    };

    const handleBulkDeleteClick = () => {
        const productsToDelete = products.filter(p => selectedProductIds.includes(p.id));
        if(productsToDelete.length > 0) {
            onBulkDeleteProducts(productsToDelete);
            setSelectedProductIds([]); // Clear selection after action
        }
    };
    
    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.ADMIN_PRODUCTS} notifications={notifications}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Management</h2>
            {selectedProductIds.length > 0 && (
                <div className="mb-4">
                    <button 
                        onClick={handleBulkDeleteClick} 
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium flex items-center"
                    >
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Delete Selected ({selectedProductIds.length})
                    </button>
                </div>
            )}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input 
                                            id="checkbox-all-products" 
                                            type="checkbox" 
                                            onChange={handleSelectAll} 
                                            checked={products.length > 0 && selectedProductIds.length === products.length}
                                            className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded focus:ring-emerald-500"
                                        />
                                        <label htmlFor="checkbox-all-products" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">Product Name</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Stock</th>
                                <th scope="col" className="px-6 py-3">Sales</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input 
                                                id={`checkbox-product-${product.id}`}
                                                type="checkbox" 
                                                onChange={() => handleSelectOne(product.id)}
                                                checked={selectedProductIds.includes(product.id)}
                                                className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded focus:ring-emerald-500"
                                            />
                                            <label htmlFor={`checkbox-product-${product.id}`} className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap flex items-center">
                                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover mr-4" />
                                        <span>{product.name}</span>
                                    </th>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4 font-semibold">N {product.price.toLocaleString()}</td>
                                    <td className={`px-6 py-4 font-medium ${getStockClass(product.stock)}`}>
                                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                    </td>
                                    <td className="px-6 py-4">{product.sales}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(product.status)}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <button onClick={() => onEditProduct(product)} className="text-emerald-600 hover:underline text-xs">Edit</button>
                                            <button onClick={() => onDeleteProduct(product)} className="text-red-600 hover:underline text-xs">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminProductsScreen;