"use client";

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              AlMajid Estate — Gələcəyin Memarlıq Aləmi
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Biz sadəcə evlər tikmirik, biz sizin xəyallarınızdakı lüks və modern yaşam sahələrini reallığa çeviririk. 
              AlMajid Estate, ən qabaqcıl memarlıq sənəti ilə süni intellekt texnologiyalarını birləşdirən unikal bir platformadır.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">Üstünlüklərimiz</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="p-10 bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/60 hover:border-amber-500/60 transition-all duration-500 hover:transform hover:-translate-y-3">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <span className="text-4xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">İntellektual AI Smetası</h3>
            <p className="text-slate-400 leading-relaxed text-center">
              Müştərilərimiz öz 2D çertyojlarını yükləyərək saniyələr daxilində real bazar qiymətləri ilə açar təslim tikinti xərclərini hesablaya bilərlər.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-10 bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/60 hover:border-amber-500/60 transition-all duration-500 hover:transform hover:-translate-y-3">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <span className="text-4xl">🏛️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Premium Memarlıq Sənəti</h3>
            <p className="text-slate-400 leading-relaxed text-center">
              Hər bir layihəmiz (məsələn, Ardıç Premium, Sedir Villası) funksionallıq, estetika və ekoloji standartların mükəmməl harmoniyasıdır.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-10 bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/60 hover:border-amber-500/60 transition-all duration-500 hover:transform hover:-translate-y-3">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <span className="text-4xl">🔐</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Şəffaflıq və Güvən</h3>
            <p className="text-slate-400 leading-relaxed text-center">
              Material xərclərindən tutmuş usta işçiliyinə qədər hər bir detal tam dəqiqliklə təqdim olunur, gizli xərclərə yol verilmir.
            </p>
          </div>
        </div>
      </section>

      {/* Team/Mission Section */}
      <section className="bg-gradient-to-r from-amber-500/10 to-slate-800/50 py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Missiyamız</h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              AlMajid Estate olaraq missiyamız hər bir insanın xəyallarındakı evə sahib olmasını asanlaşdırmaqdır. 
              Texnologiyanın gücü ilə memarlığın sənətini birləşdirərək, tikinti prosesini şəffaf, əlçatan və innovativ etməkdə çalışırıq.
            </p>
            <Link 
              href="/catalog"
              className="inline-block px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-300 text-lg"
            >
              Layihələrimizi kəşf edin
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-500 mb-4 md:mb-0">
              © 2026 AlMajid Estate. Bütün hüquqlar qorunur.
            </div>
            <div className="flex gap-8">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors text-lg">Ana Səhifə</Link>
              <Link href="/catalog" className="text-slate-400 hover:text-white transition-colors text-lg">Kataloq</Link>
              <Link href="/about" className="text-amber-500 font-medium">Haqqımızda</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}