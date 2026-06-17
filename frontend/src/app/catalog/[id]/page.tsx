"use client";

import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { projectsData } from '../data';
import { priceList, packageMultipliers } from '@/data/prices';
import { projectRooms } from '../projectRoomsGenerated';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Lightbox } from '@/components/Lightbox';

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL BAZAR QİYMƝTLƝRİ (USD ekvivalenti) — dil bazarına görə
// ─────────────────────────────────────────────────────────────────────────────
const comprehensiveMarketRates = {

  az: { cement: 4.6, armature: 0.88, sand: 13, concrete: 58, stone: 0.45, roofing: 6.2, drywall: 4.2, putty: 0.35, paint: 3.5, adhesive: 0.25, labor_structure: 45, labor_malyar: 35, labor_roof: 18, labor_tech: 25, kombi_unit: 850, radiator_pipes: 14, labor_heating: 12, windows_facade: 140, logistics_management: 30, company_margin: 50 },

  tr: { cement: 3.9, armature: 0.75, sand: 10, concrete: 50, stone: 0.38, roofing: 5.5, drywall: 3.8, putty: 0.30, paint: 3.0, adhesive: 0.22, labor_structure: 38, labor_malyar: 30, labor_roof: 15, labor_tech: 20, kombi_unit: 750, radiator_pipes: 11, labor_heating: 10, windows_facade: 125, logistics_management: 70, company_margin: 280 },

  ru: { cement: 5.4, armature: 0.98, sand: 16, concrete: 64, stone: 0.55, roofing: 7.0, drywall: 4.8, putty: 0.40, paint: 4.2, adhesive: 0.30, labor_structure: 55, labor_malyar: 42, labor_roof: 22, labor_tech: 32, kombi_unit: 950, radiator_pipes: 16, labor_heating: 15, windows_facade: 160, logistics_management: 90, company_margin: 350 },

  en: { cement: 6.2, armature: 1.15, sand: 18, concrete: 75, stone: 0.65, roofing: 8.5, drywall: 5.5, putty: 0.50, paint: 5.0, adhesive: 0.35, labor_structure: 65, labor_malyar: 50, labor_roof: 28, labor_tech: 40, kombi_unit: 1100, radiator_pipes: 20, labor_heating: 18, windows_facade: 180, logistics_management: 100, company_margin: 400 },

  ar: { cement: 5.6, armature: 1.05, sand: 15, concrete: 70, stone: 0.60, roofing: 8.0, drywall: 5.2, putty: 0.45, paint: 4.5, adhesive: 0.32, labor_structure: 60, labor_malyar: 45, labor_roof: 25, labor_tech: 35, kombi_unit: 1000, radiator_pipes: 18, labor_heating: 16, windows_facade: 170, logistics_management: 95, company_margin: 380 }

};



// ─────────────────────────────────────────────────────────────────────────────

// TAM SMETA MATRİSİ — 1 m² üçün bütün kateqoriyalar

// ─────────────────────────────────────────────────────────────────────────────

const fullSmetaLedger = {

  // --- CORE STRUCTURAL MATERIALS ---

  cement: { key: "cement", cat: "core", az: "Sement (40kq kisə)", en: "Cement (40kg bag)", ru: "Цемент (40кг)", tr: "Çimento (40kg)", unit: "bag", usage: 1.2 },

  armature: { key: "armature", cat: "core", az: "Armatur (A500C)", en: "Steel Rebar", ru: "Нрматура", tr: "İnşaat Demiri", unit: "kg", usage: 38 },

  sand: { key: "sand", cat: "core", az: "Tikinti Qumu", en: "Construction Sand", ru: "Строительный пеѝок", tr: "İnşaat Kumu", unit: "m³", usage: 0.45 },

  concrete: { key: "concrete", cat: "core", az: "Beton (M350)", en: "Ready Concrete (M350)", ru: "Бетон (М350)", tr: "Hazır Beton (M350)", unit: "m³", usage: 0.38 },

  stone: { key: "stone", cat: "core", az: "Hörgü Daşı / Blok", en: "Wall Blocks / Stone", ru: "Блоки", tr: "Duvar Bloğu", unit: "ədəd", usage: 22 },

  roofing: { key: "roofing", cat: "core", az: "Dam Örtüyü (Metal Çerepitsa)", en: "Roofing Sheet", ru: "Кровельный металл", tr: "Çatı Sacı", unit: "m²", usage: 1.15 },

  logistics_management: { key: "logistics_management", cat: "core", az: "Logistika, Nəqliyyat və Mexanizmlər", en: "Logistics & Machinery", ru: "Логиѝтика", tr: "Lojistik", unit: "m²", usage: 1.0 },



  // --- INTERIOR FINISHING & MALYAR ---

  drywall: { key: "drywall", cat: "finish", az: "Gipsokarton və profillər", en: "Drywall Sheets", ru: "Гипѝокартон", tr: "Alçıpan", unit: "m²", usage: 1.8 },

  putty: { key: "putty", cat: "finish", az: "Şpatlyovka (Astar / Üzlük)", en: "Wall Putty", ru: "Шпатлевка", tr: "Duvar Macunu", unit: "kq", usage: 4.5 },

  paint: { key: "paint", cat: "finish", az: "Daxili Boya", en: "Interior Paint", ru: "Краѝка", tr: "İç Boya", unit: "litr", usage: 0.35 },

  adhesive: { key: "adhesive", cat: "finish", az: "Kafel/Metlax Yapışdırıcı", en: "Tile Adhesive", ru: "Плиточный клей", tr: "Fayans Harcı", unit: "kq", usage: 5.0 },

  windows_facade: { key: "windows_facade", cat: "finish", az: "Premium Pəncərə və Fasad Sistemləri", en: "Premium Window Systems", ru: "Окна и фаѝад", tr: "Pencere Sistemleri", unit: "m²", usage: 1.0 },



  // --- HEATING & CLIMATE SYSTEMS ---

  kombi_unit: { key: "kombi_unit", cat: "heating", az: "Kombi Cihazı & Kollektor Sistemi", en: "Kombi Boiler", ru: "Котел Комби", tr: "Kombi Cihazı", unit: "komplekt", usage: 0.005 },

  radiator_pipes: { key: "radiator_pipes", cat: "heating", az: "Radiatorlar, Borular və İsti Döşəmə", en: "Radiators & Underfloor Pipes", ru: "Радиаторы и трубы", tr: "Radyatör ve Boru", unit: "m²", usage: 0.8 },



  // --- LABOR COSTS / USTA PULU ---

  labor_structure: { key: "labor_structure", cat: "labor", az: "Konstruksiya & Hörgü Usta Pulu", en: "Structural Labor", ru: "Работа: Бетон", tr: "İşçilik: Kaba", unit: "m²", usage: 1.0 },

  labor_malyar: { key: "labor_malyar", cat: "labor", az: "Daxili Suvaq & Malyar Usta Pulu", en: "Painting Labor", ru: "Работа: Малѝрка", tr: "İşçilik: Boya", unit: "m²", usage: 1.0 },

  labor_roof: { key: "labor_roof", cat: "labor", az: "Dam Quraşdırılması Usta Pulu", en: "Roof Labor", ru: "Работа: Кровлѝ", tr: "İşçilik: Çatı", unit: "m²", usage: 1.0 },

  labor_tech: { key: "labor_tech", cat: "labor", az: "Elektrik & Santexnik Montaj İşləri", en: "MEP Labor", ru: "Работа: Электрика", tr: "İşçilik: Tesisat", unit: "m²", usage: 1.0 },

  labor_heating: { key: "labor_heating", cat: "labor", az: "Kombi & Santexnik Usta Pulu", en: "Heating Labor", ru: "Работа: Отопление", tr: "İşçilik: Kombi", unit: "m²", usage: 1.0 },

  company_margin: { key: "company_margin", cat: "labor", az: "Şirkətin Mənfəəti və Layihə Menecmenti", en: "Company Margin", ru: "Прибыль компании", tr: "Şirket Marjı", unit: "m²", usage: 1.0 },

};



// ─────────────────────────────────────────────────────────────────────────────

// VALYUTAKONFİQURASİYASI

// ─────────────────────────────────────────────────────────────────────────────

const currencyConfig = {

  az: { symbol: "₼", rate: 1.70 },  // USD → AZN

  tr: { symbol: "₺", rate: 32.50 },  // USD → TRY

  ru: { symbol: "₽", rate: 91.20 },  // USD → RUB

  en: { symbol: "$", rate: 1.00 },  // USD Base

  ar: { symbol: "د.إ", rate: 3.67 },  // USD → AED

  it: { symbol: "€", rate: 0.92 },

  fr: { symbol: "€", rate: 0.92 },

  de: { symbol: "€", rate: 0.92 },

  es: { symbol: "€", rate: 0.92 },

};



interface PageProps {

  params: Promise<{ id: string }>;

}



// Multi-lingual tab labels

const getTabLabels = (language: string) => {

  switch (language.toLowerCase()) {

    case 'en':

      return { '3d': '3D Render', 'plan': 'Project Plan' };

    case 'ru':

      return { '3d': '3D Render', 'plan': 'План Проекта' };

    case 'az':

    default:

      return { '3d': '3D Render', 'plan': 'Proje Planı' };

  }

};




export default function CatalogDetailPage({ params }: PageProps) {

  const { t, language } = useLanguage();



  // Normalize language

  const currentLang = (language || 'az').toLowerCase();

  const projectLang = currentLang.toUpperCase() as 'AZ' | 'EN' | 'RU';

  const tabLabels = getTabLabels(language);



  // Currency

  const currency = currencyConfig[currentLang as keyof typeof currencyConfig] || currencyConfig['en'];



  const formatPrice = (priceInUSD: number) => {

    const converted = priceInUSD * currency.rate;

    return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(converted)} ${currency.symbol}`;

  };



  const unwrappedParams = React.use(params);

  const projectId = parseInt(unwrappedParams.id, 10);



  const rawProject = projectsData.find((p) => String(p.id) === String(unwrappedParams.id)) || projectsData[0];

  const activeProject = { ...rawProject };



  const [activeTab, setActiveTab] = useState<'3d' | 'plan'>('3d');

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [activeLightboxImage, setActiveLightboxImage] = useState('');

  const [galleryFilter, setGalleryFilter] = useState<'exterior' | 'interior'>('exterior');

  const [selectedPackage, setSelectedPackage] = useState<'ekonom' | 'standart' | 'premium'>('ekonom');



  // Dil açarını təhlükəsiz şəkildə normallaşdır

  const rawLang = typeof language === 'string' ? language : 'az';

  const currentLangKey = (rawLang.split('-')[0].toLowerCase()) as 'az' | 'tr' | 'ru' | 'en' | 'ar';



  // ─── DİNAMİK PAKET QİYMƝT MÜHƝRRİKİ ─────────────────────────────────────

  // Hər üç paketin ümumi qiymətini smetanın CƝMİNDƝN hesablayır.

const multipliers = {
  ekonom: 1.15,
  standart: 1.25,
  premium: 1.40
};

const getPackageTierTotalUSD = (tier: 'ekonom' | 'standart' | 'premium'): number => {
  const area = activeProject.areaSqm || 0;
  const targetMarket = comprehensiveMarketRates[currentLangKey] || comprehensiveMarketRates['az'];

  let totalMaterialUSD = 0;
  let totalLaborUSD = 0;

  Object.values(fullSmetaLedger).forEach((mat) => {
    let totalQuantity = Math.ceil(area * mat.usage);
    if (mat.key === 'kombi_unit') totalQuantity = area > 250 ? 2 : 1;

    const marketRatesForLang = targetMarket[mat.key as keyof typeof targetMarket];
    let safeRateUSD = typeof marketRatesForLang === 'number' ? marketRatesForLang : 0;
    safeRateUSD = safeRateUSD / currency.rate;

    const lineCost = totalQuantity * safeRateUSD;
    if (mat.cat === 'labor') {
      totalLaborUSD += lineCost;
    } else {
      totalMaterialUSD += lineCost;
    }
  });

  const baseTotal = totalMaterialUSD + totalLaborUSD;
  return baseTotal * multipliers[tier];
};



  // Aktiv paket üzrə yekun USD cəmi

  const getSmetaTotalUSD = () => getPackageTierTotalUSD(selectedPackage);

  const getFinalPrice = () => getSmetaTotalUSD();



// ─── SMETA CƝDVƝL ÜÇÜN ƝTRAFLIQLAR ───────────────────────────────────────
  const getCalculatedSmeta = () => {
    const totalArea = activeProject.areaSqm || 0;
    const floorCount = Math.max(1, Number(activeProject.floorCount ?? activeProject.floors ?? 1) || 1);
    const targetMarket = comprehensiveMarketRates[currentLangKey] || comprehensiveMarketRates['az'];

    // 1 → 2 mərtəbədə dam_örtüyü və logistika quantity-ni ~2x artırmaq
    // Bunu ümumi qayda kimi: factor = floorCount
    const floorFactor = floorCount;

    const items = Object.values(fullSmetaLedger).map((mat) => {
      let totalQuantity = Math.ceil(totalArea * mat.usage);
      if (mat.key === 'kombi_unit') totalQuantity = totalArea > 250 ? 2 : 1;
      // Mərtəbə sayına görə artanlar
      if (mat.key === 'roofing') totalQuantity = Math.ceil(totalArea * mat.usage * floorFactor);
      if (mat.key === 'logistics_management') totalQuantity = Math.ceil(totalArea * mat.usage * floorFactor);


      const marketRatesForLang = targetMarket[mat.key as keyof typeof targetMarket];
      let safeRateUSD = typeof marketRatesForLang === 'number' ? marketRatesForLang : 0;
      safeRateUSD = safeRateUSD / currency.rate;

      const totalCostInUSD = totalQuantity * safeRateUSD;

      let localizedName = mat.az;
      if (currentLangKey === 'en') localizedName = mat.en;
      if (currentLangKey === 'ru') localizedName = mat.ru;
      if (currentLangKey === 'tr') localizedName = mat.tr;

      return {
        name: localizedName,
        category: mat.cat,
        quantity: totalQuantity,
        unit: mat.unit,
        unitPrice: formatPrice(safeRateUSD),
        totalCost: formatPrice(totalCostInUSD),
      };
});

if (String(activeProject.id) === 'ladin' || activeProject.id === 17) {
      const garageRateUSD = (targetMarket.concrete || 58) / currency.rate * 1.0;
      const garageQuantity = 35;
      const garageTotalUSD = garageQuantity * garageRateUSD;
      items.push({
        name: currentLangKey === 'en' ? 'Garage Area (Concrete + Insulation)' : currentLangKey === 'ru' ? 'Гараж (Бетон + Утепление)' : currentLangKey === 'tr' ? 'Garaj Alanı (Beton + Yalıtım)' : 'Qaraj Sahəsi (Beton+İzolyasiya)',
        category: 'core',
        quantity: garageQuantity,
        unit: 'm²',
        unitPrice: formatPrice(garageRateUSD),
        totalCost: formatPrice(garageTotalUSD),
      });
    }



    return items;

  };



  // PDF brochure

  const generatePDFBrochure = () => { window.print(); };



  // Gallery helpers

  const getGalleryImages = () => {

    if (!Array.isArray(activeProject.gallery) && activeProject.gallery.exterior && activeProject.gallery.interior) {

      return galleryFilter === 'exterior' ? activeProject.gallery.exterior : activeProject.gallery.interior;

    }

    if (Array.isArray(activeProject.gallery)) return activeProject.gallery;

    return [];

  };



  const openLightbox = (imageUrl: string) => {

    setActiveLightboxImage(imageUrl);

    setIsLightboxOpen(true);

  };



  return (

    <div className={`min-h-screen bg-[#12161A] text-slate-200 ${language === 'AR' ? 'rtl' : 'ltr'}`}>

      <Navigation />



      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">

        {/* Breadcrumb */}

        <div className="flex space-x-4 mb-6">

          <Link href="/catalog" className="text-sm text-amber-500 hover:underline">

            ↝ {t.catalog}

          </Link>

          <span className="text-gray-700">|</span>

          <Link href="/" className="text-sm text-gray-400 hover:underline">

            {t.home}

          </Link>

        </div>



        {/* ── HEADER GRID ── */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          <div className="lg:col-span-2">

            <h1 className="text-4xl font-bold mb-2 text-white">{typeof activeProject.name === 'string' ? activeProject.name : (typeof activeProject.name === "string" ? activeProject.name : activeProject.name[projectLang])}</h1>

            <p className="text-gray-400 text-lg">{typeof activeProject.description === 'string' ? activeProject.description : (typeof activeProject.description === "string" ? activeProject.description : activeProject.description[projectLang])}</p>

            

            
            
{(() => {
              const floors = projectRooms[typeof unwrappedParams.id === 'string' ? unwrappedParams.id : String(unwrappedParams.id)]?.floors;
              if (!floors) return null;
              return Object.entries(floors).map(([floorName, rooms]) => (
                <div key={floorName} className="mb-6">
                  <h3 className="text-lg font-bold text-orange-500 mb-3">{floorName}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {rooms.map((room, idx) => (
                      <div key={`${floorName}-${room.name.replace(/\s+/g, '-')}-${String(idx)}`} className="relative bg-slate-900/50 border border-slate-800 p-3 rounded-xl flex flex-col">
                        <span className="text-xs text-slate-400">{room.name}</span>
                        <span className="text-sm font-bold text-white">{room.area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}


            <h3 className="text-lg font-semibold mb-4 border-b border-slate-800/60 pb-2 text-white">
              {t.archStyle} Summary
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Total Area:</span>
                <span className="font-medium text-white">{activeProject.areaSqm} m²</span>
              </div>
<div className="flex justify-between">
                 <span>Floors:</span>
                 <span className="font-medium text-white">
                   {(() => {
                     const floors = projectRooms[typeof unwrappedParams.id === 'string' ? unwrappedParams.id : String(unwrappedParams.id)]?.floors;
                     if (floors && Object.keys(floors).length > 1) return '2 mərtəbəli';
                     return '1 mərtəbəli';
                   })()}
                 </span>
               </div>
              <div className="flex justify-between">
                <span>Style:</span>
                <span className="font-medium text-white">{activeProject.architecturalStyle}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/60 pt-2 mt-2 text-amber-500 font-bold">
                <span>Final Price:</span>
                <span>{formatPrice(getSmetaTotalUSD())}</span>
              </div>
            </div>

            <button
              onClick={generatePDFBrochure}
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-amber-500/25"
            >
              📄 PDF Broşürü Yüklə
            </button>
          </div>
        </div>

        <div className="bg-[#1C232B] border border-slate-800/60 p-6 rounded-2xl mb-10">
          <h3 className="text-xl font-semibold mb-6 text-white">📝 İnteraktiv Konstruksiya Smetası</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {(['ekonom', 'standart', 'premium'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedPackage(tier)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedPackage === tier
                    ? 'border-amber-500 bg-amber-500/10 text-white shadow-lg shadow-amber-500/10'
                    : 'border-slate-700 bg-slate-900/40 text-gray-300 hover:border-amber-500/50'
                }`}
              >
                <div className="text-sm text-gray-400 mb-1">{currentLangKey === 'en' ? tier.charAt(0).toUpperCase() + tier.slice(1) + ' Package' : currentLangKey === 'ru' ? tier.charAt(0).toUpperCase() + tier.slice(1) + ' Пакет' : currentLangKey === 'tr' ? tier.charAt(0).toUpperCase() + tier.slice(1) + ' Paket' : tier.toUpperCase() + ' Paket'}</div>
                <div className="text-xl font-bold">{formatPrice(getPackageTierTotalUSD(tier))}</div>
              </button>
            ))}
          </div>

          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-white">{currentLangKey === 'en' ? 'Package Selection: ' : currentLangKey === 'ru' ? 'Выбор Пакета: ' : currentLangKey === 'tr' ? 'Paket Seçimi: ' : 'Paket Seçimi: '}<span className="text-amber-500">{currentLangKey === 'en' ? selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1) : selectedPackage.toUpperCase()}</span></h4>
              <div className="text-right">
                <p className="text-xs text-gray-400">{currentLangKey === 'en' ? 'Total Estimate' : currentLangKey === 'ru' ? 'Общая Смета' : currentLangKey === 'tr' ? 'Toplam Smeta' : 'Ümumi Konstruksiya Smetası'}</p>
                <p className="text-2xl font-bold text-amber-500">{formatPrice(getSmetaTotalUSD())}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase text-gray-500 border-b border-slate-800">
                  <tr>
                    <th className="p-3">{currentLangKey === 'en' ? 'Material' : currentLangKey === 'ru' ? 'Материал' : currentLangKey === 'tr' ? 'Malzeme' : 'Material'}</th>
                    <th className="p-3">{currentLangKey === 'en' ? 'Quantity' : currentLangKey === 'ru' ? 'Количество' : currentLangKey === 'tr' ? 'Miktar' : 'Miqdar'}</th>
                    <th className="p-3">{currentLangKey === 'en' ? 'Unit Price (AZN)' : currentLangKey === 'ru' ? 'Цена за единицу (AZN)' : currentLangKey === 'tr' ? 'Birim Fiyat (AZN)' : 'Vahid Qiymət (AZN)'}</th>
                    <th className="p-3">{currentLangKey === 'en' ? 'Total (AZN)' : currentLangKey === 'ru' ? 'Итого (AZN)' : currentLangKey === 'tr' ? 'Toplam (AZN)' : 'Cəmi (AZN)'}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(fullSmetaLedger).map((mat, idx) => {
                    const area = activeProject.areaSqm || 0;
                    let totalQuantity = Math.ceil(area * mat.usage);
                    if (mat.key === 'kombi_unit') totalQuantity = area > 250 ? 2 : 1;
                    
                    const marketRatesForLang = comprehensiveMarketRates[currentLangKey as keyof typeof comprehensiveMarketRates];
                    const rateKey = mat.key as keyof typeof marketRatesForLang;
                    const safeRateUSD = typeof marketRatesForLang[rateKey] === 'number' ? (marketRatesForLang[rateKey] as number) : 0;
                    const unitPriceAZN = safeRateUSD * currency.rate;
                    const totalCostAZN = totalQuantity * unitPriceAZN;
                    
                    let localizedName = mat.az;
                    if (currentLangKey === 'en') localizedName = mat.en;
                    if (currentLangKey === 'ru') localizedName = mat.ru;
                    if (currentLangKey === 'tr') localizedName = mat.tr;
                    
                    return (
                      <tr key={mat.key} className="border-b border-slate-800/50 hover:bg-slate-900/40">
                        <td className="p-3 font-medium text-gray-200">{localizedName || mat.key}</td>
                        <td className="p-3">{totalQuantity} {mat.unit}</td>
                        <td className="p-3 text-amber-500">{unitPriceAZN.toLocaleString()} ₼</td>
                        <td className="p-3 text-white font-bold">{totalCostAZN.toLocaleString()} ₼</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-400">{currentLangKey === 'en' ? 'Base Total (Material + Labor)' : currentLangKey === 'ru' ? 'Базовая Сумма (Материал + Труд)' : currentLangKey === 'tr' ? 'Temel Toplam (Malzeme + İşçilik)' : 'Əsas Cəm (Material + Usta Pulu)'}</span>
                <span className="text-white">{formatPrice(getPackageTierTotalUSD(selectedPackage) / packageMultipliers[selectedPackage])}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-400">{currentLangKey === 'en' ? 'Package Multiplier' : currentLangKey === 'ru' ? 'Пакетный Множитель' : currentLangKey === 'tr' ? 'Paket Çarpanı' : 'Paket Əmsalı'}</span>
                <span className="text-white font-medium">× {packageMultipliers[selectedPackage]}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-amber-500">{currentLangKey === 'en' ? 'Final Price' : currentLangKey === 'ru' ? 'Итоговая Цена' : currentLangKey === 'tr' ? 'Nihai Fiyat' : 'Ümumi Məbləğ'}</span>
                <span className="text-amber-500 text-2xl">{formatPrice(getSmetaTotalUSD())}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1C232B] border border-slate-800/60 p-6 rounded-2xl mb-10">
          <h3 className="text-xl font-semibold mb-6 text-white">📐 2D Plan və Otaq Bölgüsü</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
<h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-4">Plan Görüntüsü</h4>
               <div className="bg-slate-900/50 rounded-xl p-4 min-h-[320px] flex items-center justify-center">
                 <Zoom>
                   <img
                     src={activeProject.sketch2D || activeProject.thumbnail}
                     alt={typeof activeProject.name === 'string' ? activeProject.name : activeProject.name[projectLang]}
                     className="w-full h-auto object-contain rounded-xl cursor-pointer"
                   />
                 </Zoom>
               </div>
             </div>

            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 overflow-hidden">
              <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-4">Otaq Bölgüsü</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase text-gray-500 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Otaq</th>
                      <th className="p-3">Ölçü</th>
                      <th className="p-3">Sahə</th>
                    </tr>
                  </thead>
<tbody>
                      {projectRooms[typeof unwrappedParams.id === 'string' ? unwrappedParams.id : String(unwrappedParams.id)]?.floors ? (
                        Object.entries(projectRooms[typeof unwrappedParams.id === 'string' ? unwrappedParams.id : String(unwrappedParams.id)].floors).map(([floorName, rooms]) => (
                          (rooms as any[]).map((room, idx) => (
                            <tr key={`${floorName}-${room.name.replace(/\s+/g, '-')}-${String(idx)}`} className="border-b border-slate-800/50 hover:bg-slate-900/40">
                              <td className="p-3">{floorName}: {room.name}</td>
                              <td className="p-3">-</td>
                              <td className="p-3">{room.area}</td>
                            </tr>
                          ))
                        ))
                      ) : (
                        <tr><td colSpan={3} className="p-3 text-center">Məlumat tapılmadı.</td></tr>
                      )}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-800 pt-6 mt-12 text-center text-gray-500 text-sm">
          <p>AlMajid Estate - Professional Architectural Solutions</p>
          <p className="mt-1">Generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}