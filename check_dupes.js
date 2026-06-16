const fs = require('fs');
const t = fs.readFileSync('frontend/src/app/catalog/data.ts', 'utf8');
const matches = t.match(/id:\s*([0-9]+|\"[^\"]+\")/g) || [];
const ids = [];
for (const raw of matches) {
  const cleaned = raw.replace(/id:\s*/, '').replace(/\"/g, '').trim();
  ids.push(cleaned);
}
const seen = new Map();
for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  if (seen.has(id)) {
    console.log('Duplicate ID:', id, 'first at line', seen.get(id) + 1, 'again at line', i + 1);
  } else {
    seen.set(id, i);
  }
}
console.log('Total IDs:', ids.length, 'Unique:', seen.size);
