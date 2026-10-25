/* Module 3 — Motivation, leadership, pay, discipline, grievances */
(function(){
const {H}=Course, el=H.el, t_=H.t;
const tab=s=>el('g',{},s);
const box=(g,x,y,w,h,fill='var(--card)',stroke='var(--line)',rx=8)=>el('rect',{x,y,width:w,height:h,rx,fill,stroke},g);
const wrap=(g,x,y,str,max=28,a={})=>{const words=str.split(' ');let line='',ly=y;const lh=a.lh||15;words.forEach(w=>{if((line+' '+w).trim().length>max){t_(g,x,ly,line.trim(),a);line=w;ly+=lh;}else line+=' '+w;});if(line.trim())t_(g,x,ly,line.trim(),a);return ly;};
const showTabs=(tabs,t)=>tabs.forEach(([g,a,b,last])=>H.op(g,H.es(t,a-.12,a+.1)*(last?1:(1-H.es(t,b-.1,b+.05)))));
const naira=v=>'₦'+Math.round(v).toLocaleString('en-NG');

/* ================= 3.1 ================= */
function motivScene(stage){
  H.cap(stage,'What moves people to work');
  const s=H.svg(stage,600,440);const tabs=[];
  // A meaning
  const A=tab(s);tabs.push([A,0,1]);H.person(A,300,250,'var(--emp)',3.4);
  el('path',{d:'M90 120 Q 200 120 280 200',fill:'none',stroke:'var(--emp)','stroke-width':4,'marker-end':''},A);el('path',{d:'M510 120 Q 400 120 320 200',fill:'none',stroke:'var(--org)','stroke-width':4},A);
  box(A,20,90,150,40,'var(--emp-soft)','none',20);t_(A,95,115,'Personal goals',{'text-anchor':'middle','font-weight':700,fill:'var(--emp)'});box(A,430,90,150,40,'var(--org-soft)','none',20);t_(A,505,115,'Organisation goals',{'text-anchor':'middle','font-weight':700,fill:'var(--org)'});
  t_(A,300,330,'Motivation: optimum effort that serves both',{'text-anchor':'middle','font-size':14,'font-weight':700});
  // B doors
  const B=tab(s);tabs.push([B,1,3]);const doors=['Paternalistic','Scientific management','Human relations','Participative'];
  const dEls=doors.map((d,i)=>{const g=el('g',{},B);const x=30+i*140;const r=box(g,x,70,120,190,'var(--card)','var(--line)',10);el('circle',{cx:x+100,cy:170,r:5,fill:'var(--muted)'},g);wrap(g,x+60,290,d,14,{'text-anchor':'middle','font-size':13,'font-weight':700});return {g,r};});
  const bNote=el('g',{},B);const bN1=t_(bNote,300,350,'',{'text-anchor':'middle','font-size':13.5,'font-weight':700});const bN2=t_(bNote,300,372,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});const bN3=t_(bNote,300,392,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  // C Herzberg
  const Cg=tab(s);tabs.push([Cg,3,5]);t_(Cg,300,44,'Herzberg: two separate scales',{'text-anchor':'middle','font-size':16,'font-weight':700});
  t_(Cg,40,92,'Motivators (job content)',{'font-size':13,'font-weight':700,fill:'var(--org)'});box(Cg,40,102,520,34,'var(--sunk)','none',17);const mBar=el('rect',{x:40,y:102,height:34,rx:17,fill:'var(--org)'},Cg);t_(Cg,40,154,'No satisfaction',{'font-size':11,fill:'var(--muted)'});t_(Cg,560,154,'Satisfaction',{'font-size':11,fill:'var(--muted)','text-anchor':'end'});
  const mot=['Achievement','Recognition','Challenging work','Responsibility','Personal growth'];const mChips=mot.map((m,i)=>{const g=el('g',{},Cg);box(g,40+i*106,166,98,26,'var(--org-soft)','none',13);t_(g,89+i*106,183,m,{'text-anchor':'middle','font-size':10.5,'font-weight':700,fill:'var(--org)'});return g;});
  t_(Cg,40,242,'Hygiene factors (job context)',{'font-size':13,'font-weight':700,fill:'var(--emp)'});box(Cg,40,252,520,34,'var(--sunk)','none',17);const hBar=el('rect',{x:40,y:252,height:34,rx:17,fill:'var(--emp)'},Cg);t_(Cg,40,304,'Dissatisfaction',{'font-size':11,fill:'var(--muted)'});t_(Cg,560,304,'No dissatisfaction',{'font-size':11,fill:'var(--muted)','text-anchor':'end'});
  const hyg=['Money','Status','Security','Relationships','Conditions','Supervision','Policy'];const hChips=hyg.map((m,i)=>{const g=el('g',{},Cg);box(g,40+i*75,316,70,26,'var(--emp-soft)','none',13);t_(g,75+i*75,333,m,{'text-anchor':'middle','font-size':10,'font-weight':700,fill:'var(--emp)'});return g;});
  const cNote=t_(Cg,300,380,'',{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'var(--err)'});const cNote2=t_(Cg,300,400,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  // D participative
  const Dg=tab(s);tabs.push([Dg,5,6]);t_(Dg,300,50,'Participative management: satisfaction from the work itself',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Job design','shape the job to be meaningful'],['Job enlargement','more varied tasks'],['Job rotation','move across tasks'],['MBO','set targets together'],['Autonomous work groups','teams steer themselves'],['Manager as teacher','consultant and colleague, not boss']].forEach(([a,b],i)=>{const x=30+(i%3)*185,y=90+Math.floor(i/3)*140;box(Dg,x,y,170,110,'var(--org-soft)','none',12);t_(Dg,x+85,y+46,a,{'text-anchor':'middle','font-size':14,'font-weight':700,fill:'var(--org)'});wrap(Dg,x+85,y+70,b,22,{'text-anchor':'middle','font-size':11.5});});
  // E effort vs reward
  const E=tab(s);tabs.push([E,6,7]);const eax=H.axes(E,{x:70,y:70,w:470,h:260,xmin:0,xmax:10,ymin:0,ymax:10,xt:[[0,'low effort'],[10,'high effort']],yt:[],yl:'Reward',xl:''});
  const rr=H.seeded(31);const eDots=Array.from({length:24},()=>{const e=rr()*9.5+.3;return {e,n:rr(),c:el('circle',{r:6,fill:'var(--emp)',stroke:'var(--card)'},E)};});const eLine=el('line',{stroke:'var(--org)','stroke-width':3},E);
  const eT=t_(E,300,40,'',{'text-anchor':'middle','font-size':15,'font-weight':700});const eT2=t_(E,300,372,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  // F piece rate
  const F=tab(s);tabs.push([F,7,9,true]);const fax=H.axes(F,{x:80,y:70,w:460,h:260,xmin:0,xmax:60,ymin:0,ymax:8000,xt:[0,10,20,30,40,50,60],yt:[[0,'₦0'],[2000,'₦2,000'],[4000,'₦4,000'],[6000,'₦6,000'],[8000,'₦8,000']],xl:'units produced per day',yl:'Daily pay'});
  const pay=u=>4000+Math.max(0,u-40)*150;const fp=[];for(let u=0;u<=60;u++)fp.push([fax.sx(u),fax.sy(pay(u))]);const fPath=el('path',{d:H.path(fp),fill:'none',stroke:'var(--emp)','stroke-width':4},F);
  el('line',{x1:fax.sx(40),x2:fax.sx(40),y1:fax.sy(0),y2:fax.sy(7600),stroke:'var(--muted)','stroke-dasharray':'4 4'},F);t_(F,fax.sx(40),fax.sy(7700),'normal output (time study)',{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});
  const tan=el('g',{},F);const tl=el('line',{stroke:'var(--data)','stroke-width':2.5},tan);const td=el('circle',{r:6,fill:'var(--data)'},tan);const tt=t_(tan,0,0,'',{'font-size':12,'font-weight':700,fill:'var(--data)'});
  const plans=el('g',{},F);['Group bonus','Profit sharing','Individual bonus','Special commendation','Status and prestige award'].forEach((p,i)=>{box(plans,90+(i%3)*150,92+Math.floor(i/3)*34,140,26,'var(--org-soft)','none',13);t_(plans,160+(i%3)*150,110+Math.floor(i/3)*34,p,{'text-anchor':'middle','font-size':11,'font-weight':700,fill:'var(--org)'});});
  const fT=t_(F,300,40,'Piece-rate: pay per unit beyond the basic rate',{'text-anchor':'middle','font-size':15,'font-weight':700});
  return {update(t){showTabs(tabs,t);
    const k=Math.floor(t);dEls.forEach((d,i)=>{const on=(k===1&&i===0)||(k===2&&i===1);H.set(d.r,{fill:on?'var(--emp-soft)':'var(--card)',stroke:on?'var(--emp)':'var(--line)'});});
    if(k===1){bN1.textContent='Management as a kind parent';bN2.textContent='Assumes: the more rewards workers receive,';bN3.textContent='the more loyal and productive they will be';}
    else{bN1.textContent='Carrot and stick (Theory X assumptions)';bN2.textContent='Assumes: the average person dislikes work and must be';bN3.textContent='rewarded for performing and punished for not performing';}
    const mp=H.es(t,3.1,3.6),hp=H.es(t,3.5,3.9),money=H.es(t,4.1,4.6);H.set(mBar,{width:520*(.12+.75*mp)});H.set(hBar,{width:520*(.12+.5*hp+.38*money)});
    mChips.forEach((c,i)=>H.op(c,H.es(t,3.1+i*.08,3.25+i*.08)));hChips.forEach((c,i)=>H.op(c,H.es(t,3.5+i*.05,3.6+i*.05)));
    cNote.textContent=money>.3?'More money fills the hygiene scale, not the motivator scale':'';cNote2.textContent=money>.3?'Like clean water: it prevents illness but does not make you healthy':'';
    const fl=H.es(t,6.4,6.9);eDots.forEach(d=>{const service=2+d.n*6;const rew=H.lerp(service,1+d.e*.85+(d.n-.5)*1.2,fl);H.set(d.c,{cx:eax.sx(d.e),cy:eax.sy(rew)});});
    H.set(eLine,{x1:eax.sx(0),x2:eax.sx(10),y1:eax.sy(H.lerp(5,1,fl)),y2:eax.sy(H.lerp(5,9.5,fl))});
    eT.textContent=fl<.5?'Reward by length of service, origin, affiliation':'Reward tied to effort';eT2.textContent=fl<.5?'Effort makes no difference: a nonchalant attitude follows (Oloko, 1977)':'Extra effort earns extra reward';
    const tp=H.seg(t,7.1,7.9);const u=5+50*tp;const sl=u<40?0:150;H.set(td,{cx:fax.sx(u),cy:fax.sy(pay(u))});H.set(tl,{x1:fax.sx(u-8),y1:fax.sy(pay(u)-sl*8),x2:fax.sx(u+8),y2:fax.sy(pay(u)+sl*8)});
    tt.textContent=sl?'slope: +₦150 per extra unit':'slope: ₦0 per extra unit';H.set(tt,{x:fax.sx(u)-10,y:fax.sy(pay(u))-22,'text-anchor':u>40?'end':'start'});H.op(tan,H.es(t,7,7.15));H.op(plans,H.es(t,8,8.3));
  }};
}
Course.add({id:'3.1',module:3,title:'Motivation and Integration of Employees',vizLabel:'Herzberg’s two scales and a pay curve with a kink',
  hook:{who:'Halima, production supervisor',text:'Halima’s team got a pay rise in January. By March complaints had stopped, but output had not moved. Then she gave her best operator responsibility for training two new staff, and his output rose. Why did one work and not the other?'},
  objectives:['Explain the meaning and nature of motivation','Describe the paternalistic, scientific management, human relations and participative approaches','Distinguish Herzberg’s motivators from hygiene factors','Explain why reward must relate to effort, and describe managerial incentive plans'],
  steps:[
    {h:'What motivation is',t:'<p>All motivation theories ask one question: how do we get workers to put in their <b>optimum effort</b>, so that both they and the organisation reach their goals through higher productivity?</p>'},
    {h:'The paternalistic approach',t:'<p>Management acts like a parent, treating workers kindly in the hope they will work harder and stay loyal. It assumes that the more rewards workers receive, the more loyal and productive they will be.</p>'},
    {h:'Scientific management: carrot and stick',t:'<p>Rewards and penalties are tied directly to performance. Work better and be rewarded; fall short and be warned, have rewards cut, or be dismissed. This rests on what McGregor called <b>Theory X</b>: the average person is indolent and dislikes work.</p>'},
    {h:'Human relations: Herzberg’s two factors',t:'<p>Human relations managers create an enabling environment, satisfying security and social needs. Herzberg found two separate sets of factors.</p><p><b>Motivators</b> (job content): achievement, recognition, challenging work, responsibility, personal growth.</p><p><b>Hygiene factors</b> (job context): money, status, security, relationships, working conditions, supervision, company policy.</p>'},
    {h:'Why money alone did not lift output',t:'<p>Hygiene factors do not motivate directly; they prevent dissatisfaction, as clean water prevents illness without making you healthy. Halima’s pay rise filled the bottom scale. Responsibility filled the top one.</p><p>Research shows hygiene factors can still influence motivation indirectly.</p>'},
    {h:'Participative management',t:'<p>Internalised motivation: the employee is satisfied by the <b>work itself</b>. Job design, job enlargement, job rotation, MBO, autonomous work groups. The manager is teacher, consultant and colleague, not boss.</p>'},
    {h:'Relate reward to effort',t:'<p>In much of the public sector, rewards follow length of service, state of origin, LGA or political affiliation rather than performance (Oloko, 1977). Then effort makes no difference and workers grow nonchalant. Watch the dots line up once reward follows effort.</p>'},
    {h:'Piece-rate: a curve with a kink',t:'<p>The worker earns a basic ₦4,000 a day up to the normal output set by time study, then ₦150 for each extra unit.</p><p>The blue tangent shows the <b>slope</b>: zero extra naira per unit before 40, then +₦150 per unit after. The kink is where effort starts to pay.</p>'},
    {h:'Other incentive plans',t:'<p><b>Group bonus</b> (shared extra benefit), <b>profit sharing</b> (a share of profit as bonus), <b>individual bonus</b> (cash for unusual performance), <b>special commendation</b> (e.g. the annual productivity merit award), and <b>high status and prestige awards</b>.</p><p>Methods of motivation in the course: fear, an enabling environment, competition, participation, internalised motivation, status, and money.</p>'}
  ],
  scene:motivScene,
  sandboxIntro:'Design a piece-rate plan and see what one worker earns.',
  sandbox(ctl,st){
    const s=H.svg(st,540,340);const p={base:4000,norm:40,rate:150,out:50};const ro=H.readout(ctl);
    H.slider(ctl,{id:'s31b',label:'Basic daily rate',min:2000,max:8000,step:250,value:4000,fmt:naira},v=>{p.base=v;draw();});
    H.slider(ctl,{id:'s31n',label:'Normal output (time study)',min:10,max:60,value:40,fmt:v=>v+' units'},v=>{p.norm=v;draw();});
    H.slider(ctl,{id:'s31r',label:'Rate per extra unit',min:0,max:400,step:10,value:150,fmt:naira},v=>{p.rate=v;draw();});
    H.slider(ctl,{id:'s31o',label:'Worker’s output',min:0,max:80,value:50,fmt:v=>v+' units'},v=>{p.out=v;draw();});
    function draw(){s.innerHTML='';const g=el('g',{},s);const pay=u=>p.base+Math.max(0,u-p.norm)*p.rate;const ymax=Math.max(8000,pay(80))*1.05;
      const ax=H.axes(g,{x:70,y:20,w:440,h:270,xmin:0,xmax:80,ymin:0,ymax:ymax,xt:[0,20,40,60,80],yt:[[0,'₦0'],[Math.round(ymax/2/1000)*1000,naira(Math.round(ymax/2/1000)*1000)],[Math.round(ymax*.9/1000)*1000,naira(Math.round(ymax*.9/1000)*1000)]],xl:'units per day',yl:'Pay'});
      const pts=[];for(let u=0;u<=80;u++)pts.push([ax.sx(u),ax.sy(pay(u))]);el('path',{d:H.path(pts),fill:'none',stroke:'var(--emp)','stroke-width':3.5},g);
      el('circle',{cx:ax.sx(p.out),cy:ax.sy(pay(p.out)),r:7,fill:'var(--org)'},g);
      ro.innerHTML=`Daily pay at ${p.out} units: <b>${naira(pay(p.out))}</b><br>Slope here: <b>${p.out>p.norm?naira(p.rate)+' per extra unit':'₦0 per extra unit'}</b>${p.out<=p.norm?' — below normal output, extra effort earns nothing extra.':''}`;}
    draw();H.tag(st,'Illustrative rates');
  },
  sae:{q:'Examine the effectiveness of the paternalistic approach to worker motivation in organisations known to you.',a:'Model answer outline: describe the approach (management as a kind parent; more rewards → more loyalty). Strengths: goodwill, loyalty, low conflict. Weaknesses: rewards not tied to performance, so they become hygiene factors that prevent dissatisfaction without lifting effort; workers can become dependent; mature employees may resent being treated like children (this links to the unitary approach in Unit 4.1). Give an example from your workplace.'},
  tma:{q:'Define motivation and discuss seven methods of motivation.',outline:['Define motivation: influencing workers to put in optimum effort for personal and organisational goals','1 Traditional approach (fear)','2 Enabling work environment','3 Competition','4 Participation','5 Internalised motivation','6 Status','7 Money','Conclude: no single best way; tie reward to effort']},
  quiz:[
    {q:'According to Herzberg, which is a motivator?',o:['Money','Working conditions','Recognition','Company policy'],a:2,w:'Recognition is part of job content. Money, conditions and policy are hygiene factors.'},
    {q:'The “carrot and stick” approach is linked to…',o:['Theory X','Theory Y','Herzberg’s motivators','Participative management'],a:0,w:'It assumes workers dislike work and must be rewarded or punished.'},
    {q:'Under a piece-rate plan, the slope of the pay curve below normal output is…',o:['Negative','Zero','Equal to the basic rate','Equal to the piece rate'],a:1,w:'Below normal output pay is flat at the basic rate, so extra units add nothing.'},
    {q:'Job enlargement and job rotation belong to which approach?',o:['Paternalistic','Scientific management','Participative management','Traditional (fear)'],a:2,w:'Participative management makes the work itself more appealing.'}
  ],
  card:[{h:'Four approaches',items:['Paternalistic','Scientific management (carrot and stick)','Human relations','Participative management']},
    {h:'Herzberg',items:['Motivators: achievement, recognition, challenging work, responsibility, growth','Hygiene: money, status, security, relationships, conditions, supervision, policy']},
    {h:'Seven methods of motivation',ordered:true,items:['Traditional approach (fear)','Enabling work environment','Competition','Participation','Internalised motivation','Status','Money']},
    {h:'Incentive plans',items:['Piece-rate','Group bonus','Profit sharing','Individual bonus','Special commendation','High status and prestige award']}]
});

/* ================= 3.2 ================= */
function leadScene(stage){
  H.cap(stage,'Leadership: from traits to situations');
  const s=H.svg(stage,600,440);const tabs=[];
  // A influence
  const A=tab(s);tabs.push([A,0,1]);H.person(A,300,150,'var(--org)',3);[0,1,2,3,4].forEach(i=>{const x=140+i*80;H.person(A,x,320,'var(--emp)',2);el('path',{d:`M300 175 Q ${(300+x)/2} 230 ${x} 290`,fill:'none',stroke:'var(--data)','stroke-width':2,'stroke-dasharray':'5 4'},A);});
  t_(A,300,72,'Leadership: influencing others toward goals',{'text-anchor':'middle','font-size':15,'font-weight':700});
  // B traits
  const B=tab(s);tabs.push([B,1,2]);t_(B,300,46,'Trait (“great man”) theory, 1910s–1940s',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Personality','adaptability, dominance, self-control, originality'],['Intelligence and ability','judgement, knowledge, fluency, drive'],['Social skills','interpersonal relations, tact, diplomacy'],['Physical','appearance, height, energy']].forEach(([a,b],i)=>{const x=30+(i%2)*280,y=74+Math.floor(i/2)*120;box(B,x,y,260,100,'var(--data-soft)','none',10);t_(B,x+16,y+32,a,{'font-size':14,'font-weight':700,fill:'var(--data)'});wrap(B,x+16,y+56,b,34,{'font-size':12});});
  const bX=el('g',{},B);box(bX,30,330,540,62,'var(--err-soft)','none',10);t_(bX,300,356,'Why it failed: not all leaders have all the traits, many non-leaders do,',{'text-anchor':'middle','font-size':12,fill:'var(--err)','font-weight':700});t_(bX,300,376,'and no one agrees how much of a trait is enough',{'text-anchor':'middle','font-size':12,fill:'var(--err)','font-weight':700});
  // C X vs Y
  const Cg=tab(s);tabs.push([Cg,2,3]);t_(Cg,300,46,'Behavioural theory: what leaders do',{'text-anchor':'middle','font-size':15,'font-weight':700});
  box(Cg,30,70,260,300,'var(--err-soft)','none',12);box(Cg,310,70,260,300,'var(--org-soft)','none',12);t_(Cg,160,104,'Theory X manager',{'text-anchor':'middle','font-size':15,'font-weight':700,fill:'var(--err)'});t_(Cg,440,104,'Theory Y manager',{'text-anchor':'middle','font-size':15,'font-weight':700,fill:'var(--org)'});
  ['tough, autocratic','tight controls','punishment and reward','distrusts subordinates'].forEach((x,i)=>t_(Cg,160,150+i*40,x,{'text-anchor':'middle','font-size':13}));['benevolent, participative','subordinates’ self-control','democratic style','trusts subordinates'].forEach((x,i)=>t_(Cg,440,150+i*40,x,{'text-anchor':'middle','font-size':13}));
  // D contingency
  const Dg=tab(s);tabs.push([Dg,3,4]);t_(Dg,300,46,'Contingency theory: no one best style',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const sits=[['New, inexperienced staff','more direction'],['Experts with time to decide','more freedom'],['Crisis, little time','quick decisions'],['Trained, committed team','consult and delegate']];sits.forEach(([a,b],i)=>{const y=80+i*76;box(Dg,40,y,240,56,'var(--sunk)','none',10);t_(Dg,56,y+33,a,{'font-size':13,'font-weight':700});t_(Dg,300,y+33,'→',{'font-size':20,fill:'var(--muted)','text-anchor':'middle'});box(Dg,320,y,240,56,'var(--org-soft)','none',10);t_(Dg,336,y+33,b,{'font-size':13,'font-weight':700,fill:'var(--org)'});});
  // E continuum
  const E=tab(s);tabs.push([E,4,7]);t_(E,300,40,'',{});const eTitle=t_(E,300,44,'',{'text-anchor':'middle','font-size':16,'font-weight':700});
  box(E,40,80,520,14,'var(--sunk)','none',7);const grad=el('rect',{x:40,y:80,height:14,rx:7,fill:'var(--org)'},E);t_(E,40,116,'Leader decides alone',{'font-size':11.5,fill:'var(--muted)'});t_(E,560,116,'Group decides',{'font-size':11.5,fill:'var(--muted)','text-anchor':'end'});
  const marker=el('g',{},E);el('circle',{r:12,fill:'var(--card)',stroke:'var(--org)','stroke-width':4},marker);
  const lead=el('g',{},E);H.person(lead,300,190,'var(--org)',2.4);const team=[0,1,2,3,4].map(i=>{const g=el('g',{},E);H.person(g,120+i*90,330,'var(--emp)',1.8);return g;});
  const arrows=el('g',{},E);const eDesc=t_(E,300,395,'',{'text-anchor':'middle','font-size':12.5});const eDesc2=t_(E,300,414,'',{'text-anchor':'middle','font-size':12,fill:'var(--muted)'});
  // F types
  const F=tab(s);tabs.push([F,7,8]);t_(F,300,44,'Types of leadership',{'text-anchor':'middle','font-size':16,'font-weight':700});
  [['Max Weber','Charismatic · Traditional · Legal-rational'],['Mooney and Reiley','Titular · Controller · True organiser'],['Etzioni','Officials · Informal leaders · Formal leaders'],['Cole (1984)','Situational · Appointed · Functional …']].forEach(([a,b],i)=>{const y=70+i*82;box(F,40,y,520,66,'var(--card)','var(--line)',10);t_(F,60,y+28,a,{'font-size':14,'font-weight':700,fill:'var(--org)'});t_(F,60,y+50,b,{'font-size':12.5});});
  // G power radar
  const G=tab(s);tabs.push([G,8,9]);t_(G,300,44,'Ingredients of effective leadership: power',{'text-anchor':'middle','font-size':16,'font-weight':700});
  const pw=['Reward','Coercive','Legitimate','Referent'],pv=[.8,.45,.75,.9],cx=300,cy=240,R=140;for(let r=1;r<=4;r++)el('polygon',{points:pw.map((_,k)=>{const a=-Math.PI/2+k*Math.PI/2;return [cx+Math.cos(a)*R*r/4,cy+Math.sin(a)*R*r/4].join(',');}).join(' '),fill:'none',stroke:'var(--line)'},G);
  pw.forEach((n,k)=>{const a=-Math.PI/2+k*Math.PI/2;el('line',{x1:cx,y1:cy,x2:cx+Math.cos(a)*R,y2:cy+Math.sin(a)*R,stroke:'var(--line)'},G);t_(G,cx+Math.cos(a)*(R+22),cy+Math.sin(a)*(R+22)+5,n,{'text-anchor':'middle','font-size':13,'font-weight':700});});
  const poly=el('polygon',{fill:'var(--org-soft)',stroke:'var(--org)','stroke-width':3,'fill-opacity':.8},G);
  const pDesc=['praise; pay rises and promotion','blame, criticism, punishment','authority of the position','admired as a role model'];const pT=t_(G,300,420,'',{'text-anchor':'middle','font-size':12.5,fill:'var(--muted)'});
  // H strategies
  const Hh=tab(s);tabs.push([Hh,9,10,true]);t_(Hh,300,44,'Developing leaders among young employees',{'text-anchor':'middle','font-size':16,'font-weight':700});
  ['Participation in decisions','Effective recruitment of competent people','Continuous training and apprenticeship','Consistent discipline','Political loyalty and sociability','Enabling environment and team spirit','Effective leading by example'].forEach((x,i)=>{const y=72+i*48;box(Hh,70,y,460,38,'var(--org-soft)','none',19);t_(Hh,92,y+25,`${i+1}`,{'font-size':14,'font-weight':700,fill:'var(--org)',class:'mono'});t_(Hh,118,y+25,x,{'font-size':13.5});});
  const styles=[[.1,'Autocratic','Commands and expects compliance; leads by giving or withholding rewards and punishment.','Three types: tough (coercive), benevolent, manipulative.'],[.92,'Democratic (free-rein)','Relies on the group to reach a verdict; discipline and control are not enforced.','Suits experts, small groups, and plenty of time to decide.'],[.68,'Participative / consultative','Involves the group in decisions that affect it; delegates widely, stresses results.','Suits a well-trained, experienced, committed workforce.']];
  return {update(t){showTabs(tabs,t);H.op(bX,H.es(t,1.5,1.7));
    const k=Math.floor(t);const si=H.clamp(k-4,0,2);const prev=styles[Math.max(0,si-1)],cur=styles[si];const mv=H.es(t,4+si,4.4+si);const pos=si===0?cur[0]:H.lerp(prev[0],cur[0],mv);
    marker.setAttribute('transform',`translate(${40+520*pos},87)`);H.set(grad,{width:520*pos});eTitle.textContent=cur[1];eDesc.textContent=cur[2];eDesc2.textContent=cur[3];
    arrows.innerHTML='';team.forEach((g,i)=>{const x=120+i*90;const down=1-pos;el('path',{d:`M300 215 L${x} 300`,stroke:'var(--org)','stroke-width':1+3*down,opacity:.25+.75*down,fill:'none'},arrows);el('path',{d:`M${x} 300 L300 215`,stroke:'var(--emp)','stroke-width':1+3*pos,opacity:.15+.85*pos,fill:'none','stroke-dasharray':'5 4'},arrows);if(i<4)el('line',{x1:x+12,y1:320,x2:x+78,y2:320,stroke:'var(--emp)','stroke-width':2,opacity:pos},arrows);});
    const gp=H.es(t,8.05,8.8);H.set(poly,{points:pv.map((v,i)=>{const a=-Math.PI/2+i*Math.PI/2,r=R*v*H.clamp(gp*4-i);return [cx+Math.cos(a)*r,cy+Math.sin(a)*r].join(',');}).join(' ')});
    const pi=H.clamp(Math.floor(gp*4),0,3);pT.textContent=`${pw[pi]} power: ${pDesc[pi]}`;
  }};
}
Course.add({id:'3.2',module:3,title:'Administrative Leadership Development',vizLabel:'A style slider and a power radar',
  hook:{who:'Femi, new head of department',text:'Femi has been promoted to lead two very different teams: six young operators fresh from school, and four senior research officers with PhDs. Should he lead both the same way?'},
  objectives:['Explain the meaning of leadership and the evolution of leadership theories','Describe autocratic, democratic, participative and expert leadership styles','Identify types of leadership from Weber, Mooney and Reiley, Etzioni and Cole','State the power sources of effective leadership and strategies for developing leaders'],
  steps:[
    {h:'What leadership is',t:'<p>Leadership is the process of influencing the activities of others toward goals. A leader gives instructions, coordinates specialists, reconciles conflicting views, and impels people to greater effort.</p>'},
    {h:'Trait theory',t:'<p>The “great man” or trait theory (1910s–1940s) held that leaders are born, and tried to list their traits: personality, intelligence and ability, social skills, physical traits.</p><p>It failed: not all leaders have all the traits, many non-leaders do, and there is no guide to how much of a trait is needed.</p>'},
    {h:'Behavioural theory',t:'<p>Leadership is what leaders <b>do</b>. Styles: autocratic, democratic, laissez-faire, people-oriented, task-oriented. McGregor’s <b>Theory X</b> manager is tough and autocratic with tight controls; the <b>Theory Y</b> manager is benevolent and participative, trusting subordinates’ self-control.</p>'},
    {h:'Contingency theory',t:'<p>Different subordinates, tasks and situations demand different styles. There is <b>no one best style</b> for every situation. This is the answer to Femi’s question.</p>'},
    {h:'Autocratic style',t:'<p>The autocrat commands and expects compliance, is dogmatic, work-centred, and leads by giving or withholding reward and punishment. Three types: <b>tough (coercive)</b>, <b>benevolent</b> and <b>manipulative</b> autocrats. Tough autocrats breed resentment and close supervision.</p>'},
    {h:'Democratic (free-rein) style',t:'<p>The course describes the democratic or free-rein leader as relying on the group to reach a verdict, enforcing little discipline or control and hoping staff act maturely. Goals may go unstated and confusion can follow.</p><p>Favourable when participants are experts, the group is small, and there is plenty of time.</p>'},
    {h:'Participative / consultative style',t:'<p>The leader involves the group in decisions that affect it: delegates widely, emphasises results, encourages cooperation, sets objectives and gives freedom within standards. It needs committed, well-trained, experienced staff.</p><p>An <b>expert</b> style also exists, where authority rests on specialist knowledge.</p>'},
    {h:'Types of leadership',t:'<p><b>Weber:</b> charismatic, traditional, legal-rational. <b>Mooney and Reiley:</b> titular, controller, true organiser. <b>Etzioni:</b> officials, informal leaders, formal leaders. <b>Cole (1984):</b> situational, appointed, functional and others.</p>'},
    {h:'Power: the ingredients of leadership',t:'<p><b>Reward</b> power (commendation; pay rises and promotion), <b>coercive</b> power (blame and punishment), <b>legitimate</b> power (the position), and <b>referent</b> power (admired as a role model). The more of these a leader has, the more effective he will be, depending on personality, style and situation.</p>'},
    {h:'Developing leaders',t:'<p>Strategies: participation in crucial decisions, effective recruitment, continuous training and apprenticeship, consistent discipline, political loyalty and sociability, an enabling environment with team spirit, and leading by example.</p>'}
  ],
  scene:leadScene,
  sandboxIntro:'The course’s self-assessment: pick a group and a style and see how well they fit.',
  sandbox(ctl,st){
    const s=H.svg(st,520,300);let grp='young',sty='auto';const ro=H.readout(ctl);
    H.segBtns(ctl,'Group of staff',[['young','Young, inexperienced operators'],['research','Research officers'],['students','Students or apprentices'],['managers','Departmental managers']],'young',v=>{grp=v;draw();});
    H.segBtns(ctl,'Your style',[['auto','Autocratic'],['part','Participative'],['dem','Democratic (free-rein)']],'auto',v=>{sty=v;draw();});
    const fit={young:{auto:[.8,'They need clear direction and close guidance. A benevolent autocrat fits best at the start.'],part:[.5,'Consult them, but they lack the experience to carry full responsibility yet.'],dem:[.15,'Little control and unstated goals will confuse inexperienced staff.']},
      research:{auto:[.2,'Experts resent being ordered about; it wastes their judgement.'],part:[.75,'Consulting experts on decisions that affect them works well.'],dem:[.85,'The course’s favourable case: experts, a small group, time to decide.']},
      students:{auto:[.6,'Direction helps learners, but too tough a style stifles learning.'],part:[.7,'Teach, involve and give feedback: the manager as teacher.'],dem:[.2,'Learners need structure and goals.']},
      managers:{auto:[.25,'Functional managers expect to be consulted on their areas.'],part:[.85,'Delegate, set objectives, give freedom within standards.'],dem:[.55,'Can work if they are experienced and goals are clear.']}};
    function draw(){s.innerHTML='';const [v,txt]=fit[grp][sty];el('rect',{x:40,y:120,width:440,height:30,rx:15,fill:'var(--sunk)'},s);el('rect',{x:40,y:120,width:440*v,height:30,rx:15,fill:v>.65?'var(--org)':v>.4?'var(--emp)':'var(--err)'},s);
      t_(s,260,100,'Fit between style and situation',{'text-anchor':'middle','font-size':14,'font-weight':700});t_(s,40,175,'poor',{'font-size':11,fill:'var(--muted)'});t_(s,480,175,'strong',{'font-size':11,fill:'var(--muted)','text-anchor':'end'});
      ro.innerHTML=`<b>${v>.65?'Strong fit':v>.4?'Partial fit':'Poor fit'}.</b> ${txt}`;}
    draw();H.tag(st,'Model answer, contingency view');
  },
  sae:{q:'Identify the leadership style you would apply to: (a) young, inexperienced operators; (b) research officers; (c) students or apprentices; (d) functional department managers.',a:['(a) Directive, benevolent autocratic style at first, moving to consultation as they gain experience.','(b) Democratic / free-rein or consultative: they are experts able to take independent decisions.','(c) Participative with strong teaching and feedback: the manager as teacher.','(d) Participative / consultative: delegate and set objectives with freedom within standards.','Justify each with contingency theory: no one best style.']},
  tma:{q:'Discuss five main strategies for developing administrative leadership potential among young employees.',outline:['Participation in crucial decisions','Effective recruitment of competent people','Continuous training and apprenticeship','Consistent discipline','Political loyalty and sociability; enabling environment and team spirit; leading by example']},
  quiz:[
    {q:'Which theory says there is no one best leadership style for all situations?',o:['Trait theory','Great man theory','Contingency theory','Theory X'],a:2,w:'Contingency theory matches style to subordinates, task and situation.'},
    {q:'Power a leader has because subordinates admire him as a role model is…',o:['Legitimate','Coercive','Referent','Reward'],a:2,w:'Referent power comes from identification with the leader.'},
    {q:'Which is one of Weber’s three types of leadership?',o:['Titular','Legal-rational','Functional','Controller'],a:1,w:'Weber: charismatic, traditional and legal-rational.'},
    {q:'The three types of autocrat are…',o:['Tough, benevolent, manipulative','Titular, controller, organiser','Charismatic, traditional, legal','Formal, informal, official'],a:0,w:'The course lists coercive (tough), benevolent and manipulative autocrats.'}
  ],
  card:[{h:'Theories',items:['Trait (great man)','Behavioural','Contingency']},{h:'Styles',items:['Autocratic: tough, benevolent, manipulative','Democratic (free-rein)','Participative / consultative','Expert']},
    {h:'Power sources',items:['Reward','Coercive','Legitimate','Referent']},{h:'Development strategies',items:['Participation','Effective recruitment','Training and apprenticeship','Discipline','Political loyalty and sociability','Enabling environment','Effective leading']}]
});

/* ================= 3.3 ================= */
function payScene(stage){
  H.cap(stage,'A graded salary structure');
  let T=0;const G=8,S=6;
  const o=H.c3(stage,{yaw:-.65,pitch:.42,dist:21,f:1.15,spin:.0015,render(ctx,o){
    const C=o.col;const show=H.es(T,2,2.6);if(show<=0)return;const hk=1+.35*Math.sin(H.seg(T,5,6)*Math.PI)*(T>=5&&T<6?1:0);
    const faces=[];for(let g=0;g<G;g++){const gs=Math.min(1,show*G-g);if(gs<=0)continue;for(let st=0;st<S;st++){const h=(1.2+g*1.05+st*.14)*hk*gs;const x=-6+g*1.6,z=-1.5+st*.55;
      const isCur=T>=3&&T<4&&g===3&&st===Math.min(S-1,Math.floor(H.seg(T,3.1,3.9)*S));const col=isCur?C.org:(g%2?C['emp-soft']:C.manila);faces.push(...H.c3box(o,[x,h/2,z],[1.45,h,.5],col));}}
    H.c3faces(ctx,faces,C.line);
    for(let g=0;g<G;g++)H.c3text(ctx,o,[-6+g*1.6,-.6,2.2],'GL '+(g+1)*2,C.muted,11);
    if(T>=3&&T<4){const st=Math.min(S-1,Math.floor(H.seg(T,3.1,3.9)*S));const h=(1.2+3*1.05+st*.14);H.c3text(ctx,o,[-6+3*1.6,h+.6,-1.5+st*.55],'step '+(st+1),C.org,13);}
  }});
  const ov=H.h('div',{style:'position:absolute;inset:0;pointer-events:none'});stage.append(ov);const s=H.svg(ov,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);box(A,30,60,540,320);const ax1=H.axes(A,{x:80,y:110,w:200,h:200,xmin:0,xmax:12,ymin:0,ymax:10,xt:[[0,'Jan'],[12,'Dec']],yl:'Wages'}),ax2=H.axes(A,{x:340,y:110,w:200,h:200,xmin:0,xmax:12,ymin:0,ymax:10,xt:[[0,'Jan'],[12,'Dec']],yl:'Salary'});
  const wv=[4,7,3,6,8,2,5,7,4,6,3,7];wv.forEach((v,i)=>el('rect',{x:ax1.sx(i+.15),y:ax1.sy(v),width:12,height:ax1.sy(0)-ax1.sy(v),fill:'var(--emp)',rx:2},A));for(let i=0;i<12;i++)el('rect',{x:ax2.sx(i+.15),y:ax2.sy(6),width:12,height:ax2.sy(0)-ax2.sy(6),fill:'var(--org)',rx:2},A);
  t_(A,180,350,'payment for work done',{'text-anchor':'middle','font-size':12});t_(A,440,350,'fixed, regular payment',{'text-anchor':'middle','font-size':12});
  const B=tab(s);tabs.push([B,1,2]);box(B,30,60,540,320);t_(B,300,92,'Wage and salary survey: where does our rate sit?',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const bax=H.axes(B,{x:80,y:120,w:440,h:180,xmin:60,xmax:160,ymin:0,ymax:1,xt:[[60,'₦60k'],[80,'₦80k'],[100,'₦100k'],[120,'₦120k'],[140,'₦140k'],[160,'₦160k']]});
  [72,85,90,96,98,103,108,112,118,131,140].forEach((v,i)=>{el('circle',{cx:bax.sx(v),cy:bax.sy(.3+(i%3)*.18),r:9,fill:'var(--data-soft)',stroke:'var(--data)'},B);});el('line',{x1:bax.sx(84),x2:bax.sx(84),y1:bax.sy(0),y2:bax.sy(1),stroke:'var(--emp)','stroke-width':3},B);t_(B,bax.sx(84),bax.sy(1)-6,'our rate',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--emp)'});
  t_(B,300,350,'Monthly pay for the same job in the industry (illustrative)',{'text-anchor':'middle','font-size':11.5,fill:'var(--muted)'});
  const Cc=tab(s);tabs.push([Cc,2,3]);[['Job grading',0],['Point system',1],['Simple ranking',2],['Factor comparison',3]].forEach(([n,i])=>{box(Cc,20+i*143,24,135,30,'var(--org-soft)','none',15);t_(Cc,87+i*143,44,n,{'text-anchor':'middle','font-size':11.5,'font-weight':700,fill:'var(--org)'});});
  const F=tab(s);tabs.push([F,5,6]);['Market mechanism','Ability to pay','Productivity','Labour unions','Cost of living','Competition'].forEach((n,i)=>{const x=20+(i%3)*192,y=i<3?20:390;box(F,x,y,180,30,'var(--data-soft)','none',15);t_(F,x+90,y+20,(i<3?'↓ ':'↑ ')+n,{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--data)'});});
  const P=tab(s);tabs.push([P,6,7]);box(P,30,60,540,320);t_(P,300,92,'Principles of salary determination',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Pay the position, not the person','equal pay for equal work, not equal pay for all'],['A graded salary or step plan','a minimum, a maximum, and set increments'],['Advantages of the step plan','incentive for better work · efficiency · equity between new and experienced staff · stability']].forEach(([a,b],i)=>{t_(P,60,136+i*80,a,{'font-size':14,'font-weight':700,fill:'var(--org)'});wrap(P,60,158+i*80,b,70,{'font-size':12.5});});
  const Fr=tab(s);tabs.push([Fr,7,8,true]);box(Fr,30,60,540,320);t_(Fr,300,92,'Fringe benefits in the public service',{'text-anchor':'middle','font-size':15,'font-weight':700});
  ['Increments','Casual leave','Medical leave','Earned leave','Study leave','Transport allowance','Housing allowance','Other allowances','Retirement allowances'].forEach((n,i)=>{const x=60+(i%3)*165,y=120+Math.floor(i/3)*80;box(Fr,x,y,150,54,'var(--emp-soft)','none',27);t_(Fr,x+75,y+32,n,{'text-anchor':'middle','font-size':12.5,'font-weight':700});});
  const ann=t_(s,300,420,'',{'text-anchor':'middle','font-size':13,'font-weight':700});
  return {update(t){T=t;o.dirty=true;showTabs(tabs,t);
    ann.textContent=t>=2&&t<3?'Job evaluation sets the grade of each job':t>=3&&t<4?'Merit rating moves staff up the steps of a grade':t>=4&&t<5?'Incentives: base rate for normal output, bonus above it':'';
  }};
}
Course.add({id:'3.3',module:3,title:'Wages and Salary Administration',vizLabel:'A 3D salary staircase',
  hook:{who:'Peju, compensation officer',text:'Two clerks do the same job; one has served eight years, the other eight months. A driver in Lagos earns less than the market rate and keeps leaving. Peju has to design a pay structure that is fair, affordable and keeps people.'},
  objectives:['Distinguish wages from salaries','Describe the four aspects of salary administration','Explain the factors that influence compensation','State the principles of salary determination and list fringe benefits'],
  steps:[
    {h:'Wages and salaries',t:'<p><b>Wages</b> are payment for work done; they depend on the job done and lack regularity. <b>Salaries</b> are fixed, regular payments, usually for non-manual work.</p>'},
    {h:'1. Wage and salary surveys',t:'<p>Surveys find the general pay level in the community and industry, giving the company a base for setting its own rates. Peju’s driver rate sits below most of the market.</p>'},
    {h:'2. Job evaluation',t:'<p>Job evaluation sets the relationship between pay and the different jobs inside the organisation, through <b>job grading, the point system, simple ranking, or factor comparison</b>. With the survey, it sets the base rate of each job. Each block is a grade level.</p>'},
    {h:'3. Merit rating and pay steps',t:'<p>Instead of one rate per job, companies set a series of <b>steps</b>. New staff start at the base rate and move up the steps through merit rating as they gain proficiency and seniority.</p>'},
    {h:'4. Incentives',t:'<p>With an incentive plan, the base rate is paid for a “normal” amount of production set by time study. Producing more earns an extra bonus (see the piece-rate curve in Unit 3.1).</p>'},
    {h:'Factors influencing compensation',t:'<p>Six forces push the whole structure up or down: the <b>market mechanism</b>, the organisation’s <b>ability to pay</b>, the <b>level of productivity</b>, <b>labour unions</b>, the <b>cost of living</b>, and <b>competition</b>.</p>'},
    {h:'Principles of salary determination',t:'<p>Compensate the <b>position, not the individual</b>: equal pay for equal work, which is not equal pay for all. Use a <b>graded salary or step plan</b> with set increments, which may be automatic, semi-automatic or conditional.</p>'},
    {h:'Fringe benefits',t:'<p>A compensation plan includes more than pay: increments, leave (casual, medical, earned, study), transport, housing and other allowances, and retirement allowances. They refresh staff, improve qualifications and maintain social prestige.</p>'}
  ],
  scene:payScene,
  sandboxIntro:'Evaluate a job with the point system and see which grade it lands in.',
  sandbox(ctl,st){
    const s=H.svg(st,520,320);const f={skill:3,effort:3,resp:3,cond:2};const w={skill:40,effort:20,resp:30,cond:10};const ro=H.readout(ctl);
    [['skill','Skill required'],['effort','Effort'],['resp','Responsibility'],['cond','Working conditions']].forEach(([k,l])=>H.slider(ctl,{id:'s33'+k,label:`${l} (weight ${w[k]})`,min:1,max:5,value:f[k],fmt:v=>'level '+v},v=>{f[k]=v;draw();}));
    function draw(){s.innerHTML='';const pts=Object.keys(f).reduce((a,k)=>a+f[k]*w[k],0);const grade=Math.min(8,Math.max(1,Math.ceil((pts-100)/50)+1));
      for(let g=1;g<=8;g++){const h=30+g*28;el('rect',{x:20+(g-1)*62,y:300-h,width:54,height:h,rx:4,fill:g===grade?'var(--org)':'var(--manila)'},s);t_(s,47+(g-1)*62,316,'GL '+g*2,{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});}
      ro.innerHTML=`Job points: <b>${pts}</b> of 500 → grade <b>GL ${grade*2}</b>.<br>Same points, same grade: the position is paid, not the person.`;}
    draw();H.tag(st,'Illustrative weights');
  },
  sae:{q:'Find out whether your organisation periodically raises the level of pay, and the criteria it uses for increments.',a:'Model structure: state whether increments are yearly; whether they are automatic (length of service), semi-automatic (service plus certified performance) or conditional (efficiency only); who certifies; and whether general pay reviews follow cost of living, union negotiation, ability to pay or market surveys.'},
  tma:{q:'Discuss six major factors that influence an organisation’s compensation system.',outline:['Market mechanism: supply and demand for the skill','Ability to pay','Level of productivity','Labour unions and collective bargaining','Cost of living','Competition for staff','Conclude with surveys and job evaluation as the tools that turn these into rates']},
  quiz:[
    {q:'What is the main difference between wages and salaries?',o:['Wages are higher','Salary is regular; wages depend on the job done','Salaries are only for managers','There is none'],a:1,w:'Salary is a fixed regular payment; wages lack unconditional regularity.'},
    {q:'Which is NOT a method of job evaluation in the course?',o:['Job grading','Point system','Factor comparison','Forced distribution'],a:3,w:'Forced distribution is an appraisal method, not job evaluation.'},
    {q:'“Compensate the position rather than the individual” means…',o:['Equal pay for all','Equal pay for equal work','Pay by seniority only','Pay by negotiation'],a:1,w:'It means equal pay for equal work, which is not equal pay for all.'},
    {q:'Which is an advantage of the step plan?',o:['Removes all incentives','Equity between new and experienced staff','Fixes one rate forever','Ends union negotiation'],a:1,w:'The step plan recognises the difference between a new and an experienced hand.'}
  ],
  card:[{h:'Aspects of salary administration',ordered:true,items:['Wage and salary surveys','Job evaluation','Merit rating (pay steps)','Incentives']},
    {h:'Job evaluation methods',items:['Job grading','Point system','Simple ranking','Factor comparison']},
    {h:'Factors influencing compensation',items:['Market mechanism','Ability to pay','Productivity','Labour unions','Cost of living','Competition']}]
});

/* ================= 3.4 ================= */
const PROC=['Superior issues a query letter','Investigation; report to the chief executive','DPM sends statement of facts; written defence','DPM appoints a special committee of at least three','Accused told the hearing date in writing','Hearing: accused may question and call witnesses','Committee reports findings and records','Penalty set by the employee rules'];
function discScene(stage){
  H.cap(stage,'From rules to penalties');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,1]);t_(A,300,50,'Codes of conduct: the civil service rules',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Federal Civil Service Rules','federal ministries and parastatals',520],['State Civil Service Rules','state ministries and parastatals',420],['Local government follows state rules','plus bye-laws for local situations',320]].forEach(([a,b,w],i)=>{const y=90+i*90;box(A,300-w/2,y,w,70,i===0?'var(--org)':i===1?'var(--org-soft)':'var(--sunk)','none',10);t_(A,300,y+32,a,{'text-anchor':'middle','font-size':14,'font-weight':700,fill:i===0?'var(--card)':'var(--ink)'});t_(A,300,y+52,b,{'text-anchor':'middle','font-size':11.5,fill:i===0?'var(--card)':'var(--muted)'});});
  const B=tab(s);tabs.push([B,1,2]);t_(B,300,50,'Discipline: training of mind and character',{'text-anchor':'middle','font-size':15,'font-weight':700});
  [['Imposed discipline','rules enforced from outside',.45],['Self-discipline','the most enlightened and civilised form',1]].forEach(([a,b,v],i)=>{const y=110+i*130;box(B,60,y,480,100,i?'var(--org-soft)':'var(--sunk)','none',12);t_(B,84,y+40,a,{'font-size':16,'font-weight':700,fill:i?'var(--org)':'var(--ink)'});t_(B,84,y+64,b,{'font-size':12.5});});
  const C=tab(s);tabs.push([C,2,3]);t_(C,300,40,'Some acts of indiscipline',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const acts=['Lateness','Absence without permission','Inefficiency','Leaking official secrets','Dishonesty, bribery','Drunkenness','Fraud','Financial mismanagement','Embezzlement','Private business without clearance','Political activities','Official scandals','Disobeying lawful orders','Stealing','Falsifying documents','Suppressing records'];
  const aCh=acts.map((a,i)=>{const g=el('g',{},C);const x=20+(i%4)*143,y=62+Math.floor(i/4)*86;box(g,x,y,134,72,'var(--err-soft)','none',10);wrap(g,x+67,y+32,a,18,{'text-anchor':'middle','font-size':11.5,'font-weight':700});return g;});
  const D=tab(s);tabs.push([D,3,4]);t_(D,300,36,'Penalties by severity',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const pen=[['Counselling','inf'],['Warning','les'],['Reprimand','les'],['Withhold increment or promotion','les'],['Transfer','inf'],['Suspension','sev'],['Interdiction','sev'],['Surcharge','sev'],['Termination','sev'],['Dismissal','sev']];
  const zc={inf:'var(--sunk)',les:'var(--emp-soft)',sev:'var(--err-soft)'};const pBars=pen.map(([n,z],i)=>{const g=el('g',{},D);const y=56+i*34;const w=90+i*44;box(g,40,y,w,28,zc[z],'none',5);t_(g,50,y+19,n,{'font-size':12,'font-weight':700});return g;});
  [['informal','var(--sunk)'],['lesser formal','var(--emp-soft)'],['severe formal','var(--err-soft)']].forEach(([n,c],i)=>{box(D,40+i*140,408,16,16,c,'var(--line)',3);t_(D,62+i*140,421,n,{'font-size':11.5});});
  const E=tab(s);tabs.push([E,4,5]);t_(E,300,44,'Who may punish? The departmental head, if…',{'text-anchor':'middle','font-size':15,'font-weight':700});
  ['No one punishes a staff member senior to them in service','The offence is established in the rules','The employee gets a reasonable chance to defend','Serious charges are set out in writing'].forEach((x,i)=>{const y=80+i*80;box(E,50,y,500,60,'var(--org-soft)','none',10);t_(E,74,y+36,'✓',{'font-size':18,'font-weight':700,fill:'var(--org)'});wrap(E,102,y+36,x,58,{'font-size':13.5});});
  const F=tab(s);tabs.push([F,5,8,true]);t_(F,300,32,'The disciplinary procedure',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const pEls=PROC.map((p,i)=>{const g=el('g',{},F);const y=48+i*46;const c=el('circle',{cx:50,cy:y+16,r:14,fill:'var(--sunk)'},g);const n=t_(g,50,y+21,String(i+1),{'text-anchor':'middle','font-size':12,'font-weight':700,class:'mono'});if(i<7)el('line',{x1:50,y1:y+30,x2:50,y2:y+48,stroke:'var(--line)','stroke-width':2},g);const tx=t_(g,76,y+21,p,{'font-size':12.5});return {c,n,tx};});
  const tbl=el('g',{},F);box(tbl,400,140,180,150,'var(--card)','var(--line)',10);t_(tbl,490,162,'Special committee',{'text-anchor':'middle','font-size':12,'font-weight':700});
  [0,1,2].forEach(i=>H.person(tbl,440+i*50,210,'var(--org)',1.5));t_(tbl,490,240,'at least three members',{'text-anchor':'middle','font-size':10.5,fill:'var(--muted)'});
  t_(tbl,490,262,'✗ accusers  ✗ DPM',{'text-anchor':'middle','font-size':11,'font-weight':700,fill:'var(--err)'});t_(tbl,490,278,'✗ personnel committee',{'text-anchor':'middle','font-size':11,'font-weight':700,fill:'var(--err)'});
  return {update(t){showTabs(tabs,t);aCh.forEach((g,i)=>H.op(g,H.es(t,2+i*.04,2.1+i*.04)));pBars.forEach((g,i)=>H.op(g,H.es(t,3+i*.07,3.1+i*.07)));
    const lit=Math.floor(H.seg(t,5,7.9)*8)+1;pEls.forEach((e,i)=>{const on=i<lit;H.set(e.c,{fill:on?'var(--org)':'var(--sunk)'});H.set(e.n,{fill:on?'var(--card)':'var(--ink)'});H.set(e.tx,{'font-weight':i===lit-1?700:400});});
    H.op(tbl,H.es(t,6,6.2)*(1-H.es(t,6.9,7.05)));
  }};
}
Course.add({id:'3.4',module:3,title:'Code of Conduct and Discipline in Organisations',vizLabel:'A penalty ladder and a procedure timeline',
  hook:{who:'Rotimi, accounts officer',text:'Rotimi is accused of suppressing records in the stores ledger. His head of department wants him sacked by tomorrow. What must happen first, and who is allowed to decide?'},
  objectives:['Explain codes of conduct and the meaning of discipline','Identify acts of indiscipline and forms of penalty','State who may exercise the right to punish, and the conditions','Describe the disciplinary procedure step by step'],
  steps:[
    {h:'Codes of conduct',t:'<p>A code of conduct is a comprehensive body of rules and regulations guiding the conduct of the official worker. In Nigeria it is called the <b>civil service rules</b>: federal rules, state rules, and local governments following state rules with some bye-laws.</p>'},
    {h:'What discipline means',t:'<p>Discipline is training of mind and character to produce self-control and habits of obedience to the rules of the constituted authority. Codes of conduct aim to instil <b>self-discipline</b>, the most enlightened and civilised form.</p>'},
    {h:'Acts of indiscipline',t:'<p>Lateness, absence without permission, inefficiency, leaking secrets, dishonesty and bribery, drunkenness, fraud, financial mismanagement, embezzlement, unauthorised private business, political activity, scandals, disobeying lawful orders, stealing, falsifying documents, manipulating records.</p>'},
    {h:'Penalties: informal and formal',t:'<p><b>Informal</b> penalties are verbal and unwritten: counselling, warning, closer supervision, a less convenient posting. Used to be lenient or when guilt is hard to prove.</p><p><b>Formal</b> penalties follow a set procedure: <b>lesser</b> (warning, reprimand, loss of seniority, delayed increment) by the head; <b>severe</b> (suspension, demotion, dismissal).</p>'},
    {h:'Who may punish?',t:'<p>The right belongs to the <b>departmental head</b>, who is responsible for discipline and efficiency. Because it can be misused, four conditions apply first.</p>'},
    {h:'Procedure: query and investigation',t:'<p>Misconduct is reported to a superior, who issues a <b>query letter</b> stating the offence and the rule breached. Investigation follows; if guilt is likely, the matter goes to the chief executive, who instructs the <b>Director of Personnel Management</b> to start proceedings.</p>'},
    {h:'Procedure: defence and an independent committee',t:'<p>The DPM sends the accused a statement of facts and asks for a written defence within a set period. Then a <b>special disciplinary committee of at least three</b> is appointed. None of the accusers, the relevant personnel committee, or the DPM may sit on it.</p>'},
    {h:'Procedure: hearing, report, penalty',t:'<p>The accused is told the hearing date in writing; may be present when witnesses are examined, question them, and call his own. The committee reports its findings with all records. The penalty follows the employee rules according to guilt and degree of involvement.</p>'}
  ],
  scene:discScene,
  sandboxIntro:'Put the disciplinary procedure in order. Tap the steps in the right sequence.',
  sandbox(ctl,st){
    const ro=H.readout(ctl);const order=PROC.map((p,i)=>i);const r=H.seeded(77);const shuf=[...order].sort(()=>r()-.5);let next=0;
    const list=H.h('div',{style:'display:grid;gap:8px;padding:14px'});st.append(list);
    const reset=H.h('button',{class:'btn',type:'button'},'Start again');ctl.append(reset);
    function render(){list.innerHTML='';shuf.forEach(i=>{const done=order.indexOf(i)<next;const b=H.h('button',{class:'opt',type:'button',style:done?'background:var(--org-soft);border-color:var(--org)':''},(done?`${i+1}. `:'')+PROC[i]);
      b.onclick=()=>{if(done)return;if(i===next){next++;ro.innerHTML=next===8?'<b>All eight steps in order.</b> Due process protects both the employee and the organisation.':`Correct. Step ${next} done.`;}else{ro.innerHTML=`<span style="color:var(--err)">Not yet.</span> Think about what must happen before “${PROC[i]}”.`;}render();};list.append(b);});}
    reset.onclick=()=>{next=0;ro.textContent='Tap the first step.';render();};ro.textContent='Tap the first step.';render();
  },
  tma:{q:'Define the disciplinary process and describe the major steps in disciplinary procedure in an organisation.',outline:['Define discipline and disciplinary procedure: steps to establish guilt, degree of involvement and penalty','Query letter from the superior','Investigation and report to the chief executive; DPM instructed','Statement of facts and written defence','Special committee of at least three, excluding accusers and the DPM','Written notice of hearing; right to question and call witnesses','Committee report; penalty under the rules','Conclude on natural justice']},
  sae:{q:'Classify these penalties as informal, lesser formal or severe formal: warning, suspension, verbal counselling, delay in increment, dismissal.',a:['Informal: verbal counselling (and an unwritten warning).','Lesser formal: written warning, delay in increment.','Severe formal: suspension, dismissal.']},
  quiz:[
    {q:'The special disciplinary committee must have at least…',o:['One member','Two members','Three members','Five members'],a:2,w:'At least three persons, none of them accusers or the DPM.'},
    {q:'Who normally holds the right to discipline a worker under civil service rules?',o:['Any colleague','The departmental head','The trade union','The accused’s peers'],a:1,w:'The departmental head, subject to four conditions.'},
    {q:'Which is a severe formal penalty?',o:['Counselling','Reprimand','Suspension','Delay in increment'],a:2,w:'Severe formal penalties include suspension, demotion and dismissal.'},
    {q:'What usually starts the disciplinary procedure?',o:['Dismissal letter','Query letter','Committee hearing','Union strike'],a:1,w:'The superior issues a query letter stating the offence and the rule breached.'}
  ],
  card:[{h:'Disciplinary procedure',ordered:true,items:PROC},{h:'Penalties',items:['Informal: counselling, verbal warning, closer supervision','Lesser formal: warning, reprimand, loss of seniority, delayed increment','Severe formal: suspension, demotion, dismissal']},
    {h:'Conditions before punishing',items:['Not senior in service to the punisher','Offence established in the rules','Reasonable chance to defend','Serious charges in writing']}]
});

/* ================= 3.5 ================= */
function grievScene(stage){
  H.cap(stage,'Grievances: pressure and release');
  const s=H.svg(stage,600,440);const tabs=[];
  const A=tab(s);tabs.push([A,0,2]);const bubbles=['“They skipped me for training again.”','“My overtime was never paid.”','“The new roster is unfair.”','“I was shouted at in front of clients.”'];
  [0,1,2].forEach(i=>H.person(A,160+i*140,320,'var(--emp)',2.4));const bEls=bubbles.map((b,i)=>{const g=el('g',{},A);const x=20+(i%2)*290,y=70+Math.floor(i/2)*100;box(g,x,y,270,60,'var(--card)','var(--line)',30);t_(g,x+135,y+36,b,{'text-anchor':'middle','font-size':12});return g;});
  const aT=t_(A,300,400,'',{'text-anchor':'middle','font-size':13,'font-weight':700});
  const B=tab(s);tabs.push([B,2,3]);t_(B,300,46,'Sources of grievance',{'text-anchor':'middle','font-size':15,'font-weight':700});
  ['Individual and group attitudes','Beliefs about employee rights','Working practices and norms','Relationships, power balance, trust','Organisational culture'].forEach((x,i)=>{box(B,60,74+i*66,480,50,'var(--emp-soft)','none',25);t_(B,300,104+i*66,x,{'text-anchor':'middle','font-size':13.5,'font-weight':700});});
  const C=tab(s);tabs.push([C,3,4]);t_(C,300,40,'A grievance procedure is a safety valve (Beach, 1975)',{'text-anchor':'middle','font-size':15,'font-weight':700});
  el('rect',{x:160,y:120,width:280,height:220,rx:90,fill:'var(--sunk)',stroke:'var(--muted)','stroke-width':3},C);
  const fill=el('rect',{x:163,width:274,fill:'var(--err-soft)'},C);el('rect',{x:160,y:120,width:280,height:220,rx:90,fill:'none',stroke:'var(--muted)','stroke-width':3},C);
  el('circle',{cx:300,cy:90,r:34,fill:'var(--card)',stroke:'var(--ink)','stroke-width':2},C);const needle=el('line',{x1:300,y1:90,x2:300,y2:64,stroke:'var(--err)','stroke-width':3},C);t_(C,300,138,'',{});
  const valve=el('g',{},C);el('rect',{x:440,y:150,width:60,height:16,fill:'var(--org)'},valve);t_(valve,470,190,'procedure',{'text-anchor':'middle','font-size':11.5,'font-weight':700,fill:'var(--org)'});
  const puffs=[0,1,2].map(i=>el('circle',{r:10+i*4,fill:'var(--sunk)',stroke:'var(--line)'},C));const cT=t_(C,300,380,'',{'text-anchor':'middle','font-size':12.5});
  const D=tab(s);tabs.push([D,4,5]);t_(D,300,36,'The four-stage grievance procedure',{'text-anchor':'middle','font-size':15,'font-weight':700});
  const stg=[['Stage 1','Immediate supervisor'],['Stage 2','Interview with the manager within a week'],['Stage 3','General management or Director'],['Stage 4','Outside body: committee, conciliation, arbitration']];
  const counts=[100,40,15,5];const dEls=stg.map(([a,b],i)=>{const g=el('g',{},D);const x=40+i*120,y=330-i*70;box(g,x,y,200,46,'var(--org-soft)','var(--org)',6);t_(g,x+12,y+20,a,{'font-size':12,'font-weight':700,fill:'var(--org)'});t_(g,x+12,y+37,b.length>30?b.slice(0,29)+'…':b,{'font-size':10.5});
    const n=t_(g,x+190,y-6,'',{'text-anchor':'end','font-size':12,'font-weight':700,class:'mono'});return {g,n};});
  const dNote=t_(D,40,420,'Most grievances should leave at the lowest stage (illustrative counts)',{'font-size':11.5,fill:'var(--muted)'});
  const E=tab(s);tabs.push([E,5,8,true]);t_(E,300,40,'',{});const eT=t_(E,300,40,'',{'text-anchor':'middle','font-size':16,'font-weight':700});
  const ceo=el('g',{},E);H.person(ceo,470,140,'var(--org)',2.6);t_(ceo,470,180,'Chief executive',{'text-anchor':'middle','font-size':12,'font-weight':700});
  const door=el('rect',{x:420,y:190,width:100,height:150,rx:6,fill:'var(--org-soft)',stroke:'var(--org)'},E);const gap=el('rect',{x:220,y:300,height:40,fill:'var(--err-soft)'},E);const gapT=t_(E,0,0,'social distance',{'text-anchor':'middle','font-size':12,'font-weight':700,fill:'var(--err)'});
  const jr=el('g',{},E);H.person(jr,120,330,'var(--emp)',2.2);t_(jr,120,362,'junior staff',{'text-anchor':'middle','font-size':11.5});
  const eList=el('g',{},E);const eLines=[['Open-door policy','direct to the chief executive; social distance holds staff back'],['Inspector-General method','a senior officer visits each unit at least yearly'],['Ombudsman','independent officer; first used in Sweden in 1809'],['Multi-step procedure','appeal from supervisor upward until resolved'],['Grievance committee','a committee collects and investigates grievances']].map(([a,b],i)=>{const g=el('g',{},eList);box(g,40,70+i*68,520,56,'var(--card)','var(--line)',10);t_(g,60,94+i*68,a,{'font-size':13.5,'font-weight':700,fill:'var(--org)'});t_(g,60,113+i*68,b,{'font-size':11.5});return g;});
  return {update(t){showTabs(tabs,t);bEls.forEach((b,i)=>H.op(b,H.es(t,.1+i*.15,.3+i*.15)));aT.textContent=t<1?'Complaint: expressed dissatisfaction · Grievance: dissatisfaction brought to management':'Why grievances stay bottled up: tolerance, hope it will change, fear of reprisal, fear of criticism';
    const pr=H.es(t,3.05,3.5),rel=H.es(t,3.55,3.95);const lvl=pr*(1-.6*rel);H.set(fill,{y:337-200*lvl,height:200*lvl});needle.setAttribute('transform',`rotate(${-70+140*lvl} 300 90)`);
    puffs.forEach((p,i)=>{H.set(p,{cx:510+i*24+rel*20,cy:158-i*14-rel*10});H.op(p,rel*(1-i*.2));});cT.textContent=rel>.3?'An official outlet releases discontent before it explodes':pr>.3?'Ignored complaints build pressure: morale and productivity fall':'';
    const dp=H.seg(t,4.1,4.9);dEls.forEach((d,i)=>{H.op(d.g,H.es(t,4+i*.15,4.15+i*.15));d.n.textContent=dp>.6?`${counts[i]} reach here`:'';});
    const k=Math.floor(t);const od=k===5;H.op(ceo,od?1:0);H.op(door,od?1:0);H.op(jr,od?1:0);H.op(gap,od?1:0);H.op(gapT,od?1:0);H.op(eList,k>=6?1:0);
    const gw=40+180*H.es(t,5.2,5.8);H.set(gap,{x:300-gw/2,width:gw});H.set(gapT,{x:300,y:290});eT.textContent=od?'Open-door policy':'Approaches to settlement';
    eList.querySelectorAll('g').forEach((g,i)=>H.op(g,k>=6?H.es(t,6+i*.3,6.2+i*.3):0));
  }};
}
Course.add({id:'3.5',module:3,title:'Managing Employee Grievances',vizLabel:'A pressure gauge and an escalation staircase',
  hook:{who:'Sade, nurse in charge',text:'Sade’s ward staff have been unhappy about the night roster for months. Nobody complained formally; they just started calling in sick. When the matron finally heard, three nurses had resigned. Where was the outlet?'},
  objectives:['Distinguish complaints from grievances','Identify sources of grievance','Explain why an open grievance procedure is needed','Describe the four-stage procedure and approaches to settlement'],
  steps:[
    {h:'Complaints and grievances',t:'<p>A <b>complaint</b> is expressed dissatisfaction. Beach (1975) defines a <b>grievance</b> as any dissatisfaction or feeling of injustice in connection with one’s employment that is brought to the attention of management.</p>'},
    {h:'Why grievances stay bottled up',t:'<p>Some employees tolerate frustration; some hope things will change; experience taught some that complaining creates more problems; others fear criticism. So management must provide a reliable official outlet.</p>'},
    {h:'Sources of grievance',t:'<p>Individual and group attitudes; beliefs and perceptions about employee rights; working practices and norms; the relationship between parties, the balance of power and the degree of trust; and the culture of the organisation.</p>'},
    {h:'Why an open procedure is needed',t:'<p>Supervisors may lack human-relations skills or suppress complaints; some staff will not go to an unfriendly supervisor; a procedure brings problems to top management in time; it reduces arbitrary action; being heard improves morale.</p><p>Beach (1975): it works like the <b>pressure release valve on a steam boiler</b>.</p>'},
    {h:'The four-stage procedure',t:'<p><b>1.</b> Raise it orally or in writing with the immediate supervisor. <b>2.</b> If unresolved, request an interview with the manager within at least a week. <b>3.</b> Raise it with general management or the Director. <b>4.</b> With both parties’ agreement, an outside body intervenes: grievance committee, conciliation or arbitration.</p>'},
    {h:'Open-door policy',t:'<p>Any aggrieved staff can go straight to the chief executive, who investigates personally. It looks attractive but rarely works: the <b>social distance</b> between the chief executive and junior staff keeps them from walking through the door.</p>'},
    {h:'Inspector-General and ombudsman',t:'<p>The <b>Inspector-General method</b> borrows from the military: a senior officer visits each unit at least once a year to hear grievances. The <b>ombudsman</b>, first used in Sweden in 1809, is an independent, neutral officer who investigates complaints.</p>'},
    {h:'Multi-step and committee approaches',t:'<p>The <b>multi-step procedure</b> lets the employee appeal from the immediate supervisor up to the highest manager until resolved. A <b>grievance committee</b> collects and investigates grievances, in line with personnel management committees in the Nigerian public service.</p>'}
  ],
  scene:grievScene,
  sandboxIntro:'Set how well each stage resolves grievances and see how many reach arbitration.',
  sandbox(ctl,st){
    const s=H.svg(st,520,320);const r=[60,60,60];let n=100;const ro=H.readout(ctl);
    H.slider(ctl,{id:'s35n',label:'Grievances raised this year',min:10,max:300,step:10,value:100},v=>{n=v;draw();});
    ['Supervisor resolves','Manager resolves','Director resolves'].forEach((l,i)=>H.slider(ctl,{id:'s35r'+i,label:l,min:0,max:100,step:5,value:60,fmt:v=>v+'%'},v=>{r[i]=v;draw();}));
    function draw(){s.innerHTML='';const c=[n];for(let i=0;i<3;i++)c.push(Math.round(c[i]*(1-r[i]/100)));
      c.forEach((v,i)=>{const x=20+i*125,y=270-i*60;el('rect',{x,y,width:110,height:300-y,rx:6,fill:i===3?'var(--err-soft)':'var(--org-soft)'},s);t_(s,x+55,y+26,String(v),{'text-anchor':'middle','font-size':18,'font-weight':700,class:'mono'});t_(s,x+55,y+44,['Stage 1','Stage 2','Stage 3','Stage 4'][i],{'text-anchor':'middle','font-size':11});});
      ro.innerHTML=`<b>${c[3]}</b> of ${n} grievances reach an outside body.<br>${c[3]/n>.2?'Too many: train supervisors in human relations so problems are settled early.':'Most grievances are settled inside the organisation.'}`;}
    draw();H.tag(st,'Illustrative model');
  },
  sae:{q:'Why do many employee grievances stay unexpressed?',a:['High tolerance for frustration','Hope that the situation will soon change','Experience that complaints create more problems or hatred','Fear of attracting criticism from others']},
  tma:{q:'Why should an organisation, as a matter of policy, have an open system of grievance procedure?',outline:['Define grievance (Beach, 1975)','Supervisors may lack human-relations skill or suppress complaints','Some staff avoid unfriendly supervisors','Brings problems to top management in time','Safety valve for frustration (steam boiler analogy)','Reduces arbitrary supervisor action','Being heard improves morale','Close with the four-stage procedure']},
  quiz:[
    {q:'Beach compares a grievance procedure to…',o:['A ladder','A pressure release valve on a steam boiler','A funnel','A bathtub'],a:1,w:'It releases built-up frustration through an official channel.'},
    {q:'In stage 2 of the procedure, the employee should…',o:['Go to court','Request an interview with the manager within at least one week','Resign','Write to the union'],a:1,w:'Stage 2 is an interview with the manager.'},
    {q:'Why does the open-door policy often fail?',o:['It is too expensive','Social distance stops junior staff using it','It is illegal','Managers are always absent'],a:1,w:'Junior staff may not feel free or brave enough to approach the chief executive.'},
    {q:'The ombudsman idea was first used in…',o:['Nigeria, 1960','Britain, 1902','Sweden, 1809','USA, 1954'],a:2,w:'Sweden, 1809, to process citizens’ complaints against the government.'}
  ],
  card:[{h:'Four-stage grievance procedure',ordered:true,items:['Immediate supervisor','Manager (interview within a week)','General management or Director','Outside body: committee, conciliation, arbitration']},
    {h:'Approaches to settlement',items:['Open-door policy','Inspector-General method','Ombudsman','Multi-step procedure','Grievance committee']},
    {h:'Sources of grievance',items:['Attitudes','Beliefs about rights','Working practices and norms','Relationships, power, trust','Culture']}]
});
})();
