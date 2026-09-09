'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language, RestaurantSettings } from '@/types/menu';
import { translations, isRtl } from '@/lib/i18n';
import { Sparkles, Tag, Clock, Copy, Check, Flame, Percent } from 'lucide-react';

interface PromotionalBannerProps {
  currentLang: Language;
  settings: RestaurantSettings;
  onScrollToMenu: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  currentLang,
  settings,
  onScrollToMenu,
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations[currentLang];
  const rtl = isRtl(currentLang);

  const banner = settings.promotionalBanner;
  if (!banner || !banner.enabled) {
    return null;
  }

  const badgeText = banner.badge?.[currentLang] || banner.badge?.ar || 'عرض الموسم 🔥';
  const titleText = banner.title?.[currentLang] || banner.title?.ar || '';
  const descText = banner.description?.[currentLang] || banner.description?.ar || '';
  const validUntilText = banner.validUntil?.[currentLang] || banner.validUntil?.ar || '';
  const ctaButtonText = banner.ctaText?.[currentLang] || banner.ctaText?.ar || t.admin.promoCtaLabel || 'تصفح العرض';

  const handleCopyCode = async (code: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const input = document.createElement('textarea');
        input.value = code;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  // Theme configuration
  const theme = banner.accentTheme || 'amber';
  
  const themeStyles = {
    amber: {
      cardBg: 'bg-linear-to-r from-[#283618] via-[#354820] to-[#1E2912]',
      border: 'border-[#DDA15E]/40',
      badgeBg: 'bg-[#BC6C25]/25 border-[#DDA15E]/40 text-[#FEFAE0]',
      badgeIcon: 'text-[#DDA15E]',
      discountTag: 'bg-linear-to-r from-[#BC6C25] to-[#DDA15E] text-white shadow-md',
      codeBox: 'bg-[#1A2410]/80 border-[#DDA15E]/40 text-[#FEFAE0]',
      ctaBtn: 'bg-linear-to-r from-[#BC6C25] to-[#DDA15E] hover:from-[#A85B18] hover:to-[#C68D4A] text-[#1A2410] font-black',
      glow: 'shadow-[0_10px_35px_rgba(188,108,37,0.15)]',
    },
    crimson: {
      cardBg: 'bg-linear-to-r from-[#3B0D0D] via-[#4A1010] to-[#2B0A0A]',
      border: 'border-rose-500/30',
      badgeBg: 'bg-rose-500/20 border-rose-400/40 text-rose-100',
      badgeIcon: 'text-rose-400',
      discountTag: 'bg-linear-to-r from-red-600 to-rose-600 text-white shadow-md',
      codeBox: 'bg-black/40 border-rose-500/40 text-rose-100',
      ctaBtn: 'bg-linear-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white font-black',
      glow: 'shadow-[0_10px_35px_rgba(225,29,72,0.2)]',
    },
    emerald: {
      cardBg: 'bg-linear-to-r from-[#0F291E] via-[#163829] to-[#0A1F16]',
      border: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-100',
      badgeIcon: 'text-emerald-400',
      discountTag: 'bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-md',
      codeBox: 'bg-black/40 border-emerald-500/40 text-emerald-100',
      ctaBtn: 'bg-linear-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-[#0F291E] font-black',
      glow: 'shadow-[0_10px_35px_rgba(16,185,129,0.2)]',
    },
    sunset: {
      cardBg: 'bg-linear-to-r from-[#2E1534] via-[#3C1A43] to-[#200D24]',
      border: 'border-amber-400/30',
      badgeBg: 'bg-amber-400/20 border-amber-300/40 text-amber-100',
      badgeIcon: 'text-amber-300',
      discountTag: 'bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-md',
      codeBox: 'bg-black/40 border-amber-400/40 text-amber-100',
      ctaBtn: 'bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-stone-900 font-black',
      glow: 'shadow-[0_10px_35px_rgba(245,158,11,0.2)]',
    },
  }[theme];

  return (
    <section 
      id="seasonal-promotional-banner" 
      aria-label="Seasonal Promotions and Offers"
      className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-6"
    >
      <div 
        className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 md:p-8 border ${themeStyles.border} ${themeStyles.cardBg} ${themeStyles.glow} text-white transition-all duration-300`}
      >
        {/* Subtle Decorative Background Pattern */}
        <div className="absolute -end-16 -top-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -start-16 -bottom-16 w-64 h-64 rounded-full bg-[#BC6C25]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Main Info Column */}
          <div className="flex-1 text-center lg:text-start space-y-3 sm:space-y-4">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {/* Badge Tag */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${themeStyles.badgeBg}`}>
                <Flame className={`w-3.5 h-3.5 ${themeStyles.badgeIcon}`} />
                <span>{badgeText}</span>
              </span>

              {/* Discount Tag */}
              {banner.discountBadge && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black tracking-wide ${themeStyles.discountTag}`}>
                  <Percent className="w-3.5 h-3.5" />
                  <span>{banner.discountBadge}</span>
                </span>
              )}

              {/* Limited Time Badge */}
              {validUntilText && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-[#FEFAE0] border border-white/15">
                  <Clock className="w-3 h-3 text-[#DDA15E]" />
                  <span>{validUntilText}</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
              {titleText}
            </h2>

            {/* Description */}
            {descText && (
              <p className="text-xs sm:text-sm md:text-base text-[#FEFAE0]/85 max-w-2xl leading-relaxed">
                {descText}
              </p>
            )}

            {/* Action Bar: Promo Code & CTA Button */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              
              {/* Coupon Code Pill with Copy */}
              {banner.promoCode && (
                <button
                  id="promo-copy-code-btn"
                  type="button"
                  onClick={() => handleCopyCode(banner.promoCode!)}
                  title={t.admin.promoCopyCode}
                  className={`group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-mono font-bold transition-all duration-200 cursor-pointer shadow-xs hover:border-[#DDA15E] ${themeStyles.codeBox}`}
                >
                  <Tag className="w-4 h-4 text-[#DDA15E]" />
                  <span className="tracking-wider uppercase">{banner.promoCode}</span>
                  <span className="border-s border-white/20 ps-2.5 flex items-center gap-1 text-[11px] font-sans font-semibold text-[#DDA15E]">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 font-bold">{t.admin.promoCopiedCode}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        <span>{t.admin.promoCopyCode}</span>
                      </>
                    )}
                  </span>
                </button>
              )}

              {/* Main CTA: Scroll to Menu */}
              <button
                id="promo-cta-order-btn"
                type="button"
                onClick={onScrollToMenu}
                className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${themeStyles.ctaBtn}`}
              >
                <span>{ctaButtonText}</span>
              </button>

            </div>

          </div>

          {/* Optional Promo Food Image Banner */}
          {banner.imageUrl && (
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:w-[340px] aspect-4/3 shrink-0 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl group">
              <Image
                src={banner.imageUrl}
                alt={titleText}
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                referrerPolicy="no-referrer"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-[11px] font-bold px-2.5 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#DDA15E]" />
                  <span>Super Fried Special</span>
                </span>
                {banner.discountBadge && (
                  <span className="text-[#DDA15E] font-black">{banner.discountBadge}</span>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
