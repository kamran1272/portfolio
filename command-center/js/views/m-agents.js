/* Mobile Agents list + Agent detail (v1.0) */
(function(){
'use strict';
window.MViews = window.MViews || {};
var curFilter = 'all';

window.MViews.agents = function(root){
  var d = MStore.get();
  var agents = (d && d.agents) || [];
  var el = document.createElement('div');

  var counts = { all: agents.length, live: 0, paused: 0, error: 0 };
  agents.forEach(function(a){
    if (MStore.isLive(a.status)) counts.live++;
    else if (a.status==='paused') counts.paused++;
    else counts.error++;
  });

  var h = '<input class="msearch" id="mag-q" placeholder="🔍 Search agents…">';
  h += '<div class="fchips" id="mag-chips">'
    + '<span class="fchip' + (curFilter==='all'?' on':'') + '" data-f="all">All '+counts.all+'</span>'
    + '<span class="fchip' + (curFilter==='live'?' on':'') + '" data-f="live">Live '+counts.live+'</span>'
    + '<span class="fchip' + (curFilter==='paused'?' on':'') + '" data-f="paused">Paused '+counts.paused+'</span>'
    + '<span class="fchip' + (curFilter==='error'?' on':'') + '" data-f="error">Error '+counts.error+'</span></div>';
  h += '<div id="mag-list"></div>';
  el.innerHTML = h;
  root.appendChild(el);

  var list = el.querySelector('#mag-list');
  function render(){
    list.innerHTML = '';
    var q = el.querySelector('#mag-q').value.toLowerCase();
    agents.forEach(function(a){
      if (curFilter==='live' && !MStore.isLive(a.status)) return;
      if (curFilter==='paused' && a.status!=='paused') return;
      if (curFilter==='error' && MStore.isLive(a.status) && a.status!=='paused') return;
      var name = (a.name||a.id||'').toLowerCase(), role = (a.role||'').toLowerCase();
      if (q && name.indexOf(q)<0 && role.indexOf(q)<0) return;
      list.appendChild(MStore.agentCard(a, function(){ MApp.detail('agent', a.id); }));
    });
    if (!list.children.length) list.innerHTML = '<div class="ok">No agents match.</div>';
  }
  el.querySelectorAll('.fchip').forEach(function(c){
    c.addEventListener('click', function(){
      el.querySelectorAll('.fchip').forEach(function(x){ x.classList.remove('on'); });
      c.classList.add('on'); curFilter = c.dataset.f; render();
    });
  });
  el.querySelector('#mag-q').addEventListener('input', render);
  render();
};

window.MViews.agent = function(root, id){
  var d = MStore.get();
  var agents = (d && d.agents) || [];
  var a = null;
  agents.forEach(function(x){ if (x.id === id) a = x; });
  var el = document.createElement('div');
  if (!a){ el.innerHTML = '<div class="dhead"><button class="backbtn" id="mbk">‹</button><div class="dtitle">Agent not found</div></div><div class="ok">This agent is not in the current feed.</div>'; root.appendChild(el);
    el.querySelector('#mbk').onclick = function(){ MApp.go('agents'); }; return; }

  var st = MStore.statusBadge(a.status);
  var doing = a.doing_now || 'Idle — waiting for the next scheduled run.';
  var h = '<div class="dhead"><button class="backbtn" id="mbk">‹</button>'
    + '<div class="dtitle grow">'+MStore.esc(a.name||a.id)+'</div>'
    + '<span class="badge '+st.c+'">'+st.t.toUpperCase()+'</span></div>';

  h += '<div class="panel"><h3>CURRENTLY DOING</h3><div style="font-size:14px;line-height:1.6">'+MStore.esc(doing)+'</div></div>';

  var sched = a.schedule || '—';
  if (a.every) sched += ' · ' + a.every;
  h += '<div class="panel"><h3>RUN DETAILS</h3>'
    + fact('Running now', MStore.isLive(a.status) ? 'YES — active' : 'NO')
    + fact('Schedule', sched)
    + fact('Last run', a.last_run ? MStore.fmtAsOf(a.last_run) : '—')
    + fact('Last run was', a.last_ago || '—')
    + fact('Last outcome', a.last_status || '—')
    + fact('Next run', a.next_in ? a.next_in : (a.next_run ? MStore.fmtAsOf(a.next_run) : '—'))
    + fact('Role', MStore.esc(a.role || '—'))
    + '</div>';

  h += '<div class="panel"><h3>RECENT RUNS</h3>';
  var runs = a.recent_runs || [];
  if (!runs.length) h += '<div class="mut small">No recent runs recorded.</div>';
  runs.forEach(function(r){
    var ok = /ok|succeed|success/i.test(r.status || '');
    h += '<div class="runrow"><span class="dot '+(ok?'green':'red')+'"></span>'
      + '<span class="grow">'+MStore.esc(r.summary || (ok ? 'Run completed' : 'Run '+(r.status||'')))+'</span>'
      + '<span class="mut tiny">'+MStore.esc(r.ago || r.at || '')+'</span></div>';
  });
  h += '</div>';

  h += '<div class="panel"><h3>ROLE & DETAILS</h3><div style="font-size:13.5px;line-height:1.65" class="mut">'
    + MStore.esc(a.details || a.role || 'No detailed description available.') + '</div></div>';

  el.innerHTML = h;
  root.appendChild(el);
  el.querySelector('#mbk').onclick = function(){ MApp.go('agents'); };

  function fact(k, v){
    return '<div class="fact"><span class="k">'+k+'</span><span class="v">'+MStore.esc(String(v))+'</span></div>';
  }
};
})();
