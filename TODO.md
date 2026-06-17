# TODO — Şəffaf Tikinti Smetası (Excel/PDF)

## Mərhələ 1: Smeta input-larının data-modelə inteqrasiyası
- [ ] `frontend/src/app/catalog/data.ts` içində `Project` interface-ə aşağıdakı yeni fields əlavə et:
  - [ ] Elektrik (point-based): `electrical?: { sockets: number; switches: number; lightPoints: number; junctionBoxes: number; lowVoltage: number }`
  - [ ] Santexnika: `plumbing?: { waterPoints: number; drainPoints: number; floorHeatingM2: number }`
  - [ ] İstilik: `heating?: { radiatorCount: number; pipeLengthM: number }`
- [ ] Bütün mövcud layihələr üçün bu fields-ləri default (təklif) dəyərlərlə doldur (mütləq `inputsSource.method` ilə “userEntered/placeholder” statusu qeyd olunsun).

## Mərhələ 2: Smeta hesablamasının input-based mərhələyə keçirilməsi
- [ ] `frontend/src/app/catalog/[id]/page.tsx` içində mövcud `fullSmetaLedger`-i (areaSqm*usage) input əsaslı kəmiyyətlərlə əvəz etməyə hazırlıq et.
- [ ] Kateqoriyalar:
  - [ ] Qaba Tikinti
  - [ ] Kommunikasiya/Mühəndislik
  - [ ] Tamamlama işləri
  - [ ] Əməkhaqqı və İdarəetmə
- [ ] Logistika və “paket əmsalı” sətirlərini risk fondu/idarəetmə/gözlənilməz xərclər kimi detallaşdır.

## Mərhələ 3: Metodologiya izahı və məcburi bəndlər
- [ ] Ölçü metodu izahlarını line-item-lərə əlavə et (measurementMethod).
- [ ] Zəmanət müddəti (konstruksiya 5 il, tamamlama 1 il).
- [ ] İcra müddəti (başlanğıc/bitmə tarixi və ya ümumi müddət field).
- [ ] Ödəniş qrafiki (40% + 60% mərhələli).
- [ ] Qeyd: “Materialların keyfiyyəti orta/yüksək seqmentə aiddir.”

## Mərhələ 4: Excel/PDF çıxış strukturu
- [ ] Excel-ə uyğun sətir modeli: `category, itemName, qty, unit, unitPrice, total, measurementMethod, notes`
- [ ] PDF render üçün eyni data-modeldən istifadə.

## Mərhələ 5: Test
- [ ] Bir neçə project ID üçün (məs: `classic`, `ladin`, `modern`) yoxla:
  - [ ] Cədvəl struktur düzgün formalaşır
  - [ ] Total məbləğlər uyğundur
  - [ ] UI/PDF uyğunluğu

