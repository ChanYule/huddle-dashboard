import {test} from 'node:test';import assert from 'node:assert/strict';import {validate,checkDuplicates} from './validation.js';
const k={'KPI Name':'Outreach',Target:0,Actual:12,Year:2026,Month:1,Centre:'East'};
test('accepts zero targets for unavailable attainment',()=>assert.equal(validate('kpis',[k])[0].Target,0));
test('rejects invalid months and missing fields',()=>{assert.throws(()=>validate('kpis',[{...k,Month:13}]));assert.throws(()=>validate('participants',[{}]));});
test('rejects duplicate monthly KPI keys',()=>{assert.throws(()=>checkDuplicates('kpis',[k,k]));assert.throws(()=>checkDuplicates('kpis',[k],[k]));assert.doesNotThrow(()=>checkDuplicates('kpis',[{...k,Month:2}],[k]));});
test('normalizes CFS and validates age',()=>{const p={'Participant ID':'1',Age:75,Gender:'Female',Ethnicity:'Chinese',Language:'Mandarin','Living Arrangement':'Living Alone','CFS Category':'CFS 7-9',Centre:'East'};assert.equal(validate('participants',[p])[0]['CFS Category'],'7-9');assert.throws(()=>validate('participants',[{...p,Age:200}]));});
