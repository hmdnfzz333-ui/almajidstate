const fs = require('fs');
const f = 'frontend/src/app/catalog/[id]/page.tsx';
const t = fs.readFileSync(f, 'utf8');

// Find the projectData usage line
const usagePattern = 'const currentProject = projectData[typeof unwrappedParams.id';
const usageIdx = t.indexOf(usagePattern);
console.log('usageIdx', usageIdx);
if (usageIdx < 0) {
  console.log('Usage pattern not found');
  process.exit(1);
}

// Verify imports
console.log('has projectsData import', t.includes("import { projectsData } from '../data';"));
console.log('has projectRooms import', t.includes("import { projectRooms } from '../projectRoomsGenerated';"));
console.log('has projectData definition', t.includes('const projectData = {'));
console.log('has projectData import', t.includes('import projectData'));
console.log('has projectDataGenerated import', t.includes('projectRoomsGenerated'));
