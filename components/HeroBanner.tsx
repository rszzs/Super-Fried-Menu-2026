'use client';

import React from 'react';
import Image from 'next/image';
import { Language, RestaurantSettings } from '@/types/menu';
import { translations } from '@/lib/i18n';
import { SuperFriedLogo } from './SuperFriedLogo';
import { MapPin, Clock, Wifi, Utensils, Star, Phone, MessageCircle } from 'lucide-react';

interface HeroBannerProps {
  currentLang: Language;
  settings: RestaurantSettings;
  onScrollToMenu: () => void;
  onOpenWaiterModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentLang,
  settings,
  onScrollToMenu,
  onOpenWaiterModal,
}) => {
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden bg-[#1A2410] text-white">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={settings.heroImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85'}
          alt="Restaurant ambience"
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-cover opacity-25 filter brightness-90 transform scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1A2410] via-[#283618]/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          
          <div className="max-w-3xl flex-1 text-center md:text-start">
            {/* Rating / Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEFAE0]/15 border border-[#E9EDC9]/30 text-[#FEFAE0] text-xs font-semibold backdrop-blur-sm mb-4">
              <span className="flex text-[#DDA15E]">
                <Star className="w-3.5 h-3.5 fill-[#DDA15E] text-[#DDA15E]" />
                <Star className="w-3.5 h-3.5 fill-[#DDA15E] text-[#DDA15E]" />
                <Star className="w-3.5 h-3.5 fill-[#DDA15E] text-[#DDA15E]" />
                <Star className="w-3.5 h-3.5 fill-[#DDA15E] text-[#DDA15E]" />
                <Star className="w-3.5 h-3.5 fill-[#DDA15E] text-[#DDA15E]" />
              </span>
              <span>4.9 / 5.0 • {t.dietary.chefSpecial}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 leading-tight">
              {settings.name[currentLang] || settings.name.ar}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-[#E8E5DF] mb-6 font-light leading-relaxed">
              {settings.tagline[currentLang] || settings.tagline.ar}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mb-8">
              <button
                id="hero-view-menu-btn"
                onClick={onScrollToMenu}
                className="px-6 py-3 rounded-xl bg-[#BC6C25] hover:bg-[#A25B1D] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#1A2410]/40 transition-all flex items-center gap-2 transform active:scale-95 border border-[#DDA15E]/30"
              >
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-[#FEFAE0]" />
                <span>{t.viewMenu}</span>
              </button>

              {settings.googleMapsUrl && (
                <a
                  id="hero-google-maps-link"
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm sm:text-base font-medium backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#DDA15E]" />
                  <span>{t.quickActions.directionsGoogleMaps}</span>
                </a>
              )}

              <button
                id="hero-wifi-info-btn"
                onClick={onOpenWaiterModal}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#E8E5DF] text-sm sm:text-base font-medium backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <Wifi className="w-4 h-4 text-[#E9EDC9]" />
                <span>{t.quickActions.wifiInfo}</span>
              </button>
            </div>
          </div>

          {/* Hero Logo Emblem Showcase */}
          <div className="hidden sm:flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl shrink-0 group hover:border-[#DDA15E]/50 transition-all">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <SuperFriedLogo size={120} />
            </div>
            <div className="mt-3 text-center">
              <div className="text-xs font-black tracking-widest text-[#FEFAE0] uppercase">SUPER FRIED</div>
              <div className="text-[11px] text-[#DDA15E]">الكاظمية - شارع باب المراد</div>
            </div>
          </div>

        </div>

        {/* Key Info Micro-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-6 border-t border-white/15 text-xs text-[#E8E5DF]">
          
          {/* Hours */}
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#DDA15E] shrink-0" />
            <div>
              <span className="font-semibold text-white block">{t.quickActions.restaurantHours}</span>
              <span className="text-[#C5C3BE] text-xs truncate block">{settings.workingHours[currentLang] || settings.workingHours.ar}</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#DDA15E] shrink-0" />
            <div>
              <span className="font-semibold text-white block">{t.quickActions.contactUs}</span>
              <span className="text-[#C5C3BE] text-xs truncate block">{settings.address[currentLang] || settings.address.ar}</span>
            </div>
          </div>

          {/* Direct WhatsApp / Phone */}
          <a
            id="hero-whatsapp-link"
            href={`https://wa.me/${(settings.whatsappNumber || settings.phone).replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group hover:text-[#25D366] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <span className="font-semibold text-white block group-hover:text-[#25D366] transition-colors">WhatsApp</span>
              <span className="text-[#C5C3BE] text-xs group-hover:text-white transition-colors">{settings.phone || settings.whatsappNumber}</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};
