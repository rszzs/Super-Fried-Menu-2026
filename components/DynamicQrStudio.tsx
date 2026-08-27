'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Language, RestaurantSettings } from '@/types/menu';
import { translations, isRtl } from '@/lib/i18n';
import { SuperFriedLogo } from './SuperFriedLogo';
import { 
  QrCode, 
  Printer, 
  Download, 
  Sparkles, 
  Layers, 
  Wifi, 
  Check, 
  Copy, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface DynamicQrStudioProps {
  settings: RestaurantSettings;
  currentLang: Language;
}

export const DynamicQrStudio: React.FC<DynamicQrStudioProps> = ({
  settings,
  currentLang,
}) => {
  const [baseUrl, setBaseUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      return origin;
    }
    return '';
  });
  const [singleTable, setSingleTable] = useState('1');
  const [batchMode, setBatchMode] = useState(false);
  const [fromTable, setFromTable] = useState(1);
  const [toTable, setToTable] = useState(6);
  const [qrColor, setQrColor] = useState('#283618'); // natural olive tone
  const [includeLogo, setIncludeLogo] = useState(true);
  const [forcedLanguage, setForcedLanguage] = useState<'auto' | Language>('auto');

  const t = translations[currentLang];
  const rtl = isRtl(currentLang);

  const getTableUrl = (tbl: string | number) => {
    const cleanBase = baseUrl || 'https://superfried.baghdad.menu';
    const params = new URLSearchParams();
    if (tbl) params.set('table', String(tbl));
    if (forcedLanguage !== 'auto') params.set('lang', forcedLanguage);
    return `${cleanBase}?${params.toString()}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const tableList = batchMode
    ? Array.from(
        { length: Math.max(1, Math.min(50, toTable - fromTable + 1)) },
        (_, i) => fromTable + i
      )
    : [singleTable];

  return (
    <div className="space-y-8">
      
      {/* Studio Header Card */}
      <div className="p-6 rounded-3xl bg-[#283618] text-white shadow-xl border border-[#3D5024]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E9EDC9] text-xs font-semibold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>{t.qr.dynamicNotice}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">{t.qr.title}</h2>
            <p className="text-xs sm:text-sm text-[#E8E5DF] max-w-2xl font-light">
              {t.qr.subtitle}
            </p>
          </div>

          <button
            id="print-qr-stands-main-btn"
            onClick={handlePrint}
            className="px-6 py-3.5 rounded-2xl bg-[#BC6C25] hover:bg-[#A3591B] text-white font-black text-sm shadow-lg shadow-[#1A2410]/40 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
          >
            <Printer className="w-5 h-5" />
            <span>{t.qr.printCards}</span>
          </button>
        </div>
      </div>

      {/* Controls & Customizer Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Settings Column */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-[#283618] uppercase tracking-wider border-b border-[#E8E5DF] pb-2">
            {t.admin.settingsTab}
          </h3>

          {/* Mode Selector: Single vs Batch */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#283618] block">
              {t.qr.tableNumberLabel}
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#F0ECE4] rounded-xl border border-[#E8E5DF]">
              <button
                id="qr-single-mode-btn"
                type="button"
                onClick={() => setBatchMode(false)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  !batchMode ? 'bg-white text-[#283618] shadow-2xs' : 'text-[#6B705C]'
                }`}
              >
                طاولة واحدة (Single)
              </button>
              <button
                id="qr-batch-mode-btn"
                type="button"
                onClick={() => setBatchMode(true)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  batchMode ? 'bg-white text-[#283618] shadow-2xs' : 'text-[#6B705C]'
                }`}
              >
                {t.qr.batchGeneration}
              </button>
            </div>
          </div>

          {!batchMode ? (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B705C] block">
                {t.qr.tableNumberLabel}
              </label>
              <input
                id="qr-single-table-input"
                type="text"
                value={singleTable}
                onChange={(e) => setSingleTable(e.target.value)}
                placeholder="1, 2, VIP, Terrace..."
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] font-bold text-[#283618] focus:outline-hidden focus:ring-2 focus:ring-[#283618]"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#6B705C] block mb-1">
                  {t.qr.fromTable}
                </label>
                <input
                  id="qr-from-table-input"
                  type="number"
                  min="1"
                  max="100"
                  value={fromTable}
                  onChange={(e) => setFromTable(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] font-bold text-center text-[#283618]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#6B705C] block mb-1">
                  {t.qr.toTable}
                </label>
                <input
                  id="qr-to-table-input"
                  type="number"
                  min="1"
                  max="100"
                  value={toTable}
                  onChange={(e) => setToTable(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] font-bold text-center text-[#283618]"
                />
              </div>
            </div>
          )}

          {/* Color Preset Palette */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#283618] block">
              {t.qr.primaryColor}
            </label>
            <div className="flex items-center gap-2.5">
              {[
                { name: 'Forest Olive', color: '#283618' },
                { name: 'Terracotta', color: '#BC6C25' },
                { name: 'Moss Green', color: '#606C38' },
                { name: 'Dark Onyx', color: '#1A2410' },
                { name: 'Warm Amber', color: '#DDA15E' },
              ].map((c) => (
                <button
                  key={c.color}
                  type="button"
                  onClick={() => setQrColor(c.color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    qrColor === c.color ? 'scale-110 border-[#283618] shadow-md ring-2 ring-[#E9EDC9]' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.color }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Forced Language in QR or Auto */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#283618] block">
              لغة الفتح المبدئية عند مسح الـ QR
            </label>
            <select
              value={forcedLanguage}
              onChange={(e) => setForcedLanguage(e.target.value as any)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E5DF] bg-[#FAF9F6] font-medium text-[#283618]"
            >
              <option value="auto">🌐 ذكي تلقائي (حسب لغة جهاز الزبون - مستحسن)</option>
              <option value="ar">🇮🇶 تثبيت على العربية (Arabic)</option>
              <option value="en">🇬🇧 تثبيت على الإنجليزية (English)</option>
              <option value="fa">🇮🇷 تثبيت على الفارسية (Persian)</option>
              <option value="ur">🇵🇰 تثبيت على الأردية (Urdu)</option>
              <option value="ku">☀️ تثبيت على الكردية (Kurdish)</option>
              <option value="tr">🇹🇷 تثبيت على التركية (Turkish)</option>
            </select>
          </div>

          {/* Live Link Copy Box */}
          <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E5DF] text-xs space-y-1.5">
            <span className="font-bold text-[#6B705C] block">رابط الطاولة الفعلي:</span>
            <div className="font-mono text-[11px] text-[#283618] bg-white p-2 rounded-lg border border-[#E8E5DF] break-all select-all">
              {getTableUrl(batchMode ? fromTable : singleTable)}
            </div>
          </div>

        </div>

        {/* Live Printable Stand Preview Grid (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#283618] uppercase tracking-wider">
              {t.qr.previewStand}
            </h3>
            <span className="text-xs text-[#6B705C] font-medium">
              {tableList.length} بطاقة جاهزة للطباعة
            </span>
          </div>

          {/* Printable Cards Container */}
          <div
            id="printable-qr-section"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F0ECE4] p-6 rounded-3xl border border-[#E8E5DF]"
          >
            {tableList.map((tbl) => {
              const directUrl = getTableUrl(tbl);

              return (
                <div
                  key={tbl}
                  className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#283618]/20 flex flex-col items-center text-center space-y-4 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #FAF9F6 0%, #FEFAE0 100%)',
                  }}
                >
                  {/* Decorative Corner Borders */}
                  <div className="absolute top-2 start-2 w-4 h-4 border-t-2 border-s-2 border-[#283618]/40" />
                  <div className="absolute top-2 end-2 w-4 h-4 border-t-2 border-e-2 border-[#283618]/40" />
                  <div className="absolute bottom-2 start-2 w-4 h-4 border-b-2 border-s-2 border-[#283618]/40" />
                  <div className="absolute bottom-2 end-2 w-4 h-4 border-b-2 border-e-2 border-[#283618]/40" />

                  {/* Header: Logo & Restaurant Name */}
                  <div className="space-y-1">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-white p-1 border border-[#E8E5DF] flex items-center justify-center shadow-xs">
                      <SuperFriedLogo size={36} />
                    </div>
                    <h4 className="text-base font-black text-[#283618] tracking-tight">
                      {settings.name[currentLang] || settings.name.ar}
                    </h4>
                    <p className="text-[11px] text-[#6B705C] font-medium">
                      {t.qr.standTagline}
                    </p>
                  </div>

                  {/* Table Badge */}
                  <div className="px-4 py-1.5 rounded-full bg-[#283618] text-[#FEFAE0] text-xs sm:text-sm font-black shadow-xs tracking-wider border border-[#3D5024]">
                    {t.cart.tableNumber} #{tbl}
                  </div>

                  {/* Vector QR Code */}
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#E8E5DF]">
                    <QRCodeSVG
                      value={directUrl}
                      size={160}
                      fgColor={qrColor}
                      bgColor="#ffffff"
                      level="Q"
                      includeMargin={false}
                    />
                  </div>

                  {/* Instruction */}
                  <div className="space-y-1 max-w-xs">
                    <p className="text-xs font-bold text-[#283618] leading-snug">
                      {t.qr.scanPrompt}
                    </p>
                    <p className="text-[10px] text-[#6B705C]">
                      Scan with camera • امسح بالكاميرا • Kamerayla tara
                    </p>
                  </div>

                  {/* Wi-Fi Footer Chip */}
                  {settings.wifiSsid && (
                    <div className="w-full pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-[11px] text-[#283618]">
                      <span className="flex items-center gap-1 font-semibold">
                        <Wifi className="w-3.5 h-3.5 text-[#BC6C25]" />
                        Wi-Fi: {settings.wifiSsid}
                      </span>
                      <span className="font-mono font-bold text-[#283618]">
                        {settings.wifiPassword}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
