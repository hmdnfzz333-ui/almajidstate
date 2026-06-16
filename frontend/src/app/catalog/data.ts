// frontend/src/app/catalog/data.ts

import { Language } from "@/context/LanguageContext";

export interface LocalizedString {
  AZ: string;
  EN: string;
  RU: string;
}

export interface RoomLayout {
  name: LocalizedString | string;
  size: number;
  dimensions: string;
}

export type GalleryType = string[] | { exterior: string[]; interior: string[] };

export interface Project {
  id: number | string;
  name: LocalizedString | string;
  description: LocalizedString | string;
  architecturalStyle: string;
  floors: number;
  bedrooms?: number;
  areaSqm: number;
  basePriceUSD: number;
  thumbnail: string;
  view3D: string;
  sketch2D: string;
  gallery: GalleryType;
  layout2D: RoomLayout[];
  amenities?: {
    hasBalcony: boolean;
    hasTerrace: boolean;
    openKitchen: boolean;
    hasGarage?: boolean;
  };
}

// Projects mapped to local assets in frontend/public/projects/
// thumbnail & view3D = exterior house image, sketch2D = floor plan (where available)
export const projectsData: Project[] = [
  {
    id: "classic",
    name: { AZ: "Classic", EN: "Classic", RU: "Классический" },
    description: { 
      AZ: "Klassik memarlıq üslubu ilə modern rahatlığı birləşdirən ideal ailə villası.",
      EN: "An ideal family villa combining classic architectural style with modern comfort.",
      RU: "Идеальная семейная вилла, сочетающая классический архитектурный стиль с современным комфортом."
    },
    architecturalStyle: "Classic",
    floors: 2,
    bedrooms: 3,
    areaSqm: 112,
    basePriceUSD: 95000,
    thumbnail: "/projects/classic.png",
    view3D: "/projects/classic.png",
    sketch2D: "/projects/classic-plan.png",
    gallery: { exterior: ["/projects/classic.png"], interior: ["/projects/classic.png"] },
    amenities: { hasBalcony: true, hasTerrace: true, openKitchen: true },
    layout2D: [
      { 
        name: { AZ: "1-ci Mərtəbə: Mətbəx-Qonaq Otağı", EN: "1st Floor: Kitchen-Living Room", RU: "1 этаж: Кухня-Гостиная" }, 
        size: 45, 
        dimensions: "45 m²" 
      },
      { 
        name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, 
        size: 15, 
        dimensions: "15 m²" 
      },
      { 
        name: { AZ: "2-ci Mərtəbə: Valideyn Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, 
        size: 22, 
        dimensions: "22 m²" 
      },
      { 
        name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, 
        size: 14, 
        dimensions: "14 m²" 
      },
      { 
        name: { AZ: "Xarici Sahə: Geniş Teras", EN: "Outdoor: Large Terrace", RU: "Открытое пространство: Большая терраса" }, 
        size: 16, 
        dimensions: "16 m²" 
      }
]
   },
   {
     id: 2,
      name: { AZ: "Ardıç", EN: "Ardic", RU: "Ардич" },
     description: { AZ: "Klassik və lüks 2 mərtəbəli modul villa.", EN: "A classic and luxury two-story modular villa.", RU: "Классическая и роскошная двухэтажная модульная вилла." },
     architecturalStyle: "Classic",
     floors: 2,
     areaSqm: 120,
    basePriceUSD: 115000,
    thumbnail: "/projects/ardic.png",
    view3D: "/projects/ardic.png",
    sketch2D: "/projects/ardic-plan.png",
    gallery: ["/projects/ardic.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 25, dimensions: "6.3m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Mətbəx", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 5, dimensions: "2.0m x 2.5m" },
       { name: { AZ: "1-ci Mərtəbə: Antre", EN: "1st Floor: Entrance", RU: "1 этаж: Вход" }, size: 8, dimensions: "2.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 18, dimensions: "4.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Banyo", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "2-ci Mərtəbə: Balkon", EN: "2nd Floor: Balcony", RU: "2 этаж: Балкон" }, size: 6, dimensions: "1.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 8, dimensions: "2.0m x 4.0m" }
     ]
},
    {
      id: 2,
      name: { AZ: "Gürgən", EN: "Gurgen", RU: "Гурген" },
      description: { AZ: "Geniş terası, eyvanı və erqonomik iki mərtəbəli daxili planı ilə ailəvi yaşayış üçün ideal modul villa.", EN: "An ideal modular villa for family living with a large terrace, balcony, and ergonomic two-story layout.", RU: "Идеальная модульная вилла для семейного проживания с большой террасой, балконом и эргономичной двухэтажной планировкой." },
      architecturalStyle: "Traditional",
      floors: 2,
      bedrooms: 3,
      areaSqm: 86,
      basePriceUSD: 148000,
      thumbnail: "/projects/gurgen.png",
      view3D: "/projects/gurgen.png",
      sketch2D: "/projects/gurgen-plan.png",
      gallery: ["/projects/gurgen.png"],
      amenities: { hasBalcony: true, hasTerrace: true, openKitchen: true },
      layout2D: [
        { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 35, dimensions: "8.8m x 4.0m" },
        { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, size: 12, dimensions: "3.0m x 4.0m" },
        { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 2", EN: "1st Floor: Bedroom 2", RU: "1 этаж: Спальня 2" }, size: 10, dimensions: "2.5m x 4.0m" },
        { name: { AZ: "1-ci Mərtəbə: Banyo", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 5, dimensions: "2.0m x 2.5m" },
        { name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 6, dimensions: "2.0m x 3.0m" },
        { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 18, dimensions: "4.5m x 4.0m" },
        { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 14, dimensions: "3.5m x 4.0m" },
        { name: { AZ: "2-ci Mərtəbə: Banyo", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
        { name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 7, dimensions: "2.0m x 3.5m" }
      ]
    },
   {
id: "ihlamur" as any,
     name: { AZ: "Ihlamur", EN: "Ihlamur", RU: "Ihlamur" },
     description: { 
       AZ: "Bamboo və doğal materiallərlə lüks villa konsepti.",
       EN: "Luxury villa concept with bamboo and natural materials.",
       RU: "Концепция роскошной виллы с бамбуком и натуральными материалами."
     },
     architecturalStyle: "Traditional",
     floors: 1,
     areaSqm: 109,
    basePriceUSD: 152000,
    thumbnail: "/projects/ihlamur.png",
    view3D: "/projects/ihlamur.png",
    sketch2D: "/projects/ihlamur-plan.png",
gallery: { exterior: ["/projects/ihlamur.png"], interior: ["/projects/ihlamur.png"] },
     layout2D: [
       { name: { AZ: "Salon + Mətbəx", EN: "Living Room + Kitchen", RU: "Гостиная + Кухня" }, size: 40, dimensions: "5.5m x 7.3m" },
       { name: { AZ: "Yataq Otağı 1", EN: "Bedroom 1", RU: "Спальня 1" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "Yataq Otağı 2", EN: "Bedroom 2", RU: "Спальня 2" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "Master Yataq Otağı", EN: "Master Bedroom", RU: "Главная спальня" }, size: 18, dimensions: "4.5m x 4.0m" },
       { name: { AZ: "Hamam 1", EN: "Bathroom 1", RU: "Ванная 1" }, size: 6, dimensions: "3.0m x 2.0m" },
       { name: { AZ: "Hamam 2", EN: "Bathroom 2", RU: "Ванная 2" }, size: 5, dimensions: "2.5m x 2.0m" },
       { name: { AZ: "Hol", EN: "Hallway", RU: "Коридор" }, size: 10, dimensions: "2.5m x 4.0m" }
     ]
  },
  {
id: "kamelya",
     name: { AZ: "Kamelya", EN: "Kamelya", RU: "Kamelya" },
     description: { AZ: "Miniatür və lüks əlçatımlılığı olan eksklüziv mənzil.", EN: "Exclusive apartment with miniature and luxury accessibility.", RU: "Эксклюзивная квартира с миниатюрной и роскошной доступностью." },
     architecturalStyle: "A-Frame",
     floors: 2,
     areaSqm: 100,
    basePriceUSD: 145000,
    thumbnail: "/projects/kamelya.png",
    view3D: "/projects/kamelya.png",
    sketch2D: "/projects/kamelya-plan.png",
    gallery: ["/projects/kamelya.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 28, dimensions: "7.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Mətbəx", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "1-ci Mərtəbə: Antre", EN: "1st Floor: Entrance", RU: "1 этаж: Вход" }, size: 8, dimensions: "2.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 10, dimensions: "2.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Banyo", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "2-ci Mərtəbə: Balkon", EN: "2nd Floor: Balcony", RU: "2 этаж: Балкон" }, size: 6, dimensions: "1.5m x 4.0m" },
{ name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 8, dimensions: "2.0m x 4.0m" }
      ]
    },
   {
     id: "karanfil",
     name: { AZ: "Karanfil", EN: "Karanfil", RU: "Karanfil" },
     description: { AZ: "Orijinal dizayn və funksional bölgü ilə müasir mənzil.", EN: "Modern apartment with original design and functional layout.", RU: "Современная квартира с оригинальным дизайном и функциональной планировкой." },
     architecturalStyle: "Contemporary",
     floors: 1,
     areaSqm: 77,
    basePriceUSD: 132000,
    thumbnail: "/projects/karanfil.png",
    view3D: "/projects/karanfil.png",
    sketch2D: "/projects/karanfil-plan.png",
    gallery: ["/projects/karanfil.png"],
layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 30, dimensions: "7.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Master Yataq Otağı", EN: "1st Floor: Master Bedroom", RU: "1 этаж: Главная спальня" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı", EN: "1st Floor: Bedroom", RU: "1 этаж: Спальня" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Banyo", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 15, dimensions: "3.0m x 5.0m" }
     ]
   },
   {
     id: "kavak",
     name: { AZ: "Kavak", EN: "Kavak", RU: "Kavak" },
     description: { AZ: "Təbii mənzərə və müasir üslublu villa.", EN: "Villa with natural view and modern style.", RU: "Вилла с природным видом и в современном стиле." },
     architecturalStyle: "Traditional",
     floors: 1,
     areaSqm: 112,
    basePriceUSD: 148000,
    thumbnail: "/projects/kavak.png",
    view3D: "/projects/kavak.png",
    sketch2D: "/projects/kavak-plan.png",
    gallery: ["/projects/kavak.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 32, dimensions: "8.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Master Yataq Otağı", EN: "1st Floor: Master Bedroom", RU: "1 этаж: Главная спальня" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 2", EN: "1st Floor: Bedroom 2", RU: "1 этаж: Спальня 2" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 3", EN: "1st Floor: Bedroom 3", RU: "1 этаж: Спальня 3" }, size: 10, dimensions: "2.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Banyo", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "1-ci Mərtəbə: Antre", EN: "1st Floor: Entrance", RU: "1 этаж: Вход" }, size: 8, dimensions: "2.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 15, dimensions: "3.0m x 5.0m" }
     ]
   },
  {
id: "koknar",
     name: { AZ: "Koknar", EN: "Koknar", RU: "Koknar" },
     description: { AZ: "Küknar ağacından ilham alınmış orijinal dizaynlı mənzil.", EN: "Original design apartment inspired by the Fir tree.", RU: "Квартира с оригинальным дизайном, вдохновленная елью." },
     architecturalStyle: "Minimalist",
     floors: 1,
     areaSqm: 86,
    basePriceUSD: 130000,
    thumbnail: "/projects/koknar.png",
    view3D: "/projects/koknar.png",
    sketch2D: "/projects/koknar-plan.png",
    gallery: ["/projects/koknar.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 28, dimensions: "7.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Master Yataq Otağı", EN: "1st Floor: Master Bedroom", RU: "1 этаж: Главная спальня" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı", EN: "1st Floor: Bedroom", RU: "1 этаж: Спальня" }, size: 10, dimensions: "2.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Banyo", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 5, dimensions: "2.0m x 2.5m" },
       { name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 4, dimensions: "2.0m x 2.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 15, dimensions: "3.0m x 5.0m" }
     ]
   },
  {
id: "ladin",
     name: { AZ: "Ladin", EN: "Ladin", RU: "Ladin" },
     description: { AZ: "Lüks və funksional sahələrlə yüksək səviyyəli mənzil.", EN: "Luxury apartment with luxurious and functional spaces.", RU: "Роскошная квартира с роскошными и функциональными пространствами." },
     architecturalStyle: "Modern",
     floors: 2,
     areaSqm: 150,
    basePriceUSD: 162000,
    thumbnail: "/projects/ladin.png",
    view3D: "/projects/ladin.png",
    sketch2D: "/projects/ladin-plan.png",
    gallery: ["/projects/ladin.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 35, dimensions: "7.0m x 5.0m" },
       { name: { AZ: "1-ci Mərtəbə: Mətbəx", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 15, dimensions: "3.8m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "1-ci Mərtəbə: Qaraj", EN: "1st Floor: Garage", RU: "1 этаж: Гараж" }, size: 25, dimensions: "5.0m x 5.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 20, dimensions: "5.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 20, dimensions: "5.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Banyo", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 8, dimensions: "2.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 10, dimensions: "2.5m x 4.0m" }
     ]
   },
  {
id: "lale",
     name: { AZ: "Lale", EN: "Lale", RU: "Lale" },
     description: { AZ: "Çiçək motifli dizayn və geniş salonlu lüks mənzil.", EN: "Luxury apartment with flower motif design and spacious living room.", RU: "Роскошная квартира с цветочным мотивом и просторной гостиной." },
     architecturalStyle: "Traditional",
     floors: 2,
     areaSqm: 104,
    basePriceUSD: 145000,
    thumbnail: "/projects/lale.png",
    view3D: "/projects/lale.png",
    sketch2D: "/projects/lale-plan.png",
    gallery: ["/projects/lale.png"],
    layout2D: [
      { name: { AZ: "1-ci Mərtəbə: Salon", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 25, dimensions: "5.0m x 5.0m" },
      { name: { AZ: "1-ci Mərtəbə: Mətbəx", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 12, dimensions: "3.0m x 4.0m" },
      { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 5, dimensions: "2.5m x 2.0m" },
      { name: { AZ: "1-ci Mərtəbə: Antre", EN: "1st Floor: Entrance", RU: "1 этаж: Вход" }, size: 8, dimensions: "2.0m x 4.0m" },
      { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 14, dimensions: "3.5m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 18, dimensions: "4.5m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Yataq Otağı", EN: "2nd Floor: Bedroom", RU: "2 этаж: Спальня" }, size: 14, dimensions: "3.5m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Banyo", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
      { name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 8, dimensions: "2.0m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Balkon", EN: "2nd Floor: Balcony", RU: "2 этаж: Балкон" }, size: 12, dimensions: "3.0m x 4.0m" }
    ]
   },
   {
 id: "lilyum",
     name: { AZ: "Lilyum", EN: "Lilyum", RU: "Lilyum" },
     description: { AZ: "Eksklyuziv lilyum çiçək motivli lüks mənzil.", EN: "Exclusive lilyum flower motif luxury apartment.", RU: "Эксклюзивная роскошная квартира с мотивом цветка лилии." },
     architecturalStyle: "Classic",
     floors: 1,
     areaSqm: 67,
    basePriceUSD: 158000,
    thumbnail: "/projects/lilyum.png",
    view3D: "/projects/lilyum.png",
    sketch2D: "/projects/lilyum-plan.png",
    gallery: ["/projects/lilyum.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 22, dimensions: "5.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Master Yataq Otağı", EN: "1st Floor: Master Bedroom", RU: "1 этаж: Главная спальня" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı", EN: "1st Floor: Bedroom", RU: "1 этаж: Спальня" }, size: 10, dimensions: "2.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Banyo", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 5, dimensions: "2.0m x 2.5m" },
       { name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 4, dimensions: "2.0m x 2.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 12, dimensions: "3.0m x 4.0m" }
     ]
   },
  {
id: "manolya",
     name: { AZ: "Manolya", EN: "Manolya", RU: "Manolya" },
     description: {
       AZ: "Manolya ağacından ilham alınmış, premium mənzil variantı.",
       EN: "Premium apartment inspired by the Manolya tree.",
       RU: "Премиум квартира, вдохновлённая деревом манолы."
     },
     architecturalStyle: "Contemporary",
     floors: 1,
     areaSqm: 84,
    basePriceUSD: 172000,
    thumbnail: "/projects/manolya.png",
    view3D: "/projects/manolya.png",
    sketch2D: "/projects/manolya-plan.png",
    gallery: ["/projects/manolya.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 30, dimensions: "7.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Master Yataq Otağı", EN: "1st Floor: Master Bedroom", RU: "1 этаж: Главная спальня" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı", EN: "1st Floor: Bedroom", RU: "1 этаж: Спальня" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Banyo", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 5, dimensions: "2.5m x 2.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 15, dimensions: "3.0m x 5.0m" }
     ]
   },
  {
id: "melisa",
     name: { AZ: "Melisa", EN: "Melisa", RU: "Melisa" },
     description: { AZ: "Melisa çiçəyinin yasaqlı təmizliyi ilə modern mənzil.", EN: "Modern apartment with the purity of the Melissa flower.", RU: "Современная квартира с чистотой цветка мелиссы." },
     architecturalStyle: "Minimalist",
     floors: 1,
     areaSqm: 75,
    basePriceUSD: 135000,
    thumbnail: "/projects/melisa.png",
    view3D: "/projects/melisa.png",
    sketch2D: "/projects/melisa-plan.png",
    gallery: ["/projects/melisa.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 20, dimensions: "5.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Mətbəx", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 10, dimensions: "2.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Master Yataq Otağı", EN: "1st Floor: Master Bedroom", RU: "1 этаж: Главная спальня" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı", EN: "1st Floor: Bedroom", RU: "1 этаж: Спальня" }, size: 10, dimensions: "2.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Banyo", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 5, dimensions: "2.0m x 2.5m" },
       { name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 4, dimensions: "2.0m x 2.0m" },
       { name: { AZ: "1-ci Mərtəbə: Teras", EN: "1st Floor: Terrace", RU: "1 этаж: Терраса" }, size: 12, dimensions: "3.0m x 4.0m" }
     ]
   },
  {
id: "meshe",
     name: { AZ: "Meşə", EN: "Meshe", RU: "Meşə" },
     description: {
       AZ: "Meşə temalı doğal materiallərlə lüks villa.",
       EN: "Luxury villa with forest-themed natural materials.",
       RU: "Роскошная вилла с лесной тематикой и натуральными материалами."
     },
     architecturalStyle: "Traditional",
     floors: 2,
     areaSqm: 103,
    basePriceUSD: 152000,
    thumbnail: "/projects/meshe.png",
    view3D: "/projects/meshe.png",
    sketch2D: "/projects/meshe-plan.png",
    gallery: ["/projects/meshe.png"],
    layout2D: [
      { name: { AZ: "1-ci Mərtəbə: Salon", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 25, dimensions: "5.0m x 5.0m" },
      { name: { AZ: "1-ci Mərtəbə: Mətbəx", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 15, dimensions: "3.0m x 5.0m" },
      { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, size: 12, dimensions: "3.0m x 4.0m" },
      { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 5, dimensions: "2.5m x 2.0m" },
      { name: { AZ: "1-ci Mərtəbə: Antre", EN: "1st Floor: Entrance", RU: "1 этаж: Вход" }, size: 8, dimensions: "2.0m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 16, dimensions: "4.0m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 12, dimensions: "3.0m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 12, dimensions: "3.0m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Geyim Otağı", EN: "2nd Floor: Walk-in Closet", RU: "2 этаж: Гардероб" }, size: 8, dimensions: "2.0m x 4.0m" },
      { name: { AZ: "2-ci Mərtəbə: Hamam", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
      { name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 10, dimensions: "2.5m x 4.0m" }
    ]
   },
   {
     id: "mine",
     name: { AZ: "Mine", EN: "Mine", RU: "Mine" },
     description: { AZ: "Minimal dizayn və premium materiallərlə müasir mənzil.", EN: "Modern apartment with minimalist design and premium materials.", RU: "Современная квартира с минималистичным дизайном и премиальными материалами." },
     architecturalStyle: "Minimalist",
     floors: 2,
     areaSqm: 105,
    basePriceUSD: 128000,
    thumbnail: "/projects/mine.png",
    view3D: "/projects/mine.png",
    sketch2D: "/projects/mine-plan.png",
    gallery: ["/projects/mine.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 30, dimensions: "7.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "1-ci Mərtəbə: Antre", EN: "1st Floor: Entrance", RU: "1 этаж: Вход" }, size: 7, dimensions: "2.5m x 2.8m" },
       { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Hamam", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 8, dimensions: "2.0m x 4.0m" }
     ]
   },
  {
id: "nilufer",
     name: { AZ: "Nilufer", EN: "Nilufer", RU: "Nilufer" },
     description: { AZ: "Nilufer çiçəyinin eleganlığı ilə yüksək səviyyəli mənzil.", EN: "High-end apartment with the elegance of the Nilufer flower.", RU: "Премиум-квартира с элегiей цветка нилуфера." },
     architecturalStyle: "Classic",
     floors: 1,
     areaSqm: 81,
    basePriceUSD: 165000,
    thumbnail: "/projects/nilufer.png",
    view3D: "/projects/nilufer.png",
    sketch2D: "/projects/nilufer-plan.png",
    gallery: ["/projects/nilufer.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 30, dimensions: "6.0m x 5.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 2", EN: "1st Floor: Bedroom 2", RU: "1 этаж: Спальня 2" }, size: 14, dimensions: "3.5m x 4.0m" },
{ name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
        { name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 5, dimensions: "2.5m x 2.0m" }
      ]
    },
    {
      id: "palmiye",
     name: { AZ: "Palmiye", EN: "Palmiye", RU: "Palmiye" },
     description: { AZ: "Palma ağacı motivli, tropik və lüks mənzil konsepti.", EN: "Tropical luxury apartment concept inspired by the palm tree.", RU: "Концепция роскошной квартиры в тропическом стиле с пальмовым мотивом." },
     architecturalStyle: "Contemporary",
     floors: 2,
     areaSqm: 136,
    basePriceUSD: 170000,
    thumbnail: "/projects/palmiye.png",
    view3D: "/projects/palmiye.png",
    sketch2D: "/projects/palmiye-plan.png",
    gallery: ["/projects/palmiye.png"],
    layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 25, dimensions: "5.0m x 5.0m" },
       { name: { AZ: "1-ci Mərtəbə: Mətbəx", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "2.5m x 2.5m" },
       { name: { AZ: "1-ci Mərtəbə: Antre", EN: "1st Floor: Entrance", RU: "1 этаж: Вход" }, size: 8, dimensions: "2.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 18, dimensions: "4.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Geyim Otağı", EN: "2nd Floor: Walk-in Closet", RU: "2 этаж: Гардероб" }, size: 8, dimensions: "2.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Hamam", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 10, dimensions: "2.5m x 4.0m" }
     ]
   },
  {
id: "papatya",
     name: { AZ: "Papatya", EN: "Papatya", RU: "Papatya" },
     description: { AZ: "Papati çiçəyinin təmizliyi ilə minimalist mənzil.", EN: "Minimalist apartment with the purity of the Daffodil flower.", RU: "Минималистичная квартира с чистотой цветка нарцисса." },
     architecturalStyle: "Minimalist",
     floors: 1,
     areaSqm: 116,
    basePriceUSD: 122000,
    thumbnail: "/projects/papatya.png",
    view3D: "/projects/papatya.png",
    sketch2D: "/projects/papatya-plan.png",
gallery: ["/projects/papatya.png"],
     layout2D: [
       { name: { AZ: "Salon 1", EN: "Living Room 1", RU: "Гостиная 1" }, size: 22, dimensions: "5.5m x 4.0m" },
       { name: { AZ: "Salon 2", EN: "Living Room 2", RU: "Гостиная 2" }, size: 18, dimensions: "4.5m x 4.0m" },
       { name: { AZ: "Mətbəx", EN: "Kitchen", RU: "Кухня" }, size: 15, dimensions: "3.0m x 5.0m" },
       { name: { AZ: "Master Yataq Otağı 1", EN: "Master Bedroom 1", RU: "Главная спальня 1" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "Master Yataq Otağı 2", EN: "Master Bedroom 2", RU: "Главная спальня 2" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "Yataq Otağı", EN: "Bedroom", RU: "Спальня" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "Banyo", EN: "Bathroom", RU: "Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "Master Banyo", EN: "Master Bathroom", RU: "Главная ванная" }, size: 4, dimensions: "2.0m x 2.0m" },
       { name: { AZ: "Antre", EN: "Entrance", RU: "Вход" }, size: 8, dimensions: "2.0m x 4.0m" },
       { name: { AZ: "Hol", EN: "Hallway", RU: "Коридор" }, size: 5, dimensions: "2.5m x 2.0m" }
     ]
   },
   {
     id: "petunya",
     name: { AZ: "Petunya", EN: "Petunya", RU: "Petunya" },
     description: { AZ: "Petunya çiçəyinin rəngləri ilə gözəl villa.", EN: "Beautiful villa with the colors of the Petunia flower.", RU: "Красивая вилла с цветами цветка петунии." },
     architecturalStyle: "Traditional",
     floors: 2,
     areaSqm: 106,
     basePriceUSD: 148000,
     thumbnail: "/projects/petunya.png",
     view3D: "/projects/petunya.png",
     sketch2D: "/projects/petunya-plan.png",
     gallery: ["/projects/petunya.png"],
     layout2D: [
       { name: { AZ: "Zəmin: Salon + Mətbəx", EN: "Ground: Living Room + Kitchen", RU: "Земля: Гостиная + Кухня" }, size: 28, dimensions: "7.0m x 4.0m" },
       { name: { AZ: "Zəmin: Yataq Otağı 1", EN: "Ground: Bedroom 1", RU: "Земля: Спальня 1" }, size: 9, dimensions: "3.0m x 3.0m" },
       { name: { AZ: "Zəmin: Hamam", EN: "Ground: Bathroom", RU: "Земля: Ванная" }, size: 5, dimensions: "2.5m x 2.0m" },
       { name: { AZ: "Zəmin: Antre", EN: "Ground: Entrance", RU: "Земля: Вход" }, size: 15, dimensions: "5.0m x 3.0m" },
       { name: { AZ: "1-ci Mərtəbə: Master Yataq Otağı", EN: "1st Floor: Master Bedroom", RU: "1 этаж: Главная спальня" }, size: 14, dimensions: "4.0m x 3.5m" },
       { name: { AZ: "1-ci Mərtəbə: Master Hamam", EN: "1st Floor: Master Bathroom", RU: "1 этаж: Ванная" }, size: 4, dimensions: "2.0m x 2.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 2", EN: "1st Floor: Bedroom 2", RU: "1 этаж: Спальня 2" }, size: 14, dimensions: "3.5m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 3", EN: "1st Floor: Bedroom 3", RU: "1 этаж: Спальня 3" }, size: 9, dimensions: "3.0m x 3.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 5, dimensions: "2.5m x 2.0m" },
{ name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 11, dimensions: "3.5m x 3.0m" }
      ]
   },
   {
     id: "reyhan",
     name: { AZ: "Reyhan", EN: "Reyhan", RU: "Reyhan" },
     description: { AZ: "Reyhan çiçəyinin aromatı ilə lüks mənzil.", EN: "Luxury apartment with the aroma of the Basil flower.", RU: "Роскошная квартира с ароматом цветка базилика." },
     architecturalStyle: "Classic",
     floors: 1,
     areaSqm: 77,
    basePriceUSD: 152000,
    thumbnail: "/projects/reyhan.png",
    view3D: "/projects/reyhan.png",
    sketch2D: "/projects/reyhan-plan.png",
    gallery: ["/projects/reyhan.png"],
layout2D: [
       { name: { AZ: "Salon + Mətbəx", EN: "Living Room + Kitchen", RU: "Гостиная + Кухня" }, size: 22, dimensions: "5.5m x 4.0m" },
       { name: { AZ: "Yataq Otağı", EN: "Bedroom", RU: "Спальня" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "Banyo", EN: "Bathroom", RU: "Ванная" }, size: 5, dimensions: "2.5m x 2.0m" },
       { name: { AZ: "Antre", EN: "Entrance", RU: "Вход" }, size: 4, dimensions: "2.0m x 2.0m" },
{ name: { AZ: "Teras", EN: "Terrace", RU: "Терраса" }, size: 14, dimensions: "7.0m x 2.0m" }
      ]
   },
   {
     id: "shakayik",
     name: { AZ: "Şakayık", EN: "Shakayik", RU: "Shakayik" },
     description: { AZ: "Şakayıq çiçəyinin gözəlliyi ilə müasir mənzil.", EN: "Modern apartment with the beauty of the Lilac flower.", RU: "Современная квартира с красотой сирени." },
     architecturalStyle: "Contemporary",
     floors: 1,
     areaSqm: 76,
     basePriceUSD: 135000,
     thumbnail: "/projects/shakayik.png",
     view3D: "/projects/shakayik.png",
     sketch2D: "/projects/shakayik-plan.png",
     gallery: ["/projects/shakayik.png"],
     layout2D: [
       { name: { AZ: "Salon + Mətbəx", EN: "Living Room + Kitchen", RU: "Гостиная + Кухня" }, size: 28, dimensions: "7.0m x 4.0m" },
       { name: { AZ: "Master Yataq Otağı", EN: "Master Bedroom", RU: "Главная спальня" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "Yataq Otağı", EN: "Bedroom", RU: "Спальня" }, size: 12, dimensions: "3.0m x 4.0m" },
       { name: { AZ: "Banyo", EN: "Bathroom", RU: "Ванная" }, size: 6, dimensions: "2.0m x 3.0m" },
       { name: { AZ: "Antre", EN: "Entrance", RU: "Вход" }, size: 5, dimensions: "2.5m x 2.0m" },
       { name: { AZ: "Teras", EN: "Terrace", RU: "Терраса" }, size: 15, dimensions: "5.0m x 3.0m" }
     ]
   },
   {
     id: "sogut",
     name: { AZ: "Soğut", EN: "Sogut", RU: "Sogut" },
     description: { AZ: "Soğut çiçəyinin serinliyi ilə minimalist mənzil.", EN: "Minimalist apartment with the coolness of the Mint flower.", RU: "Минималистичная квартира с прохладой цветка мяты." },
     architecturalStyle: "Minimalist",
     floors: 1,
     areaSqm: 120,
     basePriceUSD: 125000,
     thumbnail: "/projects/sogut.png",
     view3D: "/projects/sogut.png",
     sketch2D: "/projects/sogut-plan.png",
     gallery: ["/projects/sogut.png"],
     layout2D: [
       { name: { AZ: "Salon 1", EN: "Living Room 1", RU: "Гостиная 1" }, size: 20, dimensions: "5.0m x 4.0m" },
       { name: { AZ: "Salon 2", EN: "Living Room 2", RU: "Гостиная 2" }, size: 18, dimensions: "4.5m x 4.0m" },
       { name: { AZ: "Mətbəx", EN: "Kitchen", RU: "Кухня" }, size: 15, dimensions: "5.0m x 3.0m" },
       { name: { AZ: "Master Yataq Otağı", EN: "Master Bedroom", RU: "Главная спальня" }, size: 18, dimensions: "4.5m x 4.0m" },
       { name: { AZ: "Yataq Otağı 1", EN: "Bedroom 1", RU: "Спальня 1" }, size: 12, dimensions: "4.0m x 3.0m" },
       { name: { AZ: "Yataq Otağı 2", EN: "Bedroom 2", RU: "Спальня 2" }, size: 12, dimensions: "4.0m x 3.0m" },
       { name: { AZ: "Hamam 1", EN: "Bathroom 1", RU: "Ванная 1" }, size: 5, dimensions: "2.0m x 2.5m" },
       { name: { AZ: "Hamam 2", EN: "Bathroom 2", RU: "Ванная 2" }, size: 5, dimensions: "2.0m x 2.5m" },
       { name: { AZ: "Hol/Antre", EN: "Hallway/Entrance", RU: "Коридор/Вход" }, size: 10, dimensions: "3.0m x 3.5m" }
     ]
   },
  {
id: "sumbul",
     name: { AZ: "Sumbul", EN: "Sumbul", RU: "Sumbul" },
     description: { AZ: "Sumbul çiçəyinin elegansi ilə klassik mənzil.", EN: "Classic apartment with the elegance of the Hyacinth flower.", RU: "Классическая квартира с элегие цветка гиацинта." },
     architecturalStyle: "Classic",
     floors: 1,
     areaSqm: 71,
    basePriceUSD: 145000,
    thumbnail: "/projects/sumbul.png",
    view3D: "/projects/sumbul.png",
    sketch2D: "/projects/sumbul-plan.png",
    gallery: ["/projects/sumbul.png"],
layout2D: [
       { name: { AZ: "Salon", EN: "Living Room", RU: "Гостиная" }, size: 22, dimensions: "5.5m x 4.0m" },
       { name: { AZ: "Mətbəx", EN: "Kitchen", RU: "Кухня" }, size: 10, dimensions: "5.0m x 2.0m" },
       { name: { AZ: "Master Yataq Otağı", EN: "Master Bedroom", RU: "Главная спальня" }, size: 15, dimensions: "5.0m x 3.0m" },
       { name: { AZ: "Yataq Otağı", EN: "Bedroom", RU: "Спальня" }, size: 11, dimensions: "3.5m x 3.2m" },
       { name: { AZ: "Banyo", EN: "Bathroom", RU: "Ванная" }, size: 5, dimensions: "2.5m x 2.0m" },
       { name: { AZ: "Hol", EN: "Hallway", RU: "Коридор" }, size: 4, dimensions: "2.0m x 2.0m" },
       { name: { AZ: "Antre", EN: "Entrance", RU: "Вход" }, size: 4, dimensions: "2.0m x 2.0m" }
     ]
   },
  {
id: "susen",
     name: { AZ: "Susen", EN: "Susen", RU: "Susen" },
     description: { AZ: "Susen çiçəyinin təmizliyi ilə lüks mənzil.", EN: "Luxury apartment with the purity of the Soussen flower.", RU: "Роскошная квартира с чистотой цветка Суссена." },
     architecturalStyle: "Contemporary",
     floors: 2,
     areaSqm: 137,
     basePriceUSD: 148000,
     thumbnail: "/projects/susen.png",
     view3D: "/projects/susen.png",
     sketch2D: "/projects/susen-plan.png",
     gallery: ["/projects/susen.png"],
     layout2D: [
       { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 40, dimensions: "8.0m x 8.0m" },
       { name: { AZ: "1-ci Mərtəbə: Qonaq Otağı", EN: "1st Floor: Guest Room", RU: "1 этаж: Гостинная" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "3.0m x 2.0m" },
       { name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 8, dimensions: "2.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 22, dimensions: "5.5m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 16, dimensions: "4.0m x 4.0m" },
       { name: { AZ: "2-ci Mərtəbə: Hamam", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 7, dimensions: "3.5m x 2.0m" },
       { name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 10, dimensions: "2.5m x 4.0m" }
     ]
   },
  {
id: "yonca",
     name: { AZ: "Yonca", EN: "Yonca", RU: "Yonca" },
      description: { AZ: "Yonca çiçəyinin təmizliyi ilə minimalist mənzil.", EN: "Minimalist apartment with the purity of the Clover flower.", RU: "Минималистичная квартира с чистотой цветка клевера." },
      architecturalStyle: "Minimalist",
      floors: 2,
      areaSqm: 127,
     basePriceUSD: 130000,
    thumbnail: "/projects/yonca.png",
    view3D: "/projects/yonca.png",
    sketch2D: "/projects/yonca-plan.png",
gallery: ["/projects/yonca.png"],
layout2D: [
        { name: { AZ: "1-ci Mərtəbə: Salon + Mətbəx", EN: "1st Floor: Living Room + Kitchen", RU: "1 этаж: Гостиная + Кухня" }, size: 35, dimensions: "8.0m x 8.0m" },
        { name: { AZ: "1-ci Mərtəbə: Yataq Otağı 1", EN: "1st Floor: Bedroom 1", RU: "1 этаж: Спальня 1" }, size: 14, dimensions: "4.0m x 3.5m" },
        { name: { AZ: "1-ci Mərtəbə: Hamam", EN: "1st Floor: Bathroom", RU: "1 этаж: Ванная" }, size: 6, dimensions: "4.0m x 1.5m" },
        { name: { AZ: "1-ci Mərtəbə: Hol", EN: "1st Floor: Hallway", RU: "1 этаж: Коридор" }, size: 8, dimensions: "2.0m x 4.0m" },
        { name: { AZ: "2-ci Mərtəbə: Master Yataq Otağı", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 20, dimensions: "5.0m x 4.0m" },
        { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 14, dimensions: "4.0m x 3.5m" },
        { name: { AZ: "2-ci Mərtəbə: Yataq Otağı 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 14, dimensions: "4.0m x 3.5m" },
        { name: { AZ: "2-ci Mərtəbə: Hamam", EN: "2nd Floor: Bathroom", RU: "2 этаж: Ванная" }, size: 6, dimensions: "3.0m x 2.0m" },
{ name: { AZ: "2-ci Mərtəbə: Hol", EN: "2nd Floor: Hallway", RU: "2 этаж: Коридор" }, size: 10, dimensions: "2.5m x 4.0m" }
      ]
    },
  {
    id: "makar",
    name: { AZ: "Makar", EN: "Makar", RU: "Makar" },
    description: { AZ: "Makar çiçəyinə il hommage verən 2 mərtəbəli modern villa.", EN: "Modern villa inspired by the Makar flower.", RU: "Современная вилла, вдохновленная цветком Makar." },
    architecturalStyle: "Modern",
    floors: 2,
    areaSqm: 139,
    basePriceUSD: 135000,
    thumbnail: "/projects/Makar.png",
    view3D: "/projects/Makar.png",
    sketch2D: "/projects/makar-plan.png",
    gallery: ["/projects/Makar.png"],
    layout2D: [
      { name: { AZ: "1-ci Mərtəbə: Living Room (Salon)", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 30, dimensions: "6.0m x 5.0m" },
      { name: { AZ: "1-ci Mərtəbə: Kitchen (Mətbəx)", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 15, dimensions: "5.0m x 3.0m" },
      { name: { AZ: "1-ci Mərtəbə: Dinning", EN: "1st Floor: Dining", RU: "1 этаж: Столовая" }, size: 10, dimensions: "4.0m x 2.5m" },
      { name: { AZ: "1-ci Mərtəbə: Bed 4", EN: "1st Floor: Bedroom 4", RU: "1 этаж: Спальня 4" }, size: 14, dimensions: "4.0m x 3.5m" },
      { name: { AZ: "1-ci Mərtəbə: WC", EN: "1st Floor: WC", RU: "1 этаж: WC" }, size: 4, dimensions: "2.0m x 2.0m" },
      { name: { AZ: "1-ci Mərtəbə: Store", EN: "1st Floor: Storage", RU: "1 этаж: Кладовая" }, size: 5, dimensions: "2.5m x 2.0m" },
      { name: { AZ: "2-ci Mərtəbə: Master Bed", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 18, dimensions: "5.0m x 3.6m" },
      { name: { AZ: "2-ci Mərtəbə: Bed 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 14, dimensions: "4.0m x 3.5m" },
      { name: { AZ: "2-ci Mərtəbə: Bed 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 14, dimensions: "4.0m x 3.5m" },
      { name: { AZ: "2-ci Mərtəbə: Gym Room", EN: "2nd Floor: Gym Room", RU: "2 этаж: Тренажерный зал" }, size: 15, dimensions: "5.0m x 3.0m" },
      { name: { AZ: "2-ci Mərtəbə: WC", EN: "2nd Floor: WC", RU: "2 этаж: WC" }, size: 6, dimensions: "3.0m x 2.0m" },
      { name: { AZ: "2-ci Mərtəbə: Balcony", EN: "2nd Floor: Balcony", RU: "2 этаж: Балкон" }, size: 5, dimensions: "2.5m x 2.0m" }
    ]
  },
  {
    id: "makar2",
    name: { AZ: "Makar2", EN: "Makar2", RU: "Makar2" },
    description: { AZ: "Makar2 - 2 mərtəbəli müasir villa.", EN: "Makar2 - Modern 2-story villa.", RU: "Makar2 - Современная двухэтажная вилла." },
    architecturalStyle: "Modern",
    floors: 2,
    areaSqm: 139,
    basePriceUSD: 135000,
    thumbnail: "/projects/makar2.png",
    view3D: "/projects/makar2.png",
    sketch2D: "/projects/makar2-plan.png",
    gallery: ["/projects/makar2.png"],
    layout2D: [
      { name: { AZ: "1-ci Mərtəbə: Living Room", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 30, dimensions: "6.0m x 5.0m" },
      { name: { AZ: "1-ci Mərtəbə: Kitchen", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 12, dimensions: "4.0m x 3.0m" },
      { name: { AZ: "1-ci Mərtəbə: Dinning", EN: "1st Floor: Dining", RU: "1 этаж: Столовая" }, size: 10, dimensions: "4.0m x 2.5m" },
      { name: { AZ: "1-ci Mərtəbə: Bed 4", EN: "1st Floor: Bedroom 4", RU: "1 этаж: Спальня 4" }, size: 12, dimensions: "4.0m x 3.0m" },
      { name: { AZ: "1-ci Mərtəbə: Store", EN: "1st Floor: Storage", RU: "1 этаж: Кладовая" }, size: 4, dimensions: "2.0m x 2.0m" },
      { name: { AZ: "1-ci Mərtəbə: WC", EN: "1st Floor: WC", RU: "1 этаж: WC" }, size: 4, dimensions: "2.0m x 2.0m" },
      { name: { AZ: "2-ci Mərtəbə: Master Bed", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 18, dimensions: "5.0m x 3.6m" },
      { name: { AZ: "2-ci Mərtəbə: Gym Room", EN: "2nd Floor: Gym Room", RU: "2 этаж: Тренажерный зал" }, size: 15, dimensions: "5.0m x 3.0m" },
      { name: { AZ: "2-ci Mərtəbə: Bed 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 14, dimensions: "4.0m x 3.5m" },
      { name: { AZ: "2-ci Mərtəbə: Bed 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 14, dimensions: "4.0m x 3.5m" },
      { name: { AZ: "2-ci Mərtəbə: WC", EN: "2nd Floor: WC", RU: "2 этаж: WC" }, size: 6, dimensions: "3.0m x 2.0m" },
      { name: { AZ: "2-ci Mərtəbə: Balcony", EN: "2nd Floor: Balcony", RU: "2 этаж: Балкон" }, size: 5, dimensions: "2.5m x 2.0m" }
    ]
  },
  {
    id: "modern",
    name: { AZ: "Modern", EN: "Modern", RU: "Modern" },
    description: { AZ: "Modern sistemlərlə tam avtomatlaşdırılmış 2 mərtəbəli villa.", EN: "Modern 2-story villa with fully automated systems.", RU: "Современная 2-этажная вилла с полностью автоматизированными системами." },
    architecturalStyle: "Modern",
    floors: 2,
    areaSqm: 167,
    basePriceUSD: 150000,
    thumbnail: "/projects/modern.png",
    view3D: "/projects/modern.png",
    sketch2D: "/projects/modern-plan.png",
    gallery: ["/projects/modern.png"],
    layout2D: [
      { name: { AZ: "1-ci Mərtəbə: Living Room (Salon)", EN: "1st Floor: Living Room", RU: "1 этаж: Гостиная" }, size: 35, dimensions: "8.0m x 5.0m" },
      { name: { AZ: "1-ci Mərtəbə: Kitchen (Mətbəx)", EN: "1st Floor: Kitchen", RU: "1 этаж: Кухня" }, size: 25, dimensions: "5.0m x 5.0m" },
      { name: { AZ: "1-ci Mərtəbə: Dinning", EN: "1st Floor: Dining", RU: "1 этаж: Столовая" }, size: 35, dimensions: "7.0m x 5.0m" },
      { name: { AZ: "1-ci Mərtəbə: Bedroom 5", EN: "1st Floor: Bedroom 5", RU: "1 этаж: Спальня 5" }, size: 15, dimensions: "4.0m x 3.8m" },
      { name: { AZ: "1-ci Mərtəbə: WC", EN: "1st Floor: WC", RU: "1 этаж: WC" }, size: 4.3, dimensions: "2.0m x 2.2m" },
      { name: { AZ: "1-ci Mərtəbə: Store", EN: "1st Floor: Storage", RU: "1 этаж: Кладовая" }, size: 7, dimensions: "2.5m x 2.8m" },
      { name: { AZ: "1-ci Mərtəbə: Car Parking", EN: "1st Floor: Car Parking", RU: "1 этаж: Парковка" }, size: 25, dimensions: "5.0m x 5.0m" },
      { name: { AZ: "2-ci Mərtəbə: Master Bedroom", EN: "2nd Floor: Master Bedroom", RU: "2 этаж: Главная спальня" }, size: 15.7, dimensions: "4.5m x 3.5m" },
      { name: { AZ: "2-ci Mərtəbə: Bedroom 2", EN: "2nd Floor: Bedroom 2", RU: "2 этаж: Спальня 2" }, size: 15.7, dimensions: "4.5m x 3.5m" },
      { name: { AZ: "2-ci Mərtəbə: Bedroom 3", EN: "2nd Floor: Bedroom 3", RU: "2 этаж: Спальня 3" }, size: 14.8, dimensions: "4.0m x 3.7m" },
      { name: { AZ: "2-ci Mərtəbə: Bedroom 4", EN: "2nd Floor: Bedroom 4", RU: "2 этаж: Спальня 4" }, size: 11.1, dimensions: "3.5m x 3.2m" },
      { name: { AZ: "2-ci Mərtəbə: WC", EN: "2nd Floor: WC", RU: "2 этаж: WC" }, size: 5, dimensions: "2.5m x 2.0m" }
    ]
  }
];