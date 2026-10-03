let bar = document.querySelector('.bar-fill');
let ldr = document.querySelector('#loader');
let hro = document.querySelector('.hero');
let cur = document.querySelector('.glass-cursor');
let spl = document.querySelector('#spl');
let ind = document.querySelector('.act-ind');

let mx = 0, my = 0, cx = 0, cy = 0;
let curAct = -1;

let urls = [
  'https://prod.spline.design/6Wq1Q7YGyM-mab63/scene.splinecode',
  'https://prod.spline.design/Nmx4Vyeze9wJ-9zm/scene.splinecode',
  'https://prod.spline.design/joLpOOYbGL-10EJ4/scene.splinecode',
  'https://prod.spline.design/kZ3S91qG4E-391kL/scene.splinecode'
];

let acts = ['ACT I', 'ACT II', 'ACT III', 'ACT IV'];

function run() {
  if (typeof anime !== 'undefined') {
    anime({
      targets: bar,
      width: '100%',
      duration: 2500,
      easing: 'easeInOutQuad',
      complete: () => {
        anime({
          targets: ldr,
          opacity: 0,
          duration: 800,
          easing: 'easeInOutQuad',
          complete: () => {
            ldr.style.display = 'none';
            anime({
              targets: hro,
              opacity: 1,
              translateY: 0,
              duration: 1000,
              easing: 'easeOutQuad'
            });
          }
        });
      }
    });
  } else {
    bar.style.transition = 'width 2.5s ease';
    bar.style.width = '100%';
    setTimeout(() => {
      ldr.style.transition = 'opacity 0.8s ease';
      ldr.style.opacity = '0';
      setTimeout(() => {
        ldr.style.display = 'none';
        hro.style.transition = 'opacity 1s ease, transform 1s ease';
        hro.style.opacity = '1';
        hro.style.transform = 'translateY(0)';
      }, 800);
    }, 2500);
  }
}

window.addEventListener('DOMContentLoaded', run);

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function draw() {
  if (cur) {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cur.style.left = cx + 'px';
    cur.style.top = cy + 'px';
  }
  requestAnimationFrame(draw);
}
draw();

let pairs = Array.from(document.querySelectorAll('.line-pair'));

let obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('actv');
      let idx = pairs.indexOf(e.target);
      let act = Math.floor(idx / 4);
      if (act !== curAct && urls[act]) {
        curAct = act;
        if (spl) spl.setAttribute('url', urls[act]);
        if (ind) ind.textContent = acts[act];
      }
    } else {
      e.target.classList.remove('actv');
    }
  });
}, { threshold: 0.5 });

pairs.forEach(el => obs.observe(el));