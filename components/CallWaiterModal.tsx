'use client';

import React, { useState } from 'react';
import { Language, RestaurantSettings } from '@/types/menu';
import { translations, isRtl } from '@/lib/i18n';
import confetti from 'canvas-confetti';
import { 
  X, 
  BellRing, 
  Receipt, 
  GlassWater, 
  HelpCircle, 
  Wifi, 
  Copy, 
  Check, 
  MapPin, 
  Star, 
  Phone, 
  MessageCircle,
  Sparkles,
  Share2
} from 'lucide-react';

interface CallWaiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
  onSetTableNumber: (table: string) => void;
  currentLang: Language;
  settings: RestaurantSettings;
}

export const CallWaiterModal: React.FC<CallWaiterModalProps> = ({
  isOpen,
  onClose,
  tableNumber,
  onSetTableNumber,
  currentLang,
  settings,
}) => {
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [copiedMenuLink, setCopiedMenuLink] = useState(false);
  const [requestSentMessage, setRequestSentMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = translations[currentLang];
  const rtl = isRtl(currentLang);

  const getMenuShareUrl = () => {
    if (typeof window === 'undefined') return '';
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', currentLang);
      if (tableNumber) {
        url.searchParams.set('table', tableNumber);
      }
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  const handleShareMenuWhatsApp = () => {
    const menuUrl = getMenuShareUrl();
    const restaurantName = settings.name[currentLang] || settings.name.ar;
    const shareText = `🍟 *${restaurantName}*\n${t.quickActions.shareMenuText}\n\n📍 ${settings.address[currentLang] || settings.address.ar}\n\n📱 *رابط المنيو الرقمي | Digital Menu:*\n${menuUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyMenuLink = async () => {
    const menuUrl = getMenuShareUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(menuUrl);
      } else {
        const el = document.createElement('textarea');
        el.value = menuUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopiedMenuLink(true);
      setTimeout(() => setCopiedMenuLink(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyWifi = () => {
    if (settings.wifiPassword) {
      navigator.clipboard.writeText(settings.wifiPassword);
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2500);
    }
  };

  const handleServiceRequest = (type: 'waiter' | 'bill' | 'water' | 'help') => {
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}

    let label = t.quickActions.callWaiter;
    if (type === 'bill') label = t.quickActions.requestBill;
    if (type === 'water') label = t.quickActions.requestWater;
    if (type === 'help') label = t.quickActions.generalAssistance;

    const tableLabel = tableNumber ? ` (#${tableNumber})` : '';
    setRequestSentMessage(`${label}${tableLabel}: ${t.quickActions.callWaiterSuccess}`);

    setTimeout(() => {
      setRequestSentMessage(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A2410]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-[#E8E5DF]">
        
        {/* Header */}
        <div className="p-5 bg-linear-to-r from-[#283618] to-[#3D5024] text-white flex items-center justify-between border-b border-[#606C38]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <BellRing className="w-5 h-5 text-[#DDA15E]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold leading-none">
                {t.quickActions.callWaiter}
              </h3>
              <p className="text-xs text-[#E8E5DF] mt-1">
                {settings.name[currentLang] || settings.name.ar}
              </p>
            </div>
          </div>

          <button
            id="close-waiter-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Success Notification Alert */}
          {requestSentMessage && (
            <div className="p-3.5 rounded-2xl bg-[#FEFAE0] border border-[#E9EDC9] text-[#283618] text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in slide-in-from-top-2">
              <Sparkles className="w-4 h-4 text-[#BC6C25] shrink-0" />
              <span>{requestSentMessage}</span>
            </div>
          )}

          {/* Table Number Prompt */}
          <div className="p-3.5 rounded-2xl bg-[#FEFAE0] border border-[#E9EDC9] flex items-center justify-between gap-3">
            <label className="text-xs font-bold text-[#283618]">
              {t.cart.tableNumber}:
            </label>
            <div className="flex items-center gap-1.5 flex-1 max-w-[160px]">
              <span className="text-[#989B8B] font-bold">#</span>
              <input
                id="waiter-table-input"
                type="text"
                value={tableNumber}
                onChange={(e) => onSetTableNumber(e.target.value)}
                placeholder="e.g. 7"
                className="w-full px-3 py-1.5 text-xs sm:text-sm font-bold text-[#283618] rounded-xl border border-[#E9EDC9] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#283618] text-center"
              />
            </div>
          </div>

          {/* Quick Service Buttons Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#6B705C] uppercase tracking-wider">
              {t.quickActions.callWaiter}
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              
              <button
                id="call-waiter-general-btn"
                onClick={() => handleServiceRequest('waiter')}
                className="p-3.5 rounded-2xl border border-[#E9EDC9] bg-[#FEFAE0] hover:bg-[#E9EDC9]/80 text-[#283618] text-start flex flex-col gap-2 transition-all active:scale-98"
              >
                <BellRing className="w-5 h-5 text-[#BC6C25]" />
                <span className="text-xs sm:text-sm font-bold">{t.quickActions.callWaiter}</span>
              </button>

              <button
                id="request-bill-btn"
                onClick={() => handleServiceRequest('bill')}
                className="p-3.5 rounded-2xl border border-[#E8E5DF] bg-white hover:bg-[#F8F7F3] text-[#283618] text-start flex flex-col gap-2 transition-all active:scale-98"
              >
                <Receipt className="w-5 h-5 text-[#283618]" />
                <span className="text-xs sm:text-sm font-bold">{t.quickActions.requestBill}</span>
              </button>

              <button
                id="request-water-btn"
                onClick={() => handleServiceRequest('water')}
                className="p-3.5 rounded-2xl border border-[#E8E5DF] bg-white hover:bg-[#F8F7F3] text-[#283618] text-start flex flex-col gap-2 transition-all active:scale-98"
              >
                <GlassWater className="w-5 h-5 text-[#606C38]" />
                <span className="text-xs sm:text-sm font-bold">{t.quickActions.requestWater}</span>
              </button>

              <button
                id="request-help-btn"
                onClick={() => handleServiceRequest('help')}
                className="p-3.5 rounded-2xl border border-[#E8E5DF] bg-white hover:bg-[#F8F7F3] text-[#283618] text-start flex flex-col gap-2 transition-all active:scale-98"
              >
                <HelpCircle className="w-5 h-5 text-[#BC6C25]" />
                <span className="text-xs sm:text-sm font-bold">{t.quickActions.generalAssistance}</span>
              </button>

            </div>
          </div>

          {/* Wi-Fi Details Card */}
          {settings.wifiSsid && (
            <div className="p-4 rounded-2xl bg-[#1A2410] text-white space-y-3 border border-[#283618]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-[#E9EDC9]" />
                  <span className="text-xs font-bold tracking-wide uppercase text-[#E8E5DF]">
                    {t.quickActions.wifiInfo}
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-[#FEFAE0] border border-white/20">
                  {settings.wifiSsid}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/10">
                <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#DDA15E]">
                  {settings.wifiPassword}
                </span>
                <button
                  id="copy-wifi-password-btn"
                  onClick={handleCopyWifi}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors text-white"
                >
                  {copiedWifi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#E9EDC9]" />
                      <span className="text-[#E9EDC9]">{t.quickActions.passwordCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.quickActions.copyPassword}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Share Menu Card */}
          <div className="p-4 rounded-2xl bg-linear-to-r from-[#FEFAE0] to-[#E9EDC9]/50 border border-[#E9EDC9] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#BC6C25]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#283618]">
                  {t.quickActions.shareMenu}
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#128C7E] font-bold">
                WhatsApp
              </span>
            </div>

            <p className="text-xs text-[#6B705C]">
              {t.quickActions.shareMenuText}
            </p>

            <div className="flex items-center gap-2">
              <button
                id="modal-share-menu-whatsapp-btn"
                onClick={handleShareMenuWhatsApp}
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{t.quickActions.shareMenuWhatsapp}</span>
              </button>

              <button
                id="modal-copy-menu-link-btn"
                onClick={handleCopyMenuLink}
                className="px-3 py-2 rounded-xl bg-white border border-[#E8E5DF] hover:bg-[#FAF9F6] text-[#283618] text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
              >
                {copiedMenuLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">{t.quickActions.menuLinkCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#6B705C]" />
                    <span>{t.quickActions.copyMenuLink}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Direct WhatsApp Contact */}
          {(settings.whatsappNumber || settings.phone) && (
            <div className="p-3.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#1A2410]">
                    WhatsApp: {settings.phone || settings.whatsappNumber}
                  </p>
                  <p className="text-[11px] text-[#6B705C]">
                    {currentLang === 'ar' ? 'تواصل مباشر مع إدارة المطعم وخدمة الزبائن' :
                     currentLang === 'fa' ? 'ارتباط مستقیم با مدیریت و پشتیبانی رستوران' :
                     currentLang === 'ur' ? 'ریسٹورنٹ مینجمنٹ اور کسٹمر سروس سے براہ راست رابطہ' :
                     currentLang === 'ku' ? 'پەیوەندی ڕاستەوخۆ لەگەڵ بەڕێوەبەرایەتی' :
                     currentLang === 'tr' ? 'Restoran yönetimiyle doğrudan WhatsApp iletişimi' :
                     'Direct WhatsApp chat with restaurant service'}
                  </p>
                </div>
              </div>
              <a
                id="modal-direct-whatsapp-btn"
                href={`https://wa.me/${(settings.whatsappNumber || settings.phone).replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          )}

          {/* Location & Reviews */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#6B705C] uppercase tracking-wider">
              {t.quickActions.directionsGoogleMaps}
            </h4>
            <div className="p-3.5 rounded-2xl bg-[#F8F7F3] border border-[#E8E5DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#BC6C25] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#283618]">
                    {settings.name[currentLang] || settings.name.ar}
                  </p>
                  <p className="text-xs text-[#6B705C]">
                    {settings.address[currentLang] || settings.address.ar}
                  </p>
                </div>
              </div>

              {settings.googleMapsUrl && (
                <a
                  id="modal-google-maps-link"
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#E8E5DF] text-[#283618] hover:bg-[#FEFAE0] text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
                >
                  <span>Google Maps</span>
                  <Star className="w-3.5 h-3.5 text-[#DDA15E] fill-[#DDA15E]" />
                </a>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
