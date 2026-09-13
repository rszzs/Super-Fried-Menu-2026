'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MenuItem, 
  Category, 
  RestaurantSettings, 
  Language, 
  DietaryTag, 
  CartItem,
  ItemReview,
  TableOrder
} from '@/types/menu';
import { 
  initialCategories, 
  initialMenuItems, 
  initialRestaurantSettings,
  initialReviews,
  initialOrders
} from '@/data/initialMenu';
import { 
  translations, 
  detectBrowserLanguage, 
  isRtl, 
  formatPrice 
} from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { PromotionalBanner } from '@/components/PromotionalBanner';
import { CategoryBar } from '@/components/CategoryBar';
import { MenuItemCard } from '@/components/MenuItemCard';
import { ItemDetailModal } from '@/components/ItemDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CallWaiterModal } from '@/components/CallWaiterModal';
import { AdminDashboard } from '@/components/AdminDashboard';
import { 
  ShoppingBag, 
  Utensils, 
  MapPin, 
  Phone, 
  Globe, 
  Sparkles, 
  Search, 
  ShieldCheck
} from 'lucide-react';

export default function HomePage() {
  // State Initialization with deterministic SSR-safe defaults
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [settings, setSettings] = useState<RestaurantSettings>(initialRestaurantSettings);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Record<string, ItemReview[]>>(initialReviews);
  const [orders, setOrders] = useState<TableOrder[]>(initialOrders);

  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietaryTag, setSelectedDietaryTag] = useState<DietaryTag | 'all'>('all');

  // Modals State
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const menuSectionRef = useRef<HTMLDivElement>(null);

  // Client-side hydration of user preferences & stored menu items
  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. Language detection
      const detected = detectBrowserLanguage();
      if (detected) {
        setCurrentLang(detected);
      }

      // 2. Table number & Admin trigger from URL query & hash
      const checkAdminRoute = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const adminParam = urlParams.get('admin');
        if (
          adminParam === 'true' || 
          adminParam === '1' || 
          window.location.pathname.includes('/admin') || 
          window.location.hash === '#admin'
        ) {
          setIsAdminOpen(true);
        }
      };

      const urlParams = new URLSearchParams(window.location.search);
      const table = urlParams.get('table');
      if (table) {
        setTableNumber(table);
      }
      checkAdminRoute();

      const handleHashChange = () => checkAdminRoute();
      window.addEventListener('hashchange', handleHashChange);

      // 3. Stored Menu Items
      try {
        const savedItems = localStorage.getItem('superfried_menu_items_v5') || localStorage.getItem('superfried_menu_items_v4');
        if (savedItems) {
          const parsed = JSON.parse(savedItems) as MenuItem[];
          const merged = parsed.map((item) => {
            const initial = initialMenuItems.find((i) => i.id === item.id);
            if (initial) {
              return {
                ...item,
                name: { ...initial.name, ...item.name },
                description: { ...initial.description, ...item.description },
                ingredients: { ...initial.ingredients, ...(item.ingredients || {}) },
              };
            }
            return item;
          });
          setMenuItems(merged);
          localStorage.setItem('superfried_menu_items_v5', JSON.stringify(merged));
          localStorage.removeItem('superfried_menu_items_v4');
        }
      } catch {}

      // 4. Stored Categories
      try {
        const savedCats = localStorage.getItem('superfried_menu_categories_v4');
        if (savedCats) setCategories(JSON.parse(savedCats));
      } catch {}

      // 5. Stored Settings
      try {
        const savedSettings = localStorage.getItem('superfried_menu_settings_v5');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          if (!parsed.googleMapsUrl || parsed.googleMapsUrl === 'https://maps.google.com/?q=Super+Fried+Kadhimiya+Baghdad') {
            parsed.googleMapsUrl = 'https://maps.app.goo.gl/CkbfMrReVPEhZ1p66';
            localStorage.setItem('superfried_menu_settings_v5', JSON.stringify(parsed));
          }
          setSettings(parsed);
        } else {
          localStorage.removeItem('superfried_menu_settings_v4');
          localStorage.removeItem('superfried_menu_settings_v3');
        }
      } catch {}

      // 6. Stored Cart Items
      try {
        const savedCart = localStorage.getItem('superfried_menu_cart_v4');
        if (savedCart) setCartItems(JSON.parse(savedCart));
      } catch {}

      // 7. Stored Reviews
      try {
        const savedReviews = localStorage.getItem('superfried_menu_reviews_v1');
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        }
      } catch {}

      // 8. Stored Orders History
      try {
        const savedOrders = localStorage.getItem('superfried_menu_orders_v1');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch {}
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Synchronize direction & lang attributes on HTML document
  useEffect(() => {
    const rtl = isRtl(currentLang);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    localStorage.setItem('superfried_menu_lang', currentLang);
    localStorage.setItem('sultan_menu_lang', currentLang);
  }, [currentLang]);

  // Persist State Updates
  const handleUpdateMenuItems = (items: MenuItem[]) => {
    setMenuItems(items);
    localStorage.setItem('superfried_menu_items_v5', JSON.stringify(items));
  };

  const handleUpdateCategories = (cats: Category[]) => {
    setCategories(cats);
    localStorage.setItem('superfried_menu_categories_v4', JSON.stringify(cats));
  };

  const handleUpdateSettings = (newSettings: RestaurantSettings) => {
    setSettings(newSettings);
    localStorage.setItem('superfried_menu_settings_v5', JSON.stringify(newSettings));
  };

  const handleAddReview = (
    itemId: string,
    reviewData: { rating: number; comment?: string; authorName?: string }
  ) => {
    const newReview: ItemReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      itemId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      authorName: reviewData.authorName,
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => {
      const existing = prev[itemId] || [];
      const updated = {
        ...prev,
        [itemId]: [newReview, ...existing],
      };
      try {
        localStorage.setItem('superfried_menu_reviews_v1', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist reviews:', err);
      }
      return updated;
    });
  };

  const handleResetToDefaults = () => {
    setMenuItems(initialMenuItems);
    setCategories(initialCategories);
    setSettings(initialRestaurantSettings);
    setReviews(initialReviews);
    setOrders(initialOrders);
    localStorage.removeItem('superfried_menu_items_v5');
    localStorage.removeItem('superfried_menu_items_v4');
    localStorage.removeItem('superfried_menu_categories_v4');
    localStorage.removeItem('superfried_menu_items_v3');
    localStorage.removeItem('superfried_menu_categories_v3');
    localStorage.removeItem('superfried_menu_settings_v5');
    localStorage.removeItem('superfried_menu_settings_v4');
    localStorage.removeItem('superfried_menu_settings_v3');
    localStorage.removeItem('superfried_menu_reviews_v1');
    localStorage.removeItem('superfried_menu_orders_v1');
  };

  // Orders History Operations
  const handleAddOrder = (newOrder: TableOrder) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem('superfried_menu_orders_v1', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist orders:', err);
      }
      return updated;
    });
  };

  const handleUpdateOrderStatus = (orderId: string, status: TableOrder['status']) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord));
      try {
        localStorage.setItem('superfried_menu_orders_v1', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist orders:', err);
      }
      return updated;
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.filter((ord) => ord.id !== orderId);
      try {
        localStorage.setItem('superfried_menu_orders_v1', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist orders:', err);
      }
      return updated;
    });
  };

  const handleClearOrders = () => {
    setOrders([]);
    try {
      localStorage.setItem('superfried_menu_orders_v1', JSON.stringify([]));
    } catch (err) {
      console.error('Failed to clear orders:', err);
    }
  };

  // Cart Operations
  const handleAddToCart = (item: CartItem) => {
    const updated = [...cartItems, item];
    setCartItems(updated);
    localStorage.setItem('superfried_menu_cart_v4', JSON.stringify(updated));
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty,
          };
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    setCartItems(updated);
    localStorage.setItem('superfried_menu_cart_v4', JSON.stringify(updated));
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    const updated = cartItems.filter((i) => i.cartItemId !== cartItemId);
    setCartItems(updated);
    localStorage.setItem('superfried_menu_cart_v4', JSON.stringify(updated));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('superfried_menu_cart_v4');
    localStorage.removeItem('superfried_menu_cart_v3');
  };

  const scrollToMenu = () => {
    if (menuSectionRef.current) {
      menuSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoHome = () => {
    setActiveCategoryId('all');
    setSearchQuery('');
    setSelectedDietaryTag('all');
    setIsCartOpen(false);
    setIsWaiterModalOpen(false);
    setIsAdminOpen(false);
    setSelectedItemForDetail(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const t = translations[currentLang];
  const rtl = isRtl(currentLang);
  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, i) => sum + i.totalPrice, 0);

  // Compute item ratings map
  const itemRatingMap = useMemo(() => {
    const map: Record<string, { average: number; count: number }> = {};
    for (const item of menuItems) {
      const itemRevs = reviews[item.id] || [];
      if (itemRevs.length > 0) {
        const sum = itemRevs.reduce((acc, r) => acc + r.rating, 0);
        map[item.id] = { average: sum / itemRevs.length, count: itemRevs.length };
      } else {
        map[item.id] = { average: 5.0, count: 0 };
      }
    }
    return map;
  }, [menuItems, reviews]);

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategoryId !== 'all' && item.categoryId !== activeCategoryId) {
        return false;
      }

      // Dietary tag filter
      if (selectedDietaryTag !== 'all') {
        if (!item.dietaryTags?.includes(selectedDietaryTag)) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesAr = item.name.ar.toLowerCase().includes(q) || item.description.ar.toLowerCase().includes(q);
        const matchesEn = item.name.en.toLowerCase().includes(q) || item.description.en.toLowerCase().includes(q);
        const matchesKu = item.name.ku.toLowerCase().includes(q) || item.description.ku.toLowerCase().includes(q);
        const matchesTr = item.name.tr.toLowerCase().includes(q) || item.description.tr.toLowerCase().includes(q);
        const matchesIngr = 
          item.ingredients.ar.toLowerCase().includes(q) ||
          item.ingredients.en.toLowerCase().includes(q);

        if (!matchesAr && !matchesEn && !matchesKu && !matchesTr && !matchesIngr) {
          return false;
        }
      }

      return true;
    });
  }, [menuItems, activeCategoryId, selectedDietaryTag, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#283618] flex flex-col font-sans selection:bg-[#283618] selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWaiterModal={() => setIsWaiterModalOpen(true)}
        onOpenAdminModal={() => setIsAdminOpen(true)}
        tableNumber={tableNumber}
        settings={settings}
        onGoHome={handleGoHome}
      />

      {/* Hero Welcome Section */}
      <HeroBanner
        currentLang={currentLang}
        settings={settings}
        onScrollToMenu={scrollToMenu}
        onOpenWaiterModal={() => setIsWaiterModalOpen(true)}
      />

      {/* Seasonal Promotional Banner */}
      <PromotionalBanner
        currentLang={currentLang}
        settings={settings}
        onScrollToMenu={scrollToMenu}
      />

      {/* Sticky Category Bar & Filter */}
      <div ref={menuSectionRef}>
        <CategoryBar
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDietaryTag={selectedDietaryTag}
          onSelectDietaryTag={setSelectedDietaryTag}
          currentLang={currentLang}
        />
      </div>

      {/* Main Menu Grid Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Results Count Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#283618] tracking-tight">
              {activeCategoryId === 'all'
                ? t.exploreCategories
                : categories.find((c) => c.id === activeCategoryId)?.name[currentLang] || t.exploreCategories}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B705C] font-medium">
              {filteredItems.length} {t.cart.itemsCount}
            </p>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#BC6C25] font-bold hover:underline"
            >
              إلغاء البحث
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#E8E5DF] p-8 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FEFAE0] text-[#283618] mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#283618]">
              لم يتم العثور على أطباق مطابقة
            </h3>
            <p className="text-xs sm:text-sm text-[#6B705C] leading-relaxed">
              جرب تغيير كلمة البحث أو إزالة بعض الفلاتر لعرض الأطباق المتاحة.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDietaryTag('all');
                setActiveCategoryId('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#283618] text-white text-xs font-bold shadow-xs hover:bg-[#1A2410]"
            >
              عرض جميع الأصناف
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                currentLang={currentLang}
                settings={settings}
                ratingInfo={itemRatingMap[item.id]}
                onSelect={(selected) => setSelectedItemForDetail(selected)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating Bottom Sticky Bar for Mobile when Cart has Items */}
      <AnimatePresence>
        {totalCartCount > 0 && !isCartOpen && (
          <motion.div
            key="floating-cart-container"
            initial={{ opacity: 0, y: 36, scale: 0.88 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 340,
                damping: 18,
                mass: 0.8
              }
            }}
            exit={{ 
              opacity: 0, 
              y: 24, 
              scale: 0.9,
              transition: { duration: 0.2 } 
            }}
            className="fixed bottom-4 start-4 end-4 sm:start-auto sm:end-6 z-40 max-w-md mx-auto sm:max-w-none"
          >
            <motion.button
              key={`floating-cart-btn-${totalCartCount}`}
              initial={{ scale: 0.95 }}
              animate={{ 
                scale: [0.95, 1.05, 0.98, 1],
                transition: {
                  duration: 0.42,
                  times: [0, 0.4, 0.75, 1],
                  ease: 'easeOut'
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              id="floating-cart-bar-btn"
              onClick={() => setIsCartOpen(true)}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#283618] hover:bg-[#1A2410] text-white font-black text-sm shadow-xl shadow-[#1A2410]/30 flex items-center justify-between sm:gap-6 backdrop-blur-md border border-[#3D5024] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <motion.span 
                  key={`badge-count-${totalCartCount}`}
                  initial={{ scale: 0.6, rotate: -12 }}
                  animate={{ 
                    scale: [0.6, 1.28, 1],
                    rotate: [-12, 6, 0],
                    transition: { duration: 0.35, ease: 'backOut' }
                  }}
                  className="w-7 h-7 rounded-full bg-[#BC6C25] text-white text-xs font-black flex items-center justify-center shadow-xs"
                >
                  {totalCartCount}
                </motion.span>
                <span>{t.cart.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FEFAE0]">
                  {formatPrice(cartSubtotal, settings.currency, currentLang)}
                </span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#1A2410] text-[#E8E5DF] py-12 border-t border-[#283618] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#283618]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#283618] text-white flex items-center justify-center text-2xl border border-[#3D5024]">
                {settings.logo || '👑'}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {settings.name[currentLang] || settings.name.ar}
                </h3>
                <p className="text-xs text-[#989B8B]">
                  {settings.tagline[currentLang] || settings.tagline.ar}
                </p>
              </div>
            </div>

            {/* Language & Actions Strip */}
            <div className="flex flex-wrap items-center gap-2">
              {(['ar', 'en', 'fa', 'ur', 'ku', 'tr'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setCurrentLang(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    currentLang === l
                      ? 'bg-[#BC6C25] text-white'
                      : 'bg-[#283618] text-[#E8E5DF] hover:bg-[#3D5024]'
                  }`}
                >
                  {l === 'ar' && 'العربية 🇮🇶'}
                  {l === 'en' && 'English 🇬🇧'}
                  {l === 'fa' && 'فارسی 🇮🇷'}
                  {l === 'ur' && 'اردو 🇵🇰'}
                  {l === 'ku' && 'کوردی ☀️'}
                  {l === 'tr' && 'Türkçe 🇹🇷'}
                </button>
              ))}

              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#283618] hover:bg-[#3D5024] text-[#C5C3BE] text-xs font-semibold"
              >
                لوحة الإدارة ⚙️
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#989B8B] gap-4">
            <p>
              © {new Date().getFullYear()} {settings.name.en} • Dynamic QR & Digital Menu System
            </p>
            <div className="flex items-center gap-4">
              <span>Google Maps Integration</span>
              <span>•</span>
              <span>WhatsApp Direct Ordering</span>
              <span>•</span>
              <span>6-Language Engine</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Modals & Drawers */}
      <ItemDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onAddToCart={handleAddToCart}
        currentLang={currentLang}
        settings={settings}
        reviews={selectedItemForDetail ? (reviews[selectedItemForDetail.id] || []) : []}
        onAddReview={(reviewData) => {
          if (selectedItemForDetail) {
            handleAddReview(selectedItemForDetail.id, reviewData);
          }
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        tableNumber={tableNumber}
        onSetTableNumber={setTableNumber}
        currentLang={currentLang}
        settings={settings}
        onProcessOrder={handleAddOrder}
      />

      <CallWaiterModal
        isOpen={isWaiterModalOpen}
        onClose={() => setIsWaiterModalOpen(false)}
        tableNumber={tableNumber}
        onSetTableNumber={setTableNumber}
        currentLang={currentLang}
        settings={settings}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        categories={categories}
        settings={settings}
        orders={orders}
        onUpdateMenuItems={handleUpdateMenuItems}
        onUpdateCategories={handleUpdateCategories}
        onUpdateSettings={handleUpdateSettings}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onClearOrders={handleClearOrders}
        onResetToDefaults={handleResetToDefaults}
        currentLang={currentLang}
      />

    </div>
  );
}
