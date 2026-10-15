(function(){
  const toggle=document.querySelector('.menu-toggle');
  const links=document.querySelector('.nav-links');
  if(toggle&&links){
    toggle.addEventListener('click',()=>{
      const open=links.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
      toggle.textContent=open?'×':'☰';
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Открыть меню');
      toggle.textContent='☰';
    }));
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
    revealItems.forEach(item=>observer.observe(item));
  }else revealItems.forEach(item=>item.classList.add('is-visible'));
  const cards=document.querySelectorAll('.product-visual');
  cards.forEach(card=>{
    card.addEventListener('pointermove',event=>{
      if(event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      const rect=card.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      const shape=card.querySelector('.product-shape');
      if(shape)shape.style.translate=(x*9)+'px '+(y*9)+'px';
    });
    card.addEventListener('pointerleave',()=>{
      const shape=card.querySelector('.product-shape');
      if(shape)shape.style.translate='';
    });
  });
})();