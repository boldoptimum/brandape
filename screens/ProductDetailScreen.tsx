

import React, { useState } from 'react';
import { AppView, Product, User, Review } from '../types';

interface ProductDetailScreenProps {
  product: Product | null;
  onAddToCart: (product: Product) => void;
  onNavigate: (view: AppView) => void;
}

const StarIcon: React.FC<React.SVGProps<SVGSVGElement> & { filled: boolean }> = ({ filled, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} {...props}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="border-t py-4">
        <div className="flex items-center mb-2">
            <img src={review.avatarUrl} alt={review.userName} className="w-10 h-10 rounded-full mr-3" />
            <div>
                <p className="font-semibold text-gray-800">{review.userName}</p>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}
                </div>
            </div>
            <p className="ml-auto text-sm text-gray-500">{review.date}</p>
        </div>
        <p className="text-gray-600 text-sm">{review.comment}</p>
    </div>
);


const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onAddToCart, onNavigate }) => {
    const [selectedImage, setSelectedImage] = useState(product?.imageUrl || '');
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
    
    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-700">Product not found.</h2>
                <button onClick={() => onNavigate(AppView.HOME)} className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md">Go Home</button>
            </div>
        );
    }
    
    const allImages = [product.imageUrl, ...product.images];

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="border rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-2 mt-4">
            {allImages.map((img, index) => (
              <button key={index} onClick={() => setSelectedImage(img)} className={`w-20 h-20 border rounded-md overflow-hidden ${selectedImage === img ? 'border-emerald-500 ring-2 ring-emerald-300' : ''}`}>
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center mt-2">
            <div className="flex">
                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < product.rating} />)}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-emerald-600 my-4">N {product.price.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">{product.description.split('.')[0]}.</p>
          <div className="mt-6">
            <button onClick={() => onAddToCart(product)} className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700">
                Add to Cart
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Category: <span className="font-medium text-gray-700">{product.category}</span></p>
            <p>Stock: <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</span></p>
          </div>
        </div>
      </div>
      
      {/* Description, Specs, Reviews */}
       <div className="mt-16">
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('description')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Description
            </button>
            <button onClick={() => setActiveTab('specs')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specs' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Specifications
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Reviews ({product.reviewCount})
            </button>
          </nav>
        </div>
        <div className="mt-6">
            {activeTab === 'description' && <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>}
            {activeTab === 'specs' && (
                <ul className="text-sm text-gray-700 space-y-2">
                    {product.specs.map(spec => (
                        <li key={spec.key} className="flex"><span className="w-32 text-gray-500">{spec.key}</span><span>{spec.value}</span></li>
                    ))}
                </ul>
            )}
            {activeTab === 'reviews' && (
                <div>
                    {product.reviews.length > 0 ? (
                        product.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                    ) : (
                        <p className="text-sm text-gray-500">No reviews yet for this product.</p>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
