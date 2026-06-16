const fs = require('fs');
const text = fs.readFileSync('frontend/src/app/catalog/data.ts', 'utf8');

// Extract layout2D data for each project
const projectRegex = /id:\s*([^,]+),\s*name:\s*\{[^}]+\}[\s\S]*?layout2D:\s*\[([\s\S]*?)\]\s*}/g;
let match;
const projects = [];

while ((match = projectRegex.exec(text)) !== null) {
  const id = match[1].trim().replace(/['"]/g, '').replace(/\s*as\s*any\s*/, '');
  const layoutBody = match[2];
  
  const rooms = [];
  // Match room entries - handle both string names and object names
  const roomRegex = /\{\s*name:\s*(?:\{[^}]+\}|\s*"([^"]+)"),\s*size:\s*([^,]+),\s*dimensions:\s*"([^"]+)"/g;
  let roomMatch;
  
  while ((roomMatch = roomRegex.exec(layoutBody)) !== null) {
    const name = roomMatch[1] || roomMatch[0].match(/name:\s*"([^"]+)"/)?.[1] || 'Salon';
    const size = roomMatch[2];
    
    // Determine floor from name
    let floor = '1-ci Mərtəbə';
    const nameLower = name.toLowerCase();
    if (nameLower.includes('2-ci') || nameLower.includes('2nd')) floor = '2-ci Mərtəbə';
    else if (nameLower.includes('zəmin') || nameLower.includes('ground')) floor = 'Zəmin';
    else if (nameLower.includes('1-ci') || nameLower.includes('1st')) floor = '1-ci Mərtəbə';
    else if (nameLower.includes('xarici') || nameLower.includes('outdoor')) floor = 'Xarici Sahə';
    
    rooms.push({ floor, name, area: size + ' m²' });
  }
  
  if (rooms.length > 0) {
    projects.push({ id, rooms });
  }
}

console.log('Found ' + projects.length + ' projects with rooms\n');

// Generate TypeScript code
let output = 'const projectRooms: Record<string, {floor: string; name: string; area: string}[]> = {\n';
for (const p of projects) {
  output += `  "${p.id}": [\n`;
  for (const r of p.rooms) {
    output += `    { floor: "${r.floor}", name: "${r.name}", area: "${r.area}" },\n`;
  }
  output += `  ],\n`;
}
output += `};\n`;

// Write to temp file
fs.writeFileSync('frontend/src/app/catalog/projectRooms.tmp.ts', output);
console.log('projectRooms object generated');
console.log('Total entries:', projects.length);
