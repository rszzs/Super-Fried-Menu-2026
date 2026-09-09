'use client';

import React, { useState } from 'react';
import { Language, RestaurantSettings } from '@/types/menu';
import { translations, isRtl } from '@/lib/i18n';
import { SuperFriedLogo } from './SuperFriedLogo';
import { 
  Globe, 
  ShoppingBag, 
  BellRing, 
  Lock, 
  Sparkles, 
  Wifi, 
  MapPin, 
  Check, 
  X,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWaiterModal: () => void;
  onOpenAdminModal: () => void;
  tableNumber: string;
  settings: RestaurantSettings;
  onGoHome?: () => void;
}

const languages: { code: Language; label: string; flag: string; nativeName: string }[] = [
  { code: 'ar', label: 'العربية', flag: '🇮🇶', nativeName: 'العربية (العراق)' },
  { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷', nativeName: 'فارسی' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰', nativeName: 'اردو' },
  { code: 'ku', label: 'کوردی', flag: '☀️', nativeName: 'کوردی (سۆرانی / بادینی)' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenWaiterModal,
  onOpenAdminModal,
  tableNumber,
  settings,
  onGoHome,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = translations[currentLang];
  const rtl = isRtl(currentLang);

  const currentLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  const handleReturnHome = () => {
    if (onGoHome) {
      onGoHome();
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-linear-to-r from-[#8C3400] via-[#A73E00] to-[#9A3412] text-white backdrop-blur-md border-b border-[#732900] shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Restaurant Title - Returns to Home on Click */}
          <div 
            id="navbar-logo-home-btn"
            role="button"
            tabIndex={0}
            onClick={handleReturnHome}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleReturnHome();
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group transition-transform duration-200 hover:scale-[1.02] select-none"
            title={currentLang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Return to Home'}
            aria-label="Return to Home"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md border border-white/30 shrink-0 group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300">
              <SuperFriedLogo size={38} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white leading-tight drop-shadow-xs group-hover:text-[#FEFAE0] transition-colors duration-200">
                  {settings.name[currentLang] || settings.name.ar}
                </h1>
                {tableNumber && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 text-[#FEFAE0] border border-white/30 backdrop-blur-xs group-hover:bg-white/30 transition-colors">
                    {t.cart.tableNumber}: #{tableNumber}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#FEFAE0]/85 hidden sm:block truncate max-w-xs md:max-w-md font-medium group-hover:text-white transition-colors duration-200">
                {settings.tagline[currentLang] || settings.tagline.ar}
              </p>
            </div>
          </div>

          {/* Action Buttons: Waiter Notifications, Cart & Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Call Waiter & Notification Bell Button */}
            <button
              id="call-waiter-nav-btn"
              onClick={onOpenWaiterModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-[#FEFAE0] hover:bg-[#FFF7D6] text-[#8C3400] text-xs sm:text-sm font-bold transition-colors border border-[#FEFAE0] shadow-xs"
              title={t.quickActions.callWaiter}
            >
              <BellRing className="w-4 h-4 text-[#A73E00] animate-pulse" />
              <span className="hidden md:inline">{t.quickActions.callWaiter}</span>
            </button>

            {/* Cart / Table Order Button */}
            <button
              id="cart-drawer-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#1A2410] hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all border border-black/40"
            >
              <ShoppingBag className="w-4 h-4 text-[#FEFAE0]" />
              <span className="hidden xs:inline">{t.cart.title}</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#E05A00] text-white text-xs font-black flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Sub-bar below Chat, Notifications & Header Icons: Language Selector Strip */}
        <div className="py-2 px-3 sm:px-4 my-1 rounded-xl border-t sm:border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-between gap-3 text-xs transition-all duration-200 hover:scale-[1.005] hover:shadow-xs group">
          <div className="flex items-center gap-1.5 text-[#FEFAE0]/90 group-hover:text-white text-xs font-medium transition-colors">
            <Globe className="w-3.5 h-3.5 text-[#FEFAE0] group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline">لغة المنيو / Language:</span>
          </div>

          {/* Language Selector Dropdown / Pill Switcher */}
          <div className="relative">
            <button
              id="language-selector-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white text-xs font-bold transition-all duration-200 border border-white/30 hover:border-white/50 shadow-xs hover:shadow-sm backdrop-blur-xs hover:scale-105"
              aria-label="Change Language"
            >
              <span className="text-sm transition-transform group-hover:scale-110">{currentLangObj.flag}</span>
              <span className="font-bold">{currentLangObj.nativeName}</span>
              <ChevronDown className={`w-3 h-3 text-white/80 group-hover:text-white transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangMenuOpen(false)}
                />
                <div
                  className={`absolute ${
                    rtl ? 'left-0' : 'right-0'
                  } mt-2 w-56 rounded-2xl bg-white border border-[#E8E5DF] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150`}
                >
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-[#8C3400] uppercase tracking-wider border-b border-[#F0ECE4] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#8C3400]" />
                      <span>اختر اللغة / Select Language</span>
                    </div>
                    <button
                      id="close-lang-menu-btn"
                      type="button"
                      onClick={() => setLangMenuOpen(false)}
                      className="p-1 rounded-md text-stone-400 hover:text-[#8C3400] hover:bg-[#FEFAE0] transition-colors"
                      aria-label="إغلاق قائمة اللغات / Close"
                      title="إغلاق / Close"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        id={`lang-select-${lang.code}`}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-start hover:bg-[#FEFAE0]/80 transition-colors ${
                          currentLang === lang.code
                            ? 'font-bold text-[#8C3400] bg-[#FEFAE0]'
                            : 'text-[#283618]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </span>
                        {currentLang === lang.code && (
                          <Check className="w-4 h-4 text-[#8C3400]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Bottom Close Button */}
                  <div className="px-2 pt-1.5 pb-0.5 border-t border-[#F0ECE4]">
                    <button
                      id="close-lang-menu-footer-btn"
                      type="button"
                      onClick={() => setLangMenuOpen(false)}
                      className="w-full py-1.5 px-3 rounded-xl bg-[#F0ECE4] hover:bg-[#E8E5DF] text-[#283618] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5 text-[#8C3400]" />
                      <span>إغلاق القائمة / Close</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
