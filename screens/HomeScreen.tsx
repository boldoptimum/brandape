

import React, { useState, useMemo } from 'react';
import { AppView, Product, User, HomepageContent, Category } from '../types';
import PublicLayout from '../components/layouts/PublicLayout';
import { Images } from '../data/images';
import FastShippingIcon from '../components/icons/FastShippingIcon';
import CustomerSupportIcon from '../components/icons/CustomerSupportIcon';
import SecurePaymentIcon from '../components/icons/SecurePaymentIcon';
import MoneyBackIcon from '../components/icons/MoneyBackIcon';

interface HomeScreenProps {
  onNavigate: (view: AppView) => void;
  isLoggedIn: boolean;
  currentUser: User | null;
  onLogout: () => void;
  cartCount: number;
  onAddToCart: (product: Product) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSearch?: (query: string) => void;
  homepageContent: HomepageContent;
  categories: Category[];
  onShowAuthModal: () => void;
}

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const iconMap = {
    FastShippingIcon,
    CustomerSupportIcon,
    SecurePaymentIcon,
    MoneyBackIcon
};


const ProductCard: React.FC<{product: Product, onAddToCartClick: () => void, onShopNowClick: () => void, onViewDetails: () => void}> = ({product, onAddToCartClick, onShopNowClick, onViewDetails}) => (
  <div className="border bg-white border-slate-200 rounded overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <button onClick={onViewDetails} className="block w-full aspect-w-1 aspect-h-1 bg-slate-200">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/>
    </button>
    <div className="p-4 space-y-2">
        <p className="text-xs text-slate-500">{product.category} {product.subcategory && `> ${product.subcategory}`}</p>
        <button onClick={onViewDetails} className="text-left">
            <h3 className="text-sm font-semibold text-slate-800 hover:text-emerald-600 h-10">{product.name}</h3>
        </button>
        <div className="flex items-center">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-slate-300'}`} />)}
            </div>
            <span className="text-xs text-slate-500 ml-2">| {product.sales} sold</span>
        </div>
        <p className="text-base font-bold text-slate-900">N {product.price.toLocaleString()}</p>
        <div className="flex space-x-2">
            <button onClick={onAddToCartClick} className="w-full text-sm py-2 px-3 border border-slate-300 rounded text-slate-700 hover:bg-slate-100">Add to Cart</button>
            <button onClick={onShopNowClick} className="w-full text-sm py-2 px-3 border border-emerald-600 bg-emerald-600 text-white rounded hover:bg-emerald-700">Shop Now</button>
        </div>
    </div>
  </div>
);

const SectionHeader: React.FC<{title: string, categories: string[], activeCategory: string, onSelectCategory: (category: string) => void}> = ({title, categories, activeCategory, onSelectCategory}) => (
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <div className="hidden md:flex flex-wrap space-x-2">
             <button onClick={() => onSelectCategory('All')} className={`px-4 py-2 text-sm font-medium rounded transition-colors ${activeCategory === 'All' ? 'text-white bg-emerald-600' : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'}`}>All</button>
            {categories.slice(0, 4).map(cat => (
                 <button key={cat} onClick={() => onSelectCategory(cat)} className={`px-4 py-2 text-sm font-medium rounded transition-colors ${activeCategory === cat ? 'text-white bg-emerald-600' : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'}`}>{cat}</button>
            ))}
        </div>
    </div>
)


const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, isLoggedIn, currentUser, onLogout, cartCount, onAddToCart, products, onSelectProduct, onSearch, homepageContent, categories, onShowAuthModal }) => {

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProductsByCategory = useMemo(() => {
    if (activeCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);


  const handleShopNow = (product: Product) => {
    onAddToCart(product);
    onNavigate(AppView.BUYER_CART);
  }
  
  const handleViewDetails = (product: Product) => {
    onSelectProduct(product);
  }

  const popularProducts = [...filteredProductsByCategory].sort((a, b) => b.sales - a.sales).slice(0, 5);
  const moreProducts = filteredProductsByCategory.slice(5, 10);
  const categoryNames = categories.map(c => c.name);

  return (
    <PublicLayout onNavigate={onNavigate} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={onLogout} cartCount={cartCount} onSearch={onSearch} onShowAuthModal={onShowAuthModal}>
        <section className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <aside className="w-full md:w-1/4">
                <div className="bg-emerald-600 text-white p-3 rounded-t font-semibold">All Categories</div>
                <ul className="border bg-white border-t-0 p-3 space-y-2 text-sm rounded-b">
                    {categories.map(cat => <li key={cat.id}><button onClick={() => setActiveCategory(cat.name)} className={`w-full text-left p-1 rounded ${activeCategory === cat.name ? 'text-emerald-600 font-bold bg-emerald-50' : 'text-slate-700'} hover:text-emerald-600 hover:bg-emerald-50`}>{cat.name}</button></li>)}
                </ul>
            </aside>
            <div className="w-full md:w-3/4 bg-slate-100 rounded p-10 flex items-center justify-between bg-cover bg-center" style={{backgroundImage: `url(${homepageContent.heroImageUrl})`}}>
                <div className="text-slate-800">
                    <h1 className="text-4xl font-bold max-w-md leading-tight">{homepageContent.heroTitle}</h1>
                    <p className="mt-2 max-w-md">{homepageContent.heroSubtitle}</p>
                </div>
            </div>
        </section>

        <section className="my-12 border bg-white rounded">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:divide-x">
                {homepageContent.features.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon];
                    return (
                        <div key={index} className="flex items-center p-4">
                            <IconComponent className="w-10 h-10 text-emerald-600 mr-4"/>
                            <div>
                                <h3 className="font-semibold text-sm">{feature.title}</h3>
                                <p className="text-xs text-slate-500">{feature.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>

        <section className="my-12">
            <SectionHeader title="Popular Products" categories={categoryNames} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {popularProducts.map(p => <ProductCard key={p.id} product={p} onAddToCartClick={() => onAddToCart(p)} onShopNowClick={() => handleShopNow(p)} onViewDetails={() => handleViewDetails(p)} />)}
            </div>
        </section>

        <section className="my-12 bg-slate-800 text-white rounded flex items-center p-12 bg-cover" style={{backgroundImage: `url(${homepageContent.promoImageUrl})`}}>
            <div className="bg-slate-800 bg-opacity-50 p-8 rounded">
                <p className="text-sm font-semibold text-yellow-400">SUMMER SALE</p>
                <h2 className="text-4xl font-bold my-2">{homepageContent.promoText}</h2>
                <p className="text-slate-300">Deals on every order. Free Shipping and 30 days money-back guarantee.</p>
                <button className="mt-6 bg-emerald-600 text-white py-2 px-6 rounded font-semibold hover:bg-emerald-700">Shop Now</button>
            </div>
        </section>

        <section className="my-12">
            <SectionHeader title="More Products" categories={categoryNames} activeCategory={activeCategory} onSelectCategory={setActiveCategory}/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {moreProducts.map(p => <ProductCard key={p.id} product={p} onAddToCartClick={() => onAddToCart(p)} onShopNowClick={() => handleShopNow(p)} onViewDetails={() => handleViewDetails(p)} />)}
            </div>
        </section>

        <section className="my-12 flex flex-col-reverse md:flex-row items-center bg-white rounded overflow-hidden border">
            <div className="w-full md:w-1/2 p-12">
                <h2 className="text-3xl font-bold text-slate-900">{homepageContent.deliverySection.title}</h2>
                <p className="mt-4 text-slate-600">{homepageContent.deliverySection.description}</p>
                <p className="mt-2 text-slate-600">{homepageContent.deliverySection.subDescription}</p>
                <button className="mt-6 bg-emerald-600 text-white py-2 px-6 rounded font-semibold hover:bg-emerald-700">{homepageContent.deliverySection.buttonText}</button>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img src={homepageContent.deliverySection.imageUrl} alt="Delivery person" className="w-full h-full object-cover"/>
            </div>
        </section>
    </PublicLayout>
  );
};

export default HomeScreen;