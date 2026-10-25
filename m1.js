/* Module 1 — Manpower planning, recruitment, selection, training */
(function(){
const {H}=Course, el=H.el, t_=H.t;

/* ================= 1.1 ================= */
function buildingScene(stage){
  H.cap(stage,'The four “rights” of manpower planning');
  const s=H.svg(stage,600,440);
  // dials
  const dialX=[110,240,370,500], dialNames=['Right number','Right kind','Right place','Right time'], off=[-160,40,150,-20];
  const needles=dialX.map((x,i)=>{const g=el('g',{transform:`translate(${x},58)`},s);
    el('circle',{r:27,fill:'var(--sunk)',stroke:'var(--line)'},g);
    el('path',{d:'M-11 -24 A27 27 0 0 1 11 -24 L0 0Z',fill:'var(--org-soft)'},g);
    const n=el('line',{x1:0,y1:0,x2:0,y2:-22,stroke:'var(--err)','stroke-width':3,'stroke-linecap':'round'},g);
    el('circle',{r:4,fill:'var(--ink)'},g);t_(g,0,46,dialNames[i],{'text-anchor':'middle','font-size':12,'font-weight':700});return n;});
  // timeline
  const tl=el('g',{},s);el('line',{x1:200,x2:520,y1:128,y2:128,stroke:'var(--line)','stroke-width':2},tl);
  ['J','F','M','A','M','J','J','A','S','O','N','D'].forEach((m,i)=>t_(tl,200+i*29+6,124,m,{'font-size':9,fill:'var(--muted)','text-anchor':'middle'}));
  const need=el('g',{},tl);el('line',{x1:0,x2:0,y1:118,y2:136,stroke:'var(--org)','stroke-width':2},need);t_(need,0,148,'post needed',{'font-size':10,fill:'var(--org)','text-anchor':'middle'});
  const ready=el('g',{},tl);el('circle',{cx:0,cy:128,r:5,fill:'var(--emp)'},ready);t_(ready,0,112,'staff ready',{'font-size':10,fill:'var(--emp)','text-anchor':'middle'});
  // building
  el('rect',{x:200,y:150,width:320,height:220,rx:6,fill:'var(--org-soft)',stroke:'var(--org)','stroke-width':2},s);
  el('rect',{x:345,y:330,width:30,height:40,fill:'var(--org)'},s);
  const wins=[],wpos=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++){const x=222+c*74,y=166+r*56;wpos.push([x+28,y+34]);wins.push(el('rect',{x,y,width:56,height:44,rx:3,fill:'var(--card)',stroke:'var(--org)','stroke-width':1},s));}
  ['Production','Sales','Accounts'].forEach((d,r)=>t_(s,193,194+r*56,d,{'text-anchor':'end','font-size':10,fill:'var(--muted)'}));
  // people
  const ppl=[];for(let i=0;i<15;i++){const g=el('g',{},s);el('circle',{cx:0,cy:-9,r:4.5},g);el('path',{d:'M-6.5 6 Q-6.5 -3 0 -3 Q6.5 -3 6.5 6 Z'},g);ppl.push(g);}
  const ground=i=>[30+i*38.5,418];
  // shortage / surplus labels
  const shortL=t_(s,520,140,'',{'font-size':11,'text-anchor':'end',fill:'var(--err)','font-weight':700});
  const surL=t_(s,20,394,'Surplus: wrong skills, idle cost',{'font-size':11,fill:'var(--muted)','font-weight':700});
  // scope overlay
  const scope=el('g',{},s);el('rect',{x:10,y:150,width:580,height:250,rx:10,fill:'var(--card)',stroke:'var(--line)',opacity:.97},scope);
  t_(scope,300,176,'Scope of manpower planning',{'text-anchor':'middle','font-weight':700,'font-size':15});
  ['Human resource planning','Design of organisation and job','Selection and staffing','Training and development','Organisational development','Compensation and benefits','Employee assistance','Union-labour relations','Personnel research and information'].forEach((x,i)=>{
    const c=i%3,r=Math.floor(i/3),gx=24+c*188,gy=196+r*64;el('rect',{x:gx,y:gy,width:176,height:48,rx:8,fill:'var(--org-soft)'},scope);
    const words=x.split(' ');const half=Math.ceil(words.length/2);
    t_(scope,gx+88,gy+20,words.slice(0,half).join(' '),{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--org)'});t_(scope,gx+88,gy+36,words.slice(half).join(' '),{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--org)'});});
  return {update(t){
    needles.forEach((n,i)=>{const p=H.es(t,i+1,i+1.8);const a=H.lerp(off[i],0,p);n.setAttribute('transform',`rotate(${a})`);H.set(n,{stroke:p>.98?'var(--org)':'var(--err)'});});
    const count=Math.round(H.lerp(5,12,H.es(t,1,1.8))), amber=Math.round(H.lerp(2,12,H.es(t,2,2.8)));
    const short=H.es(t,5,5.5)*(1-H.es(t,6,6.4)), extra=short;
    for(let i=0;i<15;i++){const g=ppl[i];let vis=i<count?1:0,pos=ground(i),col=i<amber?'var(--emp)':'var(--muted)';
      if(i<12){const pin=H.es(t,3+i*0.05,3.5+i*0.05);const w=wpos[i];pos=[H.lerp(ground(i)[0],w[0],pin),H.lerp(ground(i)[1],w[1],pin)];
        if(i>=9&&short>0){pos=[H.lerp(pos[0],ground(i)[0],short),H.lerp(pos[1],ground(i)[1]-60,short)];vis=1-short;}}
      else {vis=extra;pos=[30+(i-12)*38.5,418];col='var(--muted)';}
      g.style.fill=col;g.setAttribute('transform',`translate(${pos[0]},${pos[1]})`);H.op(g,vis);}
    wins.forEach((w,i)=>H.set(w,{stroke:i>=9&&short>.2?'var(--err)':'var(--org)','stroke-dasharray':i>=9&&short>.2?'4 3':'none','stroke-width':i>=9&&short>.2?2:1}));
    shortL.textContent=short>.2?'Shortage: Accounts posts unfilled':'';H.op(surL,extra);
    const tp=H.es(t,4,4.8);H.op(tl,H.es(t,3.8,4.1));need.setAttribute('transform','translate(345,0)');ready.setAttribute('transform',`translate(${H.lerp(461,316,tp)},0)`);
    H.op(scope,H.es(t,6,6.4));
  }};
}
Course.add({id:'1.1',module:1,title:'The Nature of Manpower Planning',vizLabel:'Four dials and an office block',
  hook:{who:'Chiamaka, HR officer',text:'Chiamaka’s company opened a new sales office in Abeokuta. Six months later the Accounts desk is empty, three production hands have nothing to do, and the sales team was hired a month after the launch. None of this was bad luck. It was a planning failure.'},
  objectives:['Define manpower planning and state what it puts in place','Explain the rationale and need for manpower planning in organisations','List the objectives of personnel management','Describe the scope of manpower planning'],
  steps:[
    {h:'What manpower planning means',t:'<p>Manpower planning, also called human resource planning, puts the <b>right number</b> of people, of the <b>right kind</b>, in the <b>right place</b> at the <b>right time</b>, doing the work they are suited for.</p><p>Walker (1980): analysing an organisation’s human resource needs under changing conditions and developing the activities to satisfy them. It is ongoing, never a one-off.</p>'},
    {h:'Right number',t:'<p>The first dial turns. The building has 12 posts, so the plan must deliver 12 people, not 5 and not 18.</p><p>The procedure starts by analysing the current manpower inventory and forecasting future needs.</p>'},
    {h:'Right kind',t:'<p>Numbers alone are not enough. Grey figures lack the skills the job needs. Planning specifies the qualifications and characteristics required, so the right kind of person is found or trained.</p>'},
    {h:'Right place',t:'<p>People must be deployed where the work is: Production, Sales and Accounts each need their own staff. Good placement prevents one unit from being overstaffed while another is starved.</p>'},
    {h:'Right time',t:'<p>The staff-ready marker slides from September back to May, ahead of the June need. Hiring after the need arises costs output; hiring too early costs wages for idle staff.</p>'},
    {h:'Why organisations need it',t:'<p>Without a plan, shortage and surplus can exist <b>at the same time</b>: Accounts posts sit empty while people with the wrong skills stand idle.</p><p>Manpower planning lets management anticipate changes, control labour cost and keep enough qualified people for future expansion.</p>'},
    {h:'The scope of manpower planning',t:'<p>Manpower planning touches every people decision in the organisation. The course lists nine areas, from human resource planning itself to personnel research and information systems.</p>'}
  ],
  scene:buildingScene,
  sandboxIntro:'Set each dial and see which problems appear in the office block. The block has 12 posts.',
  sandbox(ctl,st){
    const s=H.svg(st,520,340);const p={n:12,k:100,pl:100,tm:0};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s11n',label:'Staff available',min:4,max:18,value:12},v=>{p.n=v;draw();});
    H.slider(ctl,{id:'s11k',label:'Skills match',min:0,max:100,step:5,value:100,fmt:v=>v+'%'},v=>{p.k=v;draw();});
    H.slider(ctl,{id:'s11p',label:'Placed in the right unit',min:0,max:100,step:5,value:100,fmt:v=>v+'%'},v=>{p.pl=v;draw();});
    H.slider(ctl,{id:'s11t',label:'Staff ready (months vs need)',min:-4,max:6,value:0,fmt:v=>v===0?'on time':v<0?(-v)+' early':v+' late'},v=>{p.tm=v;draw();});
    function draw(){s.innerHTML='';el('rect',{x:110,y:40,width:300,height:230,rx:6,fill:'var(--org-soft)',stroke:'var(--org)','stroke-width':2},s);
      const filled=Math.min(12,p.n),skilled=Math.round(filled*p.k/100),placed=Math.round(filled*p.pl/100);
      for(let i=0;i<12;i++){const c=i%4,r=Math.floor(i/4),x=128+c*70,y=58+r*70;const rect=el('rect',{x,y,width:56,height:52,rx:3,fill:'var(--card)',stroke:i<filled?'var(--org)':'var(--err)','stroke-dasharray':i<filled?'none':'4 3','stroke-width':i<filled?1:2},s);
        if(i<filled){const col=i<skilled?'var(--emp)':'var(--muted)';const off=i<placed?0:14;H.person(s,x+28+off,y+38,col,1.1);if(i>=placed)t_(s,x+44,y+14,'?',{'font-size':12,fill:'var(--err)','font-weight':700});}}
      for(let i=12;i<p.n;i++)H.person(s,40+(i-12)*28,318,'var(--muted)',1);
      const issues=[];if(p.n<12)issues.push(`<b>Shortage:</b> ${12-p.n} posts unfilled.`);if(p.n>12)issues.push(`<b>Surplus:</b> ${p.n-12} people with no post, paid but idle.`);
      if(p.k<100)issues.push(`<b>Skills gap:</b> ${filled-skilled} people need training or replacement.`);if(p.pl<100)issues.push(`<b>Misplacement:</b> ${filled-placed} people sit in the wrong unit.`);
      if(p.tm>0)issues.push(`<b>Too late:</b> work is lost for ${p.tm} month${p.tm>1?'s':''}.`);if(p.tm<-1)issues.push(`<b>Too early:</b> ${-p.tm} months of wages before the work exists.`);
      ro.innerHTML=issues.length?issues.join('<br>'):'<b>All four rights are met.</b> Every post is filled, on time, by a suitable person.';}
    draw();
  },
  sae:{q:'Why can an organisation have a shortage and a surplus of staff at the same time?',a:'Because manpower is not one pool. One unit can lack people with the right skills (shortage) while another unit, or people with the wrong skills, have no productive work (surplus). Planning matches number, kind, place and time together.'},
  tma:{q:'Explain your understanding of the manpower planning process in an organisation.',outline:['Define manpower planning (right number, kind, place, time; Walker 1980; Teresa 1999)','The procedure: analyse the current manpower inventory → forecast future needs → develop employment programmes → design training programmes','Rationale and need: anticipate change, control cost, ensure supply for expansion','Scope: the nine areas, from HRP to personnel research and information','Conclude: it is continuous and must be refined as needs change']},
  quiz:[
    {q:'Which set best describes what manpower planning tries to achieve?',o:['The most staff at the lowest wage','The right number and kind of people, in the right place, at the right time','Promotion of all long-serving staff','A yearly headcount report'],a:1,w:'The course defines manpower planning by the four rights, plus doing the right things they are suited for.'},
    {q:'Manpower planning is best described as…',o:['A one-off exercise when a company starts','An ongoing process refined as needs change','A function of the finance department only','A trade union negotiation'],a:1,w:'The course stresses that manpower planning is not static. It must be refined to meet needs as and when due.'},
    {q:'Which of these is listed in the scope of manpower planning?',o:['Product pricing','Union-labour relations','Share issue','Factory location'],a:1,w:'The scope covers people-related areas, including union-labour relations, compensation and benefits, and employee assistance.'}
  ],
  card:[{h:'The four rights',items:['Right number','Right kind','Right place','Right time']},
    {h:'Manpower planning procedure',ordered:true,items:['Analyse the current manpower inventory','Make future manpower forecasts','Develop employment programmes','Design training programmes']},
    {h:'Scope (nine areas)',items:['Human resource planning','Design of organisation and job','Selection and staffing','Training and development','Organisational development','Compensation and benefits','Employee assistance','Union-labour relations','Personnel research and information system']}]
});

/* ================= 1.2 ================= */
const D=y=>120+10*y+1.6*y*y, S0=y=>125+6*y-0.8*y*y-6*y*0; // supply after losses
const Sloss=y=>125-4*y-0.6*y*y;
function hrpScene(stage){
  H.cap(stage,'Demand and supply of manpower, 2026 to 2031');H.tag(stage);
  const s=H.svg(stage,600,440);
  // phase chips
  const phases=['1 Data and forecasts','2 Objectives and approval','3 Plans and programmes','4 Control and evaluation'];
  const chips=phases.map((p,i)=>{const g=el('g',{transform:`translate(${12+i*146},10)`},s);const r=el('rect',{width:138,height:22,rx:11,fill:'var(--sunk)'},g);const tx=t_(g,69,15,p,{'text-anchor':'middle','font-size':10.5,fill:'var(--muted)'});return {r,tx};});
  // chain
  const chain=el('g',{},s);const cv=[['Sales budget','₦600m'],['Units to produce','120,000'],['Labour hours','240,000'],['Workers needed','133']];
  const chainBoxes=cv.map((c,i)=>{const g=el('g',{transform:`translate(${14+i*148},44)`},chain);el('rect',{width:132,height:52,rx:8,fill:'var(--org-soft)'},g);t_(g,66,20,c[0],{'text-anchor':'middle','font-size':11,fill:'var(--org)'});t_(g,66,41,c[1],{'text-anchor':'middle','font-size':16,'font-weight':700,class:'mono'});if(i<3)t_(chain,14+i*148+139,76,'→',{'font-size':16,'text-anchor':'middle',fill:'var(--muted)'});return g;});
  t_(chain,300,112,'@ 2 labour hours per unit, 1,800 hours per worker per year',{'text-anchor':'middle','font-size':10.5,fill:'var(--muted)'});
  const g=el('g',{},s);
  const ax=H.axes(g,{x:60,y:130,w:500,h:250,xmin:0,xmax:5,ymin:80,ymax:240,xt:[[0,2026],[1,2027],[2,2028],[3,2029],[4,2030],[5,2031]],yt:[100,140,180,220],yl:'Staff'});
  const gapS=el('path',{fill:'var(--err-soft)',opacity:.85},g), gapP=el('path',{fill:'var(--sunk)',opacity:.9},g);
  const dP=el('path',{fill:'none',stroke:'var(--org)','stroke-width':3},g), sP=el('path',{fill:'none',stroke:'var(--emp)','stroke-width':3},g);
  const dL=t_(g,0,0,'Demand',{fill:'var(--org)','font-weight':700,'font-size':12}), sL=t_(g,0,0,'Supply',{fill:'var(--emp)','font-weight':700,'font-size':12});
  const vet=el('g',{},g);const cur=el('circle',{r:6,fill:'var(--emp)'},vet),des=el('circle',{r:6,fill:'var(--org)'},vet);const vp=el('path',{fill:'none',stroke:'var(--ink)','stroke-dasharray':'5 5','stroke-width':1.5},vet);
  const vt1=t_(vet,0,0,'Current position',{'font-size':11}),vt2=t_(vet,0,0,'Desired position',{'font-size':11,'text-anchor':'end'});
  const tan=el('g',{},g);const tl=el('line',{stroke:'var(--data)','stroke-width':2},tan),td=el('circle',{r:5,fill:'var(--data)'},tan);const tt=t_(tan,0,0,'',{'font-size':12,fill:'var(--data)','font-weight':700});
  const forces=el('g',{},g);['absenteeism','wastage','promotions out','retirements'].forEach((f,i)=>{const x=ax.sx(1+i*1.1);const fg=el('g',{transform:`translate(${x},0)`},forces);el('path',{d:'M0 0 L0 22 M-5 16 L0 23 L5 16',stroke:'var(--err)','stroke-width':2,fill:'none'},fg);t_(fg,0,-5,f,{'text-anchor':'middle','font-size':10.5,fill:'var(--err)'});fg.dataset.x=1+i*1.1;});
  const progs=el('g',{},g);['recruitment','training','redeployment','retention'].forEach((f,i)=>{const fg=el('g',{},progs);el('path',{d:'M0 0 L0 -22 M-5 -16 L0 -23 L5 -16',stroke:'var(--org)','stroke-width':2,fill:'none'},fg);t_(fg,0,15,f,{'text-anchor':'middle','font-size':10.5,fill:'var(--org)'});fg.dataset.x=1+i*1.1;});
  const actual=el('g',{},g);const rnd=H.seeded(7);const act=[0,1,2,3,4,5].map(y=>{const c=el('circle',{r:5,fill:'var(--card)',stroke:'var(--data)','stroke-width':2},actual);c.dataset.y=y;c.dataset.e=(rnd()-.5)*14;return c;});
  const actL=t_(actual,330,145,'○ actual headcount vs plan',{'font-size':11,fill:'var(--data)'});
  const N=60;
  return {update(t){
    const k=Math.floor(t);
    chips.forEach((c,i)=>{const on=(i===0&&t<5)||(i===1&&t>=0&&t<1)||(i===2&&t>=6&&t<7)||(i===3&&t>=7);H.set(c.r,{fill:on?'var(--org)':'var(--sunk)'});H.set(c.tx,{fill:on?'var(--card)':'var(--muted)'});});
    H.op(chain,H.es(t,4,4.3)*(1-H.es(t,4.9,5.1)));chainBoxes.forEach((b,i)=>H.op(b,H.es(t,4+i*.15,4.2+i*.15)));
    // vetter
    H.op(vet,1-H.es(t,1,1.4));const vp1=[ax.sx(0),ax.sy(125)],vp2=[ax.sx(5),ax.sy(D(5))];H.set(cur,{cx:vp1[0],cy:vp1[1]});H.set(des,{cx:vp2[0],cy:vp2[1]});
    const vpp=H.es(t,0,.7);H.set(vp,{d:`M${vp1[0]} ${vp1[1]} L${H.lerp(vp1[0],vp2[0],vpp)} ${H.lerp(vp1[1],vp2[1],vpp)}`});H.set(vt1,{x:vp1[0]+10,y:vp1[1]+20});H.set(vt2,{x:vp2[0]-10,y:vp2[1]-10});
    // curves
    const draw=H.es(t,1,1.8), bend=H.es(t,5,5.8), lift=H.es(t,6,6.8);
    const Sy=y=>{const flat=125, lost=Sloss(y);let v=H.lerp(flat,lost,bend);return H.lerp(v,D(y),lift);};
    const dpts=[],spts=[];for(let i=0;i<=N*draw;i++){const y=5*i/N;dpts.push([ax.sx(y),ax.sy(D(y))]);spts.push([ax.sx(y),ax.sy(Sy(y))]);}
    H.set(dP,{d:dpts.length>1?H.path(dpts):''});H.set(sP,{d:spts.length>1?H.path(spts):''});
    H.set(dL,{x:ax.sx(5)-48,y:ax.sy(D(5))-10});H.set(sL,{x:ax.sx(5)-44,y:ax.sy(Sy(5))+20});H.op(dL,draw);H.op(sL,draw);
    // gaps
    const go=H.es(t,2,2.6);let sh='',su='';const top=[],bot=[];
    for(let i=0;i<=N;i++){const y=5*i/N;top.push([ax.sx(y),ax.sy(Math.max(D(y),Sy(y)))]);bot.push([ax.sx(y),ax.sy(Math.min(D(y),Sy(y)))]);}
    const shortPts=[],surPts=[];for(let i=0;i<=N;i++){const y=5*i/N,d=D(y),sv=Sy(y);shortPts.push([ax.sx(y),ax.sy(Math.max(d,sv))]);surPts.push([ax.sx(y),ax.sy(Math.max(sv,d))]);}
    // shortage area: between D (top) and S where D>S
    const A=[],B=[];for(let i=0;i<=N;i++){const y=5*i/N,d=D(y),sv=Sy(y);A.push([ax.sx(y),ax.sy(d>sv?d:sv)]);B.push([ax.sx(y),ax.sy(sv)]);}
    const C2=[],D2=[];for(let i=0;i<=N;i++){const y=5*i/N,d=D(y),sv=Sy(y);C2.push([ax.sx(y),ax.sy(sv>d?sv:d)]);D2.push([ax.sx(y),ax.sy(d)]);}
    sh=H.path(A)+'L'+B.reverse().map(p=>p.join(' ')).join('L')+'Z';su=H.path(C2)+'L'+D2.reverse().map(p=>p.join(' ')).join('L')+'Z';
    H.set(gapS,{d:sh});H.set(gapP,{d:su});H.op(gapS,go*draw);H.op(gapP,go*draw);
    // tangent
    const tp=H.seg(t,3,3.95);H.op(tan,H.es(t,3,3.15)*(1-H.es(t,3.95,4.05)));const y0=.3+4.4*tp,d0=D(y0),sl=10+3.2*y0;
    const x1=y0-.6,x2=y0+.6;H.set(tl,{x1:ax.sx(x1),y1:ax.sy(d0-sl*.6),x2:ax.sx(x2),y2:ax.sy(d0+sl*.6)});H.set(td,{cx:ax.sx(y0),cy:ax.sy(d0)});
    tt.textContent=`slope: +${sl.toFixed(0)} staff per year`;H.set(tt,{x:Math.min(ax.sx(y0)-60,430),y:ax.sy(d0)-22});
    // forces + programmes
    H.op(forces,H.es(t,5,5.3)*(1-H.es(t,5.9,6.1)));[...forces.children].forEach(f=>{const y=+f.dataset.x;f.setAttribute('transform',`translate(${ax.sx(y)},${ax.sy(Sy(y))-34})`);});
    H.op(progs,H.es(t,6,6.3)*(1-H.es(t,6.9,7.1)));[...progs.children].forEach(f=>{const y=+f.dataset.x;f.setAttribute('transform',`translate(${ax.sx(y)},${ax.sy(Sy(y))+34})`);});
    H.op(actual,H.es(t,7,7.4));act.forEach((c,i)=>{const y=+c.dataset.y;H.op(c,H.es(t,7+i*.08,7.2+i*.08));H.set(c,{cx:ax.sx(y),cy:ax.sy(D(y)+(+c.dataset.e))});});
  }};
}
Course.add({id:'1.2',module:1,title:'Manpower Plan Implementation and Administration',vizLabel:'Demand and supply curves with a moving slope',
  hook:{who:'Tunde, plant manager',text:'Tunde’s factory plans to grow sales every year for five years. Today he has 125 workers. How many will he need in 2031, how many will he actually have if nothing is done, and what should he start doing now?'},
  objectives:['Give the definitions of HRP by Vetter, McBeath and Beach','Describe the four phases of human resource planning','Explain demand forecasting, supply forecasting and HR programming','Identify the factors, requisites and barriers to successful HRP'],
  steps:[
    {h:'From current position to desired position',t:'<p><b>Vetter:</b> HRP is how management moves the organisation from its <b>current manpower position</b> to its <b>desired manpower position</b>.</p><p>The work happens in <b>four phases</b> (the chips at the top): data and forecasts; objectives and policies approved by top management; plans and programmes; control and evaluation.</p>'},
    {h:'Two things to plan: requirements and supplies',t:'<p><b>Gordon McBeath:</b> HRP is planning manpower <b>requirements</b> (the green demand curve) and manpower <b>supplies</b> (the amber supply curve).</p><p>Before forecasting, managers scan the environment: economic, technological, demographic, political and legislative, and social factors.</p>'},
    {h:'The gap is the planning problem',t:'<p>Where demand is above supply the area is shaded red: a <b>shortage</b>. Where supply is above demand it is grey: a <b>surplus</b>.</p><p><b>Beach</b> puts it as an adequate number of qualified persons, available at proper times.</p>'},
    {h:'Watch the slope, not only the level',t:'<p>The blue line touching the demand curve is its <b>tangent</b>. Its slope is the <b>rate of change</b>: how many extra staff are needed per year at that moment.</p><p>Here the slope grows from about +11 to +26 a year. A plan built on this year’s number alone will fall behind.</p>'},
    {h:'How demand is forecast',t:'<p>The annual budget and corporate plan are translated into activity: <b>sales budget → production plan → labour hours → workers needed</b>.</p><p>Techniques: managerial judgement, ratio-trend analysis, regression analysis, work-study techniques and the Delphi technique.</p>'},
    {h:'Supply forecast: what you will really have',t:'<p>Today’s 125 staff will not stay 125. The supply forecast allows for <b>absenteeism, wastage, internal movements and promotions, retirements</b> and changes in hours.</p><p>Watch the amber curve bend down and the red gap widen.</p>'},
    {h:'HR programming and implementation',t:'<p>Demand and supply are balanced through programmes: <b>recruitment, selection and placement, training and development, retraining and redeployment, retention and succession plans</b>.</p><p>Each programme pushes supply up until the gap closes.</p>'},
    {h:'Control and evaluation',t:'<p>The final phase. Actual headcount (blue rings) is checked against the plan, recruitment against targets, and employment cost against budget, so corrective action can be taken.</p>'}
  ],
  scene:hrpScene,
  sandboxIntro:'Build your own five-year plan. The model starts with 125 staff and a demand of 120.',
  sandbox(ctl,st){
    const s=H.svg(st,560,340);const p={g:10,pr:2,w:8,r:10};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s12g',label:'Sales growth per year',min:0,max:25,value:10,fmt:v=>v+'%'},v=>{p.g=v;draw();});
    H.slider(ctl,{id:'s12p',label:'Productivity gain per year',min:0,max:10,value:2,fmt:v=>v+'%'},v=>{p.pr=v;draw();});
    H.slider(ctl,{id:'s12w',label:'Wastage rate (leavers)',min:0,max:20,value:8,fmt:v=>v+'%'},v=>{p.w=v;draw();});
    H.slider(ctl,{id:'s12r',label:'Recruits per year',min:0,max:60,value:10},v=>{p.r=v;draw();});
    function draw(){s.innerHTML='';const g=el('g',{},s);const Dm=[],Sp=[];let sv=125;for(let y=0;y<=5;y++){Dm.push(120*Math.pow((1+p.g/100)/(1+p.pr/100),y));Sp.push(sv);sv=sv*(1-p.w/100)+p.r;}
      const mx=Math.max(...Dm,...Sp)*1.1;const ax=H.axes(g,{x:50,y:24,w:480,h:270,xmin:0,xmax:5,ymin:0,ymax:mx,xt:[[0,2026],[1,2027],[2,2028],[3,2029],[4,2030],[5,2031]],yt:[0,Math.round(mx/2),Math.round(mx*.9)],yl:'Staff'});
      const dp=Dm.map((v,i)=>[ax.sx(i),ax.sy(v)]),sp=Sp.map((v,i)=>[ax.sx(i),ax.sy(v)]);
      for(let i=0;i<5;i++){const short=Dm[i+1]>Sp[i+1];el('path',{d:`M${dp[i]} L${dp[i+1]} L${sp[i+1]} L${sp[i]}Z`,fill:short?'var(--err-soft)':'var(--sunk)'},g);}
      el('path',{d:H.path(dp),fill:'none',stroke:'var(--org)','stroke-width':3},g);el('path',{d:H.path(sp),fill:'none',stroke:'var(--emp)','stroke-width':3},g);
      t_(g,dp[5][0]-4,dp[5][1]-8,'Demand',{'text-anchor':'end',fill:'var(--org)','font-weight':700,'font-size':12});t_(g,sp[5][0]-4,sp[5][1]+18,'Supply',{'text-anchor':'end',fill:'var(--emp)','font-weight':700,'font-size':12});
      const gap=Dm[5]-Sp[5];const need=Math.max(0,Math.ceil(gap/5+p.r));
      ro.innerHTML=`2031 demand: <b>${Math.round(Dm[5])}</b> · 2031 supply: <b>${Math.round(Sp[5])}</b><br>${gap>0?`<span style="color:var(--err)">Shortage of <b>${Math.round(gap)}</b> staff.</span> Raise recruits to about <b>${need}</b> a year, cut wastage, or train for productivity.`:`<span>Surplus of <b>${Math.round(-gap)}</b> staff.</span> Slow recruitment or plan redeployment.`}`;}
    draw();H.tag(st);
  },
  sae:{q:'Describe the various forecasting techniques and how they are used.',a:['<b>Managerial judgement:</b> experienced managers estimate future needs.','<b>Ratio-trend analysis:</b> past ratios (e.g. workers per unit of output) are projected forward.','<b>Regression analysis:</b> staff numbers are related statistically to drivers such as sales or output.','<b>Work-study techniques:</b> time needed per task × planned output gives labour hours and headcount.','<b>Delphi technique:</b> a panel of experts gives estimates in rounds until they agree.']},
  tma:{q:'Explain the barriers to HRP, and the major roles of the HRP process in organisations.',outline:['Barriers: HR practitioners seen as personnel experts, not business experts; HR information incompatible with strategy information; short-term vs long-term conflict; quantitative vs qualitative conflict; non-involvement of operating managers','Roles: forecast demand; forecast supply; balance them through HR programming; implement programmes (recruitment, training, redeployment, retention, succession); control and evaluate against budgets and targets','Link the four phases to these roles and close with the need for top-management support']},
  quiz:[
    {q:'Which writer defined HRP as moving from the current manpower position to the desired manpower position?',o:['Beach','Vetter','Gordon McBeath','Walker'],a:1,w:'Vetter framed HRP as moving the organisation from where it is to where it wants to be.'},
    {q:'A supply forecast must allow for…',o:['Advertising costs','Absenteeism, wastage, internal movements and promotions','Product prices','Share dividends'],a:1,w:'Supply is what you will really have after people are absent, leave, move or are promoted.'},
    {q:'On the demand curve, the slope of the tangent tells the planner…',o:['How many staff exist today','How fast the need for staff is changing','The wage bill','The number of applicants'],a:1,w:'The slope is the rate of change: extra staff needed per year at that point.'},
    {q:'Which is the final phase of HRP?',o:['Environmental scanning','Demand forecasting','Control and evaluation','HR programming'],a:2,w:'Control and evaluation checks actual results against the plan, targets and budget.'}
  ],
  card:[{h:'Four phases of HRP',ordered:true,items:['Gather and analyse data (manpower inventories and forecasts)','Set manpower objectives and policies; get top-management approval','Design and implement plans and programmes','Control and evaluate the plans']},
    {h:'HRP process',ordered:true,items:['Environmental scanning','Organisational objectives and policies','HR demand forecast','HR supply forecast','HR programming (balance demand and supply)','HR plan implementation','Control and evaluation']},
    {h:'Demand forecasting techniques',items:['Managerial judgement','Ratio-trend analysis','Regression analysis','Work-study techniques','Delphi technique']},
    {h:'Barriers to HRP',items:['HR seen as personnel experts, not business experts','HR information incompatible with strategy data','Short-term vs long-term needs','Quantitative vs qualitative approaches','Operating managers not involved']}]
});

/* ================= 1.3 ================= */
function recruitScene(stage){
  H.cap(stage,'Filling the applicant pool');
  const s=H.svg(stage,600,440);
  const red=H.reducedMotion;
  // org building (internal)
  el('rect',{x:24,y:60,width:120,height:110,rx:6,fill:'var(--org-soft)',stroke:'var(--org)','stroke-width':2},s);t_(s,84,52,'Your organisation',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--org)'});
  for(let i=0;i<6;i++)el('rect',{x:38+(i%3)*34,y:76+Math.floor(i/3)*40,width:24,height:26,rx:2,fill:'var(--card)'},s);
  // external sources
  const ext=[['Employment agencies',70],['Educational and technical institutes',130],['Applicants at the gate',190]];
  ext.forEach(([n,y])=>{el('rect',{x:430,y:y-22,width:156,height:40,rx:8,fill:'var(--emp-soft)'},s);t_(s,508,y+2,n.length>24?n.slice(0,22)+'…':n,{'text-anchor':'middle','font-size':11,fill:'var(--emp)','font-weight':700});});
  t_(s,508,34,'External sources',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--emp)'});
  // pipes
  const pI='M144 140 C 220 140 220 250 260 280', pE=[`M430 70 C 360 70 360 250 340 280`,`M430 130 C 380 130 370 250 340 280`,`M430 190 C 390 190 380 250 340 280`];
  const pipeI=el('path',{d:pI,fill:'none',stroke:'var(--org)','stroke-width':10,'stroke-linecap':'round',opacity:.25},s);
  const pipesE=pE.map(d=>el('path',{d,fill:'none',stroke:'var(--emp)','stroke-width':8,'stroke-linecap':'round',opacity:.25},s));
  // reservoir
  el('path',{d:'M200 270 L200 410 Q200 425 215 425 L385 425 Q400 425 400 410 L400 270',fill:'var(--sunk)',stroke:'var(--muted)','stroke-width':2},s);
  t_(s,300,262,'Applicant pool',{'text-anchor':'middle','font-size':13,'font-weight':700});
  const rnd=H.seeded(11);const pool=[];for(let i=0;i<150;i++){const c=el('circle',{cx:212+rnd()*176,cy:418-Math.pow(rnd(),.8)*140,r:4},s);pool.push(c);}
  // labels
  const labI=el('g',{},s),labE=el('g',{},s),labPh=el('g',{},s);
  const lab=(g,x,y,txt,col)=>{t_(g,x,y,txt,{'font-size':11.5,fill:col});};
  ['+ morale and loyalty','+ known track record','+ low training cost','+ good union relations'].forEach((x,i)=>lab(labI,20,200+i*18,x,'var(--org)'));
  const labI2=el('g',{},s);['− source may dry up','− inbreeding, no new blood','− little innovation'].forEach((x,i)=>lab(labI2,20,200+i*18,x,'var(--err)'));
  ['+ new ideas and methods','+ wider talent pool','+ better skills mix'].forEach((x,i)=>lab(labE,420,240+i*18,x,'var(--emp)'));
  const labE2=el('g',{},s);['− costly and slow','− orientation needed','− can hurt staff morale'].forEach((x,i)=>lab(labE2,420,240+i*18,x,'var(--err)'));
  const phT=t_(labPh,300,250-30,'',{'text-anchor':'middle','font-size':13,'font-weight':700});
  const fitT=t_(s,300,442,'',{'text-anchor':'middle','font-size':12,class:'mono'});
  // process overlay
  const proc=el('g',{},s);el('rect',{x:150,y:24,width:300,height:205,rx:10,fill:'var(--card)',stroke:'var(--line)'},proc);
  ['Requisition received from a department','Locate and develop sources','Identify prospective employees','Techniques to attract them','Evaluate the recruitment'].forEach((x,i)=>{el('circle',{cx:176,cy:58+i*38,r:11,fill:'var(--org)'},proc);t_(proc,176,62+i*38,String(i+1),{'text-anchor':'middle',fill:'var(--card)','font-size':11,'font-weight':700});t_(proc,196,62+i*38,x,{'font-size':12});});
  // moving particles
  const parts=[];for(let i=0;i<40;i++){parts.push({c:el('circle',{r:4},s),p:Math.random(),pipe:i%4});}
  const pathsEls=[pipeI,...pipesE];let flow=[0,0,0,0],grey=0,T=0;
  let state={};
  const loop=()=>{if(!stage.isConnected)return;requestAnimationFrame(loop);T+=1;
    parts.forEach(q=>{const f=flow[q.pipe];if(f<=0.01){q.c.style.display='none';return;}q.c.style.display='';q.p+=0.006*(.5+f);if(q.p>1)q.p-=1;
      const pe=pathsEls[q.pipe],L=pe.getTotalLength(),pt=pe.getPointAtLength(q.p*L);H.set(q.c,{cx:pt.x,cy:pt.y});
      q.c.style.fill=q.pipe===0?'var(--org)':(grey>.5&&(q.p*97|0)%3?'var(--muted)':'var(--emp)');});};
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)requestAnimationFrame(loop);
  return {update(t){
    const k=Math.floor(t);
    H.op(proc,H.es(t,.9,1.1)*(1-H.es(t,1.9,2.05)));
    const iOn=H.es(t,2,2.3), iDry=H.es(t,3,3.4), eOn=H.es(t,4,4.3);
    const trad=H.es(t,6,6.4), real=H.es(t,7,7.4);
    flow=[iOn*(1-.75*iDry), eOn*(1+trad*2-real*2), eOn*(1+trad*2-real*2), eOn*(1+trad*2.5-real*2.5)];grey=trad*(1-real);
    H.set(pipeI,{opacity:.2+.5*iOn*(1-.6*iDry)});pipesE.forEach(p=>H.set(p,{opacity:.2+.5*eOn}));
    H.op(labI,iOn*(1-iDry));H.op(labI2,iDry*(1-H.es(t,4,4.2)));H.op(labE,eOn*(1-H.es(t,5,5.3)));H.op(labE2,H.es(t,5,5.3)*(1-H.es(t,6,6.2)));
    // pool composition
    let nG=Math.round(22*iOn), nA=Math.round(30*eOn), nX=Math.round(80*trad*(1-real));
    if(real>0){nG=Math.round(H.lerp(nG,18,real));nA=Math.round(H.lerp(nA,26,real));}
    pool.forEach((c,i)=>{let col=null;if(i<nG)col='var(--org)';else if(i<nG+nA)col='var(--emp)';else if(i<nG+nA+nX)col='var(--muted)';
      if(col){c.style.display='';c.style.fill=col;c.style.opacity=1;}else c.style.display='none';});
    const tot=nG+nA+nX;fitT.textContent=tot?`${tot} applicants · good fit ${Math.round(100*(nG+nA)/tot)}%`:'';
    phT.textContent=t>=7?'Realistic philosophy':t>=6?'Traditional philosophy':'';
  }};
}
Course.add({id:'1.3',module:1,title:'Manpower Recruitment Process',vizLabel:'Pipes filling an applicant pool',
  hook:{who:'Aisha, recruitment lead',text:'Aisha needs ten new sales officers. Should she promote from inside, go to the universities, or advertise and let anyone apply? Each choice fills the applicant pool differently.'},
  objectives:['Define recruitment and explain why it is a positive process','Describe the stages of the recruitment process','Compare internal and external sources, with merits and demerits','Distinguish methods of recruitment and the two philosophies of recruitment'],
  steps:[
    {h:'Recruitment builds the pool',t:'<p>Recruitment is the process of searching for prospective employees and stimulating and encouraging them to apply. Flippo calls it <b>positive</b>, because it draws people in. Selection, next unit, is negative.</p>'},
    {h:'The recruitment process',t:'<p>It begins when personnel receives a <b>requisition</b> from a department, stating the post, number, duties, qualifications and when they are needed. Then the department locates sources, identifies prospects, attracts them, and evaluates the result.</p><p>Famularo adds the elements of policy, organisation, a manpower forecast, sources, techniques and assessment.</p>'},
    {h:'Internal sources open',t:'<p>Promoting or transferring existing staff. Green particles flow from inside the organisation.</p><p>Merits: security, morale and loyalty; the employer already knows their record; low training cost; good union relations; less turnover; it develops future managers.</p>'},
    {h:'…but internal sources have limits',t:'<p>The flow slows. Internal sources may <b>dry up</b>; they cause <b>inbreeding</b> and keep out new blood; seniority may block capable hands; and little innovation comes in.</p>'},
    {h:'External sources open',t:'<p>Employment agencies, educational and technical institutes, casual “applicants at the gate”, public and private employment agencies.</p><p>Merits: new ideas and better techniques, a wider choice of talent, a richer human resource mix.</p>'},
    {h:'External costs',t:'<p>Outsiders need orientation and training; external hiring is more expensive and slower; the newcomer may fail to adjust; and filling senior jobs from outside can hurt the morale and loyalty of existing staff.</p><p>Methods differ from sources: <b>direct</b> (campus recruiting), <b>indirect</b> (advertisements), and <b>third-party</b> (agencies, trade unions).</p>'},
    {h:'Traditional philosophy',t:'<p>Get as many people as possible to apply. The pool floods, much of it grey: poor fits. Final selection becomes harder and wrong hires lead to dissatisfaction and turnover.</p>'},
    {h:'Realistic philosophy',t:'<p>Match the organisation’s needs with the applicants’ needs. The pool is smaller but the share of good fits rises. People recruited this way stay longer and perform better.</p>'}
  ],
  scene:recruitScene,
  sandboxIntro:'Mix internal and external sources for ten vacancies and compare the trade-offs.',
  sandbox(ctl,st){
    const s=H.svg(st,520,340);let mix=50,phil='realistic';const ro=H.readout(ctl);
    H.slider(ctl,{id:'s13m',label:'Share filled from inside',min:0,max:100,step:10,value:50,fmt:v=>v+'%'},v=>{mix=v;draw();});
    H.segBtns(ctl,'Recruitment philosophy',[['traditional','Traditional'],['realistic','Realistic']],'realistic',v=>{phil=v;draw();});
    const axes=['Morale and loyalty','New ideas','Low cost','Speed','Fit and retention'];
    function draw(){s.innerHTML='';const i=mix/100;const vals=[.3+.6*i,.9-.7*i,.3+.6*i,.35+.55*i,phil==='realistic'?.85:.4];
      const cx=260,cy=175,R=125;for(let r=1;r<=4;r++)el('polygon',{points:axes.map((_,k)=>{const a=-Math.PI/2+k*2*Math.PI/5;return [cx+Math.cos(a)*R*r/4,cy+Math.sin(a)*R*r/4].join(',');}).join(' '),fill:'none',stroke:'var(--line)'},s);
      axes.forEach((n,k)=>{const a=-Math.PI/2+k*2*Math.PI/5;el('line',{x1:cx,y1:cy,x2:cx+Math.cos(a)*R,y2:cy+Math.sin(a)*R,stroke:'var(--line)'},s);t_(s,cx+Math.cos(a)*(R+18),cy+Math.sin(a)*(R+18)+4,n,{'text-anchor':Math.abs(Math.cos(a))<.2?'middle':Math.cos(a)>0?'start':'end','font-size':12});});
      el('polygon',{points:vals.map((v,k)=>{const a=-Math.PI/2+k*2*Math.PI/5;return [cx+Math.cos(a)*R*v,cy+Math.sin(a)*R*v].join(',');}).join(' '),fill:'var(--org-soft)',stroke:'var(--org)','stroke-width':2.5,'fill-opacity':.7},s);
      ro.innerHTML=`<b>${Math.round(mix/10)}</b> posts from inside, <b>${10-Math.round(mix/10)}</b> from outside.<br>${mix>70?'Strong morale and low cost, but a risk of inbreeding and few new ideas.':mix<30?'Plenty of new ideas, but costly, slower, and existing staff may feel passed over.':'A balanced mix: the course suggests reconciling both sources.'} ${phil==='traditional'?'A traditional, flood-the-pool approach lowers fit and retention.':'A realistic approach improves fit and retention.'}`;}
    draw();H.tag(st,'Illustrative scoring');
  },
  sae:{q:'Define recruitment and identify the various factors which affect recruitment.',a:['Recruitment: searching for prospective employees and stimulating them to apply (a positive process).','<b>Internal factors:</b> wage and salary policies; age composition of the workforce; promotion and retirement policies; turnover; nature, level and seasonality of operations; expansion or reduction plans; recruiting policy; HRP strategy; size; cost of recruiting.','<b>External factors:</b> supply and demand of skills in the labour market; company image; cultural factors; economic factors (tight or loose labour market); political and legal factors.']},
  tma:{q:'Discuss the steps of the recruitment process. How will you reconcile the internal and external sources of recruitment?',outline:['Five stages: requisition → locate and develop sources → identify prospects → techniques to attract → evaluate (cost per applicant, hiring ratio, tenure, performance)','Internal sources: list merits and demerits','External sources: list merits and demerits','Reconcile: fill most posts from inside for morale and loyalty, but keep the ladder permeable by bringing in outsiders with fresh skills, especially where internal supply has dried up','Choose methods (direct, indirect, third-party) by which consistently attracts good candidates']},
  quiz:[
    {q:'Why is recruitment called a positive process?',o:['It always succeeds','It encourages people to apply and builds the pool','It rejects weak candidates','It is cheap'],a:1,w:'Recruitment draws people in; selection is the negative process that rejects.'},
    {q:'Which is a demerit of internal sources?',o:['New ideas','Inbreeding and no new blood','Wider talent pool','High orientation cost'],a:1,w:'Filling posts only from within keeps out fresh viewpoints.'},
    {q:'An advertisement in a newspaper is an example of which recruitment method?',o:['Direct','Indirect','Third-party','Internal'],a:1,w:'Advertising is the most common indirect method. Campus visits are direct; agencies are third-party.'},
    {q:'The realistic philosophy of recruitment…',o:['Gets as many applicants as possible','Matches organisation needs with applicant needs','Recruits only from inside','Avoids interviews'],a:1,w:'Matching both sides’ needs means recruits stay longer and perform better.'}
  ],
  card:[{h:'Recruitment process',ordered:true,items:['Requisition from a department','Locate and develop sources','Identify prospective employees','Develop techniques to attract them','Evaluate the recruitment']},
    {h:'Internal sources: merits',items:['Security, morale, loyalty','Employer knows their record','Low time and training cost','Good union relations, less turnover','Develops future managers']},
    {h:'External sources: merits',items:['New ideas and techniques','Wider choice of skill and talent','Better human resource mix']},
    {h:'Methods and philosophies',items:['Direct: campus recruiting, fairs','Indirect: advertisements, notice board','Third-party: employment agencies, unions','Traditional vs realistic philosophy']}]
});

/* ================= 1.4 ================= */
const HURDLES=['Application pool','Preliminary screening and interview','Application blank','Selection tests','Interview','Background investigation','Physical examination','Approval by appropriate authority','Final employment decision','Evaluation'];
const SURV=[120,70,55,34,18,14,12,11,4,4];
function funnelScene(stage){
  H.cap(stage,'Successive hurdles technique');
  const ov=H.h('div',{style:'position:absolute;left:12px;right:12px;top:30px;pointer-events:none;font-family:var(--f-display);'});
  const ovT=H.h('div',{style:'font-size:1.15rem;font-weight:800'}),ovN=H.h('div',{class:'mono',style:'font-size:.85rem;color:var(--muted)'});ov.append(ovT,ovN);stage.append(ov);
  // 2D overlay for dilemma + placement
  const ovs=H.h('div',{style:'position:absolute;inset:0;pointer-events:none'});stage.append(ovs);const s=H.svg(ovs,600,440);
  const dil=el('g',{},s);el('rect',{x:40,y:110,width:520,height:250,rx:12,fill:'var(--card)',stroke:'var(--line)'},dil);
  const beam=el('g',{},dil);el('line',{x1:-180,y1:0,x2:180,y2:0,stroke:'var(--ink)','stroke-width':5,'stroke-linecap':'round'},beam);
  el('rect',{x:-200,y:-46,width:120,height:44,rx:6,fill:'var(--data-soft)'},beam);t_(beam,-140,-28,'Gather data',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--data)'});t_(beam,-140,-12,'to predict success',{'text-anchor':'middle','font-size':11,fill:'var(--data)'});
  el('rect',{x:80,y:-46,width:120,height:44,rx:6,fill:'var(--emp-soft)'},beam);t_(beam,140,-28,'Inform and sell',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--emp)'});t_(beam,140,-12,'the job to them',{'text-anchor':'middle','font-size':11,fill:'var(--emp)'});
  el('path',{d:'M300 262 L284 300 L316 300Z',fill:'var(--muted)'},dil);const dilT=t_(dil,300,336,'',{'text-anchor':'middle','font-size':12.5});
  const plc=el('g',{},s);el('rect',{x:40,y:110,width:520,height:250,rx:12,fill:'var(--card)',stroke:'var(--line)'},plc);
  ['Placement','Orientation','Socialisation'].forEach((n,i)=>{const gx=70+i*170;el('rect',{x:gx,y:150,width:140,height:150,rx:10,fill:i===0?'var(--org-soft)':i===1?'var(--data-soft)':'var(--emp-soft)'},plc);t_(plc,gx+70,176,n,{'text-anchor':'middle','font-weight':700,'font-size':13});});
  t_(plc,140,330,'put in the right job',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});t_(plc,310,330,'basic background on the firm',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});t_(plc,480,330,'absorbed into the group',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});
  const newbie=H.person(plc,0,0,'var(--emp)',1.6);const peers=[0,1,2,3].map(i=>H.person(plc,452+i*18,260+(i%2)*14,'var(--org)',1.3));
  const yOf=k=>4.6-k*1.0, rOf=k=>3.6-k*0.31;
  const rnd=H.seeded(5);const balls=[];for(let i=0;i<120;i++){let d=0;while(d<9&&i<SURV[d+1])d++;balls.push({d,a:rnd()*Math.PI*2,u:Math.sqrt(rnd()),j:rnd(),pos:[0,0,0],c:'emp',al:1});}
  let T=0,K=0;
  const o=H.c3(stage,{yaw:.5,pitch:.42,dist:17,f:1.05,spin:.0025,render(ctx,o){
    // floor
    ctx.fillStyle=o.col.sunk;ctx.beginPath();for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,p=o.proj([Math.cos(a)*6.5,yOf(9)-1.45,Math.sin(a)*6.5]);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}ctx.fill();
    // funnel walls (silhouette lines)
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2;H.c3line(ctx,o,[Math.cos(a)*rOf(0),yOf(0),Math.sin(a)*rOf(0)],[Math.cos(a)*rOf(9),yOf(9),Math.sin(a)*rOf(9)],o.col.line,1);}
    const items=[];
    for(let k=0;k<10;k++)items.push({z:o.proj([0,yOf(k),0])[2],draw:()=>{const on=k===K&&T>=1&&T<11;H.c3ring(ctx,o,yOf(k),rOf(k),on?o.col.org:o.col.line,on?4:2);}});
    balls.forEach(b=>{const p=o.proj(b.pos);items.push({z:p[2]-.01,draw:()=>{ctx.globalAlpha=b.al;ctx.fillStyle=o.col[b.c];ctx.beginPath();ctx.arc(p[0],p[1],Math.max(1.5,.14*p[3]),0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;}});});
    items.sort((a,b)=>b.z-a.z).forEach(i=>i.draw());
    if(T>=1&&T<11){const p=o.proj([rOf(K)+.3,yOf(K),0]);ctx.fillStyle=o.col.org;ctx.font='700 12px "Atkinson Hyperlegible",sans-serif';ctx.textAlign='left';ctx.fillText('◀ hurdle '+(K+1),p[0]+6,p[1]+4);}
  }});
  return {update(t){
    T=t;const lev=H.clamp(t-2,0,9.4);K=H.clamp(Math.floor(t)-1,0,9);
    ovT.textContent=t<1?'Selection: a series of hurdles':t>=11?'':`Hurdle ${K+1}: ${HURDLES[K]}`;ovN.textContent=t<1?'120 applicants from recruitment':t>=11?'':`${SURV[K]} of 120 candidates remain`;
    balls.forEach(b=>{let y,rad;b.c='emp';b.al=1;
      if(lev<=b.d||b.d>=9){const L=Math.min(lev,9);const f=Math.floor(L),fr=L-f;y=H.lerp(yOf(f),yOf(Math.min(9,f+1)),fr)+.15+b.j*.3;rad=H.lerp(rOf(f),rOf(Math.min(9,f+1)),fr)*.8*b.u;if(b.d>=9&&t>=10)b.c='org';}
      else{const e=H.clamp(lev-b.d);rad=H.lerp(rOf(b.d)*.8*b.u,rOf(b.d)+1.4+b.j*1.2,H.ease(Math.min(1,e*2)));y=H.lerp(yOf(b.d)+.2,yOf(9)-1.3,H.ease(e));b.c='err';b.al=.6;}
      b.pos=[Math.cos(b.a)*rad,y,Math.sin(b.a)*rad];});
    o.dirty=true;
    const dv=H.es(t,11,11.3)*(1-H.es(t,11.9,12.1));H.op(dil,dv);const tilt=Math.sin(H.seg(t,11,12)*Math.PI*2)*10;beam.setAttribute('transform',`translate(300,258) rotate(${tilt})`);
    dilT.textContent=tilt<-3?'Too many tests and forms: good candidates lose interest':tilt>3?'Too much public relations: too little data to decide':'The balance the manager must strike';
    const pv=H.es(t,12,12.3);H.op(plc,pv);const pp=H.seg(t,12.2,12.95);const px=pp<.5?H.lerp(140,310,pp*2):H.lerp(310,440,(pp-.5)*2);newbie.setAttribute('transform',`translate(${px},${pp<.5?250:H.lerp(250,265,(pp-.5)*2)}) scale(1.6)`);
    ov.style.opacity=t>=11?0:1;
  }};
}
Course.add({id:'1.4',module:1,title:'Manpower Selection Process',vizLabel:'A 3D funnel of ten hurdles',
  hook:{who:'Emeka, HR manager',text:'Emeka’s advert for a branch accountant drew 120 applications. He has one week and one post. Which candidates should he drop first, and how does he keep the best ones interested while he tests them?'},
  objectives:['Define selection and explain why it is a negative process','Distinguish recruitment from selection','Describe the ten steps of the successive hurdles technique','Explain the selection dilemma and the place of placement, orientation and socialisation'],
  steps:[
    {h:'Selection is a series of hurdles',t:'<p>Selection chooses, from the pool, the applicant most likely to perform well. Each step must be cleared before the next: the <b>successive hurdles technique</b>.</p><p>Recruitment is positive and widens the pool; selection is <b>negative</b>, rejecting many to keep the best. It needs more specialised skills.</p>'},
    ...HURDLES.map((h,i)=>({h:`${i+1}. ${h}`,t:[
      '<p>The pool built by recruitment is the base for selection. The more worthwhile applications, the more choice there is.</p>',
      '<p>Testing everyone is not economical, so a preliminary interview and screening of application details drops plainly unsuitable candidates early.</p>',
      '<p>The application blank is a standard form collecting biographical data, education, work experience, salary and references. It allows fair comparison.</p>',
      '<p>Tests reveal what an interview cannot: ability, aptitude, interests and personality. Personality can affect job performance.</p>',
      '<p>The interview gets information from the person and gives them information about the job. It is the most widely used step.</p>',
      '<p>References and past employers are checked to confirm what the candidate has claimed.</p>',
      '<p>After the selection decision and before the job offer, a medical examination confirms the candidate is fit for the job.</p>',
      '<p>Suitable candidates are recommended to the appropriate authority for approval.</p>',
      '<p>The final candidates are offered appointment and a contract of employment.</p>',
      '<p>The whole process is evaluated: did it produce the right people at a reasonable cost?</p>'][i]+(i===0?'':`<p class="mono" style="color:var(--muted)">${SURV[i-1]} → ${SURV[i]} candidates</p>`)})),
    {h:'The selection dilemma',t:'<p>Selection has two objectives: <b>predict</b> which applicants will succeed, and <b>inform and sell</b> the job and the organisation to them.</p><p>Hours of forms and tests rarely endear the firm to the candidate. Too much public relations, and the data needed to decide is lost. The manager must balance both.</p>'},
    {h:'Placement, orientation, socialisation',t:'<p>The hired candidate is <b>placed</b> in the job, given <b>orientation</b> (basic background information about the organisation), and <b>socialised</b> into the work group and its norms.</p>'}
  ],
  scene:funnelScene,
  sandboxIntro:'Selection for a senior manager is long and rigorous; for junior staff it is short. Compare the two funnels.',
  sandbox(ctl,st){
    const s=H.svg(st,520,360);let lvl='senior',n=120,pass=60;const ro=H.readout(ctl);
    H.segBtns(ctl,'Post being filled',[['senior','Senior manager'],['junior','Junior staff']],'senior',v=>{lvl=v;draw();});
    H.slider(ctl,{id:'s14n',label:'Applicants',min:20,max:300,step:10,value:120},v=>{n=v;draw();});
    H.slider(ctl,{id:'s14p',label:'Pass rate at each hurdle',min:30,max:95,step:5,value:60,fmt:v=>v+'%'},v=>{pass=v;draw();});
    function draw(){s.innerHTML='';const steps=lvl==='senior'?HURDLES:['Application pool','Preliminary screening and interview','Application blank','Interview','Final employment decision'];
      let c=n;const rows=[];steps.forEach((h,i)=>{if(i>0&&i<steps.length-0)c=Math.max(1,Math.round(c*pass/100));rows.push([h,i===0?n:c]);});
      const bh=Math.min(30,320/steps.length);rows.forEach(([h,v],i)=>{const w=Math.max(6,440*v/n);el('rect',{x:260-w/2,y:14+i*(bh+3),width:w,height:bh,rx:4,fill:i===rows.length-1?'var(--org)':'var(--emp-soft)'},s);
        t_(s,260,14+i*(bh+3)+bh/2+4,`${h} · ${v}`,{'text-anchor':'middle','font-size':Math.min(12,bh*.45),'font-weight':700,fill:i===rows.length-1?'var(--card)':'var(--ink)'});});
      ro.innerHTML=`<b>${steps.length}</b> hurdles · <b>${rows[rows.length-1][1]}</b> candidate${rows[rows.length-1][1]===1?'':'s'} left from ${n}.<br>${lvl==='senior'?'A long, rigorous process for a senior post.':'A short, simple process for lower-level staff.'}`;}
    draw();H.tag(st,'Illustrative numbers');
  },
  sae:{q:'What is an application blank, and what purpose does it serve?',a:['A standard form the applicant fills in, giving information in a uniform way.','Purpose: screen candidates, compare them fairly, and supply questions for the interview.','Contents: biographical data (name, date and place of birth, age, sex, nationality); educational attainment; work experience; salary and benefits; other items such as references and extra-curricular activities.']},
  tma:{q:'What do you understand by selection? Discuss the various steps involved in it.',outline:['Define selection; contrast with recruitment (objective, process, techniques, outcomes — Flippo)','Successive hurdles technique: each step must be cleared','Explain the ten steps, from application pool to evaluation','Note the steps vary with the number of candidates, the source and the level of the job','Close with the selection dilemma and placement → orientation → socialisation']},
  quiz:[
    {q:'Why is selection called a negative process?',o:['It is unpleasant','It rejects many applicants to keep the best','It lowers pay','It is done by unions'],a:1,w:'Flippo: selection rejects a good number of those who apply, leaving only the best.'},
    {q:'In the successive hurdles technique…',o:['All candidates take every step','Each step must be cleared before the next','The interview always comes first','Only references matter'],a:1,w:'Unqualified candidates can be eliminated at any hurdle.'},
    {q:'When is the physical examination done?',o:['Before the application blank','After the selection decision and before the job offer','During orientation','Never'],a:1,w:'The course places it after the selection decision and before the offer is made.'},
    {q:'Which describes the selection dilemma?',o:['Choosing between two equal candidates','Balancing data-gathering with attracting the candidate','Deciding the salary','Picking internal vs external sources'],a:1,w:'Testing gathers data but can put good candidates off; selling the job can cost the data needed to decide.'}
  ],
  card:[{h:'Ten steps in selection',ordered:true,items:HURDLES},
    {h:'Recruitment vs selection',items:['Objective: attract many vs choose the best','Process: positive vs negative','Techniques: simple vs specialised','Outcome: an application pool vs a final candidate']},
    {h:'After the decision',items:['Placement','Orientation','Socialisation']}]
});

/* ================= 1.5 ================= */
function trainScene(stage){
  H.cap(stage,'Funmi’s skill over her first year');H.tag(stage);
  const s=H.svg(stage,600,440);const g=el('g',{},s);
  const ax=H.axes(g,{x:60,y:110,w:500,h:270,xmin:0,xmax:12,ymin:0,ymax:100,xt:[0,2,4,6,8,10,12].map(v=>[v,v===0?'start':v+' mo']),yt:[[25,25],[50,50],[75,75],[100,100]],yl:'Skill level (%)'});
  const sk=m=>m<2?8+6*m:m<4?20+5*(m-2):m<6?30+12*(m-4):m<9?54+10*(m-6):Math.min(96,84+4*(m-9));
  const offj=m=>m<3?8+20*m:m<4?68-8*(m-3):m<12?60+4.4*(m-4):95;
  const adhoc=m=>8+5*m+6*Math.sin(m*2.1)-(m>6?4:0);
  const segs=[[0,2,'Observe'],[2,4,'Discuss'],[4,6,'Perform'],[6,9,'Feedback'],[9,12,'More work']];
  const segEls=segs.map(([a,b,n],i)=>{const pts=[];for(let k=0;k<=20;k++){const m=a+(b-a)*k/20;pts.push([ax.sx(m),ax.sy(sk(m))]);}
    const p=el('path',{d:H.path(pts),fill:'none',stroke:'var(--emp)','stroke-width':4,'stroke-linecap':'round'},g);const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;
    const lab=t_(g,ax.sx((a+b)/2),ax.sy(sk((a+b)/2))-14,n,{'text-anchor':'middle','font-size':11.5,'font-weight':700,fill:'var(--emp)'});return {p,L,lab};});
  const fb=[6.5,7.3,8.1,8.8].map(m=>el('circle',{cx:ax.sx(m),cy:ax.sy(sk(m)),r:6,fill:'var(--data)'},g));
  const fbL=t_(g,ax.sx(7.6),ax.sy(sk(7.6))+26,'feedback points',{'font-size':11,fill:'var(--data)','text-anchor':'middle'});
  const mk=f=>{const pts=[];for(let k=0;k<=60;k++){const m=12*k/60;pts.push([ax.sx(m),ax.sy(f(m))]);}return H.path(pts);};
  const off=el('path',{d:mk(offj),fill:'none',stroke:'var(--org)','stroke-width':3,'stroke-dasharray':'7 5'},g);const offL=t_(g,ax.sx(3),ax.sy(offj(3))-12,'off-the-job course, then back at work',{'font-size':11,fill:'var(--org)'});
  const ad=el('path',{d:mk(adhoc),fill:'none',stroke:'var(--err)','stroke-width':3},g);const adL=t_(g,ax.sx(12)-4,ax.sy(adhoc(12))+18,'ad hoc training',{'font-size':11,fill:'var(--err)','text-anchor':'end'});
  // grounds chips
  const gr=el('g',{},s);['New joiners','Refresh existing staff','Technology changes','Promotion and growth'].forEach((x,i)=>{const gx=14+i*146;el('rect',{x:gx,y:30,width:138,height:44,rx:8,fill:'var(--org-soft)'},gr);t_(gr,gx+69,57,x,{'text-anchor':'middle','font-size':11.5,'font-weight':700,fill:'var(--org)'});});
  t_(gr,300,94,'Four grounds for training',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});
  // benefit bars
  const ben=el('g',{},s);const bn=['Morale','Productivity','Promotion chances','Supervision needed','Accidents'];const bars=bn.map((n,i)=>{const y=26+i*16;t_(ben,180,y+9,n,{'text-anchor':'end','font-size':10.5});el('rect',{x:186,y,width:200,height:10,rx:3,fill:'var(--sunk)'},ben);return el('rect',{x:186,y,width:0,height:10,rx:3,fill:i<3?'var(--org)':'var(--err)'},ben);});
  return {update(t){
    H.op(gr,H.es(t,.9,1.1)*(1-H.es(t,1.9,2.05)));
    segEls.forEach((e,i)=>{const p=H.es(t,2+i,2.9+i);e.p.style.strokeDashoffset=e.L*(1-p);H.op(e.lab,p);});
    fb.forEach((c,i)=>H.op(c,H.es(t,5.2+i*.15,5.4+i*.15)));H.op(fbL,H.es(t,5.5,5.8));
    H.op(ben,H.es(t,7,7.3));const lvl=H.es(t,7,7.9);bars.forEach((b,i)=>H.set(b,{width:i<3?200*(.25+.7*lvl):200*(.85-.65*lvl)}));
    H.op(off,H.es(t,8,8.4));H.op(offL,H.es(t,8,8.4));H.op(ad,H.es(t,9,9.4));H.op(adL,H.es(t,9,9.4));
  }};
}
Course.add({id:'1.5',module:1,title:'Employees’ Training and Development',vizLabel:'A skill curve built step by step',
  hook:{who:'Funmi, new customer-service officer',text:'Funmi joins a bank branch in Ibadan. She can learn by sitting beside an experienced officer, or on a two-week course at the training school. Either way, her skill must rise fast enough to serve customers well.'},
  objectives:['Explain the concept of training and why it never ends','State the four grounds on which training is given','Explain the importance of training','Describe on-the-job and off-the-job training and the advantages of on-the-job training'],
  steps:[
    {h:'What training is',t:'<p>Training is a process of learning a sequence of programmed behaviour: applying knowledge so people perform their jobs better. It is <b>continuous and never-ending</b>.</p>'},
    {h:'Four grounds for training',t:'<p>Training is given to <b>new candidates</b> who join; to <b>existing employees</b> to refresh and enhance knowledge; when <b>technology</b> or methods change; and when <b>promotion and career growth</b> become important.</p>'},
    {h:'On-the-job, step 1: observe',t:'<p>The trainee observes a more experienced, knowledgeable and skilled trainer. Skill rises slowly at first.</p>'},
    {h:'Step 2: discuss the methods',t:'<p>The method, process and techniques are discussed before, during and after the trainer demonstrates.</p>'},
    {h:'Step 3: the trainee performs',t:'<p>When prepared, the trainee starts performing at the workplace. The curve gets steeper: learning by doing.</p>'},
    {h:'Step 4: direction and feedback',t:'<p>The trainer gives continuing direction and feedback (blue dots). Each round of feedback corrects errors and lifts the slope.</p>'},
    {h:'Step 5: more and more work',t:'<p>The trainee is given more work until the job is done flawlessly. The curve levels off near mastery.</p>'},
    {h:'Why training matters',t:'<p>As skill rises: better <b>morale</b>, higher <b>productivity</b> and better <b>chances of promotion</b>; <b>less supervision</b> and <b>fewer accidents</b>.</p>'},
    {h:'Off-the-job training',t:'<p>Off-the-job training takes people away from work pressure to learn, then they must apply it on return. On-the-job training is generally the most cost-effective: trainees are productive, learn while doing, with real colleagues, at the right time, with practice and feedback.</p>'},
    {h:'When training is informal',t:'<p>The red curve is ad hoc training: no formal procedure or content, no objectives, trainers without training qualifications, no planning, trainers chosen only for technical expertise. Learning is slower and uneven.</p>'}
  ],
  scene:trainScene,
  sandboxIntro:'Change how Funmi is trained and watch the curve.',
  sandbox(ctl,st){
    const s=H.svg(st,520,340);let mode='structured',fb=4;const ro=H.readout(ctl);
    H.segBtns(ctl,'Training design',[['structured','Structured on-the-job'],['adhoc','Ad hoc']],'structured',v=>{mode=v;draw();});
    H.slider(ctl,{id:'s15f',label:'Feedback sessions per month',min:0,max:8,value:4},v=>{fb=v;draw();});
    function draw(){s.innerHTML='';const g=el('g',{},s);const ax=H.axes(g,{x:50,y:20,w:450,h:270,xmin:0,xmax:12,ymin:0,ymax:100,xt:[0,3,6,9,12].map(v=>[v,v+' mo']),yt:[25,50,75,100],yl:'Skill (%)'});
      const cap=mode==='structured'?96:72,k=.12+.05*fb;const f=m=>{let v=cap*(1-Math.exp(-k*m));if(mode==='adhoc')v+=5*Math.sin(m*2.3);return Math.max(0,Math.min(100,v));};
      const pts=[];for(let i=0;i<=60;i++){const m=12*i/60;pts.push([ax.sx(m),ax.sy(f(m))]);}el('path',{d:H.path(pts),fill:'none',stroke:mode==='structured'?'var(--emp)':'var(--err)','stroke-width':3.5},g);
      const reach=pts.findIndex(p=>p[1]<=ax.sy(80));ro.innerHTML=`Skill after 3 months: <b>${Math.round(f(3))}%</b> · after 12 months: <b>${Math.round(f(12))}%</b><br>${reach>0?'Reaches 80% at about <b>'+(12*reach/60).toFixed(1)+' months</b>.':'Never reaches 80% in the first year.'}`;}
    draw();H.tag(st,'Illustrative model');
  },
  sae:{q:'Explain the term training and the need for training in organisations.',a:['Training: learning a sequence of programmed behaviour; applying knowledge to improve job performance. Continuous and never-ending.','Need: induct new joiners; refresh existing staff; cope with new technology and methods; prepare staff for promotion and career growth.','Importance: morale, less supervision, fewer accidents, promotion chances, productivity.']},
  tma:{q:'Explain the various on-the-job and off-the-job training methods in detail.',outline:['Define training; state the four grounds','On-the-job: the five steps (observe, discuss, perform, direction and feedback, more work); list its eight advantages','Off-the-job: learning away from the workplace and its pressures, then applying it at work','Weaknesses of informal training: ad hoc, no objectives, untrained trainers, unplanned','Conclude: choose by cost, job type and the need for practice and feedback']},
  quiz:[
    {q:'Which is NOT one of the four grounds for training given in the course?',o:['New joiners','Technology changes','Promotion and career growth','Reducing the pension bill'],a:3,w:'The four grounds are new candidates, refreshing existing staff, technology updates, and promotion and growth.'},
    {q:'In on-the-job training, what comes right after the trainee starts performing at the workplace?',o:['Observation','The trainer’s continuing direction and feedback','A written exam','Transfer to another unit'],a:1,w:'Step 4 is continuing direction of work and feedback from the trainer.'},
    {q:'Which is an advantage of on-the-job training?',o:['Trainee is away from work pressure','Generally most cost-effective','Needs no trainer','No feedback needed'],a:1,w:'The course lists cost-effectiveness first among the advantages of on-the-job training.'}
  ],
  card:[{h:'Four grounds for training',items:['New candidates','Refresh existing employees','Technology or method changes','Promotion and career growth']},
    {h:'On-the-job training steps',ordered:true,items:['Observe an experienced trainer','Discuss methods before, during, after','Trainee performs at the workplace','Trainer gives direction and feedback','More work until done flawlessly']},
    {h:'Importance of training',items:['Improves morale','Less supervision','Fewer accidents','Chances of promotion','Increased productivity']}]
});
})();
