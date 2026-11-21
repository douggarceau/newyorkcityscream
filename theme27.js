/* 2027 theme, shared by all three city sites. Site settings come from window.T27 = {a:accent, k:'kicker', n:'NAME', tz:'America/New_York'} */
window.WO_CATS=[['Live Music',/^(live|rock|indie|jazz|pop|electronic|folk|r&b|latin|metal|hip-hop|punk|experimental|world|goth|country|blues|soul|reggae|funk)$/i],['Comedy',/^comedy$/i],['Shows',/^(theater|dance|classical|opera|stage)$/i],['Film',/^film$/i],['Art',/^(arts|art)$/i],['Nightlife',/^(clubs|club|nightlife)$/i],['Food & Drink',/^(food|drink|dining)$/i],['Outdoors',/^recreation$/i],['Talks & Books',/^talks$/i]];
window.WO_OTHER='More Events';window.WO_SKIP=/^(sports|support|worship|drag)$/i;
(function(){
const C=window.T27||{};const R=document.documentElement;
R.setAttribute('data-t27','');R.style.setProperty('--a',C.a||'#E10600');
const f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap';document.head.appendChild(f);
/* calendar filter hook used by vCal: music only, or the weekend */
const MUS=/^(live|rock|indie|jazz|pop|electronic|folk|r&b|latin|metal|hip-hop|punk|experimental|world|goth|country|music|blues|soul|reggae|funk|classical|clubs)$/i;
let MODE=null,WK=null,SF=null;window.T27S=s=>SF?SF(s):true;
window.T27F=e=>{if(MODE==='music')return MUS.test(e.genre||'');if(MODE==='wk'&&WK)return e.date>=WK[0]&&e.date<=WK[1];return true};
const TZ=C.tz||'America/New_York';const ymd=d=>d.toLocaleDateString('en-CA',{timeZone:TZ});
function weekend(){const n=new Date(),td=ymd(n),dow=new Date(td+'T12:00:00').getDay();const a=(k)=>ymd(new Date(n.getTime()+k*864e5));
 const fri=dow===0?a(-2):dow===6?a(-1):a(5-dow);const sun=dow===0?td:dow===6?a(1):a(7-dow);return [fri<td?td:fri,sun]}
const ITEMS=[
 ['Now',()=>nav('front')],
 ['News',()=>nav('stories')],
 ['Music',()=>nav('cal','music',30)],
 ['Tech',()=>{SF=s=>/^tech-/.test(s.slug)||/\b(AI|robot|tech)\b/i.test(s.title||'');nav('stories')}],
 ['Tonight',()=>nav('cal',null,1)],
 ['This Week',()=>nav('cal',null,7)],
 ['Weekend',()=>{WK=weekend();nav('cal','wk',14)}],
 ['Explore',()=>nav('visit')]];
function nav(v,mode,days){MODE=mode||null;try{STATE.genre='all';STATE.cq='';if(days)STATE.cdays=days;else STATE.cdays=14}catch(_){}
 try{go(v)}catch(e){const b=document.querySelector('#nav [data-go="'+v+'"]');if(b)b.click()}}
let cur='Now';
function mark(){document.querySelectorAll('#nav .nb27').forEach(b=>b.toggleAttribute('aria-current',b.textContent===cur))}
function build(){
 const m=document.querySelector('header.mast');
 if(m&&!m.querySelector('.wm27')){const w=document.createElement('a');w.className='wm27';w.href='/';w.setAttribute('aria-label',(C.k||'')+' '+(C.n||''));
  w.innerHTML='<span class="k"><i></i>'+(C.k||'')+'</span><span class="n">'+(C.n||'')+'</span><span class="r"></span>';
  w.onclick=e=>{e.preventDefault();cur='Now';mark();nav('front')};(m.querySelector('div')||m).appendChild(w)}
 const n=document.getElementById('nav');
 if(n&&!n.querySelector('.nb27')){ITEMS.forEach(([t,fn],i)=>{const b=document.createElement('button');b.type='button';b.className='nb27';b.textContent=t;b.style.order=i;
  b.onclick=()=>{cur=t;mark();if(t!=='Tech')SF=null;fn()};n.appendChild(b)});mark()}
 const ft=document.querySelector('footer.site-footer');
 if(ft&&!ft.querySelector('.ft27')){const d=document.createElement('div');d.className='ft27';
  d.innerHTML=(C.sis||[]).map(s=>'<a href="'+s[1]+'">'+s[0]+'</a>').join('')+'<button type="button" data-g="advertise">Advertising</button><button type="button" data-g="privacy">Privacy &amp; Contact</button>';
  d.querySelectorAll('button').forEach(b=>b.onclick=()=>{cur='';mark();try{go(b.dataset.g)}catch(_){}});ft.insertBefore(d,ft.firstChild)}
 dress();fonts()}
/* any old serif or display face left over from earlier styling switches to the new faces */
const OLD=/Georgia|Playfair|PT Serif|Libre Caslon|Bodoni|Abril|DM Serif|Old Standard|Cinzel|Marcellus|Satisfy|Special Elite|Cormorant|Alfa Slab|Oswald|Anton|Bebas|Times|serif$/i;
function fonts(){document.body.querySelectorAll(':is(b,strong,span,a,h1,h2,h3,h4,p,button,div,small,i,em,li,summary,label):not([data-f27])').forEach(e=>{e.dataset.f27='';const cs=getComputedStyle(e);if(OLD.test(cs.fontFamily)){e.style.setProperty('font-family',parseFloat(cs.fontSize)>=17?'"Space Grotesk","Inter",system-ui,sans-serif':'"Inter",system-ui,sans-serif','important');e.style.setProperty('font-style','normal','important')}})}
/* backgrounds for the flipping boxes */
const BG=['bg41-data-mesh','bg42-wireframe-terrain','bg43-graphite-gradient','bg44-particle-field','bg45-glass-panels','bg46-lidar-scan','bg47-liquid-chrome','bg48-aurora-edge','bg49-led-dot-matrix','bg50-orbit-lines'];
let bi=Math.floor(Math.random()*BG.length);
function dress(){document.querySelectorAll('.bp:not([data-b27]),.ep.os:not([data-b27]),.lspot .ep:not([data-b27])').forEach(el=>{el.dataset.b27='1';el.style.setProperty('--b27','url(/img/bg27/'+BG[bi++%BG.length]+'.jpg)')})}
const go_=()=>{build();new MutationObserver(()=>{clearTimeout(go_.t);go_.t=setTimeout(build,60)}).observe(document.body,{childList:true,subtree:true})};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go_):go_();
})();
