/* MNotify — mobile notification detail modal (v1.0) */
(function(){
'use strict';
function closeModal(){
  var m = document.getElementById('nmodal');
  if (m) m.remove();
}
function open(n){
  try { _open(n); } catch(_){
    /* Never let a tap die silently — show at least the title/body. */
    try {
      alert((n && n.title ? n.title + '\n\n' : '') + (n && (n.body_full || n.body) || ''));
    } catch(__){}
  }
}
/* v1.3: shows the FULL body text (n.body_full when present — list rows stay
   truncated, the popup never is) and an optional action button (used by the
   OTA update notification's UPDATE NOW). */
function _open(n){
  if (!n) return;
  n.read = true;
  try { markRead(n.id); } catch(_){}
  closeModal();
  var esc = MStore.esc;
  var fullBody = (n.body_full != null && n.body_full !== '') ? n.body_full : (n.body || '');
  var det = (Array.isArray(n.detail) ? n.detail : [])
    .filter(function(x){ return x && x[1] && x[1] !== '···'; })
    .map(function(x){
      return '<div class="mrow"><span>'+esc(x[0])+'</span><b>'+esc(x[1])+'</b></div>';
    }).join('');
  var m = document.createElement('div');
  m.id = 'nmodal'; m.className = 'noverlay';
  m.innerHTML = '<div class="nmodal" role="dialog" aria-modal="true">'
    + '<div class="nmhead"><span class="nic">'+esc(n.icon || '🔔')+'</span><b>'+esc(n.title || 'Notification')+'</b>'
    + '<a class="nx" id="nx" title="Close">✕</a></div>'
    + '<div class="nmat">'+esc(n.at || '')+'</div>'
    + '<div class="nmbody">'+esc(fullBody)+'</div>'
    + (det ? '<div class="mdet">'+det+'</div>' : '')
    + (n.actionLabel ? '<button class="mbtn" id="nact" style="margin-top:14px;width:100%">'+esc(n.actionLabel)+'</button>' : '')
    + '<div id="uStatus" style="display:none;margin-top:10px"></div>'
    + '</div>';
  m.addEventListener('click', function(e){ if (e.target === m) closeModal(); });
  document.body.appendChild(m);
  document.getElementById('nx').addEventListener('click', closeModal);
  if (n.actionLabel){
    var b = document.getElementById('nact');
    if (b) b.addEventListener('click', function(){
      try {
        if (n.kind === 'update' && window.MUpdate) MUpdate.startUpdate(n.update);
      } catch(_){}
    });
  }
}
document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeModal(); });

/* Local notification store + feed diffing (v1.0).
   The sheet feed carries no notification list, so the app generates them
   locally: new errors, new strikes, and agents flipping to an error state.
   Persisted in localStorage so read-state survives restarts. */
var LS_KEY = 'mnotif_v1', MAXN = 30;
function loadN(){
  try { var a = JSON.parse(localStorage.getItem(LS_KEY) || '[]'); return Array.isArray(a) ? a : []; }
  catch(_){ return []; }
}
function saveN(a){
  try { localStorage.setItem(LS_KEY, JSON.stringify(a.slice(0, MAXN))); } catch(_){}
}
function push(n, silent){
  var a = loadN();
  if (a.some(function(x){ return x.sig === n.sig; })) return;
  n.id = n.id || ('n' + Date.now() + Math.floor(Math.random()*1e6));
  n.at = n.at || new Date().toLocaleString();
  n.read = false;
  a.unshift(n);
  saveN(a);
  try { MStore._renderBell(); } catch(_){}
  if (silent) return;
  showToast(n);
  /* Real Android notification when the app is in the background.
     MainActivity exposes AndroidBridge.notify() via a JavascriptInterface. */
  try {
    if (document.hidden && window.AndroidBridge && AndroidBridge.notify){
      AndroidBridge.notify(String(n.title || 'Magsi Command Center'), String(n.body || '').slice(0, 180));
    }
  } catch(_){}
}
/* Slide-down in-app toast for new notifications (v1.1) */
var toastTimer = null;
function showToast(n){
  try {
    var old = document.getElementById('mtoast');
    if (old) old.remove();
    if (toastTimer){ clearTimeout(toastTimer); toastTimer = null; }
    var t = document.createElement('div');
    t.id = 'mtoast'; t.className = 'mtoast';
    t.innerHTML = '<div class="mt-ic">' + MStore.esc(n.icon || '🔔') + '</div>'
      + '<div class="grow"><b>' + MStore.esc(n.title || 'Notification') + '</b>'
      + '<span>' + MStore.esc(String(n.body || '').slice(0, 90)) + '</span></div>';
    t.addEventListener('click', function(){
      t.remove();
      if (window.MApp) MApp.go('alerts');
    });
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('show'); });
    toastTimer = setTimeout(function(){
      t.classList.remove('show');
      setTimeout(function(){ try { t.remove(); } catch(_){} }, 350);
    }, 4500);
  } catch(_){}
}
function markRead(id){
  var a = loadN(), changed = false;
  a.forEach(function(x){ if (x.id === id && !x.read){ x.read = true; changed = true; } });
  if (changed){ saveN(a); try { MStore._renderBell(); } catch(_){} }
}
function markAllRead(){
  var a = loadN(), changed = false;
  a.forEach(function(x){ if (!x.read){ x.read = true; changed = true; } });
  if (changed){ saveN(a); try { MStore._renderBell(); } catch(_){} }
  return changed;
}
function md2text(s){
  return String(s||'').replace(/[*_`#>]/g,'').replace(/\s+/g,' ').trim();
}
function diff(old, d, silent){
  old = old || { errors: [], strikes: [], agents: [] };
  var oldErr = {}, oldStr = {}, oldAg = {};
  (old.errors||[]).forEach(function(e){ oldErr[e.job+'|'+e.at+'|'+e.err] = 1; });
  (old.strikes||[]).forEach(function(s){ oldStr[s.n+'|'+s.who+'|'+s.when] = 1; });
  (old.agents||[]).forEach(function(a){ oldAg[a.id] = a.status; });
  (d.errors||[]).forEach(function(e){
    var sig = e.job+'|'+e.at+'|'+e.err;
    if (!oldErr[sig]) push({ sig: sig, icon: '⚠️', title: 'Error — ' + (e.name || e.job),
      body: md2text(e.err).slice(0, 160), body_full: md2text(e.err),
      detail: [['Job', e.job || ''], ['Agent', e.name || ''], ['At', e.at || '']], at: e.at }, silent);
  });
  (d.strikes||[]).forEach(function(s){
    var sig = s.n+'|'+s.who+'|'+s.when;
    if (!oldStr[sig]) push({ sig: sig, icon: '🟨', title: 'Strike — ' + (s.who || ''),
      body: md2text(s.why).slice(0, 160), body_full: md2text(s.why),
      detail: [['Strike', s.n || ''], ['Agent', s.who || ''], ['When', s.when || '']], at: s.when }, silent);
  });
  (d.agents||[]).forEach(function(a){
    var was = oldAg[a.id];
    if (was && was !== a.status && /error|fail/i.test(a.status) && !/error|fail/i.test(was)){
      push({ sig: 'agerr|'+a.id+'|'+a.status, icon: '🔴', title: 'Agent failing — ' + (a.name || a.id),
        body: md2text(a.summary || a.last_status || ''), detail: [['Agent', a.id || ''], ['Status', a.status || '']], at: 'now' }, silent);
    }
  });
}

window.MNotify = {
  open: open,
  close: closeModal,
  diff: diff,
  list: loadN,
  unread: function(){ return loadN().filter(function(n){ return !n.read; }).length; },
  markRead: markRead,
  markAllRead: markAllRead,
  clear: function(){ saveN([]); }
};
})();
