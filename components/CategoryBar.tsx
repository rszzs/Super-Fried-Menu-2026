'use client';

import React from 'react';
import { Category, DietaryTag, Language } from '@/types/menu';
import { translations } from '@/lib/i18n';
import { 
  Search, 
  X, 
  UtensilsCrossed, 
  Salad, 
  Flame, 
  Pizza, 
  Sandwich, 
  CakeSlice, 
  Coffee, 
  Soup, 
  Sparkles,
  Layers
} from 'lucide-react';

interface CategoryBarProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDietaryTag: DietaryTag | 'all';
  onSelectDietaryTag: (tag: DietaryTag | 'all') => void;
  currentLang: Language;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedDietaryTag,
  onSelectDietaryTag,
  currentLang,
}) => {
  const t = translations[currentLang];

  // Helper to render Lucide icon dynamically
  const renderCategoryIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = `w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-white' : 'text-[#BC6C25]'}`;
    switch (iconName) {
      case 'Soup':
        return <Soup className={iconClass} />;
      case 'Salad':
        return <Salad className={iconClass} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Pizza':
        return <Pizza className={iconClass} />;
      case 'Sandwich':
        return <Sandwich className={iconClass} />;
      case 'CakeSlice':
        return <CakeSlice className={iconClass} />;
      case 'Coffee':
        return <Coffee className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const dietaryOptions: { tag: DietaryTag | 'all'; label: string; icon?: string }[] = [
    { tag: 'all', label: t.allDietary },
    { tag: 'bestseller', label: t.dietary.bestseller },
    { tag: 'chef-special', label: t.dietary.chefSpecial },
    { tag: 'halal', label: t.dietary.halal },
    { tag: 'vegetarian', label: t.dietary.vegetarian },
    { tag: 'spicy', label: t.dietary.spicy },
    { tag: 'gluten-free', label: t.dietary.glutenFree },
  ];

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E5DF] shadow-xs py-3 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Search Bar & Dietary Filter Row */}
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#989B8B] pointer-events-none" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full ps-9 pe-8 py-2 text-xs sm:text-sm rounded-xl bg-[#F0ECE4] border border-[#E8E5DF] text-[#283618] placeholder-[#989B8B] focus:outline-hidden focus:ring-2 focus:ring-[#283618] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => onSearchChange('')}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[#989B8B] hover:text-[#283618] p-0.5 rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary Filters Pill Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {dietaryOptions.map((opt) => {
              const isSelected = selectedDietaryTag === opt.tag;
              return (
                <button
                  key={opt.tag}
                  id={`dietary-filter-${opt.tag}`}
                  onClick={() => onSelectDietaryTag(opt.tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[#283618] text-white border-[#283618] shadow-xs'
                      : 'bg-[#F0ECE4] text-[#6B705C] border-[#E8E5DF] hover:bg-[#E8E5DF] hover:text-[#283618]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Categories Horizontal Scroll Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5">
          {/* 'All' Category Button */}
          <button
            id="category-pill-all"
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border shrink-0 ${
              activeCategoryId === 'all'
                ? 'bg-[#283618] text-white border-[#283618] shadow-sm transform scale-[1.02]'
                : 'bg-white text-[#283618] border-[#E8E5DF] hover:bg-[#FEFAE0] hover:border-[#E9EDC9]'
            }`}
          >
            <Layers className={`w-4 h-4 sm:w-5 sm:h-5 ${activeCategoryId === 'all' ? 'text-white' : 'text-[#BC6C25]'}`} />
            <span>{t.allCategories}</span>
          </button>

          {/* Individual Category Buttons */}
          {categories
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              const isSelected = activeCategoryId === category.id;
              return (
                <button
                  key={category.id}
                  id={`category-pill-${category.slug}`}
                  onClick={() => onSelectCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border shrink-0 ${
                    isSelected
                      ? 'bg-[#283618] text-white border-[#283618] shadow-sm transform scale-[1.02]'
                      : 'bg-white text-[#283618] border-[#E8E5DF] hover:bg-[#FEFAE0] hover:border-[#E9EDC9]'
                  }`}
                >
                  {renderCategoryIcon(category.icon, isSelected)}
                  <span>{category.name[currentLang] || category.name.ar}</span>
                </button>
              );
            })}
        </div>

      </div>
    </div>
  );
};
