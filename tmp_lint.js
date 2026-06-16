const fs = require('fs');
const path = 'frontend/src/app/catalog/[id]/page.tsx';
const text = fs.readFileSync(path, 'utf8');

const openTags = (text.match(/<div/g) || []).length;
const closeTags = (text.match(/<\/div>/g) || []).length;
const openFragments = (text.match(/<>/g) || []).length;
const closeFragments = (text.match(/<\/>/g) || []).length;
const returns = (text.match(/return\s*\(/g) || []).length;
const closeReturns = (text.match(/\);/g) || []).length;

console.log(JSON.stringify({
  openTags,
  closeTags,
  openFragments,
  closeFragments,
  returns,
  closeReturns,
  unbalancedDivs: openTags - closeTags,
  unbalancedReturns: returns - closeReturns,
  hasProjectRooms: text.includes('projectRooms'),
  hasRoomFallback: /projectRooms\[.*\]\s*\|\|\s*\[\]/.test(text),
}, null, 2));
