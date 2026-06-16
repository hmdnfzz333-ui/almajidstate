"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. DEFINE TYPES
export type Language = "AZ" | "EN" | "AR" | "RU" | "TR" | "IT" | "FR" | "DE" | "ZH" | "JA" | "HI";
type Translations = {
    [key: string]: { [lang in Language]: string };
};
interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: { [key: string]: string };
    formatPrice: (basePriceInUSD: number) => string;
}

// 2. DEFINE CURRENCY AND REGIONAL PRICING LOGIC
const currencySymbols: { [lang in Language]: string } = {
    AZ: "₼", TR: "₺", EN: "$", DE: "€", FR: "€", IT: "€",
    RU: "₽", AR: "د.إ", ZH: "¥", JA: "¥", HI: "₹",
};

const isoCurrencyCodes: { [lang in Language]: string } = {
    AZ: "AZN", TR: "TRY", EN: "USD", DE: "EUR", FR: "EUR", IT: "EUR",
    RU: "RUB", AR: "AED", ZH: "CNY", JA: "JPY", HI: "INR",
};

const exchangeRates: { [lang in Language]: number } = { // Simplified exchange rates to USD
    AZ: 1.7, TR: 32.5, EN: 1, DE: 0.92, FR: 0.92, IT: 0.92,
    RU: 92.5, AR: 3.67, ZH: 7.25, JA: 157, HI: 83.5,
};

const costMultipliers: { [lang in Language]: number } = { // Cost of living/construction multiplier
    AZ: 0.85, TR: 0.9, EN: 1.0, DE: 1.2, FR: 1.15, IT: 1.1,
    RU: 0.95, AR: 1.3, ZH: 1.05, JA: 1.25, HI: 0.8,
};

const formatPrice = (basePriceInUSD: number, language: Language): string => {
    const multiplier = costMultipliers[language];
    const rate = exchangeRates[language];
    const symbol = currencySymbols[language];
    const isoCode = isoCurrencyCodes[language];

    const finalPrice = basePriceInUSD * multiplier * rate;

    const formatter = new Intl.NumberFormat(language.toLowerCase() + '-' + language, {
        style: 'currency',
        currency: isoCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // A trick to use the right symbol without relying on possibly unsupported ISO codes
    return formatter.format(finalPrice).replace(formatter.formatToParts(0)[0].value, symbol + ' ');
};

// 2. CREATE TRANSLATIONS DICTIONARY
const translations: Translations = {
    logo: {
        AZ: "AlMajid Estate", EN: "AlMajid Estate", AR: "المجد العقارية", RU: "AlMajid Estate", TR: "AlMajid Estate", IT: "AlMajid Estate", FR: "AlMajid Estate", DE: "AlMajid Estate", ZH: "阿尔马吉德庄园", JA: "アルマジド・エステート", HI: "अलमाजिद एस्टेट"
    },
    home: {
        AZ: "Ana Səhifə", EN: "Home", AR: "الرئيسية", RU: "Главная", TR: "Anasayfa", IT: "Home", FR: "Accueil", DE: "Startseite", ZH: "首页", JA: "ホーム", HI: "होम"
    },
    catalog: {
        AZ: "Kataloq", EN: "Catalog", AR: "الكتالوج", RU: "Каталог", TR: "Katalog", IT: "Catalogo", FR: "Catalogue", DE: "Katalog", ZH: "目录", JA: "カタログ", HI: "कैटलॉग"
    },
    about: {
        AZ: "Haqqımızda", EN: "About Us", AR: "من نحن", RU: "О нас", TR: "Hakkımızda", IT: "Chi siamo", FR: "À propos", DE: "Über uns", ZH: "关于我们", JA: "会社概要", HI: "हमारे बारे में"
    },
    calcBtn: {
        AZ: "Smeta Hesabla", EN: "Estimate", AR: "احسب التكلفة", RU: "Смета", TR: "Keşif", IT: "Preventivo", FR: "Devis", DE: "Kostenvoranschlag", ZH: "预算", JA: "見積もり", HI: "अनुमान"
    },
    heroTag: {
        AZ: "Keyfiyyət və Zəriflik", EN: "Quality & Elegance", AR: "الجودة والأناقة", RU: "Качество и элегантность", TR: "Kalite ve Zarafet", IT: "Qualità ed Eleganza", FR: "Qualité et Élégance", DE: "Qualität & Eleganz", ZH: "品质与优雅", JA: "品質と優雅さ", HI: "गुणवत्ता और लालित्य"
    },
    heroTitle1: {
        AZ: "Xəyallarınızdakı Evi", EN: "The Home of Your Dreams", AR: "منزل أحلامك", RU: "Дом вашей мечты", TR: "Hayallerinizdeki Ev", IT: "La casa dei tuoi sogni", FR: "La maison de vos rêves", DE: "Das Heim Ihrer Träume", ZH: "您的梦想之家", JA: "夢のマイホーム", HI: "आपके सपनों का घर"
    },
    heroTitle2: {
        AZ: "Sıfırdan Inşa", EN: "Built From Scratch", AR: "نبنيه من الصفر", RU: "Строим с нуля", TR: "Sıfırdan İnşa Ediyoruz", IT: "Costruita da zero", FR: "Construite à partir de zéro", DE: "Von Grund auf neu gebaut", ZH: "从零开始", JA: "ゼロから築きます", HI: "शून्य से निर्मित"
    },
    heroDesc: {
        AZ: "Modern memarlıq və premium materiallarla keyfiyyətli həyat tərzinə addım atın.", EN: "Step into a quality lifestyle with modern architecture and premium materials.", AR: "ادخل إلى أسلوب حياة عالي الجودة مع العمارة الحديثة والمواد الفاخرة.", RU: "Шагните в качественный образ жизни с современной архитектурой и премиальными материалами.", TR: "Modern mimari ve birinci sınıf malzemelerle kaliteli bir yaşam tarzına adım atın.", IT: "Entra in uno stile di vita di qualità con architettura moderna e materiali di pregio.", FR: "Adoptez un style de vie de qualité avec une architecture moderne et des matériaux haut de gamme.", DE: "Treten Sie ein in einen hochwertigen Lebensstil mit moderner Architektur und hochwertigen Materialien.", ZH: "现代建筑和优质材料，带您迈入品质生活。", JA: "モダンな建築とプレミアムな素材で、質の高いライフスタイルを手に入れましょう。", HI: "आधुनिक वास्तुकला और प्रीमियम सामग्री के साथ एक गुणवत्तापूर्ण जीवन शैली में कदम रखें।"
    },
    catalogBtn: {
        AZ: "Kataloqa Keçid", EN: "View Catalog", AR: "عرض الكتالوج", RU: "Смотреть каталог", TR: "Kataloğu Görüntüle", IT: "Guarda il catalogo", FR: "Voir le catalogue", DE: "Katalog ansehen", ZH: "查看目录", JA: "カタログを見る", HI: "कैटलॉग देखें"
    },
    portfolioBtn: {
        AZ: "Portfolio", EN: "Portfolio", AR: "أعمالنا", RU: "Портфолио", TR: "Portfolyo", IT: "Portfolio", FR: "Portfolio", DE: "Portfolio", ZH: "作品集", JA: "ポートフォリオ", HI: "पोर्टफोलियो"
    },
    guaranteeTitle: {
        AZ: "Ömürlük Zəmanət", EN: "Lifetime Guarantee", AR: "ضمان مدى الحياة", RU: "Пожизненная гарантия", TR: "Ömür Boyu Garanti", IT: "Garanzia a vita", FR: "Garantie à vie", DE: "Lebenslange Garantie", ZH: "终身保证", JA: "生涯保証", HI: "आजीवन गारंटी"
    },
    guaranteeDesc: {
        AZ: "İnşa etdiyimiz hər bir evin keyfiyyətinə və davamlılığına tam zəmanət veririk.", EN: "We provide a full guarantee for the quality and durability of every home we build.", AR: "نحن نقدم ضمانًا كاملاً لجودة ومتانة كل منزل نقوم ببنائه.", RU: "Мы предоставляем полную гарантию на качество и долговечность каждого построенного нами дома.", TR: "İnşa ettiğimiz her evin kalitesi ve dayanıklılığı için tam bir garanti veriyoruz.", IT: "Offriamo una garanzia completa per la qualità e la durata di ogni casa che costruiamo.", FR: "Nous offrons une garantie complète pour la qualité et la durabilité de chaque maison que nous construisons.", DE: "Wir geben eine volle Garantie auf die Qualität und Langlebigkeit jedes von uns gebauten Hauses.", ZH: "我们为所建的每一栋房屋的质量和耐用性提供全面保证。", JA: "私たちが建てるすべての家の品質と耐久性を完全に保証します。", HI: "हम अपने द्वारा बनाए गए हर घर की गुणवत्ता और स्थायित्व के लिए पूरी गारंटी प्रदान करते हैं।"
    },
    timelineTitle: {
        AZ: "Dəqiq Vaxt Çərçivəsi", EN: "Precise Timeline", AR: "جدول زمني دقيق", RU: "Точные сроки", TR: "Kesin Zaman Çizelgesi", IT: "Tempistica precisa", FR: "Calendrier précis", DE: "Präziser Zeitplan", ZH: "精确的时间表", JA: "正確なタイムライン", HI: "सटीक समयरेखा"
    },
    timelineDesc: {
        AZ: "Layihələrinizi dəqiq planlaşdırılmış vaxt qrafiki ilə, gecikmə olmadan təhvil veririk.", EN: "We deliver your projects on a precisely planned schedule, without delays.", AR: "نسلم مشاريعك في جدول زمني محدد بدقة، دون تأخير.", RU: "Мы сдаем ваши проекты в точно запланированные сроки, без задержек.", TR: "Projelerinizi hassas bir şekilde planlanmış bir zaman çizelgesine göre, gecikme olmaksızın teslim ediyoruz.", IT: "Consegniamo i vostri progetti secondo un programma preciso, senza ritardi.", FR: "Nous livrons vos projets selon un calendrier précis, sans retards.", DE: "Wir liefern Ihre Projekte nach einem genau geplanten Zeitplan, ohne Verzögerungen.", ZH: "我们严格按照计划时间交付您的项目，绝无延误。", JA: "遅延なく、正確に計画されたスケジュールでプロジェクトをお届けします。", HI: "हम आपकी परियोजनाओं को एक सटीक नियोजित कार्यक्रम पर, बिना किसी देरी के वितरित करते हैं।"
    },
    materialsTitle: {
        AZ: "Yalnız Premium Materiallar", EN: "Only Premium Materials", AR: "مواد فاخرة فقط", RU: "Только премиум материалы", TR: "Sadece Premium Malzemeler", IT: "Solo materiali di pregio", FR: "Uniquement des matériaux de première qualité", DE: "Nur hochwertige Materialien", ZH: "只用优质材料", JA: "プレミアム素材のみ", HI: "केवल प्रीमियम सामग्री"
    },
    materialsDesc: {
        AZ: "Yalnız ən yüksək keyfiyyətli, sertifikatlı və ekoloji cəhətdən təmiz tikinti materiallarından istifadə edirik.", EN: "We use only the highest quality, certified, and environmentally friendly building materials.", AR: "نحن نستخدم فقط مواد البناء الأعلى جودة والمعتمدة والصديقة للبيئة.", RU: "Мы используем только самые качественные, сертифицированные и экологически чистые строительные материалы.", TR: "Sadece en yüksek kaliteli, sertifikalı ve çevre dostu yapı malzemeleri kullanıyoruz.", IT: "Utilizziamo solo materiali da costruzione di altissima qualità, certificati ed ecologici.", FR: "Nous utilisons uniquement des matériaux de construction de la plus haute qualité, certifiés et respectueux de l'environnement.", DE: "Wir verwenden nur die hochwertigsten, zertifizierten und umweltfreundlichen Baumaterialien.", ZH: "我们只使用最优质、经过认证且环保的建筑材料。", JA: "最高品質で認定済みの、環境に優しい建材のみを使用しています。", HI: "हम केवल उच्चतम गुणवत्ता, प्रमाणित, और पर्यावरण के अनुकूल निर्माण सामग्री का उपयोग करते हैं।"
    },
    filterTitle: {
        AZ: "Filterlər", EN: "Filters", AR: "عوامل التصفية", RU: "Фильтры", TR: "Filtreler", IT: "Filtri", FR: "Filtres", DE: "Filter", ZH: "筛选", JA: "フィルター", HI: "फ़िल्टर"
    },
    priceRange: {
        AZ: "Qiymət Aralığı", EN: "Price Range", AR: "نطاق السعر", RU: "Ценовой диапазон", TR: "Fiyat Aralığı", IT: "Fascia di prezzo", FR: "Gamme de prix", DE: "Preisspanne", ZH: "价格范围", JA: "価格帯", HI: "मूल्य सीमा"
    },
    archStyle: {
        AZ: "Memarlıq Stili", EN: "Architectural Style", AR: "النمط المعماري", RU: "Архитектурный стиль", TR: "Mimari Tarz", IT: "Stile architettonico", FR: "Style architectural", DE: "Architekturstil", ZH: "建筑风格", JA: "建築様式", HI: "वास्तुशैली"
    },
    floors: {
        AZ: "Mərtəbələr", EN: "Floors", AR: "الطوابق", RU: "Этажи", TR: "Katlar", IT: "Piani", FR: "Étages", DE: "Etagen", ZH: "楼层", JA: "階数", HI: "मंज़िल"
    },
    floorLabel: {
        AZ: "Mərtəbə", EN: "Floor(s)", AR: "طابق", RU: "Этаж(а)", TR: "Kat", IT: "Piano/i", FR: "Étage(s)", DE: "Etage(n)", ZH: "楼", JA: "階", HI: "मंज़िल"
    },
    viewDetails: {
        AZ: "Ətraflı Bax", EN: "View Details", AR: "عرض التفاصيل", RU: "Подробнее", TR: "Detayları Gör", IT: "Vedi dettagli", FR: "Voir les détails", DE: "Details anzeigen", ZH: "查看详情", JA: "詳細を見る", HI: "विवरण देखें"
    }
};

// 3. CREATE CONTEXT
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 4. CREATE PROVIDER
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [language, setLanguageState] = useState<Language>('AZ'); // Default language

    useEffect(() => {
        setIsMounted(true);
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && Object.keys(translations.home).includes(savedLanguage)) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang);
        }
    };

    const t = Object.keys(translations).reduce((acc, key) => {
        acc[key] = translations[key][language];
        return acc;
    }, {} as { [key: string]: string });

    const priceFormatter = (basePriceInUSD: number) => formatPrice(basePriceInUSD, language);

    if (!isMounted) {
        // Render nothing on the server to prevent hydration mismatch
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, formatPrice: priceFormatter }}>
            {children}
        </LanguageContext.Provider>
    );
};

// 5. CREATE CUSTOM HOOK
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};