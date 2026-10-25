/* Module 4 — Industrial relations; personnel assessment; validity */
(function(){
const {H}=Course, el=H.el, t_=H.t;
const tab=s=>el('g',{},s);
const box=(g,x,y,w,h,fill='var(--card)',stroke='var(--line)',rx=8)=>el('rect',{x,y,width:w,height:h,rx,fill,stroke},g);
const wrap=(g,x,y,str,max=28,a={})=>{const words=str.split(' ');let line='',ly=y;const lh=a.lh||15;words.forEach(w=>{if((line+' '+w).trim().length>max){t_(g,x,ly,line.trim(),a);line=w;ly+=lh;}else line+=' '+w;});if(line.trim())t_(g,x,ly,line.trim(),a);return ly;};
const showTabs=(tabs,t)=>tabs.forEach(([g,a,b,last])=>H.op(g,H.es(t,a-.12,a+.1)*(last?1:(1-H.es(t,b-.1,b+.05)))));

/* ================= 4.1 ================= */
function irScene(stage){
  H.cap(stage,'Industrial relations and collective bargaining');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,44,'Parties in industrial relations',{'text-anchor':'middle','font-size':15,'font-weight':700});
  el('circle',{cx:300,cy:230,r:70,fill:'var(--sunk)'},A);t_(A,300,226,'Workplace',{'text-anchor':'middle','font-size':13,'font-weight':700});t_(A,300,244,'climate',{'text-anchor':'middle','font-size':13,'font-weight':700});
  [['Managers',300,100,'var(--org)'],['Employers’ associations',470,190,'var(--org)'],['Trade unions',430,360,'var(--emp)'],['Individual employees',170,360,'var(--emp)'],['Government',130,190,'var(--data)']].forEach(([n,x,y,c])=>{el('line',{x1:300,y1:230,x2:x,y2:y,stroke:'var(--line)','stroke-width':2},A);box(A,x-80,y-18,160,36,'var(--card)',c,18);t_(A,x,y+5,n,{'text-anchor':'middle','font-size':12,'font-weight':700,fill:c});});
  const B=tab(s);tabs.push([B,1,2]);t_(B,300,44,'Unitary or pluralistic?',{'text-anchor':'middle','font-size':15,'font-weight':700});
  el('circle',{cx:160,cy:210,r:110,fill:'var(--org-soft)'},B);[0,1,2,3,4].forEach(i=>H.person(B,110+i*25,215,i?'var(--emp)':'var(--org)',1.6));t_(B,160,350,'Unitary: “one large, happy family”',{'text-anchor':'middle','font-size':12.5,'font-weight':700});t_(B,160,368,'paternalistic, collaborative',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  el('circle',{cx:410,cy:210,r:85,fill:'var(--org-soft)',opacity:.85},B);el('circle',{cx:490,cy:210,r:85,fill:'var(--emp-soft)',opacity:.85},B);t_(B,385,214,'management',{'text-anchor':'middle','font-size':11.5,'font-weight':700,fill:'var(--org)'});t_(B,520,214,'unions',{'text-anchor':'middle','font-size':11.5,'font-weight':700,fill:'var(--emp)'});
  t_(B,450,350,'Pluralistic: separate interests admitted,',{'text-anchor':'middle','font-size':12.5,'font-weight':700});t_(B,450,368,'conflict seen as inevitable and managed',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  const C=tab(s);tabs.push([C,2,3]);t_(C,300,44,'Industrial conflict',{'text-anchor':'middle','font-size':15,'font-weight':700});
  box(C,40,80,520,90,'var(--card)','var(--line)',10);wrap(C,60,108,'Kilmann and Thomas (1978): objective incompatibility of goals, deliberate interference with another’s goals, and emotional hostility.',72,{'font-size':12.5});
  box(C,40,190,520,90,'var(--card)','var(--line)',10);wrap(C,60,218,'Hyman: the antagonistic relationship between labour and capital, and the system that structures work. In Nigeria, industrial conflict ≈ trade dispute (Akinmayowa, 2003).',72,{'font-size':12.5});
  box(C,40,300,520,70,'var(--org-soft)','none',10);t_(C,300,332,'Conflict is not always bad: manage it, do not just avoid it.',{'text-anchor':'middle','font-size':13.5,'font-weight':700,fill:'var(--org)'});t_(C,300,352,'The process for resolving it amicably is collective bargaining.',{'text-anchor':'middle','font-size':12});
  // bargaining number line (steps 3-9)
  const Dg=tab(s);tabs.push([Dg,3,10,true]);const dT=t_(Dg,300,40,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const X=v=>50+v*12.5;el('line',{x1:X(0),x2:X(40),y1:250,y2:250,stroke:'var(--muted)','stroke-width':2},Dg);for(let v=0;v<=40;v+=5){el('line',{x1:X(v),x2:X(v),y1:245,y2:255,stroke:'var(--muted)'},Dg);t_(Dg,X(v),272,v+'%',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});}
  t_(Dg,300,296,'pay rise on the table',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  const zone=el('rect',{y:228,height:44,fill:'var(--org-soft)',opacity:.9},Dg);const zoneT=t_(Dg,0,243,'zone of agreement',{'text-anchor':'middle','font-size':11.5,'font-weight':700,fill:'var(--org)'});
  const mk=(c,lab,up,dy=0)=>{const g=el('g',{},Dg);el('line',{x1:0,x2:0,y1:up?200:250,y2:up?250:300+dy,stroke:c,'stroke-width':3},g);el('circle',{cx:0,cy:up?200:300+dy,r:7,fill:c},g);const tx=t_(g,0,up?186:322+dy,lab,{'text-anchor':'middle','font-size':11,'font-weight':700,fill:c});return g;};
  const mOpen=mk('var(--org)','mgmt offer',true),mMax=mk('var(--org)','mgmt maximum',false,0),uOpen=mk('var(--emp)','union demand',true),uMin=mk('var(--emp)','union minimum',false,26);
  const deal=el('g',{},Dg);el('path',{d:'M0 236 L8 250 L0 264 L-8 250Z',fill:'var(--ink)'},deal);t_(deal,0,350,'',{});const dealT=t_(Dg,0,372,'',{'text-anchor':'middle','font-size':13,'font-weight':700});
  const stages=['Pre-negotiation','Negotiators','Strategy','Tactics','Contract'];const sCh=stages.map((n,i)=>{const g=el('g',{},Dg);const r=box(g,20+i*114,66,106,28,'var(--sunk)','none',14);const tx=t_(g,73+i*114,85,`${i+1} ${n}`,{'text-anchor':'middle','font-size':11,'font-weight':700});return {r,tx};});
  const note=el('g',{},Dg);const n1=t_(note,300,124,'',{'text-anchor':'middle','font-size':12.5}),n2=t_(note,300,144,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  const jolt=t_(Dg,0,170,'',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--err)'});
  const contract=el('g',{},Dg);box(contract,60,384,480,46,'var(--org-soft)','none',10);t_(contract,300,402,'Contract, typically 2–3 years: union security, grievance procedure, promotion,',{'text-anchor':'middle','font-size':11.5});t_(contract,300,420,'transfer, layoffs, wages, hours, leave, overtime, incentives, safety and health',{'text-anchor':'middle','font-size':11.5});
  return {update(t){showTabs(tabs,t);const k=Math.floor(t);
    dT.textContent=t<4?'Collective bargaining: from opposite ends toward a deal':'The bargaining range';
    const pre=H.es(t,4,4.4);H.op(mOpen,pre);H.op(uOpen,pre);H.op(mMax,H.es(t,6,6.4));H.op(uMin,H.es(t,6,6.4));
    const sp=H.es(t,5,8.5);let mo=H.lerp(5,13,sp),uo=H.lerp(35,20,sp);const tac=H.seg(t,7,8);const shock=Math.sin(tac*Math.PI*6)*(tac>0&&tac<1?3:0);uo+=Math.max(0,shock);
    mOpen.setAttribute('transform',`translate(${X(mo)},0)`);uOpen.setAttribute('transform',`translate(${X(uo)},0)`);mMax.setAttribute('transform',`translate(${X(18)},0)`);uMin.setAttribute('transform',`translate(${X(12)},0)`);
    H.set(zone,{x:X(12),width:X(18)-X(12)});H.set(zoneT,{x:X(15)});H.op(zone,H.es(t,6.2,6.6));H.op(zoneT,H.es(t,6.2,6.6));
    const dl=H.es(t,8.5,8.9);H.op(deal,dl);deal.setAttribute('transform',`translate(${X(15)},0)`);H.set(dealT,{x:X(15)});dealT.textContent=dl>.5?'Agreed: 15%':'';H.op(contract,H.es(t,9,9.3));
    sCh.forEach((c,i)=>{const on=k-4===i||(k>=8&&i===4&&t>=9)||(k===8&&i===3);const active=(i===0&&k===4)||(i===1&&k===5)||(i===2&&k===6)||(i===3&&(k===7||k===8&&t<8.5))||(i===4&&t>=8.5);H.set(c.r,{fill:active?'var(--org)':'var(--sunk)'});H.set(c.tx,{fill:active?'var(--card)':'var(--ink)'});});
    const notes={3:['Resolve conflict over wages and conditions by direct negotiation (the Webbs, 1902)','Scope: a whole sector (e.g. National Union of Teachers) or one workplace'],4:['Pre-negotiation: study the issues, the other party, past contracts','Each side states its opening position'],5:['Negotiators: a committee with personnel, department heads and a lawyer','Keep the chief executive out, so no instant yes or no is forced'],6:['Strategy: know your maximum concession before entering the hall','Watch the whole package in Naira; keep staff and public informed'],7:['Tactics (Fisher and Ury): deception, psychological warfare, positional pressure','Escalating demands, reopening settled issues, take-it-or-leave-it'],8:['The two positions move inside the zone of agreement',''],9:['The contract records the agreement in formal terms','']};
    const nn=notes[Math.min(9,Math.max(3,k))]||['',''];n1.textContent=nn[0];n2.textContent=nn[1];jolt.textContent=tac>0&&tac<1&&shock>1?'escalating demand!':'';H.set(jolt,{x:X(uo)});
  }};
}
Course.add({id:'4.1',module:4,title:'Managing Industrial Relations',vizLabel:'A bargaining range on a number line',
  hook:{who:'Gbenga, industrial relations officer',text:'The union wants a 35% pay rise. Management has offered 5%. The union has given notice of a strike in three weeks. Gbenga has to prepare the management team for the bargaining table.'},
  objectives:['Define industrial relations and identify the parties','Contrast the unitary and pluralistic approaches','Explain industrial conflict','Describe the collective bargaining process and its five stages'],
  steps:[
    {h:'What industrial relations covers',t:'<p>Industrial relations covers collective bargaining and all relations between workers and employers, and between workers and workers: almost everything to do with the atmosphere and climate of the workplace (Yesufu, 1962).</p><p>Parties: managers, employers’ associations, trade unions, individual employees, and government.</p>'},
    {h:'Two approaches',t:'<p><b>Unitary:</b> the organisation is one large, happy family with a common purpose, managed in a collaborative, paternalistic way. It works while employees accept it.</p><p><b>Pluralistic:</b> separate interests are openly admitted and arrangements made to resolve conflict that is seen as inevitable. Managers assert “managerial prerogatives”; unions challenge them.</p>'},
    {h:'Industrial conflict',t:'<p>Conflict is inevitable where people with different objectives meet, and not always bad: some conflict brings positive change. That is why conflict <b>management</b> is preferred to avoidance.</p>'},
    {h:'Collective bargaining',t:'<p>The process of resolving conflict over wages and conditions of work in which unions and employers negotiate directly and reach mutually agreed solutions. The term was coined by the Webbs (1902). It can produce substantive agreements (pay, holidays, hours) and procedural ones (how to discuss and settle disputes).</p>'},
    {h:'1. Pre-negotiation',t:'<p>Preparation: study the issues, the group you will bargain with, their background and experience, previous contracts, and their thinking and interests. Good preparation makes bargaining more efficient. Each side’s opening position appears on the line.</p>'},
    {h:'2. Selecting negotiators',t:'<p>A committee approach is preferred: the industrial relations or personnel officer, key department heads (rotating, so they learn), and a lawyer to separate feelings, facts, bluffs and conviction. Keep the chief executive out so he is not forced into an instant yes or no.</p>'},
    {h:'3. Bargaining strategy',t:'<p>Before entering the hall, management must know the <b>maximum concession</b> it can grant; watch the whole package (immediate Naira outlay and incremental costs); keep staff and the public informed; and not appear afraid of a strike. Where the two limits overlap is the zone of agreement.</p>'},
    {h:'4. Tactics',t:'<p>Fisher and Ury (1981) classify tricky tactics as <b>deliberate deception</b> (phoney facts, ambiguous authority), <b>psychological warfare</b> (stressful settings, personal attacks, good-guy/bad-guy, threats), and <b>positional pressure</b> (refusing to negotiate, escalating demands, reopening settled issues, calculated delay, take-it-or-leave-it).</p>'},
    {h:'Converging on a deal',t:'<p>With preparation and a clear strategy, the two positions move into the zone of agreement. The deal lands inside it, here at 15%.</p>'},
    {h:'5. The contract',t:'<p>The contract states the relationship between management and union for a period, typically two or three years. It covers union security, grievance procedures, promotion, transfer, layoffs, wages, cost of living, hours, holidays, overtime, incentives, discharge, safety and health.</p>'}
  ],
  scene:irScene,
  sandboxIntro:'Set each side’s limits and see whether a deal is possible.',
  sandbox(ctl,st){
    const s=H.svg(st,540,260);const p={mmax:18,umin:12,tac:'none'};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s41m',label:'Management maximum concession',min:0,max:40,value:18,fmt:v=>v+'%'},v=>{p.mmax=v;draw();});
    H.slider(ctl,{id:'s41u',label:'Union minimum acceptable',min:0,max:40,value:12,fmt:v=>v+'%'},v=>{p.umin=v;draw();});
    H.segBtns(ctl,'Union tactic',[['none','None'],['esc','Escalating demands'],['take','Take it or leave it']],'none',v=>{p.tac=v;draw();});
    function draw(){s.innerHTML='';const X=v=>30+v*12;el('line',{x1:X(0),x2:X(40),y1:130,y2:130,stroke:'var(--muted)','stroke-width':2},s);for(let v=0;v<=40;v+=5)t_(s,X(v),152,v+'%',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});
      const ok=p.mmax>=p.umin;if(ok)el('rect',{x:X(p.umin),y:108,width:X(p.mmax)-X(p.umin),height:44,fill:'var(--org-soft)'},s);
      el('line',{x1:X(p.mmax),x2:X(p.mmax),y1:80,y2:130,stroke:'var(--org)','stroke-width':3},s);t_(s,X(p.mmax),72,'mgmt max',{'text-anchor':'middle','font-size':11,'font-weight':700,fill:'var(--org)'});
      el('line',{x1:X(p.umin),x2:X(p.umin),y1:130,y2:190,stroke:'var(--emp)','stroke-width':3},s);t_(s,X(p.umin),206,'union min',{'text-anchor':'middle','font-size':11,'font-weight':700,fill:'var(--emp)'});
      let d=null,msg='';if(ok){d=(p.mmax+p.umin)/2;if(p.tac==='esc'){d=p.mmax-(p.mmax-p.umin)*.15;msg=' Escalating demands push the deal toward management’s limit, but risk souring relations.';}if(p.tac==='take'){if(p.mmax-p.umin<3){d=null;msg=' Take-it-or-leave-it with a narrow zone: talks break down.';}else{d=p.mmax;msg=' Management concedes its maximum under pressure.';}}}
      if(d!=null){el('path',{d:`M${X(d)} 116 L${X(d)+8} 130 L${X(d)} 144 L${X(d)-8} 130Z`,fill:'var(--ink)'},s);}
      ro.innerHTML=d!=null?`Deal possible: about <b>${d.toFixed(1)}%</b>.${msg}`:`<b>No zone of agreement.</b>${msg||' Expect deadlock: conciliation, arbitration or strike risk.'}`;}
    draw();H.tag(st,'Illustrative figures');
  },
  sae:{q:'Identify and discuss the roles and interests of the parties in your organisation’s industrial relations environment, and how their interests shift over time.',a:'Model structure: list the parties (managers, employers’ association, union, individual employees, government); state each one’s interests (e.g. managers: motivation, communication, efficiency through cooperation, sharing power in an organised way; unions: pay, security, recognition); explain shifts, for example from a unitary, paternalistic climate to a pluralistic one as employees seek to be treated maturely.'},
  tma:{q:'Identify and discuss briefly five major activities involved in the collective bargaining process.',outline:['Pre-negotiation: study issues, parties, past contracts','Selecting negotiators: committee, lawyer, keep the CEO out','Designing strategy: maximum concession, whole package, communication, not afraid of a strike','Choosing tactics: Fisher and Ury’s three categories, and choosing what works','Signing the contract: 2–3 years, typical contents']},
  quiz:[
    {q:'Seeing the organisation as “one large, happy family” is the…',o:['Pluralistic approach','Unitary approach','Contingency approach','Ombudsman approach'],a:1,w:'The unitary approach assumes a common purpose and collaborative, paternalistic management.'},
    {q:'Why keep the chief executive out of the negotiating team?',o:['He is too busy','So he is not forced into an instant yes or no','Unions refuse to meet him','It is illegal'],a:1,w:'Keeping him out allows careful deliberation on issues that deserve it.'},
    {q:'“Re-opening issues assumed to have been settled” is which kind of tactic?',o:['Deliberate deception','Psychological warfare','Positional pressure','Pre-negotiation'],a:2,w:'Fisher and Ury list it among positional pressure tactics.'},
    {q:'A typical labour contract lasts…',o:['3 months','6 months','2 to 3 years','10 years'],a:2,w:'The course says typical contracts are of two or three years.'}
  ],
  card:[{h:'Collective bargaining stages',ordered:true,items:['Pre-negotiation','Selecting negotiators','Designing strategy','Choosing tactics','Signing the contract']},
    {h:'Tricky tactics (Fisher and Ury)',items:['Deliberate deception','Psychological warfare','Positional pressure']},
    {h:'Approaches to IR',items:['Unitary','Pluralistic']}]
});

/* ================= 4.2 ================= */
const ITEMS=[
  {k:'Verbal',q:'Innocuous means the same as:',o:['Harmless','Preventative','Distasteful','Futile'],a:0,w:'Innocuous means harmless.'},
  {k:'Reasoning',q:'1 3 2 4 3 5 4 6 5 ___',o:['4','5','6','7'],a:3,w:'The pattern is +2, −1, repeating: 5 + 2 = 7.'},
  {k:'Reading',q:'In Nigerian politics each party must win support from people with differing views, so platforms build in conflicting objectives. Party platforms typically reflect:',o:['Unified principles','Prejudice','Compromise','Disagreement'],a:2,w:'Speaking to many groups at once means compromise.'}
];
function assessScene(stage){
  H.cap(stage,'Assessment methods');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,2]);t_(A,300,40,'Two families of assessment',{'text-anchor':'middle','font-size':15,'font-weight':700});
  box(A,230,62,140,36,'var(--ink)','none',18);t_(A,300,85,'Assessment',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--paper)'});
  el('path',{d:'M300 98 L150 150 M300 98 L450 150',stroke:'var(--muted)','stroke-width':2,fill:'none'},A);
  box(A,60,150,180,40,'var(--data-soft)','none',20);t_(A,150,175,'KSA-based',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--data)'});box(A,360,150,180,40,'var(--emp-soft)','none',20);t_(A,450,175,'Task-based',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--emp)'});
  const leaves=[['Cognitive ability',150,230,'d'],['Job knowledge',150,280,'d'],['Personality',150,330,'d'],['Biographical data',150,380,'d'],['Work sample',450,230,'e'],['Physical ability',450,280,'e']].map(([n,x,y,c],i)=>{const g=el('g',{},A);el('line',{x1:x,y1:190,x2:x,y2:y-15,stroke:'var(--line)'},g);box(g,x-90,y-15,180,30,'var(--card)',c==='d'?'var(--data)':'var(--emp)',15);t_(g,x,y+5,n,{'text-anchor':'middle','font-size':12,'font-weight':700});return g;});
  const aNote=t_(A,300,425,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  const B=tab(s);tabs.push([B,2,4]);t_(B,300,40,'Cognitive ability: sub-scores and one total',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const subs=[['Verbal',.8],['Numerical',.6],['Reasoning',.9],['Reading',.7]];const bars=subs.map(([n,v],i)=>{const x=80+i*90;t_(B,x+30,360,n,{'text-anchor':'middle','font-size':12});el('rect',{x,y:120,width:60,height:220,rx:4,fill:'var(--sunk)'},B);return {r:el('rect',{x,width:60,rx:4,fill:'var(--data)'},B),v,x};});
  el('rect',{x:470,y:120,width:70,height:220,rx:4,fill:'var(--sunk)'},B);const tot=el('rect',{x:470,width:70,rx:4,fill:'var(--org)'},B);t_(B,505,360,'General',{'text-anchor':'middle','font-size':12,'font-weight':700});t_(B,505,376,'mental ability',{'text-anchor':'middle','font-size':11});
  const bNote=t_(B,300,410,'',{'text-anchor':'middle','font-size':12.5});
  const C=tab(s);tabs.push([C,4,6]);t_(C,300,40,'',{});const cT=t_(C,300,40,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const big5=['Conscientiousness','Extraversion','Agreeableness','Openness to experience','Emotional stability'];const pEls=big5.map((n,i)=>{const g=el('g',{},C);const y=80+i*58;box(g,60,y,480,44,i===0?'var(--org-soft)':'var(--card)',i===0?'var(--org)':'var(--line)',22);t_(g,84,y+28,n,{'font-size':14,'font-weight':700});if(!i)t_(g,520,y+28,'most useful predictor across jobs',{'font-size':11.5,'text-anchor':'end',fill:'var(--org)'});return g;});
  const bio=el('g',{},C);box(bio,40,70,520,320,'var(--card)','var(--line)',12);t_(bio,60,100,'Biographical data: the best predictor of future performance is past performance',{'font-size':12.5,'font-weight':700});
  t_(bio,60,136,'To approximately how many volunteer organisations do you belong?',{'font-size':12.5});['0','1','2 to 4','5 or more'].forEach((o,i)=>{el('circle',{cx:76+i*110,cy:162,r:7,fill:'none',stroke:'var(--muted)'},bio);t_(bio,90+i*110,166,o,{'font-size':12});});
  t_(bio,60,200,'→ willingness to pitch in and help others',{'font-size':11.5,fill:'var(--data)'});
  t_(bio,60,240,'Accomplishment record',{'font-size':14,'font-weight':700,fill:'var(--org)'});wrap(bio,60,262,'Candidates write their most meritorious accomplishments in key skill areas (planning, customer service, conflict resolution) and name someone who can verify them. Trained evaluators score them with standard criteria.',78,{'font-size':12});
  return {update(t){showTabs(tabs,t);leaves.forEach((g,i)=>H.op(g,H.es(t,.1+i*.1,.25+i*.1)));aNote.textContent=t>=1?'Job knowledge tests suit candidates who must already know the job; not those trained after selection':'KSA = knowledge, skills and abilities';
    const tp=H.es(t,2.1,2.7),mp=H.es(t,3.1,3.7);bars.forEach(b=>{const h=220*b.v*tp;H.set(b.r,{y:340-h,height:h});});const avg=subs.reduce((a,b)=>a+b[1],0)/4;const th=220*avg*mp;H.set(tot,{y:340-th,height:th});
    bNote.textContent=mp>.3?'Sum all items: one total score = general mental ability':'Score each ability separately = specific mental abilities';
    const pers=t<5;pEls.forEach((g,i)=>H.op(g,pers?H.es(t,4.1+i*.08,4.25+i*.08):0));H.op(bio,pers?0:H.es(t,5,5.2));cT.textContent=pers?'Personality factors most assessed at work':'';
  }};
}
Course.add({id:'4.2',module:4,title:'Assessment Methods in Human Resources I',vizLabel:'A test family tree and a live mini-test',
  hook:{who:'Ola, HR analyst',text:'Ola’s bank wants to replace “who you know” with real tests for graduate trainees. Which tests measure what, and when is each one appropriate?'},
  objectives:['Distinguish KSA-based from task-based assessment','Explain cognitive ability tests, general and specific mental ability','Describe job knowledge, personality and biographical data assessments','Recognise sample items of each type'],
  steps:[
    {h:'KSA-based and task-based methods',t:'<p>Assessment methods can be used for internal selection (hiring or promoting from within) and external selection (hiring from outside). <b>KSA-based</b> methods measure knowledge, skills and abilities; <b>task-based</b> methods have candidates do job tasks.</p>'},
    {h:'Job knowledge tests',t:'<p>Measure critical technical knowledge needed for the job. Use them only when candidates must already have that knowledge at entry, <b>not</b> when they will be trained after selection. Usually multiple-choice, sometimes with essays.</p>'},
    {h:'Cognitive ability tests',t:'<p>Measure verbal, mathematical, reasoning and reading ability. They are extremely useful predictors of job performance and widely used. Usually multiple-choice, on paper or computer.</p>'},
    {h:'General vs specific ability',t:'<p>Score each ability separately and you get <b>specific</b> mental abilities. Add up all the correct answers and the single total measures <b>general mental ability</b>.</p>'},
    {h:'Personality tests',t:'<p>Traits relevant to the job predict later performance. Most assessed: conscientiousness, extraversion, agreeableness, openness to experience, emotional stability. <b>Conscientiousness</b> is the most useful predictor across many jobs.</p>'},
    {h:'Biographical data',t:'<p>Bio-data inventories ask about background, characteristics and interests, on the idea that past performance predicts future performance. The <b>accomplishment record</b> is a written account of achievements, verified by a referee and scored with standard criteria.</p>'}
  ],
  scene:assessScene,
  sandboxIntro:'Take the course’s own sample cognitive-ability items.',
  sandbox(ctl,st){
    const ro=H.readout(ctl);let score=0,done=0;const box_=H.h('div',{style:'display:grid;gap:12px;padding:14px'});st.append(box_);
    ITEMS.forEach(it=>{const card=H.h('div',{class:'q'},[H.h('div',{class:'eyebrow'},it.k+' ability'),H.h('div',{class:'qt'},it.q)]);const opts=H.h('div',{class:'opts'});let lock=false;
      it.o.forEach((o,i)=>{const b=H.h('button',{class:'opt',type:'button'},`${'abcd'[i]}. ${o}`);b.onclick=()=>{if(lock)return;lock=true;done++;if(i===it.a){score++;b.classList.add('right');}else{b.classList.add('wrong');opts.children[it.a].classList.add('right');}
        ro.innerHTML=`Score <b>${score} / ${done}</b>. ${it.w}${done===3?'<br>Sum these and you have a general mental ability score; keep them apart for specific abilities.':''}`;};opts.append(b);});card.append(opts);box_.append(card);});
    ro.innerHTML='Answer the three items. Note: the course’s numerical item (“16% of 62.5”) has a misprint: the true answer, 10, is not among its options, so it is left out here.';
  },
  tma:{q:'Explain cognitive ability tests, personality tests and integrity tests, and give two examples of each.',outline:['Cognitive ability: verbal, numerical, reasoning, reading; e.g. a synonym item and a number-series item','Personality: job-relevant traits, conscientiousness most predictive; e.g. “It does not make sense to work hard if no one will notice”','Integrity: honesty, trustworthiness, dependability; e.g. items on “white lies” and following the spirit vs the letter of rules (Unit 4.3)','Compare their validity, adverse impact, cost and applicant reactions (Table 2)']},
  sae:{q:'When should an organisation NOT use a job knowledge test?',a:'When candidates will be trained after selection on the knowledge the job needs. Job knowledge tests suit situations where candidates must already possess that body of knowledge at entry.'},
  quiz:[
    {q:'Adding up all correct answers across verbal, numerical and reasoning items gives a measure of…',o:['Specific mental abilities','General mental ability','Personality','Job knowledge'],a:1,w:'A single total score represents general mental ability.'},
    {q:'Which personality factor is the most useful predictor of performance across many jobs?',o:['Extraversion','Agreeableness','Conscientiousness','Openness'],a:2,w:'Research cited in the course points to conscientiousness.'},
    {q:'The idea behind biographical data inventories is that…',o:['Personality never changes','The best predictor of future performance is past performance','Interviews are useless','Only education matters'],a:1,w:'Bio-data assesses past performance in areas related to the job.'},
    {q:'Which is a task-based assessment?',o:['Personality test','Biographical data','Work sample test','Cognitive ability test'],a:2,w:'Work sample and physical ability tests have candidates perform job tasks.'}
  ],
  card:[{h:'KSA-based methods',items:['Cognitive ability tests','Job knowledge tests','Personality tests','Biographical data inventories']},{h:'Task-based methods',items:['Work sample tests','Physical ability tests']},{h:'Big Five factors at work',items:['Conscientiousness (most predictive)','Extraversion','Agreeableness','Openness to experience','Emotional stability']}]
});

/* ================= 4.3 ================= */
const TABLE=[
  ['Cognitive ability tests','High','High (against minorities)','Low/Low','Somewhat favourable',[3,3,1,1,2]],
  ['Job knowledge tests','High','High (against minorities)','Low/Low','More favourable',[3,3,1,1,3]],
  ['Personality tests','Low to moderate','Low','Low/Low','Less favourable',[1.5,1,1,1,1]],
  ['Biographical data inventories','Moderate','Low to high for different types','High/Low','Less favourable',[2,2,3,1,1]],
  ['Integrity tests','Moderate to high','Low','Low/Low','Less favourable',[2.5,1,1,1,1]],
  ['Structured interviews','High','Low','High/High','More favourable',[3,1,3,3,3]],
  ['Physical fitness tests','Moderate to high','High (against females and older workers)','High/High','More favourable',[2.5,3,3,3,3]],
  ['Physical ability tests','Moderate to high','High (against females and older workers)','High/High','More favourable',[2.5,3,3,3,3]]];
const AX=['Validity','Low adverse impact','Low development cost','Low admin cost','Applicant reactions'];
const toGood=v=>[v[0]/3,(4-v[1])/3,(4-v[2])/3,(4-v[3])/3,v[4]/3];
const COLS=['var(--data)','var(--org)','var(--emp)','var(--muted)','var(--err)','var(--ink)','var(--org)','var(--emp)'];
function radar(g,cx,cy,R,labels){for(let r=1;r<=3;r++)el('polygon',{points:labels.map((_,k)=>{const a=-Math.PI/2+k*2*Math.PI/labels.length;return [cx+Math.cos(a)*R*r/3,cy+Math.sin(a)*R*r/3].join(',');}).join(' '),fill:'none',stroke:'var(--line)'},g);
  labels.forEach((n,k)=>{const a=-Math.PI/2+k*2*Math.PI/labels.length;el('line',{x1:cx,y1:cy,x2:cx+Math.cos(a)*R,y2:cy+Math.sin(a)*R,stroke:'var(--line)'},g);const tx=cx+Math.cos(a)*(R+14),ty=cy+Math.sin(a)*(R+14)+4;t_(g,tx,ty,n,{'text-anchor':Math.abs(Math.cos(a))<.25?'middle':Math.cos(a)>0?'start':'end','font-size':11.5,'font-weight':700});});}
const rpts=(cx,cy,R,vals)=>vals.map((v,k)=>{const a=-Math.PI/2+k*2*Math.PI/vals.length;return [cx+Math.cos(a)*R*v,cy+Math.sin(a)*R*v].join(',');}).join(' ');
function assess2Scene(stage){
  H.cap(stage,'Choosing an assessment method');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,40,'Integrity tests',{'text-anchor':'middle','font-size':15,'font-weight':700});box(A,40,64,520,300,'var(--card)','var(--line)',12);
  wrap(A,60,96,'“It is alright to misrepresent the truth if being completely honest will create problems that small white lies can solve.”',66,{'font-size':13});
  ['Strongly disagree','Disagree','Neither','Agree','Strongly agree'].forEach((o,i)=>{el('circle',{cx:80+i*104,cy:170,r:8,fill:i===0?'var(--org)':'none',stroke:'var(--muted)'},A);t_(A,80+i*104,194,o,{'text-anchor':'middle','font-size':11});});
  wrap(A,60,240,'Measures attitudes and experiences related to honesty, trustworthiness and dependability. Multiple-choice, on paper or computer.',66,{'font-size':12.5,fill:'var(--muted)'});
  const B=tab(s);tabs.push([B,1,2]);t_(B,300,40,'Structured interview: a rating scale for one question',{'text-anchor':'middle','font-size':15,'font-weight':700});box(B,30,60,540,330,'var(--card)','var(--line)',12);
  wrap(B,50,90,'“Tell me about a time when you were able to establish rapport with someone when the situation made it difficult. What were the circumstances? What did you do? What were the results?”',76,{'font-size':12.5});
  [[1,'Low','Made minimal attempts to understand the person'],[3,'Moderate','Attempted to understand the other person’s perspective'],[5,'High','Reached out and actively sought to understand their perspective']].forEach(([n,l,d],i)=>{const x=50+i*175;box(B,x,180,160,150,i===2?'var(--org-soft)':'var(--sunk)','none',10);t_(B,x+80,214,String(n),{'text-anchor':'middle','font-size':26,'font-weight':700,class:'mono'});t_(B,x+80,236,l,{'text-anchor':'middle','font-size':13,'font-weight':700});wrap(B,x+80,262,d,22,{'text-anchor':'middle','font-size':11});});
  t_(B,300,368,'Standard rating criteria and trained interviewers make it predictive',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  const Cg=tab(s);tabs.push([Cg,2,3]);t_(Cg,300,40,'Task-based: fitness, work samples, physical ability',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Physical fitness','general activity, e.g. running a mile; does not copy job tasks'],['Work sample','mechanic: repair a car fault · clerk: typing, proofreading · cashier: count money · programmer: debugging'],['Physical ability','firefighter: climb a ladder with equipment, drag a hose · warehouse: lift and roll barrels; usually pass/fail on time']].forEach(([a,b],i)=>{const y=66+i*112;box(Cg,40,y,520,96,'var(--emp-soft)','none',10);t_(Cg,60,y+30,a,{'font-size':14,'font-weight':700,fill:'var(--emp)'});wrap(Cg,60,y+54,b,76,{'font-size':12});});
  const D=tab(s);tabs.push([D,3,6,true]);const dT=t_(D,300,34,'',{'text-anchor':'middle','font-size':15,'font-weight':700});radar(D,300,230,140,AX);
  const polys=TABLE.map((r,i)=>el('polygon',{points:rpts(300,230,140,toGood(r[5])),fill:COLS[i],'fill-opacity':.12,stroke:COLS[i],'stroke-width':2.5},D));
  const dN=t_(D,300,420,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  return {update(t){showTabs(tabs,t);const k=Math.floor(t);
    const n=Math.min(8,Math.floor(H.seg(t,3.05,4.9)*8)+1);polys.forEach((p,i)=>{const show=k>=5?1:(k===3?(i===0?1:0):(i<n?1:0));H.op(p,show);H.set(p,{'stroke-width':(k===4&&i===n-1)?4:2.2,'fill-opacity':(k===4&&i===n-1)?.25:.08});});
    dT.textContent=k===3?'Table 2 as a shape: cognitive ability tests':k===4?TABLE[n-1][0]:'All eight together: no shape wins every axis';
    dN.textContent=k===3?'Outer edge is good: high validity, low adverse impact, low cost, good reactions':k===4?`Validity ${TABLE[n-1][1]} · adverse impact ${TABLE[n-1][2]} · cost ${TABLE[n-1][3]} · ${TABLE[n-1][4]}`:'There is no simple formula for “one best” method';
  }};
}
Course.add({id:'4.3',module:4,title:'Assessment Methods in Human Resources II',vizLabel:'A radar of eight methods on four criteria',
  hook:{who:'Ola, HR analyst',text:'Ola’s shortlist of tests is ready, but the bank’s budget is small, the board worries about fairness to women and older applicants, and recruiters complain candidates hate long tests. Which method should she choose?'},
  objectives:['Describe integrity tests, structured interviews, physical fitness, work sample and physical ability tests','Explain the four criteria: validity, adverse impact, cost and applicant reactions','Compare methods using the course’s Table 2','Explain why there is no single best method'],
  steps:[
    {h:'Integrity tests',t:'<p>They measure attitudes and experiences related to honesty, trustworthiness and dependability, usually with multiple-choice agree/disagree items.</p>'},
    {h:'Structured interviews',t:'<p>The interview is the most common selection device, but most are unstructured and predict poorly. A <b>structured interview</b> asks a set of questions on critical KSAs, with <b>standard rating criteria</b>. Interviewers must be trained to probe and to apply the criteria.</p>'},
    {h:'Fitness, work samples and physical ability',t:'<p><b>Physical fitness</b> tests use general activities. <b>Work samples</b> mirror real job tasks and suit candidates expected to know the job already. <b>Physical ability</b> tests replicate demanding tasks, often pass/fail within a time limit.</p>'},
    {h:'Four criteria for choosing',t:'<p><b>Validity</b> (predicts later job performance), <b>adverse impact</b> (protected groups score lower), <b>cost</b> to develop and administer, and <b>applicant reactions</b>. On this radar the outer edge is always good, so adverse impact and cost axes read “low”.</p><p>Cognitive ability tests: high validity, low cost, but high adverse impact and only somewhat favourable reactions.</p>'},
    {h:'Method by method',t:'<p>Each shape is one row of the course’s Table 2. Structured interviews: high validity and low adverse impact, but high cost. Physical tests: favourable reactions but high adverse impact against women and older workers.</p>'},
    {h:'No “one best” method',t:'<p>Overlay all eight: none fills every axis. HR professionals must understand the trade-offs and choose what fits their situation and budget.</p>'}
  ],
  scene:assess2Scene,
  sandboxIntro:'Weight the four criteria for your organisation and see the methods re-rank.',
  sandbox(ctl,st){
    const w={v:40,a:25,c:20,r:15};const ro=H.readout(ctl);const s=H.svg(st,540,360);
    [['v','Validity'],['a','Low adverse impact'],['c','Low cost'],['r','Applicant reactions']].forEach(([k,l])=>H.slider(ctl,{id:'s43'+k,label:l,min:0,max:100,step:5,value:w[k],fmt:v=>v},v=>{w[k]=v;draw();}));
    function draw(){s.innerHTML='';const tot=w.v+w.a+w.c+w.r||1;const sc=TABLE.map(r=>{const g=toGood(r[5]);return [r[0],(w.v*g[0]+w.a*g[1]+w.c*(g[2]+g[3])/2+w.r*g[4])/tot];}).sort((a,b)=>b[1]-a[1]);
      sc.forEach(([n,v],i)=>{const y=14+i*42;t_(s,10,y+21,n,{'font-size':12.5,'font-weight':700});el('rect',{x:220,y:y+6,width:280,height:22,rx:4,fill:'var(--sunk)'},s);el('rect',{x:220,y:y+6,width:280*v,height:22,rx:4,fill:i===0?'var(--org)':'var(--data-soft)'},s);t_(s,508,y+22,(v*100).toFixed(0),{'font-size':12,class:'mono'});});
      ro.innerHTML=`Best fit for your weights: <b>${sc[0][0]}</b>.<br>Change the weights and the order changes: there is no single best method.`;}
    draw();H.tag(st,'Ratings from Table 2, mapped to a 1–3 scale');
  },
  tma:{q:'Construct example items for a structured interview, an integrity test and a work sample test.',outline:['Structured interview: a behavioural question on a critical KSA plus 1/3/5 rating anchors','Integrity test: two agree/disagree statements on honesty and rule-following','Work sample: a real job task (e.g. proofread a letter; count cash and total a sheet) with a scoring checklist','Note when each is appropriate and its standing on the four criteria']},
  sae:{q:'Using Table 2, which method would you pick if fairness to women and older workers is the top concern, and what is the trade-off?',a:'Structured interviews (or integrity tests): both have low adverse impact. Structured interviews also have high validity and favourable reactions, but high development and administration cost. Avoid physical fitness and physical ability tests, which have high adverse impact against women and older workers.'},
  quiz:[
    {q:'In Table 2, which method has high validity AND low adverse impact?',o:['Cognitive ability tests','Structured interviews','Physical ability tests','Job knowledge tests'],a:1,w:'Structured interviews: high validity, low adverse impact, high cost, favourable reactions.'},
    {q:'Adverse impact means…',o:['A test is expensive','Protected group members score lower than the majority','Applicants dislike the test','The test is unreliable'],a:1,w:'It is the extent to which protected groups score lower.'},
    {q:'Why are unstructured interviews weak?',o:['They are too long','No agreed questions or standards, so they predict poorly','They are illegal','They cost too much'],a:1,w:'Research shows unstructured interviews are not particularly useful for predicting performance.'},
    {q:'Physical fitness tests differ from physical ability tests because they…',o:['Copy actual job tasks','Use general activities, not job tasks','Are always pass/fail','Measure honesty'],a:1,w:'Fitness tests use general activities like running a mile; ability tests replicate job tasks.'}
  ],
  card:[{h:'Four criteria',items:['Validity','Adverse impact','Cost (develop / administer)','Applicant reactions']},
    {h:'Table 2 highlights',items:['Cognitive ability: high validity, high adverse impact, low cost','Structured interview: high validity, low adverse impact, high cost','Personality: low–moderate validity, low adverse impact','Physical tests: high adverse impact vs women and older workers']}]
});

/* ================= 4.4 ================= */
const SIX=['talkative','assertive','outgoing','imaginative','creative','intellectual'];const SCR=[0,4,1,5,2,3];
function validityScene(stage){
  H.cap(stage,'Validity: does the test mean what we claim?');
  let T=0;const rnd=H.seeded(13);const pts3=SIX.map((n,i)=>({n,i,s:[(rnd()-.5)*8,(rnd()-.5)*6,(rnd()-.5)*6],j:[(rnd()-.5),(rnd()-.5),(rnd()-.5)]}));
  const o=H.c3(stage,{yaw:.4,pitch:.3,dist:16,f:1.1,spin:.004,render(ctx,o){const vis=H.es(T,5,5.3)*(1-H.es(T,6.9,7.05));if(vis<=0)return;const C=o.col;ctx.globalAlpha=vis;
    [[[-5,0,0],[5,0,0],'Factor 1'],[[0,-4,0],[0,4,0],'Factor 2']].forEach(([a,b,l])=>{H.c3line(ctx,o,a,b,C.line,1.5);H.c3text(ctx,o,b,l,C.muted,12);});
    const p=H.es(T,5.15,5.9),fuzz=H.es(T,6.1,6.6);const P=pts3.map(q=>{const tgt=q.i<3?[-3+q.i*.6,2.2-q.i*.5,q.i*.4]:[2.6+(q.i-3)*.5,-1.8+(q.i-3)*.5,-(q.i-3)*.4];const pos=q.s.map((v,k)=>H.lerp(v,tgt[k],p)+q.j[k]*fuzz*2.2);return {q,pos};});
    // links within clusters
    P.forEach(a=>P.forEach(b=>{if(a.q.i<b.q.i&&(a.q.i<3)===(b.q.i<3)&&p>.5){H.c3line(ctx,o,a.pos,b.pos,a.q.i<3?C.data:C.emp,1.5*(1-fuzz*.6));}}));
    P.sort((a,b)=>o.proj(b.pos)[2]-o.proj(a.pos)[2]).forEach(({q,pos})=>{const pr=o.proj(pos);ctx.fillStyle=q.i<3?C.data:C.emp;ctx.beginPath();ctx.arc(pr[0],pr[1],Math.max(5,.3*pr[3]),0,Math.PI*2);ctx.fill();ctx.fillStyle=C.ink;ctx.font='700 12px "Atkinson Hyperlegible",sans-serif';ctx.textAlign='left';ctx.fillText(q.n,pr[0]+10,pr[1]+4);});
    if(p>.7){H.c3text(ctx,o,[-3,3.6,0],'cluster 1',C.data,13);H.c3text(ctx,o,[3,-3.4,0],'cluster 2',C.emp,13);}ctx.globalAlpha=1;}});
  const ov=H.h('div',{style:'position:absolute;inset:0;pointer-events:none'});stage.append(ov);const s=H.svg(ov,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);box(A,40,70,520,300,'var(--card)','var(--line)',12);H.person(A,110,220,'var(--emp)',2.6);t_(A,110,262,'applicant',{'text-anchor':'middle','font-size':11});
  el('path',{d:'M150 220 L230 220',stroke:'var(--muted)','stroke-width':2},A);box(A,230,190,130,60,'var(--sunk)','none',8);t_(A,295,216,'personality',{'text-anchor':'middle','font-size':12,'font-weight':700});t_(A,295,234,'inventory',{'text-anchor':'middle','font-size':12,'font-weight':700});
  el('path',{d:'M360 220 L430 220',stroke:'var(--muted)','stroke-width':2},A);box(A,430,190,110,60,'var(--err-soft)','none',8);t_(A,485,226,'Not hired',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--err)'});
  t_(A,300,110,'What does it measure? Where is the evidence?',{'text-anchor':'middle','font-size':14,'font-weight':700});t_(A,300,320,'“In my experience it is accurate” is not evidence.',{'text-anchor':'middle','font-size':13,fill:'var(--err)','font-weight':700});
  const B=tab(s);tabs.push([B,1,2]);box(B,40,60,520,330,'var(--card)','var(--line)',12);t_(B,60,92,'Basic definition',{'font-size':13,'font-weight':700,fill:'var(--muted)'});wrap(B,60,114,'“The degree to which a test measures what it is supposed to measure.”',70,{'font-size':13.5});
  t_(B,60,168,'Contemporary definition (AERA, APA & NCME, 1999)',{'font-size':13,'font-weight':700,fill:'var(--org)'});wrap(B,60,190,'“The degree to which evidence and theory support the interpretations of test scores entailed by the proposed uses of a test.”',70,{'font-size':13.5});
  t_(B,60,262,'Traditional three types',{'font-size':13,'font-weight':700});['Content','Criterion','Construct'].forEach((n,i)=>{box(B,60+i*165,276,150,40,'var(--data-soft)','none',20);t_(B,135+i*165,301,n,{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--data)'});});
  t_(B,300,350,'A test is not valid or invalid in itself: its interpretations are.',{'text-anchor':'middle','font-size':12.5,fill:'var(--muted)'});
  const Cc=tab(s);tabs.push([Cc,2,3]);t_(Cc,300,44,'Evidence from test content',{'text-anchor':'middle','font-size':15,'font-weight':700});
  el('circle',{cx:250,cy:220,r:120,fill:'var(--org-soft)',opacity:.8},Cc);el('circle',{cx:360,cy:220,r:110,fill:'var(--data-soft)',opacity:.8},Cc);t_(Cc,190,224,'Construct',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--org)'});t_(Cc,420,224,'Test content',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--data)'});
  t_(Cc,165,370,'construct under-',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--err)'});t_(Cc,165,386,'representation',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--err)'});t_(Cc,450,370,'construct-irrelevant',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--err)'});t_(Cc,450,386,'content',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--err)'});
  // matrix
  const M=tab(s);tabs.push([M,3,5]);const mT=t_(M,300,40,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const cs=46,mx0=170,my0=90;
  const R=(a,b)=>a===b?1:((a<3)===(b<3)?.65+.05*((a+b)%3):0);const rnd2=H.seeded(4);const noise=SIX.map(()=>SIX.map(()=>(rnd2()-.5)*.5));
  const cells=[];for(let a=0;a<6;a++)for(let b=0;b<6;b++){const r=el('rect',{width:cs-3,height:cs-3,rx:4},M);const tx=t_(M,0,0,'',{'text-anchor':'middle','font-size':11,class:'mono'});cells.push({a,b,r,tx});}
  const rl=SIX.map(n=>t_(M,0,0,n,{'text-anchor':'end','font-size':11.5,'font-weight':700})),cl=SIX.map(n=>t_(M,0,0,n,{'text-anchor':'start','font-size':11.5,'font-weight':700}));
  const mN=t_(M,300,400,'',{'text-anchor':'middle','font-size':12.5});
  const N=tab(s);tabs.push([N,6,7]);const nT=t_(N,300,40,'48 items → 48 × 47 / 2 = 1,128 correlations',{'text-anchor':'middle','font-size':15,'font-weight':700});t_(N,300,420,'Real correlations are often near .18 or −.32, not .70: clusters blur. Eyeballing fails.',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  const F=tab(s);tabs.push([F,7,8]);t_(F,300,44,'What factor analysis tells us',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['A','How many factors are in a set of items'],['B','Which items belong to which factor'],['C','How the factors relate to each other']].forEach(([a,b],i)=>{const y=86+i*96;box(F,60,y,480,76,'var(--data-soft)','none',12);t_(F,96,y+48,a,{'font-size':26,'font-weight':700,fill:'var(--data)',class:'mono','text-anchor':'middle'});t_(F,130,y+44,b,{'font-size':14,'font-weight':700});});
  const P=tab(s);tabs.push([P,8,9,true]);t_(P,300,44,'Evidence from response processes',{'text-anchor':'middle','font-size':15,'font-weight':700});
  box(P,150,70,300,40,'var(--sunk)','none',8);t_(P,300,95,'Item: “I often attend parties”',{'text-anchor':'middle','font-size':13,'font-weight':700});
  const flow=['Reads the item','Recalls how many parties','Judges whether that is “often”','Marks the answer'];const fEls=flow.map((f,i)=>{const g=el('g',{},P);const y=140+i*62;box(g,170,y,260,44,'var(--org-soft)','none',22);t_(g,300,y+27,f,{'text-anchor':'middle','font-size':13});if(i<3)t_(g,300,y+58,'↓',{'text-anchor':'middle','font-size':16,fill:'var(--muted)'});return g;});
  const pN=t_(P,300,420,'',{'text-anchor':'middle','font-size':12.5,'font-weight':700,fill:'var(--err)'});
  return {update(t){T=t;o.dirty=true;showTabs(tabs,t);
    const ord=H.es(t,4.1,4.8);mT.textContent=t<4?'Six items, scrambled: can you see a pattern?':'Re-ordered: two bright blocks appear';mN.textContent=t<4?'darker = stronger correlation (made-up values, as in the course’s Table XX-1)':'talkative, assertive, outgoing go together; so do imaginative, creative, intellectual';
    const posOf=i=>H.lerp(SCR.indexOf(i),i,ord);
    cells.forEach(c=>{const x=mx0+posOf(c.b)*cs,y=my0+posOf(c.a)*cs;const r=H.clamp(R(c.a,c.b));H.set(c.r,{x,y,fill:r>.9?'var(--ink)':r>.5?'var(--data)':'var(--sunk)','fill-opacity':r>.9?.85:r>.5?.85:1});H.set(c.tx,{x:x+cs/2-1.5,y:y+cs/2+3,fill:r>.5?'var(--card)':'var(--muted)'});c.tx.textContent=c.a===c.b?'1':r>0?'.'+String(Math.round(r*100)).padStart(2,'0'):'.00';});
    rl.forEach((l,i)=>H.set(l,{x:mx0-8,y:my0+posOf(i)*cs+cs/2+3}));cl.forEach((l,i)=>H.set(l,{x:0,y:0,transform:`translate(${mx0+posOf(i)*cs+cs/2},${my0-8}) rotate(-40)`}));
    fEls.forEach((g,i)=>H.op(g,H.es(t,8+i*.15,8.15+i*.15)));pN.textContent=t>8.7?'If respondents use a different process, scores may not mean what was intended':'';
  }};
}
Course.add({id:'4.4',module:4,title:'Test of Validity in Personnel Assessment',vizLabel:'A correlation grid that sorts itself into 3D clusters',
  hook:{who:'Uche, graduate applicant',text:'Uche applied for her dream job, took a personality inventory, and was rejected a week later. The HR director says the questionnaire is “accurate in her experience”. Is that enough?'},
  objectives:['Give the basic and contemporary definitions of validity','Name the traditional types of validity','Explain evidence from test content, internal structure and response processes','Explain how factor analysis reveals internal structure'],
  steps:[
    {h:'A question of validity',t:'<p>If a test helps decide who gets a job, the user must show what it measures, why it should relate to the job, and that scores really are related to performance. A user’s personal experience is not adequate evidence.</p>'},
    {h:'What validity is',t:'<p>Basic: “the degree to which a test measures what it is supposed to measure.” Contemporary (AERA, APA & NCME, 1999): “the degree to which evidence and theory support the interpretations of test scores entailed by the proposed uses of a test.” So validity belongs to interpretations, not to the test itself.</p><p>Traditionally there were three types: <b>content</b>, <b>criterion</b> and <b>construct</b> validity.</p>'},
    {h:'Evidence from test content',t:'<p>The content of a test should reflect the important facets of the construct, no more and no less. Two threats: <b>construct-irrelevant content</b> (items that do not belong, e.g. questions on Freud’s life in a test on his theory) and <b>construct under-representation</b> (missing facets).</p>'},
    {h:'Evidence from internal structure',t:'<p>Give a six-item personality questionnaire to 100 people and correlate the items. In this scrambled order, it is hard to see any pattern.</p>'},
    {h:'The pattern appears',t:'<p>Re-order the items and two blocks light up. <b>Talkative, assertive, outgoing</b> correlate strongly with each other; so do <b>imaginative, creative, intellectual</b>. Between the clusters the correlation is zero: the questionnaire has a <b>two-factor structure</b>.</p>'},
    {h:'Seeing the factors in space',t:'<p>Treat each item as a point. Items that correlate strongly sit close together. The six points drift into two separate clusters: the two factors.</p>'},
    {h:'Why we need factor analysis',t:'<p>With 48 items there are more than 1,100 correlations to inspect. Real correlations are often around .18 or −.32, so clusters blur. Factor analysis processes the correlations for us.</p>'},
    {h:'Three things factor analysis reveals',t:'<p><b>(A)</b> how many factors a set of items contains; <b>(B)</b> which items belong to which factor; <b>(C)</b> how the factors relate to each other. If the theory says the factors are independent, they should be uncorrelated.</p>'},
    {h:'Evidence from response processes',t:'<p>Validity also needs a match between the processes people <b>actually</b> use when answering and the processes they <b>should</b> use. For “I often attend parties”, the developer assumes respondents recall and judge their party-going.</p>'}
  ],
  scene:validityScene,
  sandboxIntro:'Add noise to the six-item correlations and see whether the two factors are still visible.',
  sandbox(ctl,st){
    const s=H.svg(st,540,360);let noise=0,shuf=false;const ro=H.readout(ctl);
    H.slider(ctl,{id:'s44n',label:'Noise in real data',min:0,max:100,step:5,value:0,fmt:v=>v+'%'},v=>{noise=v;draw();});
    H.segBtns(ctl,'Item order',[[false,'Grouped'],[true,'Scrambled']],false,v=>{shuf=v;draw();});
    const r=H.seeded(9);const nz=SIX.map(()=>SIX.map(()=>r()-.5));
    function draw(){s.innerHTML='';const ord=shuf?SCR:[0,1,2,3,4,5];const cs=46,x0=150,y0=50;
      ord.forEach((a,i)=>{t_(s,x0-8,y0+i*cs+cs/2+4,SIX[a],{'text-anchor':'end','font-size':11.5,'font-weight':700});ord.forEach((b,j)=>{let v=a===b?1:((a<3)===(b<3)?.68:0);if(a!==b){const n=(nz[Math.min(a,b)][Math.max(a,b)])*noise/100*1.1;v=H.clamp(v*(1-noise/150)+n,-1,1);}
        const col=v>.5?'var(--data)':v>.25?'var(--data-soft)':v<-.2?'var(--err-soft)':'var(--sunk)';el('rect',{x:x0+j*cs,y:y0+i*cs,width:cs-3,height:cs-3,rx:4,fill:a===b?'var(--ink)':col},s);
        t_(s,x0+j*cs+cs/2-1.5,y0+i*cs+cs/2+4,a===b?'1':(v<0?'−':'')+'.'+String(Math.round(Math.abs(v)*100)).padStart(2,'0'),{'text-anchor':'middle','font-size':10.5,class:'mono',fill:a===b||v>.5?'var(--card)':'var(--ink)'});});});
      ro.innerHTML=noise<30?'<b>Two clear factors.</b> Easy to see by eye.':noise<70?'<b>Factors blur.</b> You can still guess, but you need factor analysis to be sure.':'<b>Hard to see anything.</b> This is what real data with many items feels like: use factor analysis.';}
    draw();H.tag(st,'Made-up correlations');
  },
  tma:{q:'Give at least two definitions of validity, and explain how response processes can provide validity evidence.',outline:['Basic definition: the degree to which a test measures what it is supposed to measure','Contemporary: the degree to which evidence and theory support the interpretations of test scores for proposed uses (AERA, APA & NCME, 1999)','Validity belongs to interpretations, not tests','Response processes: the processes respondents actually use should match the processes the construct assumes; example “I often attend parties”','Mention content and internal-structure evidence for completeness']},
  sae:{q:'A test of “knowledge of Freud as covered in class” includes questions on Freud’s childhood that were never taught. What threat to validity is this?',a:'Construct-irrelevant content: material extraneous to the construct the test is meant to measure, which reduces validity.'},
  quiz:[
    {q:'Which is the contemporary definition of validity?',o:['How consistent scores are over time','The degree to which evidence and theory support score interpretations for proposed uses','How long a test takes','How many items a test has'],a:1,w:'AERA, APA & NCME (1999).'},
    {q:'Items that correlate strongly with each other but not with others form a…',o:['Halo','Factor','Criterion','Grade'],a:1,w:'Highly correlated clusters of items are called factors.'},
    {q:'How many correlations are there among 48 items?',o:['96','480','1,128','2,304'],a:2,w:'48 × 47 / 2 = 1,128: “more than 1,100” in the course.'},
    {q:'Missing important facets of a construct in a test is called…',o:['Construct-irrelevant content','Construct under-representation','Discriminant evidence','Recency'],a:1,w:'Under-representation leaves parts of the construct unmeasured.'}
  ],
  card:[{h:'Types of validity evidence (this unit)',items:['Test content','Internal structure','Response processes']},{h:'Threats to content validity',items:['Construct-irrelevant content','Construct under-representation']},{h:'Factor analysis tells us',items:['How many factors','Which items load on which factor','How factors relate']}]
});

/* ================= 4.5 ================= */
function assocScene(stage){
  H.cap(stage,'Validity evidence from associations');H.tag(stage);
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,44,'What theory predicts for a self-esteem test (RSEI)',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Happiness','positive','var(--org)'],['Social motivation','positive','var(--org)'],['Depression','negative','var(--err)'],['Intelligence','about zero','var(--muted)']].forEach(([a,b,c],i)=>{const y=80+i*78;box(A,90,y,420,58,'var(--card)','var(--line)',10);t_(A,114,y+35,a,{'font-size':15,'font-weight':700});t_(A,486,y+35,b,{'text-anchor':'end','font-size':15,'font-weight':700,fill:c});});
  const B=tab(s);tabs.push([B,1,6]);const ax=H.axes(B,{x:80,y:80,w:440,h:270,xmin:-3,xmax:3,ymin:-3,ymax:3,xt:[],yt:[]});
  const xl=t_(B,520,384,'',{'text-anchor':'end','font-size':12.5,'font-weight':700}),yl=t_(B,80,68,'',{'font-size':12.5,'font-weight':700});
  const rr=H.seeded(17);const P=Array.from({length:70},()=>({x:H.gauss(rr)*.95,e:H.gauss(rr)*.95,c:el('circle',{r:4.5,fill:'var(--data)','fill-opacity':.75},B)}));const line=el('line',{stroke:'var(--org)','stroke-width':3},B);
  const rT=t_(B,500,110,'',{'text-anchor':'end','font-size':22,'font-weight':700,class:'mono'});const bT=t_(B,300,36,'',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const tl=el('g',{},B);el('line',{x1:120,x2:480,y1:418,y2:418,stroke:'var(--muted)','stroke-width':2},tl);const tA=el('circle',{cx:150,cy:418,r:6,fill:'var(--data)'},tl),tB=el('circle',{cy:418,r:6,fill:'var(--org)'},tl);t_(tl,150,436,'test taken',{'text-anchor':'middle','font-size':10.5});const tBt=t_(tl,0,436,'',{'text-anchor':'middle','font-size':10.5});
  const Cc=tab(s);tabs.push([Cc,6,8]);const cT=t_(Cc,300,44,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const cBody=el('g',{},Cc);
  const D=tab(s);tabs.push([D,8,9,true]);t_(D,300,40,'Reliability is needed for validity, but does not guarantee it',{'text-anchor':'middle','font-size':14,'font-weight':700});
  const tgt=(g,cx,cy,R,lab,sp,ox)=>{[1,.66,.33].forEach((k,i)=>el('circle',{cx,cy,r:R*k,fill:i%2?'var(--card)':'var(--sunk)',stroke:'var(--line)'},g));el('circle',{cx,cy,r:5,fill:'var(--org)'},g);const r=H.seeded(cx);for(let i=0;i<9;i++){const a=r()*6.28,d=Math.sqrt(r())*sp*R;el('circle',{cx:cx+ox*R+Math.cos(a)*d,cy:cy-ox*R*.5+Math.sin(a)*d,r:4.5,fill:'var(--emp)'},g);}t_(g,cx,cy+R+20,lab,{'text-anchor':'middle','font-size':12.5,'font-weight':700});};
  tgt(D,160,200,100,'Reliable, interpreted invalidly',.15,.45);tgt(D,440,200,100,'Reliable and valid',.15,0);t_(D,300,370,'Reliability: a property of test responses',{'text-anchor':'middle','font-size':12.5});t_(D,300,390,'Validity: a property of the interpretation of scores',{'text-anchor':'middle','font-size':12.5});
  const cfg=[null,[.55,'Self-esteem score','Happiness','Convergent evidence: related construct, positive r'],[-.5,'Self-esteem score','Depression','Convergent evidence: expected negative r'],[0,'Self-esteem score','Intelligence','Discriminant evidence: unrelated construct, r ≈ 0'],[.5,'SAT score','High-school GPA (same time)','Concurrent validity'],[.42,'SAT score','First-year college GPA (a year later)','Predictive validity']];
  return {update(t){showTabs(tabs,t);const k=H.clamp(Math.floor(t),1,5);const prev=cfg[Math.max(1,k-1)],cur=cfg[k];const m=H.es(t,k,k+.5);const r=k===1?cur[0]*H.es(t,1,1.5):H.lerp(prev[0],cur[0],m);
    const q=Math.sqrt(1-r*r);P.forEach(p=>{H.set(p.c,{cx:ax.sx(H.clamp(p.x,-2.9,2.9)),cy:ax.sy(H.clamp(r*p.x+q*p.e,-2.9,2.9))});});H.set(line,{x1:ax.sx(-2.8),y1:ax.sy(-2.8*r),x2:ax.sx(2.8),y2:ax.sy(2.8*r)});
    rT.textContent='r = '+(r<0?'−':'+')+Math.abs(r).toFixed(2);H.set(rT,{fill:r>.2?'var(--org)':r<-.2?'var(--err)':'var(--muted)'});xl.textContent=cur[1]+' →';yl.textContent='↑ '+cur[2];bT.textContent=cur[3];
    const tp=H.es(t,5,5.6);H.op(tl,H.es(t,4,4.2));H.set(tB,{cx:H.lerp(150,420,tp)});H.set(tBt,{x:H.lerp(150,420,tp),y:tp>.1?436:452});tBt.textContent=tp>.5?'GPA a year later':'GPA now';
    const ck=Math.floor(t);cBody.innerHTML='';
    if(ck===6){cT.textContent='Consequences of testing';box(cBody,40,70,520,320,'var(--card)','var(--line)',12);
      wrap(cBody,60,104,'The Standards say validity includes “the intended and unintended consequences of test use” (AERA, APA & NCME, 1999, p. 16).',70,{'font-size':13});
      wrap(cBody,60,170,'Cronbach (1988): developers and users must review whether a practice has appropriate consequences and guard against adverse ones.',70,{'font-size':13});
      el('rect',{x:120,y:250,width:140,height:100,rx:6,fill:'var(--data)'},cBody);el('rect',{x:340,y:290,width:140,height:60,rx:6,fill:'var(--emp)'},cBody);t_(cBody,190,370,'benefit to group A',{'text-anchor':'middle','font-size':11.5});t_(cBody,410,370,'benefit to group B',{'text-anchor':'middle','font-size':11.5});
      t_(cBody,300,240,'Are scores equally valid for both groups?',{'text-anchor':'middle','font-size':12.5,'font-weight':700,fill:'var(--err)'});}
    if(ck===7){cT.textContent='Criterion validity and other perspectives';box(cBody,40,70,520,320,'var(--card)','var(--line)',12);
      wrap(cBody,60,104,'Criterion validity: how well scores predict a criterion such as job performance. A practical HR director may care only that the test separates good employees from poor ones.',70,{'font-size':13});
      wrap(cBody,60,190,'Concurrent and predictive validity are the two traditional types of criterion validity.',70,{'font-size':13});
      wrap(cBody,60,240,'Messick (1993): criterion evidence is not enough on its own. The meaning of the measure, its construct validity, must always be pursued.',70,{'font-size':13,'font-weight':700,fill:'var(--org)'});}
  }};
}
Course.add({id:'4.5',module:4,title:'Validity Evidence: Associations with Other Variables',vizLabel:'A scatter plot whose correlation moves',
  hook:{who:'Ola, HR analyst',text:'Ola’s new aptitude test correlates with supervisor ratings at r = 0.45. Is that good? It depends on what else it correlates with, when the ratings were taken, and what theory said should happen.'},
  objectives:['Explain convergent and discriminant evidence','Distinguish concurrent from predictive validity evidence','Explain consequences of testing and criterion validity','Contrast reliability and validity'],
  steps:[
    {h:'Theory sets the expected pattern',t:'<p>If a test’s actual correlations with other measures match the pattern theory predicts, we gain evidence it measures what we claim. For a self-esteem test (RSEI): positive with happiness and social motivation, negative with depression, near zero with intelligence.</p>'},
    {h:'Convergent evidence',t:'<p>Scores should correlate with tests of <b>related</b> constructs. Self-esteem against happiness: the cloud tilts upward and <b>r</b> rises to about +0.55. Each dot is one person.</p>'},
    {h:'A negative correlation can also support validity',t:'<p>Self-esteem against depression: the cloud tilts down, r ≈ −0.50. Theory expected a negative relationship, so this too is convergent evidence.</p>'},
    {h:'Discriminant evidence',t:'<p>Scores should be <b>uncorrelated</b> with tests of unrelated constructs. Self-esteem against intelligence: a round cloud, flat line, r ≈ 0. Finding a strong correlation here would be a warning sign.</p>'},
    {h:'Concurrent validity',t:'<p>Correlation with relevant variables measured <b>at the same time</b>: SAT scores against high-school GPA from the same senior year.</p>'},
    {h:'Predictive validity',t:'<p>Correlation with variables measured <b>in the future</b>: SAT scores against first-year college GPA, a year or more later. Both concurrent and predictive validity are varieties of convergent evidence.</p>'},
    {h:'Consequences of testing',t:'<p>The contemporary view adds the <b>social consequences</b> of testing as a facet of validity. If a test benefits one group more than another, users must ask whether scores are equally valid for both.</p>'},
    {h:'Criterion validity',t:'<p>A practical view: can the test predict a criterion like job performance? Concurrent and predictive validity are its two traditional types. Messick (1993) warns that criterion evidence alone is not enough; the meaning of the measure must be pursued.</p>'},
    {h:'Reliability vs validity',t:'<p>Reliability: differences in scores reflect real differences in whatever trait affects them; a property of test <b>responses</b>. Validity: a property of the <b>interpretation</b> of scores. A test must be reliable to be interpreted validly, but a reliable test is not automatically valid.</p>'}
  ],
  scene:assocScene,
  sandboxIntro:'Drag the correlation and see what the cloud of people looks like.',
  sandbox(ctl,st){
    const s=H.svg(st,540,360);let r=.45,n=80;const ro=H.readout(ctl);
    H.slider(ctl,{id:'s45r',label:'Correlation r',min:-1,max:1,step:.05,value:.45,fmt:v=>(v>0?'+':'')+v.toFixed(2)},v=>{r=v;draw();});
    H.slider(ctl,{id:'s45n',label:'People tested',min:20,max:300,step:10,value:80},v=>{n=v;draw();});
    const rnd=H.seeded(23);const base=Array.from({length:300},()=>[H.gauss(rnd),H.gauss(rnd)]);
    function draw(){s.innerHTML='';const g=el('g',{},s);const ax=H.axes(g,{x:50,y:20,w:460,h:290,xmin:-3,xmax:3,ymin:-3,ymax:3,xt:[],yt:[],xl:'Test score →',yl:'↑ Job performance rating'});const q=Math.sqrt(1-r*r);
      base.slice(0,n).forEach(([x,e])=>el('circle',{cx:ax.sx(H.clamp(x,-2.9,2.9)),cy:ax.sy(H.clamp(r*x+q*e,-2.9,2.9)),r:4,fill:'var(--data)','fill-opacity':.7},g));el('line',{x1:ax.sx(-2.8),y1:ax.sy(-2.8*r),x2:ax.sx(2.8),y2:ax.sy(2.8*r),stroke:'var(--org)','stroke-width':3},g);
      const a=Math.abs(r);ro.innerHTML=`r = <b>${r.toFixed(2)}</b> · r² = <b>${(r*r).toFixed(2)}</b> (share of variation in ratings linked to the test)<br>${a<.1?'Essentially no relationship: if theory expected one, the evidence fails; if not, this is discriminant evidence.':a<.3?'A weak relationship.':a<.5?'A moderate relationship, typical of useful selection tests.':'A strong relationship.'}`;}
    draw();H.tag(st,'Simulated data');
  },
  tma:{q:'With examples, distinguish between concurrent validity evidence and predictive validity evidence.',outline:['Both relate test scores to other relevant variables (criterion / convergent evidence)','Concurrent: criterion measured at the same time; e.g. SAT vs high-school GPA in the senior year','Predictive: criterion measured in the future; e.g. SAT vs first-year college GPA','HR example: test current staff and correlate with this year’s appraisal (concurrent) vs test applicants and correlate with appraisal a year after hiring (predictive)','Note Messick: criterion evidence is not sufficient alone']},
  sae:{q:'A new honesty test correlates r = 0.62 with a reading-speed test. Is this good news for its validity?',a:'No. Honesty and reading speed are unrelated constructs, so theory predicts a correlation near zero. A strong correlation fails discriminant evidence and suggests the test partly measures reading ability rather than honesty.'},
  quiz:[
    {q:'A self-esteem test correlates about zero with an intelligence test. This is…',o:['Convergent evidence','Discriminant evidence','Predictive validity','Poor reliability'],a:1,w:'Low correlation with an unrelated construct supports validity: discriminant evidence.'},
    {q:'Correlating SAT scores with college GPA a year later gives…',o:['Concurrent validity evidence','Predictive validity evidence','Content validity','Response-process evidence'],a:1,w:'The criterion is measured at a future point: predictive.'},
    {q:'Which statement is true?',o:['A reliable test is always valid','A valid interpretation requires reliability','Validity is a property of the test alone','Reliability depends on theory'],a:1,w:'A test must be reliable to be interpreted validly, but reliability does not guarantee validity.'},
    {q:'Who argued that criterion validity alone is not enough, even for practical decisions?',o:['Messick (1993)','Beach (1980)','Flippo','Herzberg'],a:0,w:'Messick: the meaning of the measure must always be pursued.'}
  ],
  card:[{h:'Associations with other variables',items:['Convergent: related constructs correlate','Discriminant: unrelated constructs do not','Concurrent: criterion measured at the same time','Predictive: criterion measured later']},{h:'Other facets',items:['Consequences of testing','Criterion validity (Messick’s caution)']},{h:'Reliability vs validity',items:['Reliability: property of responses','Validity: property of interpretations','Reliable is necessary, not sufficient']}]
});
})();
