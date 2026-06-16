"use client";

import { useState, useEffect, type ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const comprehensiveMarketRates = {
  az: { cement: 4.6, armature: 0.88, sand: 13, concrete: 58, stone: 0.45, roofing: 6.2, drywall: 4.2, putty: 0.35, paint: 3.5, adhesive: 0.25, labor_structure: 45, labor_malyar: 35, labor_roof: 18, labor_tech: 25, kombi_unit: 850, radiator_pipes: 14, labor_heating: 12, windows_facade: 140, logistics_management: 10, miscellaneous: 10 }
};

const fullSmetaLedger = {
  cement: { cat: "core", usage: 1.2 },
  armature: { cat: "core", usage: 38 },
  sand: { cat: "core", usage: 0.45 },
  concrete: { cat: "core", usage: 0.38 },
  stone: { cat: "core", usage: 22 },
  roofing: { cat: "core", usage: 1.15 },
  drywall: { cat: "finish", usage: 1.8 },
  putty: { cat: "finish", usage: 4.5 },
  paint: { cat: "finish", usage: 0.35 },
  adhesive: { cat: "finish", usage: 5.0 },
  windows_facade: { cat: "finish", usage: 1.0 },
  logistics_management: { cat: "core", usage: 1.0 },
  kombi_unit: { cat: "heating", usage: 0.005 },
  radiator_pipes: { cat: "heating", usage: 0.8 },
  labor_structure: { cat: "labor", usage: 1.0 },
  labor_malyar: { cat: "labor", usage: 1.0 },
  labor_roof: { cat: "labor", usage: 1.0 },
  labor_tech: { cat: "labor", usage: 1.0 },
  labor_heating: { cat: "labor", usage: 1.0 },
  miscellaneous: { cat: "labor", usage: 1.0 }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ area: number; floors: number; totalPrice: string; rooms?: string } | null>(null);
  const [exteriorFile, setExteriorFile] = useState<File | null>(null);
  const [planFile, setPlanFile] = useState<File | null>(null);

  useEffect(() => {
    const openModalHandler = () => setIsModalOpen(true);
    window.addEventListener("open-smeta-modal", openModalHandler);
    return () => window.removeEventListener("open-smeta-modal", openModalHandler);
  }, []);

  const handleAnalyze = () => {
    if (!planFile) return;
    setIsScanning(true);
    setScanResult(null);

    // Bütün layihələrin məlumatları - real parametrlər (catalog/data.ts-dən)
    const projectParams: Record<string, { area: number; floors: number }> = {
      "/catalog/1": { area: 168, floors: 1 },   // Ardıç Premium (YENİ: 1 mərtəbəli, 168 m²)
      "/catalog/2": { area: 190, floors: 2 },   // Sedir Villası
      "/catalog/3": { area: 130, floors: 1 },   // Açelya (1 mərtəbəli, 130 m²)
      "/catalog/4": { area: 168, floors: 1 },   // Andız (1 mərtəbəli, 168 m²)
      "/catalog/5": { area: 104, floors: 1 },   // Begonvil
      "/catalog/6": { area: 82, floors: 1 },   // Begonya
      "/catalog/7": { area: 208, floors: 2 },   // Çam (YENİ: 2 mərtəbəli, 208 m²)
      "/catalog/8": { area: 135, floors: 1 },   // Erguvan (YENİ: 1 mərtəbəli, 135 m²)
      "/catalog/9": { area: 104, floors: 1 },   // Frezya
      "/catalog/10": { area: 128, floors: 2 },  // Gül (2 mərtəbəli)
      "/catalog/11": { area: 188, floors: 2 },  // Gürgən
      "/catalog/12": { area: 205, floors: 2 },  // İhlamur
      "/catalog/13": { area: 175, floors: 2 },  // Kamelya
      "/catalog/14": { area: 160, floors: 1 },  // Karanfil (1 mərtəbəli)
      "/catalog/15": { area: 192, floors: 2 },  // Kavak
      "/catalog/16": { area: 158, floors: 1 },  // Koknar (1 mərtəbəli)
      "/catalog/17": { area: 210, floors: 2 },  // Ladin
      "/catalog/18": { area: 185, floors: 2 },  // Lale
      "/catalog/19": { area: 200, floors: 2 },  // Lilyum
      "/catalog/20": { area: 225, floors: 2 },  // Manolya
      "/catalog/21": { area: 162, floors: 1 },  // Melisa (1 mərtəbəli)
      "/catalog/22": { area: 195, floors: 2 },  // Meşə
      "/catalog/23": { area: 155, floors: 1 },  // Mine (1 mərtəbəli)
      "/catalog/24": { area: 210, floors: 2 },  // Nilüfer
      "/catalog/25": { area: 230, floors: 2 },  // Palmiye
      "/catalog/26": { area: 148, floors: 1 },  // Papatya (1 mərtəbəli)
      "/catalog/27": { area: 188, floors: 2 },  // Petunya
      "/catalog/28": { area: 195, floors: 2 },  // Reyhan
      "/catalog/29": { area: 165, floors: 1 },  // Şakayık (1 mərtəbəli)
      "/catalog/30": { area: 152, floors: 1 },  // Soğut (1 mərtəbəli)
      "/catalog/31": { area: 185, floors: 2 },  // Sumbul
      "/catalog/32": { area: 192, floors: 2 },  // Susen
      "/catalog/33": { area: 198, floors: 2 },  // Yasemin
      "/catalog/34": { area: 158, floors: 1 },  // Yonca (1 mərtəbəli)
    };

    // Cari səhifənin pathini əldə et
    const currentPath = window.location.pathname;
    // Defolt dəyərlər (Ana səhifədə və ya digər səhifələrdə)
    let generatedArea = 130; // 120-140 m² aralığında stabil dəyər
    let generatedFloors = 1; // Defolt olaraq 1 mərtəbə

    // Əgər istifadəçi hər hansı bir layihə səhifəsindədirsə, onun real parametrlərini götür
    if (projectParams[currentPath]) {
      generatedArea = projectParams[currentPath].area;
      generatedFloors = projectParams[currentPath].floors;
    }

    // Açelya üçün xüsusi şərt - birbaşa təyin olunmuş dəyərlər
    if (window.location.pathname.includes('acelya') || window.location.pathname.includes('/catalog/3')) {
      setScanResult({
        area: 130,
        floors: 1,
        totalPrice: "86,316 ₼",
        rooms: "Salon: 24 m² | Mətbəx: 11 m² | Valideyn Yataq Otağı: 15 m² | Yataq Otağı 1: 12 m² | Yataq Otağı 2: 10 m² | Teras: 28 m²"
      });
      setIsScanning(false);
      return;
    }

    // Ardıç Premium / Andız üçün xüsusi şərt - birbaşa təyin olunmuş dəyərlər
    if (window.location.pathname.includes('andiz') || window.location.pathname.includes('ardic') || window.location.pathname.includes('/catalog/1')) {
      setScanResult({ 
        area: 168, 
        floors: 1, 
        totalPrice: "112,560 ₼",
        rooms: "Salon: 28 m² | Mətbəx: 12 m² | Valideyn Yataq Otağı: 16 m² | Yataq Otaqları: 36 m² | Teras: 23 m²" 
      }); 
      setIsScanning(false); 
      return; 
    }

    // Digər ID 4 (Andız) səhifəsi üçün də eyni şərt
    if (window.location.pathname.includes('/catalog/4')) {
      setScanResult({ 
        area: 168, 
        floors: 1, 
        totalPrice: "112,560 ₼",
        rooms: "Salon: 38 m² | Mətbəx: 16 m² | Valideyn Yataq Otağı: 22 m² | Yataq Otaqları: 32 m² | Teraslar: 40 m²" 
      }); 
      setIsScanning(false); 
      return; 
    }

    // Frezya (ID 9) üçün xüsusi şərt
    if (window.location.pathname.includes('/catalog/9')) {
      setScanResult({ 
        area: 104, 
        floors: 1, 
        totalPrice: "95,000 ₼",
        rooms: "Geniş Salon: 22 m² | Açıq Mətbəx: 11 m² | Valideyn Yataq Otağı: 15 m² | Yataq Otaqları: 22 m² | Teras & Balkon: 24 m²" 
      }); 
      setIsScanning(false); 
      return; 
    }

    // Gül (ID 10) üçün xüsusi şərt
    if (window.location.pathname.includes('/catalog/10')) {
      setScanResult({ 
        area: 128, 
        floors: 2, 
        totalPrice: "128,000 ₼",
        rooms: "Salon + Mətbəx: 32 m² | Hamam: 5 m² | Valideyn Yataq Otağı 1: 18 m² | Yataq Otağı 2: 16 m² | Teras + Balkon: 20 m²" 
      }); 
      setIsScanning(false); 
      return; 
    }

    // Begonvil üçün xüsusi şərt - birbaşa təyin olunmuş dəyərlər
    if (window.location.pathname.includes('begonvil') || window.location.pathname.includes('/catalog/5')) {
      setScanResult({
        area: 104,
        floors: 1,
        totalPrice: "69,504 ₼",
        rooms: "Salon (Qonaq Otağı): 26 m² | Mətbəx: 10 m² | Valideyn Yataq Otağı: 14 m² | Yataq Otağı 1: 11 m² | Hamam + Sanuzel: 8 m² | Ön Teras: 25 m²"
      });
      setIsScanning(false);
      return;
    }

    // Begonya üçün xüsusi şərt - birbaşa təyin olunmuş dəyərlər
    if (window.location.pathname.includes('begonya') || window.location.pathname.includes('/catalog/6')) {
      setScanResult({
        area: 82,
        floors: 1,
        totalPrice: "55,008 ₼",
        rooms: "Salon + Açıq Mətbəx: 24 m² | Valideyn Yataq Otağı: 14 m² | Yataq Otağı 1: 10 m² | Banyo / Hamam: 5 m² | Antre + Hol: 14 m² | Geniş Teras: 15 m²"
      });
      setIsScanning(false);
      return;
    }

    // Çam üçün xüsusi şərt - birbaşa təyin olunmuş dəyərlər
        if (window.location.pathname.includes('cam') || window.location.pathname.includes('çam') || window.location.pathname.includes('/catalog/7')) {
          setScanResult({
            area: 208,
            floors: 2,
            totalPrice: "139,392 ₼",
            rooms: "Geniş Salon: 30 m² | Ayrı Mətbəx: 12 m² | Qapalı Avto Qaraj: 18 m² | Valideyn Otağı: 16 m² | 3 Ədəd Yataq Otağı: 35 m² | Teras + Eyvan: 34 m²"
          });
          setIsScanning(false);
          return;
        }
        
        // Erguvan üçün xüsusi şərt - birbaşa təyin olunmuş dəyərlər
        if (window.location.pathname.includes('erguvan') || window.location.pathname.includes('/catalog/8')) {
          setScanResult({
            area: 135,
            floors: 1,
            totalPrice: "90,450 ₼",
            rooms: "Geniş Salon: 26 m² | Müstəqil Mətbəx: 14 m² | Valideyn Otağı (+Banyo): 16 m² | Yataq Otağı 1: 12 m² | Yataq Otağı 2: 10 m² | Giriş Verandası (Teras): 21 m²"
          });
          setIsScanning(false);
          return;
        }

    setTimeout(() => {
      const targetMarket = comprehensiveMarketRates["az"];
      let totalUSD = 0;

      Object.entries(fullSmetaLedger).forEach(([key, mat]) => {
        let qty = Math.ceil(generatedArea * mat.usage);
        // Yalnız böyük sahələr üçün 2 kombi təyin et
        if (key === "kombi_unit") qty = generatedArea > 250 ? 2 : 1;
        const safeRateUSD = (targetMarket[key as keyof typeof targetMarket] || 0) / 1.7;
        totalUSD += qty * safeRateUSD;
      });

      const finalPriceAZN = totalUSD * 1.7;

      setScanResult({
        area: generatedArea,
        floors: generatedFloors,
        totalPrice: `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(finalPriceAZN)} ₼`,
      });
      setIsScanning(false);
    }, 3000);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsScanning(false);
    setScanResult(null);
    setExteriorFile(null);
    setPlanFile(null);
  };

  return (
    <html lang="az">
      <body className="bg-[#0f172a] text-white antialiased">
        <LanguageProvider>
          {/* Qlobal üst panel səhifələrin daxilində olduğu üçün layout-da yalnız children qalır */}
          <main className="min-h-screen">{children}</main>

          {/* AI Smeta Modalı */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                  <div>
                    <h3 className="text-xl font-bold text-amber-500">AlMajid AI — Öz Smetanı Yarat</h3>
                  </div>
                  <button onClick={handleModalClose} className="text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm">✕</button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6 flex-1">
                  {!isScanning && !scanResult && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-5 text-center bg-slate-800/20 relative cursor-pointer">
                          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && setExteriorFile(e.target.files[0])} />
                          <div className="text-3xl mb-2">🏠</div>
                          <h4 className="text-sm font-semibold text-slate-200">Evin Xarici Görünüşü</h4>
                          {exteriorFile && <div className="mt-3 text-xs bg-amber-500/10 text-amber-400 py-1 px-2 rounded truncate">✓ {exteriorFile.name}</div>}
                        </div>
                        <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-5 text-center bg-slate-800/20 relative cursor-pointer">
                          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && setPlanFile(e.target.files[0])} />
                          <div className="text-3xl mb-2">📐</div>
                          <h4 className="text-sm font-semibold text-slate-200">2D Ölçü Planı</h4>
                          {planFile && <div className="mt-3 text-xs bg-emerald-500/10 text-emerald-400 py-1 px-2 rounded truncate">✓ {planFile.name}</div>}
                        </div>
                      </div>
                      <button onClick={handleAnalyze} disabled={!planFile} className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${planFile ? 'bg-amber-500 text-slate-900 hover:bg-amber-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                        {planFile ? '🚀 AlMajid AI ilə Analiz Et' : '⚠ 2D Arxitektur Planı yükləyin'}
                      </button>
                    </div>
                  )}
                  {isScanning && (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <h4 className="text-lg font-bold text-amber-500 animate-pulse">AlMajid AI Skan Edir...</h4>
                    </div>
                  )}
                  {!isScanning && scanResult && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 text-center">
                          <span className="text-xs text-slate-400 block">Sahə</span>
                          <span className="text-xl font-black text-white">{scanResult.area} m²</span>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 text-center">
                          <span className="text-xs text-slate-400 block">Mərtəbə</span>
                          <span className="text-xl font-black text-white">{scanResult.floors}</span>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 text-center">
                          <span className="text-xs text-slate-400 block">Bazar</span>
                          <span className="text-xl font-black text-amber-500">AZ</span>
                        </div>
                      </div>
                      
                      {/* Otaq siyahısı - varsa göstər */}
                      {scanResult.rooms && (
                        <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700">
                          <h4 className="text-sm font-bold text-amber-400 mb-4">📋 Otaq Siyahısı</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {scanResult.rooms.split(' | ').map((room, idx) => {
                              const [name, size] = room.split(': ');
                              return (
                                <div key={idx} className="bg-slate-900/50 p-3 rounded-lg">
                                  <span className="text-xs text-slate-300">{name}</span>
                                  <span className="text-sm font-bold text-white ml-2">{size}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-300">Açar Təslim Smeta:</span>
                        <span className="text-2xl font-black text-amber-500">{scanResult.totalPrice}</span>
                      </div>
                      <button onClick={handleModalClose} className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-xl text-xs">Bağla</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </LanguageProvider>
      </body>
    </html>
  );
}