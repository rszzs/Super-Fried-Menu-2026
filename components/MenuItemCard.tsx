'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, Language, RestaurantSettings } from '@/types/menu';
import { translations, formatPrice } from '@/lib/i18n';
import { Plus, Flame, Sparkles, Star, Ban, Clock, AlertCircle } from 'lucide-react';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';

interface MenuItemCardProps {
  item: MenuItem;
  currentLang: Language;
  settings: RestaurantSettings;
  onSelect: (item: MenuItem) => void;
  ratingInfo?: { average: number; count: number };
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  currentLang,
  settings,
  onSelect,
  ratingInfo,
}) => {
  const t = translations[currentLang];
  const isAvailable = item.isAvailable !== false;
  const [hasImageError, setHasImageError] = useState(false);

  const itemName = item.name[currentLang] || item.name.ar;
  const itemDesc = item.description[currentLang] || item.description.ar;
  const activeImage = hasImageError ? DEFAULT_FALLBACK_IMAGE : (item.image || DEFAULT_FALLBACK_IMAGE);

  return (
    <div
      id={`menu-item-card-${item.id}`}
      onClick={() => onSelect(item)}
      className={`group relative flex flex-col justify-between rounded-2xl bg-white border border-[#E8E5DF] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer ${
        !isAvailable ? 'opacity-75 grayscale-[40%]' : ''
      }`}
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-[#F0ECE4]">
          <Image
            src={activeImage}
            alt={itemName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            onError={() => setHasImageError(true)}
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          
          {/* Top Overlay Badges */}
          <div className="absolute top-2.5 start-2.5 flex flex-wrap gap-1.5 z-10">
            {!isAvailable && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#78281F]/90 text-white shadow-xs backdrop-blur-xs">
                <Ban className="w-3.5 h-3.5" />
                {t.item.outOfStock}
              </span>
            )}
            {isAvailable && item.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#BC6C25] text-white shadow-xs">
                <Star className="w-3 h-3 fill-white" />
                {t.dietary.chefSpecial}
              </span>
            )}
            {isAvailable && item.dietaryTags?.includes('bestseller') && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#A25B1D] text-white shadow-xs">
                <Flame className="w-3 h-3" />
                {t.dietary.bestseller}
              </span>
            )}
            {isAvailable && item.dietaryTags?.includes('spicy') && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#BC6C25] text-white shadow-xs">
                🔥
              </span>
            )}
          </div>

          {/* Prep Time or Calories Floating Chip */}
          <div className="absolute bottom-2 end-2 flex gap-1 z-10">
            {item.prepTimeMinutes && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#283618]/85 text-[#FEFAE0] backdrop-blur-xs">
                <Clock className="w-3 h-3 text-[#DDA15E]" />
                {item.prepTimeMinutes} {t.item.minutes}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#283618] group-hover:text-[#BC6C25] transition-colors leading-snug line-clamp-1">
              {itemName}
            </h3>
            {ratingInfo && ratingInfo.count > 0 ? (
              <div 
                className="flex items-center gap-1 shrink-0 bg-[#FEFAE0] border border-[#E9EDC9] px-2 py-0.5 rounded-lg text-xs font-bold text-[#283618]"
                title={`${ratingInfo.average.toFixed(1)} / 5 (${ratingInfo.count} ${t.reviews.reviewsCount})`}
              >
                <Star className="w-3.5 h-3.5 fill-[#BC6C25] text-[#BC6C25]" />
                <span>{ratingInfo.average.toFixed(1)}</span>
                <span className="text-[10px] text-[#6B705C] font-semibold">({ratingInfo.count})</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 shrink-0 bg-[#F8F7F3] border border-[#E8E5DF] px-1.5 py-0.5 rounded-lg text-[11px] font-semibold text-[#6B705C]">
                <Star className="w-3 h-3 fill-[#DDA15E] text-[#DDA15E]" />
                <span>5.0</span>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#6B705C] line-clamp-2 leading-relaxed mb-3">
            {itemDesc}
          </p>

          {/* Dietary tags & Allergens preview */}
          <div className="flex flex-wrap gap-1 mb-2">
            {item.dietaryTags?.filter(t => !['bestseller', 'chef-special'].includes(t)).slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-[#F0ECE4] text-[11px] text-[#283618] font-medium">
                {t.dietary[tag as keyof typeof t.dietary] || tag}
              </span>
            ))}
            {item.allergens && item.allergens.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-[#FEFAE0] text-[11px] text-[#283618] font-medium border border-[#E9EDC9]" title={t.allergens.title}>
                ⚠️ {item.allergens.length} {t.allergens.title.split(' ')[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Add Button */}
      <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-[#F0ECE4] mt-2">
        <div>
          <span className="text-xs text-[#989B8B] block font-medium">
            {item.sizes && item.sizes.length > 1 ? t.item.portionSize : t.admin.price}
          </span>
          <span className="text-base sm:text-lg font-black text-[#283618]">
            {formatPrice(item.price, settings.currency, currentLang)}
          </span>
        </div>

        <button
          id={`add-btn-${item.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          disabled={!isAvailable}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all ${
            isAvailable
              ? 'bg-[#283618] hover:bg-[#1A2410] text-white active:scale-95'
              : 'bg-[#F0ECE4] text-[#989B8B] cursor-not-allowed'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{isAvailable ? t.item.addToOrder : t.item.outOfStock}</span>
        </button>
      </div>
    </div>
  );
};
