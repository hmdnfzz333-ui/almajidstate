"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { projectsData } from './data';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Lightbox } from '@/components/Lightbox';
import { packageMultipliers } from '@/data/prices';

// Currency configuration with exchange rates (2026 baseline)
const currencyConfig = {
  az: { symbol: "₼", rate: 1.70 },   // USD to AZN
  tr: { symbol: "₺", rate: 32.50 },  // USD to TRY
  ru: { symbol: "₽", rate: 91.20 },  // USD to RUB
  en: { symbol: "$", rate: 1.00 },   // USD Base
  ar: { symbol: "$", rate: 1.00 },   // Keep USD for Arabic locale
  it: { symbol: "€", rate: 0.92 },   // USD to EUR
  fr: { symbol: "€", rate: 0.92 },   // USD to EUR
  de: { symbol: "€", rate: 0.92 },   // USD to EUR
  es: { symbol: "€", rate: 0.92 },   // USD to EUR
};

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL BAZAR QİYMƏTLƏRİ — smeta hesablaması üçün
// ─────────────────────────────────────────────────────────────────────────────
const comprehensiveMarketRates = {
  az: { cement: 4.6, armature: 0.88, sand: 13, concrete: 58, stone: 0.45, roofing: 6.2, drywall: 4.2, putty: 0.35, paint: 3.5, adhesive: 0.25, labor_structure: 45, labor_malyar: 35, labor_roof: 18, labor_tech: 25, kombi_unit: 850, radiator_pipes: 14, labor_heating: 12, windows_facade: 140, logistics_management: 30, company_margin: 50 }
};

const fullSmetaLedger: Record<string, { key: string; cat: string; usage: number }> = {
  cement: { key: "cement", cat: "core", usage: 1.2 }, armature: { key: "armature", cat: "core", usage: 38 }, sand: { key: "sand", cat: "core", usage: 0.45 }, concrete: { key: "concrete", cat: "core", usage: 0.38 }, stone: { key: "stone", cat: "core", usage: 22 }, roofing: { key: "roofing", cat: "core", usage: 1.15 }, drywall: { key: "drywall", cat: "finish", usage: 1.8 }, putty: { key: "putty", cat: "finish", usage: 4.5 }, paint: { key: "paint", cat: "finish", usage: 0.35 }, adhesive: { key: "adhesive", cat: "finish", usage: 5.0 }, windows_facade: { key: "windows_facade", cat: "finish", usage: 1.0 }, logistics_management: { key: "logistics_management", cat: "core", usage: 1.0 }, kombi_unit: { key: "kombi_unit", cat: "heating", usage: 0.005 }, radiator_pipes: { key: "radiator_pipes", cat: "heating", usage: 0.8 }, labor_structure: { key: "labor_structure", cat: "labor", usage: 1.0 }, labor_malyar: { key: "labor_malyar", cat: "labor", usage: 1.0 }, labor_roof: { key: "labor_roof", cat: "labor", usage: 1.0 }, labor_tech: { key: "labor_tech", cat: "labor", usage: 1.0 }, labor_heating: { key: "labor_heating", cat: "labor", usage: 1.0 }, company_margin: { key: "company_margin", cat: "labor", usage: 1.0 }
};

// Universal calculateTotal function - uses same logic as detail page
const calculateTotal = (areaSqm: number, packageType: 'ekonom' | 'standart' | 'premium' = 'standart') => {
  const targetMarket = comprehensiveMarketRates['az'];
  let totalMaterialUSD = 0;
  let totalLaborUSD = 0;

  Object.values(fullSmetaLedger).forEach((mat) => {
    let totalQuantity = Math.ceil(areaSqm * mat.usage);
    if (mat.key === 'kombi_unit') totalQuantity = areaSqm > 250 ? 2 : 1;

    const safeRateUSD = (targetMarket[mat.key as keyof typeof targetMarket] || 0) / 1.70;
    const lineCost = totalQuantity * safeRateUSD;
    if (mat.cat === 'labor') {
      totalLaborUSD += lineCost;
    } else {
      totalMaterialUSD += lineCost;
    }
  });

  const baseTotal = totalMaterialUSD + totalLaborUSD;
  return baseTotal * packageMultipliers[packageType];
};

const archStyles = [
  { value: 'All', label: 'All' },
  { value: 'Modern', label: 'Modern' },
  { value: 'Minimalist', label: 'Minimalist' },
  { value: 'Classic', label: 'Classic' },
];

const filterTranslations = {
  az: {
    floorsTitle: "Mərtəbə Sayı",
    all: "Hamısı",
    oneFloor: "1 Mərtəbəli",
    twoFloors: "2 Mərtəbəli",
    areaTitle: "Sahə Aralığı",
    mini: "Mini (< 150m²)",
    medium: "Orta (150m² - 200m²)",
    large: "Böyük (> 200m²)",
    amenitiesTitle: "Xüsusi Üstünlüklər",
    terrace: "Teraslı",
    balcony: "Eyvanlı"
  },
  en: {
    floorsTitle: "Floor Count",
    all: "All",
    oneFloor: "1 Story",
    twoFloors: "2 Stories",
    areaTitle: "Area Range",
    mini: "Mini (< 150m²)",
    medium: "Medium (150m² - 200m²)",
    large: "Large (> 200m²)",
    amenitiesTitle: "Special Amenities",
    terrace: "With Terrace",
    balcony: "With Balcony"
  },
  ru: {
    floorsTitle: "Количество этажей",
    all: "Все",
    oneFloor: "1-этажный",
    twoFloors: "2-этажный",
    areaTitle: "Площадь",
    mini: "Малая (< 150м²)",
    medium: "Средняя (150м² - 200м²)",
    large: "Большая (> 200м²)",
    amenitiesTitle: "Особые удобства",
    terrace: "С террасой",
    balcony: "С балконом"
  },
  tr: {
    floorsTitle: "Kat Sayısı",
    all: "Hepsi",
    oneFloor: "1 Katlı",
    twoFloors: "2 Katlı",
    areaTitle: "Alan Aralığı",
    mini: "Küçük (< 150m²)",
    medium: "Orta (150m² - 200m²)",
    large: "Büyük (> 200m²)",
    amenitiesTitle: "Özel Özellikler",
    terrace: "Teraslı",
    balcony: "Balkonlu"
  },
  ar: {
    floorsTitle: "عدد الطوابق",
    all: "الكل",
    oneFloor: "طابق واحد",
    twoFloors: "طابقين",
    areaTitle: "نطاق المساحة",
    mini: "صغير (< 150 م²)",
    medium: "متوسط (150 م² - 200 م²)",
    large: "كبير (> 200 م²)",
    amenitiesTitle: "ميزات خاصة",
    terrace: "مع تراس",
    balcony: "مع شرفة"
  },
  it: {
    floorsTitle: "Numero di Piani",
    all: "Tutti",
    oneFloor: "1 Piano",
    twoFloors: "2 Piani",
    areaTitle: "Intervallo Superficie",
    mini: "Piccolo (< 150m²)",
    medium: "Medio (150m² - 200m²)",
    large: "Grande (> 200m²)",
    amenitiesTitle: "Servizi Speciali",
    terrace: "Con Terrazza",
    balcony: "Con Balcone"
  },
  fr: {
    floorsTitle: "Nombre d'Étages",
    all: "Tout",
    oneFloor: "1 Étage",
    twoFloors: "2 Étages",
    areaTitle: "Gamme d'Espace",
    mini: "Petit (< 150m²)",
    medium: "Moyen (150m² - 200m²)",
    large: "Grand (> 200m²)",
    amenitiesTitle: "Caractéristiques Spéciales",
    terrace: "Avec Terrasse",
    balcony: "Avec Balcon"
  },
  de: {
    floorsTitle: "Anzahl der Etagen",
    all: "Alle",
    oneFloor: "1-stöckig",
    twoFloors: "2-stöckig",
    areaTitle: "Flächenbereich",
    mini: "Klein (< 150m²)",
    medium: "Mittel (150m² - 200m²)",
    large: "Groß (> 200m²)",
    amenitiesTitle: "Besondere Ausstattung",
    terrace: "Mit Terrasse",
    balcony: "Mit Balkon"
  },
  zh: {
    floorsTitle: "楼层数量",
    all: "全部",
    oneFloor: "1 层建筑",
    twoFloors: "2 层建筑",
    areaTitle: "面积范围",
    mini: "小型 (< 150m²)",
    medium: "中型 (150m² - 200m²)",
    large: "大型 (> 200m²)",
    amenitiesTitle: "特殊设施",
    terrace: "带露台",
    balcony: "带阳台"
  },
  ja: {
    floorsTitle: "階数",
    all: "すべて",
    oneFloor: "平屋 (1階建て)",
    twoFloors: "2階建て",
    areaTitle: "面積範囲",
    mini: "小型 (< 150m²)",
    medium: "中型 (150m² - 200m²)",
    large: "大型 (> 200m²)",
    amenitiesTitle: "特別設備",
    terrace: "テラス付き",
    balcony: "バルコニー付き"
  },
  hi: {
    floorsTitle: "मंजिलों की संख्या",
    all: "सभी",
    oneFloor: "1 मंजिल",
    twoFloors: "2 मंजिल",
    areaTitle: "क्षेत्रफल सीमा",
    mini: "छोटा (< 150m²)",
    medium: "मध्यम (150m² - 200m²)",
    large: "बड़ा (> 200m²)",
    amenitiesTitle: "विशेष सुविधाएं",
    terrace: "छत (टेरेस) के साथ",
    balcony: "बालकनी के साथ"
  }
};

export default function CatalogPage() {
  const { t, language } = useLanguage();
  // Normalize language to lowercase for consistent lookup
  const currentLang = (language || 'az').toLowerCase();
  // Currency configuration
  const currency = currencyConfig[currentLang as keyof typeof currencyConfig] || currencyConfig['en'];
  
  const formatPrice = (priceInUSD: number) => {
    const converted = priceInUSD * currency.rate;
    return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(converted)} ${currency.symbol}`;
  };

const formatCatalogPrice = (priceInAZN: number) => {
    return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(priceInAZN)} ₼`;
  };

  // Get project price using same logic as detail page
  const getProjectPriceAZN = (areaSqm: number) => {
    const totalUSD = calculateTotal(areaSqm, 'standart');
    return totalUSD * 1.70; // Convert to AZN
  };
  // Add defensive fallback to ensure we always have valid translations
  const translations = filterTranslations[currentLang as keyof typeof filterTranslations] || filterTranslations['az'];
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(6000000);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState('');
  const [selectedCompare, setSelectedCompare] = useState<(string | number)[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  // New advanced filters states
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [amenitiesFilters, setAmenitiesFilters] = useState<string[]>([]);

  const toggleProjectSelection = (projectId: string | number) => {
    if (selectedCompare.includes(projectId)) {
      setSelectedCompare(selectedCompare.filter(id => id !== projectId));
    } else if (selectedCompare.length < 3) {
      setSelectedCompare([...selectedCompare, projectId]);
    }
  };

  // Toggle amenities filter
  const toggleAmenity = (amenity: string) => {
    if (amenitiesFilters.includes(amenity)) {
      setAmenitiesFilters(amenitiesFilters.filter(a => a !== amenity));
    } else {
      setAmenitiesFilters([...amenitiesFilters, amenity]);
    }
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Original filters
      const matchStyle = selectedStyle === 'All' || project.architecturalStyle === selectedStyle;
      const matchPrice = project.basePriceUSD <= priceRange;
      
      // New floor count filter
      const matchFloors = floorFilter === 'all' || 
        (floorFilter === '1' && project.floors === 1) || 
        (floorFilter === '2' && project.floors === 2);
      
      // New area range filter
      let matchArea = areaFilter === 'all';
      if (areaFilter === 'mini' && project.areaSqm < 150) matchArea = true;
      if (areaFilter === 'orta' && project.areaSqm >= 150 && project.areaSqm <= 200) matchArea = true;
      if (areaFilter === 'boyuk' && project.areaSqm > 200) matchArea = true;
      
      // New amenities filter - robust keyword matching with fallback to layout2D
      const matchAmenities = amenitiesFilters.length === 0 || amenitiesFilters.every(amenity => {
        // Combine all localized description versions and layout2D for comprehensive search
        const allDescriptions = Object.values(project.description).join(' ');
        const allLayoutNames = project.layout2D?.map(room => Object.values(room.name).join(' ')).join(' ') || '';
        const searchText = (allDescriptions + allLayoutNames).toLowerCase();
        
        if (amenity === 'terasli') {
          return searchText.includes('teras') || searchText.includes('terasa') || searchText.includes('terrace') || searchText.includes('roof terrace');
        }
        if (amenity === 'eyvanli') {
          return searchText.includes('eyvan') || searchText.includes('balkon') || searchText.includes('balcony') || searchText.includes('veranda');
        }
        return true;
      });
      
      return matchStyle && matchPrice && matchFloors && matchArea && matchAmenities;
    });
  }, [selectedStyle, priceRange, floorFilter, areaFilter, amenitiesFilters]);

  const openLightbox = (imageUrl: string) => {
    setActiveLightboxImage(imageUrl);
    setIsLightboxOpen(true);
  };

  return (
    <div className={`min-h-screen bg-[#12161A] text-slate-200 ${language === 'AR' ? 'rtl' : 'ltr'}`}>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        
        {/* Navigation Breadcrumb back to Main Landing Page */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800/60 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">{t.catalog}</h1>
          <Link href="/" className="bg-[#1C232B] hover:bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            ← {t.home}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="bg-[#1C232B] p-6 rounded-2xl border border-slate-800/60 h-fit space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-gray-300">{t.archStyle}</h3>
              <select 
                value={selectedStyle} 
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-2 text-sm text-white focus:outline-none"
              >
                {archStyles.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.value === 'All' ? t.archStyle : style.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-gray-300">{t.priceRange}</h3>
              <input 
                type="range" min="300000" max="6000000" step="50000"
                value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="text-right text-xs text-amber-400 mt-1">{formatPrice(priceRange)}</div>
            </div>

            {/* Floors Filter */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-300">{translations.floorsTitle}</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: translations.all },
                  { value: '1', label: translations.oneFloor },
                  { value: '2', label: translations.twoFloors }
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="floorFilter"
                      value={option.value}
                      checked={floorFilter === option.value}
                      onChange={(e) => setFloorFilter(e.target.value)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span className="text-sm text-gray-400">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Area Range Filter */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-300">{translations.areaTitle}</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="area"
                    checked={areaFilter === 'all'}
                    onChange={() => setAreaFilter('all')}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="text-sm text-gray-400">{translations.all}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="area"
                    checked={areaFilter === 'mini'}
                    onChange={() => setAreaFilter('mini')}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="text-sm text-gray-400">{translations.mini}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="area"
                    checked={areaFilter === 'orta'}
                    onChange={() => setAreaFilter('orta')}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="text-sm text-gray-400">{translations.medium}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="area"
                    checked={areaFilter === 'boyuk'}
                    onChange={() => setAreaFilter('boyuk')}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="text-sm text-gray-400">{translations.large}</span>
                </label>
              </div>
            </div>

            {/* Amenities Filter */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-300">{translations.amenitiesTitle}</h3>
              <div className="space-y-2">
                {[
                  { value: 'terasli', label: translations.terrace },
                  { value: 'eyvanli', label: translations.balcony }
                ].map((amenity) => (
                  <label key={amenity.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenitiesFilters.includes(amenity.value)}
                      onChange={() => toggleAmenity(amenity.value)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span className="text-sm text-gray-400">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Grid View */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
             {filteredProjects.map((project) => (
               <div key={project.id} className={`bg-[#1C232B] border rounded-2xl overflow-hidden shadow-lg flex flex-col transition-all duration-300 ${selectedCompare.includes(project.id) ? 'border-amber-500 ring-2 ring-amber-500/50' : 'border-slate-800/60'}`}>
                 <div 
                   className="relative w-full h-48 bg-white overflow-hidden rounded-t-xl flex items-center justify-center cursor-zoom-in hover:opacity-90 transition-opacity"
                   onClick={() => openLightbox(project.thumbnail)}
                 >
                    {/* Floor Badge */}
                    <div className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-bold rounded z-10 ${project.floors === 1 ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                      {project.floors === 1 ? "1-ci Mərtəbə" : "2-ci Mərtəbə"}
                    </div>
                   {/* Comparison Toggle Button */}
                   <button
                     onClick={(e) => { e.stopPropagation(); toggleProjectSelection(project.id); }}
                     className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                       selectedCompare.includes(project.id) 
                         ? 'bg-amber-500 text-black shadow-lg' 
                         : 'bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm'
                     }`}
                   >
                     <input
                       type="checkbox"
                       checked={selectedCompare.includes(project.id)}
                       onChange={() => {}}
                       className="w-3.5 h-3.5 cursor-pointer accent-amber-500"
                     />
                     Müqayisə et
                   </button>
                   <img 
                     src={project.thumbnail} 
                     alt={project.name[currentLang.toUpperCase() as keyof typeof project.name]} 
                     className="w-full h-full object-contain object-center" 
                   />
                 </div>
                 <div className="p-5 flex flex-col flex-grow">
                   <h3 className="text-xl font-bold mb-1 text-white">{project.name[currentLang.toUpperCase() as keyof typeof project.name]}</h3>
                   <p className="text-xs text-gray-400 mb-4">{project.areaSqm} m² • {
                      currentLang === 'en' ? `${project.floors} ${project.floors === 1 ? 'Floor' : 'Floors'}` :
                      currentLang === 'tr' ? `${project.floors}. Kat` :
                      `${project.floors}-ci Mərtəbə`
                    }</p>
                   <div className="mt-auto flex justify-between items-center pt-2 border-t border-slate-800/60">
                      <span className="text-amber-500 font-bold">{formatCatalogPrice(getProjectPriceAZN(project.areaSqm))}</span>
                     <Link href={`/catalog/${project.id}`} className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                       {t.viewDetails} →
                     </Link>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <Lightbox
          isOpen={isLightboxOpen}
          imageUrl={activeLightboxImage}
          onClose={() => setIsLightboxOpen(false)}
          alt="Project Image"
        />

        {/* Floating Comparison Bar - only shows when projects are selected */}
        {selectedCompare.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 border border-gray-800 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl">
            <span className="text-white text-sm font-medium">{selectedCompare.length} layihə seçildi</span>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
            >
              Tərəziyə Çıxart ⚖️
            </button>
            <button
              onClick={() => setSelectedCompare([])}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Təmizlə
            </button>
          </div>
        )}

        {/* Fullscreen Comparison Modal */}
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm overflow-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Layihə Müqayisəsi</h2>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-4 px-6 text-gray-400 font-medium w-48">Xüsusiyyət</th>
                      {selectedCompare.map(id => {
                        const project = projectsData.find(p => p.id === id);
                        return project ? (
                          <th key={id} className="py-4 px-6 min-w-[250px]">
                            <div className="h-40 rounded-xl overflow-hidden mb-3">
                              <img src={project.thumbnail} alt={project.name[currentLang.toUpperCase() as keyof typeof project.name]} className="w-full h-full object-contain" />
                            </div>
                            <div className="text-white font-bold">{project.name[currentLang.toUpperCase() as keyof typeof project.name]}</div>
                          </th>
                        ) : null;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800/60">
                      <td className="py-4 px-6 text-gray-400">Sahə (m²)</td>
                      {selectedCompare.map(id => {
                        const project = projectsData.find(p => p.id === id);
                        return project ? (
                          <td key={id} className="py-4 px-6 text-white font-semibold">{project.areaSqm} m²</td>
                        ) : null;
                      })}
                    </tr>
                    <tr className="border-b border-slate-800/60">
                      <td className="py-4 px-6 text-gray-400">{translations.floorsTitle}</td>
                      {selectedCompare.map(id => {
                        const project = projectsData.find(p => p.id === id);
                        return project ? (
                          <td key={id} className="py-4 px-6 text-white font-semibold">{project.floors} mərtəbə</td>
                        ) : null;
                      })}
                    </tr>
                    <tr className="border-b border-slate-800/60">
                      <td className="py-4 px-6 text-gray-400">Arxitektura Stili</td>
                      {selectedCompare.map(id => {
                        const project = projectsData.find(p => p.id === id);
                        return project ? (
                          <td key={id} className="py-4 px-6 text-white font-semibold">{project.architecturalStyle}</td>
                        ) : null;
                      })}
                    </tr>
                    <tr className="border-b border-slate-800/60">
                      <td className="py-4 px-6 text-gray-400">Qiymət</td>
                      {selectedCompare.map(id => {
                        const project = projectsData.find(p => p.id === id);
                        return project ? (
                          <td key={id} className="py-4 px-6 text-amber-500 font-bold">{formatCatalogPrice(getProjectPriceAZN(project.areaSqm))}</td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 px-6"></td>
                      {selectedCompare.map(id => {
                        const project = projectsData.find(p => p.id === id);
                        return project ? (
                          <td key={id} className="py-4 px-6">
                            <Link
                              href={`/catalog/${project.id}`}
                              onClick={() => setIsCompareModalOpen(false)}
                              className="inline-block bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                            >
                              Detallara Bax →
                            </Link>
                          </td>
                        ) : null;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}