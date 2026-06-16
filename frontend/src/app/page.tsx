"use client";

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ChatBot } from '@/components/ChatBot';

export default function HomePage() {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#12161A] text-slate-200">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80)' }}
        ></div>
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#12161A]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {language === 'AZ' ? 'Memarlıq Sənəti' : 
                language === 'EN' ? 'The Art of Architecture' :
                language === 'RU' ? 'Искусство Архитектуры' :
                'Mimarlık Sanatı'}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed">
              {language === 'AZ' ? 'AlMajid Estate — lüks və müasir yaşayış layihələri. Hər bir layihəmiz keyfiyyət, innovasiya və estetikaya əsaslanır.' :
                language === 'EN' ? 'AlMajid Estate — luxury and modern living projects. Every project is based on quality, innovation, and aesthetics.' :
                language === 'RU' ? 'AlMajid Estate — роскошные и современные жилые проекты. Каждый проект основан на качестве, инновациях и эстетике.' :
                'AlMajid Estate — lüks ve modern yaşam projeleri. Her projemiz kalite, yenilik ve estetik üzerine dayanmaktadır.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/catalog" 
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-300 text-center text-lg"
              >
                {t.catalog || 'Kataloqa Bax'}
              </Link>
              <button className="px-8 py-4 border-2 border-slate-600 hover:border-slate-400 text-white font-semibold rounded-xl transition-all duration-300 text-center text-lg">
                {language === 'AZ' ? 'Əlaqə Saxla' :
                 language === 'EN' ? 'Contact Us' :
                 language === 'RU' ? 'Связаться с нами' :
                 'Bize Ulaşın'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="p-8 bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🏗️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'AZ' ? 'Peşəkar Komanda' :
               language === 'EN' ? 'Professional Team' :
               language === 'RU' ? 'Профессиональная команда' :
               'Profesyonel Ekip'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'AZ' ? 'Təcrübəli memar və mühəndislərdən ibarət komanda hər layihəni mükəmməl həyata keçirir.' :
               language === 'EN' ? 'Our team of experienced architects and engineers delivers every project to perfection.' :
               language === 'RU' ? 'Наша команда опытных архитекторов и инженеров реализует каждый проект идеально.' :
               'Deneyimli mimar ve mühendislerden oluşan ekibiz her projeyi mükemmel şekilde hayata geçirir.'}
            </p>
          </div>
          
          <div className="p-8 bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'AZ' ? 'Müasir Dizayn' :
               language === 'EN' ? 'Modern Design' :
               language === 'RU' ? 'Современный дизайн' :
               'Modern Tasarım'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'AZ' ? 'Hər layihə ən son memarlıq trendlərinə uyğun olaraq dizayn edilir.' :
               language === 'EN' ? 'Every project is designed in line with the latest architectural trends.' :
               language === 'RU' ? 'Каждый проект разрабатывается в соответствии с последними архитектурными трендами.' :
               'Her proje en son mimari trendlere uygun olarak tasarlanmaktadır.'}
            </p>
          </div>
          
          <div className="p-8 bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'AZ' ? 'Şəffaf Qiymətləndirmə' :
               language === 'EN' ? 'Transparent Pricing' :
               language === 'RU' ? 'Прозрачные цены' :
               'Şeffaf Fiyatlandırma'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'AZ' ? 'Hər bir layihə üçün ətraflı smeta və xərc hesablaması təqdim edirik.' :
               language === 'EN' ? 'We provide detailed cost estimates and calculations for every project.' :
               language === 'RU' ? 'Мы предоставляем подробные сметы и расчеты стоимости для каждого проекта.' :
               'Her proje için detaylı maliyet analizi ve hesaplamalar sunuyoruz.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-500/10 to-slate-800/50 py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'AZ' ? 'Xəyaldındakı evi qurmağa başla' :
             language === 'EN' ? 'Start building your dream home' :
             language === 'RU' ? 'Начните строить дом своей мечты' :
             'Hayalindeki evi inşa etmeye başla'}
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            {language === 'AZ' ? 'Kataloğumuza göz at və sizin üçün ən uyğun layihəni seç.' :
             language === 'EN' ? 'Browse our catalog and choose the perfect project for you.' :
             language === 'RU' ? 'Просмотрите наш каталог и выберите идеальный проект для себя.' :
             'Kataloğumuza göz atın ve sizin için mükemmel projeyi seçin.'}
          </p>
          <Link 
            href="/catalog"
            className="inline-block px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-300 text-lg"
          >
            {language === 'AZ' ? 'Kataloqu Kəşf Et' :
             language === 'EN' ? 'Explore Catalog' :
             language === 'RU' ? 'Исследовать каталог' :
             'Kataloğu Keşfet'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-500 mb-4 md:mb-0">
              © 2026 AlMajid Estate. {language === 'AZ' ? 'Bütün hüquqlar qorunur.' :
                language === 'EN' ? 'All rights reserved.' :
                language === 'RU' ? 'Все права защищены.' :
                'Tüm hakları saklıdır.'}
            </div>
            <div className="flex gap-6">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">{t?.home || 'Ana Səhifə'}</Link>
              <Link href="/catalog" className="text-slate-400 hover:text-white transition-colors">{t?.catalog || 'Kataloq'}</Link>
            </div>
          </div>
        </div>
      </footer>
      
      <ChatBot />
    </div>
  );
}