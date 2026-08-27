'use client';

import React, { useState } from 'react';
import { Language, RestaurantSettings } from '@/types/menu';
import { translations, isRtl } from '@/lib/i18n';
import { SuperFriedLogo } from './SuperFriedLogo';
import { 
  Share2, 
  X, 
  Copy, 
  Check, 
  MessageCircle, 
  Send, 
  Utensils, 
  Bike, 
  ShoppingBag, 
  QrCode,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ShareMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  settings: RestaurantSettings;
  currentTable?: string;
}

export type OrderShareType = 'dinein' | 'delivery' | 'takeaway' | 'general';

export const ShareMenuModal: React.FC<ShareMenuModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  settings,
  currentTable = '',
}) => {
  const [selectedType, setSelectedType] = useState<OrderShareType>(
    currentTable ? 'dinein' : 'general'
  );
  const [tableNum, setTableNum] = useState<string>(currentTable || '1');
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const t = translations[currentLang];
  const rtl = isRtl(currentLang);

  if (!isOpen) return null;

  // Build dynamic URL based on selected order type
  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    try {
      const origin = window.location.origin;
      const url = new URL(origin);
      url.searchParams.set('lang', currentLang);

      if (selectedType === 'dinein') {
        url.searchParams.set('type', 'dinein');
        if (tableNum) url.searchParams.set('table', tableNum);
      } else if (selectedType === 'delivery') {
        url.searchParams.set('type', 'delivery');
      } else if (selectedType === 'takeaway') {
        url.searchParams.set('type', 'takeaway');
      }
      return url.toString();
    } catch {
      return typeof window !== 'undefined' ? window.location.href : '';
    }
  };

  const currentUrl = getShareUrl();

  // Dynamic OpenGraph image preview URL for this specific configuration
  const ogPreviewUrl = `/api/og?type=${selectedType}${selectedType === 'dinein' ? `&table=${tableNum}` : ''}&lang=${currentLang}`;

  // WhatsApp formatted text
  const getWhatsAppMessage = () => {
    const restaurantName = settings.name[currentLang] || settings.name.ar;
    let typeTitle = '🍟 المنيو الرقمي الكامل';
    if (selectedType === 'dinein') {
      typeTitle = `🍽️ طلب داخل الصالة - طاولة رقم #${tableNum}`;
    } else if (selectedType === 'delivery') {
      typeTitle = '🛵 طلب توصيل دليفري سريع للبيت';
    } else if (selectedType === 'takeaway') {
      typeTitle = '🛍️ طلب سفري واستلام من الفرع';
    }

    return `🍟 *${restaurantName}*\n${typeTitle}\n\n📍 ${settings.address[currentLang] || settings.address.ar}\n\n📱 *اضغط هنا لتصفح المنيو والطلب مباشرة:*\n${currentUrl}`;
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const el = document.createElement('textarea');
        el.value = currentUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleWhatsApp = () => {
    const text = getWhatsAppMessage();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    const text = getWhatsAppMessage();
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-lg bg-[#FAF9F6] rounded-3xl border border-[#E8E5DF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
          rtl ? 'text-right' : 'text-left'
        }`}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-linear-to-r from-[#283618] to-[#3D5024] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs">
              <SuperFriedLogo size={34} />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>مشاركة رابط المنيو</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#FEFAE0]/20 text-[#FEFAE0]">
                  حسب نوع الطلب
                </span>
              </h2>
              <p className="text-xs text-[#E8E5DF]">
                اختر نوع الطلب لتوليد بطاقة ورابط المشاركة المناسب
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Step 1: Select Order Type */}
          <div>
            <label className="block text-xs font-bold text-[#283618] mb-2.5 uppercase tracking-wider">
              1. حدد نوع الطلب لعرضه في رابط المشاركة:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              {/* General Menu */}
              <button
                type="button"
                onClick={() => setSelectedType('general')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  selectedType === 'general'
                    ? 'bg-[#283618] text-[#FEFAE0] border-[#283618] shadow-md ring-2 ring-[#606C38]/40'
                    : 'bg-white text-[#283618] border-[#E8E5DF] hover:bg-[#F0ECE4]'
                }`}
              >
                <Sparkles className="w-5 h-5 mb-1.5 text-[#BC6C25]" />
                <span className="text-xs font-bold">منيو عام</span>
                <span className="text-[10px] opacity-70">المنيو كاملاً</span>
              </button>

              {/* Dine-in Table */}
              <button
                type="button"
                onClick={() => setSelectedType('dinein')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  selectedType === 'dinein'
                    ? 'bg-[#283618] text-[#FEFAE0] border-[#283618] shadow-md ring-2 ring-[#606C38]/40'
                    : 'bg-white text-[#283618] border-[#E8E5DF] hover:bg-[#F0ECE4]'
                }`}
              >
                <Utensils className="w-5 h-5 mb-1.5 text-[#DDA15E]" />
                <span className="text-xs font-bold">داخل الصالة</span>
                <span className="text-[10px] opacity-70">طاولة محددة</span>
              </button>

              {/* Delivery */}
              <button
                type="button"
                onClick={() => setSelectedType('delivery')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  selectedType === 'delivery'
                    ? 'bg-[#283618] text-[#FEFAE0] border-[#283618] shadow-md ring-2 ring-[#606C38]/40'
                    : 'bg-white text-[#283618] border-[#E8E5DF] hover:bg-[#F0ECE4]'
                }`}
              >
                <Bike className="w-5 h-5 mb-1.5 text-[#C1121F]" />
                <span className="text-xs font-bold">توصيل دليفري</span>
                <span className="text-[10px] opacity-70">إلى المنزل</span>
              </button>

              {/* Takeaway */}
              <button
                type="button"
                onClick={() => setSelectedType('takeaway')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  selectedType === 'takeaway'
                    ? 'bg-[#283618] text-[#FEFAE0] border-[#283618] shadow-md ring-2 ring-[#606C38]/40'
                    : 'bg-white text-[#283618] border-[#E8E5DF] hover:bg-[#F0ECE4]'
                }`}
              >
                <ShoppingBag className="w-5 h-5 mb-1.5 text-[#BC6C25]" />
                <span className="text-xs font-bold">سفري استلام</span>
                <span className="text-[10px] opacity-70">من الفرع</span>
              </button>
            </div>

            {/* Table Number Input if Dine-in */}
            {selectedType === 'dinein' && (
              <div className="mt-3 p-3 rounded-2xl bg-[#FEFAE0]/80 border border-[#E9EDC9] flex items-center justify-between gap-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-bold text-[#283618]">
                  <Utensils className="w-4 h-4 text-[#BC6C25]" />
                  <span>حدد رقم الطاولة للصالة:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#6B705C]">طاولة #</span>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={tableNum}
                    onChange={(e) => setTableNum(e.target.value)}
                    className="w-16 px-2.5 py-1 text-center font-bold text-[#283618] bg-white rounded-lg border border-[#CCD5AE] focus:outline-hidden focus:ring-2 focus:ring-[#283618]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Live Link Card Preview */}
          <div>
            <label className="block text-xs font-bold text-[#283618] mb-2 uppercase tracking-wider flex items-center justify-between">
              <span>معاينة الرابط عند الإرسال (Live Preview):</span>
              <span className="text-[10px] text-[#6B705C] font-normal">مع الشعار ونوع الطلب</span>
            </label>
            
            <div className="p-3.5 rounded-2xl bg-white border border-[#E8E5DF] shadow-xs flex items-center gap-3.5 group hover:border-[#BC6C25] transition-all">
              <div className="w-14 h-14 rounded-xl bg-[#FAF9F6] border border-[#E8E5DF] p-1 flex items-center justify-center shrink-0">
                <SuperFriedLogo size={46} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#BC6C25]/10 text-[#BC6C25]">
                    {selectedType === 'dinein' && `🍽️ طاولة #${tableNum}`}
                    {selectedType === 'delivery' && '🛵 دليفري وتوصيل'}
                    {selectedType === 'takeaway' && '🛍️ سفري واستلام'}
                    {selectedType === 'general' && '🍟 المنيو الرقمي'}
                  </span>
                  <span className="text-xs font-bold text-[#283618] truncate">
                    سوبر فرايد | Super Fried
                  </span>
                </div>
                <p className="text-xs text-[#6B705C] truncate">
                  {selectedType === 'dinein' && `قائمة طعام طاولة ${tableNum} - اطلب مباشرة من الطاولة`}
                  {selectedType === 'delivery' && 'طلب توصيل دليفري سريع - الكاظمية باب المراد'}
                  {selectedType === 'takeaway' && 'طلب سفري مسبق واستلام ساخن من المطعم'}
                  {selectedType === 'general' && 'أشهى وجبات الكنتاكي، البركر، الستربس والريزو'}
                </p>
                <div className="text-[10px] text-[#989B8B] mt-1 truncate">
                  {currentUrl}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Share Actions */}
          <div className="space-y-2.5 pt-2 border-t border-[#E8E5DF]">
            
            {/* WhatsApp Share Button */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md shadow-[#25D366]/20 transition-all transform active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>إرسال عبر واتساب (WhatsApp)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              {/* Telegram Share Button */}
              <button
                onClick={handleTelegram}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#0088CC] font-bold text-xs border border-[#229ED9]/30 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>تيليجرام Telegram</span>
              </button>

              {/* Toggle QR Code */}
              <button
                onClick={() => setShowQr(!showQr)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#F0ECE4] hover:bg-[#E8E5DF] text-[#283618] font-bold text-xs border border-[#E8E5DF] transition-colors"
              >
                <QrCode className="w-4 h-4 text-[#BC6C25]" />
                <span>{showQr ? 'إخفاء الـ QR' : 'عرض كود QR'}</span>
              </button>
            </div>

            {/* Copy Link Input Bar */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-2 text-xs text-[#283618] bg-white rounded-xl border border-[#E8E5DF] font-mono select-all focus:outline-hidden"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#283618] hover:bg-[#1F2B13] text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
              </button>
            </div>

            {/* QR Code Container if toggled */}
            {showQr && (
              <div className="p-4 rounded-2xl bg-white border border-[#E8E5DF] flex flex-col items-center text-center gap-3 animate-in fade-in duration-150">
                <div className="p-2 bg-white rounded-xl border border-[#E8E5DF] shadow-xs">
                  <QRCodeSVG
                    value={currentUrl}
                    size={160}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: '/logo.svg',
                      x: undefined,
                      y: undefined,
                      height: 36,
                      width: 36,
                      excavate: true,
                    }}
                  />
                </div>
                <div className="text-xs text-[#283618] font-semibold">
                  امسح الكود لفتح: {selectedType === 'dinein' ? `طاولة #${tableNum}` : selectedType === 'delivery' ? 'طلب التوصيل' : selectedType === 'takeaway' ? 'طلب السفري' : 'المنيو'}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
