const fs=require('fs');
const f='frontend/src/app/catalog/[id]/page.tsx';
const t=fs.readFileSync(f,'utf8');
const search=['     {projectId === 3 && (','     {projectId === 5 && (','     {unwrappedParams.id === "palmiye" && ('];
let c=0;
let out=t;
for (const s of search){
  if (out.includes(s)){
    c++;
  }
}
console.log('found sections: '+c);
if(c){
  fs.writeFileSync(f+'.bak_'+Date.now(),t);
}
let a=out.split('\n');
const idx=[];
for(let i=0;i<a.length;i++){
  for(const s of search){
    if(a[i].includes(s)) idx.push(i);
  }
}
console.log('line indices: '+idx.join(','));
for(const i of idx){
  a[i]=a[i].replace(/ \?\?>$/,' <>');
}
const res=a.join('\n');
fs.writeFileSync(f,res);
console.log('patched');
