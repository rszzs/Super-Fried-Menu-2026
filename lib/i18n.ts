import { Language } from '@/types/menu';

export interface TranslationDictionary {
  appName: string;
  viewMenu: string;
  exploreCategories: string;
  searchPlaceholder: string;
  allCategories: string;
  allDietary: string;
  dietary: {
    halal: string;
    vegetarian: string;
    vegan: string;
    spicy: string;
    chefSpecial: string;
    bestseller: string;
    glutenFree: string;
  };
  allergens: {
    title: string;
    nuts: string;
    dairy: string;
    gluten: string;
    eggs: string;
    soy: string;
    seafood: string;
    sesame: string;
  };
  item: {
    addToOrder: string;
    ingredients: string;
    allergensNotice: string;
    portionSize: string;
    extraAddons: string;
    specialNotes: string;
    specialNotesPlaceholder: string;
    outOfStock: string;
    available: string;
    calories: string;
    prepTime: string;
    minutes: string;
    currency: string;
    popular: string;
    spicyLevel: string;
  };
  cart: {
    title: string;
    emptyMessage: string;
    tableNumber: string;
    selectOrEnterTable: string;
    subtotal: string;
    total: string;
    placeOrderWhatsapp: string;
    sendToKitchen: string;
    clearCart: string;
    itemsCount: string;
    orderSummary: string;
    whatsappOrderMessage: string;
  };
  quickActions: {
    callWaiter: string;
    callWaiterSuccess: string;
    requestBill: string;
    requestWater: string;
    generalAssistance: string;
    wifiInfo: string;
    wifiConnected: string;
    copyPassword: string;
    passwordCopied: string;
    directionsGoogleMaps: string;
    leaveReview: string;
    restaurantHours: string;
    contactUs: string;
    shareMenu: string;
    shareMenuWhatsapp: string;
    shareMenuText: string;
    copyMenuLink: string;
    menuLinkCopied: string;
  };
  admin: {
    title: string;
    subtitle: string;
    enterPin: string;
    pinPlaceholder: string;
    unlock: string;
    invalidPin: string;
    logout: string;
    dishesTab: string;
    categoriesTab: string;
    settingsTab: string;
    qrGeneratorTab: string;
    ordersTab: string;
    ordersHistoryTitle: string;
    ordersHistorySubtitle: string;
    totalOrdersCount: string;
    totalRevenueAmount: string;
    todayOrders: string;
    activeOrdersCount: string;
    orderIdLabel: string;
    orderTimeLabel: string;
    orderItemsLabel: string;
    orderTotalLabel: string;
    orderTypeLabel: string;
    orderStatusLabel: string;
    statusPending: string;
    statusPreparing: string;
    statusCompleted: string;
    statusCancelled: string;
    noOrdersMessage: string;
    clearOrdersHistory: string;
    confirmClearOrders: string;
    copyOrderText: string;
    orderTextCopied: string;
    whatsappOrderBadge: string;
    kitchenOrderBadge: string;
    filterAllStatus: string;
    exportOrders: string;
    addNewDish: string;
    editDish: string;
    dishName: string;
    dishDescription: string;
    dishIngredients: string;
    price: string;
    category: string;
    imageUrl: string;
    uploadOrSelectImage: string;
    isAvailableToggle: string;
    featuredDish: string;
    tagsAndAllergens: string;
    sizesAndAddons: string;
    saveChanges: string;
    cancel: string;
    deleteDish: string;
    confirmDelete: string;
    aiAutoGenerate: string;
    aiGenerating: string;
    aiSuccess: string;
    manageCategories: string;
    addNewCategory: string;
    restaurantInfo: string;
    whatsappNumber: string;
    phoneNumber: string;
    mapsLink: string;
    currencySettings: string;
    resetToDefaults: string;
    exportBackup: string;
    importBackup: string;
  };
  qr: {
    title: string;
    subtitle: string;
    tableNumberLabel: string;
    batchGeneration: string;
    fromTable: string;
    toTable: string;
    primaryColor: string;
    includeLogo: string;
    previewStand: string;
    printCards: string;
    downloadSvg: string;
    scanPrompt: string;
    dynamicNotice: string;
    standTagline: string;
  };
  reviews: {
    title: string;
    averageRating: string;
    reviewsCount: string;
    rateThisItem: string;
    yourRating: string;
    yourComment: string;
    commentPlaceholder: string;
    yourName: string;
    namePlaceholder: string;
    submitReview: string;
    thankYou: string;
    noReviewsYet: string;
    recentReviews: string;
    stars: string;
    anonymous: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  ar: {
    appName: 'سوبر فرايد',
    viewMenu: 'عرض المنيو',
    exploreCategories: 'تصفح الأصناف',
    searchPlaceholder: 'ابحث عن طبق أو مكون...',
    allCategories: 'الكل',
    allDietary: 'جميع التفضيلات',
    dietary: {
      halal: 'حلال',
      vegetarian: 'نباتي',
      vegan: 'نباتي صرف',
      spicy: 'حار 🔥',
      chefSpecial: 'توصية الشيف ⭐',
      bestseller: 'الأكثر طلباً 🔥',
      glutenFree: 'خالٍ من الغلوتين',
    },
    allergens: {
      title: 'معلومات الحساسية',
      nuts: 'مكسرات',
      dairy: 'مشتقات الحليب',
      gluten: 'غلوتين',
      eggs: 'بيض',
      soy: 'صويا',
      seafood: 'مأكولات بحرية',
      sesame: 'سمسم',
    },
    item: {
      addToOrder: 'إضافة للطلب',
      ingredients: 'المكونات الأساسية',
      allergensNotice: 'تنبيه الحساسية',
      portionSize: 'الحجم / الكمية',
      extraAddons: 'إضافات وخيارات',
      specialNotes: 'ملاحظات خاصة للطلب',
      specialNotesPlaceholder: 'مثال: بدون بصل، زيادة صوص...',
      outOfStock: 'غير متوفر حالياً',
      available: 'متوفر',
      calories: 'سعرة حرارية',
      prepTime: 'وقت التحضير',
      minutes: 'دقيقة',
      currency: 'د.ع',
      popular: 'شائع',
      spicyLevel: 'درجة الحرارة',
    },
    cart: {
      title: 'طلب الطاولة',
      emptyMessage: 'لم تقم بإضافة أي أطباق للطلب بعد.',
      tableNumber: 'رقم الطاولة',
      selectOrEnterTable: 'حدد رقم طاولتك',
      subtotal: 'المجموع الجزئي',
      total: 'المجموع الكلي',
      placeOrderWhatsapp: 'إرسال الطلب عبر واتساب 📲',
      sendToKitchen: 'تأكيد وإرسال إلى الكاشير / الشيف',
      clearCart: 'تفريغ السلة',
      itemsCount: 'أصناف',
      orderSummary: 'ملخص الطلب',
      whatsappOrderMessage: 'مرحباً، أود إرسال طلب جديد للطاولة',
    },
    quickActions: {
      callWaiter: 'طلب الويتر / المضيف',
      callWaiterSuccess: 'تم إشعار طاقم الخدمة لطاولتك!',
      requestBill: 'طلب الفاتورة / الحساب',
      requestWater: 'طلب ماء أو مناديل',
      generalAssistance: 'مساعدة عامة',
      wifiInfo: 'شبكة الواي فاي للزبائن',
      wifiConnected: 'اتصال فوري بالواي فاي',
      copyPassword: 'نسخ كلمة السر',
      passwordCopied: 'تم نسخ كلمة السر بنجاح!',
      directionsGoogleMaps: 'موقعنا على خرائط جوجل',
      leaveReview: 'تقييم المطعم على جوجل',
      restaurantHours: 'ساعات العمل',
      contactUs: 'تواصل معنا',
      shareMenu: 'مشاركة المنيو',
      shareMenuWhatsapp: 'مشاركة المنيو عبر واتساب 📲',
      shareMenuText: '🍗 أهلاً بك! تصفح المنيو الرقمي لمطعم سوبر فرايد (الكاظمية) واستمتع بأشهى وجبات الكنتاكي والبرغر والريزو والمقبلات المقرمشة:',
      copyMenuLink: 'نسخ رابط المنيو',
      menuLinkCopied: 'تم نسخ رابط المنيو بنجاح!',
    },
    admin: {
      title: 'لوحة إدارة المنيو الرقمي',
      subtitle: 'تعديل الأطباق والأسعار والترجمات والـ QR بكل سهولة',
      enterPin: 'أدخل رمز الدخول للإدارة',
      pinPlaceholder: 'الرمز السري (الافتراضي: 554327)',
      unlock: 'تسجيل الدخول',
      invalidPin: 'الرمز السري غير صحيح',
      logout: 'خروج',
      dishesTab: 'الأطباق والوجبات',
      categoriesTab: 'الأقسام',
      settingsTab: 'بيانات المطعم',
      qrGeneratorTab: 'مولّد QR للطاولات',
      ordersTab: 'سجل الطلبات',
      ordersHistoryTitle: 'سجل الطلبات والمبيعات الحية',
      ordersHistorySubtitle: 'متابعة وتتبع تفاصيل وتوقيت وقيمة طلبات الطاولات والواتساب',
      totalOrdersCount: 'إجمالي الطلبات',
      totalRevenueAmount: 'إجمالي المبيعات',
      todayOrders: 'طلبات اليوم',
      activeOrdersCount: 'الطلبات النشطة / قيد التحضير',
      orderIdLabel: 'رقم الطلب',
      orderTimeLabel: 'وقت وتاريخ الطلب',
      orderItemsLabel: 'الأصناف والوجبات',
      orderTotalLabel: 'القيمة الإجمالية',
      orderTypeLabel: 'نوع الطلب',
      orderStatusLabel: 'حالة الطلب',
      statusPending: 'قيد الانتظار',
      statusPreparing: 'جارٍ التحضير',
      statusCompleted: 'مكتمل / تم التقديم',
      statusCancelled: 'ملغي',
      noOrdersMessage: 'لا توجد طلبات مسجلة بعد في السجل.',
      clearOrdersHistory: 'تفريغ سجل الطلبات',
      confirmClearOrders: 'هل أنت متأكد من رغبتك في مسح سجل الطلبات بالكامل؟',
      copyOrderText: 'نسخ تفاصيل الفاتورة',
      orderTextCopied: 'تم نسخ تفاصيل الطلب بنجاح!',
      whatsappOrderBadge: 'طلب واتساب 📲',
      kitchenOrderBadge: 'طلب طاولة مباشر 🍳',
      filterAllStatus: 'جميع الحالات',
      exportOrders: 'تصدير الطلبات (JSON)',
      addNewDish: 'إضافة طبق جديد +',
      editDish: 'تعديل الطبق',
      dishName: 'اسم الطبق (بكل اللغات)',
      dishDescription: 'وصف الطبق (بكل اللغات)',
      dishIngredients: 'المكونات',
      price: 'السعر',
      category: 'القسم',
      imageUrl: 'رابط الصورة',
      uploadOrSelectImage: 'اختر صورة احترافية أو أدخل رابطاً',
      isAvailableToggle: 'حالة التوفر (إيقاف مؤقت للطبق)',
      featuredDish: 'عرض كطبق مميز في الواجهة',
      tagsAndAllergens: 'التفضيلات ومحاذير الحساسية',
      sizesAndAddons: 'خيارات الأحجام والإضافات',
      saveChanges: 'حفظ التعديلات',
      cancel: 'إلغاء',
      deleteDish: 'حذف الطبق',
      confirmDelete: 'هل أنت متأكد من حذف هذا الطبق؟',
      aiAutoGenerate: 'توليد الوصف وترجمته بالذكاء الاصطناعي ✨',
      aiGenerating: 'جارٍ الصياغة والترجمة بالذكاء الاصطناعي...',
      aiSuccess: 'تم توليد وترجمة تفاصيل الطبق بامتياز!',
      manageCategories: 'إدارة الأقسام وترتيبها',
      addNewCategory: 'إضافة قسم جديد +',
      restaurantInfo: 'معلومات المطعم والتواصل',
      whatsappNumber: 'رقم الواتساب للطلبات',
      phoneNumber: 'رقم الهاتف المباشر',
      mapsLink: 'رابط موقع جوجل ماب',
      currencySettings: 'العملة والرمز',
      resetToDefaults: 'استعادة المنيو النموذجي الافتراضي',
      exportBackup: 'تصدير نسخة احتياطية (JSON)',
      importBackup: 'استيراد نسخة احتياطية',
    },
    qr: {
      title: 'نظام الـ QR Code الديناميكي للطاولات',
      subtitle: 'اطبع بطاقات طاولات أنيقة؛ الرابط ديناميكي ولن تحتاج لإعادة الطباعة عند تعديل المنيو!',
      tableNumberLabel: 'رقم الطاولة المخصصة',
      batchGeneration: 'طباعة مجموعة طاولات دفعة واحدة',
      fromTable: 'من طاولة',
      toTable: 'إلى طاولة',
      primaryColor: 'لون الـ QR والثيم',
      includeLogo: 'إدراج شعار المطعم وسط الـ QR',
      previewStand: 'معاينة بطاقة الطاولة الأنيقة',
      printCards: 'طباعة البطاقات للطاولات (Print / PDF) 🖨️',
      downloadSvg: 'تحميل كصورة',
      scanPrompt: 'امسح الرمز لتصفح المنيو والطلب مباشرة من طاولتك',
      dynamicNotice: '⭐ رابط ديناميكي: التعديلات في لوحة الإدارة تظهر فوراً للزبائن دون تغيير الباركود.',
      standTagline: 'أهلاً بكم في سوبر فرايد (الكاظمية - باب المراد) — استمتعوا بأشهى وجبات الكنتاكي والبرغر والريزو',
    },
    reviews: {
      title: 'التقييمات والآراء',
      averageRating: 'متوسط التقييم',
      reviewsCount: 'تقييم',
      rateThisItem: 'أضف تقييمك وتجربتك للطبق',
      yourRating: 'تقييمك للطبق',
      yourComment: 'اكتب رأيك أو ملاحظتك عن الوجبة (اختياري)',
      commentPlaceholder: 'مثال: القرمشة ممتازة والنكهة مضبوطة والوجبة ساخنة ولذيذة...',
      yourName: 'اسمك (اختياري)',
      namePlaceholder: 'مثال: أحمد، علي...',
      submitReview: 'نشر التقييم',
      thankYou: 'شكراً لمشاركتنا رأيك وتقييمك!',
      noReviewsYet: 'لا توجد تقييمات بعد، شاركنا رأيك وكن أول من يقيّم هذا الطبق!',
      recentReviews: 'آراء الزبائن',
      stars: 'نجوم',
      anonymous: 'زبون سوبر فرايد',
    },
  },

  en: {
    appName: 'Super Fried',
    viewMenu: 'Explore Menu',
    exploreCategories: 'Browse Categories',
    searchPlaceholder: 'Search dishes, ingredients...',
    allCategories: 'All',
    allDietary: 'All Preferences',
    dietary: {
      halal: 'Halal',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      spicy: 'Spicy 🔥',
      chefSpecial: "Chef's Special ⭐",
      bestseller: 'Bestseller 🔥',
      glutenFree: 'Gluten-Free',
    },
    allergens: {
      title: 'Allergen Information',
      nuts: 'Nuts',
      dairy: 'Dairy',
      gluten: 'Gluten',
      eggs: 'Eggs',
      soy: 'Soy',
      seafood: 'Seafood',
      sesame: 'Sesame',
    },
    item: {
      addToOrder: 'Add to Order',
      ingredients: 'Ingredients',
      allergensNotice: 'Allergen Advisory',
      portionSize: 'Portion / Size',
      extraAddons: 'Add-ons & Options',
      specialNotes: 'Special Instructions',
      specialNotesPlaceholder: 'e.g. No onions, extra dressing...',
      outOfStock: 'Temporarily Unavailable',
      available: 'Available',
      calories: 'Calories',
      prepTime: 'Prep Time',
      minutes: 'mins',
      currency: '$',
      popular: 'Popular',
      spicyLevel: 'Spiciness',
    },
    cart: {
      title: 'Your Table Order',
      emptyMessage: 'No items in your order yet.',
      tableNumber: 'Table Number',
      selectOrEnterTable: 'Select or enter your table #',
      subtotal: 'Subtotal',
      total: 'Total',
      placeOrderWhatsapp: 'Send Order via WhatsApp 📲',
      sendToKitchen: 'Confirm & Send to Cashier / Kitchen',
      clearCart: 'Clear Order',
      itemsCount: 'items',
      orderSummary: 'Order Summary',
      whatsappOrderMessage: 'Hello, I would like to place an order for table',
    },
    quickActions: {
      callWaiter: 'Call Waiter',
      callWaiterSuccess: 'Service staff has been notified for your table!',
      requestBill: 'Request the Bill',
      requestWater: 'Request Water / Napkins',
      generalAssistance: 'General Assistance',
      wifiInfo: 'Guest Wi-Fi',
      wifiConnected: 'Instant Wi-Fi Connection',
      copyPassword: 'Copy Password',
      passwordCopied: 'Password copied to clipboard!',
      directionsGoogleMaps: 'Find Us on Google Maps',
      leaveReview: 'Leave a Review on Google',
      restaurantHours: 'Opening Hours',
      contactUs: 'Contact Us',
      shareMenu: 'Share Menu',
      shareMenuWhatsapp: 'Share Menu via WhatsApp 📲',
      shareMenuText: '🍗 Welcome! Check out the digital menu for Super Fried (Kadhimiya) - Crispy fried chicken, burgers, rizo bowls and more:',
      copyMenuLink: 'Copy Menu Link',
      menuLinkCopied: 'Menu link copied to clipboard!',
    },
    admin: {
      title: 'Digital Menu Management Dashboard',
      subtitle: 'Manage dishes, prices, translations, and dynamic QR codes seamlessly',
      enterPin: 'Enter Admin Passcode',
      pinPlaceholder: 'Passcode (Default: 1234)',
      unlock: 'Unlock Dashboard',
      invalidPin: 'Incorrect Passcode',
      logout: 'Exit Admin',
      dishesTab: 'Dishes & Items',
      categoriesTab: 'Categories',
      settingsTab: 'Restaurant Info',
      qrGeneratorTab: 'Dynamic QR Stand Studio',
      ordersTab: 'Order History',
      ordersHistoryTitle: 'Live Order History & Sales',
      ordersHistorySubtitle: 'Track and manage timestamped table and WhatsApp customer orders',
      totalOrdersCount: 'Total Orders',
      totalRevenueAmount: 'Total Revenue',
      todayOrders: "Today's Orders",
      activeOrdersCount: 'Active / In-Kitchen',
      orderIdLabel: 'Order ID',
      orderTimeLabel: 'Date & Time',
      orderItemsLabel: 'Dishes & Items',
      orderTotalLabel: 'Total Price',
      orderTypeLabel: 'Order Channel',
      orderStatusLabel: 'Status',
      statusPending: 'Pending',
      statusPreparing: 'Preparing',
      statusCompleted: 'Completed / Served',
      statusCancelled: 'Cancelled',
      noOrdersMessage: 'No orders recorded in history yet.',
      clearOrdersHistory: 'Clear Order History',
      confirmClearOrders: 'Are you sure you want to clear all order history records?',
      copyOrderText: 'Copy Summary',
      orderTextCopied: 'Order details copied to clipboard!',
      whatsappOrderBadge: 'WhatsApp Order 📲',
      kitchenOrderBadge: 'Direct Table 🍳',
      filterAllStatus: 'All Statuses',
      exportOrders: 'Export Orders (JSON)',
      addNewDish: 'Add New Dish +',
      editDish: 'Edit Dish',
      dishName: 'Dish Name (Multilingual)',
      dishDescription: 'Dish Description (Multilingual)',
      dishIngredients: 'Ingredients',
      price: 'Price',
      category: 'Category',
      imageUrl: 'Image URL',
      uploadOrSelectImage: 'Pick high-res food photo or paste URL',
      isAvailableToggle: 'Stock Availability (Pause temporarily)',
      featuredDish: 'Feature on Top / Homepage',
      tagsAndAllergens: 'Dietary Tags & Allergens',
      sizesAndAddons: 'Sizes & Add-ons Options',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      deleteDish: 'Delete Dish',
      confirmDelete: 'Are you sure you want to delete this dish?',
      aiAutoGenerate: 'Auto-Generate & Translate with Gemini AI ✨',
      aiGenerating: 'Crafting tempting description & 4-language translations...',
      aiSuccess: 'Dish description & translations generated!',
      manageCategories: 'Manage & Reorder Categories',
      addNewCategory: 'Add Category +',
      restaurantInfo: 'Restaurant & Contact Details',
      whatsappNumber: 'WhatsApp Orders Number',
      phoneNumber: 'Direct Phone',
      mapsLink: 'Google Maps Place Link',
      currencySettings: 'Currency & Symbol',
      resetToDefaults: 'Reset to Sample Menu',
      exportBackup: 'Export Backup JSON',
      importBackup: 'Import Backup JSON',
    },
    qr: {
      title: 'Dynamic Table QR Code Studio',
      subtitle: 'Generate & print luxury table tent stands. Change menu anytime without re-printing QR codes!',
      tableNumberLabel: 'Specific Table #',
      batchGeneration: 'Batch Table Generation',
      fromTable: 'From Table',
      toTable: 'To Table',
      primaryColor: 'QR Color Accent',
      includeLogo: 'Include Restaurant Logo in Center',
      previewStand: 'Table Stand Preview',
      printCards: 'Print Table Stands (PDF / Print) 🖨️',
      downloadSvg: 'Download PNG / SVG',
      scanPrompt: 'Scan with camera to view live menu & order from your table',
      dynamicNotice: '⭐ 100% Dynamic Link: Future menu edits reflect instantly without changing physical QR codes.',
      standTagline: 'Welcome to Super Fried (Kadhimiya) — Crispy Chicken, Burgers & Rizo',
    },
    reviews: {
      title: 'Ratings & Reviews',
      averageRating: 'Average Rating',
      reviewsCount: 'reviews',
      rateThisItem: 'Rate & Review this dish',
      yourRating: 'Your Rating',
      yourComment: 'Your feedback / comment (optional)',
      commentPlaceholder: 'e.g. Crispy texture, perfectly seasoned, served hot and fast!',
      yourName: 'Your Name (optional)',
      namePlaceholder: 'e.g. Alex, Sarah...',
      submitReview: 'Submit Review',
      thankYou: 'Thank you for your rating & feedback!',
      noReviewsYet: 'No reviews yet. Be the first to rate this delicious dish!',
      recentReviews: 'Customer Reviews',
      stars: 'stars',
      anonymous: 'Super Fried Guest',
    },
  },

  ku: {
    appName: 'سوپەر فراید',
    viewMenu: 'بینینی مینیۆ',
    exploreCategories: 'بەشەکانی خواردن',
    searchPlaceholder: 'گەڕان بۆ خواردن یان پێکهاتەکان...',
    allCategories: 'هەمووی',
    allDietary: 'هەموو جۆرەکان',
    dietary: {
      halal: 'حەڵاڵ',
      vegetarian: 'ڕووەکی',
      vegan: 'ڤیگن',
      spicy: 'توون 🔥',
      chefSpecial: 'پێشنیاری شێف ⭐',
      bestseller: 'پڕ داواکراو 🔥',
      glutenFree: 'بێ گلوتین',
    },
    allergens: {
      title: 'زانیاری هەستیاری (حەساسیەت)',
      nuts: 'چەرەزات',
      dairy: 'شیرەمەنی',
      gluten: 'گلوتین',
      eggs: 'هێلکە',
      soy: 'سۆیا',
      seafood: 'خواردنی دەریایی',
      sesame: 'کونجی',
    },
    item: {
      addToOrder: 'زیادکردن بۆ داواکاری',
      ingredients: 'پێکهاتە سەرەکییەکان',
      allergensNotice: 'ئاگاداری هەستیاری',
      portionSize: 'قەبارە / بەش',
      extraAddons: 'زیادکراوەکان',
      specialNotes: 'تێبینی تایبەت',
      specialNotesPlaceholder: 'نموونە: بێ پیاز، سۆسی زیاتر...',
      outOfStock: 'لە ئێستادا بەردەست نییە',
      available: 'بەردەستە',
      calories: 'کالۆری',
      prepTime: 'کاتی ئامادەکردن',
      minutes: 'خولەک',
      currency: 'د.ع',
      popular: 'باو',
      spicyLevel: 'ئاستی توونی',
    },
    cart: {
      title: 'داواکاری مێز',
      emptyMessage: 'هێشتا هیچ خواردنێکت زیاد نەکردووە.',
      tableNumber: 'ژمارەی مێز',
      selectOrEnterTable: 'ژمارەی مێزەکەت دیاریبکە',
      subtotal: 'کۆی بەشەکی',
      total: 'کۆی گشتی',
      placeOrderWhatsapp: 'ناردنی داواکاری لە واتسئەپ 📲',
      sendToKitchen: 'ناردن بۆ چێشتخانە / کاشێر',
      clearCart: 'سڕینەوەی داواکاری',
      itemsCount: 'دانە',
      orderSummary: 'پوختەی داواکاری',
      whatsappOrderMessage: 'سڵاو، دەمەوێت داواکاری بۆ ئەم مێزە بنێرم',
    },
    quickActions: {
      callWaiter: 'بانگکردنی گارسۆن',
      callWaiterSuccess: 'گارسۆن ئاگادارکرایەوە بۆ مێزەکەت!',
      requestBill: 'داواکردنی پسوولە / حیساب',
      requestWater: 'داواکردنی ئاو یان کلینێکس',
      generalAssistance: 'یارمەتی گشتی',
      wifiInfo: 'وای فای میوانان',
      wifiConnected: 'پەیوەستبوون بە وای فای',
      copyPassword: 'کۆپیکردنی وشەی نهێنی',
      passwordCopied: 'وشەی نهێنی کۆپیکرا!',
      directionsGoogleMaps: 'شوێنەکەمان لە گووگڵ ماپ',
      leaveReview: 'هەڵسەنگاندن لە گووگڵ',
      restaurantHours: 'کاتی کارکردن',
      contactUs: 'پەیوەندیمان پێوەبکەن',
      shareMenu: 'هاوبەشکردنی مینیۆ',
      shareMenuWhatsapp: 'هاوبەشکردنی مینیۆ لە واتسئەپ 📲',
      shareMenuText: '🍗 سڵاو! مینیۆی دیجیتاڵی سوپەر فراید (کازمێیە) ببینە بۆ بەتامترین مریشکی کریسپی، بەرگەر، ساندویچ و ڕیزۆ:',
      copyMenuLink: 'کۆپیکردنی لینکی مینیۆ',
      menuLinkCopied: 'لینکی مینیۆ کۆپیکرا!',
    },
    admin: {
      title: 'بەڕێوەبردنی مینیۆی دیجیتاڵی',
      subtitle: 'دەستکاری خواردنەکان، نرخەکان، وەرگێڕان و کودی QR بە ئاسانی',
      enterPin: 'کۆدی چوونەژوورەوە بنووسە',
      pinPlaceholder: 'کۆدی نهێنی (بنەڕەتی: 1234)',
      unlock: 'چوونەژوورەوە',
      invalidPin: 'کۆدی نهێنی هەڵەیە',
      logout: 'دەرچوون',
      dishesTab: 'خواردن و خواردنەوەکان',
      categoriesTab: 'بەشەکان',
      settingsTab: 'زانیاری چێشتخانە',
      qrGeneratorTab: 'دروستکردنی QR بۆ مێزەکان',
      ordersTab: 'مێژووی داواکارییەکان',
      ordersHistoryTitle: 'سجلی داواکارییەکان و فرۆش',
      ordersHistorySubtitle: 'بەدواداچوون بۆ داواکارییەکانی مێز و واتسئەپ بە کات و بڕی پارە',
      totalOrdersCount: 'کۆی داواکارییەکان',
      totalRevenueAmount: 'کۆی داهات',
      todayOrders: 'داواکارییەکانی ئەمڕۆ',
      activeOrdersCount: 'داواکارییە چالاکەکان',
      orderIdLabel: 'ژمارەی داواکاری',
      orderTimeLabel: 'کات و بەروار',
      orderItemsLabel: 'خواردنەکان',
      orderTotalLabel: 'کۆی گشتی نرخ',
      orderTypeLabel: 'جۆری داواکاری',
      orderStatusLabel: 'دۆخی داواکاری',
      statusPending: 'لە چاوەڕوانیدا',
      statusPreparing: 'ئامادە دەکرێت',
      statusCompleted: 'تەواوکراو',
      statusCancelled: 'هەڵوەشاوەتەوە',
      noOrdersMessage: 'هیچ داواکارییەک تۆمار نەکراوە.',
      clearOrdersHistory: 'پاککردنەوەی سجلی داواکارییەکان',
      confirmClearOrders: 'ئایا دڵنیایت لە سڕینەوەی هەموو مێژووی داواکارییەکان؟',
      copyOrderText: 'کۆپیکردنی داواکاری',
      orderTextCopied: 'زانیاری داواکاری کۆپیکرا!',
      whatsappOrderBadge: 'داواکاری واتسئەپ 📲',
      kitchenOrderBadge: 'داواکاری ڕاستەوخۆ 🍳',
      filterAllStatus: 'هەموو دۆخەکان',
      exportOrders: 'داگرتنی داواکارییەکان (JSON)',
      addNewDish: 'زیادکردنی خواردنی نوێ +',
      editDish: 'دەستکاریکردنی خواردن',
      dishName: 'ناوی خواردن (بە ٤ زمان)',
      dishDescription: 'وەسفی خواردن (بە ٤ زمان)',
      dishIngredients: 'پێکهاتەکان',
      price: 'نرخ',
      category: 'بەش',
      imageUrl: 'لینکی وێنە',
      uploadOrSelectImage: 'وێنەیەک هەڵبژێرە یان لینک دابنێ',
      isAvailableToggle: 'بەردەستبوون (ڕاگرتنی کاتی)',
      featuredDish: 'خواردنی تایبەتی سەرەکی',
      tagsAndAllergens: 'تایبەتمەندی و هەستیارییەکان',
      sizesAndAddons: 'قەبارە و زیادکراوەکان',
      saveChanges: 'پاشەکەوتکردنی گۆڕانکارییەکان',
      cancel: 'پاشگەزبوونەوە',
      deleteDish: 'سڕینەوەی خواردن',
      confirmDelete: 'ئایا دڵنیایت لە سڕینەوەی ئەم خواردنە؟',
      aiAutoGenerate: 'دروستکردن و وەرگێڕان بە ژیری دەستکرد ✨',
      aiGenerating: 'ئامادەکردنی وەسف و وەرگێڕان...',
      aiSuccess: 'بە سەرکەوتوویی دروستکرا و وەرگێڕدرا!',
      manageCategories: 'ڕێکخستنی بەشەکان',
      addNewCategory: 'زیادکردنی بەشی نوێ +',
      restaurantInfo: 'زانیاری پەیوەندی چێشتخانە',
      whatsappNumber: 'ژمارەی واتسئەپ بۆ داواکاری',
      phoneNumber: 'ژمارەی مۆبایل',
      mapsLink: 'لینکی گووگڵ ماپ',
      currencySettings: 'دراو و هێما',
      resetToDefaults: 'گەڕاندنەوە بۆ مینیۆی سەرەتایی',
      exportBackup: 'داگرتنی کۆپی پارێزراو (JSON)',
      importBackup: 'هێنانی فایلی پارێزراو',
    },
    qr: {
      title: 'دروستکەری کودی QR ی دینامیکی مێزەکان',
      subtitle: 'کارتی مێزەکان چاپ بکە؛ دەتوانیت هەر کات مینیۆ بگۆڕیت بێ چاپکردنەوەی بارکۆد!',
      tableNumberLabel: 'ژمارەی مێز',
      batchGeneration: 'چاپکردنی کۆمەڵە مێز پێکەوە',
      fromTable: 'لە مێزی',
      toTable: 'بۆ مێزی',
      primaryColor: 'ڕەنگی کۆد',
      includeLogo: 'دانانی لۆگۆ لە ناوەڕاست',
      previewStand: 'پێشبینینی کارتی مێز',
      printCards: 'چاپکردنی کارتەکان 🖨️',
      downloadSvg: 'داگرتنی وێنە',
      scanPrompt: 'کۆدەکە سکان بکە بۆ بینینی مینیۆ و داواکردنی ڕاستەوخۆ',
      dynamicNotice: '⭐ لینکی دینامیکی: هەر گۆڕانکارییەک دەستبەجێ نیشاندەدرێت.',
      standTagline: 'بەخێربێن بۆ سوپەر فراید (کازمێیە) — مریشکی کریسپی، بەرگەر و ڕیزۆ',
    },
    reviews: {
      title: 'هەڵسەنگاندن و بۆچوونەکان',
      averageRating: 'تێکڕای هەڵسەنگاندن',
      reviewsCount: 'هەڵسەنگاندن',
      rateThisItem: 'هەڵسەنگاندنی خۆت بۆ ئەم خواردنە دابنێ',
      yourRating: 'هەڵسەنگاندنی تۆ',
      yourComment: 'ڕای خۆت بنووسە (ئارەزوومەندانە)',
      commentPlaceholder: 'نموونە: کریسپی و بەتام بوو، گەرم و زوو گەیشت...',
      yourName: 'ناوت (ئارەزوومەندانە)',
      namePlaceholder: 'نموونە: ئارام، دیاری...',
      submitReview: 'ناردنی هەڵسەنگاندن',
      thankYou: 'سوپاس بۆ بەشداریکردنت لە هەڵسەنگاندن!',
      noReviewsYet: 'هێشتا هیچ هەڵسەنگاندنێک نییە، یەکەم کەس بە کە هەڵسەنگاندن دەکات!',
      recentReviews: 'بۆچوونی کڕیاران',
      stars: 'ئەستێرە',
      anonymous: 'میوانی سوپەر فراید',
    },
  },

  tr: {
    appName: 'Super Fried',
    viewMenu: 'Menüyü İncele',
    exploreCategories: 'Kategorilere Göz At',
    searchPlaceholder: 'Yemek veya malzeme ara...',
    allCategories: 'Tümü',
    allDietary: 'Tüm Tercihler',
    dietary: {
      halal: 'Helal',
      vegetarian: 'Vejetaryen',
      vegan: 'Vegan',
      spicy: 'Acılı 🔥',
      chefSpecial: 'Şefin Özel Tavsiyesi ⭐',
      bestseller: 'En Çok Satan 🔥',
      glutenFree: 'Glutensiz',
    },
    allergens: {
      title: 'Alerjen Bilgisi',
      nuts: 'Kuruyemiş',
      dairy: 'Süt Ürünleri',
      gluten: 'Gluten',
      eggs: 'Yumurta',
      soy: 'Soya',
      seafood: 'Deniz Ürünleri',
      sesame: 'Susam',
    },
    item: {
      addToOrder: 'Siparişe Ekle',
      ingredients: 'İçindekiler',
      allergensNotice: 'Alerjen Uyarısı',
      portionSize: 'Porsiyon / Boyut',
      extraAddons: 'Ekstra & Seçenekler',
      specialNotes: 'Özel Notlar',
      specialNotesPlaceholder: 'Örn: Soğansız olsun, ekstra sos...',
      outOfStock: 'Geçici Olarak Tükendi',
      available: 'Mevcut',
      calories: 'Kalori',
      prepTime: 'Hazırlık Süresi',
      minutes: 'dk',
      currency: '₺',
      popular: 'Popüler',
      spicyLevel: 'Acılık Derecesi',
    },
    cart: {
      title: 'Masa Siparişiniz',
      emptyMessage: 'Henüz siparişinize ürün eklemediniz.',
      tableNumber: 'Masa Numarası',
      selectOrEnterTable: 'Masa numaranızı seçin veya girin',
      subtotal: 'Ara Toplam',
      total: 'Genel Toplam',
      placeOrderWhatsapp: 'WhatsApp ile Siparişi Gönder 📲',
      sendToKitchen: 'Onayla ve Mutfağa Gönder',
      clearCart: 'Sepeti Temizle',
      itemsCount: 'çeşit',
      orderSummary: 'Sipariş Özeti',
      whatsappOrderMessage: 'Merhaba, şu masa için yeni bir sipariş vermek istiyorum:',
    },
    quickActions: {
      callWaiter: 'Garson Çağır',
      callWaiterSuccess: 'Masanız için servis personeli bilgilendirildi!',
      requestBill: 'Hesap İste',
      requestWater: 'Su / Peçete İste',
      generalAssistance: 'Genel Yardım',
      wifiInfo: 'Misafir Wi-Fi',
      wifiConnected: 'Hızlı Wi-Fi Bağlantısı',
      copyPassword: 'Şifreyi Kopyala',
      passwordCopied: 'Şifre panoya kopyalandı!',
      directionsGoogleMaps: "Google Haritalar'da Bizi Bulun",
      leaveReview: "Google'da Değerlendirin",
      restaurantHours: 'Çalışma Saatleri',
      contactUs: 'Bize Ulaşın',
      shareMenu: 'Menüyü Paylaş',
      shareMenuWhatsapp: "WhatsApp'ta Menüyü Paylaş 📲",
      shareMenuText: "🍗 Merhaba! Super Fried (Kazımiye) dijital menüsünü inceleyin; çıtır tavuk, gurme burgerler, rizo çeşitleri ve taze lezzetler:",
      copyMenuLink: 'Menü Linkini Kopyala',
      menuLinkCopied: 'Menü bağlantısı kopyalandı!',
    },
    admin: {
      title: 'Dijital Menü Yönetim Paneli',
      subtitle: 'Yemekleri, fiyatları, çevirileri ve dinamik QR kodlarını kolayca yönetin',
      enterPin: 'Yönetici Şifresini Girin',
      pinPlaceholder: 'PIN Kodu (Varsayılan: 1234)',
      unlock: 'Giriş Yap',
      invalidPin: 'Hatalı Şifre',
      logout: 'Çıkış Yap',
      dishesTab: 'Yemekler ve Ürünler',
      categoriesTab: 'Kategoriler',
      settingsTab: 'Restoran Bilgileri',
      qrGeneratorTab: 'Dinamik Masa QR Stüdyosu',
      ordersTab: 'Sipariş Geçmişi',
      ordersHistoryTitle: 'Canlı Sipariş Geçmişi & Satışlar',
      ordersHistorySubtitle: 'Masa ve WhatsApp siparişlerini zaman, içerik ve tutar ile takip edin',
      totalOrdersCount: 'Toplam Sipariş',
      totalRevenueAmount: 'Toplam Gelir',
      todayOrders: 'Bugünkü Siparişler',
      activeOrdersCount: 'Aktif / Hazırlanan',
      orderIdLabel: 'Sipariş No',
      orderTimeLabel: 'Tarih & Saat',
      orderItemsLabel: 'Yemekler & Ürünler',
      orderTotalLabel: 'Toplam Tutar',
      orderTypeLabel: 'Sipariş Kanalı',
      orderStatusLabel: 'Durum',
      statusPending: 'Bekliyor',
      statusPreparing: 'Hazırlanıyor',
      statusCompleted: 'Tamamlandı / Sunuldu',
      statusCancelled: 'İptal Edildi',
      noOrdersMessage: 'Henüz kayıtlı bir sipariş bulunmuyor.',
      clearOrdersHistory: 'Sipariş Geçmişini Temizle',
      confirmClearOrders: 'Tüm sipariş geçmişini silmek istediğinizden emin misiniz?',
      copyOrderText: 'Siparişi Kopyala',
      orderTextCopied: 'Sipariş bilgisi panoya kopyalandı!',
      whatsappOrderBadge: 'WhatsApp Siparişi 📲',
      kitchenOrderBadge: 'Doğrudan Masa 🍳',
      filterAllStatus: 'Tüm Durumlar',
      exportOrders: 'Siparişleri İndir (JSON)',
      addNewDish: 'Yeni Yemek Ekle +',
      editDish: 'Yemeği Düzenle',
      dishName: 'Yemek Adı (4 Dilde)',
      dishDescription: 'Yemek Açıklaması (4 Dilde)',
      dishIngredients: 'Malzemeler',
      price: 'Fiyat',
      category: 'Kategori',
      imageUrl: 'Görsel Bağlantısı (URL)',
      uploadOrSelectImage: 'Yüksek kaliteli yemek fotoğrafı seçin veya link girin',
      isAvailableToggle: 'Stok Durumu (Yemeği geçici olarak durdur)',
      featuredDish: 'Öne Çıkan Ürün',
      tagsAndAllergens: 'Beslenme Etiketleri ve Alerjenler',
      sizesAndAddons: 'Porsiyon Boyutları ve Ekstralar',
      saveChanges: 'Değişiklikleri Kaydet',
      cancel: 'İptal',
      deleteDish: 'Yemeği Sil',
      confirmDelete: 'Bu yemeği silmek istediğinizden emin misiniz?',
      aiAutoGenerate: 'Yapay Zeka ile Açıklama ve Çeviri Oluştur ✨',
      aiGenerating: 'Yapay zeka ile 4 dilde lezzetli açıklamalar hazırlanıyor...',
      aiSuccess: 'Yemek açıklamaları ve çevirileri başarıyla oluşturuldu!',
      manageCategories: 'Kategorileri Düzenle',
      addNewCategory: 'Yeni Kategori Ekle +',
      restaurantInfo: 'Restoran ve İletişim Bilgileri',
      whatsappNumber: 'WhatsApp Sipariş Numarası',
      phoneNumber: 'Telefon Numarası',
      mapsLink: 'Google Haritalar Bağlantısı',
      currencySettings: 'Para Birimi ve Sembol',
      resetToDefaults: 'Örnek Menüye Sıfırla',
      exportBackup: 'Yedeği İndir (JSON)',
      importBackup: 'Yedek Yükle (JSON)',
    },
    qr: {
      title: 'Dinamik Masa QR Kod Stüdyosu',
      subtitle: 'Şık masa kartları basın; menüyü değiştirdiğinizde QR kodları yeniden basmanıza gerek kalmaz!',
      tableNumberLabel: 'Özel Masa No',
      batchGeneration: 'Toplu Masa Basımı',
      fromTable: 'Şu Masadan',
      toTable: 'Şu Masaya',
      primaryColor: 'QR Renk Teması',
      includeLogo: 'Merkeze Restoran Logosunu Ekle',
      previewStand: 'Masa Standı Önizleme',
      printCards: 'Masa Kartlarını Yazdır (Print / PDF) 🖨️',
      downloadSvg: 'Görsel Olarak İndir',
      scanPrompt: 'Menüyü incelemek ve masanızdan sipariş vermek için kameranızla tarayın',
      dynamicNotice: '⭐ %100 Dinamik Link: Menü güncellemeleri fiziksel QR kodunu değiştirmeden anında yansır.',
      standTagline: "Super Fried'a Hoş Geldiniz (Kazımiye) — Çıtır Tavuk, Burger ve Rizo",
    },
    reviews: {
      title: 'Değerlendirmeler & Yorumlar',
      averageRating: 'Ortalama Puan',
      reviewsCount: 'değerlendirme',
      rateThisItem: 'Bu lezzeti puanlayın ve yorum yapın',
      yourRating: 'Puanınız',
      yourComment: 'Yorumunuz veya deneyiminiz (isteğe bağlı)',
      commentPlaceholder: 'Örn: Çıtır çıtır, lezzetli soslar ve sıcacık servis...',
      yourName: 'Adınız (isteğe bağlı)',
      namePlaceholder: 'Örn: Mehmet, Can...',
      submitReview: 'Değerlendirmeyi Gönder',
      thankYou: 'Geri bildiriminiz ve puanınız için teşekkür ederiz!',
      noReviewsYet: 'Henüz değerlendirme yok. İlk yorumu siz yapın!',
      recentReviews: 'Müşteri Yorumları',
      stars: 'yıldız',
      anonymous: 'Super Fried Misafiri',
    },
  },
  fa: {
    appName: 'سوپر فراید',
    viewMenu: 'مشاهده منو',
    exploreCategories: 'دسته‌بندی‌های منو',
    searchPlaceholder: 'جستجوی سوخاری، برگر، ساندویچ، ریزو، نوشیدنی...',
    allCategories: 'همه بخش‌ها',
    allDietary: 'همه ویژگی‌ها',
    dietary: {
      halal: 'حلال ۱۰۰٪',
      vegetarian: 'گیاهی',
      vegan: 'وگان',
      spicy: 'تند و اسپایسی 🔥',
      chefSpecial: 'پیشنهاد سرآشپز ⭐',
      bestseller: 'پرفروش‌ترین 🔥',
      glutenFree: 'بدون گلوتن',
    },
    allergens: {
      title: 'مواد حساسیت‌زا',
      nuts: 'آجیل و مغزها',
      dairy: 'لبنیات و پنیر',
      gluten: 'گلوتن و گندم',
      eggs: 'تخم‌مرغ',
      soy: 'سویا',
      seafood: 'غذاهای دریایی',
      sesame: 'کنجد',
    },
    item: {
      addToOrder: 'افزودن به سفارش',
      ingredients: 'محتویات و مواد تشکیل‌دهنده',
      allergensNotice: 'هشدار مواد حساسیت‌زا',
      portionSize: 'انتخاب اندازه و حجم',
      extraAddons: 'افزودنی‌ها و سس‌های دلخواه',
      specialNotes: 'یادداشت یا سفارشی‌سازی خاص',
      specialNotesPlaceholder: 'مثال: بدون پیاز، سس سیر اضافه، تندتر...',
      outOfStock: 'ناموجود موقت',
      available: 'موجود و آماده پخت',
      calories: 'کالری',
      prepTime: 'زمان آماده‌سازی',
      minutes: 'دقیقه',
      currency: 'د.ع',
      popular: 'محبوب‌ترین',
      spicyLevel: 'درجه تندی',
    },
    cart: {
      title: 'سفارش میز شما',
      emptyMessage: 'سبد سفارش شما در حال حاضر خالی است. از میان غذاهای لذیذ انتخاب کنید!',
      tableNumber: 'شماره میز',
      selectOrEnterTable: 'شماره میز را وارد کنید',
      subtotal: 'جمع جزء',
      total: 'مبلغ نهایی قابل پرداخت',
      placeOrderWhatsapp: 'ارسال فوری سفارش به واتس‌اپ 🚀',
      sendToKitchen: 'ثبت و ارسال به آشپزخانه',
      clearCart: 'پاک کردن سبد',
      itemsCount: 'تعداد اقلام',
      orderSummary: 'خلاصه سفارش میز',
      whatsappOrderMessage: 'سلام، مایل به ثبت سفارش جدید برای میز هستم:',
    },
    quickActions: {
      callWaiter: 'درخواست گارسون',
      callWaiterSuccess: 'درخواست شما با موفقیت برای کارکنان سالن ارسال شد! هم‌اکنون در خدمت شما هستیم.',
      requestBill: 'درخواست صورت‌حساب 💳',
      requestWater: 'درخواست آب معدنی / دستمال 🥤',
      generalAssistance: 'راهنمایی و خدمات عمومی',
      wifiInfo: 'اطلاعات وای‌فای میز',
      wifiConnected: 'وای‌فای رستوران سوپر فراید',
      copyPassword: 'کپی رمز عبور',
      passwordCopied: 'رمز وای‌فای با موفقیت کپی شد!',
      directionsGoogleMaps: 'مسیریابی در نقشه گوگل',
      leaveReview: 'ثبت نظر و امتیاز در گوگل',
      restaurantHours: 'ساعات کاری',
      contactUs: 'تماس و پشتیبانی',
      shareMenu: 'اشتراک‌گذاری منو',
      shareMenuWhatsapp: 'اشتراک‌گذاری منو در واتس‌اپ 📲',
      shareMenuText: '🍗 سلام! منوی دیجیتال رستوران سوپر فراید (شعبه کاظمیه) را مشاهده کنید — لذیذترین مرغ سوخاری، برگر، ساندویچ و ریزو:',
      copyMenuLink: 'کپی لینک منو',
      menuLinkCopied: 'لینک منو با موفقیت کپی شد!',
    },
    admin: {
      title: 'پنل مدیریت منو سوپر فراید',
      subtitle: 'مدیریت قیمت‌ها، موجودی غذاها، دسته‌ها و کدهای QR میزها',
      enterPin: 'رمز عبور مدیریت را وارد کنید',
      pinPlaceholder: 'رمز ۴ رقمی (پیش‌فرض: 1234)',
      unlock: 'ورود به پنل',
      invalidPin: 'رمز عبور وارد شده نادرست است',
      logout: 'خروج از پنل',
      dishesTab: 'مدیریت غذاها (Dishes)',
      categoriesTab: 'دسته‌بندی‌ها',
      settingsTab: 'تنظیمات رستوران',
      qrGeneratorTab: 'استودیو چاپ QR میزها',
      ordersTab: 'تاریخچه سفارشات',
      ordersHistoryTitle: 'تاریخچه زنده سفارشات و فروش',
      ordersHistorySubtitle: 'پیگیری و مدیریت سفارشات میز و واتس‌اپ بر اساس زمان و قیمت',
      totalOrdersCount: 'کل سفارشات',
      totalRevenueAmount: 'مجموع فروش',
      todayOrders: 'سفارشات امروز',
      activeOrdersCount: 'سفارشات فعال و در حال پخت',
      orderIdLabel: 'شماره سفارش',
      orderTimeLabel: 'زمان و تاریخ',
      orderItemsLabel: 'غذاها و آیتم‌ها',
      orderTotalLabel: 'مبلغ کل',
      orderTypeLabel: 'نوع سفارش',
      orderStatusLabel: 'وضعیت',
      statusPending: 'در انتظار تایید',
      statusPreparing: 'در حال آماده‌سازی',
      statusCompleted: 'تکمیل شده / تحویل داده شده',
      statusCancelled: 'لغو شده',
      noOrdersMessage: 'هنوز سفارشی در تاریخچه ثبت نشده است.',
      clearOrdersHistory: 'پاک کردن تاریخچه سفارشات',
      confirmClearOrders: 'آیا از پاک کردن کل تاریخچه سفارشات اطمینان دارید؟',
      copyOrderText: 'کپی فاکتور سفارش',
      orderTextCopied: 'اطلاعات سفارش با موفقیت کپی شد!',
      whatsappOrderBadge: 'سفارش واتس‌اپ 📲',
      kitchenOrderBadge: 'سفارش مستقیم میز 🍳',
      filterAllStatus: 'همه وضعیت‌ها',
      exportOrders: 'خروجی سفارشات (JSON)',
      addNewDish: 'افزودن غذای جدید',
      editDish: 'ویرایش مشخصات غذا',
      dishName: 'نام غذا',
      dishDescription: 'توضیحات و رسپی',
      dishIngredients: 'محتویات',
      price: 'قیمت',
      category: 'دسته‌بندی',
      imageUrl: 'آدرس تصویر',
      uploadOrSelectImage: 'انتخاب یا بارگذاری تصویر',
      isAvailableToggle: 'وضعیت موجودی در منو',
      featuredDish: 'نمایش در بخش غذاهای ویژه و محبوب',
      tagsAndAllergens: 'برچسب‌های تغذیه‌ای و حساسیت‌زا',
      sizesAndAddons: 'اندازه‌ها و افزودنی‌ها',
      saveChanges: 'ذخیره تغییرات',
      cancel: 'انصراف',
      deleteDish: 'حذف غذا',
      confirmDelete: 'آیا از حذف این آیتم از منو مطمئن هستید؟',
      aiAutoGenerate: 'تولید هوشمند مشخصات و ترجمه با هوش مصنوعی ✨',
      aiGenerating: 'در حال نگارش و ترجمه با هوش مصنوعی...',
      aiSuccess: 'مشخصات و ترجمه به زبان‌ها با موفقیت ایجاد شد!',
      manageCategories: 'مدیریت دسته‌بندی‌های منو',
      addNewCategory: 'افزودن دسته‌بندی جدید',
      restaurantInfo: 'اطلاعات عمومی رستوران',
      whatsappNumber: 'شماره واتس‌اپ دریافت سفارشات',
      phoneNumber: 'شماره تماس مستقیم',
      mapsLink: 'لینک موقعیت در نقشه گوگل',
      currencySettings: 'واحد پول پیش‌فرض',
      resetToDefaults: 'بازنشانی به منوی پیش‌فرض',
      exportBackup: 'دانلود فایل پشتیبان (Export Backup)',
      importBackup: 'بازیابی فایل پشتیبان (Import Backup)',
    },
    qr: {
      title: 'استودیو کدهای QR هوشمند میزها',
      subtitle: 'چاپ استندهای شیک میزها بدون نیاز به چاپ مجدد هنگام تغییر منو!',
      tableNumberLabel: 'شماره میز دلخواه',
      batchGeneration: 'چاپ گروهی میزها',
      fromTable: 'از میز شماره',
      toTable: 'تا میز شماره',
      primaryColor: 'تم رنگی QR',
      includeLogo: 'درج لوگوی رستوران در مرکز',
      previewStand: 'پیش‌نمایش استند میز',
      printCards: 'چاپ کارت‌های میز (پرینت / PDF) 🖨️',
      downloadSvg: 'دانلود تصویر QR',
      scanPrompt: 'برای مشاهده منو و ثبت سفارش از روی میز اسکن کنید',
      dynamicNotice: '⭐ لینک ۱۰۰٪ پویا: هر تغییری در منو بدون نیاز به تغییر فیزیکی QR اعمال می‌شود.',
      standTagline: 'به سوپر فراید خوش آمدید (شعبه کاظمیه باب‌المراد) — مرغ سوخاری، برگر و ریزو',
    },
    reviews: {
      title: 'امتیاز و نظرات مشتریان',
      averageRating: 'میانگین امتیاز',
      reviewsCount: 'نظر',
      rateThisItem: 'امتیاز و نظر خود را ثبت کنید',
      yourRating: 'امتیاز شما به این غذا',
      yourComment: 'نظر یا تجربه شما (اختیاری)',
      commentPlaceholder: 'مثال: سوخاری بسیار ترد و لذیذ، ادویه عالی و سرو داغ...',
      yourName: 'نام شما (اختیاری)',
      namePlaceholder: 'مثال: رضا، سارا...',
      submitReview: 'ثبت و ارسال نظر',
      thankYou: 'از ثبت نظر و امتیاز ارزشمند شما سپاسگزاریم!',
      noReviewsYet: 'هنوز نظری ثبت نشده است. اولین نفری باشید که امتیاز می‌دهد!',
      recentReviews: 'نظرات مشتریان',
      stars: 'ستاره',
      anonymous: 'مشتری سوپر فراید',
    },
  },
  ur: {
    appName: 'سوپر فرائیڈ',
    viewMenu: 'مینو دیکھیں',
    exploreCategories: 'کھانوں کے زمرے',
    searchPlaceholder: 'کرسپی چکن، برگر، سینڈوچ، ریزو، مشروبات تلاش کریں...',
    allCategories: 'تمام زمرے',
    allDietary: 'تمام خصوصیات',
    dietary: {
      halal: '۱۰۰٪ حلال',
      vegetarian: 'سبزی خور',
      vegan: 'ویگن',
      spicy: 'تیز مصالحہ دار / اسپائسی 🔥',
      chefSpecial: 'شیف کا خصوصی انتخاب ⭐',
      bestseller: 'سب سے زیادہ مقبول 🔥',
      glutenFree: 'گلوٹین فری',
    },
    allergens: {
      title: 'الرجی کی معلومات',
      nuts: 'گری دار میوے و ڈرائی فروٹ',
      dairy: 'دودھ و پنیر کی مصنوعات',
      gluten: 'گلوٹین و گندم',
      eggs: 'انڈے',
      soy: 'سویا',
      seafood: 'سمندری خوراک',
      sesame: 'تل',
    },
    item: {
      addToOrder: 'آرڈر میں شامل کریں',
      ingredients: 'اجزاء و ترکیبات',
      allergensNotice: 'الرجی کی معلومات',
      portionSize: 'سائز اور مقدار منتخب کریں',
      extraAddons: 'اضافی ساس اور لوازمات',
      specialNotes: 'خصوصی ہدایات یا ترجیحات',
      specialNotesPlaceholder: 'مثال: پیاز کے بغیر، اضافی گارلک ساس، زیادہ اسپائسی...',
      outOfStock: 'عارضی طور پر ختم',
      available: 'دستیاب و تیار',
      calories: 'کیلوریز',
      prepTime: 'تیاری کا وقت',
      minutes: 'منٹ',
      currency: 'د.ع',
      popular: 'سب سے پسندیدہ',
      spicyLevel: 'اسپائس لیول',
    },
    cart: {
      title: 'آپ کا ٹیبل آرڈر',
      emptyMessage: 'آپ کی آرڈر لسٹ فی الحال خالی ہے۔ ہمارے لذیذ کھانوں میں سے انتخاب کریں!',
      tableNumber: 'ٹیبل نمبر',
      selectOrEnterTable: 'اپنا ٹیبل نمبر درج کریں',
      subtotal: 'میزان',
      total: 'کل واجب الادا رقم',
      placeOrderWhatsapp: 'واٹس ایپ پر فوری آرڈر بھیجیں 🚀',
      sendToKitchen: 'باورچی خانے کو آرڈر بھیجیں',
      clearCart: 'سب ختم کریں',
      itemsCount: 'اشیاء کی تعداد',
      orderSummary: 'ٹیبل آرڈر کا خلاصہ',
      whatsappOrderMessage: 'السلام علیکم، میں ٹیبل کے لیے نیا آرڈر دینا چاہتا ہوں:',
    },
    quickActions: {
      callWaiter: 'ویٹر کو بلائیں',
      callWaiterSuccess: 'آپ کی درخواست کامیابی کے ساتھ ویٹر تک پہنچا دی گئی ہے!',
      requestBill: 'بل منگوائیں 💳',
      requestWater: 'پانی / نیپکن طلب کریں 🥤',
      generalAssistance: 'عمومی رہنمائی اور مدد',
      wifiInfo: 'وائی فائی کی تفصیلات',
      wifiConnected: 'سوپر فرائیڈ ریسٹورنٹ وائی فائی',
      copyPassword: 'پاس ورڈ کاپی کریں',
      passwordCopied: 'پاس ورڈ کاپی ہو گیا!',
      directionsGoogleMaps: 'گوگل میپس پر لوکیشن',
      leaveReview: 'گوگل پر ریویو اور ریٹنگ دیں',
      restaurantHours: 'اوقات کار',
      contactUs: 'رابطہ اور سپورٹ',
      shareMenu: 'مینو شیئر کریں',
      shareMenuWhatsapp: 'واٹس ایپ پر مینو شیئر کریں 📲',
      shareMenuText: '🍗 السلام علیکم! سوپر فرائیڈ ریسٹورنٹ (کاظمیہ) کا ڈیجیٹل مینو ملاحظہ کریں — لذیذ کرسپی چکن، برگرز اور ریزو باؤلز:',
      copyMenuLink: 'مینو کا لنک کاپی کریں',
      menuLinkCopied: 'مینو کا لنک کاپی ہو گیا!',
    },
    admin: {
      title: 'سوپر فرائیڈ مینو مینیجر',
      subtitle: 'قیمتوں، دستیابی، کھانوں اور ٹیبل کیو آر کوڈز کا انتظام کریں',
      enterPin: 'ایڈمن پن کوڈ درج کریں',
      pinPlaceholder: '4 ہندسوں کا پن (ڈیفالٹ: 1234)',
      unlock: 'لاگ ان کریں',
      invalidPin: 'درج کردہ پن کوڈ غلط ہے',
      logout: 'لاگ آؤٹ',
      dishesTab: 'کھانوں کی فہرست',
      categoriesTab: 'کیٹیگریز',
      settingsTab: 'ریسٹورنٹ سیٹنگز',
      qrGeneratorTab: 'کیو آر کوڈ اسٹوڈیو',
      ordersTab: 'آرڈر ہسٹری',
      ordersHistoryTitle: 'لائیو آرڈرز کی تاریخ و فروخت',
      ordersHistorySubtitle: 'وقت، اجزاء اور کل قیمت کے ساتھ ٹیبل اور واٹس ایپ آرڈرز کا انتظام',
      totalOrdersCount: 'کل آرڈرز',
      totalRevenueAmount: 'کل آمدنی',
      todayOrders: 'آج کے آرڈرز',
      activeOrdersCount: 'جاری آرڈرز / زیر تیاری',
      orderIdLabel: 'آرڈر نمبر',
      orderTimeLabel: 'وقت اور تاریخ',
      orderItemsLabel: 'کھانے اور اشیاء',
      orderTotalLabel: 'کل قیمت',
      orderTypeLabel: 'آرڈر کی قسم',
      orderStatusLabel: 'حالت',
      statusPending: 'زیر التواء',
      statusPreparing: 'تیار کیا جا رہا ہے',
      statusCompleted: 'مکمل / پیش کر دیا گیا',
      statusCancelled: 'منسوخ شدہ',
      noOrdersMessage: 'ہسٹری میں فی الحال کوئی آرڈر موجود نہیں۔',
      clearOrdersHistory: 'آرڈر ہسٹری صاف کریں',
      confirmClearOrders: 'کیا آپ واقعی تمام آرڈر ہسٹری ڈیلیٹ کرنا چاہتے ہیں؟',
      copyOrderText: 'آرڈر کی تفصیلات کاپی کریں',
      orderTextCopied: 'آرڈر کی تفصیلات کاپی ہو گئیں!',
      whatsappOrderBadge: 'واٹس ایپ آرڈر 📲',
      kitchenOrderBadge: 'براہ راست ٹیبل آرڈر 🍳',
      filterAllStatus: 'تمام حالتیں',
      exportOrders: 'آرڈرز ڈاؤن لوڈ کریں (JSON)',
      addNewDish: 'نیا کھانا شامل کریں',
      editDish: 'کھانے میں ترمیم کریں',
      dishName: 'کھانے کا نام',
      dishDescription: 'تفصیل',
      dishIngredients: 'اجزاء',
      price: 'قیمت',
      category: 'کیٹیگری',
      imageUrl: 'تصویر کا لنک',
      uploadOrSelectImage: 'تصویر منتخب یا اپ لوڈ کریں',
      isAvailableToggle: 'مینو میں دستیابی کی حالت',
      featuredDish: 'خصوصی ڈش کے طور پر دکھائیں',
      tagsAndAllergens: 'غذائی ٹیگز اور الرجیز',
      sizesAndAddons: 'سائز اور اضافی لوازمات',
      saveChanges: 'تبدیلیاں محفوظ کریں',
      cancel: 'منسوخ کریں',
      deleteDish: 'کھانا حذف کریں',
      confirmDelete: 'کیا آپ واقعی اس کھانے کو مینو سے حذف کرنا چاہتے ہیں؟',
      aiAutoGenerate: 'اے آئی کے ذریعے تفصیلات اور ترجمہ تیار کریں ✨',
      aiGenerating: 'اے آئی مواد تیار کر رہا ہے...',
      aiSuccess: 'تمام زبانوں میں تفصیلات کامیابی سے تیار کر لی گئیں!',
      manageCategories: 'کیٹیگریز کا انتظام',
      addNewCategory: 'نئی کیٹیگری شامل کریں',
      restaurantInfo: 'ریسٹورنٹ کی بنیادی معلومات',
      whatsappNumber: 'واٹس ایپ نمبر برائے آرڈر',
      phoneNumber: 'رابطہ فون نمبر',
      mapsLink: 'گوگل میپس لنک',
      currencySettings: 'کرنسی کی سیٹنگ',
      resetToDefaults: 'ڈیفالٹ مینو پر ری سیٹ کریں',
      exportBackup: 'بیک اپ ڈاؤن لوڈ کریں',
      importBackup: 'بیک اپ ریسٹور کریں',
    },
    qr: {
      title: 'ڈائنامک کیو آر کوڈ اسٹوڈیو',
      subtitle: 'ٹیبلز کے لیے خوبصورت اسٹینڈز پرنٹ کریں، مینو تبدیل کرنے پر دوبارہ پرنٹ کی ضرورت نہیں!',
      tableNumberLabel: 'مخصوص ٹیبل نمبر',
      batchGeneration: 'ایک ساتھ متعدد ٹیبلز پرنٹ کریں',
      fromTable: 'ٹیبل نمبر سے',
      toTable: 'ٹیبل نمبر تک',
      primaryColor: 'کیو آر کلر تھیم',
      includeLogo: 'مرکز میں ریستوران کا لوگو شامل کریں',
      previewStand: 'ٹیبل اسٹینڈ پریویو',
      printCards: 'ٹیبل کارڈز پرنٹ کریں (پرنٹ / پی ڈی ایف) 🖨️',
      downloadSvg: 'کیو آر امیج ڈاؤن لوڈ کریں',
      scanPrompt: 'مینو دیکھنے اور آرڈر کرنے کے لیے کیمرے سے اسکین کریں',
      dynamicNotice: '⭐ 100٪ ڈائنامک لنک: مینو کی تمام تر تبدیلیاں فوری طور پر اپ ڈیٹ ہو جاتی ہیں۔',
      standTagline: 'سوپر فرائیڈ (کاظمیہ باب المراد) میں خوش آمدید — کرسپی چکن، برگر اور ریزو',
    },
    reviews: {
      title: 'ریٹنگ اور آراء',
      averageRating: 'اوسط ریٹنگ',
      reviewsCount: 'آراء',
      rateThisItem: 'اس کھانے پر اپنی ریٹنگ اور رائے دیں',
      yourRating: 'آپ کی ریٹنگ',
      yourComment: 'آپ کا تبصرہ یا تاثرات (اختیاری)',
      commentPlaceholder: 'مثال: انتہائی کرسپی، لاجواب ذائقہ اور فوری سروس...',
      yourName: 'آپ کا نام (اختیاری)',
      namePlaceholder: 'مثال: علی، حمزہ...',
      submitReview: 'ریٹنگ جمع کرائیں',
      thankYou: 'آپ کی ریٹنگ اور قیمتی رائے کا شکریہ!',
      noReviewsYet: 'ابھی تک کوئی ریٹنگ موجود نہیں۔ پہلے ریویو دینے والے بنیں!',
      recentReviews: 'صارفین کے تاثرات',
      stars: 'ستارے',
      anonymous: 'سوپر فرائیڈ مہمان',
    },
  },
};

export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'ar';
  
  // Check URL param first
  const searchParams = new URLSearchParams(window.location.search);
  const langParam = searchParams.get('lang');
  if (langParam && ['ar', 'en', 'ku', 'tr', 'fa', 'ur'].includes(langParam)) {
    return langParam as Language;
  }

  // Check stored preference
  const stored = localStorage.getItem('sultan_menu_lang') || localStorage.getItem('superfried_menu_lang');
  if (stored && ['ar', 'en', 'ku', 'tr', 'fa', 'ur'].includes(stored)) {
    return stored as Language;
  }

  // Browser language check
  const browserLang = (navigator.language || '').toLowerCase();
  if (browserLang.startsWith('ar')) return 'ar';
  if (browserLang.startsWith('fa')) return 'fa';
  if (browserLang.startsWith('ur')) return 'ur';
  if (browserLang.startsWith('ku')) return 'ku';
  if (browserLang.startsWith('tr')) return 'tr';
  return 'ar'; // Default friendly Arabic
}

export function isRtl(lang: Language): boolean {
  return lang === 'ar' || lang === 'ku' || lang === 'fa' || lang === 'ur';
}

export function formatPrice(amount: number, currency: string, lang: Language): string {
  const isRtlLang = isRtl(lang);
  if (currency === 'IQD') {
    return isRtlLang ? `${amount.toLocaleString()} د.ع` : `${amount.toLocaleString()} IQD`;
  }
  if (currency === 'TRY') {
    return `${amount.toLocaleString()} ₺`;
  }
  if (currency === 'SAR') {
    return isRtlLang ? `${amount.toLocaleString()} ر.س` : `${amount.toLocaleString()} SAR`;
  }
  if (currency === 'AED') {
    return isRtlLang ? `${amount.toLocaleString()} د.إ` : `${amount.toLocaleString()} AED`;
  }
  if (currency === 'EUR') {
    return `€${amount.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
}
