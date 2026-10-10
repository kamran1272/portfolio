/* Magsi Digital Command Center — mobile live feed (v1.0).
   Self-contained: no desktop dependencies. Polls the same Google Sheet feed
   via the gviz endpoint (JSONP-style script tag, since gviz sends no CORS
   headers). Dispatches: 'mfeedupdate' on new data, 'mfeedstale' when the
   feed is too old, 'mfeederror' on fetch failures. */
(function(){
'use strict';
var cfg = window.MAGSI_CONFIG || {};
var URL = cfg.dataUrl || '';
var POLL_MS = cfg.pollMs || 30000;
var busy = false, failures = 0, lastOkAt = 0, lastErr = '', lastSig = '', prevFeed = null;

function fetchGviz(url){
  return new Promise(function(resolve, reject){
    window.google = window.google || {};
    window.google.visualization = window.google.visualization || {};
    window.google.visualization.Query = window.google.visualization.Query || {};
    var prev = window.google.visualization.Query.setResponse;
    var s = document.createElement('script');
    var done = false;
    var to = setTimeout(function(){ cleanup(); reject(new Error('gviz timeout')); }, 30000);
    function cleanup(){ if (done) return; done = true;
      try { s.remove(); } catch(_){}
      window.google.visualization.Query.setResponse = prev;
      clearTimeout(to); }
    window.google.visualization.Query.setResponse = function(data){ cleanup(); resolve(data); };
    s.onerror = function(){ cleanup(); reject(new Error('gviz load error')); };
    s.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 't=' + Date.now();
    document.head.appendChild(s);
  });
}

function feedFromGviz(q){
  if (q && q.status === 'error'){
    var m = q.errors && q.errors[0] && (q.errors[0].detailed_message || q.errors[0].message);
    throw new Error('sheet error: ' + (m || 'unknown'));
  }
  var rows = (q.table && q.table.rows) || [];
  var payload = '', sawEnd = false;
  for (var i = 0; i < rows.length; i++){
    var row = rows[i], v = row.c && row.c[0] && row.c[0].v;
    if (typeof v !== 'string') continue;
    if (v.indexOf('__END__') === 0){ sawEnd = true; break; }
    payload += v;
  }
  if (!payload) throw new Error('empty feed');
  try { return JSON.parse(payload); }
  catch(_){ throw new Error(sawEnd ? 'corrupt feed' : 'feed truncated (no end marker)'); }
}

function valid(d){
  return d && typeof d === 'object' && Array.isArray(d.agents) && d.agents.length > 0
    && d.kpis && typeof d.kpis === 'object';
}

function setDot(cls){
  var el = document.getElementById('mhealth');
  if (el) el.className = 'mdot ' + cls;
}

function cycle(){
  if (busy || !URL) return;
  busy = true;
  fetchGviz(URL).then(function(q){
    busy = false; failures = 0; lastErr = ''; lastOkAt = Date.now();
    var d = feedFromGviz(q);
    if (!valid(d)) throw new Error('feed has unexpected shape');
    var sig = JSON.stringify(d);
    if (sig !== lastSig){
      lastSig = sig;
      var old = prevFeed;
      prevFeed = d;
      window.__mfeed = d;
      /* v1.1: on the very first poll there is no previous feed — seed the
         notification list from the current errors/strikes so the Alerts tab
         and the bell badge are populated instead of staying empty forever.
         Silent: no toast spam on first launch, just the badge. */
      try {
        if (window.MNotify && MNotify.diff){
          MNotify.diff(old || { errors: [], strikes: [], agents: [] }, d, !old);
        }
      } catch(_){}
      window.dispatchEvent(new Event('mfeedupdate'));
    }
    setDot('on');
  }).catch(function(e){
    busy = false; failures++;
    lastErr = e && e.message || 'feed unreachable';
    var age = Date.now() - lastOkAt;
    if (age > POLL_MS * 3){
      setDot('warn');
      window.dispatchEvent(new Event('mfeedstale'));
    } else {
      setDot('bad');
      window.dispatchEvent(new Event('mfeederror'));
    }
  });
}

function start(){
  cycle();
  setInterval(cycle, POLL_MS);
  // Refresh immediately when the app comes back to the foreground
  // (mobile OSes throttle background timers)
  document.addEventListener('visibilitychange', function(){
    if (!document.hidden) cycle();
  });
}

window.MFeed = {
  start: start,
  cycle: cycle,
  getFeed: function(){ return window.__mfeed || null; },
  pollMs: function(){ return POLL_MS; },
  state: function(){ return { failures: failures, lastOkAt: lastOkAt, lastErr: lastErr }; }
};
})();
