import React from 'react';

export default function ProjectPlanCard() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-950 text-white border border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-6 my-8 font-sans">
      
      {/* BAŞLIQ VƏ ÜMUMİ SAHƏ */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Memarlıq İşçi Cizimi</span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">REYHAN MODELİ</h2>
        </div>
        <div className="mt-3 md:mt-0 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl text-right">
          <span className="text-xs text-gray-400 block uppercase">Toplam Sahə</span>
          <span className="text-xl font-black text-amber-400">47 m²</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SOL TƏRƏF: TEXNİKİ GÖRÜNÜŞLƏR VƏ FAZALAR */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Cizim Bölmələri (CAD Görünüş Simulyasiyası) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">● Layihə Fasadları (Elevations)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl text-center">
                <div className="text-xs text-amber-500 font-mono mb-1">[ 585 cm ]</div>
                <div className="text-xs font-bold">ÖN GÖRÜNÜŞ</div>
                <div className="text-[10px] text-gray-500 uppercase">Front View</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl text-center">
                <div className="text-xs text-amber-500 font-mono mb-1">[ 888.5 cm ]</div>
                <div className="text-xs font-bold">ARKA GÖRÜNÜŞ</div>
                <div className="text-[10px] text-gray-500 uppercase">Back View</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl text-center">
                <div className="text-xs text-gray-400 font-mono mb-1">Yan Fasad</div>
                <div className="text-xs font-bold">SAĞ YAN GÖRÜNÜŞ</div>
                <div className="text-[10px] text-gray-500 uppercase">Right Side View</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl text-center">
                <div className="text-xs text-gray-400 font-mono mb-1">Yan Fasad</div>
                <div className="text-xs font-bold">SOL YAN GÖRÜNÜŞ</div>
                <div className="text-[10px] text-gray-500 uppercase">Left Side View</div>
              </div>
            </div>
          </div>

          {/* Kat Planı Blueprint Sahəsi */}
          <div className="border border-dashed border-gray-800 rounded-xl p-4 bg-gray-950/50 relative overflow-hidden flex flex-col justify-center items-center h-48">
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <span className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-1">Cizim Planı / Floor Plan</span>
            <div className="w-16 h-1 bg-amber-500/50 rounded mb-3"></div>
            <p className="text-xs text-center text-gray-400 max-w-xs px-4">
              [Antre → Salon-Mutfak → Banyo → Yatak Odası → Teras] memarlıq xətləri və ölçüləri (396.5 cm faza daxil olmaqla).
            </p>
          </div>
        </div>

        {/* SAĞ TƏRƏF: OTAQ EKSPLİKASİYASI VƏ SAHƏ CƏDVƏLİ */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* İç Məkan Bölgüləri */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">● Otaq Bölgüləri</h3>
            <div className="space-y-2">
              <div className="bg-gray-900/60 border border-gray-800/80 p-3 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold">Salon + Mətbəx</h4>
                  <p className="text-[11px] text-gray-400 uppercase">Living Room + Kitchen</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg text-xs font-mono font-bold">15 m²</span>
              </div>

              <div className="bg-gray-900/60 border border-gray-800/80 p-3 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold">Yataq Otağı</h4>
                  <p className="text-[11px] text-gray-400 uppercase">Bedroom</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg text-xs font-mono font-bold">13 m²</span>
              </div>

              <div className="bg-gray-900/60 border border-gray-800/80 p-3 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold">Banyo + Antre</h4>
                  <p className="text-[11px] text-gray-400 uppercase">Bathroom + Entry</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg text-xs font-mono font-bold">5 m² + 2 m²</span>
              </div>
            </div>
          </div>

          {/* Sahə İcmalı Smetası */}
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-2">
            <div className="flex justify-between text-xs text-gray-400 border-b border-gray-800 pb-1.5">
              <span>Brüt Məkan Alanı (Gross Area):</span>
              <span className="font-mono font-bold text-white">35 m²</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 border-b border-gray-800 pb-1.5">
              <span>Teras Sahəsi (Terrace):</span>
              <span className="font-mono font-bold text-white">12 m²</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1 text-emerald-400">
              <span>TOPLAM SAHƏ (Total Area):</span>
              <span className="font-mono">47 m²</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
