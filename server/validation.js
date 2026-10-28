export const fields = {kpis:['KPI Name','Target','Actual','Year','Month','Centre'],participants:['Participant ID','Age','Gender','Ethnicity','Language','Living Arrangement','CFS Category','Centre']};
export const recordKey=(type,r)=>JSON.stringify(type==='kpis'?[r['KPI Name'],r.Year,r.Month,r.Centre]:[String(r['Participant ID']),r.Year]);
export function checkDuplicates(type,incoming,existing=[]){const seen=new Set(existing.map(r=>recordKey(type,r)));for(const r of incoming){const key=recordKey(type,r);if(seen.has(key))throw Error('Duplicate record: '+key+'. Edit the existing record or use replace mode.');seen.add(key);}}
export function validate(type, rows) {
 if (!fields[type] || !Array.isArray(rows) || !rows.length || rows.length > 50000) throw Error('Provide between 1 and 50,000 records.');
 return rows.map((row,i)=>{
 const r=Object.fromEntries(fields[type].concat(type==='participants'?['Year']:[]).map(k=>[k,typeof row[k]==='string'?row[k].trim():row[k]]));
 for(const k of fields[type]) if(r[k]===undefined || r[k]===null || r[k]==='') throw Error(`Row ${i+1}: ${k} is required.`);
 const numbers=type==='kpis'?['Target','Actual','Year','Month']:['Age'];
 for(const k of numbers){r[k]=Number(r[k]);if(!Number.isFinite(r[k])||r[k]<0)throw Error(`Row ${i+1}: ${k} must be a non-negative number.`);}
 if(type==='kpis' && (!Number.isInteger(r.Year)||r.Year<1900||r.Year>2200||!Number.isInteger(r.Month)||r.Month<1||r.Month>12))throw Error(`Row ${i+1}: invalid year or month.`);
 if(type==='participants'){
 if(r.Age>120||!Number.isInteger(r.Age))throw Error(`Row ${i+1}: invalid age.`);
 const c=String(r['CFS Category']).replace(/^CFS\s*/i,''); if(!['1-3','4-6','7-9'].includes(c))throw Error(`Row ${i+1}: CFS Category must be 1-3, 4-6 or 7-9.`);r['CFS Category']=c;
 r.Year=r.Year?Number(r.Year):new Date().getFullYear();if(!Number.isInteger(r.Year)||r.Year<1900||r.Year>2200)throw Error(`Row ${i+1}: invalid year.`);
 }return r;
 });
}
