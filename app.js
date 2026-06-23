/* loading screen */
(function(){
  const ld=document.getElementById('loader'),fl=document.getElementById('ldFill');
  let p=0,done=false;
  const iv=setInterval(()=>{p=Math.min(p+4+Math.random()*10,86);fl.style.width=p+'%';},160);
  function fin(){if(done)return;done=true;clearInterval(iv);fl.style.width='100%';
    setTimeout(()=>{ld.classList.add('done');setTimeout(()=>ld.remove(),1100);},500);}
  addEventListener('load',fin);
  setTimeout(fin,6000);
})();
function star(size,color,op){op=op===undefined?1:op;return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 100 100" fill="'+color+'" style="opacity:'+op+'"><path d="M50 0 C55 40 60 45 100 50 C60 55 55 60 50 100 C45 60 40 55 0 50 C40 45 45 40 50 0 Z"/></svg>';}
document.querySelectorAll('.roll').forEach(el=>{const t=el.textContent;el.textContent='';[...t].forEach((ch,i)=>{const c=document.createElement('span');c.className='c';c.style.setProperty('--i',i);const a=document.createElement('span');a.textContent=ch===' '?'\u00a0':ch;const b=document.createElement('span');b.textContent=ch===' '?'\u00a0':ch;c.append(a,b);el.append(c);});});
const fx=document.getElementById('fx');
for(let i=0;i<42;i++){const s=document.createElement('div');s.className='pstar';const sz=2+Math.random()*3,o=.25+Math.random()*.45;s.innerHTML=star(sz,Math.random()>.5?'#e3c98f':'#b3a8c8',1);s.style.left=Math.random()*100+'vw';s.style.top=Math.random()*100+'vh';s.style.setProperty('--o',o);s.style.opacity=o;s.style.animation='twk '+(3+Math.random()*4)+'s ease-in-out '+(-Math.random()*4)+'s infinite';fx.appendChild(s);}
function riseStar(){const s=document.createElement('div');s.className='pstar';const sz=3+Math.random()*8;s.innerHTML=star(sz,Math.random()>.5?'#c9a96a':'#9488ad',1);s.style.left=Math.random()*100+'vw';s.style.top='108%';s.style.setProperty('--s',.6+Math.random());s.style.setProperty('--o',.2+Math.random()*.35);const d=12+Math.random()*10;s.style.animation='rise '+d+'s linear forwards';fx.appendChild(s);setTimeout(()=>s.remove(),d*1000);}
setInterval(riseStar,1300);
addEventListener('load',()=>document.getElementById('mandala').classList.add('show'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
/* profile tabs */
document.querySelectorAll('.ptab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.ptab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.ppanel').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');document.getElementById(t.dataset.tab).classList.add('active');
}));
/* costume switcher */
document.querySelectorAll('.psw').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.psw').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.cos').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');document.querySelector('.'+b.dataset.cos).classList.add('active');
}));
const parEls=[...document.querySelectorAll('[data-par]')];let mx=0,my=0,cmx=0,cmy=0;
addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;cur.style.opacity='1';tx=e.clientX;ty=e.clientY;});
(function p(){cmx+=(mx-cmx)*.05;cmy+=(my-cmy)*.05;for(const el of parEls){const f=+el.getAttribute('data-par');el.style.setProperty('--px',(cmx*-f)+'px');el.style.setProperty('--py',(cmy*-f)+'px');}requestAnimationFrame(p);})();
const cur=document.getElementById('cursor');let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
addEventListener('mouseleave',()=>cur.style.opacity='0');
(function loop(){cx+=(tx-cx)*.5;cy+=(ty-cy)*.5;cur.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>cur.classList.add('hot'));el.addEventListener('mouseleave',()=>cur.classList.remove('hot'));});
const modal=document.getElementById('giftModal');
document.getElementById('giftBtn').addEventListener('click',()=>modal.classList.add('open'));
document.getElementById('mClose').addEventListener('click',()=>modal.classList.remove('open'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open');});
addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open');});
/* stream-tag modal */
(function(){
  const tagData={
    sharnoth:{t:'#シャルノスグレナデン',
      d:'グッズ届いた報告など幅広くご活用ください🎶',
      u:'https://x.com/hashtag/%E3%82%B7%E3%83%A3%E3%83%AB%E3%83%8E%E3%82%B9%E3%82%B0%E3%83%AC%E3%83%8A%E3%83%87%E3%83%B3?src=hashtag_click'},
    grefix:{t:'#グレフィックス',
      d:'ファンアートタグ。<br>描いてくれたら見せてくれると嬉しいです！<br>愛があるものでお願いいたします。<br>未成年の深徒に配慮お願いいたします。',
      u:'https://x.com/hashtag/%E3%82%B0%E3%83%AC%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%B9?src=hashtag_click&f=live'},
    kuenaden:{t:'#食えナデン',
      d:'飯テロ用タグ。豪華じゃなくても大丈夫！<br>みんなのご飯を見せてください✨️<br>不定期に配信で紹介させていただいてますのでよろしくね。<br>鍵アカ投稿やシャドバン疑惑の方は、私へのメンション付きが良いかもしれません！',
      u:'https://x.com/hashtag/%E9%A3%9F%E3%81%88%E3%83%8A%E3%83%87%E3%83%B3?src=hashtag_click&f=live'}
  };
  const tm=document.getElementById('tagModal'),tt=document.getElementById('tagTitle'),
        td=document.getElementById('tagDesc'),tl=document.getElementById('tagLink'),
        tc=document.getElementById('tagClose');
  function close(){tm.classList.remove('open');}
  document.querySelectorAll('.tag-chip').forEach(b=>b.addEventListener('click',()=>{
    const d=tagData[b.dataset.tag];if(!d)return;
    tt.textContent=d.t;td.innerHTML=d.d;tl.href=d.u;tm.classList.add('open');
  }));
  tc.addEventListener('click',close);
  tm.addEventListener('click',e=>{if(e.target===tm)close();});
  addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();
/* creator works modal */
(function(){
  const creatorData={
    illust:{title:'Illustration',sub:'イラスト制作実績',items:[
      {date:'2026.03.29',title:'しあん様 ずっと前から嫌いでした。/feat.アレナ',desc:'イラスト担当',url:'https://www.youtube.com/watch?v=-BUa1zSB7wU'},
      {date:'2025.07.30',title:'VTuber グレナデンシロップ 2ndModelβ',desc:'デザイン／イラスト／モデリング担当',url:'https://xfolio.jp/zh-CHT/portfolio/grenadinesyrup/works/4889959'},
      {date:'2025.07.10',title:'藍白ゼノ様 マップ隠し用SDイラスト',desc:'イラスト担当',url:'https://x.com/AiziroXeno/status/1943272856781230569'},
      {date:'2025.02.24',title:'しあん様 オリジナル制作楽曲「好きすぎて、狂っているのです。」/xian（feat.みつめ）',desc:'イラスト担当',url:'https://www.youtube.com/watch?v=52KzUOmwNXo'},
      {date:'2024.04.27',title:'VTuber グレナデンシロップ 1stModel',desc:'デザイン／イラスト／モデリング担当',url:'https://xfolio.jp/zh-CHT/portfolio/grenadinesyrup/works/4116768'}
    ]},
    live2d:{title:'Live2D',sub:'Live2Dモデル制作・リギング実績',items:[
      {date:'2025.07.30',title:'VTuber グレナデンシロップ 2ndModelβ',desc:'デザイン／イラスト／モデリング担当',url:'https://xfolio.jp/zh-CHT/portfolio/grenadinesyrup/works/4889959'},
      {date:'2024.04.27',title:'VTuber グレナデンシロップ 1stModel',desc:'デザイン／イラスト／モデリング担当',url:'https://xfolio.jp/zh-CHT/portfolio/grenadinesyrup/works/4116768'}
    ]},
    mv:{title:'Movie',sub:'ミュージックビデオ・映像制作実績',items:[
      {date:'2026.06.22',title:'Petrich∅r様　ネガティヴ・ヴェンジェンス',desc:'動画担当',url:'https://www.youtube.com/watch?v=dF2RJVOgbQY&feature=youtu.be'},
      {date:'2026.03.29',title:'しあん様 ずっと前から嫌いでした。/feat.アレナ',desc:'動画担当',url:'https://www.youtube.com/watch?v=-BUa1zSB7wU'},
      {date:'2026.03.10',title:'しあん様 個人VTuber地下アイドルプロジェクト「Petrich∅r」',desc:'動画担当',url:'https://www.youtube.com/watch?v=PBT4m17qg1U'},
      {date:'2025.09.10',title:'しあん様 重音テトオリジナル楽曲「L∞P」',desc:'動画担当',url:'https://www.youtube.com/watch?v=xkUnin_NPB0'},
      {date:'2025.09.10',title:'カイロ・ヒエショ様 Cover「少女レイ」',desc:'動画担当',url:'https://www.youtube.com/watch?v=9jjx1ZQki-Q'},
      {date:'2025.04.28',title:'しあん様 重音テトオリジナル楽曲「Love Toxxxic」',desc:'動画担当',url:'https://www.youtube.com/watch?v=YlHlHD-RwUc'}
    ]}
  };
  const wm=document.getElementById('worksModal'),wt=document.getElementById('worksTitle'),
        ws=document.getElementById('worksSub'),wl=document.getElementById('worksList'),
        wc=document.getElementById('worksClose');
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function close(){wm.classList.remove('open');}
  document.querySelectorAll('.cat-chip').forEach(b=>b.addEventListener('click',()=>{
    const d=creatorData[b.dataset.cat];if(!d)return;
    wt.textContent=d.title;ws.textContent=d.sub;
    wl.innerHTML=d.items.map(it=>'<a class="wm-item" href="'+it.url+'" target="_blank" rel="noopener"><div class="wm-date">'+it.date+'</div><div class="wm-title">'+esc(it.title)+'<span class="wm-arrow">→</span></div><div class="wm-desc">'+esc(it.desc)+'</div></a>').join('');
    wm.classList.add('open');
  }));
  wc.addEventListener('click',close);
  wm.addEventListener('click',e=>{if(e.target===wm)close();});
  addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();
/* portfolio modal */
(function(){
  /* ▼▼ ここに作品を追加してください（img:画像URL, title:作品名, url:リンク先［任意］） ▼▼ */
  const portfolioItems=[
    { section:'Illustration ／ イラスト' },
    { title:'TRPG PC「孤立院深影」（差分あり）', imgs:[
        'images/portfolio/kuritsuin/01.png','images/portfolio/kuritsuin/02.png',
        'images/portfolio/kuritsuin/03.png','images/portfolio/kuritsuin/04.png',
        'images/portfolio/kuritsuin/05.png','images/portfolio/kuritsuin/smile.png',
        'images/portfolio/kuritsuin/yami.png','images/portfolio/kuritsuin/hakkyo.png'] },
    { img:'images/portfolio/grenadine-2nd.png', title:'グレナデンシロップ 2nd Model' },
    { img:'images/portfolio/grenadine-movie-limited.png', title:'グレナデンシロップ Movie Limited' },
    { img:'images/portfolio/tsukino-mito-chibi.png', title:'にじさんじ 月ノ美兎 ミニキャラファンアート' },
    { img:'images/portfolio/mitsume-sukisugite.png', title:'xian様『好きすぎて、狂っているのです。』歌唱担当：みつめ様' },
    { img:'images/portfolio/xeno-map.png', title:'藍白ゼノ様 マップ隠し用イラスト' },
    { img:'images/portfolio/mizugi2.png', title:'グレナデンシロップ 水着イラスト' },
    { section:'Movie ／ 動画担当' },
    { type:'video', yt:'9jjx1ZQki-Q', title:'少女レイ / みきとP (Cover) — カイロ・ヒエショ' },
    { type:'video', yt:'dF2RJVOgbQY', title:'ネガティヴ・ヴェンジェンス / Petrich∅r' },
  ];
  /* ▲▲ 画像は サイトフォルダ内に置いて相対パスで指定するのがおすすめです ▲▲ */
  const pm=document.getElementById('portfolioModal'),pg=document.getElementById('portfolioGrid'),
        pc=document.getElementById('portfolioClose'),ob=document.getElementById('openPortfolio');
  function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function render(){
    if(!portfolioItems.length){pg.innerHTML='<div class="pf-empty">作品は準備中です。<br>近日公開予定です ✦</div>';return;}
    pg.innerHTML=portfolioItems.map((it,i)=>{
      if(it.section)return '<div class="pf-section">'+esc(it.section)+'</div>';
      if(it.type==='video'){
        return '<button class="pf-item pf-video" data-i="'+i+'"><img src="https://img.youtube.com/vi/'+esc(it.yt)+'/hqdefault.jpg" alt="'+esc(it.title)+'" loading="lazy">'+
          (it.title?'<span class="pf-cap">'+esc(it.title)+'</span>':'')+'<span class="pf-play">▶</span></button>';
      }
      const imgs=(it.imgs&&it.imgs.length)?it.imgs:[it.img];
      const badge=imgs.length>1?'<span class="pf-multi">'+imgs.length+'</span>':'';
      return '<button class="pf-item" data-i="'+i+'"><img src="'+esc(imgs[0])+'" alt="'+esc(it.title)+'" loading="lazy">'+
        (it.title?'<span class="pf-cap">'+esc(it.title)+'</span>':'')+badge+'<span class="pf-zoom">⤢</span></button>';
    }).join('');
  }
  /* lightbox (enlarge on click; thumbnail strip for multi-image items) */
  const lb=document.getElementById('pfLightbox'),lbImg=document.getElementById('pfLightImg'),
        lbCap=document.getElementById('pfLightCap'),lbClose=document.getElementById('pfLightClose'),
        lbThumbs=document.getElementById('pfLightThumbs'),lbVideo=document.getElementById('pfLightVideo');
  function setMain(src){lbImg.src=src;[...lbThumbs.children].forEach(c=>c.classList.toggle('active',c.dataset.src===src));}
  function openLb(it){
    lbCap.textContent=it.title||'';
    if(it.type==='video'){
      lbImg.style.display='none';lbThumbs.innerHTML='';lbThumbs.style.display='none';
      lbVideo.style.display='block';
      lbVideo.innerHTML='<iframe src="https://www.youtube.com/embed/'+esc(it.yt)+'?autoplay=1&rel=0" title="'+esc(it.title||'')+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      lb.classList.add('open');return;
    }
    lbVideo.style.display='none';lbVideo.innerHTML='';lbImg.style.display='';
    const imgs=(it.imgs&&it.imgs.length)?it.imgs:[it.img];
    lbImg.alt=it.title||'';
    if(imgs.length>1){
      lbThumbs.innerHTML=imgs.map(s=>'<button class="pf-thumb" data-src="'+esc(s)+'"><img src="'+esc(s)+'" alt="" loading="lazy"></button>').join('');
      lbThumbs.style.display='flex';
    }else{lbThumbs.innerHTML='';lbThumbs.style.display='none';}
    setMain(imgs[0]);
    lb.classList.add('open');
  }
  function closeLb(){lb.classList.remove('open');lbImg.src='';lbVideo.innerHTML='';}
  lbThumbs.addEventListener('click',e=>{const t=e.target.closest('.pf-thumb');if(t)setMain(t.dataset.src);});
  pg.addEventListener('click',e=>{const b=e.target.closest('.pf-item');if(!b)return;const it=portfolioItems[+b.dataset.i];if(it)openLb(it);});
  lbClose.addEventListener('click',closeLb);
  lb.addEventListener('click',e=>{if(e.target===lb)closeLb();});
  function close(){pm.classList.remove('open');}
  if(ob)ob.addEventListener('click',()=>{render();pm.classList.add('open');});
  pc.addEventListener('click',close);
  pm.addEventListener('click',e=>{if(e.target===pm)close();});
  addEventListener('keydown',e=>{if(e.key==='Escape'){if(lb.classList.contains('open'))closeLb();else close();}});
})();
/* goods gallery (Profile › Goods タブ) */
(function(){
  /* ▼▼ 商品を追加：img=画像パス, title=商品名, url=BOOTH商品ページ ▼▼
     画像は images/goods/ に置いて相対パスで指定してください */
  const goodsItems=[
    // { img:'images/goods/kei-acrylic.png', title:'ケイくん アクリルキーホルダー', url:'https://gren.booth.pm/items/0000000' },
  ];
  const gg=document.getElementById('goodsGrid');
  if(!gg)return;
  function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  if(!goodsItems.length){gg.style.display='none';return;}
  gg.innerHTML=goodsItems.map(it=>
    '<a class="pf-item" href="'+esc(it.url||'https://gren.booth.pm/')+'" target="_blank" rel="noopener"><img src="'+esc(it.img)+'" alt="'+esc(it.title)+'" loading="lazy">'+
    (it.title?'<span class="pf-cap">'+esc(it.title)+'</span>':'')+'</a>'
  ).join('');
})();
/* nav scroll */
(function(){const nav=document.querySelector('nav');function upd(){nav.classList.toggle('scrolled',scrollY>40);}addEventListener('scroll',upd,{passive:true});upd();})();
