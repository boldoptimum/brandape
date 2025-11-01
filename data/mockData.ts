

import { User, UserType, Product, Order, Dispute, Review, Notification, Transaction, Category } from '../types';
import { Images } from './images';

export const mockCategories: Category[] = [
    { id: 'cat_01', name: 'Grains', subcategories: ['Rice', 'Beans', 'Maize', 'Sorghum'] },
    { id: 'cat_02', name: 'Vegetables', subcategories: ['Leafy Greens', 'Peppers', 'Onions', 'Tomatoes'] },
    { id: 'cat_03', name: 'Fruits', subcategories: ['Plantain', 'Banana', 'Citrus', 'Berries'] },
    { id: 'cat_04', name: 'Tubers', subcategories: ['Yam', 'Cassava', 'Potato'] },
    { id: 'cat_05', name: 'Oils', subcategories: ['Palm Oil', 'Groundnut Oil'] },
];

export const mockUsers: User[] = [
    { 
        id: 'usr_buyer_01', name: 'John Doe', email: 'buyer@brandape.com', password: 'password123',
        avatarUrl: Images.users.buyer_01, type: UserType.BUYER,
        address: { street: '123 Market St', city: 'Lagos', country: 'Nigeria' },
        phone: '+2348012345678', registeredDate: '2023-01-15', lastLogin: '2024-07-20', status: 'Active',
        kycStatus: 'Verified'
    },
    { 
        id: 'usr_vendor_01', name: 'Vendor Inc.', email: 'vendor@brandape.com', password: 'password123',
        avatarUrl: Images.users.vendor_01, type: UserType.VENDOR,
        address: { street: '456 Industrial Ave', city: 'Kano', country: 'Nigeria' },
        phone: '+2348087654321', registeredDate: '2023-02-20', lastLogin: '2024-07-21', status: 'Active',
        kycStatus: 'Verified'
    },
    { 
        id: 'usr_support_01', name: 'Sam Agent', email: 'support@brandape.com', password: 'password123',
        avatarUrl: Images.users.support_01, type: UserType.SUPPORT_AGENT,
        address: { street: '789 Help Rd', city: 'Abuja', country: 'Nigeria' },
        phone: '+2348098765432', registeredDate: '2023-03-10', lastLogin: '2024-07-21', status: 'Active',
        kycStatus: 'Not Submitted'
    },
    { 
        id: 'usr_admin_01', name: 'Admin User', email: 'admin@brandape.com', password: 'password123',
        avatarUrl: Images.users.admin_01, type: UserType.SUPER_ADMIN,
        address: { street: '1 Admin Tower', city: 'Abuja', country: 'Nigeria' },
        phone: '+2348011223344', registeredDate: '2023-01-01', lastLogin: '2024-07-21', status: 'Active',
        kycStatus: 'Not Submitted'
    },
    { 
        id: 'usr_buyer_02', name: 'Jane Smith', email: 'jane@example.com', password: 'password123',
        avatarUrl: Images.users.buyer_02, type: UserType.BUYER,
        address: { street: '22B Baker Street', city: 'Ibadan', country: 'Nigeria' },
        phone: '+2348055556677', registeredDate: '2023-05-18', lastLogin: '2024-07-19', status: 'Active',
        kycStatus: 'Pending'
    },
     { 
        id: 'usr_vendor_02', name: 'Agro Supplies', email: 'agro@brandape.com', password: 'password123',
        avatarUrl: Images.users.vendor_02, type: UserType.VENDOR,
        address: { street: 'Farm Road', city: 'Oyo', country: 'Nigeria' },
        phone: '+2348011112222', registeredDate: '2024-06-10', lastLogin: '2024-07-20', status: 'Active',
        kycStatus: 'Rejected', kycRejectionReason: 'ID document was blurry. Please re-upload a clearer copy.'
    },
];

export const mockReviews: Review[] = [
    { id: 'rev001', userId: 'usr_buyer_01', userName: 'John Doe', avatarUrl: mockUsers[0].avatarUrl, rating: 5, comment: 'Excellent quality, exactly as described. Fast shipping too!', date: '2024-07-10' },
    { id: 'rev002', userId: 'usr_buyer_02', userName: 'Jane Smith', avatarUrl: mockUsers[4].avatarUrl, rating: 4, comment: 'Very good product, but the packaging could be better.', date: '2024-07-11' },
    { id: 'rev003', userId: 'usr_buyer_01', userName: 'John Doe', avatarUrl: mockUsers[0].avatarUrl, rating: 5, comment: 'I buy this all the time, always fresh!', date: '2024-06-25' },
    { id: 'rev004', userId: 'usr_buyer_02', userName: 'Jane Smith', avatarUrl: mockUsers[4].avatarUrl, rating: 3, comment: 'The plantains were a bit smaller than expected.', date: '2024-07-15' },
];

export const mockProducts: Product[] = [
  { id: 'PROD001', vendorId: 'usr_vendor_01', name: 'Sacks of assorted grains', imageUrl: Images.products.grains, images: [Images.products.grains, Images.products.grains_2], price: 18000, stock: 150, category: 'Grains', subcategory: 'Maize', sales: 120, status: 'Active', description: 'A variety of high-quality grains, including millet, sorghum, and maize. Perfect for all culinary needs and sourced from the best farms in Northern Nigeria.', rating: 4.8, reviewCount: 2, reviews: [mockReviews[0]], specs: [{key: 'Weight', value: '50kg'}, {key: 'Origin', value: 'Kano State'}]},
  { id: 'PROD002', vendorId: 'usr_vendor_01', name: 'Freshly harvested corn', imageUrl: Images.products.corn, images: [Images.products.corn], price: 12500, stock: 300, category: 'Vegetables', sales: 250, status: 'Active', description: 'Sweet and juicy corn, harvested at peak freshness. Ideal for roasting, boiling, or making pap.', rating: 4.5, reviewCount: 2, reviews: [mockReviews[1], mockReviews[2]], specs: [{key: 'Type', value: 'Sweet Corn'}, {key: 'Quantity', value: '50 cobs per sack'}]},
  { id: 'PROD003', vendorId: 'usr_vendor_01', name: 'Large bunch of green plantains', imageUrl: Images.products.plantains, images: [], price: 8000, stock: 50, category: 'Fruits', subcategory: 'Plantain', sales: 45, status: 'Inactive', description: 'Versatile green plantains, great for frying into dodo or boiling. A staple in West African cuisine.', rating: 4.2, reviewCount: 1, reviews: [mockReviews[3]], specs: [{key: 'Origin', value: 'Ogun State'}]},
  { id: 'PROD004', vendorId: 'usr_vendor_01', name: 'Organic carrots from the farm', imageUrl: Images.products.carrots, images: [], price: 10000, stock: 200, category: 'Vegetables', sales: 180, status: 'Active', description: 'Crisp and sweet organic carrots, packed with vitamins. No pesticides used.', rating: 4.9, reviewCount: 0, reviews: [], specs: [{key: 'Weight', value: '10kg bag'}]},
  { id: 'PROD005', vendorId: 'usr_vendor_01', name: 'Dried beans in a woven basket', imageUrl: Images.products.beans, images: [], price: 22000, stock: 0, category: 'Grains', subcategory: 'Beans', sales: 95, status: 'Active', description: 'Nutritious dried beans (Oloyin), a staple for any healthy diet. Known for its unique sweet taste.', rating: 4.7, reviewCount: 0, reviews: [], specs: [{key: 'Weight', value: '25kg'}, {key: 'Type', value: 'Honey Beans (Oloyin)'}]},
  { id: 'PROD006', vendorId: 'usr_vendor_02', name: 'Fresh Tomatoes Crate', imageUrl: Images.products.tomatoes, images: [], price: 15000, stock: 120, category: 'Vegetables', subcategory: 'Tomatoes', sales: 88, status: 'Active', description: 'Ripe and juicy tomatoes, perfect for stews, sauces, and salads. Sourced from Jos.', rating: 4.6, reviewCount: 0, reviews: [], specs: [{key: 'Weight', value: '25kg Crate'}, {key: 'Origin', value: 'Plateau State'}]},
  { id: 'PROD007', vendorId: 'usr_vendor_02', name: 'Bag of Onions', imageUrl: Images.products.onions, images: [], price: 9000, stock: 250, category: 'Vegetables', subcategory: 'Onions', sales: 210, status: 'Active', description: 'A large bag of fresh red onions, essential for adding flavor to any dish.', rating: 4.8, reviewCount: 0, reviews: [], specs: [{key: 'Weight', value: '20kg Bag'}]},
  { id: 'PROD008', vendorId: 'usr_vendor_02', name: 'Yams', imageUrl: Images.products.yams, images: [], price: 7500, stock: 80, category: 'Tubers', subcategory: 'Yam', sales: 60, status: 'Active', description: 'High-quality yams, perfect for pounding, boiling, or frying. A versatile energy source.', rating: 4.5, reviewCount: 0, reviews: [], specs: [{key: 'Quantity', value: '5 Tubers'}]},
  { id: 'PROD009', vendorId: 'usr_vendor_01', name: 'Fresh Peppers', imageUrl: Images.products.peppers, images: [], price: 5000, stock: 150, category: 'Vegetables', subcategory: 'Peppers', sales: 130, status: 'Active', description: 'A basket of mixed fresh peppers, including bell peppers and scotch bonnet for that extra kick.', rating: 4.7, reviewCount: 0, reviews: [], specs: [{key: 'Weight', value: '5kg basket'}]},
  { id: 'PROD010', vendorId: 'usr_vendor_02', name: 'Palm Oil Keg', imageUrl: Images.products.palmoil, images: [], price: 25000, stock: 40, category: 'Oils', subcategory: 'Palm Oil', sales: 35, status: 'Active', description: 'Authentic, unadulterated red palm oil. Perfect for traditional Nigerian dishes.', rating: 4.9, reviewCount: 0, reviews: [], specs: [{key: 'Volume', value: '25 Litres'}]},
];

export const mockOrders: Order[] = [
  { id: 'ORD552', date: '2023-10-27', customer: 'John Doe', customerId: 'usr_buyer_01', total: 30500, status: 'Shipped', items: [mockProducts[0], mockProducts[1]], shippingAddress: mockUsers[0].address, paymentMethod: 'Card **** 1234', trackingNumber: 'AWB123456789', usedEscrow: true, trackingHistory: [
      { status: 'Order Placed', date: '2023-10-27 10:00 AM', location: 'Online Store' },
      { status: 'Payment in Escrow', date: '2023-10-27 10:01 AM' },
      { status: 'Shipped', date: '2023-10-28 09:00 AM', location: 'Kano Logistics Hub' },
  ]},
  { id: 'ORD553', date: '2023-10-27', customer: 'Jane Smith', customerId: 'usr_buyer_02', total: 18000, status: 'Completed', items: [mockProducts[0]], shippingAddress: mockUsers[4].address, paymentMethod: 'Card **** 5678', usedEscrow: true, trackingHistory: [
      { status: 'Order Placed', date: '2023-10-27 11:00 AM', location: 'Online Store' },
      { status: 'Payment in Escrow', date: '2023-10-27 11:01 AM' },
      { status: 'Shipped', date: '2023-10-28 10:00 AM', location: 'Kano Logistics Hub' },
      { status: 'Delivered', date: '2023-10-29 02:00 PM', location: 'Ibadan, Customer Address' },
      { status: 'Completed', date: '2023-10-29 02:05 PM' },
  ]},
  { id: 'ORD554', date: '2023-10-26', customer: 'Bob Johnson', customerId: 'usr_buyer_03', total: 10000, status: 'Payment in Escrow', items: [mockProducts[3]], shippingAddress: { street: '10 Tech Road', city: 'Port Harcourt', country: 'Nigeria'}, paymentMethod: 'Bank Transfer', usedEscrow: true, trackingHistory: [
      { status: 'Order Placed', date: '2023-10-26 08:00 AM', location: 'Online Store' },
      { status: 'Payment in Escrow', date: '2023-10-26 08:01 AM' },
  ]},
  { id: 'ORD555', date: '2023-10-25', customer: 'Alice Williams', customerId: 'usr_buyer_04', total: 40500, status: 'Delivered', items: [mockProducts[1], mockProducts[2], mockProducts[4]], shippingAddress: { street: '5th Avenue', city: 'Abuja', country: 'Nigeria'}, paymentMethod: 'Card **** 4321', usedEscrow: false, trackingHistory: [
      { status: 'Order Placed', date: '2023-10-25 01:00 PM', location: 'Online Store' },
      { status: 'Pending', date: '2023-10-25 01:01 PM'},
      { status: 'Shipped', date: '2023-10-26 11:00 AM', location: 'Kano Logistics Hub' },
      { status: 'Delivered', date: '2023-10-27 03:00 PM', location: 'Abuja, Customer Address' },
  ]},
  { id: 'ORD556', date: '2023-10-25', customer: 'John Doe', customerId: 'usr_buyer_01', total: 8000, status: 'Cancelled', items: [mockProducts[2]], shippingAddress: mockUsers[0].address, paymentMethod: 'Card **** 1234', usedEscrow: true, trackingHistory: [
      { status: 'Order Placed', date: '2023-10-25 04:00 PM', location: 'Online Store' },
      { status: 'Payment in Escrow', date: '2023-10-25 04:01 PM' },
      { status: 'Cancelled', date: '2023-10-25 05:00 PM' },
  ]},
];

export const mockDisputes: Dispute[] = [
    { id: 'DISP001', orderId: 'ORD552', buyer: 'John Doe', vendor: 'Vendor Inc.', reason: 'Item not as described', status: 'Open', date: '2023-10-28', messages: [
        { user: 'John Doe', text: 'The grains I received are not the assorted variety as described. It\'s only one type.', timestamp: '2023-10-28 10:00 AM' },
        { user: 'Vendor Inc.', text: 'We apologize for the mix-up. Can you please provide a photo?', timestamp: '2023-10-28 10:05 AM' },
        { user: 'Sam Agent', text: 'Support has been notified. @Vendor Inc., please address the customer\'s concern.', timestamp: '2023-10-28 10:10 AM' },
    ], resolution: undefined},
    { id: 'DISP002', orderId: 'ORD553', buyer: 'Jane Smith', vendor: 'Agro Supplies', reason: 'Damaged on arrival', status: 'Resolved', date: '2023-10-28', messages: [
         { user: 'Jane Smith', text: 'The corn arrived crushed and is unusable.', timestamp: '2023-10-28 11:00 AM' },
         { user: 'Agro Supplies', text: 'We are very sorry to hear that. We have issued a full refund.', timestamp: '2023-10-28 11:15 AM' },
         { user: 'Sam Agent', text: 'Case resolved. Refund confirmed.', timestamp: '2023-10-28 11:20 AM' },
    ], resolution: 'Full refund issued by vendor.'},
    { id: 'DISP003', orderId: 'ORD555', buyer: 'Alice Williams', vendor: 'Vendor Inc.', reason: 'Late delivery', status: 'In Progress', date: '2023-10-27', messages: [
        { user: 'Alice Williams', text: 'My order was supposed to arrive yesterday. What is the status?', timestamp: '2023-10-27 09:00 AM' },
        { user: 'Vendor Inc.', text: 'We are checking with our shipping partner and will provide an update shortly.', timestamp: '2023-10-27 09:30 AM' },
    ], resolution: undefined},
    { id: 'DISP004', orderId: 'ORD556', buyer: 'Charlie Brown', vendor: 'Farm Fresh Co.', reason: 'Order not received', status: 'Open', date: '2023-10-26', messages: [
        { user: 'Charlie Brown', text: 'Tracking shows delivered, but I have not received the plantains.', timestamp: '2023-10-26 02:00 PM' },
    ], resolution: undefined},
    { id: 'DISP005', orderId: 'ORD551', buyer: 'David Clark', vendor: 'Vendor Inc.', reason: 'Wrong item sent', status: 'Resolved', date: '2023-10-25', messages: [
         { user: 'David Clark', text: 'I ordered carrots but received beans.', timestamp: '2023-10-25 04:00 PM' },
         { user: 'Vendor Inc.', text: 'Our mistake. We have shipped the correct item and you can keep the beans.', timestamp: '2023-10-25 04:15 PM' },
    ], resolution: 'Correct item shipped, customer kept incorrect item.'},
];

export const mockNotifications: Notification[] = [
    { id: 'notif001', userId: 'usr_vendor_01', type: 'order', message: 'New order #ORD554 received from Bob Johnson.', date: '2023-10-26', read: false, link: '/vendor/orders/detail' },
    { id: 'notif002', userId: 'usr_buyer_01', type: 'order', message: 'Your order #ORD552 has been shipped.', date: '2023-10-27', read: false, link: '/buyer/orders/detail' },
    { id: 'notif003', userId: 'usr_support_01', type: 'dispute', message: 'New dispute #DISP004 opened for order #ORD556.', date: '2023-10-26', read: false, link: '/support/disputes/detail' },
    { id: 'notif004', userId: 'usr_vendor_01', type: 'dispute', message: 'Dispute #DISP001 has been updated by support.', date: '2023-10-28', read: true, link: '/vendor/orders/detail' },
    { id: 'notif005', userId: 'usr_admin_01', type: 'system', message: 'A new vendor "Agro Supplies" has registered.', date: '2023-10-28', read: true, link: '/admin/users' },
    { id: 'notif006', userId: 'usr_vendor_01', type: 'wallet', message: 'Payment for order #ORD553 has been released to your wallet.', date: '2023-10-29', read: false, link: '/vendor/wallet'},
    { id: 'notif007', userId: 'usr_buyer_02', type: 'kyc', message: 'Your KYC documents are pending review.', date: '2024-07-21', read: false, link: '/settings' },
    { id: 'notif008', userId: 'usr_vendor_02', type: 'kyc', message: 'Your KYC submission was rejected. Please review the reason and resubmit.', date: '2024-07-20', read: false, link: '/settings' },
];

export const mockTransactions: Transaction[] = [
  { id: 'trn001', date: '2023-10-28', type: 'Escrow Release', amount: 18000, status: 'Completed', description: 'Sale from order #ORD553'},
  { id: 'trn002', date: '2023-10-28', type: 'Fee', amount: -1800, status: 'Completed', description: 'Platform fee for order #ORD553'},
  { id: 'trn003', date: '2023-10-29', type: 'Payout', amount: -16200, status: 'Pending', description: 'Withdrawal to GTBank'},
  { id: 'trn004', date: '2023-10-26', type: 'Sale', amount: 40500, status: 'Completed', description: 'Sale from order #ORD555'},
  { id: 'trn005', date: '2023-10-26', type: 'Fee', amount: -4050, status: 'Completed', description: 'Platform fee for order #ORD555'},
];