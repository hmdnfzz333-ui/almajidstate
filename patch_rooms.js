const fs=require('fs');
const f='frontend/src/app/catalog/[id]/page.tsx';
let text=fs.readFileSync(f,'utf8');

// Read generated projectRooms
const prText=fs.readFileSync('frontend/src/app/catalog/projectRooms.tmp.ts','utf8');
const projectRoomsCode=prText.replace(/^const /,'export ').replace('Record<string, {floor: string; name: string; area: string}[]>','Record<string, Array<{floor: string; name: string; area: string}>>');

// Insert projectRooms object near top, before comprehensiveMarketRates
const marker='const comprehensiveMarketRates = {';
const insertCode='\n\n// ─────────────────────────────────────────────────────────────────────────────\n// PROJECT ROOM LAYOUTS (keyed by project id)\n// ─────────────────────────────────────────────────────────────────────────────\n\n'+projectRoomsCode+'\n\n';
if (!text.includes(insertCode.substring(0,50))) {
  text=text.replace(marker, insertCode+marker);
  console.log('Inserted projectRooms object');
} else {
  console.log('projectRooms object already inserted');
}

// Now retire hardcoded sections. We want to replace from first {
// after description paragraph up to the closing </div> before Summary Card.
// The easiest anchor: replace everything between the last </p> of the description
// and the Summary Card comment.

const descEnd=text.lastIndexOf('</p>', text.indexOf('{/* Andız'));
const summaryStart=text.indexOf('\n            {/* ── SUMMARY CARD ── */}');

console.log('descEnd char:', descEnd, 'summaryStart char:', summaryStart);

if (descEnd>0 && summaryStart>descEnd) {
  const prefix=text.substring(0, descEnd+4); // include </p>
  const suffix=text.substring(summaryStart);
  
  // Build generic room section
  const genericRoom=`

            const rooms = projectRooms[typeof unwrappedParams.id === 'string' ? unwrappedParams.id : String(unwrappedParams.id)] || [];

            {rooms.length > 0 && (
              <>
                <div className="mt-6 border-t border-slate-800 pt-6">
                  <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-3">🚪 Otaq Bölgüsü və Sahələri:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {rooms.map((room, idx) => (
                      <div key={idx} className="relative bg-slate-900/50 border border-slate-800 p-3 rounded-xl flex flex-col">
                        <div className="absolute top-2 left-2 px-2 py-1 bg-orange-500/20 text-orange-500 text-[10px] font-bold rounded z-10">
                          {room.floor}
                        </div>
                        <span className="text-xs text-slate-400 mt-6">{room.name}</span>
                        <span className="text-sm font-bold text-white">{room.area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>`;

  text=prefix+genericRoom+suffix;
  fs.writeFileSync(f, text);
  console.log('Replaced hardcoded room sections with generic projectRooms renderer');
} else {
  console.log('ERROR: Could not find replacement boundaries');
  console.log('descEnd:', descEnd, 'summaryStart:', summaryStart);
}
