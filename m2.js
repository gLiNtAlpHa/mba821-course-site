/* Module 2 — Appraisal; movement in and out of the organisation */
(function(){
const {H}=Course, el=H.el, t_=H.t;
const tableau=(s)=>el('g',{},s);
const box=(g,x,y,w,h,fill='var(--card)',stroke='var(--line)',rx=8)=>el('rect',{x,y,width:w,height:h,rx,fill,stroke},g);
const wrap=(g,x,y,str,max=28,a={})=>{const words=str.split(' ');let line='',ly=y;const lh=a.lh||15;words.forEach(w=>{if((line+' '+w).trim().length>max){t_(g,x,ly,line.trim(),a);line=w;ly+=lh;}else line+=' '+w;});if(line.trim())t_(g,x,ly,line.trim(),a);return ly;};

/* ================= 2.1 ================= */
function target(g,cx,cy,R,label){[1,.75,.5,.25].forEach((k,i)=>el('circle',{cx,cy,r:R*k,fill:i%2?'var(--card)':'var(--sunk)',stroke:'var(--line)'},g));el('circle',{cx,cy,r:R*.08,fill:'var(--org)'},g);if(label)t_(g,cx,cy+R+18,label,{'text-anchor':'middle','font-size':12,'font-weight':700});}
function darts(g,cx,cy,R,spread,offx,offy,seed,n=10,col='var(--emp)'){const r=H.seeded(seed);const out=[];for(let i=0;i<n;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*spread*R;out.push(el('circle',{cx:cx+offx*R+Math.cos(a)*d,cy:cy+offy*R+Math.sin(a)*d,r:4.5,fill:col,stroke:'var(--card)','stroke-width':1},g));}return out;}
function appraisal1Scene(stage){
  H.cap(stage,'What makes an appraisal fair');
  const s=H.svg(stage,600,440);
  // A definition
  const A=tableau(s);H.person(A,300,210,'var(--emp)',3.2);
  t_(A,300,90,'Performance appraisal',{'text-anchor':'middle','font-size':18,'font-weight':700});
  t_(A,300,112,'also: merit rating, performance review, service rating, efficiency report',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  const gA=[['Performance on the job',150],['Potential for development',450]].map(([n,x])=>{t_(A,x,290,n,{'text-anchor':'middle','font-size':12.5,'font-weight':700});box(A,x-90,300,180,14,'var(--sunk)','none',4);return el('rect',{x:x-90,y:300,width:0,height:14,rx:4,fill:'var(--org)'},A);});
  // B formal vs informal
  const B=tableau(s);box(B,40,70,240,300);box(B,320,70,240,300);
  t_(B,160,100,'Formal',{'text-anchor':'middle','font-size':16,'font-weight':700,fill:'var(--org)'});t_(B,440,100,'Informal',{'text-anchor':'middle','font-size':16,'font-weight':700,fill:'var(--err)'});
  ['Output against target','Quality of work','Attendance record','Job knowledge'].forEach((x,i)=>{el('rect',{x:60,y:130+i*40,width:16,height:16,rx:3,fill:'var(--org-soft)',stroke:'var(--org)'},B);t_(B,66,143+i*40,'✓',{'font-size':13,fill:'var(--org)','font-weight':700});t_(B,86,143+i*40,x,{'font-size':12.5});});
  t_(B,160,310,'systematic, explicit job-related',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});t_(B,160,326,'criteria, by the superior officer',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  el('ellipse',{cx:440,cy:190,rx:95,ry:55,fill:'var(--err-soft)'},B);t_(B,440,185,'“I just feel he’s',{'text-anchor':'middle','font-size':14});t_(B,440,204,'not serious.”',{'text-anchor':'middle','font-size':14});
  t_(B,440,310,'casual, ad hoc, intuitive,',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});t_(B,440,326,'sentimental and subjective',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  // C rationale wheel
  const Cg=tableau(s);const purposes=['Current performance level','Strengths and weaknesses','Help staff improve','Basis to reward or penalise','Motivate higher performance','Training needs','Potential performance','Succession planning','Validate selection and training','Supervisors understand staff'];
  H.person(Cg,300,226,'var(--emp)',2.4);const cChips=purposes.map((p,i)=>{const a=-Math.PI/2+i*2*Math.PI/10,x=300+Math.cos(a)*200,y=220+Math.sin(a)*150;const g=el('g',{},Cg);el('line',{x1:300,y1:220,x2:x,y2:y,stroke:'var(--line)'},g);box(g,x-80,y-15,160,30,'var(--org-soft)','none',15);t_(g,x,y+4,p,{'text-anchor':'middle','font-size':11,'font-weight':700,fill:'var(--org)'});return g;});
  // D who appraises
  const Dg=tableau(s);H.person(Dg,300,236,'var(--emp)',2.6);t_(Dg,300,272,'employee',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});
  const raters=[['Superior',0],['Peers',1],['Subordinates',2],['Committee',3],['Self',4],['Service users',5],['Contract experts',6]];
  const dR=raters.map(([n,i])=>{const a=-Math.PI/2+i*2*Math.PI/7,x=300+Math.cos(a)*170,y=226+Math.sin(a)*150;const g=el('g',{},Dg);el('line',{x1:x,y1:y,x2:300,y2:226,stroke:'var(--data)','stroke-dasharray':'4 4'},g);H.person(g,x,y,i===4?'var(--emp)':'var(--org)',1.6);t_(g,x,y+26,n,{'text-anchor':'middle','font-size':12,'font-weight':700});return g;});
  // E process
  const Eg=tableau(s);const proc=[['APER form','filled by the employee'],['Assessment','by the boss or head'],['Post-appraisal interview','agree the result'],['Outcome','improvement plan, promotion or pay rise']];
  const eB=proc.map(([a,b],i)=>{const g=el('g',{},Eg);const y=70+i*88;box(g,150,y,300,62,i===3?'var(--org-soft)':'var(--card)','var(--line)',10);t_(g,300,y+26,a,{'text-anchor':'middle','font-size':15,'font-weight':700});t_(g,300,y+46,b,{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});if(i<3)t_(g,300,y+80,'↓',{'text-anchor':'middle','font-size':18,fill:'var(--muted)'});return g;});
  // F four targets
  const Fg=tableau(s);const tg=[[150,120,'Reliable, not valid',.18,.42,-.3],[450,120,'Valid, not reliable',.7,0,0],[150,315,'Neither',.7,.35,.3],[450,315,'Reliable and valid',.18,0,0]];
  const fT=tg.map(([x,y,l,sp,ox,oy],i)=>{const g=el('g',{},Fg);target(g,x,y,72,l);darts(g,x,y,72,sp,ox,oy,i+3,9);return g;});
  // G pillars
  const Gg=tableau(s);const qual=['Reliability and validity','Performance criteria','Standardisation','Practical validity','Legal sanction','Trained appraisers','Open communication','Post-appraisal interview','Due process'];
  const roof=el('g',{},Gg);el('path',{d:'M40 120 L300 60 L560 120 Z',fill:'var(--org)'},roof);t_(roof,300,108,'FAIR APPRAISAL',{'text-anchor':'middle','font-size':15,'font-weight':700,fill:'var(--card)',class:'mono'});
  const pil=qual.map((q,i)=>{const g=el('g',{},Gg);const x=58+i*60;el('rect',{x,y:124,width:30,height:220,fill:'var(--org-soft)',stroke:'var(--org)'},g);
    const tx=t_(g,0,0,q,{'font-size':11,'font-weight':700,fill:'var(--org)',transform:`translate(${x+19},334) rotate(-90)`});return g;});
  el('rect',{x:40,y:344,width:520,height:14,fill:'var(--muted)'},Gg);
  const gNote=t_(Gg,300,392,'',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--err)'});
  // H principles
  const Hg=tableau(s);t_(Hg,300,64,'Three principles behind every method',{'text-anchor':'middle','font-size':16,'font-weight':700});
  [['Standards','Compare performance with set standards: rating scales, checklists'],['Interpersonal comparison','Rank employees against each other'],['Goal setting','Compare performance with goals the employee agreed (MBO)']].forEach(([a,b],i)=>{const y=90+i*100;box(Hg,70,y,460,80,'var(--card)','var(--line)',10);t_(Hg,92,y+32,a,{'font-size':15,'font-weight':700,fill:'var(--org)'});wrap(Hg,92,y+54,b,60,{'font-size':12.5,fill:'var(--muted)'});});
  const tabs=[A,B,Cg,Dg,Eg,Fg,Gg,Hg];
  return {update(t){const k=Math.floor(t);tabs.forEach((g,i)=>H.op(g,H.es(t,i-.15,i+.1)*(i===tabs.length-1?1:(1-H.es(t,i+.9,i+1.05)))));
    gA.forEach((r,i)=>H.set(r,{width:180*H.es(t,.2+i*.2,.7+i*.2)*(.6+.25*i)}));
    cChips.forEach((c,i)=>H.op(c,H.es(t,2+i*.06,2.15+i*.06)));dR.forEach((c,i)=>H.op(c,H.es(t,3+i*.1,3.2+i*.1)));eB.forEach((c,i)=>H.op(c,H.es(t,4+i*.15,4.3+i*.15)));fT.forEach((c,i)=>H.op(c,H.es(t,5+i*.15,5.3+i*.15)));
    const drop=H.es(t,6.5,6.8);pil[8].setAttribute('transform',`translate(0,${drop*240})`);H.op(pil[8],1-drop);roof.setAttribute('transform',`rotate(${drop*7} 560 120)`);gNote.textContent=drop>.3?'Remove due process and the whole system tilts':'';
  }};
}
Course.add({id:'2.1',module:2,title:'Employee Performance Appraisal I',vizLabel:'Targets for reliability and validity',
  hook:{who:'Ngozi, unit head',text:'Ngozi has to fill APER forms for twelve officers by Friday. Two of them have never had any feedback all year. Whatever she writes will decide their promotion. What makes her appraisal fair, and what makes it worthless?'},
  objectives:['Define performance appraisal and distinguish formal from informal appraisal','State the rationale for appraisal and who can appraise','Describe the appraisal process','Explain the qualities of an effective appraisal system, including reliability and validity'],
  steps:[
    {h:'What appraisal is',t:'<p>Performance appraisal, once called merit rating, is the <b>systematic evaluation of the individual with respect to performance on the job and potential for development</b> (Beach, 1980).</p><p>It is the basis for promotion, pay increase, demotion, and plans for improvement and training.</p>'},
    {h:'Formal and informal appraisal',t:'<p><b>Formal</b> appraisal is the official assessment of output, done systematically against explicit job-related criteria by the superior officer.</p><p><b>Informal</b> appraisal is casual and ad hoc, based on the boss’s intuitive feelings. It can be highly sentimental and subjective.</p>'},
    {h:'Why appraise: ten purposes',t:'<p>Appraisal identifies current performance, strengths and weaknesses, training needs and potential; it helps staff improve, motivates, and gives a basis for reward or penalty; it informs succession planning, validates selection and training, and helps supervisors understand subordinates.</p>'},
    {h:'Who should appraise',t:'<p>Traditionally only the immediate superior. Now there are seven ways: <b>superior</b> rating, <b>peer</b> rating, <b>subordinate</b> rating, <b>committee</b> rating, <b>self</b>-appraisal, rating by <b>users of the service</b>, and <b>contract</b> rating by outside experts.</p>'},
    {h:'The appraisal process',t:'<p>In the Nigerian civil service it starts with the <b>Annual Performance Evaluation Report (APER)</b> form. The boss assesses, then holds a post-appraisal interview to agree the result. It ends in an improvement plan, promotion, or a salary increase.</p>'},
    {h:'Reliability and validity',t:'<p><b>Reliable:</b> repeated measurement of the same person gives similar results (darts land close together).</p><p><b>Valid:</b> the method measures accurately what it is meant to measure (darts land on the centre).</p><p>Reliability depends on rater competence, conditions, and whether criteria are job-related.</p>'},
    {h:'Nine qualities of an effective system',t:'<p>Reliability and validity, clear performance criteria, standardisation, practical validity, legal sanction, trained appraisers, open communication, a post-appraisal interview, and due process.</p><p>Each one carries weight. Watch what happens when <b>due process</b> is taken away.</p>'},
    {h:'Principles behind the methods',t:'<p>Every appraisal method rests on one of three principles: comparing with <b>standards</b>, <b>interpersonal comparison</b>, or <b>goal setting</b>. Unit 2.2 shows each method in action.</p><p>Beach (1980) also gives eight guiding principles, such as jointly set standards, a supportive attitude, and a clear link to pay.</p>'}
  ],
  scene:appraisal1Scene,
  sandboxIntro:'Change the rater and the criteria, and watch where the darts land.',
  sandbox(ctl,st){
    const s=H.svg(st,520,340);let comp=50,job=50,rep=3;const ro=H.readout(ctl);
    H.slider(ctl,{id:'s21c',label:'Rater competence and training',min:0,max:100,step:5,value:50,fmt:v=>v+'%'},v=>{comp=v;draw();});
    H.slider(ctl,{id:'s21j',label:'Criteria are job-related',min:0,max:100,step:5,value:50,fmt:v=>v+'%'},v=>{job=v;draw();});
    H.slider(ctl,{id:'s21r',label:'Appraise the same person again',min:1,max:9,value:3,fmt:v=>v+' times'},v=>{rep=v;draw();});
    function draw(){s.innerHTML='';const spread=.08+.7*(1-comp/100),off=.55*(1-job/100);target(s,260,165,135);darts(s,260,165,135,spread,off,-off*.6,9,rep*3);
      const rel=spread<.3?'high':spread<.5?'moderate':'low',val=off<.15&&spread<.45?'high':off<.3?'moderate':'low';
      ro.innerHTML=`Reliability: <b>${rel}</b> · Validity: <b>${val}</b><br>${rel==='high'&&val!=='high'?'Consistent, but consistently wrong: the criteria are not job-related.':val==='high'?'A fair appraisal: consistent and on target.':'Scattered results: train the appraisers and fix the criteria.'}`;}
    draw();
  },
  sae:{q:'List the seven ways employee performance can be appraised.',a:['Superior rating','Peer rating','Subordinate rating','Committee rating','Self-appraisal','Rating by users of the service','Contract rating by outside experts']},
  tma:{q:'Explain the various features of an effective appraisal system.',outline:['Define appraisal (Beach 1980) and state its purposes','Reliability and validity: define each, factors that affect them','Determining performance criteria; standardisation; practical validity','Legal sanction; training of appraisers; open communication','Post-appraisal interview; due process','Close with the guiding principles: jointly set standards, supportive appraisers, link to pay']},
  quiz:[
    {q:'An appraisal method gives the same result each time the same person is rated, but it rates personality, not job output. It is…',o:['Valid but not reliable','Reliable but not valid','Neither','Both'],a:1,w:'Consistent results show reliability; measuring the wrong thing means it is not valid.'},
    {q:'What form starts the appraisal process in the Nigerian civil service?',o:['Application blank','APER form','Query letter','Requisition'],a:1,w:'The Annual Performance Evaluation Report (APER) form.'},
    {q:'Rating done by customers or consumers of the organisation’s service is called…',o:['Peer rating','Users of service rating','Contract rating','Committee rating'],a:1,w:'It is one of the seven ways listed in the course.'},
    {q:'An informal appraisal is…',o:['Based on explicit job-related criteria','Casual and based on the boss’s intuitive feelings','Done by a committee','Always more accurate'],a:1,w:'Informal appraisal is ad hoc and can be sentimental and subjective.'}
  ],
  card:[{h:'Seven ways to appraise',items:['Superior','Peer','Subordinate','Committee','Self','Users of the service','Contract (outside experts)']},
    {h:'Nine qualities of an effective system',items:['Reliability and validity','Performance criteria','Standardisation','Practical validity','Legal sanction','Training of appraisers','Open communication','Post-appraisal interview','Due process']},
    {h:'Three underlying principles',items:['Standards','Interpersonal comparison','Goal setting']}]
});

/* ================= 2.2 ================= */
const NAMES=['Ade','Bisi','Chidi','Dayo','Efe','Femi','Gbenga','Halima','Ife','Jide','Kemi','Lami','Musa','Ngozi','Ola','Peju','Rotimi','Sade','Tobi','Uche'];
function appraisal2Scene(stage){
  H.cap(stage,'Methods of appraisal and errors in rating');
  const s=H.svg(stage,600,440);const tabs=[];
  // A graphic rating
  const A=tableau(s);tabs.push([A,0,1]);box(A,40,50,520,330);t_(A,60,82,'Graphic rating scale: Tunde Bakare',{'font-size':15,'font-weight':700});
  ['Poor','Below avg','Average','Good','Excellent'].forEach((x,i)=>{t_(A,268+i*58,112,String(i+1),{'text-anchor':'middle','font-size':13,'font-weight':700,class:'mono'});t_(A,268+i*58,126,x,{'text-anchor':'middle','font-size':9.5,fill:'var(--muted)'});});
  const traits=['Quantity of work','Quality of work','Job knowledge','Initiative','Dependability'],picks=[4,3,5,3,4];
  const aMarks=traits.map((tr,r)=>{t_(A,60,164+r*40,tr,{'font-size':13});for(let i=0;i<5;i++)el('circle',{cx:268+i*58,cy:160+r*40,r:9,fill:'none',stroke:'var(--line)','stroke-width':1.5},A);return el('circle',{cx:268+(picks[r]-1)*58,cy:160+r*40,r:6.5,fill:'var(--emp)'},A);});
  const aTot=t_(A,540,370,'',{'text-anchor':'end','font-size':16,'font-weight':700,class:'mono'});
  // B rank order
  const B=tableau(s);tabs.push([B,1,2]);t_(B,150,46,'Column I (best)',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--org)'});t_(B,450,46,'Column II (worst)',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--err)'});
  const order=[];for(let i=0;i<10;i++){order.push(i,19-i);}const rank=[3,11,7,0,15,5,18,9,1,13,6,16,2,10,19,4,12,8,17,14];
  const bSlots=[];for(let i=0;i<20;i++){const c=i<10?0:1,r=i%10,x=c?320:20,y=62+r*35;box(B,x,y,260,28,'var(--card)','var(--line)',6);t_(B,x+12,y+19,String(i+1),{'font-size':12,class:'mono',fill:'var(--muted)'});bSlots.push(t_(B,x+48,y+19,NAMES[rank[i]],{'font-size':13,'font-weight':700}));}
  // C paired comparison
  const Cg=tableau(s);tabs.push([Cg,2,3]);const six=NAMES.slice(0,6);const cell=36,mx=40,my=90;
  six.forEach((n,i)=>{t_(Cg,mx+cell*(i+1)+cell/2,my-8,n,{'text-anchor':'middle','font-size':11,'font-weight':700});t_(Cg,mx+cell-6,my+cell*i+cell/2+4,n,{'text-anchor':'end','font-size':11,'font-weight':700});});
  const cCells=[];for(let i=0;i<6;i++)for(let j=0;j<6;j++){const r=box(Cg,mx+cell*(j+1),my+cell*i,cell-3,cell-3,i===j?'var(--sunk)':'var(--card)','var(--line)',3);if(j>i)cCells.push({r,i,j});}
  const cRes=cCells.map(c=>t_(Cg,mx+cell*(c.j+1)+16,my+cell*c.i+22,'',{'text-anchor':'middle','font-size':10,'font-weight':700,fill:'var(--org)'}));
  t_(Cg,150,340,'pairs = n(n − 1) / 2',{'text-anchor':'middle','font-size':16,'font-weight':700,class:'mono'});const cCount=t_(Cg,150,366,'',{'text-anchor':'middle','font-size':13,class:'mono',fill:'var(--muted)'});
  const cg2=el('g',{},Cg);const cax=H.axes(cg2,{x:340,y:90,w:220,h:220,xmin:0,xmax:20,ymin:0,ymax:200,xt:[0,5,10,15,20],yt:[0,50,100,150,200],xl:'team size n',yl:'comparisons'});
  const cpts=[];for(let n=2;n<=20;n++)cpts.push([cax.sx(n),cax.sy(n*(n-1)/2)]);const cLine=el('path',{d:H.path(cpts),fill:'none',stroke:'var(--data)','stroke-width':3},cg2);const cDot=el('circle',{r:6,fill:'var(--data)'},cg2);const cDotT=t_(cg2,0,0,'',{'font-size':11,'font-weight':700,fill:'var(--data)'});
  // D checklist / essay / critical incident
  const Dg=tableau(s);tabs.push([Dg,3,4]);[['Checklist',['✓ Completes work on time','✗ Helps colleagues','✓ Follows procedures','weighted and forced-choice versions too']],['Essay',['A free written account of','strengths, weaknesses and','potential, in the rater’s','own words']],['Critical incident',['+ 12 Mar: calmed angry client','− 4 Jun: missed audit deadline','+ 20 Sep: trained two new staff','record kept all year']]].forEach(([h,lines],i)=>{const x=20+i*195;box(Dg,x,70,180,250);t_(Dg,x+90,100,h,{'text-anchor':'middle','font-size':15,'font-weight':700,fill:'var(--org)'});lines.forEach((l,k)=>t_(Dg,x+14,140+k*30,l,{'font-size':11.5,fill:k===3?'var(--muted)':l.startsWith('✗')||l.startsWith('−')?'var(--err)':'var(--ink)'}));});
  // E distribution
  const E=tableau(s);tabs.push([E,4,9]);const ax=H.axes(E,{x:50,y:70,w:500,h:250,xmin:.5,xmax:5.5,ymin:0,ymax:.95,xt:[[1,'1 Poor'],[2,'2 Below avg'],[3,'3 Average'],[4,'4 Good'],[5,'5 Excellent']],yl:'Share of staff'});
  const bands=el('g',{},E);const bandCols=['var(--err-soft)','var(--emp-soft)','var(--sunk)','var(--data-soft)','var(--org-soft)'];const bandP=bandCols.map(c=>el('path',{fill:c},bands));const bandT=['10%','20%','40%','20%','10%'].map(x=>t_(bands,0,0,x,{'text-anchor':'middle','font-size':13,'font-weight':700,class:'mono'}));
  const cArea=el('path',{fill:'var(--emp-soft)',opacity:.55},E),cPath=el('path',{fill:'none',stroke:'var(--emp)','stroke-width':3},E),mLine=el('line',{stroke:'var(--org)','stroke-dasharray':'4 4','stroke-width':1.5},E);
  const eTitle=t_(E,300,40,'',{'text-anchor':'middle','font-size':16,'font-weight':700});const eSub=t_(E,300,372,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  const rr=H.seeded(21);const z=NAMES.map(()=>H.gauss(rr)).sort((a,b)=>a-b);const dots=z.map((v,i)=>el('circle',{r:6,fill:'var(--emp)',stroke:'var(--card)'},E));
  // F halo
  const F=tableau(s);tabs.push([F,9,10]);t_(F,300,46,'Halo effect: one strong impression spreads',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const ftr=['Leadership','Punctuality','Accuracy','Teamwork','Reports'],ftrue=[4.6,2.4,3.1,2.2,2.9];const fBars=ftr.map((n,i)=>{const x=80+i*95;t_(F,x+30,350,n,{'text-anchor':'middle','font-size':12});el('rect',{x,y:90,width:60,height:240,fill:'var(--sunk)',rx:4},F);return el('rect',{x,width:60,rx:4,fill:i?'var(--emp)':'var(--org)'},F);});
  const fNote=t_(F,300,390,'',{'text-anchor':'middle','font-size':13,'font-weight':700});
  // G recency
  const G=tableau(s);tabs.push([G,10,11]);const gax=H.axes(G,{x:60,y:70,w:480,h:230,xmin:1,xmax:12,ymin:0,ymax:5,xt:[[1,'Jan'],[3,'Mar'],[5,'May'],[7,'Jul'],[9,'Sep'],[11,'Nov'],[12,'Dec']],yt:[1,2,3,4,5],yl:'Monthly performance'});
  const perf=[4,4.2,4.4,4.1,4.5,4.3,4.4,4.2,4.0,4.1,2.6,2.2];const gBars=perf.map((v,i)=>el('rect',{x:gax.sx(i+1)-14,width:28,y:gax.sy(v),height:gax.sy(0)-gax.sy(v),rx:3,fill:i>=10?'var(--err)':'var(--emp)'},G));
  const wPath=el('path',{fill:'none',stroke:'var(--data)','stroke-width':3,'stroke-dasharray':'6 4'},G);const gT1=t_(G,300,40,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const gT2=t_(G,300,340,'',{'text-anchor':'middle','font-size':13,class:'mono'});
  // H MBO
  const Hg=tableau(s);tabs.push([Hg,11,12]);t_(Hg,300,50,'Management by objectives (Drucker, 1954)',{'text-anchor':'middle','font-size':16,'font-weight':700});
  H.person(Hg,190,200,'var(--org)',3);H.person(Hg,410,200,'var(--emp)',3);t_(Hg,190,240,'supervisor',{'text-anchor':'middle','font-size':12});t_(Hg,410,240,'subordinate',{'text-anchor':'middle','font-size':12});
  [36,24,12].forEach((r,i)=>el('circle',{cx:300,cy:170,r,fill:i%2?'var(--card)':'var(--org-soft)',stroke:'var(--org)'},Hg));
  const hRole=t_(Hg,190,130,'',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--org)'});
  [['1 Goal setting','objective, measurable targets'],['2 Joint decision-making','set together, internalised motivation'],['3 Performance appraisal','self-evaluation against agreed targets']].forEach(([a,b],i)=>{const x=20+i*195;box(Hg,x,280,180,74,'var(--org-soft)','none',10);t_(Hg,x+90,308,a,{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--org)'});t_(Hg,x+90,330,b,{'text-anchor':'middle','font-size':10.5});});
  // I interview
  const I=tableau(s);tabs.push([I,12,13]);t_(I,300,46,'The post-appraisal interview',{'text-anchor':'middle','font-size':16,'font-weight':700});
  box(I,20,70,270,300,'var(--err-soft)','none',10);box(I,310,70,270,300,'var(--org-soft)','none',10);t_(I,155,98,'Traditional approach',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--err)'});t_(I,445,98,'Effective strategy',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--org)'});
  ['Employee on the defensive, a “hot seat”','Bitter criticism hurts self-esteem','Criticises personality, not the job','Employee may fire back','Or stays silent and demoralised'].forEach((x,i)=>wrap(I,36,130+i*48,x,34,{'font-size':12}));
  ['Friendly start, then courteous business','Boss coaches and counsels','Style fits the person and the job','Continuous appraisal, not a yearly shock','Build rapport with older staff early'].forEach((x,i)=>wrap(I,326,130+i*48,x,34,{'font-size':12}));
  return {update(t){
    tabs.forEach(([g,a,b])=>H.op(g,H.es(t,a-.12,a+.1)*(b>=13?1:(1-H.es(t,b-.1,b+.05)))));
    // A
    aMarks.forEach((m,i)=>H.op(m,H.es(t,.1+i*.14,.2+i*.14)));const n=aMarks.filter((m,i)=>t>=.2+i*.14).length;aTot.textContent=`Total: ${picks.slice(0,n).reduce((a,b)=>a+b,0)} / 25`;
    // B
    const filled=Math.round(20*H.seg(t,1.05,1.85));bSlots.forEach((x,i)=>H.op(x,order.indexOf(i)<filled?1:0));
    // C
    const cf=Math.round(cCells.length*H.seg(t,2.05,2.7));const r2=H.seeded(3);cCells.forEach((c,k)=>{const w=r2()<.5?c.i:c.j;H.set(c.r,{fill:k<cf?'var(--org-soft)':'var(--card)'});cRes[k].textContent=k<cf?six[w][0]:'';});
    cCount.textContent=`6 people → ${cf} of 15 pairs`;const nn=H.lerp(6,20,H.es(t,2.7,2.95));H.set(cDot,{cx:cax.sx(nn),cy:cax.sy(nn*(nn-1)/2)});H.set(cDotT,{x:cax.sx(nn)-8,y:cax.sy(nn*(nn-1)/2)-10,'text-anchor':'end'});cDotT.textContent=`n=${Math.round(nn)}: ${Math.round(nn)*(Math.round(nn)-1)/2}`;
    // E distribution
    let m=3,sd=.95,title='Twenty ratings form a curve',sub='Each dot is one employee in a team of 20';
    const lp=H.es(t,5,5.6),sp=H.es(t,6,6.6),cp=H.es(t,7,7.6),fp=H.es(t,8,8.4);
    m=3+.9*lp; m=H.lerp(m,2.15,sp); m=H.lerp(m,3,cp); sd=H.lerp(.95,.42,cp); sd=H.lerp(sd,.95,fp);
    if(t>=5&&t<6){title='Leniency: the whole curve slides up';sub='Raters score everyone high because pay rises depend on it';}
    if(t>=6&&t<7){title='Strictness: the curve slides down';sub='A harsh rater marks the same people low';}
    if(t>=7&&t<8){title='Control error (central tendency): squeezed';sub='Nobody praised, nobody condemned: everyone near Average';}
    if(t>=8){title='Forced distribution: 10 / 20 / 40 / 20 / 10';sub='Beach (1980): it is a coincidence if real performance follows a normal curve';}
    eTitle.textContent=title;eSub.textContent=sub;
    const pts=[];for(let i=0;i<=100;i++){const x=.5+5*i/100;pts.push([ax.sx(x),ax.sy(Math.min(.93,H.npdf(x,m,sd)))]);}
    const show=H.es(t,4.3,4.8);H.set(cPath,{d:H.path(pts)});H.set(cArea,{d:H.path(pts)+`L${ax.sx(5.5)} ${ax.sy(0)} L${ax.sx(.5)} ${ax.sy(0)}Z`});H.op(cPath,show);H.op(cArea,show*(1-fp));
    H.set(mLine,{x1:ax.sx(m),x2:ax.sx(m),y1:ax.sy(0),y2:ax.sy(.9)});H.op(mLine,show);
    const qs=[-1.2816,-.5244,.5244,1.2816];const edges=[.5,...qs.map(q=>m+q*sd),5.5];
    bandP.forEach((p,i)=>{const a=edges[i],b=edges[i+1];const pp=[];for(let k=0;k<=30;k++){const x=a+(b-a)*k/30;pp.push([ax.sx(x),ax.sy(Math.min(.93,H.npdf(x,m,sd)))]);}H.set(p,{d:H.path(pp)+`L${ax.sx(b)} ${ax.sy(0)} L${ax.sx(a)} ${ax.sy(0)}Z`});
      H.set(bandT[i],{x:ax.sx((Math.max(.9,Math.min(5.1,(a+b)/2)))),y:ax.sy(.86)});});H.op(bands,fp);
    const counts={};dots.forEach((d,i)=>{const fall=H.es(t,4+i*.02,4.3+i*.02);const val=H.clamp(m+z[i]*sd,.6,5.4);const bin=Math.round(val);const key=bin;counts[key]=(counts[key]||0)+1;
      const c=counts[key]-1;const stackY=ax.sy(0)-8-Math.floor(c/2)*13;const cx=ax.sx(bin)+(c%2?7:-7),cy=H.lerp(70,stackY,fall);H.set(d,{cx,cy});
      const band=i<2?0:i<6?1:i<14?2:i<18?3:4;d.style.fill=fp>.5?['var(--err)','var(--emp)','var(--muted)','var(--data)','var(--org)'][band]:'var(--emp)';H.op(d,H.es(t,3.9,4.05));});
    // F halo
    const halo=H.es(t,9.1,9.5),fix=H.es(t,9.6,9.9);fBars.forEach((b,i)=>{const v=i===0?ftrue[0]:H.lerp(ftrue[i],H.lerp(ftrue[i],4.4,halo),1-fix);const h=240*v/5;H.set(b,{y:330-h,height:h});});
    fNote.textContent=fix>.3?'Fix: rate all staff on one factor before moving to the next':halo>.3?'One high mark on Leadership pulls every other mark up':'True scores';H.set(fNote,{fill:fix>.3?'var(--org)':halo>.3?'var(--err)':'var(--ink)'});
    // G recency
    const rp=H.es(t,10.2,10.7);const wts=perf.map((_,i)=>Math.exp((i-11)*H.lerp(0,.9,rp)));const wsum=wts.reduce((a,b)=>a+b,0);const remembered=perf.reduce((a,v,i)=>a+v*wts[i],0)/wsum;const trueAvg=perf.reduce((a,b)=>a+b)/12;
    const wp=wts.map((w,i)=>[gax.sx(i+1),gax.sy(5*w/Math.max(...wts))]);H.set(wPath,{d:H.path(wp)});H.op(wPath,rp);
    gT1.textContent=rp>.3?'Recency effect: only the last months are remembered':'A full year of performance';gT2.textContent=`year average ${trueAvg.toFixed(1)} · rated as ${remembered.toFixed(1)}`;
    gBars.forEach((b,i)=>H.op(b,.25+.75*Math.max(1-rp,wts[i]/Math.max(...wts))));
    hRole.textContent=t%1>.45?'coach':'judge';
  }};
}
Course.add({id:'2.2',module:2,title:'Employee Performance Appraisal II',vizLabel:'Rating curves that shift and squeeze',
  hook:{who:'Tunde, branch manager',text:'Tunde rated all twenty of his officers “Good” or “Excellent” last year, and HR sent the forms back. The year before, he filled three years of APER forms in one evening. Which methods should he use, and which errors is he making?'},
  objectives:['Describe the main appraisal methods: graphic rating, rank order, paired comparison, forced distribution, checklist, essay, critical incident','Explain the human errors in rating: leniency, strictness, halo, control, recency, bias','Explain management by objectives (MBO) and its three elements','Contrast the traditional and effective approaches to the appraisal interview'],
  steps:[
    {h:'Graphic rating scale',t:'<p>The oldest and most common method. The supervisor rates traits on 1 to 5 and the points are added up. Cheap and simple, so civil services like it.</p><p>Weaknesses: subjective traits, numbers that give an <b>illusion of precision</b>, and exposure to halo, leniency, central tendency and bias.</p>'},
    {h:'Rank order method',t:'<p>Rank employees against each other. The rater finds the best and the worst first, then the next best and next worst, until everyone is placed from 1 to 20.</p><p>Problem: the gap between two neighbours is unclear.</p>'},
    {h:'Paired comparison',t:'<p>Compare each employee with every other; rank by how many times each is chosen. With <b>n</b> people there are <b>n(n − 1)/2</b> pairs: 15 for 6 people, 190 for 20. The curve shows why this gets heavy fast.</p><p>It sets no standard and shows no degree of difference.</p>'},
    {h:'Checklist, essay, critical incident',t:'<p><b>Checklist:</b> the rater marks statements that describe the employee (simple, weighted, or forced choice). <b>Essay:</b> a written account. <b>Critical incident:</b> a record of notably good and bad incidents through the year.</p>'},
    {h:'Ratings make a distribution',t:'<p>Rate a whole team and the scores pile up into a curve. A fair rater’s curve centres on Average with a natural spread. The next four steps show how human error bends it.</p>'},
    {h:'Leniency error',t:'<p>Raters who know appraisal decides pay rises score everyone high. The whole curve slides toward Excellent. Good and weak performers now look the same.</p>'},
    {h:'Strictness error',t:'<p>The opposite: a harsh rater marks everyone low. Same people, same work, a curve shifted toward Poor. Both errors come from the supervisor’s subjectivity.</p>'},
    {h:'Control error (central tendency)',t:'<p>Some raters avoid being called lenient or strict by marking everyone near the middle. The curve gets tall and narrow. The appraisal stops telling anyone apart.</p>'},
    {h:'Forced distribution',t:'<p>Designed to correct central tendency: the rater must place <b>10%</b> in the top category, <b>20%</b> next, <b>40%</b> in the middle, <b>20%</b> next and <b>10%</b> lowest.</p><p>Beach (1980) criticises it: it is a coincidence if actual performance follows a normal curve. What if this team really is mostly excellent?</p>'},
    {h:'Halo effect',t:'<p>The rating of one factor influences the next. A strong Leadership mark pulls up Punctuality, Accuracy and the rest.</p><p>The course’s fix: rate all subordinates on one factor before moving to the next factor.</p>'},
    {h:'Recency effect',t:'<p>Recent behaviour decides the score because earlier months are forgotten. Eleven good months and two bad ones become a poor rating. Common when three years of APER forms are filled at once before promotion.</p><p><b>Bias</b> is the last error: likes and dislikes colouring the scores.</p>'},
    {h:'Management by objectives',t:'<p>Invented by Peter Drucker (1954), popularised by George Odiorne and Douglas McGregor. Supervisor and subordinate jointly set objectives and measures, then the subordinate evaluates against them.</p><p>Three elements: goal setting, collective participation, performance appraisal. The boss turns from <b>judge</b> into <b>coach</b>, in the spirit of Theory Y.</p>'},
    {h:'The post-appraisal interview',t:'<p>A face-to-face feedback meeting where decisions on salary, promotion and training follow (Cole, 1997). Purposes: feedback, clarify expectations, plan development, improve relations, identify potential.</p><p>The traditional approach puts the employee on a hot seat. The effective strategy coaches and counsels.</p>'}
  ],
  scene:appraisal2Scene,
  sandboxIntro:'Play the rater for a team of 20. Change how lenient and how spread out your ratings are, then force the distribution.',
  sandbox(ctl,st){
    const s=H.svg(st,540,360);const p={len:0,spr:100,forced:false,n:20};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s22l',label:'Leniency (−) strict … lenient (+)',min:-1.5,max:1.5,step:.1,value:0,fmt:v=>(v>0?'+':'')+v.toFixed(1)},v=>{p.len=v;draw();});
    H.slider(ctl,{id:'s22s',label:'Spread of ratings',min:30,max:130,step:5,value:100,fmt:v=>v+'%'},v=>{p.spr=v;draw();});
    H.segBtns(ctl,'Forced distribution',[[false,'Off'],[true,'On']],false,v=>{p.forced=v;draw();});
    H.slider(ctl,{id:'s22n',label:'Team size for paired comparison',min:2,max:40,value:20},v=>{p.n=v;draw();});
    const r=H.seeded(5);const z=Array.from({length:20},()=>H.gauss(r)).sort((a,b)=>a-b);
    function draw(){s.innerHTML='';const g=el('g',{},s);const ax=H.axes(g,{x:40,y:20,w:470,h:270,xmin:.5,xmax:5.5,ymin:0,ymax:12,xt:[[1,'Poor'],[2,'Below avg'],[3,'Average'],[4,'Good'],[5,'Excellent']],yt:[0,4,8,12],yl:'Staff'});
      let bins=[0,0,0,0,0];if(p.forced)bins=[2,4,8,4,2];else z.forEach(v=>{const x=H.clamp(Math.round(3+p.len+v*.95*p.spr/100),1,5);bins[x-1]++;});
      const cols=['var(--err)','var(--emp)','var(--muted)','var(--data)','var(--org)'];bins.forEach((c,i)=>{el('rect',{x:ax.sx(i+1)-36,width:72,y:ax.sy(c),height:ax.sy(0)-ax.sy(c),rx:4,fill:p.forced?cols[i]:'var(--emp)'},g);t_(g,ax.sx(i+1),ax.sy(c)-6,String(c),{'text-anchor':'middle','font-size':13,'font-weight':700,class:'mono'});});
      const mean=bins.reduce((a,c,i)=>a+c*(i+1),0)/20;ro.innerHTML=`Average rating <b>${mean.toFixed(2)}</b> · top two grades <b>${bins[3]+bins[4]}</b> of 20<br>${p.forced?'Forced: 2 / 4 / 8 / 4 / 2 whatever the real performance.':p.len>.6?'Leniency: almost everyone looks Good or Excellent.':p.len<-.6?'Strictness: the team looks weak.':p.spr<55?'Central tendency: nobody stands out.':'A plausible spread.'}<br>Paired comparison for ${p.n} people: <b>${p.n*(p.n-1)/2}</b> comparisons.`;}
    draw();H.tag(st,'Illustrative team');
  },
  sae:{q:'Why does forced distribution exist, and what is Beach’s criticism of it?',a:'It exists to correct central tendency (and leniency), forcing ratings into a 10/20/40/20/10 normal pattern. Beach (1980) says it is obscure and based on questionable reasoning: it is a coincidence if the actual distribution of performance in an organisation follows a normal curve.'},
  tma:{q:'Discuss five major human errors (problems) associated with efficiency rating techniques.',outline:['Reliability and validity problem: rater competence, conditions, job-related criteria','Leniency and strictness: polar tendencies from subjectivity','Halo effect: one rating influences the next; fix by rating all staff one factor at a time','Control (central tendency): everyone rated in the middle','Recency effect: recent behaviour dominates; APER forms filled at the end of three years','Bias: likes, dislikes, prejudice','Remedies: training, continuous appraisal, MBO']},
  quiz:[
    {q:'With 10 employees, how many paired comparisons are needed?',o:['10','20','45','100'],a:2,w:'n(n − 1)/2 = 10 × 9 / 2 = 45.'},
    {q:'A supervisor rates everyone near Average to avoid being called lenient or strict. This is…',o:['Halo effect','Recency effect','Control error (central tendency)','Bias'],a:2,w:'The course calls this control: rating along the middle course, neither praising nor condemning.'},
    {q:'Forced distribution requires ratings in the proportions…',o:['20/20/20/20/20','10/20/40/20/10','5/15/60/15/5','25/50/25'],a:1,w:'10% top, 20% next, 40% middle, 20% next, 10% lowest.'},
    {q:'In MBO, the supervisor acts more like a…',o:['Judge','Coach','Inspector','Union leader'],a:1,w:'The boss becomes less of a judge and more of a coach.'},
    {q:'How does the course suggest avoiding the halo effect?',o:['Use only one trait','Rate all subordinates on one factor before moving to the next','Let employees rate themselves','Appraise once every three years'],a:1,w:'Rating factor by factor across the team stops one impression spreading.'}
  ],
  card:[{h:'Appraisal methods',items:['Graphic rating scale','Rank order','Paired comparison','Forced distribution (10/20/40/20/10)','Checklist (simple, weighted, forced choice)','Essay','Critical incident','Management by objectives']},
    {h:'Human errors in rating',items:['Reliability and validity problem','Leniency and strictness','Halo effect','Control (central tendency)','Recency effect','Bias']},
    {h:'MBO elements',ordered:true,items:['Goal setting','Collective participation in decision-making','Performance appraisal (self-evaluation)']},
    {h:'Purposes of the appraisal interview',items:['Give feedback','Clarify expectations','Plan development and training','Improve superior–subordinate relations','Identify potential for promotion or transfer']}]
});

/* ================= 2.3 ================= */
function ladder(ctx,o,x,z,y0,n,step,col,w=2.2){const rw=.5;H.c3line(ctx,o,[x-rw,y0,z],[x-rw,y0+(n-1)*step+.4,z],col,w);H.c3line(ctx,o,[x+rw,y0,z],[x+rw,y0+(n-1)*step+.4,z],col,w);for(let i=0;i<n;i++)H.c3line(ctx,o,[x-rw,y0+i*step,z],[x+rw,y0+i*step,z],col,w*.8);}
function dot(ctx,o,p,col,r=.22){const q=o.proj(p);ctx.fillStyle=col;ctx.beginPath();ctx.arc(q[0],q[1],Math.max(3,r*q[3]),0,Math.PI*2);ctx.fill();}
function promoScene(stage){
  H.cap(stage,'Career ladders');
  const focus=[-15,-15,-7,0,7.5,15,0,0,0,0];
  let T=0;
  const LECT=['Assistant Lecturer','Lecturer II','Lecturer I','Senior Lecturer','Principal Lecturer','Associate Professor','Professor'];
  const o=H.c3(stage,{yaw:-.25,pitch:.22,dist:22,f:1.25,spin:0,render(ctx,o){
    const C=o.col;const k=Math.min(9,Math.floor(T)),fr=T-Math.floor(T);
    const lab=(p,txt,col=C.ink,sz=12,al='center')=>H.c3text(ctx,o,p,txt,col,sz,al);
    // ground
    H.c3line(ctx,o,[-20,-.2,0],[20,-.2,0],C.line,1);
    // lecturer ladder
    ladder(ctx,o,-15,0,0,7,1.2,C.org);lab([-15,-1.2,0],'University lecturer',C.org,13);
    if(T>=1&&T<2)LECT.forEach((n,i)=>lab([-14.3,i*1.2+.1,0],n,C.ink,11,'left'));
    // police
    ladder(ctx,o,-7,0,0,10,.9,C.data);lab([-7,-1.2,0],'Police',C.data,13);lab([-6.3,.1,0],'Recruit',C.muted,11,'left');lab([-6.3,4*.9+.1,0],'◀ graduates enter as ASP',C.emp,11,'left');lab([-6.3,9*.9+.1,0],'Top',C.muted,11,'left');
    // military
    ladder(ctx,o,-1.4,0,0,6,.9,C.emp);ladder(ctx,o,1.4,0,3,8,.9,C.org);ctx.setLineDash([5,5]);H.c3line(ctx,o,[-.9,4.5,0],[.9,3,0],C.muted,1.5);ctx.setLineDash([]);
    lab([-1.4,-1.2,0],'Enlisted',C.emp,12);lab([1.4,-1.2,0],'Officers',C.org,12);lab([0,-2.1,0],'Military',C.ink,13);
    if(T>=3&&T<4){lab([-2.1,.1,0],'Private',C.muted,10.5,'right');lab([-2.1,4.6,0],'Warrant officer',C.muted,10.5,'right');lab([2.1,3.1,0],'Second lieutenant',C.muted,10.5,'left');lab([2.1,9.4,0],'General / Admiral',C.muted,10.5,'left');}
    // hospital
    ladder(ctx,o,5.8,0,0,2,.9,C.muted);ladder(ctx,o,7.5,0,0,5,.9,C.emp);ladder(ctx,o,9.2,0,0,7,.9,C.org);
    [6.65,8.35].forEach(x=>{const faces=H.c3box(o,[x,3,0],[.12,6.4,1.6],C.line);H.c3faces(ctx,faces);});
    lab([7.5,-2.1,0],'Hospital',C.ink,13);lab([5.8,-1.2,0],'Aides',C.muted,11);lab([7.5,-1.2,0],'Nurses',C.emp,11);lab([9.2,-1.2,0],'Doctors',C.org,11);
    if(T>=4&&T<5){lab([7.5,4*.9+.5,0],'Supt. of nurses',C.emp,10.5);}
    // industry converging
    const tip=[15,8.5,0];[-2.4,-.8,.8,2.4].forEach((dx,i)=>{const b=[15+dx,0,0];const n=7;for(let s=0;s<n;s++){const f=s/(n-1)*.82;const p=[H.lerp(b[0],tip[0],f),H.lerp(b[1],tip[1],f),0];H.c3line(ctx,o,[p[0]-.35,p[1],0],[p[0]+.35,p[1],0],C.data,1.8);}
      H.c3line(ctx,o,[b[0]-.35,0,0],[H.lerp(b[0],tip[0],.82)-.35,H.lerp(0,tip[1],.82),0],C.data,2);H.c3line(ctx,o,[b[0]+.35,0,0],[H.lerp(b[0],tip[0],.82)+.35,H.lerp(0,tip[1],.82),0],C.data,2);
      lab([b[0],-1.2,0],['Manual','Trades','Clerical','Managers'][i],C.data,10.5);});
    dot(ctx,o,tip,C.org,.35);lab([15,9.3,0],'Top management',C.org,12);lab([15,-2.1,0],'Industry and public service',C.ink,13);
    // climber
    const cl=[[-15,0,7,1.2],[-15,0,7,1.2],[-7,0,10,.9],[1.4,3,8,.9],[7.5,0,5,.9],[15+2.4,0,7,.9]];
    if(k<6){const c=cl[k];let x=c[0],y=c[1]+Math.min(c[2]-1,Math.floor(fr*c[2]))*c[3];if(k===5){const f=Math.min(.82,fr);x=H.lerp(17.4,15,f);y=H.lerp(0,8.5,f);}if(k===2&&fr>.5)y=Math.max(y,4*.9);dot(ctx,o,[x,y+.35,.3],C.emp,.3);}
  }});
  // overlay for steps 6-9
  const ovs=H.h('div',{style:'position:absolute;inset:0;pointer-events:none'});stage.append(ovs);const s=H.svg(ovs,600,440);
  const Q=tableau(s);box(Q,40,60,520,330);t_(Q,300,92,'Qualities of a good promotion ladder',{'text-anchor':'middle','font-size':16,'font-weight':700});
  [['Length','long enough to avoid dead-end jobs'],['Breadth','wide exposure, not one narrow function'],['Permeability','lets in outsiders with fresh skills'],['Predictability and clarity','known path, but not so fixed it kills effort'],['Adequate number of steps','not too few, not too many']].forEach(([a,b],i)=>{t_(Q,70,130+i*52,a,{'font-size':14,'font-weight':700,fill:'var(--org)'});t_(Q,70,150+i*52,b,{'font-size':12.5,fill:'var(--muted)'});});
  const E=tableau(s);box(E,40,60,520,330);t_(E,300,92,'Eligibility for promotion',{'text-anchor':'middle','font-size':16,'font-weight':700});
  t_(E,70,130,'1. Personal qualification',{'font-size':14,'font-weight':700,fill:'var(--org)'});t_(E,70,150,'education, training or experience, physical fitness',{'font-size':12.5,fill:'var(--muted)'});
  t_(E,70,190,'2. Service status',{'font-size':14,'font-weight':700,fill:'var(--org)'});t_(E,70,210,'years spent on the level below the target level',{'font-size':12.5,fill:'var(--muted)'});
  [['GL 12',0],['GL 13',1],['GL 14',2]].forEach(([n,i])=>{box(E,140+i*120,300-i*30,100,30+i*30,i===2?'var(--org-soft)':'var(--sunk)','none',4);t_(E,190+i*120,322-i*30,n,{'text-anchor':'middle','font-size':13,'font-weight':700,class:'mono'});});
  t_(E,300,370,'To reach GL 14 you must have served the set years on GL 13',{'text-anchor':'middle','font-size':12});
  const B=tableau(s);box(B,40,60,520,330);t_(B,300,92,'Seniority or merit?',{'text-anchor':'middle','font-size':16,'font-weight':700});
  const beam=el('g',{},B);el('line',{x1:-190,x2:190,y1:0,y2:0,stroke:'var(--ink)','stroke-width':5,'stroke-linecap':'round'},beam);
  box(beam,-230,-110,160,104,'var(--emp-soft)','none',8);box(beam,70,-110,160,104,'var(--org-soft)','none',8);
  t_(beam,-150,-88,'Seniority',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--emp)'});['length of service','simple, practical','less internal strife','seen as even-handed'].forEach((x,i)=>t_(beam,-150,-66+i*16,x,{'text-anchor':'middle','font-size':11}));
  t_(beam,150,-88,'Merit',{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--org)'});['qualification','competence','performance','judged by appraisal'].forEach((x,i)=>t_(beam,150,-66+i*16,x,{'text-anchor':'middle','font-size':11}));
  el('path',{d:'M300 302 L284 338 L316 338Z',fill:'var(--muted)'},B);
  const M=tableau(s);box(M,40,60,520,330);t_(M,300,92,'Three ways to test merit for promotion',{'text-anchor':'middle','font-size':16,'font-weight':700});
  [['Personal judgement','of the head of the line agency or department'],['Promotion examination','written or oral test of fitness for the next post'],['Efficiency rating','the appraisal record over time']].forEach(([a,b],i)=>{box(M,70,118+i*84,460,66,'var(--org-soft)','none',10);t_(M,90,146+i*84,a,{'font-size':14,'font-weight':700,fill:'var(--org)'});t_(M,90,166+i*84,b,{'font-size':12});});
  const ovT=[[Q,6],[E,7],[B,8],[M,9]];
  return {update(t){T=t;const k=Math.min(9,Math.floor(t)),fr=t-Math.floor(t);
    const a=focus[Math.max(0,k)],b=focus[Math.min(9,k+1)];o.cx=H.lerp(a,b,H.es(fr,.8,1));o.ty=3.6;o.dist=t>=6?46:23;if(k>=6)o.cx=0;
    o.yaw=-.25+.15*Math.sin(t*.8);o.dirty=true;
    ovT.forEach(([g,i])=>H.op(g,H.es(t,i-.05,i+.15)*(i===9?1:1-H.es(t,i+.9,i+1.02))));
    beam.setAttribute('transform',`translate(300,300) rotate(${Math.sin(H.seg(t,8,9)*Math.PI*2)*8})`);
  }};
}
Course.add({id:'2.3',module:2,title:'Movement In and Out I: Promotion',vizLabel:'3D career ladders side by side',
  hook:{who:'Musa, police inspector',text:'Musa joined the police as a recruit and has climbed for fifteen years. His friend joined last year as an ASP straight from university, already above him. Is that fair? It depends on how the career ladder is built.'},
  objectives:['Define promotion and explain why promotion systems matter','Contrast rank-in-the-job and rank-in-the-person systems','Describe career ladders in the police, military, hospitals and industry','State the qualities of a good promotion ladder, eligibility rules, and the seniority and merit principles'],
  steps:[
    {h:'What promotion is',t:'<p>Promotion moves an employee to a job of greater demands, responsibility, status and usually pay. A sound promotion system motivates staff to work toward their career aspirations.</p>'},
    {h:'Rank-in-the-job vs rank-in-the-person',t:'<p><b>Rank-in-the-job:</b> job content, skill, effort and responsibility set the pay and place in the hierarchy. Promotion means moving to a bigger job.</p><p><b>Rank-in-the-person</b> (rank-in-corps): the level depends on the person’s skill and performance. Lecturers all lecture, but rise from Assistant Lecturer to Professor by proficiency.</p>'},
    {h:'The police ladder',t:'<p>Everyone traditionally starts at the bottom as a recruit and moves up. Recently graduates may enter higher, as <b>Assistant Superintendent of Police (ASP)</b>. The police show a <b>semi-unilinear</b> career path.</p>'},
    {h:'The military: two ladders',t:'<p>Enlisted personnel start as privates and can rise to warrant officer. Officers start as second lieutenants and may end as generals or admirals. The bridge from enlisted to officer exists, but it is narrow and difficult.</p>'},
    {h:'The hospital: walled ladders',t:'<p>A rigid, <b>caste-like</b> system. Nurse aides rarely become nurses unless they leave and train. Nurses may rise to superintendent of nurses, but never become doctors, however experienced.</p>'},
    {h:'Industry and public service: converging ladders',t:'<p>Manual workers rise by seniority to better-paid machine jobs; tradesmen start as apprentices; clerical staff move from stenographer to secretary to executive; managers start as trainees. Separate ladders for sales, finance and engineering <b>converge</b> near top management.</p>'},
    {h:'Qualities of a good promotion ladder',t:'<p><b>Length</b> (avoid dead-end jobs), <b>breadth</b> (wide exposure), <b>permeability</b> (occasional outsiders with fresh skills), <b>predictability and clarity</b> (but not so predictable it kills motivation), and an <b>adequate number of steps</b>.</p>'},
    {h:'Who is eligible?',t:'<p>Promotion is not automatic rotation. Candidates need the <b>personal qualifications</b> for the post (education, training, experience, fitness) and the <b>service status</b>: the set number of years on the level below. To reach Grade Level 14, you must have served the prescribed years on GL 13.</p>'},
    {h:'Seniority or merit',t:'<p><b>Seniority</b> (length of service) was the first criterion and is still important: simple, practical, reduces internal strife and outside pressure, feels even-handed.</p><p><b>Merit</b> says qualification, competence and performance should decide.</p>'},
    {h:'Testing merit',t:'<p>To protect the merit principle from favouritism and corruption, merit is judged by: the <b>personal judgement</b> of the head of department, a <b>promotion examination</b>, or <b>efficiency rating</b>.</p>'}
  ],
  scene:promoScene,
  sandboxIntro:'Five officers want one promotion. Choose how much weight goes on seniority versus merit.',
  sandbox(ctl,st){
    const s=H.svg(st,520,330);let w=50;const ro=H.readout(ctl);
    const people=[['Musa',15,58,60],['Halima',6,88,82],['Chidi',11,72,75],['Kemi',3,91,90],['Rotimi',9,65,55]];
    H.slider(ctl,{id:'s23w',label:'Weight on merit',min:0,max:100,step:10,value:50,fmt:v=>`${v}% merit, ${100-v}% seniority`},v=>{w=v;draw();});
    function draw(){s.innerHTML='';const sc=people.map(([n,y,a,e])=>[n,(1-w/100)*(y/15*100)+(w/100)*((a+e)/2),y,a,e]).sort((a,b)=>b[1]-a[1]);
      sc.forEach(([n,v,y,a,e],i)=>{const yy=20+i*60;t_(s,10,yy+24,n,{'font-size':14,'font-weight':700});el('rect',{x:90,y:yy+8,width:330,height:24,rx:4,fill:'var(--sunk)'},s);el('rect',{x:90,y:yy+8,width:330*v/100,height:24,rx:4,fill:i===0?'var(--org)':'var(--emp-soft)'},s);
        t_(s,428,yy+25,v.toFixed(0),{'font-size':13,'font-weight':700,class:'mono'});t_(s,90,yy+48,`${y} yrs service · appraisal ${a} · exam ${e}`,{'font-size':11,fill:'var(--muted)'});});
      ro.innerHTML=`Promoted: <b>${sc[0][0]}</b>.<br>${w<=30?'Seniority rewards long service and keeps the peace, but may pass over the most capable.':w>=70?'Merit rewards performance, but needs reliable appraisal and exams to avoid favouritism.':'A mix: many organisations combine length of service with efficiency.'}`;}
    draw();H.tag(st,'Illustrative candidates');
  },
  sae:{q:'Identify five career paths in an organisation you know, the number of promotion levels, and the qualification needed for each level.',a:'Answers will vary. A model structure: name the organisation; for each path (e.g. administrative, accounts, technical, nursing, security) list the grade levels from entry to top, the entry qualification, and for each step the years required on the level below plus any exam or professional certificate. Comment on length, breadth, permeability and predictability.'},
  tma:{q:'Define promotion and discuss five qualities of a good promotion path.',outline:['Define promotion: movement to a job of greater demands and responsibility','Length of the ladder: long enough to avoid dead-end jobs','Breadth: wide-ranging exposure, not one narrow function','Permeability: occasional outsiders with fresh viewpoints','Predictability and clarity: known path, but not so rigid it kills motivation','Adequate number of steps: too few injures morale; too many wastes selection effort']},
  quiz:[
    {q:'Lecturers who do the same job of lecturing but hold titles from Assistant Lecturer to Professor are an example of…',o:['Rank-in-the-job','Rank-in-the-person','Seniority system','Forced distribution'],a:1,w:'In rank-in-the-person, titles reflect proficiency rather than different job content.'},
    {q:'Which career ladder does the course describe as “caste-like”?',o:['Police','Military','Hospital','Clerical'],a:2,w:'Nurse aides rarely become nurses and nurses never become doctors.'},
    {q:'A ladder that lets outsiders in at higher levels has…',o:['Length','Breadth','Permeability','Predictability'],a:2,w:'Permeability allows external absorption of fresh viewpoints and skills.'},
    {q:'Which is NOT one of the three ways of testing merit for promotion?',o:['Personal judgement of the head','Promotion examination','Efficiency rating','Length of service'],a:3,w:'Length of service is the seniority principle, not a test of merit.'}
  ],
  card:[{h:'Qualities of a good ladder',items:['Length','Breadth','Permeability','Predictability and clarity','Adequate number of steps']},
    {h:'Career ladders',items:['Police: semi-unilinear, ASP entry','Military: enlisted and officer ladders','Hospital: rigid, caste-like','Industry: separate ladders converge at the top']},
    {h:'Testing merit',items:['Personal judgement of the head','Promotion examination','Efficiency rating']},
    {h:'Eligibility',items:['Personal qualification','Service status (years on the level below)']}]
});

/* ================= 2.4 ================= */
function moveScene(stage){
  H.cap(stage,'Moves across, up and down');
  const s=H.svg(stage,600,440);
  const lvl=[60,160,260,360];const node=(x,y,txt,g=s,w=120)=>{box(g,x-w/2,y-20,w,40,'var(--card)','var(--line)',8);t_(g,x,y+5,txt,{'text-anchor':'middle','font-size':12,'font-weight':700});};
  node(300,lvl[0],'Managing Director',s,150);[['Lagos branch',120],['Kano branch',300],['Port Harcourt',480]].forEach(([n,x])=>{el('line',{x1:300,y1:80,x2:x,y2:140,stroke:'var(--line)'},s);node(x,lvl[1],n);
    el('line',{x1:x,y1:180,x2:x,y2:240,stroke:'var(--line)'},s);node(x,lvl[2],'Officer');el('line',{x1:x,y1:280,x2:x,y2:340,stroke:'var(--line)'},s);node(x,lvl[3],'Assistant');});
  t_(s,20,lvl[1]+5,'Level 2',{'font-size':10,fill:'var(--muted)'});t_(s,20,lvl[2]+5,'Level 3',{'font-size':10,fill:'var(--muted)'});t_(s,20,lvl[3]+5,'Level 4',{'font-size':10,fill:'var(--muted)'});
  const trail=el('path',{fill:'none',stroke:'var(--data)','stroke-width':3,'stroke-dasharray':'6 5'},s);
  const ade=el('g',{},s);H.person(ade,0,0,'var(--emp)',1.8);
  const pay=el('g',{},s);box(pay,370,190,210,120,'var(--card)','var(--line)',10);t_(pay,475,212,'Salary steps on the scale',{'text-anchor':'middle','font-size':12,'font-weight':700});
  const steps=[];for(let i=0;i<10;i++){steps.push(el('rect',{x:388+i*19,y:290-i*6-12,width:15,height:12+i*6,rx:2,fill:'var(--sunk)'},pay));}
  const payT=t_(pay,475,232,'',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});
  const types=el('g',{},s);box(types,20,120,560,250,'var(--card)','var(--line)',10);
  [['Automatic','length of service only','var(--emp)'],['Semi-automatic','length of service + head certifies performance','var(--data)'],['Conditional','efficiency only: open to abuse unless standards are set','var(--org)']].forEach(([a,b,c],i)=>{t_(types,44,160+i*72,a,{'font-size':15,'font-weight':700,fill:c});t_(types,44,182+i*72,b,{'font-size':12.5});});
  const cost=el('g',{},s);box(cost,370,300,210,60,'var(--err-soft)','none',8);t_(cost,475,322,'Frequent transfers',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--err)'});t_(cost,475,342,'“a rolling stone gathers no moss”',{'text-anchor':'middle','font-size':11});
  const causes=el('g',{},s);box(causes,20,100,560,280,'var(--card)','var(--line)',10);t_(causes,300,130,'Causes of demotion',{'text-anchor':'middle','font-size':16,'font-weight':700,fill:'var(--err)'});
  ['Business recession and re-organisation','Incompetence after a recent promotion','Cannot adjust to new technology or methods','Ageing and declining competence (stagnation)','Penalty for breaking rules of conduct'].forEach((x,i)=>t_(causes,50,166+i*38,`${i+1}. ${x}`,{'font-size':13.5}));
  const reasons=el('g',{},s);box(reasons,330,96,250,118,'var(--data-soft)','none',8);t_(reasons,346,118,'Why transfer?',{'font-size':12.5,'font-weight':700,fill:'var(--data)'});['Needs of the business','Employee’s own request','To improve performance'].forEach((x,i)=>t_(reasons,346,142+i*22,'• '+x,{'font-size':12}));
  const pos={lagos:[120,lvl[2]-6],kano:[300,lvl[2]-6],ph:[480,lvl[2]-6],down:[300,lvl[3]-6]};
  return {update(t){const k=Math.floor(t);
    let p=pos.lagos,tr='';
    const tp=H.es(t,1,1.6);p=[H.lerp(pos.lagos[0],pos.kano[0],tp),pos.lagos[1]-Math.sin(tp*Math.PI)*40];if(tp>0)tr=`M${pos.lagos[0]} ${pos.lagos[1]} Q 210 ${pos.lagos[1]-60} ${p[0]} ${p[1]}`;
    const bp=H.es(t,4,4.8);if(bp>0){const ph=Math.sin(bp*Math.PI*4);p=[300+ph*180*(ph>0?1:1),pos.kano[1]-Math.abs(ph)*30];}
    const dp=H.es(t,7,7.6);if(dp>0){p=[H.lerp(p[0],pos.down[0],dp),H.lerp(p[1],pos.down[1],dp)];tr+=` M300 ${pos.kano[1]} L300 ${pos.down[1]}`;}
    ade.setAttribute('transform',`translate(${p[0]},${p[1]})`);H.set(trail,{d:tr});H.set(trail,{stroke:dp>0?'var(--err)':'var(--data)'});
    H.op(reasons,H.es(t,2,2.2)*(1-H.es(t,2.9,3.05)));H.op(cost,H.es(t,4,4.2)*(1-H.es(t,4.9,5.05)));
    H.op(pay,H.es(t,5,5.2)*(1-H.es(t,5.95,6.05)));const st=Math.round(10*H.seg(t,5.1,5.9));steps.forEach((r,i)=>H.set(r,{fill:i<st?'var(--org)':'var(--sunk)'}));payT.textContent=`step ${Math.max(1,st)} of 10 · same post, more pay`;
    H.op(types,H.es(t,6,6.2)*(1-H.es(t,6.95,7.05)));H.op(causes,H.es(t,7.7,7.9));
  }};
}
Course.add({id:'2.4',module:2,title:'Movement In and Out II: Transfer, Advancement, Demotion',vizLabel:'An org chart with moving staff',
  hook:{who:'Ade, branch officer',text:'Ade has been moved from Lagos to Kano, then back to Lagos, then to Port Harcourt, all in two years. Each time he starts learning a new client base, he is moved again. Is this a transfer system, or a problem?'},
  objectives:['Define transfer and give reasons for transfers','State advantages of a good transfer system and disadvantages of frequent transfer','Define advancement and its three types','Define demotion and its causes'],
  steps:[
    {h:'Three directions of movement',t:'<p>Inside an organisation people can move <b>across</b> (transfer), <b>up</b> (promotion and advancement) or <b>down</b> (demotion). Ade sits in the Lagos branch as an officer.</p>'},
    {h:'Transfer: a move across',t:'<p>A transfer moves an employee to another job or station of similar level, pay and responsibility. Ade moves from Lagos to Kano at the same level.</p>'},
    {h:'Reasons for transfer',t:'<p>The <b>needs of the business</b> (volume of work changes, a new product line; transfer instead of retrenching), the <b>employee’s own request</b> to be happier or more productive, or management’s aim to <b>improve performance</b> through a change of environment and job.</p>'},
    {h:'Advantages of a good transfer system',t:'<p>A change of job and environment refreshes the mind; it avoids needless recruitment and layoffs as business expands or shrinks; it broadens experience and outlook; and it supports a good promotion system.</p>'},
    {h:'Disadvantages of frequent transfer',t:'<p>Ade bounces between branches. Too many transfers stop staff gaining training and experience in a job; transfers on a head’s recommendation breed resentment; many are made for sentimental, not business, reasons; and frequent moves cut efficiency.</p>'},
    {h:'Advancement: more pay, same post',t:'<p>Advancement is “administrative promotion”: an increase in pay by a prescribed <b>increment within the salary scale</b> of the same position (Tyagi, 1975). Ade climbs the steps of his scale without changing post.</p>'},
    {h:'Three types of advancement',t:'<p><b>Automatic:</b> length of service only. <b>Semi-automatic:</b> length of service plus the head certifying adequate performance; otherwise the increment can be withheld. <b>Conditional:</b> efficiency alone, open to abuse, so rating standards are needed.</p>'},
    {h:'Demotion: a move down',t:'<p>Beach (1980): assigning an employee to a job of lower status and pay, usually with less difficulty and responsibility.</p><p>The course warns that demotion as a penalty to change attitude rarely works: the employee must first absorb the loss of pay and status, and often ends up frustrated.</p>'}
  ],
  scene:moveScene,
  sandboxIntro:'Decide the move and see what it is called and what it usually causes.',
  sandbox(ctl,st){
    const s=H.svg(st,520,320);let lv=0,br='same';const ro=H.readout(ctl);
    H.segBtns(ctl,'Change of level',[[1,'Up'],[0,'Same'],[-1,'Down']],0,v=>{lv=v;draw();});
    H.segBtns(ctl,'Change of place',[['same','Same branch'],['other','Other branch']],'same',v=>{br=v;draw();});
    function draw(){s.innerHTML='';[0,1,2].forEach(i=>{const x=90+i*170;box(s,x-60,40,120,36,'var(--card)','var(--line)',8);t_(s,x,63,['Lagos','Kano','Port Harcourt'][i],{'text-anchor':'middle','font-size':12,'font-weight':700});[0,1,2].forEach(l=>box(s,x-50,110+l*70,100,40,'var(--sunk)','none',6));});
      const fx=90,fy=200,tx=br==='same'?90:260,ty=200-lv*70;el('path',{d:`M${fx} ${fy} Q ${(fx+tx)/2} ${Math.min(fy,ty)-50} ${tx} ${ty}`,fill:'none',stroke:lv<0?'var(--err)':lv>0?'var(--org)':'var(--data)','stroke-width':3,'stroke-dasharray':'6 4'},s);
      H.person(s,fx,fy+8,'var(--muted)',1.4);H.person(s,tx,ty+8,'var(--emp)',1.8);
      const name=lv>0?'Promotion':lv<0?'Demotion':br==='other'?'Transfer':'Advancement (pay step only)';
      ro.innerHTML=`This move is a <b>${name}</b>.<br>${lv>0?'Greater responsibility and pay; needs eligibility and a merit or seniority test.':lv<0?'Lower status and pay: recession, incompetence after promotion, failure to adapt, or a penalty.':br==='other'?'Same level elsewhere: business needs, the employee’s request, or to improve performance. Avoid doing it too often.':'Same post, a yearly increment up the salary scale: automatic, semi-automatic or conditional.'}`;}
    draw();
  },
  sae:{q:'(i) Identify five reasons for personnel transfers from your working experience. (ii) Enumerate circumstances that lead to employee demotion.',a:['Transfers: changes in volume of work; a new product line or unit; the employee’s request; to refresh or improve performance; as part of a promotion path. (Use examples from your own workplace.)','Demotion: recession and re-organisation; incompetence after promotion; failure to adapt to new technology; ageing and declining competence; penalty for breaking rules.']},
  tma:{q:'Define transfer and outline four advantages and four disadvantages of frequent transfers of personnel.',outline:['Define transfer: movement to a job of similar level and pay elsewhere','Advantages of a good system: refreshes staff; avoids needless recruitment and layoff; broadens outlook; supports promotion','Disadvantages of frequent transfer: no time to gain training and experience; resentment when based on a head’s recommendation; sentimental not business reasons; reduced efficiency']},
  quiz:[
    {q:'An increase in pay by a prescribed increment within the same position’s salary scale is called…',o:['Transfer','Advancement','Promotion','Secondment'],a:1,w:'Advancement is “administrative promotion” within the scale.'},
    {q:'In a semi-automatic advancement system, an increment is given when…',o:['Length of service alone is met','The head certifies performance and service length is met','Efficiency alone is shown','The union agrees'],a:1,w:'Semi-automatic gives equal weight to service and certified performance.'},
    {q:'Which is a disadvantage of frequent transfer?',o:['Refreshes the employee','Broadens outlook','Stops staff gaining experience in a job','Avoids layoffs'],a:2,w:'A rolling stone gathers no moss: frequent moves prevent depth of experience.'},
    {q:'Beach defines demotion as…',o:['A sideways move','Assignment to a job of lower status and pay','Loss of a yearly increment only','Dismissal'],a:1,w:'Demotion lowers status and pay, usually with less responsibility.'}
  ],
  card:[{h:'Reasons for transfer',items:['Needs of the business','Employee’s request','To improve performance']},
    {h:'Types of advancement',items:['Automatic: length of service','Semi-automatic: service + certified performance','Conditional: efficiency only']},
    {h:'Causes of demotion',items:['Recession and re-organisation','Incompetence after promotion','Cannot adapt to new methods','Ageing and declining competence','Penalty for misconduct']}]
});

/* ================= 2.5 ================= */
function exitScene(stage){
  H.cap(stage,'Headcount as water in a tank');H.tag(stage);
  const s=H.svg(stage,600,440);
  const TX=60,TY=90,TW=260,TH=250;
  el('rect',{x:TX,y:TY,width:TW,height:TH,rx:8,fill:'var(--card)',stroke:'var(--muted)','stroke-width':3},s);
  const water=el('rect',{x:TX+3,width:TW-6,fill:'var(--data-soft)'},s);const wl=el('line',{x1:TX+3,x2:TX+TW-3,stroke:'var(--data)','stroke-width':2},s);
  const postsL=el('line',{x1:TX-10,x2:TX+TW+10,stroke:'var(--org)','stroke-width':2.5,'stroke-dasharray':'8 5'},s);const postsT=t_(s,TX+TW+14,0,'posts needed',{'font-size':11,fill:'var(--org)','font-weight':700});
  const red=el('rect',{x:TX+3,width:TW-6,fill:'var(--err-soft)'},s);const redT=t_(s,TX+TW/2,0,'redundant',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--err)'});
  const hc=t_(s,TX+TW/2,TY-12,'',{'text-anchor':'middle','font-size':14,'font-weight':700,class:'mono'});
  // tap
  el('path',{d:`M20 50 L120 50 L120 70`,fill:'none',stroke:'var(--org)','stroke-width':10,'stroke-linecap':'round'},s);t_(s,20,40,'Recruitment',{'font-size':12,'font-weight':700,fill:'var(--org)'});
  const valveX=el('g',{},s);el('line',{x1:100,y1:38,x2:100,y2:62,stroke:'var(--err)','stroke-width':4},valveX);t_(valveX,104,36,'restricted',{'font-size':10.5,fill:'var(--err)'});
  // drains
  const drains=[['Resignation',85],['Retirement',150],['Layoff and dismissal',215],['Redundancy',285]].map(([n,x],di)=>{const g=el('g',{},s);el('path',{d:`M${x} ${TY+TH} L${x} ${TY+TH+40}`,stroke:'var(--muted)','stroke-width':8,'stroke-linecap':'round'},g);
    const ly=TY+TH+56+(di%2)*26;t_(g,x,ly,n.split(' ')[0],{'text-anchor':'middle','font-size':10.5,'font-weight':700});if(n.includes(' '))t_(g,x,ly+13,n.split(' ').slice(1).join(' '),{'text-anchor':'middle','font-size':10.5,'font-weight':700});return {g,x};});
  // side tank
  el('path',{d:`M${TX+TW} ${TY+TH-30} L${TX+TW+40} ${TY+TH-30}`,stroke:'var(--data)','stroke-width':8},s);const side=el('rect',{x:TX+TW+40,y:TY+120,width:100,height:130,rx:6,fill:'var(--card)',stroke:'var(--muted)','stroke-width':2},s);
  const sideW=el('rect',{x:TX+TW+43,width:94,fill:'var(--data-soft)'},s);t_(s,TX+TW+90,TY+112,'Other unit',{'text-anchor':'middle','font-size':11,'font-weight':700});
  const sideL=t_(s,TX+TW+90,TY+270,'redeployment / secondment',{'text-anchor':'middle','font-size':10.5,fill:'var(--data)'});
  // remedies list
  const rem=el('g',{},s);box(rem,350,40,240,250,'var(--card)','var(--line)',10);t_(rem,365,62,'Before redundancy: remedies',{'font-size':12.5,'font-weight':700});
  const remItems=['Restrict overtime','Release part-time/contract staff','Restrict recruitment','Redeploy within the organisation','Retrain affected staff','Retire those past retirement age','Early retirement near the age','Seek voluntary redundancies'].map((x,i)=>t_(rem,365,86+i*25,'☐ '+x,{'font-size':11.3}));
  // retirement facts
  const ret=el('g',{},s);box(ret,350,40,240,200,'var(--card)','var(--line)',10);t_(ret,365,64,'Nigerian retirement rules',{'font-size':12.5,'font-weight':700});
  [['60','years of age, or'],['35','years of service'],['70','for judges'],['10','yrs minimum for pension, usually']].forEach(([a,b],i)=>{t_(ret,365,104+i*36,a,{'font-size':20,'font-weight':700,class:'mono',fill:'var(--org)'});t_(ret,405,100+i*36,b,{'font-size':11.5});});
  const lay=el('g',{},s);box(lay,350,40,240,250,'var(--card)','var(--line)',10);t_(lay,365,64,'Layoff: forms and terms',{'font-size':12.5,'font-weight':700});
  [['Temporary','may be recalled'],['Permanent','no recall, e.g. liquidation'],['Discharge','poor performance, rule breach'],['Dismissal','serious misconduct, no re-hire'],['Rationalisation','diplomatic word for layoff'],['Downsizing','to make the firm efficient']].forEach(([a,b],i)=>{t_(lay,365,92+i*32,a,{'font-size':12,'font-weight':700});t_(lay,365,106+i*32,b,{'font-size':10.5,fill:'var(--muted)'});});
  // headcount chart
  const ch=el('g',{},s);box(ch,350,40,240,250,'var(--card)','var(--line)',10);const cax=H.axes(ch,{x:380,y:80,w:190,h:160,xmin:0,xmax:8,ymin:60,ymax:140,xt:[[0,'0'],[8,'step 8']],yt:[80,100,120],yl:'Headcount'});
  const chP=el('path',{fill:'none',stroke:'var(--data)','stroke-width':3},ch);const chT=t_(ch,470,272,'slope = inflow − outflow',{'text-anchor':'middle','font-size':12,'font-weight':700,class:'mono'});
  const series=[100,112,112,104,96,92,86,80,84];const lvl=t=>{const i=Math.min(7,Math.floor(t)),f=H.ease(t-i);return H.lerp(series[i],series[i+1],f);};
  const posts=t=>H.lerp(110,88,H.es(t,2,2.6));
  // particles
  const P=[];for(let i=0;i<30;i++)P.push({c:el('circle',{r:3.5,fill:'var(--data)'},s),p:Math.random(),k:i%6});
  let flows=[0,0,0,0,0,0];
  const loop=()=>{if(!stage.isConnected)return;requestAnimationFrame(loop);P.forEach(q=>{const f=flows[q.k];if(f<.02){q.c.style.display='none';return;}q.c.style.display='';q.p=(q.p+.012*f)%1;
    if(q.k===0)H.set(q.c,{cx:120,cy:70+q.p*60});else if(q.k===5)H.set(q.c,{cx:TX+TW+q.p*40,cy:TY+TH-30});else{const x=drains[q.k-1].x;H.set(q.c,{cx:x,cy:TY+TH+q.p*40});}});};
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)requestAnimationFrame(loop);
  return {update(t){
    const L=lvl(t),sy=v=>TY+TH-(v/140)*TH;H.set(water,{y:sy(L),height:TY+TH-sy(L)-3});H.set(wl,{y1:sy(L),y2:sy(L)});hc.textContent=`${Math.round(L)} staff`;
    const ps=posts(t);H.set(postsL,{y1:sy(ps),y2:sy(ps)});H.set(postsT,{y:sy(ps)+4});H.op(postsL,H.es(t,2,2.2)*(1-H.es(t,3.9,4.05)));H.op(postsT,H.es(t,2,2.2)*(1-H.es(t,3.9,4.05)));
    const ex=Math.max(0,L-ps);H.set(red,{y:sy(L),height:Math.max(0,sy(ps)-sy(L))});H.set(redT,{y:sy(L)+Math.max(14,(sy(ps)-sy(L))/2+4)});H.op(red,H.es(t,2.4,2.7)*(1-H.es(t,3.9,4.05))*(ex>1?1:0));H.op(redT,H.es(t,2.4,2.7)*(1-H.es(t,3.9,4.05))*(ex>1?1:0));
    flows=[H.es(t,1,1.2)*(1-H.es(t,3,3.3)*.9)+H.es(t,8,8.2), 0,0,0,0, H.es(t,4,4.2)*(1-H.es(t,4.9,5))];
    flows[1]=H.es(t,5,5.2)*(1-H.es(t,5.9,6))+.3*H.es(t,8,8.2);flows[2]=H.es(t,6,6.2)*(1-H.es(t,6.9,7))+.3*H.es(t,8,8.2);flows[3]=H.es(t,7,7.2)*(1-H.es(t,7.9,8))+.2*H.es(t,8,8.2);flows[4]=H.es(t,3.3,3.6)*(1-H.es(t,3.95,4))*.6;
    drains.forEach((d,i)=>H.op(d.g,.35+.65*Math.min(1,flows[i+1]*2)));H.op(valveX,H.es(t,3,3.2)*(1-H.es(t,3.95,4.05)));
    const sl=H.es(t,4,4.8)*60*(1-H.es(t,8,8.6)*.3);H.set(sideW,{y:TY+250-sl,height:sl});
    H.op(rem,H.es(t,3,3.2)*(1-H.es(t,3.95,4.05)));const ticks=Math.round(8*H.seg(t,3.1,3.8));remItems.forEach((x,i)=>x.textContent=(i<ticks?'☑ ':'☐ ')+x.textContent.slice(2));
    H.op(ret,H.es(t,6,6.2)*(1-H.es(t,6.95,7.05)));H.op(lay,H.es(t,7,7.2)*(1-H.es(t,7.95,8.05)));
    H.op(ch,H.es(t,8,8.2)+H.es(t,0,.2)*(1-H.es(t,.9,1.05))*0);const pts=[];for(let i=0;i<=40;i++){const tt=8*i/40;if(tt>t&&t<8)break;pts.push([cax.sx(tt),cax.sy(lvl(tt))]);}H.set(chP,{d:pts.length>1?H.path(pts):''});
  }};
}
Course.add({id:'2.5',module:2,title:'Movement In and Out III: Redundancy, Retirement, Exit',vizLabel:'A headcount tank with taps and drains',
  hook:{who:'Kemi, HR director',text:'Kemi’s company has closed a production line. Forty jobs no longer exist, but forty people still hold them. Before anyone is laid off, what can she do, and how do resignations, retirements and redeployment change the numbers?'},
  objectives:['Explain redundancy and when it arises','List strategies for managing redundancy','Explain redeployment and secondment','Describe resignation, retirement (and pension conditions) and layoffs'],
  steps:[
    {h:'Headcount is a stock',t:'<p>Think of staff as water in a tank. The level is the headcount. People flow <b>in</b> through recruitment and <b>out</b> through exits. This links straight back to the supply forecast in Unit 1.2.</p>'},
    {h:'Inflow: recruitment',t:'<p>Open the recruitment tap and the level rises. Recruitment and selection (Units 1.3–1.4) are the only main inflow.</p>'},
    {h:'Redundancy',t:'<p>Redundancy is when jobs are no longer necessary, due to economic reasons or changes in policy, technology or methods. If the job is redundant, so is the jobholder. The dashed line (posts needed) drops below the water: the red band is redundant staff.</p><p>It arises when the employer stops the business, stops production at a unit, or the work is no longer relevant.</p>'},
    {h:'Managing redundancy',t:'<p>Before declaring redundancies, management can (Cole, 1997): restrict overtime; release part-time and short-contract staff; restrict recruitment; redeploy; retrain; retire those past the age; offer early retirement; seek voluntary redundancies. Then set minimum payments, a severance package, and consult those affected.</p>'},
    {h:'Redeployment and secondment',t:'<p>Redeployment is an offer of employment elsewhere in the organisation, at the same, similar or different work (Cole, 1997). Secondment is similar. It solves redundancy when alternative jobs exist, staff have some of the skills, and retraining is available.</p>'},
    {h:'Resignation',t:'<p>A voluntary withdrawal of service by the employee, from desire for a better job or dissatisfaction with present conditions.</p>'},
    {h:'Retirement',t:'<p>Every country fixes a compulsory retirement age. In Nigeria: <b>60 years of age or 35 years of service</b>; judges at <b>70</b>. Retirement may be voluntary or compulsory.</p><p>Pension conditions include proper appointment, whole-time service, pay from public funds, a minimum of usually <b>10 years</b>, diligent service, and reaching the age (or certified incapacity).</p>'},
    {h:'Layoffs',t:'<p>Beach (1980): an indefinite separation from the payroll for reasons beyond the employee’s control. It can be temporary (recall possible) or permanent. Related terms: discharge, termination, dismissal (serious misconduct), rationalisation, purges, downsizing and rightsizing.</p>'},
    {h:'The headcount curve',t:'<p>Plot the water level over time and you get the headcount curve. Its <b>slope</b> at any moment is inflow minus outflow: positive when hiring outpaces exits, negative when exits win.</p>'}
  ],
  scene:exitScene,
  sandboxIntro:'Run five years of inflows and outflows from a starting headcount of 200.',
  sandbox(ctl,st){
    const s=H.svg(st,540,330);const p={r:20,res:6,ret:3,lay:0,red:0};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s25r',label:'Recruits per year',min:0,max:60,value:20},v=>{p.r=v;draw();});
    H.slider(ctl,{id:'s25s',label:'Resignations per year',min:0,max:20,value:6,fmt:v=>v+'%'},v=>{p.res=v;draw();});
    H.slider(ctl,{id:'s25t',label:'Retirements per year',min:0,max:10,value:3,fmt:v=>v+'%'},v=>{p.ret=v;draw();});
    H.slider(ctl,{id:'s25l',label:'Layoffs in year 2',min:0,max:60,value:0},v=>{p.lay=v;draw();});
    function draw(){s.innerHTML='';const hc=[200];for(let y=1;y<=5;y++){let v=hc[y-1];v=v*(1-(p.res+p.ret)/100)+p.r-(y===2?p.lay:0);hc.push(Math.max(0,v));}
      const g=el('g',{},s);const mx=Math.max(260,...hc)*1.05;const ax=H.axes(g,{x:50,y:20,w:460,h:260,xmin:0,xmax:5,ymin:0,ymax:mx,xt:[0,1,2,3,4,5].map(v=>[v,'Yr '+v]),yt:[0,100,200],yl:'Headcount'});
      const pts=hc.map((v,i)=>[ax.sx(i),ax.sy(v)]);el('path',{d:H.path(pts)+`L${ax.sx(5)} ${ax.sy(0)} L${ax.sx(0)} ${ax.sy(0)}Z`,fill:'var(--data-soft)'},g);el('path',{d:H.path(pts),fill:'none',stroke:'var(--data)','stroke-width':3},g);
      pts.forEach((q,i)=>{el('circle',{cx:q[0],cy:q[1],r:4,fill:'var(--data)'},g);});
      const slope=p.r-200*(p.res+p.ret)/100;ro.innerHTML=`Year 5 headcount: <b>${Math.round(hc[5])}</b><br>Slope at the start: inflow ${p.r} − outflow ${Math.round(200*(p.res+p.ret)/100)} = <b>${slope>0?'+':''}${Math.round(slope)}</b> a year.`;}
    draw();H.tag(st,'Illustrative model');
  },
  sae:{q:'(i) Discuss five conditions that qualify employees for a pension. (ii) Identify five strategies for managing redundancy.',a:['Pension: appointed according to the rules of the service; whole-time employee of the state; pensionable pay drawn from public funds; served a minimum number of years (usually 10); certified diligent and faithful service; reached the age of superannuation or certified permanently incapacitated.','Redundancy: restrict overtime; release part-time or short-contract staff; restrict recruitment; redeploy; retrain; retire those past the age; early retirement; voluntary redundancy.']},
  tma:{q:'Discuss redundancy and redeployment and explain various strategies designed to resolve redundancy problems.',outline:['Define redundancy and when it arises (business ceases, unit stops, work no longer relevant)','Define redeployment and secondment; conditions where they solve redundancy','Crisis-reduction remedies (Cole, 1997): the eight listed','Then: minimum payments, severance package, consultation','Conclude on fairness and morale of those who stay']},
  quiz:[
    {q:'In the Nigerian civil service, compulsory retirement is at…',o:['55 years or 30 years of service','60 years or 35 years of service','65 years or 40 years of service','70 years for all'],a:1,w:'60 years of age or 35 years of service, whichever comes first; judges retire at 70.'},
    {q:'Which is a crisis-reduction remedy before declaring redundancy?',o:['Increase overtime','Restrict recruitment','Hire more part-time staff','Raise salaries'],a:1,w:'Restricting recruitment slows the inflow while the excess is absorbed.'},
    {q:'Beach defines a layoff as…',o:['A voluntary resignation','An indefinite separation from the payroll for reasons beyond the employee’s control','A transfer to another branch','A demotion'],a:1,w:'Layoffs come from factors outside the employee’s control and may be temporary or permanent.'},
    {q:'On the headcount curve, a negative slope means…',o:['Inflow is greater than outflow','Outflow is greater than inflow','No one is leaving','Recruitment has doubled'],a:1,w:'Slope = inflow − outflow; negative when exits outpace hiring.'}
  ],
  card:[{h:'Remedies before redundancy',items:['Restrict overtime','Release part-time/contract staff','Restrict recruitment','Redeploy','Retrain','Retire those past the age','Early retirement','Voluntary redundancy']},
    {h:'Forms of exit',items:['Resignation','Retirement','Discharge and termination','Dismissal','Layoff, rationalisation, downsizing']},
    {h:'Retirement in Nigeria',items:['60 years of age or 35 years of service','Judges: 70 years','Pension usually after 10 years minimum']}]
});
})();
