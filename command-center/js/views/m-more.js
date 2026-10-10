/* Mobile "More" view: activity, leaderboard, charts (v1.0) — real feed schema:
   activity [{tag,line}], leaderboard {top:[md rows], bottom:[md rows]} */
(function(){
'use strict';
window.MViews = window.MViews || {};

function parseBoardRow(row){
  var cols = String(row).split('|').map(function(c){ return c.trim(); }).filter(function(c){ return c !== ''; });
  return { rank: cols[0] || '', name: cols[1] || '', strikes: cols[2] || '', note: cols.slice(3).join(' | ') };
}

window.MViews.more = function(root){
  var d = MStore.get();
  var el = document.createElement('div');

  var h = '<div class="panel"><h3>TEAM ACTIVITY</h3><div id="mm-act"></div></div>';
  h += '<div class="panel"><h3>LEADERBOARD — TOP</h3><div id="mm-top"></div></div>';
  h += '<div class="panel"><h3>LEADERBOARD — BOTTOM</h3><div id="mm-bot"></div></div>';
  h += '<div class="chart-box"><h4>AGENTS BY STATUS</h4><canvas id="mm-status" height="190"></canvas></div>';
  h += '<div class="chart-box"><h4>LEAD PIPELINE TREND</h4><canvas id="mm-trend" height="190"></canvas></div>';
  h += '<div class="panel"><h3>COMMAND CENTER</h3><div class="mut small">Direct agent chat needs the Cloudflare Worker — not connected yet.</div></div>';
  el.innerHTML = h;
  root.appendChild(el);

  var acts = (d && d.activity) || [];
  var wa = el.querySelector('#mm-act');
  acts.slice(0, 10).forEach(function(a){
    var div = document.createElement('div');
    div.className = 'act-item';
    div.innerHTML = '<b>'+MStore.esc(a.tag || '')+'</b><div class="mut" style="margin-top:3px">'+MStore.esc((a.line||'').replace(/^-\s*/,''))+'</div>';
    wa.appendChild(div);
  });
  if (!acts.length) wa.innerHTML = '<div class="mut small">No recent activity.</div>';

  var lb = (d && d.leaderboard) || {};
  function boardInto(sel, rows){
    var w = el.querySelector(sel);
    (rows||[]).forEach(function(r){
      var p = parseBoardRow(r);
      var div = document.createElement('div');
      div.className = 'runrow';
      var medal = p.rank==='1'?'🥇':p.rank==='2'?'🥈':p.rank==='3'?'🥉':(p.rank?p.rank+'.':'•');
      div.innerHTML = '<span>'+medal+'</span><span class="grow"><b>'+MStore.esc(p.name)+'</b>'
        + '<div class="tiny mut">'+MStore.esc(p.note.slice(0,90))+'</div></span>'
        + '<span class="chip">⚠ <b>'+MStore.esc(p.strikes)+'</b></span>';
      w.appendChild(div);
    });
    if (!(rows||[]).length) w.innerHTML = '<div class="mut small">No leaderboard yet.</div>';
  }
  boardInto('#mm-top', lb.top);
  boardInto('#mm-bot', lb.bottom);

  try {
    var agents = (d && d.agents) || [];
    var sc = { live: 0, paused: 0, error: 0 };
    agents.forEach(function(a){
      var s = (a.status||'').toLowerCase();
      if (/active|enabled|running|live|idle|event/.test(s)) sc.live++;
      else if (/paused|hiccup|disabled/.test(s)) sc.paused++;
      else sc.error++;
    });
    var so = { plugins: { legend: { labels: { color:'#9a97bd', boxWidth: 12 } } }, cutout: '62%' };
    if (window.__mQuietRefresh) so.animation = false; /* v1.3.2: no replay on live refresh */
    new Chart(el.querySelector('#mm-status'), {
      type: 'doughnut',
      data: { labels: ['Live','Paused','Error'],
        datasets: [{ data: [sc.live, sc.paused, sc.error],
          backgroundColor: ['#35d07f','#ffcf5d','#ff5d5d'], borderWidth: 0 }] },
      options: so
    });
  } catch(e){}

  try {
    var leads = (d && d.leads) || [];
    var days = {};
    leads.forEach(function(l){
      var day = (l.post_time || '').slice(0,10) || 'unknown';
      days[day] = (days[day]||0)+1;
    });
    var lbl = Object.keys(days).sort().slice(-10);
    var to = { plugins: { legend: { display: false } },
      scales: { x: { ticks: { color:'#9a97bd', font:{size:9}, maxRotation: 45 }, grid:{display:false} },
                y: { ticks: { color:'#9a97bd', precision:0 }, grid:{color:'rgba(255,255,255,.05)'} } } };
    if (window.__mQuietRefresh) to.animation = false; /* v1.3.2: no replay on live refresh */
    new Chart(el.querySelector('#mm-trend'), {
      type: 'line',
      data: { labels: lbl, datasets: [{ data: lbl.map(function(k){ return days[k]; }),
        borderColor: '#6c7bff', backgroundColor: 'rgba(108,123,255,.18)',
        fill: true, tension: .35, pointRadius: 3 }] },
      options: to
    });
  } catch(e){}
};
})();
