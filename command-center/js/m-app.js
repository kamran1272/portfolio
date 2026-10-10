/* Magsi Digital Command Center — mobile app shell (v1.0) */
(function(){
'use strict';
var NS = window.MApp = {};
var view = document.getElementById('mview');
var cur = 'dashboard', curDetail = null;
NS.cur = function(){ return cur; };

function go(name, arg, opts){
  opts = opts || {};
  /* v1.3.2: the new view is rendered into a DETACHED container first, then
     swapped into #mview within the same task. The live document never
     collapses, so the scroll offset is never disturbed — a live refresh
     updates numbers in place instead of throwing the user back to the top.
     (The old code wiped #mview first; on Android's WebView the native scroll
     offset got clamped to the collapsed height and the synchronous
     scrollTo restore was lost when layout settled.) */
  var keepY = opts.keepScroll ? (window.scrollY || window.pageYOffset || 0) : 0;
  /* Preserve the agents/leads search text across a refresh rebuild. */
  var qEl = document.getElementById('mld-q') || document.getElementById('mag-q');
  var qId = qEl ? qEl.id : null, qVal = qEl ? qEl.value : '',
      qFocus = !!(qEl && document.activeElement === qEl);
  cur = name; curDetail = arg || null;
  document.querySelectorAll('#mtabs a').forEach(function(a){
    a.classList.toggle('on', a.dataset.k === name ||
      (name==='agent' && a.dataset.k==='agents') ||
      (name==='lead' && a.dataset.k==='leads'));
  });
  var M = window.MViews || {};
  var fn = M[name];
  if (fn){
    /* Quiet-refresh flag: views skip decorative animation on live refresh
       (charts render at final state instead of replaying). */
    window.__mQuietRefresh = !!opts.keepScroll;
    try {
      var tmp = document.createElement('div');
      fn(tmp, arg);
      view.innerHTML = '';
      while (tmp.firstChild) view.appendChild(tmp.firstChild);
    } finally {
      window.__mQuietRefresh = false;
    }
  }
  /* Restore the search text the rebuild just replaced. */
  if (qId){
    var nq = document.getElementById(qId);
    if (nq){
      nq.value = qVal;
      if (qVal) nq.dispatchEvent(new Event('input', {bubbles:true}));
      if (qFocus){ try { nq.focus({preventScroll:true}); } catch(_){ try{ nq.focus(); }catch(__){} } }
    }
  }
  if (opts.keepScroll){
    /* Safety net: re-assert the position after layout, for WebViews whose
       native scroll state needs it. */
    requestAnimationFrame(function(){
      window.scrollTo(0, keepY);
      var se = document.scrollingElement || document.documentElement;
      if (se) se.scrollTop = keepY;
    });
  } else {
    window.scrollTo(0, 0);
  }
}
NS.go = go;

/* v1.3: tapping the bell toggles the Alerts view — tap again to close it. */
NS.toggleAlerts = function(){
  if (cur === 'alerts') go('dashboard');
  else go('alerts');
};

document.querySelectorAll('#mtabs a').forEach(function(a){
  a.addEventListener('click', function(){ go(a.dataset.k); });
});

window.addEventListener('mfeedupdate', function(){ MStore.tick(); go(cur, curDetail, { keepScroll: true }); });
window.addEventListener('mfeedstale', function(){ setHealth('stale'); });
window.addEventListener('mfeederror', function(){ setHealth('err'); });

function setHealth(s){
  var d = document.getElementById('mhealth');
  if (d) d.className = 'mdot ' + (s==='ok'?'on':s==='stale'?'warn':'bad');
}

function start(){
  var cfg = (typeof window.MAGSI_CONFIG !== 'undefined') ? window.MAGSI_CONFIG : null;
  if (!cfg){ document.getElementById('masof').textContent = 'NO CONFIG'; return; }
  setHealth('ok');
  go('dashboard');
  if (window.MFeed) MFeed.start();
  else {
    setTimeout(function(){
      if (window.MFeed) MFeed.start(); else setHealth('err');
    }, 1500);
  }
}

NS.detail = function(type, id){ go(type, id); };
NS.back = function(to){ go(to || 'dashboard'); };
NS.health = setHealth;

document.addEventListener('DOMContentLoaded', start);
})();
