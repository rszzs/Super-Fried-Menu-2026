export type Language = 'ar' | 'en' | 'ku' | 'tr' | 'fa' | 'ur';

export type Currency = 'USD' | 'IQD' | 'TRY' | 'SAR' | 'AED' | 'EUR';

export interface MultilingualText {
  ar: string;
  en: string;
  ku: string;
  tr: string;
  fa?: string;
  ur?: string;
}

export type DietaryTag = 
  | 'halal' 
  | 'vegetarian' 
  | 'vegan' 
  | 'spicy' 
  | 'chef-special' 
  | 'bestseller'
  | 'gluten-free';

export type Allergen = 
  | 'nuts' 
  | 'dairy' 
  | 'gluten' 
  | 'eggs' 
  | 'soy' 
  | 'seafood' 
  | 'sesame';

export interface ItemSizeOption {
  id: string;
  name: MultilingualText;
  priceDelta: number; // additional price relative to base price
  isDefault?: boolean;
}

export interface ItemAddon {
  id: string;
  name: MultilingualText;
  price: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: MultilingualText;
  description: MultilingualText;
  ingredients: MultilingualText;
  price: number;
  image: string;
  isAvailable: boolean; // toggle if temporarily out of stock
  dietaryTags: DietaryTag[];
  allergens: Allergen[];
  calories?: number;
  prepTimeMinutes?: number;
  sizes?: ItemSizeOption[];
  addons?: ItemAddon[];
  featured?: boolean;
  order?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: MultilingualText;
  icon: string; // Lucide icon identifier
  order: number;
}

export interface RestaurantSettings {
  name: MultilingualText;
  tagline: MultilingualText;
  logo: string;
  heroImage: string;
  currency: Currency;
  currencySymbol: MultilingualText;
  phone: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  address: MultilingualText;
  workingHours: MultilingualText;
  wifiSsid?: string;
  wifiPassword?: string;
  adminPin: string;
  allowTableOrdering: boolean;
  allowWaiterCall: boolean;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  selectedSize?: ItemSizeOption;
  selectedAddons: ItemAddon[];
  quantity: number;
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface TableOrder {
  id: string;
  tableNumber: string;
  items: CartItem[];
  subtotal: number;
  tax?: number;
  total: number;
  timestamp: string;
  status: 'pending' | 'preparing' | 'served' | 'paid' | 'completed' | 'cancelled';
  orderType?: 'whatsapp' | 'kitchen';
  customerNotes?: string;
  customerPhone?: string;
}

export interface ItemReview {
  id: string;
  itemId: string;
  rating: number; // 1 to 5
  comment?: string;
  authorName?: string;
  createdAt: string; // ISO date string
}
