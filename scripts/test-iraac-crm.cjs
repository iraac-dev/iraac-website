const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const source = fs.readFileSync('app/staff/crm-data.ts','utf8');
const compiled = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const mod={exports:{}};
new Function('module','exports',compiled)(mod,mod.exports);
const {initialState,crmReducer,metrics,programPeople,lastActivity,demoToday}=mod.exports;
let state=structuredClone(initialState);
assert.equal(metrics(state,demoToday).people,6);
assert.equal(metrics(state,demoToday).open,4);
assert.equal(metrics(state,demoToday).overdue,1);
assert.equal(metrics(state,demoToday).surveys,2);
assert.equal(programPeople(state,'mcc').length,2);
// Multi-program relationships must never inflate the organisation people count.
const alex=state.people[0];
state=crmReducer(state,{type:'update-person',person:{...alex,memberships:[...alex.memberships,{program:'thecrew',stage:'Interested',role:'Example',since:demoToday}]}});
assert.equal(metrics(state,demoToday).people,6);
assert.equal(programPeople(state,'thecrew').length,2);
// Stop-contact cancels existing open work; changing back never resurrects it.
state=crmReducer(state,{type:'update-person',person:{...state.people[0],permission:'Do not contact'}});
assert.equal(state.followUps.find(f=>f.personId===alex.id).status,'Cancelled');
state=crmReducer(state,{type:'add-follow-up',followUp:{...initialState.followUps[0],id:'blocked'}});
assert.equal(state.followUps.some(f=>f.id==='blocked'),false);
state=crmReducer(state,{type:'update-person',person:{...state.people[0],permission:'Agreed contact'}});
assert.equal(state.followUps.find(f=>f.personId===alex.id).status,'Cancelled');
// A visit request with unconfirmed permission cannot be scheduled.
state=crmReducer(state,{type:'update-follow-up',id:'f3',status:'Scheduled',owner:'Community team'});
assert.equal(state.followUps.find(f=>f.id==='f3').status,'Requested');
state=crmReducer(state,{type:'update-follow-up',id:'f3',status:'Requested',owner:'Community team'});
assert.equal(state.followUps.find(f=>f.id==='f3').owner,'Community team');
// Latest survey means date of conversation, not array insertion order.
state=crmReducer(state,{type:'add-activity',activity:{...initialState.activities[0],id:'new-survey',date:demoToday}});
state=crmReducer(state,{type:'add-activity',activity:{...initialState.activities[0],id:'older-survey',date:'2026-08-01'}});
assert.equal(lastActivity(state,alex.id,'Survey').id,'new-survey');
const count=state.activities.length;
state=crmReducer(state,{type:'add-activity',activity:{...initialState.activities[0],id:'orphan',personId:'missing'}});
assert.equal(state.activities.length,count);
assert.deepEqual(crmReducer(state,{type:'reset'}),initialState);
console.log('PASS: CRM unique people, program relationships, survey chronology, visit assignment, contact suppression and reset.');
