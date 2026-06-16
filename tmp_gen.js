const fs=require('fs');
const text=fs.readFileSync('frontend/src/app/catalog/data.ts','utf8');

// Extract project blocks
const projectBlocks=[];
let current='';
for(const line of text.split('\n')){
  if(line.trim()==='{'){
    current='{'+line;
  } else if(current){
    current+='\n'+line;
  }
  if(current && line.trim()===']' && current.includes('layout2D')){
    projectBlocks.push(current);
    current='';
  }
}

const projects=[];
for(const block of projectBlocks){
  const idMatch=block.match(/\bid:\s*([^,\}]+)/);
  const nameMatch=block.match(/name:\s*\{\s*AZ:\s*"([^"]+)"/);
  if(!idMatch||!nameMatch) continue;
  let id=idMatch[1].trim().replace(/['"]/g,'').replace(/\s*as\s*any\s*/,'');
  if(id==='number | string' || id.includes('|')) continue;
  const name=nameMatch[1];
  
  const rooms=[];
  const layoutMatch=block.match(/layout2D:\s*\[([\s\S]*)\]/);
  if(layoutMatch){
    const roomStrs=layoutMatch[1].split('},');
    for(const rs of roomStrs){
      const nm=rs.match(/name:\s*(?:\{[^}]+\}|\s*"([^"]+)")/);
      const sz=rs.match(/size:\s*([^,]+)/);
      if(nm && sz){
        const roomName=(nm[1]||'').trim();
        const size=sz[1].trim();
        rooms.push({floor:'1-ci Mərtəbə', name:roomName||'Salon', area:size+' m²'});
      }
    }
  }
  if(rooms.length===0) rooms.push({floor:'1-ci Mərtəbə',name:'Salon',area:'30 m²'});
  projects.push({id,name,rooms});
}

console.log('const projectRooms: Record<string, {floor: string; name: string; area: string}[]> = {');
for(const p of projects){
  const entries=p.rooms.map(r=>`  { floor: "${r.floor}", name: "${r.name}", area: "${r.area}" }`).join(',\n');
  console.log(`  "${p.id}": [\n${entries}\n  ],`);
}
console.log('};');
console.log('\n// Total projects:',projects.length);
fs.writeFileSync('tmp_projectrooms.ts', 'const projectRooms: Record<string, {floor: string; name: string; area: string}[]> = {\n'+
  projects.map(p=>`  "${p.id}": [\n${p.rooms.map(r=>`    { floor: "${r.floor}", name: "${r.name}", area: "${r.area}" }`).join(',\n')}\n  ]`).join(',\n')+
  '\n};\n');
console.log('Written to tmp_projectrooms.ts');
