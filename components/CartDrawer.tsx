'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CartItem, Language, RestaurantSettings, TableOrder } from '@/types/menu';
import { translations, formatPrice, isRtl } from '@/lib/i18n';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  Utensils, 
  CheckCircle2, 
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Send
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  tableNumber: string;
  onSetTableNumber: (table: string) => void;
  currentLang: Language;
  settings: RestaurantSettings;
  onProcessOrder?: (order: TableOrder) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  tableNumber,
  onSetTableNumber,
  currentLang,
  settings,
  onProcessOrder,
}) => {
  const [orderSent, setOrderSent] = useState(false);
  const t = translations[currentLang];
  const rtl = isRtl(currentLang);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = subtotal;

  const triggerConfetti = async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handleSendViaWhatsApp = () => {
    if (cartItems.length === 0) return;

    triggerConfetti();

    // Create Order History record
    const newOrder: TableOrder = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      tableNumber: tableNumber ? tableNumber.trim() : 'Takeaway / سفري',
      items: [...cartItems],
      subtotal,
      total,
      timestamp: new Date().toISOString(),
      status: 'pending',
      orderType: 'whatsapp',
      customerNotes: cartItems
        .map((i) => i.specialInstructions)
        .filter(Boolean)
        .join(' | ') || undefined,
    };

    if (onProcessOrder) {
      onProcessOrder(newOrder);
    }

    const restaurantName = settings.name[currentLang] || settings.name.ar;
    const tableText = tableNumber ? `#${tableNumber}` : 'غير محددة (Unspecified)';
    const currencyStr = settings.currency;

    let message = `👑 *${restaurantName}*\n`;
    message += `🍽️ *${t.cart.tableNumber}:* ${tableText}\n`;
    message += `⏰ *${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}*\n`;
    message += `--------------------------------\n`;

    cartItems.forEach((item, index) => {
      const itemName = item.menuItem.name[currentLang] || item.menuItem.name.ar;
      const sizeName = item.selectedSize
        ? ` (${item.selectedSize.name[currentLang] || item.selectedSize.name.ar})`
        : '';
      
      message += `${index + 1}. *${item.quantity}x ${itemName}${sizeName}*\n`;
      
      if (item.selectedAddons.length > 0) {
        const addonsList = item.selectedAddons
          .map((a) => a.name[currentLang] || a.name.ar)
          .join(', ');
        message += `   ➕ ${addonsList}\n`;
      }

      if (item.specialInstructions) {
        message += `   📝 "${item.specialInstructions}"\n`;
      }

      message += `   💵 ${formatPrice(item.totalPrice, currencyStr, currentLang)}\n\n`;
    });

    message += `--------------------------------\n`;
    message += `💰 *${t.cart.total}:* ${formatPrice(total, currencyStr, currentLang)}\n`;
    
    if (typeof window !== 'undefined') {
      const orderLink = `${window.location.origin}/?type=${tableNumber ? 'dinein' : 'delivery'}${tableNumber ? `&table=${tableNumber}` : ''}&lang=${currentLang}`;
      message += `\n🔗 *رابط الطلب التفاعلي:*\n${orderLink}\n`;
    }
    
    message += `\n${t.cart.whatsappOrderMessage} (${tableText})`;

    const cleanPhone = (settings.whatsappNumber || settings.phone).replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setOrderSent(true);
  };

  const handleDirectKitchenSend = () => {
    if (cartItems.length === 0) return;

    triggerConfetti();

    // Create Order History record
    const newOrder: TableOrder = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      tableNumber: tableNumber ? tableNumber.trim() : 'Kitchen / مباشر',
      items: [...cartItems],
      subtotal,
      total,
      timestamp: new Date().toISOString(),
      status: 'preparing',
      orderType: 'kitchen',
      customerNotes: cartItems
        .map((i) => i.specialInstructions)
        .filter(Boolean)
        .join(' | ') || undefined,
    };

    if (onProcessOrder) {
      onProcessOrder(newOrder);
    }

    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1A2410]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div
        className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 transform transition-transform duration-300 ease-out border-s border-[#E8E5DF] ${
          rtl ? 'animate-in slide-in-from-left' : 'animate-in slide-in-from-right'
        }`}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E5DF] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#283618] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#283618] leading-none">
                {t.cart.title}
              </h2>
              <span className="text-xs text-[#6B705C] font-medium">
                {cartItems.length} {t.cart.itemsCount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                id="clear-cart-items-btn"
                onClick={onClearCart}
                className="p-1.5 text-[#989B8B] hover:text-[#78281F] rounded-lg hover:bg-[#F0ECE4] transition-colors"
                title={t.cart.clearCart}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 text-[#6B705C] hover:text-[#283618] rounded-lg hover:bg-[#F0ECE4] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Number Selector Strip */}
        <div className="px-4 py-3 bg-[#FEFAE0] border-b border-[#E9EDC9] flex items-center justify-between gap-3">
          <label className="text-xs font-bold text-[#283618] shrink-0">
            {t.cart.tableNumber}:
          </label>
          <div className="flex items-center gap-1.5 flex-1 max-w-[180px]">
            <span className="text-[#989B8B] font-bold text-sm">#</span>
            <input
              id="cart-table-number-input"
              type="text"
              value={tableNumber}
              onChange={(e) => onSetTableNumber(e.target.value)}
              placeholder="e.g. 5, 12, VIP"
              className="w-full px-2.5 py-1 text-xs sm:text-sm font-bold text-[#283618] rounded-lg border border-[#E9EDC9] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#283618]"
            />
          </div>
        </div>

        {/* Content Body */}
        {orderSent ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E9EDC9] text-[#283618] flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-[#283618]" />
            </div>
            <h3 className="text-xl font-black text-[#283618]">
              {t.quickActions.callWaiterSuccess}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B705C] max-w-xs leading-relaxed">
              {tableNumber ? `${t.cart.tableNumber} #${tableNumber}` : ''}
              {' — '}
              {currentLang === 'ar' ? 'فريق الطهاة والخدمة يجهز طلبك الآن بأعلى معايير الجودة!' : 'The kitchen team is preparing your delicious order right now!'}
            </p>
            <div className="pt-4 flex flex-col gap-2 w-full max-w-xs">
              <button
                id="order-sent-close-btn"
                onClick={() => {
                  setOrderSent(false);
                  onClearCart();
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#283618] text-white text-xs sm:text-sm font-bold hover:bg-[#1A2410] transition-colors"
              >
                {t.viewMenu}
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-[#989B8B] space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#F0ECE4] flex items-center justify-center text-[#989B8B]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-sm text-[#6B705C] font-medium max-w-xs">
              {t.cart.emptyMessage}
            </p>
            <button
              id="empty-cart-browse-btn"
              onClick={onClose}
              className="mt-2 px-4 py-2 rounded-xl bg-[#F0ECE4] hover:bg-[#E8E5DF] text-[#283618] text-xs font-bold transition-colors"
            >
              {t.viewMenu}
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.map((item) => {
              const itemName = item.menuItem.name[currentLang] || item.menuItem.name.ar;
              const sizeName = item.selectedSize
                ? item.selectedSize.name[currentLang] || item.selectedSize.name.ar
                : null;

              return (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-2xl bg-white border border-[#E8E5DF] shadow-2xs space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F0ECE4] shrink-0 border border-[#E8E5DF]">
                      <Image
                        src={item.menuItem.image}
                        alt={itemName}
                        fill
                        sizes="56px"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-[#283618] truncate">
                          {itemName}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#989B8B] hover:text-[#78281F] p-0.5 rounded transition-colors"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {sizeName && (
                        <span className="inline-block text-[11px] font-semibold text-[#283618] bg-[#FEFAE0] px-1.5 py-0.5 rounded border border-[#E9EDC9] mt-0.5">
                          {sizeName}
                        </span>
                      )}

                      {item.selectedAddons.length > 0 && (
                        <div className="text-[11px] text-[#6B705C] mt-0.5">
                          + {item.selectedAddons.map((a) => a.name[currentLang] || a.name.ar).join(', ')}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <p className="text-[11px] text-[#BC6C25] italic mt-0.5 truncate">
                          &quot;{item.specialInstructions}&quot;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#F0ECE4]">
                    <div className="flex items-center gap-2 bg-[#F0ECE4] px-2 py-0.5 rounded-lg border border-[#E8E5DF]">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="w-5 h-5 rounded text-[#283618] hover:text-black flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#283618] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="w-5 h-5 rounded text-[#283618] hover:text-black flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-[#283618]">
                      {formatPrice(item.totalPrice, settings.currency, currentLang)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Drawer Footer: Total & WhatsApp Ordering */}
        {cartItems.length > 0 && !orderSent && (
          <div className="p-4 sm:p-5 bg-[#FAF9F6] border-t border-[#E8E5DF] space-y-3">
            
            {/* Subtotal & Total Rows */}
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-[#6B705C]">
                <span>{t.cart.subtotal}</span>
                <span>{formatPrice(subtotal, settings.currency, currentLang)}</span>
              </div>
              <div className="flex items-center justify-between text-[#283618] font-bold text-base sm:text-lg pt-1 border-t border-[#E8E5DF]">
                <span>{t.cart.total}</span>
                <span className="text-[#283618] font-black">
                  {formatPrice(total, settings.currency, currentLang)}
                </span>
              </div>
            </div>

            {/* Primary Action 1: Send via WhatsApp */}
            <button
              id="send-whatsapp-order-btn"
              type="button"
              onClick={handleSendViaWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-[#283618] hover:bg-[#1A2410] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1A2410]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 border border-[#3D5024]"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#DDA15E]" />
              <span>{t.cart.placeOrderWhatsapp}</span>
            </button>

            {/* Primary Action 2: Direct Kitchen Send / In-app Order */}
            <button
              id="direct-kitchen-send-btn"
              type="button"
              onClick={handleDirectKitchenSend}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FEFAE0] hover:bg-[#E9EDC9] text-[#283618] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 border border-[#E9EDC9]"
            >
              <Utensils className="w-4 h-4 text-[#BC6C25]" />
              <span>{t.cart.sendToKitchen}</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
