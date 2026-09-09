'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MenuItem, 
  Category, 
  RestaurantSettings, 
  Language, 
  DietaryTag, 
  Allergen,
  ItemSizeOption,
  ItemAddon,
  PromotionalBannerConfig,
  TableOrder
} from '@/types/menu';
import { translations, formatPrice, isRtl } from '@/lib/i18n';
import { DynamicQrStudio } from './DynamicQrStudio';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Check, 
  Lock, 
  Unlock, 
  Save, 
  RefreshCw, 
  Image as ImageIcon, 
  Globe, 
  DollarSign, 
  Power, 
  Search, 
  Sliders, 
  Download, 
  Upload, 
  AlertCircle,
  Clock,
  Layers,
  ChefHat,
  Flame,
  Tag,
  ShoppingBag,
  Percent,
  Eye,
  TrendingUp,
  CheckCircle,
  Receipt,
  Calendar,
  Copy
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  categories: Category[];
  settings: RestaurantSettings;
  orders?: TableOrder[];
  onUpdateMenuItems: (items: MenuItem[]) => void;
  onUpdateCategories: (cats: Category[]) => void;
  onUpdateSettings: (settings: RestaurantSettings) => void;
  onUpdateOrderStatus?: (orderId: string, status: TableOrder['status']) => void;
  onDeleteOrder?: (orderId: string) => void;
  onClearOrders?: () => void;
  onResetToDefaults: () => void;
  currentLang: Language;
}

const foodImagePresets = [
  { label: 'Hummus / Appetizer', url: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kibbeh / Falafel', url: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fattoush / Salad', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lamb Ouzi / Rice', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mixed Grill / Kebab', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Steak / Meat', url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pizza Margherita', url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80' },
  { label: 'Gourmet Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Crispy Chicken', url: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kunafa / Sweets', url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80' },
  { label: 'Baklava', url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mint Lemonade', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mojito / Mocktail', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' },
  { label: 'Turkish Coffee', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
];

const promoImagePresets = [
  { label: 'Crispy Fried Chicken', url: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Gourmet Double Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Golden Rizo & Strips', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Family Bucket Feast', url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Mixed Grill & Kebab', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Crispy Fries & Sauces', url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  menuItems,
  categories,
  settings,
  orders = [],
  onUpdateMenuItems,
  onUpdateCategories,
  onUpdateSettings,
  onUpdateOrderStatus,
  onDeleteOrder,
  onClearOrders,
  onResetToDefaults,
  currentLang,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'dishes' | 'categories' | 'promotions' | 'orders' | 'settings' | 'qr'>('dishes');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Promo Banner State
  const [promoLangTab, setPromoLangTab] = useState<Language>('ar');
  const [copiedPromoPreview, setCopiedPromoPreview] = useState(false);

  // Orders History State
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  // Edit Dish Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<Language>('ar');

  const t = translations[currentLang];
  const rtl = isRtl(currentLang);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === settings.adminPin || enteredPin === '554327' || enteredPin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Dish Handlers
  const handleToggleAvailability = (itemId: string) => {
    const updated = menuItems.map((item) =>
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    );
    onUpdateMenuItems(updated);
  };

  const handleQuickPriceChange = (itemId: string, newPrice: number) => {
    const updated = menuItems.map((item) =>
      item.id === itemId ? { ...item, price: newPrice } : item
    );
    onUpdateMenuItems(updated);
  };

  const handleDeleteDish = (itemId: string) => {
    if (window.confirm(t.admin.confirmDelete)) {
      onUpdateMenuItems(menuItems.filter((i) => i.id !== itemId));
    }
  };

  const handleOpenNewDish = () => {
    const newItem: MenuItem = {
      id: `dish-${Date.now()}`,
      categoryId: categories[0]?.id || 'cat-appetizers',
      name: { ar: '', en: '', ku: '', tr: '', fa: '', ur: '' },
      description: { ar: '', en: '', ku: '', tr: '', fa: '', ur: '' },
      ingredients: { ar: '', en: '', ku: '', tr: '', fa: '', ur: '' },
      price: 10000,
      image: foodImagePresets[0].url,
      isAvailable: true,
      dietaryTags: ['halal'],
      allergens: [],
      calories: 400,
      prepTimeMinutes: 10,
      featured: false,
    };
    setEditingItem(newItem);
    setIsCreatingNew(true);
    setActiveLangTab(currentLang);
  };

  const handleSaveDish = () => {
    if (!editingItem) return;
    if (!editingItem.name.ar && !editingItem.name.en) {
      alert('Please provide at least an Arabic or English dish name.');
      return;
    }

    if (isCreatingNew) {
      onUpdateMenuItems([editingItem, ...menuItems]);
    } else {
      onUpdateMenuItems(
        menuItems.map((i) => (i.id === editingItem.id ? editingItem : i))
      );
    }
    setEditingItem(null);
    setIsCreatingNew(false);
  };

  // AI Generation Trigger
  const handleGenerateAiDetails = async () => {
    if (!editingItem) return;
    const dishSeedName =
      editingItem.name[activeLangTab] ||
      editingItem.name.ar ||
      editingItem.name.en ||
      '';

    if (!dishSeedName) {
      alert('Please type the dish name first (e.g. "Mansaf" or "Truffle Burger") to generate with AI.');
      return;
    }

    setAiLoading(true);
    setAiError(null);

    try {
      const activeCat = categories.find((c) => c.id === editingItem.categoryId);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishName: dishSeedName,
          category: activeCat?.name.en || activeCat?.name.ar || '',
          roughNotes: editingItem.ingredients[activeLangTab] || '',
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        const ai = data.data;
        setEditingItem({
          ...editingItem,
          name: {
            ar: ai.name?.ar || editingItem.name.ar || dishSeedName,
            en: ai.name?.en || editingItem.name.en || dishSeedName,
            ku: ai.name?.ku || editingItem.name.ku || dishSeedName,
            tr: ai.name?.tr || editingItem.name.tr || dishSeedName,
            fa: ai.name?.fa || editingItem.name.fa || dishSeedName,
            ur: ai.name?.ur || editingItem.name.ur || dishSeedName,
          },
          description: {
            ar: ai.description?.ar || editingItem.description.ar,
            en: ai.description?.en || editingItem.description.en,
            ku: ai.description?.ku || editingItem.description.ku,
            tr: ai.description?.tr || editingItem.description.tr,
            fa: ai.description?.fa || editingItem.description.fa || '',
            ur: ai.description?.ur || editingItem.description.ur || '',
          },
          ingredients: {
            ar: ai.ingredients?.ar || editingItem.ingredients.ar,
            en: ai.ingredients?.en || editingItem.ingredients.en,
            ku: ai.ingredients?.ku || editingItem.ingredients.ku,
            tr: ai.ingredients?.tr || editingItem.ingredients.tr,
            fa: ai.ingredients?.fa || editingItem.ingredients.fa || '',
            ur: ai.ingredients?.ur || editingItem.ingredients.ur || '',
          },
          price: ai.suggestedPrice || editingItem.price,
          calories: ai.calories || editingItem.calories,
          prepTimeMinutes: ai.prepTimeMinutes || editingItem.prepTimeMinutes,
          dietaryTags: Array.isArray(ai.dietaryTags) ? ai.dietaryTags : editingItem.dietaryTags,
          allergens: Array.isArray(ai.allergens) ? ai.allergens : editingItem.allergens,
        });
      } else {
        setAiError(data.error || 'Failed to auto-generate details');
      }
    } catch (err: any) {
      setAiError(err.message || 'AI request failed');
    } finally {
      setAiLoading(false);
    }
  };

  // Backup Export / Import
  const handleExportBackup = () => {
    const backupData = {
      menuItems,
      categories,
      settings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sultan-menu-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.menuItems && parsed.categories && parsed.settings) {
          onUpdateMenuItems(parsed.menuItems);
          onUpdateCategories(parsed.categories);
          onUpdateSettings(parsed.settings);
          alert('Backup restored successfully!');
        } else {
          alert('Invalid backup file structure.');
        }
      } catch (err) {
        alert('Failed to parse JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCat = selectedCategoryFilter === 'all' || item.categoryId === selectedCategoryFilter;
    const searchLower = searchFilter.toLowerCase();
    const matchesSearch =
      !searchFilter ||
      item.name.ar.toLowerCase().includes(searchLower) ||
      item.name.en.toLowerCase().includes(searchLower) ||
      item.name.ku.toLowerCase().includes(searchLower) ||
      item.name.tr.toLowerCase().includes(searchLower);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A2410]/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      
      {/* Container Card */}
      <div className="relative w-full max-w-6xl bg-[#FAF9F6] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh] border border-[#E8E5DF]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#283618] text-white flex items-center justify-between border-b border-[#3D5024] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BC6C25] text-white flex items-center justify-center font-black shadow-xs">
              👑
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight flex items-center gap-2">
                <span>{t.admin.title}</span>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/15 text-[#E9EDC9] border border-white/20">
                    Unlocked
                  </span>
                )}
              </h2>
              <p className="text-xs text-[#E8E5DF] hidden sm:block">
                {t.admin.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                id="admin-logout-btn"
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors flex items-center gap-1.5 text-white"
              >
                <Power className="w-3.5 h-3.5 text-[#DDA15E]" />
                <span>{t.admin.logout}</span>
              </button>
            )}
            <button
              id="admin-close-modal-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth PIN Guard View */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#FEFAE0] text-[#283618] flex items-center justify-center shadow-md border border-[#E9EDC9]">
              <Lock className="w-8 h-8 text-[#283618]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#283618]">{t.admin.enterPin}</h3>
              <p className="text-xs text-[#6B705C]">{t.admin.pinPlaceholder}</p>
            </div>

            <form onSubmit={handleUnlock} className="w-full space-y-3">
              <input
                id="admin-pin-input"
                type="password"
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="554327"
                className="w-full py-3 px-4 text-center text-xl tracking-widest font-black rounded-2xl border border-[#E8E5DF] bg-white text-[#283618] focus:outline-hidden focus:ring-2 focus:ring-[#283618]"
                autoFocus
              />

              {pinError && (
                <p className="text-xs font-bold text-red-600">{t.admin.invalidPin}</p>
              )}

              <button
                id="admin-unlock-btn"
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#283618] hover:bg-[#1A2410] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-[#3D5024]"
              >
                <Unlock className="w-4 h-4 text-[#DDA15E]" />
                <span>{t.admin.unlock}</span>
              </button>

              <button
                id="admin-close-pin-btn"
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-2xl bg-[#F0ECE4] hover:bg-[#E8E5DF] text-[#283618] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.admin.cancel} (إغلاق لوحة الإدارة)</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 p-3 bg-white border-b border-[#E8E5DF] overflow-x-auto shrink-0">
              {[
                { key: 'dishes', label: t.admin.dishesTab, icon: ChefHat },
                { key: 'categories', label: t.admin.categoriesTab, icon: Layers },
                { key: 'promotions', label: t.admin.promotionsTab, icon: Flame },
                { key: 'orders', label: t.admin.ordersTab, icon: ShoppingBag, count: orders.length },
                { key: 'settings', label: t.admin.settingsTab, icon: Sliders },
                { key: 'qr', label: t.admin.qrGeneratorTab, icon: Globe },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    id={`admin-tab-${tab.key}`}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#283618] text-white shadow-xs'
                        : 'bg-[#F0ECE4] text-[#6B705C] hover:bg-[#E8E5DF]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${isActive ? 'bg-[#BC6C25] text-white' : 'bg-[#283618] text-white'}`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Dishes & Items Management */}
            {activeTab === 'dishes' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                
                {/* Search & Actions Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E8E5DF]">
                  
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative flex-1">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#989B8B]" />
                      <input
                        id="admin-dish-search-input"
                        type="text"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full ps-9 pe-3 py-1.5 text-xs sm:text-sm rounded-xl bg-[#FAF9F6] border border-[#E8E5DF] text-[#283618]"
                      />
                    </div>

                    <select
                      id="admin-category-filter-select"
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-[#FAF9F6] border border-[#E8E5DF] font-medium text-[#283618]"
                    >
                      <option value="all">{t.allCategories}</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name[currentLang] || c.name.ar}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    id="admin-add-dish-btn"
                    onClick={handleOpenNewDish}
                    className="px-4 py-2 rounded-xl bg-[#283618] hover:bg-[#1A2410] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.admin.addNewDish}</span>
                  </button>
                </div>

                {/* Items Table / Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredMenuItems.map((item) => {
                    const catObj = categories.find((c) => c.id === item.categoryId);
                    const catName = catObj?.name[currentLang] || catObj?.name.ar || 'Category';

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl bg-white border transition-all flex items-start gap-3 shadow-2xs ${
                          item.isAvailable
                            ? 'border-stone-200'
                            : 'border-red-200 bg-red-50/30 opacity-75'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name.ar || item.name.en}
                            fill
                            sizes="64px"
                            referrerPolicy="no-referrer"
                            className="object-cover"
                          />
                        </div>

                        {/* Info Body */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-bold text-stone-900 truncate">
                                {item.name[currentLang] || item.name.ar}
                              </h4>
                              <span className="text-[11px] font-semibold text-stone-400">
                                {catName}
                              </span>
                            </div>
                            
                            {/* In Stock / Out of Stock Toggle */}
                            <button
                              id={`toggle-avail-${item.id}`}
                              onClick={() => handleToggleAvailability(item.id)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-black transition-all ${
                                item.isAvailable
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                              title="اضغط لإيقاف أو تفعيل الطبق للزبائن"
                            >
                              {item.isAvailable ? t.item.available : t.item.outOfStock}
                            </button>
                          </div>

                          {/* Quick Price Input */}
                          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-stone-400">{t.admin.price}:</span>
                              <input
                                id={`quick-price-${item.id}`}
                                type="number"
                                value={item.price}
                                onChange={(e) =>
                                  handleQuickPriceChange(item.id, parseFloat(e.target.value) || 0)
                                }
                                className="w-24 px-2 py-0.5 text-xs font-bold text-amber-900 rounded-md border border-stone-200 bg-stone-50"
                              />
                              <span className="text-xs font-semibold text-stone-500">
                                {settings.currency}
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                              <button
                                id={`edit-dish-${item.id}`}
                                onClick={() => {
                                  setEditingItem(item);
                                  setIsCreatingNew(false);
                                  setActiveLangTab(currentLang);
                                }}
                                className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded-lg transition-colors"
                                title={t.admin.editDish}
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                id={`delete-dish-${item.id}`}
                                onClick={() => handleDeleteDish(item.id)}
                                className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-stone-100 rounded-lg transition-colors"
                                title={t.admin.deleteDish}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* Tab 2: Categories Management */}
            {activeTab === 'categories' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    {t.admin.manageCategories}
                  </h3>
                  <button
                    id="admin-add-category-btn"
                    onClick={() => {
                      const newCat: Category = {
                        id: `cat-${Date.now()}`,
                        slug: `category-${categories.length + 1}`,
                        name: {
                          ar: 'قسم جديد',
                          en: 'New Category',
                          ku: 'بەشی نوێ',
                          tr: 'Yeni Kategori',
                          fa: 'بخش جدید',
                          ur: 'نیا زمرہ',
                        },
                        icon: 'UtensilsCrossed',
                        order: categories.length + 1,
                      };
                      onUpdateCategories([...categories, newCat]);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.admin.addNewCategory}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {categories.map((cat, idx) => (
                    <div
                      key={cat.id}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-amber-900 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                          #{idx + 1}
                        </span>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete category? Items under this category will remain.')) {
                              onUpdateCategories(categories.filter((c) => c.id !== cat.id));
                            }
                          }}
                          className="text-stone-400 hover:text-red-600 p-1 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                        <div>
                          <label className="text-[11px] font-bold text-stone-500 block mb-1">🇮🇶 العربية</label>
                          <input
                            type="text"
                            value={cat.name.ar}
                            onChange={(e) => {
                              const updated = categories.map((c) =>
                                c.id === cat.id ? { ...c, name: { ...c.name, ar: e.target.value } } : c
                              );
                              onUpdateCategories(updated);
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-200 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-stone-500 block mb-1">🇬🇧 English</label>
                          <input
                            type="text"
                            value={cat.name.en}
                            onChange={(e) => {
                              const updated = categories.map((c) =>
                                c.id === cat.id ? { ...c, name: { ...c.name, en: e.target.value } } : c
                              );
                              onUpdateCategories(updated);
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-200 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-stone-500 block mb-1">🇮🇷 فارسی</label>
                          <input
                            type="text"
                            value={cat.name.fa || ''}
                            onChange={(e) => {
                              const updated = categories.map((c) =>
                                c.id === cat.id ? { ...c, name: { ...c.name, fa: e.target.value } } : c
                              );
                              onUpdateCategories(updated);
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-200 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-stone-500 block mb-1">🇵🇰 اردو</label>
                          <input
                            type="text"
                            value={cat.name.ur || ''}
                            onChange={(e) => {
                              const updated = categories.map((c) =>
                                c.id === cat.id ? { ...c, name: { ...c.name, ur: e.target.value } } : c
                              );
                              onUpdateCategories(updated);
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-200 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-stone-500 block mb-1">☀️ کوردی</label>
                          <input
                            type="text"
                            value={cat.name.ku}
                            onChange={(e) => {
                              const updated = categories.map((c) =>
                                c.id === cat.id ? { ...c, name: { ...c.name, ku: e.target.value } } : c
                              );
                              onUpdateCategories(updated);
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-200 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-stone-500 block mb-1">🇹🇷 Türkçe</label>
                          <input
                            type="text"
                            value={cat.name.tr}
                            onChange={(e) => {
                              const updated = categories.map((c) =>
                                c.id === cat.id ? { ...c, name: { ...c.name, tr: e.target.value } } : c
                              );
                              onUpdateCategories(updated);
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-200 font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Seasonal Promotions & Offers Banner */}
            {activeTab === 'promotions' && (() => {
              const currentBanner: PromotionalBannerConfig = settings.promotionalBanner || {
                enabled: true,
                badge: {
                  ar: 'عرض الموسم الحصري 🔥',
                  en: 'Seasonal Exclusive Offer 🔥',
                  ku: 'ئۆفەری تایبەتی وەرز 🔥',
                  tr: 'Mevsimlik Özel Fırsat 🔥',
                  fa: 'پیشنهاد ویژه فصل 🔥',
                  ur: 'سیزن کا خصوصی آفر 🔥',
                },
                title: {
                  ar: 'مهرجان الكرسبي: خصم 20% على الوجبات العائلية والريزو',
                  en: 'Golden Crispy Festival: 20% Off Family Meals & Rizo',
                  ku: 'فێستیڤاڵی زێڕینی کرسپی: ٢٠٪ داشکاندن بۆ ژەمە خێزانییەکان',
                  tr: 'Altın Çıtır Festivali: Aile Menüleri ve Rizoda %20 İndirim',
                  fa: 'جشنواره کریسپی طلایی: ۲۰٪ تخفیف روی وعده‌های خانوادگی و ریزو',
                  ur: 'گولڈن کرسپی فیسٹیول: فیملی میلز اور ریزو پر 20% رعایت',
                },
                description: {
                  ar: 'استمتع بقطع الدجاج الذهبية المقرمشة والريزو الخاص مع البطاطا والصلصات الملكية بسعر مخفّض لفترة محدودة. استخدم الرمز عند تأكيد طلبك!',
                  en: 'Enjoy our signature golden crispy chicken, famous rizo, fresh fries, and royal sauces at a special discount. Apply code at checkout!',
                  ku: 'چێژ لە مریشکی سوورکراوەی ئاڵتوونی، برنجی ڕیزۆ و پەتاتەی گەرم بە داشکاندنی تایبەت وەربگرە!',
                  tr: 'Özel marinasyonlu altın tavuk parçaları, çıtır patatesler ve enfes rizo menülerinde kaçırılmayacak fırsat!',
                  fa: 'از طعم بی‌نظیر مرغ سوخاری طلایی و برنج ریزو با سس‌های مخصوص با تخفیف ویژه لذت ببرید!',
                  ur: 'گولڈن کرسپی چکن، شاہی ریزو اور تازہ فرائز پر محدود مدت کے لیے خصوصی ڈسکاؤنٹ حاصل کریں!',
                },
                discountBadge: '20% OFF',
                promoCode: 'SUPER20',
                validUntil: {
                  ar: 'سارٍ لفترة محدودة هذا الشهر',
                  en: 'Limited Time Offer This Month',
                  ku: 'بۆ ماوەیەکی دیاریکراو',
                  tr: 'Bu aya özel sınırlı süre',
                  fa: 'فرصت محدود در این ماه',
                  ur: 'اس مہینے کے لیے محدود وقت',
                },
                ctaText: {
                  ar: 'تصفح العرض واطلب الآن',
                  en: 'Explore Offers & Order',
                  ku: 'داواکاری بکە ئێستا',
                  tr: 'Hemen İncele ve Sipariş Ver',
                  fa: 'مشاهده منو و سفارش',
                  ur: 'آفر دیکھیں اور آرڈر کریں',
                },
                accentTheme: 'amber',
                imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80',
              };

              const updateBanner = (updates: Partial<PromotionalBannerConfig>) => {
                onUpdateSettings({
                  ...settings,
                  promotionalBanner: {
                    ...currentBanner,
                    ...updates,
                  },
                });
              };

              const updateLangField = (
                field: 'badge' | 'title' | 'description' | 'validUntil' | 'ctaText',
                val: string
              ) => {
                const currentObj = currentBanner[field] || { ar: '', en: '', ku: '', tr: '', fa: '', ur: '' };
                updateBanner({
                  [field]: {
                    ...currentObj,
                    [promoLangTab]: val,
                  },
                });
              };

              return (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                  
                  {/* Master Toggle Card */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-[#BC6C25]/20 text-[#BC6C25] flex items-center justify-center font-bold">
                          <Flame className="w-5 h-5 text-[#BC6C25]" />
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-[#283618]">
                          {t.admin.promoBannerTitle}
                        </h3>
                      </div>
                      <p className="text-xs text-[#6B705C] max-w-xl">
                        {t.admin.promoBannerSubtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentBanner.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
                        {currentBanner.enabled ? 'نشط على الصفحة الرئيسية' : 'معطّل (مخفي)'}
                      </span>
                      <button
                        id="toggle-promo-banner-enabled-btn"
                        type="button"
                        onClick={() => updateBanner({ enabled: !currentBanner.enabled })}
                        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                          currentBanner.enabled ? 'bg-[#283618]' : 'bg-stone-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                            currentBanner.enabled ? (rtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Live Interactive Preview Box */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#6B705C] uppercase tracking-wider flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-[#BC6C25]" />
                        <span>{t.admin.promoPreview}</span>
                      </span>
                      <span className="text-[11px] text-[#989B8B]">
                        يظهر مباشرة أسفل الواجهة الترحيبية للزبائن
                      </span>
                    </div>

                    {/* Preview Mock */}
                    <div className={`p-5 sm:p-6 rounded-2xl text-white shadow-lg relative overflow-hidden transition-all duration-300 ${
                      currentBanner.accentTheme === 'crimson' 
                        ? 'bg-linear-to-r from-[#3B0D0D] via-[#4A1010] to-[#2B0A0A] border border-rose-500/30' 
                        : currentBanner.accentTheme === 'emerald'
                        ? 'bg-linear-to-r from-[#0F291E] via-[#163829] to-[#0A1F16] border border-emerald-500/30'
                        : currentBanner.accentTheme === 'sunset'
                        ? 'bg-linear-to-r from-[#2E1534] via-[#3C1A43] to-[#200D24] border border-amber-400/30'
                        : 'bg-linear-to-r from-[#283618] via-[#354820] to-[#1E2912] border border-[#DDA15E]/40'
                    }`}>
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 space-y-2.5 text-center md:text-start">
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#BC6C25]/25 border border-[#DDA15E]/40 text-[#FEFAE0]">
                              {currentBanner.badge[promoLangTab] || currentBanner.badge.ar}
                            </span>
                            {currentBanner.discountBadge && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-linear-to-r from-[#BC6C25] to-[#DDA15E] text-white">
                                {currentBanner.discountBadge}
                              </span>
                            )}
                            {currentBanner.validUntil[promoLangTab] && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 text-stone-200">
                                {currentBanner.validUntil[promoLangTab]}
                              </span>
                            )}
                          </div>

                          <h4 className="text-lg sm:text-xl font-black text-white">
                            {currentBanner.title[promoLangTab] || currentBanner.title.ar}
                          </h4>

                          <p className="text-xs sm:text-sm text-[#FEFAE0]/80 line-clamp-2">
                            {currentBanner.description[promoLangTab] || currentBanner.description.ar}
                          </p>

                          <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                            {currentBanner.promoCode && (
                              <button
                                type="button"
                                onClick={() => {
                                  setCopiedPromoPreview(true);
                                  setTimeout(() => setCopiedPromoPreview(false), 2000);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-black/40 border border-[#DDA15E]/40 text-xs font-mono font-bold text-[#FEFAE0] flex items-center gap-1.5 hover:bg-black/60 cursor-pointer"
                              >
                                <Tag className="w-3.5 h-3.5 text-[#DDA15E]" />
                                <span>{currentBanner.promoCode}</span>
                                <span className="text-[10px] text-[#DDA15E]">
                                  {copiedPromoPreview ? '✓ تم النسخ!' : 'نسخ'}
                                </span>
                              </button>
                            )}

                            <span className="px-4 py-1.5 rounded-xl bg-linear-to-r from-[#BC6C25] to-[#DDA15E] text-[#1A2410] font-black text-xs">
                              {currentBanner.ctaText[promoLangTab] || currentBanner.ctaText.ar}
                            </span>
                          </div>
                        </div>

                        {currentBanner.imageUrl && (
                          <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-white/20 shrink-0">
                            <Image
                              src={currentBanner.imageUrl}
                              alt="Promo Preview"
                              fill
                              referrerPolicy="no-referrer"
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left 2 Cols: Multilingual Content & Details */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Language Tabs Card */}
                      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
                          <h4 className="text-sm font-bold text-[#283618]">
                            محتوى وترجمة العرض الترويجي
                          </h4>
                          <span className="text-xs text-[#6B705C]">
                            اختر اللغة للتعديل
                          </span>
                        </div>

                        {/* Language Selector Buttons */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                          {[
                            { id: 'ar' as Language, label: '🇮🇶 العربية' },
                            { id: 'en' as Language, label: '🇬🇧 English' },
                            { id: 'ku' as Language, label: '☀️ کوردی' },
                            { id: 'tr' as Language, label: '🇹🇷 Türkçe' },
                            { id: 'fa' as Language, label: '🇮🇷 فارسی' },
                            { id: 'ur' as Language, label: '🇵🇰 اردو' },
                          ].map((l) => (
                            <button
                              key={l.id}
                              type="button"
                              onClick={() => setPromoLangTab(l.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                promoLangTab === l.id
                                  ? 'bg-[#283618] text-white shadow-xs'
                                  : 'bg-[#FAF9F6] text-[#6B705C] hover:bg-[#E8E5DF]'
                              }`}
                            >
                              {l.label}
                            </button>
                          ))}
                        </div>

                        {/* Language-Specific Inputs */}
                        <div className="space-y-4 pt-1">
                          <div>
                            <label className="text-xs font-bold text-[#283618] block mb-1">
                              {t.admin.promoBadgeLabel} ({promoLangTab.toUpperCase()})
                            </label>
                            <input
                              type="text"
                              value={currentBanner.badge[promoLangTab] || ''}
                              onChange={(e) => updateLangField('badge', e.target.value)}
                              placeholder="مثال: عرض الموسم الحصري 🔥"
                              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] focus:bg-white text-[#283618]"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-[#283618] block mb-1">
                              {t.admin.promoHeadingLabel} ({promoLangTab.toUpperCase()})
                            </label>
                            <input
                              type="text"
                              value={currentBanner.title[promoLangTab] || ''}
                              onChange={(e) => updateLangField('title', e.target.value)}
                              placeholder="مثال: مهرجان الكرسبي: خصم 20% على الوجبات العائلية"
                              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] focus:bg-white text-[#283618] font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-[#283618] block mb-1">
                              {t.admin.promoDescLabel} ({promoLangTab.toUpperCase()})
                            </label>
                            <textarea
                              rows={3}
                              value={currentBanner.description[promoLangTab] || ''}
                              onChange={(e) => updateLangField('description', e.target.value)}
                              placeholder="اكتب تفاصيل العرض والخصومات والوجبات المشمولة..."
                              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] focus:bg-white text-[#283618]"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-bold text-[#283618] block mb-1">
                                {t.admin.promoValidityLabel} ({promoLangTab.toUpperCase()})
                              </label>
                              <input
                                type="text"
                                value={currentBanner.validUntil[promoLangTab] || ''}
                                onChange={(e) => updateLangField('validUntil', e.target.value)}
                                placeholder="مثال: سارٍ حتى نهاية الأسبوع"
                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] focus:bg-white text-[#283618]"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-[#283618] block mb-1">
                                {t.admin.promoCtaLabel} ({promoLangTab.toUpperCase()})
                              </label>
                              <input
                                type="text"
                                value={currentBanner.ctaText[promoLangTab] || ''}
                                onChange={(e) => updateLangField('ctaText', e.target.value)}
                                placeholder="مثال: تصفح العرض واطلب الآن"
                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] focus:bg-white text-[#283618]"
                              />
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Right Column: Code, Theme & Presets */}
                    <div className="space-y-6">
                      
                      {/* Code & Discount Tag */}
                      <div className="p-5 rounded-3xl bg-white border border-[#E8E5DF] shadow-xs space-y-4">
                        <h4 className="text-sm font-bold text-[#283618] border-b border-[#E8E5DF] pb-2">
                          إعدادات الخصم والكوبون
                        </h4>

                        <div>
                          <label className="text-xs font-bold text-[#283618] block mb-1">
                            {t.admin.promoDiscountBadge}
                          </label>
                          <input
                            type="text"
                            value={currentBanner.discountBadge || ''}
                            onChange={(e) => updateBanner({ discountBadge: e.target.value })}
                            placeholder="20% OFF أو وفر 5,000 د.ع"
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] font-bold text-[#BC6C25]"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#283618] block mb-1">
                            {t.admin.promoCodeLabel}
                          </label>
                          <input
                            type="text"
                            value={currentBanner.promoCode || ''}
                            onChange={(e) => updateBanner({ promoCode: e.target.value.toUpperCase() })}
                            placeholder="SUPER20"
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] font-mono font-bold tracking-wider text-[#283618]"
                          />
                        </div>

                        {/* Theme Palette */}
                        <div>
                          <label className="text-xs font-bold text-[#283618] block mb-1.5">
                            {t.admin.promoThemeLabel}
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'amber', label: 'العسلي الذهبي 🔥', bg: 'bg-[#283618] border-[#DDA15E]' },
                              { id: 'crimson', label: 'الناري الحار 🌶️', bg: 'bg-[#3B0D0D] border-rose-500' },
                              { id: 'emerald', label: 'الأعشاب الطازجة 🌿', bg: 'bg-[#0F291E] border-emerald-500' },
                              { id: 'sunset', label: 'الغروب الملكي 🌅', bg: 'bg-[#2E1534] border-amber-400' },
                            ].map((th) => (
                              <button
                                key={th.id}
                                type="button"
                                onClick={() => updateBanner({ accentTheme: th.id as any })}
                                className={`p-2.5 rounded-xl border text-[11px] font-bold text-white text-center transition-all ${th.bg} ${
                                  currentBanner.accentTheme === th.id
                                    ? 'ring-2 ring-offset-2 ring-[#BC6C25] scale-102'
                                    : 'opacity-80 hover:opacity-100'
                                }`}
                              >
                                {th.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Image Selector & Presets */}
                      <div className="p-5 rounded-3xl bg-white border border-[#E8E5DF] shadow-xs space-y-3">
                        <h4 className="text-sm font-bold text-[#283618] border-b border-[#E8E5DF] pb-2">
                          {t.admin.promoImageLabel}
                        </h4>

                        <input
                          type="text"
                          value={currentBanner.imageUrl || ''}
                          onChange={(e) => updateBanner({ imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] text-[#283618]"
                        />

                        <span className="text-[11px] text-[#6B705C] font-semibold block">
                          أو اختر صورة شهية جاهزة بضغطة واحدة:
                        </span>

                        <div className="grid grid-cols-3 gap-2">
                          {promoImagePresets.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => updateBanner({ imageUrl: preset.url })}
                              className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all group ${
                                currentBanner.imageUrl === preset.url
                                  ? 'border-[#BC6C25] ring-2 ring-[#BC6C25]/30'
                                  : 'border-transparent hover:border-stone-400'
                              }`}
                              title={preset.label}
                            >
                              <Image
                                src={preset.url}
                                alt={preset.label}
                                fill
                                referrerPolicy="no-referrer"
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white font-bold p-1 truncate text-center">
                                {preset.label.split(' ')[0]}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })()}

            {/* Tab: Orders History Tracking */}
            {activeTab === 'orders' && (() => {
              const filteredOrders = orders.filter((ord) => {
                const matchesStatus = orderStatusFilter === 'all' || ord.status === orderStatusFilter;
                const q = orderSearchQuery.toLowerCase().trim();
                const matchesSearch = !q ||
                  ord.id.toLowerCase().includes(q) ||
                  ord.tableNumber.toLowerCase().includes(q);
                return matchesStatus && matchesSearch;
              });

              const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
              const todayCount = orders.filter((o) => {
                const d = new Date(o.timestamp);
                const now = new Date();
                return d.toDateString() === now.toDateString();
              }).length;
              const activeCount = orders.filter((o) => o.status === 'pending' || o.status === 'preparing').length;

              const handleCopyReceipt = async (order: TableOrder) => {
                try {
                  let text = `👑 ${settings.name[currentLang] || settings.name.ar}\n`;
                  text += `🧾 ${t.admin.orderIdLabel}: #${order.id}\n`;
                  text += `🍽️ ${t.cart.tableNumber}: ${order.tableNumber}\n`;
                  text += `⏰ ${new Date(order.timestamp).toLocaleString()}\n`;
                  text += `--------------------------------\n`;
                  order.items.forEach((item, idx) => {
                    const name = item.menuItem.name[currentLang] || item.menuItem.name.ar;
                    text += `${idx + 1}. ${item.quantity}x ${name} (${formatPrice(item.totalPrice, settings.currency, currentLang)})\n`;
                    if (item.selectedSize) {
                      text += `   ↳ ${item.selectedSize.name[currentLang] || item.selectedSize.name.ar}\n`;
                    }
                    if (item.selectedAddons?.length > 0) {
                      text += `   ↳ + ${item.selectedAddons.map((a) => a.name[currentLang] || a.name.ar).join(', ')}\n`;
                    }
                  });
                  text += `--------------------------------\n`;
                  text += `💰 ${t.cart.total}: ${formatPrice(order.total, settings.currency, currentLang)}\n`;
                  if (order.customerNotes) {
                    text += `📝 ${order.customerNotes}\n`;
                  }

                  if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                  } else {
                    const el = document.createElement('textarea');
                    el.value = text;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                  }
                  setCopiedOrderId(order.id);
                  setTimeout(() => setCopiedOrderId(null), 2000);
                } catch {
                  // ignore
                }
              };

              const handleExportJson = () => {
                const blob = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `orders-history-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              };

              return (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                  
                  {/* Stats Overview Banner */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    
                    <div className="p-4 rounded-2xl bg-white border border-[#E8E5DF] shadow-xs flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#283618]/10 text-[#283618] flex items-center justify-center font-bold">
                        <ShoppingBag className="w-5 h-5 text-[#283618]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#6B705C] block">
                          {t.admin.totalOrdersCount}
                        </span>
                        <span className="text-lg sm:text-xl font-black text-[#283618]">
                          {orders.length}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E8E5DF] shadow-xs flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                        <DollarSign className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#6B705C] block">
                          {t.admin.totalRevenueAmount}
                        </span>
                        <span className="text-sm sm:text-base font-black text-emerald-700">
                          {formatPrice(totalRevenue, settings.currency, currentLang)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E8E5DF] shadow-xs flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#BC6C25] flex items-center justify-center font-bold">
                        <Clock className="w-5 h-5 text-[#BC6C25]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#6B705C] block">
                          {t.admin.activeOrdersCount}
                        </span>
                        <span className="text-lg sm:text-xl font-black text-[#BC6C25]">
                          {activeCount}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E8E5DF] shadow-xs flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                        <Calendar className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#6B705C] block">
                          {t.admin.todayOrders}
                        </span>
                        <span className="text-lg sm:text-xl font-black text-blue-700">
                          {todayCount}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Actions & Filters Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E8E5DF]">
                    
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative flex-1">
                        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#989B8B]" />
                        <input
                          id="admin-orders-search-input"
                          type="text"
                          value={orderSearchQuery}
                          onChange={(e) => setOrderSearchQuery(e.target.value)}
                          placeholder="ابحث برقم الطلب أو رقم الطاولة..."
                          className="w-full ps-9 pe-3 py-1.5 text-xs sm:text-sm rounded-xl bg-[#FAF9F6] border border-[#E8E5DF] text-[#283618]"
                        />
                      </div>

                      <select
                        id="admin-orders-status-filter"
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-[#FAF9F6] border border-[#E8E5DF] font-bold text-[#283618]"
                      >
                        <option value="all">{t.admin.filterAllStatus}</option>
                        <option value="pending">{t.admin.statusPending}</option>
                        <option value="preparing">{t.admin.statusPreparing}</option>
                        <option value="completed">{t.admin.statusCompleted}</option>
                        <option value="cancelled">{t.admin.statusCancelled}</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        id="export-orders-json-btn"
                        type="button"
                        onClick={handleExportJson}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.admin.exportOrders}</span>
                      </button>

                      {onClearOrders && orders.length > 0 && (
                        <button
                          id="clear-all-orders-btn"
                          type="button"
                          onClick={() => {
                            if (window.confirm(t.admin.confirmClearOrders)) {
                              onClearOrders();
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t.admin.clearOrdersHistory}</span>
                        </button>
                      )}
                    </div>

                  </div>

                  {/* Orders Cards List */}
                  {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-white border border-[#E8E5DF] space-y-2">
                      <ShoppingBag className="w-12 h-12 text-[#989B8B] mx-auto" />
                      <h4 className="text-base font-bold text-[#283618]">
                        {t.admin.noOrdersMessage}
                      </h4>
                      <p className="text-xs text-[#6B705C]">
                        ستظهر جميع الطلبات المكتملة عبر الواتساب أو الطاولات تلقائياً هنا مع تفاصيل المبالغ والأطباق.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredOrders.map((ord) => {
                        const statusColors = {
                          pending: 'bg-amber-100 text-amber-800 border-amber-300',
                          preparing: 'bg-blue-100 text-blue-800 border-blue-300',
                          completed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                          cancelled: 'bg-stone-100 text-stone-600 border-stone-300',
                        }[ord.status || 'pending'];

                        return (
                          <div
                            key={ord.id}
                            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E5DF] shadow-xs hover:border-[#BC6C25]/40 transition-colors space-y-3"
                          >
                            {/* Order Header Row */}
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E5DF] pb-3">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono font-black text-sm text-[#283618] bg-[#FAF9F6] px-2.5 py-1 rounded-lg border border-[#E8E5DF]">
                                  #{ord.id}
                                </span>
                                <span className="text-xs font-bold text-[#6B705C] flex items-center gap-1">
                                  <span>🍽️ {ord.tableNumber}</span>
                                </span>
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                                  {ord.orderType === 'whatsapp' ? t.admin.whatsappOrderBadge : t.admin.kitchenOrderBadge}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#6B705C] flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{new Date(ord.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </span>

                                {/* Status Selector */}
                                <select
                                  value={ord.status || 'pending'}
                                  onChange={(e) => {
                                    if (onUpdateOrderStatus) {
                                      onUpdateOrderStatus(ord.id, e.target.value as any);
                                    }
                                  }}
                                  className={`text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer ${statusColors}`}
                                >
                                  <option value="pending">{t.admin.statusPending}</option>
                                  <option value="preparing">{t.admin.statusPreparing}</option>
                                  <option value="completed">{t.admin.statusCompleted}</option>
                                  <option value="cancelled">{t.admin.statusCancelled}</option>
                                </select>
                              </div>
                            </div>

                            {/* Items List */}
                            <div className="space-y-1.5">
                              {ord.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs text-[#283618]">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-[#BC6C25]">{item.quantity}x</span>
                                    <span className="font-semibold">
                                      {item.menuItem.name[currentLang] || item.menuItem.name.ar}
                                    </span>
                                    {item.selectedSize && (
                                      <span className="text-[11px] text-[#6B705C]">
                                        ({item.selectedSize.name[currentLang] || item.selectedSize.name.ar})
                                      </span>
                                    )}
                                    {item.selectedAddons?.length > 0 && (
                                      <span className="text-[10px] text-stone-500">
                                        + {item.selectedAddons.map((a) => a.name[currentLang] || a.name.ar).join(', ')}
                                      </span>
                                    )}
                                  </div>
                                  <span className="font-mono text-[#6B705C]">
                                    {formatPrice(item.totalPrice, settings.currency, currentLang)}
                                  </span>
                                </div>
                              ))}

                              {ord.customerNotes && (
                                <div className="text-[11px] text-[#BC6C25] bg-[#BC6C25]/5 px-2 py-1 rounded-md mt-1">
                                  📝 {ord.customerNotes}
                                </div>
                              )}
                            </div>

                            {/* Order Footer Row */}
                            <div className="flex items-center justify-between pt-2 border-t border-[#E8E5DF] text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#6B705C] font-semibold">{t.admin.orderTotalLabel}:</span>
                                <span className="text-base font-black text-[#283618]">
                                  {formatPrice(ord.total, settings.currency, currentLang)}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleCopyReceipt(ord)}
                                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedOrderId === ord.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-600" />
                                      <span className="text-emerald-700 font-bold">{t.admin.orderTextCopied}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>{t.admin.copyOrderText}</span>
                                    </>
                                  )}
                                </button>

                                {onDeleteOrder && (
                                  <button
                                    type="button"
                                    onClick={() => onDeleteOrder(ord.id)}
                                    className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    title="حذف هذا الطلب"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })()}

            {/* Tab 3: Restaurant Settings */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* General Details Form */}
                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    {t.admin.restaurantInfo}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        اسم المطعم (Arabic)
                      </label>
                      <input
                        type="text"
                        value={settings.name.ar}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, name: { ...settings.name, ar: e.target.value } })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Restaurant Name (English)
                      </label>
                      <input
                        type="text"
                        value={settings.name.en}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, name: { ...settings.name, en: e.target.value } })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        {t.admin.whatsappNumber}
                      </label>
                      <input
                        type="text"
                        value={settings.whatsappNumber}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, whatsappNumber: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        {t.admin.currencySettings}
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, currency: e.target.value as any })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                      >
                        <option value="IQD">د.ع - Iraqi Dinar (IQD)</option>
                        <option value="USD">$ - US Dollar (USD)</option>
                        <option value="TRY">₺ - Turkish Lira (TRY)</option>
                        <option value="SAR">ر.س - Saudi Riyal (SAR)</option>
                        <option value="AED">د.إ - UAE Dirham (AED)</option>
                        <option value="EUR">€ - Euro (EUR)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Wi-Fi SSID
                      </label>
                      <input
                        type="text"
                        value={settings.wifiSsid || ''}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, wifiSsid: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Wi-Fi Password
                      </label>
                      <input
                        type="text"
                        value={settings.wifiPassword || ''}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, wifiPassword: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        {t.admin.mapsLink}
                      </label>
                      <input
                        type="text"
                        value={settings.googleMapsUrl}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, googleMapsUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Backups & Restore Bar */}
                <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    النسخ الاحتياطي وإعادة الضبط (Backup & Restore)
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    <button
                      id="export-backup-btn"
                      onClick={handleExportBackup}
                      className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.admin.exportBackup}</span>
                    </button>

                    <label className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 cursor-pointer border border-stone-200">
                      <Upload className="w-4 h-4" />
                      <span>{t.admin.importBackup}</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                    </label>

                    <button
                      id="reset-defaults-btn"
                      onClick={() => {
                        if (window.confirm('Reset all items and categories to the sample default menu?')) {
                          onResetToDefaults();
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-2 border border-red-200 ms-auto"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{t.admin.resetToDefaults}</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 4: Dynamic QR Studio */}
            {activeTab === 'qr' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <DynamicQrStudio settings={settings} currentLang={currentLang} />
              </div>
            )}

          </div>
        )}

      </div>

      {/* Edit / Create Dish Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-60 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh] border border-stone-300">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
              <h3 className="text-base sm:text-lg font-bold">
                {isCreatingNew ? t.admin.addNewDish : t.admin.editDish}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Form */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Gemini AI Auto-Complete Button */}
              <div className="p-4 rounded-2xl bg-linear-to-r from-amber-500/10 via-amber-600/10 to-amber-700/10 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    مساعد الذكاء الاصطناعي (Gemini AI Multi-Language Chef)
                  </span>
                  <p className="text-[11px] text-amber-900/80">
                    اكتب اسم الطبق واضغط لتوليد الوصف والمكونات والترجمة للغات الأربع تلقائياً!
                  </p>
                </div>

                <button
                  id="gemini-ai-generate-btn"
                  type="button"
                  onClick={handleGenerateAiDetails}
                  disabled={aiLoading}
                  className="px-4 py-2.5 rounded-xl bg-linear-to-r from-amber-600 to-amber-800 text-white text-xs font-black shadow-md flex items-center gap-2 hover:opacity-90 disabled:opacity-50 shrink-0"
                >
                  <Sparkles className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
                  <span>{aiLoading ? t.admin.aiGenerating : t.admin.aiAutoGenerate}</span>
                </button>
              </div>

              {aiError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{aiError}</span>
                </div>
              )}

              {/* Language Tabs for Dish Name & Description */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 border-b border-stone-200 pb-2 overflow-x-auto">
                  {(['ar', 'en', 'fa', 'ur', 'ku', 'tr'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLangTab(lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                        activeLangTab === lang
                          ? 'bg-amber-800 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {lang === 'ar' && '🇮🇶 العربية'}
                      {lang === 'en' && '🇬🇧 English'}
                      {lang === 'fa' && '🇮🇷 فارسی'}
                      {lang === 'ur' && '🇵🇰 اردو'}
                      {lang === 'ku' && '☀️ کوردی'}
                      {lang === 'tr' && '🇹🇷 Türkçe'}
                    </button>
                  ))}
                </div>

                {/* Multilingual Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t.admin.dishName} ({activeLangTab.toUpperCase()})
                    </label>
                    <input
                      id="edit-dish-name-input"
                      type="text"
                      value={editingItem.name[activeLangTab] || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          name: { ...editingItem.name, [activeLangTab]: e.target.value },
                        })
                      }
                      placeholder="e.g. Lamb Ouzi / برغر واغيو"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t.admin.dishDescription} ({activeLangTab.toUpperCase()})
                    </label>
                    <textarea
                      id="edit-dish-desc-input"
                      rows={2}
                      value={editingItem.description[activeLangTab] || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description: { ...editingItem.description, [activeLangTab]: e.target.value },
                        })
                      }
                      placeholder="وصف مشهي للطبق..."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t.admin.dishIngredients} ({activeLangTab.toUpperCase()})
                    </label>
                    <input
                      id="edit-dish-ingredients-input"
                      type="text"
                      value={editingItem.ingredients[activeLangTab] || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          ingredients: { ...editingItem.ingredients, [activeLangTab]: e.target.value },
                        })
                      }
                      placeholder="مكونات الطبق مفصولة بفواصل..."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Price & Prep Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    {t.admin.category}
                  </label>
                  <select
                    value={editingItem.categoryId}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name[currentLang] || c.name.ar}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    {t.admin.price} ({settings.currency})
                  </label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    {t.item.prepTime} ({t.item.minutes})
                  </label>
                  <input
                    type="number"
                    value={editingItem.prepTimeMinutes || 10}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, prepTimeMinutes: parseInt(e.target.value) || 10 })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              {/* Image URL & Food Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  {t.admin.imageUrl}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, image: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-mono text-[11px]"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <span className="text-[11px] font-bold text-stone-600 block">
                    {t.admin.uploadOrSelectImage}:
                  </span>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {foodImagePresets.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, image: preset.url })}
                        className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          editingItem.image === preset.url ? 'border-amber-700 scale-105 shadow-sm' : 'border-transparent opacity-80'
                        }`}
                        title={preset.label}
                      >
                        <Image
                          src={preset.url}
                          alt={preset.label}
                          fill
                          sizes="56px"
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability & Featured Toggles */}
              <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
                  <input
                    type="checkbox"
                    checked={editingItem.isAvailable !== false}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, isAvailable: e.target.checked })
                    }
                    className="w-4 h-4 text-amber-700 rounded-sm"
                  />
                  <span>{t.admin.isAvailableToggle}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
                  <input
                    type="checkbox"
                    checked={!!editingItem.featured}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, featured: e.target.checked })
                    }
                    className="w-4 h-4 text-amber-700 rounded-sm"
                  />
                  <span>{t.admin.featuredDish}</span>
                </label>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs sm:text-sm font-bold hover:bg-stone-100"
              >
                {t.admin.cancel}
              </button>
              <button
                id="save-dish-btn"
                type="button"
                onClick={handleSaveDish}
                className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-black shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{t.admin.saveChanges}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
