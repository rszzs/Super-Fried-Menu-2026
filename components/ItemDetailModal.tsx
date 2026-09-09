'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { MenuItem, ItemSizeOption, ItemAddon, Language, RestaurantSettings, CartItem, ItemReview } from '@/types/menu';
import { translations, formatPrice, isRtl } from '@/lib/i18n';
import { 
  X, 
  Plus, 
  Minus, 
  Check, 
  AlertTriangle, 
  Clock, 
  Flame, 
  Sparkles, 
  Star,
  Info,
  Layers,
  ChefHat,
  MessageSquare,
  Send,
  User,
  ThumbsUp
} from 'lucide-react';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  currentLang: Language;
  settings: RestaurantSettings;
  reviews?: ItemReview[];
  onAddReview?: (review: { rating: number; comment?: string; authorName?: string }) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  currentLang,
  settings,
  reviews = [],
  onAddReview,
}) => {
  const defaultSize = item?.sizes?.find((s) => s.isDefault) || item?.sizes?.[0];
  const [selectedSize, setSelectedSize] = useState<ItemSizeOption | undefined>(defaultSize);
  const [selectedAddons, setSelectedAddons] = useState<ItemAddon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [hasImageError, setHasImageError] = useState(false);

  // Review Form Local States
  const [userRating, setUserRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userComment, setUserComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  const t = translations[currentLang];
  const rtl = isRtl(currentLang);

  // Calculate Average Rating & Counts
  const { averageRating, totalReviews } = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { averageRating: 5.0, totalReviews: 0 };
    }
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      averageRating: sum / reviews.length,
      totalReviews: reviews.length,
    };
  }, [reviews]);

  // Calculate Unit & Total Price
  const unitPrice = useMemo(() => {
    if (!item) return 0;
    let base = item.price;
    if (selectedSize) {
      base += selectedSize.priceDelta;
    }
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return base + addonsTotal;
  }, [item, selectedSize, selectedAddons]);

  const totalPrice = unitPrice * quantity;

  if (!item) return null;

  const toggleAddon = (addon: ItemAddon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleConfirmAddToCart = () => {
    const newCartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItem: item,
      selectedSize,
      selectedAddons,
      quantity,
      specialInstructions: specialInstructions.trim(),
      unitPrice,
      totalPrice,
    };
    onAddToCart(newCartItem);
    onClose();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddReview) return;
    onAddReview({
      rating: userRating,
      comment: userComment.trim() || undefined,
      authorName: userName.trim() || undefined,
    });
    setUserComment('');
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  const itemName = item.name[currentLang] || item.name.ar;
  const itemDesc = item.description[currentLang] || item.description.ar;
  const itemIngr = item.ingredients[currentLang] || item.ingredients.ar;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A2410]/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col border border-[#E8E5DF]">
        
        {/* Close Button Header */}
        <button
          id="close-item-modal-btn"
          onClick={onClose}
          className={`absolute top-4 ${rtl ? 'left-4' : 'right-4'} z-20 w-9 h-9 rounded-full bg-[#1A2410]/60 hover:bg-[#1A2410] text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          
          {/* Hero Food Image */}
          <div className="relative aspect-16/9 w-full bg-[#F0ECE4]">
            <Image
              src={hasImageError ? DEFAULT_FALLBACK_IMAGE : (item.image || DEFAULT_FALLBACK_IMAGE)}
              alt={itemName}
              fill
              priority
              referrerPolicy="no-referrer"
              onError={() => setHasImageError(true)}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1A2410]/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-3 start-4 end-4 flex items-end justify-between">
              <div className="flex flex-wrap gap-1.5">
                {item.dietaryTags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#BC6C25] text-white shadow-xs"
                  >
                    {t.dietary[tag as keyof typeof t.dietary] || tag}
                  </span>
                ))}
              </div>
              {item.calories && (
                <span className="px-2 py-1 rounded-md text-xs font-semibold bg-black/60 text-[#FEFAE0] backdrop-blur-xs">
                  🔥 {item.calories} {t.item.calories}
                </span>
              )}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Title, Average Rating & Price Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-black text-[#283618] leading-snug">
                  {itemName}
                </h2>
                <div className="flex items-center gap-1.5 shrink-0 bg-[#FEFAE0] border border-[#E9EDC9] px-3 py-1 rounded-xl shadow-2xs">
                  <Star className="w-4 h-4 fill-[#BC6C25] text-[#BC6C25]" />
                  <span className="font-bold text-[#283618] text-sm">
                    {totalReviews > 0 ? averageRating.toFixed(1) : '5.0'}
                  </span>
                  <span className="text-xs text-[#6B705C] font-normal">
                    ({totalReviews} {t.reviews.reviewsCount})
                  </span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#6B705C] mt-2 leading-relaxed">
                {itemDesc}
              </p>
            </div>

            {/* Ingredients Section */}
            {itemIngr && (
              <div className="p-3.5 rounded-2xl bg-[#F8F7F3] border border-[#E8E5DF]">
                <h4 className="text-xs font-bold text-[#6B705C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ChefHat className="w-3.5 h-3.5 text-[#BC6C25]" />
                  <span>{t.item.ingredients}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#283618] leading-normal">
                  {itemIngr}
                </p>
              </div>
            )}

            {/* Allergens Notice */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-[#FEFAE0] border border-[#E9EDC9]">
                <h4 className="text-xs font-bold text-[#283618] flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-[#BC6C25]" />
                  <span>{t.allergens.title}</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.allergens.map((alg) => (
                    <span
                      key={alg}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-[#283618] border border-[#E9EDC9] shadow-2xs"
                    >
                      {t.allergens[alg as keyof typeof t.allergens] || alg}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Portion / Size Selector Options */}
            {item.sizes && item.sizes.length > 1 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-[#283618] uppercase tracking-wider block">
                  {t.item.portionSize}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.sizes.map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    const sizeName = size.name[currentLang] || size.name.ar;
                    return (
                      <button
                        key={size.id}
                        id={`size-option-${size.id}`}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-start transition-all ${
                          isSelected
                            ? 'bg-[#FEFAE0] border-[#283618] ring-2 ring-[#283618]/20'
                            : 'bg-white border-[#E8E5DF] hover:bg-[#F8F7F3]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#283618] bg-[#283618]' : 'border-stone-400'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-[#283618]">
                            {sizeName}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#BC6C25]">
                          {size.priceDelta > 0 ? `+${formatPrice(size.priceDelta, settings.currency, currentLang)}` : '—'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons & Extra Options */}
            {item.addons && item.addons.length > 0 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-[#283618] uppercase tracking-wider block">
                  {t.item.extraAddons}
                </label>
                <div className="space-y-1.5">
                  {item.addons.map((addon) => {
                    const isChecked = selectedAddons.some((a) => a.id === addon.id);
                    const addonName = addon.name[currentLang] || addon.name.ar;
                    return (
                      <button
                        key={addon.id}
                        id={`addon-option-${addon.id}`}
                        type="button"
                        onClick={() => toggleAddon(addon)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-start transition-all ${
                          isChecked
                            ? 'bg-[#FEFAE0] border-[#283618] text-[#283618]'
                            : 'bg-white border-[#E8E5DF] hover:bg-[#F8F7F3] text-[#283618]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                              isChecked ? 'border-[#283618] bg-[#283618] text-white' : 'border-stone-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium">{addonName}</span>
                        </div>
                        <span className="text-xs font-bold text-[#BC6C25]">
                          +{formatPrice(addon.price, settings.currency, currentLang)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#283618] uppercase tracking-wider block">
                {t.item.specialNotes}
              </label>
              <input
                id="item-special-instructions-input"
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder={t.item.specialNotesPlaceholder}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#F8F7F3] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#283618] text-[#283618]"
              />
            </div>

            {/* ================= Ratings & Comments Section ================= */}
            <div className="border-t border-[#E8E5DF] pt-6 space-y-5">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FEFAE0] border border-[#E9EDC9] flex items-center justify-center text-[#BC6C25]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#283618]">
                      {t.reviews.title}
                    </h3>
                    <p className="text-xs text-[#6B705C]">
                      {t.reviews.rateThisItem}
                    </p>
                  </div>
                </div>

                <div className="text-end">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= Math.round(averageRating)
                            ? 'fill-[#BC6C25] text-[#BC6C25]'
                            : 'text-[#C5C3BE]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#6B705C] font-semibold">
                    {totalReviews > 0 ? `${averageRating.toFixed(1)} / 5 (${totalReviews})` : `5.0 / 5`}
                  </span>
                </div>
              </div>

              {/* Add Rating & Review Form */}
              <form
                id="add-item-review-form"
                onSubmit={handleReviewSubmit}
                className="p-4 rounded-2xl bg-[#F8F7F3] border border-[#E8E5DF] space-y-3.5"
              >
                <div>
                  <label className="text-xs font-bold text-[#283618] mb-1.5 block">
                    {t.reviews.yourRating}
                  </label>
                  
                  {/* Interactive Star Picker */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isHighlighted = (hoverRating ?? userRating) >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          id={`rate-star-btn-${starVal}`}
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setUserRating(starVal)}
                          className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-hidden"
                          aria-label={`${starVal} ${t.reviews.stars}`}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              isHighlighted
                                ? 'fill-[#BC6C25] text-[#BC6C25]'
                                : 'text-[#C5C3BE]'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-xs font-bold text-[#BC6C25] ms-2">
                      {hoverRating ?? userRating} / 5
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B705C] mb-1 block">
                      {t.reviews.yourName}
                    </label>
                    <div className="relative">
                      <input
                        id="review-author-name-input"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder={t.reviews.namePlaceholder}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8E5DF] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#283618] text-[#283618]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-[#6B705C] mb-1 block">
                      {t.reviews.yourComment}
                    </label>
                    <textarea
                      id="review-comment-textarea"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder={t.reviews.commentPlaceholder}
                      rows={2}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8E5DF] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#283618] text-[#283618] resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {reviewSubmitted ? (
                    <div className="flex items-center gap-1.5 text-xs text-[#283618] font-bold animate-in fade-in">
                      <Check className="w-4 h-4 text-[#283618]" />
                      <span>{t.reviews.thankYou}</span>
                    </div>
                  ) : (
                    <div />
                  )}

                  <button
                    id="submit-item-review-btn"
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#283618] hover:bg-[#1A2410] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-95 ms-auto"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.reviews.submitReview}</span>
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#6B705C] uppercase tracking-wider">
                  {t.reviews.recentReviews} ({reviews.length})
                </h4>

                {reviews.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-[#FEFAE0]/60 border border-[#E9EDC9] text-center text-xs text-[#6B705C]">
                    {t.reviews.noReviewsYet}
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3.5 rounded-2xl bg-white border border-[#E8E5DF] shadow-2xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#E9EDC9] text-[#283618] font-bold text-[11px] flex items-center justify-center">
                              {(rev.authorName || t.reviews.anonymous).charAt(0)}
                            </div>
                            <span className="text-xs font-bold text-[#283618]">
                              {rev.authorName || t.reviews.anonymous}
                            </span>
                          </div>

                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= rev.rating
                                    ? 'fill-[#BC6C25] text-[#BC6C25]'
                                    : 'text-[#E8E5DF]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {rev.comment && (
                          <p className="text-xs text-[#283618] leading-relaxed">
                            {rev.comment}
                          </p>
                        )}

                        <div className="text-[10px] text-[#989B8B]">
                          {new Date(rev.createdAt).toLocaleDateString(currentLang === 'ar' ? 'ar-IQ' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Footer: Quantity Counter & Total Add Button */}
        <div className="p-4 sm:p-5 bg-[#FAF9F6] border-t border-[#E8E5DF] flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Quantity Stepper */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 bg-white p-1 rounded-xl border border-[#E8E5DF]">
            <button
              id="item-qty-minus-btn"
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-lg bg-[#F0ECE4] hover:bg-[#E8E5DF] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-[#283618] font-bold transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-[#283618] text-sm sm:text-base">
              {quantity}
            </span>
            <button
              id="item-qty-plus-btn"
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-lg bg-[#F0ECE4] hover:bg-[#E8E5DF] flex items-center justify-center text-[#283618] font-bold transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            id="confirm-add-to-cart-btn"
            type="button"
            onClick={handleConfirmAddToCart}
            disabled={item.isAvailable === false}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#283618] hover:bg-[#1A2410] text-white font-black text-sm sm:text-base shadow-md shadow-[#1A2410]/20 hover:shadow-lg transition-all flex items-center justify-between active:scale-98 disabled:opacity-50 border border-[#3D5024]"
          >
            <span>{t.item.addToOrder}</span>
            <span className="text-[#FEFAE0]">
              {formatPrice(totalPrice, settings.currency, currentLang)}
            </span>
          </button>

          {/* Explicit Close Button in Footer */}
          <button
            id="close-item-modal-footer-btn"
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-[#F0ECE4] hover:bg-[#E8E5DF] text-[#283618] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
            <span>إغلاق</span>
          </button>

        </div>

      </div>
    </div>
  );
};
