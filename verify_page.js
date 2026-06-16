const fs = require('fs');
const f = 'frontend/src/app/catalog/[id]/page.tsx';
const t = fs.readFileSync(f, 'utf8');
const matches = [...t.matchAll(/const projectData:/g)];
console.log('projectData declarations:', matches.length);
for (const m of matches) console.log('At index', m.index, 'line approx', t.slice(0, m.index).split('\n').length);
console.log('Has import projectRooms?', t.includes("import { projectRooms } from '../projectRoomsGenerated'"));
console.log('Has currentProject usage?', t.includes('const currentProject = projectData'));
