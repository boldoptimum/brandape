import React from 'react';
import { AppView, User, Product } from '../../types';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface BuyerProductsScreenProps {
  user: User;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  notifications: any[];
}

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ProductCard: React.FC<{product: Product, onAddToCart: () => void, onBuyNow: () => void, onViewDetails: () => void}> = ({product, onAddToCart, onBuyNow, onViewDetails}) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden group bg-white">
    <button onClick={onViewDetails} className="block w-full aspect-w-1 aspect-h-1 bg-gray-200">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
    </button>
    <div className="p-4 space-y-2">
        <p className="text-xs text-gray-500">{product.category}</p>
        <button onClick={onViewDetails} className="text-left">
            <h3 className="text-sm font-semibold text-gray-800 h-10 hover:text-emerald-600">{product.name}</h3>
        </button>
        <div className="flex items-center">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
            </div>
            <span className="text-xs text-gray-500 ml-2">| {product.sales} sold</span>
        </div>
        <p className="text-base font-bold text-gray-900">N {product.price.toLocaleString()}</p>
        <div className="flex space-x-2">
            <button onClick={onAddToCart} className="w-full text-sm py-2 px-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">Add to Cart</button>
            <button onClick={onBuyNow} className="w-full text-sm py-2 px-3 border border-emerald-600 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Buy Now</button>
        </div>
    </div>
  </div>
);


const BuyerProductsScreen: React.FC<BuyerProductsScreenProps> = ({ user, onNavigate, onLogout, products, onAddToCart, onSelectProduct, notifications }) => {
    
    const handleBuyNow = (product: Product) => {
        onAddToCart(product);
        onNavigate(AppView.BUYER_CART);
    }
    
    return (
        <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} activeView={AppView.BUYER_PRODUCTS} notifications={notifications}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(p => (
                    <ProductCard 
                        key={p.id} 
                        product={p} 
                        onAddToCart={() => onAddToCart(p)} 
                        onBuyNow={() => handleBuyNow(p)} 
                        onViewDetails={() => onSelectProduct(p)}
                    />
                ))}
            </div>
        </DashboardLayout>
    );
};

export default BuyerProductsScreen;
