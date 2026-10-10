/* Mobile Dashboard view (v1.1) — enhanced home: hero status, KPI tiles,
   outreach-cap meters, 24h charts, live activity, glances, quick nav.
   Real feed schema only — every number comes from the live feed. */
(function(){
'use strict';
window.MViews = window.MViews || {};

function agoStr(asof){
  try {
    var m = String(asof || '').match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})/);
    if (!m) return '';
    var t = new Date(m[1] + 'T' + m[2] + ':00').getTime();
    if (isNaN(t)) return '';
    var s = Math.max(0, Math.round((Date.now() - t) / 1000));
    if (s < 10) return 'just now';
    if (s < 60) return s + 's ago';
    var mm = Math.round(s / 60);
    if (mm < 60) return mm + 'm ago';
    return Math.round(mm / 60) + 'h ago';
  } catch(_){ return ''; }
}
function parseCap(v){
  // "40/40" -> {used:40, cap:40}
  var m = String(v == null ? '' : v).match(/(\d+)\s*\/\s*(\d+)/);
  if (!m) return null;
  return { used: +m[1], cap: +m[2] };
}
function esc(s){ return MStore.esc(s); }

window.MViews.dashboard = function(root){
  var d = MStore.get();
  var el = document.createElement('div');

  var agents = (d && d.agents) || [];
  var leads = (d && d.leads) || [];
  var kpis = (d && d.kpis) || {};
  var hist = (d && d.history) || {};
  var acts = (d && d.activity) || [];
  var wd = (d && d.watchdog) || {};
  var errs = (d && d.errors) || [];
  var strikes = (d && d.strikes) || [];

  var asof = d && d.as_of ? MStore.fmtAsOf(d.as_of) : 'waiting for feed…';
  try { document.getElementById('masof').textContent = 'FEED ' + asof; } catch(_){}

  var liveN = agents.filter(function(a){ return MStore.isUp(a.status); }).length;
  var failN = (kpis.failing != null ? kpis.failing : agents.filter(function(a){
    return /fail|error/.test((a.status || '').toLowerCase());
  }).length);
  var newN = kpis.leads_new != null ? kpis.leads_new : 0;
  var conN = kpis.leads_contacted != null ? kpis.leads_contacted : 0;
  var closedN = kpis.leads_closed != null ? kpis.leads_closed : leads.filter(function(l){
    return (l.status || '').toLowerCase() === 'closed';
  }).length;
  var totN = kpis.leads_total != null ? kpis.leads_total : leads.length;
  var unread = (window.MNotify && MNotify.unread) ? MNotify.unread() : 0;

  var h = '';

  /* ---- hero ---- */
  var wdOk = /succeed|ok|pass/i.test(wd.status || '');
  var hr = new Date().getHours();
  var greet = hr < 12 ? 'Good morning' : (hr < 17 ? 'Good afternoon' : 'Good evening');
  h += '<div class="hero">'
    + '<div class="hero-top"><span class="pulse"></span><b>COMMAND LIVE</b>'
    + '<span class="hero-age">' + esc(agoStr(d && d.as_of) || 'live') + '</span></div>'
    + '<div class="hero-greet">' + greet + ', Kamran 👋</div>'
    + '<div class="hero-sub">' + esc(asof) + '</div>'
    + '<div class="hero-chips">'
    + '<span class="chip">👥 <b>' + liveN + '/' + agents.length + '</b> agents up</span>'
    + '<span class="chip">🎯 <b>' + totN + '</b> leads</span>'
    + '<span class="chip">🛡 watchdog <b>' + (wdOk ? 'OK' : esc(wd.status || '—')) + '</b></span>'
    + '</div></div>';

  /* ---- attention banner ---- */
  if (failN > 0 || errs.length > 0){
    h += '<div class="attention tappable" id="md-att">⚠️ <b>'
      + (failN > 0 ? failN + ' agent' + (failN === 1 ? '' : 's') + ' need' + (failN === 1 ? 's' : '') + ' attention' : '')
      + (failN > 0 && errs.length > 0 ? ' • ' : '')
      + (errs.length > 0 ? errs.length + ' open error' + (errs.length === 1 ? '' : 's') : '')
      + '</b><span>Tap to review →</span></div>';
  }

  /* ---- team pulse strip ---- */
  if (agents.length){
    h += '<div class="msec">TEAM PULSE</div><div class="pulse-strip" id="md-pulse">';
    var dotMap = { green: 'green', red: 'red', yellow: 'yellow', blue: 'blue', gray: 'gray' };
    agents.forEach(function(a){
      var nm = a.name || a.id || '?';
      var initial = nm.charAt(0).toUpperCase();
      var dc = dotMap[a.color] || 'gray';
      h += '<div class="p-agent" data-id="' + esc(a.id || '') + '">'
        + '<span class="p-av"><span class="p-dot ' + dc + '"></span>' + esc(initial) + '</span>'
        + '<i>' + esc(nm.split(' ')[0]) + '</i></div>';
    });
    h += '</div>';
  }

  /* ---- KPIs ---- */
  function kpi(cls, icon, val, label, sub){
    return '<div class="kpi ' + cls + '"><div class="kpi-ic">' + icon + '</div>'
      + '<b>' + val + '</b><span>' + label + '</span>'
      + (sub ? '<i>' + sub + '</i>' : '') + '</div>';
  }
  h += '<div class="msec">PERFORMANCE</div><div class="kgrid">'
    + kpi('grn', '🟢', liveN, 'AGENTS LIVE', 'of ' + agents.length + ' total')
    + kpi('red', '🔴', failN, 'FAILING', failN ? 'needs attention' : 'all healthy')
    + kpi('blu', '🆕', newN, 'NEW LEADS', 'in pipeline')
    + kpi('grn', '💬', conN, 'CONTACTED', 'outreach sent')
    + kpi('acc', '🤝', closedN, 'DEALS CLOSED', 'won')
    + kpi('ylw', '⚠️', errs.length, 'ERRORS', 'open issues')
    + kpi('ylw', '🟨', strikes.length, 'STRIKES', 'on record')
    + kpi('blu', '🔔', unread, 'UNREAD', 'notifications')
    + '</div>';

  /* ---- outreach caps ---- */
  var caps = [
    { label: 'DMs', icon: '📩', v: parseCap(kpis.dms_today != null ? kpis.dms_today : (kpis.dms_used + '/' + kpis.dms_cap)) },
    { label: 'Emails', icon: '✉️', v: parseCap(kpis.emails_today != null ? kpis.emails_today : (kpis.emails_used + '/' + kpis.emails_cap)) },
    { label: 'Friend req', icon: '🤝', v: parseCap(kpis.friend_req != null ? kpis.friend_req : (kpis.fr_used + '/' + kpis.fr_cap)) }
  ];
  var capHtml = '';
  caps.forEach(function(c){
    if (!c.v || !c.v.cap) return;
    var pct = Math.min(100, Math.round(c.v.used / c.v.cap * 100));
    var full = pct >= 100;
    capHtml += '<div class="cap"><div class="cap-top"><span>' + c.icon + ' ' + c.label + '</span>'
      + '<b class="' + (full ? 'full' : '') + '">' + c.v.used + '/' + c.v.cap + '</b></div>'
      + '<div class="cap-bar"><div class="cap-fill' + (full ? ' full' : '') + '" style="width:' + pct + '%"></div></div></div>';
  });
  if (capHtml) h += '<div class="msec">TODAY\u2019S OUTREACH</div><div class="panel caps">' + capHtml + '</div>';

  /* ---- charts ---- */
  h += '<div class="msec">LAST 24 HOURS</div>'
    + '<div class="chart-box"><h4>AGENT RUNS PER HOUR</h4><canvas id="md-runs" height="170"></canvas></div>'
    + '<div class="chart-box"><h4>LEAD PIPELINE TREND</h4><canvas id="md-trend" height="170"></canvas></div>'
    + '<div class="chart-box"><h4>LEADS BY STATUS</h4><canvas id="md-funnel" height="190"></canvas></div>';

  /* ---- leaderboard mini ---- */
  var lb = (d && d.leaderboard) || {};
  function lbRow(r, medal){
    var cols = String(r).split('|').map(function(c){ return c.trim(); }).filter(function(c){ return c !== ''; });
    var nm = cols[1] || '', note = cols.slice(3).join(' | ').slice(0, 80), strk = cols[2] || '0';
    return '<div class="lb-row"><span class="lb-medal">' + medal + '</span>'
      + '<span class="grow"><b>' + esc(nm) + '</b><div class="tiny mut">' + esc(note) + '</div></span>'
      + '<span class="chip">⚠ <b>' + esc(strk) + '</b></span></div>';
  }
  if ((lb.top && lb.top.length) || (lb.bottom && lb.bottom.length)){
    h += '<div class="msec">LEADERBOARD</div><div class="panel lb">';
    (lb.top || []).slice(0, 3).forEach(function(r, i){
      h += lbRow(r, ['🥇', '🥈', '🥉'][i] || '•');
    });
    if (lb.bottom && lb.bottom.length){
      h += '<div class="lb-sep">NEEDS WORK</div>';
      lb.bottom.slice(0, 3).forEach(function(r){ h += lbRow(r, '🔻'); });
    }
    h += '</div>';
  }

  /* ---- live activity ---- */
  if (acts.length){
    h += '<div class="msec">LIVE ACTIVITY</div><div class="panel" id="md-act">';
    acts.slice(0, 5).forEach(function(a){
      h += '<div class="act-item"><b>' + esc(a.tag || '') + '</b><div class="mut" style="margin-top:3px">'
        + esc(String(a.line || '').replace(/^[-\s]*/, '').slice(0, 140)) + '</div></div>';
    });
    h += '</div>';
  }

  /* ---- glances ---- */
  h += '<div class="msec">AGENTS AT A GLANCE</div><div id="md-agents"></div>';
  h += '<div class="msec">LATEST LEADS</div><div id="md-leads"></div>';

  /* ---- quick nav ---- */
  h += '<div class="msec">JUMP TO</div><div class="qnav">'
    + '<div class="qcard tappable" data-go="agents"><b>🤖</b><span>Agents</span><i>' + agents.length + '</i></div>'
    + '<div class="qcard tappable" data-go="leads"><b>🎯</b><span>Leads</span><i>' + totN + '</i></div>'
    + '<div class="qcard tappable" data-go="alerts"><b>🔔</b><span>Alerts</span><i>' + (unread ? unread + ' new' : errs.length + strikes.length) + '</i></div>'
    + '</div>';

  el.innerHTML = h;
  root.appendChild(el);

  el.querySelectorAll('.qcard').forEach(function(c){
    c.addEventListener('click', function(){ MApp.go(c.getAttribute('data-go')); });
  });
  var att = el.querySelector('#md-att');
  if (att) att.addEventListener('click', function(){ MApp.go('agents'); });
  el.querySelectorAll('.p-agent').forEach(function(p){
    p.addEventListener('click', function(){
      var id = p.getAttribute('data-id');
      if (id) MApp.detail('agent', id);
    });
  });

  var wrap = el.querySelector('#md-agents');
  var sorted = agents.slice().sort(function(a, b){
    return (MStore.isUp(a.status) ? 0 : 1) - (MStore.isUp(b.status) ? 0 : 1);
  }).slice(0, 4);
  sorted.forEach(function(a){
    wrap.appendChild(MStore.agentCard(a, function(){ MApp.detail('agent', a.id); }));
  });
  if (!sorted.length) wrap.innerHTML = '<div class="ok">No agents in feed yet.</div>';

  var lwrap = el.querySelector('#md-leads');
  var nleads = leads.slice(-4).reverse();
  nleads.forEach(function(l){
    lwrap.appendChild(MStore.leadCard(l, function(){ MApp.detail('lead', l.post_id || l.name); }));
  });
  if (!nleads.length) lwrap.innerHTML = '<div class="ok">No leads yet.</div>';

  /* ---- charts ---- */
  var tickC = '#9a97bd', gridC = 'rgba(255,255,255,.05)';
  function baseOpts(){
    var o = { plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: tickC, font: { size: 9 }, maxTicksLimit: 8 }, grid: { display: false } },
        y: { ticks: { color: tickC, precision: 0, maxTicksLimit: 5 }, grid: { color: gridC } } } };
    /* v1.3.2: on a quiet live refresh, render charts at final state instead
       of replaying their entry animation (less visual disturbance). */
    if (window.__mQuietRefresh) o.animation = false;
    return o;
  }
  try {
    if (hist.labels && hist.runs24){
      new Chart(el.querySelector('#md-runs'), {
        type: 'bar',
        data: { labels: hist.labels, datasets: [{ data: hist.runs24,
          backgroundColor: 'rgba(108,123,255,.75)', borderRadius: 3 }] },
        options: baseOpts()
      });
    }
  } catch(e){}
  try {
    if (hist.hlabels && hist.leads){
      var step = Math.max(1, Math.floor(hist.leads.length / 24));
      var lb = [], vl = [];
      for (var i = 0; i < hist.leads.length; i += step){ lb.push(hist.hlabels[i]); vl.push(hist.leads[i]); }
      new Chart(el.querySelector('#md-trend'), {
        type: 'line',
        data: { labels: lb, datasets: [{ data: vl, borderColor: '#35d07f',
          backgroundColor: 'rgba(53,208,127,.15)', fill: true, tension: .35, pointRadius: 0 }] },
        options: baseOpts()
      });
    }
  } catch(e){}
  try {
    var st = {};
    leads.forEach(function(l){ var s = (l.status || 'new'); st[s] = (st[s] || 0) + 1; });
    var labels = Object.keys(st), vals = labels.map(function(k){ return st[k]; });
    var pal = { new: '#5db4ff', contacted: '#35d07f', closed: '#9d7bff', error: '#ff5d5d', skipped: '#8a8a9e' };
    new Chart(el.querySelector('#md-funnel'), {
      type: 'bar',
      data: { labels: labels, datasets: [{ data: vals,
        backgroundColor: labels.map(function(k){ return pal[k] || '#6c7bff'; }),
        borderRadius: 6 }] },
      options: baseOpts()
    });
  } catch(e){}
};
})();
