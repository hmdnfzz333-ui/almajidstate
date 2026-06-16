const fs=require('fs');
const text=fs.readFileSync('frontend/src/app/catalog/data.ts','utf8');
const ids=[...text.matchAll(/\bid:\s*([^,]+),/g)].map(m=>m[1].trim());
const names=[...text.matchAll(/name:\s*\{\s*AZ:\s*"([^"]+)"/g)].map(m=>m[1]);
console.log(ids.map((id,i)=>(i+1)+'. '+id+' - '+(names[i]||'')).join('\n'));
console.log('count '+ids.length);
