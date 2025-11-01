

import React, { useState, useEffect, useMemo } from 'react';
import { AppView, UserType, User, Product, Order, Dispute, CartItem, Notification, Transaction, OrderStatus, KycField, HomepageContent, Category } from './types';
import { viewToPath, pathToView } from './routes';

import JoinScreen from './screens/JoinScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerificationScreen from './screens/VerificationScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SetNewPasswordScreen from './screens/SetNewPasswordScreen';
import CompleteProfileVendorScreen from './screens/CompleteProfileVendorScreen';
import CompleteProfileIndividualStep2 from './screens/CompleteProfileIndividualStep2';
import CompleteProfileIndividualStep3 from './screens/CompleteProfileIndividualStep3';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import VendorDashboardScreen from './screens/vendor/VendorDashboardScreen';
import VendorProductsScreen from './screens/vendor/VendorProductsScreen';
import VendorOrdersScreen from './screens/vendor/VendorOrdersScreen';
import VendorOrderDetailScreen from './screens/vendor/VendorOrderDetailScreen';
import VendorCustomersScreen from './screens/vendor/VendorCustomersScreen';
import VendorWalletScreen from './screens/vendor/VendorWalletScreen';
import BuyerDashboardScreen from './screens/buyer/BuyerDashboardScreen';
import SupportDashboardScreen from './screens/support/SupportDashboardScreen';
import SupportDisputesScreen from './screens/support/SupportDisputesScreen';
import AddEditProductScreen from './screens/vendor/AddEditProductScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import AdminUsersScreen from './screens/admin/AdminUsersScreen';
import AdminCategoriesScreen from './screens/admin/AdminCategoriesScreen';
import AdminKycSubmissionsScreen from './screens/admin/AdminKycSubmissionsScreen';
import AdminKycDetailScreen from './screens/admin/AdminKycDetailScreen';
import BuyerProductsScreen from './screens/buyer/BuyerProductsScreen';
import BuyerOrderDetailScreen from './screens/buyer/BuyerOrderDetailScreen';
import BuyerCartScreen from './screens/buyer/BuyerCartScreen';
import BuyerCheckoutScreen from './screens/buyer/BuyerCheckoutScreen';
import SupportDisputeDetailScreen from './screens/support/SupportDisputeDetailScreen';
import SettingsScreen from './screens/SettingsScreen';
import KycScreen from './screens/KycScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import PublicLayout from './components/layouts/PublicLayout';
import Modal from './components/shared/Modal';
import Toast from './components/shared/Toast';
import AdminOrdersScreen from './screens/admin/AdminOrdersScreen';
import AdminOrderDetailScreen from './screens/admin/AdminOrderDetailScreen';
import AdminAddEditUserScreen from './screens/admin/AdminAddEditUserScreen';
import AdminEditUserScreen from './screens/admin/AdminEditUserScreen';
import AdminKycSettingsScreen from './screens/admin/AdminKycSettingsScreen';
import AdminContentScreen from './screens/admin/AdminContentScreen';
import AdminProductsScreen from './screens/admin/AdminProductsScreen';


import { mockDisputes, mockOrders, mockProducts, mockUsers as initialUsers, mockNotifications, mockTransactions, mockCategories } from './data/mockData';
import { Images } from './data/images';


const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const getViewFromHash = () => {
    const hash = window.location.hash.slice(1);
    if (hash === '' || hash === '#') return AppView.HOME;
    if (pathToView[hash] !== undefined) {
      return pathToView[hash];
    }
    return AppView.NOT_FOUND;
  };
  
  const [view, setView] = useState<AppView>(getViewFromHash());
  
  // Registration flow state
  const [registrationDetails, setRegistrationDetails] = useState({email: 'johndoe@gmail.com', userType: UserType.NONE, password: ''});

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  // Admin configurable state
  const [kycFields, setKycFields] = useState<KycField[]>([
    { id: 'field1', label: 'Government-Issued ID', type: 'file' },
    { id: 'field2', label: 'Proof of Address', type: 'file' }
  ]);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>({
      heroTitle: 'Global Food Trading That Works',
      heroSubtitle: 'Finely processed farm produce, safe guaranteed with secured unwavering promises.',
      heroImageUrl: Images.backgrounds.heroBg,
      promoText: '37% OFF',
      promoImageUrl: Images.backgrounds.saleBg,
      features: [
        { icon: 'FastShippingIcon', title: 'Fast Shipping', description: 'Free shipping on all your order' },
        { icon: 'CustomerSupportIcon', title: 'Customer Support 24/7', description: 'Instant access to support' },
        { icon: 'SecurePaymentIcon', title: '100% Secure Payment', description: 'We ensure your money is safe' },
        { icon: 'MoneyBackIcon', title: 'Money-Back Guarantee', description: '30 days money-back guarantee' }
      ],
      deliverySection: {
        title: 'We Delivered Your Order.',
        description: 'Ut suscipit agentibus susequit, Sed pondera pellentesque nunc, pretium suspendisse enim, tellus vitae. Sed non tincidunt sem, quis porttitor lorem. Maecenas commodo quam in tellus tempus, quis elementum.',
        subDescription: 'Maecenas ut nunc fringilla eros varius.',
        buttonText: 'Shop Now',
        imageUrl: Images.backgrounds.deliveryBg
      }
  });


  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedKycUser, setSelectedKycUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Modals and toasts
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  // Other state
  const [emailForPasswordReset, setEmailForPasswordReset] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }
    return products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [products, searchQuery]);
  
  useEffect(() => {
    const handleHashChange = () => {
      setView(getViewFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    // Set initial view
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  useEffect(() => {
      if (view !== AppView.PRODUCT_DETAIL) {
          setSelectedProduct(null);
      }
      // Clear search when navigating away from product pages
      if (view !== AppView.HOME && view !== AppView.PRODUCT_DETAIL) {
          setSearchQuery('');
      }
  }, [view]);

  const navigateTo = (newView: AppView) => {
    const path = viewToPath[newView];
    if (path === undefined) {
      window.location.hash = viewToPath[AppView.NOT_FOUND];
    } else {
      window.location.hash = path;
    }
  };
  
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ message, type });
  };


  const handleLogin = (user: User) => {
    const foundUser = users.find(u => u.id === user.id);
    setCurrentUser(foundUser || user);
    setIsLoggedIn(true);
    setCart([]);
    switch (foundUser?.type) {
      case UserType.VENDOR:
        navigateTo(AppView.VENDOR_DASHBOARD);
        break;
      case UserType.BUYER:
        navigateTo(AppView.BUYER_DASHBOARD);
        break;
      case UserType.SUPPORT_AGENT:
        navigateTo(AppView.SUPPORT_DASHBOARD);
        break;
      case UserType.SUPER_ADMIN:
        navigateTo(AppView.ADMIN_DASHBOARD);
        break;
      default:
        navigateTo(AppView.HOME);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCart([]);
    navigateTo(AppView.HOME);
  };

  const handleRegister = (email: string, userType: UserType, password?: string) => {
    setRegistrationDetails({ email, userType, password: password || '' });
    navigateTo(AppView.VERIFY_EMAIL);
  };

  const handleVerificationSuccess = () => {
    if (registrationDetails.userType === UserType.VENDOR) {
      navigateTo(AppView.COMPLETE_PROFILE_VENDOR);
    } else {
      navigateTo(AppView.COMPLETE_PROFILE_INDIVIDUAL_STEP2);
    }
  };

  const handleProfileCompletion = (name: string) => {
    const newUser: User = { 
        id: `usr_${Date.now()}`, name, email: registrationDetails.email, type: registrationDetails.userType, password: registrationDetails.password,
        avatarUrl: Images.users.newUser,
        address: { street: '', city: '', country: ''},
        phone: '', registeredDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString(), status: 'Active',
        kycStatus: 'Not Submitted'
    };
    setUsers([...users, newUser]);
    showToast('Registration successful! Welcome.', 'success');
    handleLogin(newUser);
  }
  
  const handleSelectProduct = (product: Product) => {
      setSelectedProduct(product);
      navigateTo(AppView.PRODUCT_DETAIL);
  }
  
  const handleForgotPasswordRequest = (email: string) => {
    const userExists = users.some(u => u.email === email);
    if (userExists) {
        setEmailForPasswordReset(email);
        showToast('Password reset instructions sent!', 'success');
        navigateTo(AppView.SET_NEW_PASSWORD);
    } else {
        showToast('No account found with that email.', 'error');
    }
  };

  const handleSetNewPassword = (password: string) => {
    if (!emailForPasswordReset) {
        showToast('Something went wrong. Please try again.', 'error');
        navigateTo(AppView.FORGOT_PASSWORD);
        return;
    }
    setUsers(users.map(u => u.email === emailForPasswordReset ? { ...u, password } : u));
    setEmailForPasswordReset(null);
    showToast('Password updated successfully. Please log in.', 'success');
    navigateTo(AppView.LOGIN);
  };

  // User Settings Update
  const handleUpdateProfile = (name: string, phone: string) => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, name, phone };
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      showToast('Profile updated successfully.');
  };

  const handleUpdatePassword = (password: string) => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, password };
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      showToast('Password updated successfully.');
  };

  const handleUpdateAddress = (address: User['address']) => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, address };
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      showToast('Address updated successfully.');
  };


  // KYC Management
  const handleKycSubmit = () => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, kycStatus: 'Pending' as const };
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      showToast('KYC documents submitted for review.');
      navigateTo(AppView.SETTINGS);
  };
  
  const handleViewKyc = (userToView: User) => {
      setSelectedKycUser(userToView);
      navigateTo(AppView.ADMIN_KYC_DETAIL);
  };
  
  const handleUpdateKyc = (userId: string, status: 'Verified' | 'Rejected', reason = '') => {
      setUsers(users.map(u => u.id === userId ? { ...u, kycStatus: status, kycRejectionReason: reason } : u));
      showToast(`KYC status for user ${userId} updated to ${status}.`);
      navigateTo(AppView.ADMIN_KYC_SUBMISSIONS);
  };

  const handleUpdateKycFields = (newFields: KycField[]) => {
      setKycFields(newFields);
      showToast('KYC requirements updated.');
  };

  // User Management (Admin)
  const handleDeactivateUserRequest = (user: User) => {
    setUserToDeactivate(user);
  }
  const handleConfirmDeactivateUser = () => {
    if (!userToDeactivate) return;
    setUsers(users.filter(u => u.id !== userToDeactivate.id));
    setUserToDeactivate(null);
    showToast('User has been deactivated.', 'success');
  }
  const handleCreateUser = (newUser: Omit<User, 'id' | 'avatarUrl' | 'address' | 'phone' | 'registeredDate' | 'lastLogin' | 'status' | 'kycStatus'>) => {
      const user: User = {
          ...newUser,
          id: `usr_${Date.now()}`,
          avatarUrl: Images.users.newUser,
          address: { street: '', city: '', country: ''},
          phone: '',
          registeredDate: new Date().toISOString().split('T')[0],
          lastLogin: new Date().toISOString(),
          status: 'Active',
          kycStatus: 'Not Submitted',
      };
      setUsers(prev => [...prev, user]);
      showToast(`User ${user.name} created successfully.`);
      navigateTo(AppView.ADMIN_USERS);
  };
  const handleNavigateToEditUser = (user: User) => {
    setEditingUser(user);
    navigateTo(AppView.ADMIN_EDIT_USER);
  };
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
    showToast('User details updated successfully.');
    navigateTo(AppView.ADMIN_USERS);
  };

  // Content Management (Admin)
  const handleUpdateHomepageContent = (content: HomepageContent) => {
      setHomepageContent(content);
      showToast('Homepage content updated.');
  }


  // Product Management
  const handleNavigateToAddProduct = () => {
    if (currentUser?.type === UserType.VENDOR && currentUser?.kycStatus !== 'Verified') {
        setShowKycModal(true);
        return;
    }
    setEditingProduct(null);
    navigateTo(AppView.VENDOR_ADD_EDIT_PRODUCT);
  };

  const handleNavigateToEditProduct = (product: Product) => {
    setEditingProduct(product);
    navigateTo(AppView.VENDOR_ADD_EDIT_PRODUCT);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'sales' | 'vendorId' | 'rating' | 'reviewCount' | 'reviews'>) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...editingProduct, ...productData } : p
      ));
      showToast('Product updated successfully.');
    } else {
      const newProduct: Product = {
        ...productData,
        id: `PROD${Date.now()}`,
        sales: 0,
        vendorId: currentUser!.id,
        rating: 0,
        reviewCount: 0,
        reviews: [],
      };
      setProducts([newProduct, ...products]);
      showToast('Product added successfully.');
    }
    navigateTo(AppView.VENDOR_PRODUCTS);
  };
  
  const handleDeleteProductRequest = (product: Product) => {
    setProductToDelete(product);
  }

  const handleConfirmDeleteProduct = () => {
    if (!productToDelete) return;
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setProductToDelete(null);
    showToast('Product has been deleted.', 'success');
  }
  
  // Dispute Management
  const handleViewDispute = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    navigateTo(AppView.SUPPORT_DISPUTE_DETAIL);
  };

  const handleAddDisputeMessage = (disputeId: string, message: { user: string; text: string; timestamp: string; }) => {
    setDisputes(disputes.map(d => 
        d.id === disputeId ? { ...d, messages: [...d.messages, message] } : d
    ));
    if (selectedDispute?.id === disputeId) {
        setSelectedDispute(prev => prev ? ({ ...prev, messages: [...prev.messages, message] }) : null);
    }
  };

  const handleUpdateDisputeStatus = (disputeId: string, status: string, resolutionAction?: { type: 'refund', amount?: number } | { type: 'release' }) => {
    setDisputes(disputes.map(d => (d.id === disputeId ? { ...d, status } : d)));
     if (selectedDispute?.id === disputeId) {
        setSelectedDispute(prev => prev ? ({...prev, status}) : null);
    }
    showToast(`Dispute #${disputeId} status updated to ${status}.`);
    
    if (resolutionAction) {
        const dispute = disputes.find(d => d.id === disputeId);
        if(!dispute) return;
        
        if (resolutionAction.type === 'release') {
            handleConfirmDelivery(dispute.orderId, true);
            showToast(`Funds for order #${dispute.orderId} released to vendor.`);
        } else if (resolutionAction.type === 'refund') {
            const order = orders.find(o => o.id === dispute.orderId);
            if(order) {
              const refundAmount = resolutionAction.amount ?? order.total;
              setOrders(orders.map(o => o.id === dispute.orderId ? {...o, status: 'Refunded'} : o));
              const newTransaction: Transaction = {
                id: `trn_${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                type: 'Refund',
                amount: -refundAmount,
                status: 'Completed',
                description: `Refund for order #${order.id}`
              };
              setTransactions(prev => [newTransaction, ...prev]);
              showToast(`Order #${dispute.orderId} has been refunded for N${refundAmount.toLocaleString()}.`);
            }
        }
    }
  };
  
  // Order Management
  const handleViewOrder = (order: Order) => {
      setSelectedOrder(order);
      if (currentUser?.type === UserType.VENDOR) {
          navigateTo(AppView.VENDOR_ORDER_DETAIL);
      } else if (currentUser?.type === UserType.BUYER) {
          navigateTo(AppView.BUYER_ORDER_DETAIL);
      } else if (currentUser?.type === UserType.SUPER_ADMIN) {
          navigateTo(AppView.ADMIN_ORDER_DETAIL);
      }
  };
  
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updatedOrders = orders.map(o => {
        if (o.id === orderId) {
            const newHistory = [...o.trackingHistory, { status, date: new Date().toISOString(), location: 'Vendor Hub' }];
            return {...o, status, trackingHistory: newHistory};
        }
        return o;
    });
    setOrders(updatedOrders);

    if (selectedOrder?.id === orderId) {
        const updatedOrder = updatedOrders.find(o => o.id === orderId);
        setSelectedOrder(updatedOrder || null);
    }
    showToast(`Order #${orderId} status updated to ${status}.`);
  };
  
  const handleCreateDispute = (orderId: string, reason: string) => {
      if (!currentUser) return;
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      const newDispute: Dispute = {
          id: `DISP${Date.now()}`,
          orderId,
          buyer: currentUser.name,
          vendor: "Vendor Inc.",
          reason,
          status: 'Open',
          date: new Date().toISOString().split('T')[0],
          messages: [{
              user: currentUser.name,
              text: `Dispute opened. Reason: ${reason}`,
              timestamp: new Date().toLocaleString()
          }]
      };
      setDisputes([newDispute, ...disputes]);
      handleUpdateOrderStatus(orderId, 'Disputed');
      showToast('Dispute has been created. A support agent will review your case.', 'success');
      navigateTo(AppView.BUYER_DASHBOARD);
  };
  
  const handleConfirmDelivery = (orderId: string, forceComplete = false) => {
    let orderToUpdate = orders.find(o => o.id === orderId);
    if (!orderToUpdate) return;
    
    let updatedOrders = orders.map(o => 
        o.id === orderId 
        ? {...o, status: 'Delivered' as const, trackingHistory: [...o.trackingHistory, {status: 'Delivered' as const, date: new Date().toISOString(), location: 'Customer Address'}]} 
        : o
    );
    setOrders(updatedOrders);
    
    const recentlyUpdatedOrder = updatedOrders.find(o => o.id === orderId);
    if (selectedOrder?.id === orderId) {
        setSelectedOrder(recentlyUpdatedOrder || null);
    }
    showToast('Delivery confirmed. Thank you!', 'success');
    
    setTimeout(() => {
        // Use the updatedOrders from the closure to avoid stale state
        const finalOrders = updatedOrders.map(o => {
            if (o.id === orderId) {
                const newHistory = [...o.trackingHistory, {status: 'Completed' as const, date: new Date().toISOString()}];
                return {...o, status: 'Completed' as const, trackingHistory: newHistory };
            }
            return o;
        });
        setOrders(finalOrders);

        const finalOrder = finalOrders.find(o => o.id === orderId);
        if (selectedOrder?.id === orderId) {
            setSelectedOrder(finalOrder || null);
        }
        
        if (finalOrder?.usedEscrow) {
            const newTransaction: Transaction = {
                id: `trn_${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                type: 'Escrow Release',
                amount: finalOrder.total,
                status: 'Completed',
                description: `Payment for order #${finalOrder.id}`
            };
            setTransactions(prev => [newTransaction, ...prev]);
        }
    }, forceComplete ? 0 : 2000);
  };


  // Cart & Checkout Management
  const handleAddToCart = (productToAdd: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
    showToast(`${productToAdd.name} added to cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
      if (quantity <= 0) {
          handleRemoveFromCart(productId);
      } else {
          setCart(cart.map(item => item.id === productId ? {...item, quantity} : item));
      }
  };

  const handleRemoveFromCart = (productId: string) => {
      setCart(cart.filter(item => item.id !== productId));
  };
  
  const handlePlaceOrder = (useEscrow: boolean) => {
      if (!currentUser || cart.length === 0) return;
      if (currentUser.kycStatus !== 'Verified') {
          setShowKycModal(true);
          return;
      }
      const newOrder: Order = {
          id: `ORD${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          customer: currentUser.name,
          customerId: currentUser.id,
          total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5000,
          status: useEscrow ? 'Payment in Escrow' : 'Pending',
          items: cart,
          shippingAddress: currentUser.address,
          paymentMethod: 'Card **** 1234',
          usedEscrow: useEscrow,
          trackingHistory: [
              { status: 'Order Placed', date: new Date().toISOString(), location: 'Online Store' },
              { status: useEscrow ? 'Payment in Escrow' : 'Pending', date: new Date().toISOString() }
          ]
      };
      setOrders([newOrder, ...orders]);
      setCart([]);
      showToast('Order placed successfully!', 'success');
  };

  // Vendor Wallet
  const handleRequestPayout = (amount: number) => {
    if (!currentUser) return;
     if (currentUser.kycStatus !== 'Verified') {
        setShowKycModal(true);
        return;
    }
    const newTransaction: Transaction = {
      id: `trn_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'Payout',
      amount: -amount,
      status: 'Pending',
      description: 'Withdrawal to bank account'
    };
    setTransactions([newTransaction, ...transactions]);
    showToast(`Payout request for N${amount.toLocaleString()} submitted.`);
  };

  // Category Management (Admin)
  const handleAddCategory = (name: string) => {
      const newCategory: Category = { id: `cat_${Date.now()}`, name, subcategories: [] };
      setCategories(prev => [...prev, newCategory]);
      showToast('Category added successfully.');
  };
  const handleUpdateCategory = (id: string, newName: string) => {
      const oldName = categories.find(c => c.id === id)?.name;
      if (oldName === newName) return;
      
      setCategories(categories.map(c => c.id === id ? { ...c, name: newName } : c));
      setProducts(products.map(p => p.category === oldName ? { ...p, category: newName } : p));
      showToast('Category updated successfully.');
  };
  const handleDeleteCategoryRequest = (category: Category) => {
      const isUsed = products.some(p => p.category === category.name);
      if (isUsed) {
          showToast(`Cannot delete "${category.name}" as it is being used by products.`, 'error');
          return;
      }
      setCategoryToDelete(category);
  };
   const handleConfirmDeleteCategory = () => {
    if (!categoryToDelete) return;
    setCategories(categories.filter(c => c.id !== categoryToDelete.id));
    setCategoryToDelete(null);
    showToast('Category has been deleted.', 'success');
  };

  const handleAddSubCategory = (categoryId: string, subCategoryName: string) => {
    setCategories(categories.map(c => 
      c.id === categoryId 
        ? { ...c, subcategories: [...(c.subcategories || []), subCategoryName] }
        : c
    ));
    showToast('Sub-category added.');
  };

  const handleDeleteSubCategory = (categoryId: string, subCategoryName: string) => {
    setCategories(categories.map(c => 
      c.id === categoryId 
        ? { ...c, subcategories: (c.subcategories || []).filter(s => s !== subCategoryName) }
        : c
    ));
    showToast('Sub-category removed.');
  };


  const renderView = () => {
    switch (view) {
      case AppView.JOIN:
        return <JoinScreen onNavigate={navigateTo} onSetUserType={(type) => setRegistrationDetails({...registrationDetails, userType: type})} onNavigateHome={() => navigateTo(AppView.HOME)} />;
      case AppView.REGISTER_INDIVIDUAL:
      case AppView.REGISTER_VENDOR:
        return <RegisterScreen userType={registrationDetails.userType} onNavigate={navigateTo} onRegister={handleRegister} onNavigateHome={() => navigateTo(AppView.HOME)} />;
      case AppView.VERIFY_EMAIL:
        return <VerificationScreen email={registrationDetails.email} userType={registrationDetails.userType} onNavigate={navigateTo} onSuccess={handleVerificationSuccess} onNavigateHome={() => navigateTo(AppView.HOME)} />;
      case AppView.LOGIN:
        return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
      case AppView.FORGOT_PASSWORD:
        return <ForgotPasswordScreen onNavigate={navigateTo} onResetRequest={handleForgotPasswordRequest} onNavigateHome={() => navigateTo(AppView.HOME)} />;
      case AppView.SET_NEW_PASSWORD:
        return <SetNewPasswordScreen onNavigate={navigateTo} onPasswordSet={handleSetNewPassword} onNavigateHome={() => navigateTo(AppView.HOME)} />;
      case AppView.COMPLETE_PROFILE_VENDOR:
        return <CompleteProfileVendorScreen onNavigate={navigateTo} onFinish={handleProfileCompletion} />;
      case AppView.COMPLETE_PROFILE_INDIVIDUAL_STEP2:
        return <CompleteProfileIndividualStep2 onNavigate={navigateTo} onNavigateHome={() => navigateTo(AppView.HOME)} />;
      case AppView.COMPLETE_PROFILE_INDIVIDUAL_STEP3:
        return <CompleteProfileIndividualStep3 onNavigate={navigateTo} onFinish={handleProfileCompletion} onNavigateHome={() => navigateTo(AppView.HOME)} />;
      case AppView.PRODUCT_DETAIL:
        return (
            <PublicLayout onNavigate={navigateTo} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} cartCount={cart.length} onSearch={setSearchQuery} onShowAuthModal={() => setShowAuthModal(true)}>
                <ProductDetailScreen product={selectedProduct} onAddToCart={handleAddToCart} onNavigate={navigateTo} />
            </PublicLayout>
        );
      
      // Vendor
      case AppView.VENDOR_DASHBOARD:
        if (!currentUser || currentUser.type !== UserType.VENDOR) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <VendorDashboardScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} products={products.filter(p=>p.vendorId === currentUser.id)} orders={orders} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.VENDOR_PRODUCTS:
        if (!currentUser || currentUser.type !== UserType.VENDOR) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <VendorProductsScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} products={products.filter(p=>p.vendorId === currentUser.id)} onAddProduct={handleNavigateToAddProduct} onEditProduct={handleNavigateToEditProduct} onDeleteProduct={handleDeleteProductRequest} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.VENDOR_ORDERS:
        if (!currentUser || currentUser.type !== UserType.VENDOR) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <VendorOrdersScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} orders={orders} onViewOrder={handleViewOrder} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.VENDOR_ADD_EDIT_PRODUCT:
        if (!currentUser || currentUser.type !== UserType.VENDOR) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AddEditProductScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} product={editingProduct} onSave={handleSaveProduct} onCancel={() => navigateTo(AppView.VENDOR_PRODUCTS)} notifications={notifications.filter(n=>n.userId === currentUser.id)} categories={categories} />;
      case AppView.VENDOR_ORDER_DETAIL:
        if (!currentUser || currentUser.type !== UserType.VENDOR) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <VendorOrderDetailScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} order={selectedOrder} onBack={() => navigateTo(AppView.VENDOR_ORDERS)} onUpdateStatus={handleUpdateOrderStatus} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.VENDOR_CUSTOMERS:
        if (!currentUser || currentUser.type !== UserType.VENDOR) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <VendorCustomersScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} orders={orders} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.VENDOR_WALLET:
        if (!currentUser || currentUser.type !== UserType.VENDOR) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <VendorWalletScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} orders={orders} transactions={transactions} notifications={notifications.filter(n=>n.userId === currentUser.id)} onRequestPayout={handleRequestPayout} />;

      // Buyer
      case AppView.BUYER_DASHBOARD:
        if (!currentUser || currentUser.type !== UserType.BUYER) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <BuyerDashboardScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} orders={orders} onViewOrder={handleViewOrder} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
       case AppView.BUYER_PRODUCTS:
        if (!currentUser || currentUser.type !== UserType.BUYER) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <BuyerProductsScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} products={products} onAddToCart={handleAddToCart} onSelectProduct={handleSelectProduct} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.BUYER_ORDER_DETAIL:
        if (!currentUser || currentUser.type !== UserType.BUYER) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <BuyerOrderDetailScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} order={selectedOrder} onBack={() => navigateTo(AppView.BUYER_DASHBOARD)} onCreateDispute={handleCreateDispute} onConfirmDelivery={handleConfirmDelivery} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.BUYER_CART:
        if (!currentUser || currentUser.type !== UserType.BUYER) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <BuyerCartScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} cart={cart} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.BUYER_CHECKOUT:
         if (!currentUser || currentUser.type !== UserType.BUYER) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <BuyerCheckoutScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} cart={cart} onPlaceOrder={handlePlaceOrder} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;

      // Support
      case AppView.SUPPORT_DASHBOARD:
        if (!currentUser || currentUser.type !== UserType.SUPPORT_AGENT) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <SupportDashboardScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} disputes={disputes} onViewDispute={handleViewDispute} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.SUPPORT_DISPUTES:
        if (!currentUser || currentUser.type !== UserType.SUPPORT_AGENT) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <SupportDisputesScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} disputes={disputes} onViewDispute={handleViewDispute} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.SUPPORT_DISPUTE_DETAIL:
        if (!currentUser || currentUser.type !== UserType.SUPPORT_AGENT) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <SupportDisputeDetailScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} dispute={selectedDispute} order={orders.find(o => o.id === selectedDispute?.orderId)} onBack={() => navigateTo(AppView.SUPPORT_DISPUTES)} onAddMessage={handleAddDisputeMessage} onUpdateStatus={handleUpdateDisputeStatus} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      
      // Admin
      case AppView.ADMIN_DASHBOARD:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminDashboardScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} users={users} products={products} orders={orders} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_CATEGORIES:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminCategoriesScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} categories={categories} onAddCategory={handleAddCategory} onUpdateCategory={handleUpdateCategory} onDeleteCategory={handleDeleteCategoryRequest} onAddSubCategory={handleAddSubCategory} onDeleteSubCategory={handleDeleteSubCategory} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_PRODUCTS:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminProductsScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} products={products} onEditProduct={() => showToast('Admin product editing is not available.', 'error')} onDeleteProduct={handleDeleteProductRequest} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_USERS:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminUsersScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} users={users} onDeactivateUser={handleDeactivateUserRequest} onViewKyc={handleViewKyc} onEditUser={handleNavigateToEditUser} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_ADD_EDIT_USER:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminAddEditUserScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} onCreateUser={handleCreateUser} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_EDIT_USER:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminEditUserScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} editingUser={editingUser} onUpdateUser={handleUpdateUser} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_ORDERS:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminOrdersScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} orders={orders} onViewOrder={handleViewOrder} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_ORDER_DETAIL:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminOrderDetailScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} order={selectedOrder} onBack={() => navigateTo(AppView.ADMIN_ORDERS)} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_KYC_SUBMISSIONS:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminKycSubmissionsScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} users={users} onViewKyc={handleViewKyc} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
       case AppView.ADMIN_KYC_DETAIL:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminKycDetailScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} kycUser={selectedKycUser} onUpdateKyc={handleUpdateKyc} notifications={notifications.filter(n=>n.userId === currentUser.id)} kycFields={kycFields} />;
      case AppView.ADMIN_KYC_SETTINGS:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminKycSettingsScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} kycFields={kycFields} onUpdateKycFields={handleUpdateKycFields} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      case AppView.ADMIN_CONTENT_MANAGEMENT:
        if (!currentUser || currentUser.type !== UserType.SUPER_ADMIN) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <AdminContentScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} content={homepageContent} onUpdateContent={handleUpdateHomepageContent} notifications={notifications.filter(n=>n.userId === currentUser.id)} />;
      
      // Generic
      case AppView.SETTINGS:
        if (!currentUser) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <SettingsScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} notifications={notifications.filter(n=>n.userId === currentUser.id)} onUpdateProfile={handleUpdateProfile} onUpdatePassword={handleUpdatePassword} onUpdateAddress={handleUpdateAddress} />;
      case AppView.KYC_SUBMISSION:
        if (!currentUser) return <LoginScreen onNavigate={navigateTo} onLogin={handleLogin} onNavigateHome={() => navigateTo(AppView.HOME)} />;
        return <KycScreen user={currentUser} onNavigate={navigateTo} onLogout={handleLogout} onKycSubmit={handleKycSubmit} notifications={notifications.filter(n=>n.userId === currentUser.id)} kycFields={kycFields} />;

      case AppView.NOT_FOUND:
        return <NotFoundScreen onNavigate={navigateTo} />;

      case AppView.HOME:
      default:
        return <HomeScreen onNavigate={navigateTo} isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} cartCount={cart.length} onAddToCart={handleAddToCart} products={filteredProducts} onSelectProduct={handleSelectProduct} onSearch={setSearchQuery} homepageContent={homepageContent} categories={categories} onShowAuthModal={() => setShowAuthModal(true)} />;
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Modal 
        isOpen={!!productToDelete} 
        onClose={() => setProductToDelete(null)}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete the product "{productToDelete?.name}"? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3 mt-4">
            <button onClick={() => setProductToDelete(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300">Cancel</button>
            <button onClick={handleConfirmDeleteProduct} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
        </div>
      </Modal>
      <Modal 
        isOpen={!!userToDeactivate} 
        onClose={() => setUserToDeactivate(null)}
        title="Confirm Deactivation"
      >
        <p>Are you sure you want to deactivate the user "{userToDeactivate?.name}"? They will lose access to the platform.</p>
        <div className="flex justify-end space-x-3 mt-4">
            <button onClick={() => setUserToDeactivate(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300">Cancel</button>
            <button onClick={handleConfirmDeactivateUser} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Deactivate</button>
        </div>
      </Modal>
        <Modal 
        isOpen={!!categoryToDelete} 
        onClose={() => setCategoryToDelete(null)}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete the category "{categoryToDelete?.name}"? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3 mt-4">
            <button onClick={() => setCategoryToDelete(null)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300">Cancel</button>
            <button onClick={handleConfirmDeleteCategory} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
        </div>
      </Modal>
      <Modal 
        isOpen={showKycModal} 
        onClose={() => setShowKycModal(false)}
        title="Account Verification Required"
      >
        <p>To access this feature, you need to complete your KYC (Know Your Customer) verification.</p>
        <div className="flex justify-end space-x-3 mt-4">
            <button onClick={() => setShowKycModal(false)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300">Later</button>
            <button onClick={() => { setShowKycModal(false); navigateTo(AppView.KYC_SUBMISSION); }} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Start Verification</button>
        </div>
      </Modal>
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Authentication Required"
      >
        <p>You need to be logged in to access this feature. Please log in or create an account.</p>
        <div className="flex justify-end space-x-3 mt-4">
            <button onClick={() => { setShowAuthModal(false); navigateTo(AppView.JOIN); }} className="px-4 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300">Sign Up</button>
            <button onClick={() => { setShowAuthModal(false); navigateTo(AppView.LOGIN); }} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Login</button>
        </div>
    </Modal>
      {renderView()}
    </>
  );
};

export default App;