const fs=require('fs');
const f='frontend/src/app/catalog/[id]/page.tsx';
const t=fs.readFileSync(f,'utf8');

if (t.includes('const projectData =')) {
  console.log('projectData already present');
  process.exit(0);
}

const block = `
const projectData: Record<string, { title: string; totalArea: number; rooms: { floor: string; name: string; area: string }[] }> = {};

projectsData.forEach(p => {
  const id = String(p.id);
  projectData[id] = {
    title: typeof p.name === 'string' ? p.name : p.name.AZ,
    totalArea: p.areaSqm,
    rooms: projectRooms[id] || [],
  };
});

Object.assign(projectData, {
  sedir: {
    title: 'Sedir Villası',
    totalArea: 190,
    rooms: [
      { floor: '1-ci Mərtəbə', name: 'Salon', area: '33 m²' },
      { floor: '1-ci Mərtəbə', name: 'Mətbəx', area: '18 m²' },
      { floor: '2-ci Mərtəbə', name: 'Valideyn yataq otağı', area: '21 m²' },
      { floor: '2-ci Mərtəbə', name: 'Yataq otağı 2', area: '16 m²' },
    ],
  },
  ladin: {
    title: 'Ladin',
    totalArea: 180,
    rooms: [
      { floor: '1-ci Mərtəbə', name: 'Salon', area: '35 m²' },
      { floor: '1-ci Mərtəbə', name: 'Mətbəx', area: '15 m²' },
      { floor: '2-ci Mərtəbə', name: 'Valideyn yataq otağı', area: '20 m²' },
      { floor: '2-ci Mərtəbə', name: 'Yataq otağı 2', area: '14 m²' },
    ],
  },
});
`;

const marker = "export default function CatalogDetailPage({ params }: PageProps) {";
const idx = t.indexOf(marker);
if (!idx) {
  console.log('Page default export not found');
  process.exit(1);
}
const cleanBlock = block.endsWith('\n') ? block : block + '\n';
const out = t.slice(0, idx) + cleanBlock + t.slice(idx);
fs.writeFileSync(f, out);
console.log('Inserted projectData factory');
