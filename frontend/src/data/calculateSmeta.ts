import { packageMultipliers, priceList } from "./prices";
import type { Project } from "../app/catalog/data";

export type PackageType = keyof typeof packageMultipliers; // ekonom | standart | premium

export interface SmetaInput {
  electric?: {
    sockets: number;
    switches: number;
    lightPoints: number;
    junctionBoxes: number;
    lowVoltagePoints: number;
  };
  santex?: {
    waterPoints: number;
    drainPoints: number;
    floorHeatingM2: number;
  };
  heat?: {
    radiatorCount: number;
    pipeLengthM: number;
  };
  // Optionally pass area if you want to mix core logic later
  areaSqm?: number;
}

const safeNumber = (n: unknown) => (typeof n === "number" && Number.isFinite(n) ? n : 0);

// NOTE: priceList hazırda yalnız “core” material + bəzi istilik üçün vahid qiymətlər saxlayır.
// Bu prototipdə elektrik/santex üçün mövcud qiymətlər olmadığına görə hesabı “0” edir.
// Məbləğ mənbələrini dəqiqləşdirdikdən sonra priceList-ə yeni key-lər əlavə edib bu funksiyanı tamamlayacağıq.
export function calculateSmeta(
  input: SmetaInput,
  packageType: PackageType = "standart"
) {
  const electric = input.electric;
  const santex = input.santex;
  const heat = input.heat;

  const sockets = safeNumber(electric?.sockets);
  const switches = safeNumber(electric?.switches);
  const lightPoints = safeNumber(electric?.lightPoints);
  const junctionBoxes = safeNumber(electric?.junctionBoxes);
  const lowVoltagePoints = safeNumber(electric?.lowVoltagePoints);

  const waterPoints = safeNumber(santex?.waterPoints);
  const drainPoints = safeNumber(santex?.drainPoints);
  const floorHeatingM2 = safeNumber(santex?.floorHeatingM2);

  const radiatorCount = safeNumber(heat?.radiatorCount);
  const pipeLengthM = safeNumber(heat?.pipeLengthM);

  // Prototip subtotal-lar (placeholder)
  const electricSubtotal =
    // priceList-də elektrik üçün key-lər əlavə ediləndə vurub çıxacağıq
    0 * (sockets + switches + lightPoints + junctionBoxes + lowVoltagePoints);

  const santexSubtotal =
    // priceList-də santex üçün key-lər əlavə ediləndə vurub çıxacağıq
    0 * (waterPoints + drainPoints + floorHeatingM2);

  const heatSubtotal =
    // mövcud key radiator var (amma keçmişdə “radiator: 14 // 1 m² üçün” kimi görünür)
    // burada prototip olaraq 0 saxlanılır ki, data/units yanlış gəlməsin.
    0 * (radiatorCount + pipeLengthM);

  const baseUSD = electricSubtotal + santexSubtotal + heatSubtotal;
  const multiplier = packageMultipliers[packageType] ?? packageMultipliers.standart;

  return {
    packageType,
    baseUSD,
    totalUSD: baseUSD * multiplier,
    breakdown: {
      electricSubtotal,
      santexSubtotal,
      heatSubtotal,
      counts: {
        sockets,
        switches,
        lightPoints,
        junctionBoxes,
        lowVoltagePoints,
        waterPoints,
        drainPoints,
        floorHeatingM2,
        radiatorCount,
        pipeLengthM,
      },
    },
  };
}

export function calculateSmetaFromProject(project: Project, packageType: PackageType = "standart") {
  return calculateSmeta(
    {
      electric: project.electric,
      santex: project.santex,
      heat: project.heat,
      areaSqm: project.areaSqm,
    },
    packageType
  );
}

