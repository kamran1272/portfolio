/* Mobile Alerts view (v1.0) — real feed schema:
   notifications from MNotify (local diff), errors [{job,name,at,err}],
   strikes [{n,who,when,why}] */
(function(){
'use strict';
window.MViews = window.MViews || {};

window.MViews.alerts = function(root){
  var d = MStore.get();
  var el = document.createElement('div');

  /* v1.3: pending app-update banner at the very top. */
  try {
    var au = window.MUpdate && MUpdate.pending && MUpdate.pending();
    if (au){
      var banner = document.createElement('div');
      banner.className = 'card ubanner';
      banner.innerHTML = '<div class="row"><div class="nic">🔄</div><div class="grow">'
        + '<b>App update available — v' + MStore.esc(au.version) + '</b>'
        + '<span>' + MStore.esc(au.notes || 'A new version is ready.') + '</span></div></div>'
        + '<button class="mbtn" id="ubtn" style="margin-top:10px;width:100%">⬇ UPDATE NOW</button>'
        + '<div id="uStatus" style="display:none;margin-top:10px"></div>';
      el.appendChild(banner);
      banner.querySelector('#ubtn').addEventListener('click', function(){
        if (window.MUpdate) MUpdate.startUpdate(au);
      });
    }
  } catch(_){}

  var notifs = (window.MNotify ? MNotify.list() : []);
  var errors = (d && d.errors) || [];
  var strikes = (d && d.strikes) || [];

  var h = '<div class="msec mrowhead"><span>NOTIFICATIONS</span>'
    + '<span><button class="mlink" id="mn-readall">MARK ALL READ</button>'
    + ' <button class="mlink dim" id="mn-clear">CLEAR</button></span></div>'
    + '<div class="fchips" id="mn-filter">'
    + '<span class="fchip on" data-f="all">All</span>'
    + '<span class="fchip" data-f="err">Errors</span>'
    + '<span class="fchip" data-f="strike">Strikes</span>'
    + '<span class="fchip" data-f="agent">Agents</span>'
    + '</div><div id="mn-n"></div>';
  h += '<div class="msec">ERRORS</div><div id="mn-e"></div>';
  h += '<div class="msec">STRIKES</div><div id="mn-s"></div>';
  el.innerHTML = h;
  root.appendChild(el);

  el.querySelector('#mn-readall').addEventListener('click', function(){
    if (window.MNotify && MNotify.markAllRead()) MApp.go('alerts');
  });
  el.querySelector('#mn-clear').addEventListener('click', function(){
    if (window.MNotify && window.confirm('Clear all notifications?')){ MNotify.clear(); MApp.go('alerts'); }
  });

  function nkind(n){
    var t = (n.title || ''), i = (n.icon || '');
    if (/^Error/.test(t) || i === '⚠️') return 'err';
    if (/^Strike/.test(t) || i === '🟨') return 'strike';
    return 'agent';
  }
  var curF = 'all';
  function applyFilter(){
    el.querySelectorAll('#mn-n .nitem').forEach(function(it){
      it.style.display = (curF === 'all' || it.dataset.k === curF) ? '' : 'none';
    });
  }
  el.querySelectorAll('#mn-filter .fchip').forEach(function(ch){
    ch.addEventListener('click', function(){
      el.querySelectorAll('#mn-filter .fchip').forEach(function(c){ c.classList.remove('on'); });
      ch.classList.add('on');
      curF = ch.getAttribute('data-f');
      applyFilter();
    });
  });

  var nn = el.querySelector('#mn-n');
  notifs.forEach(function(n){
    var item = document.createElement('div');
    item.className = 'nitem' + (n.read ? '' : ' unread');
    item.dataset.k = nkind(n);
    item.innerHTML = '<div class="nic">'+MStore.esc(n.icon||'🔔')+'</div><div class="grow"><b>'+MStore.esc(n.title||'Notification')+'</b>'
      + '<span>'+MStore.esc(n.body||'')+'</span>'
      + '<i>'+MStore.esc(n.at||'')+'</i></div>';
    item.addEventListener('click', function(){
      if (window.MNotify){ MNotify.open(n); }
    });
    nn.appendChild(item);
  });
  if (!notifs.length) nn.innerHTML = '<div class="ok">No notifications yet.<br>New errors and strikes will appear here automatically.</div>';

  var ne = el.querySelector('#mn-e');
  errors.forEach(function(e){
    var div = document.createElement('div');
    div.className = 'err-item tappable';
    div.innerHTML = '<b>'+MStore.esc(e.name || e.job || 'Error')+'</b>'
      + '<div class="mut small" style="margin-top:4px">'+MStore.esc(String(e.err || '').slice(0, 140))+'</div>'
      + '<div class="tiny mut" style="margin-top:4px">'+MStore.esc(e.at || '')+'</div>';
    div.addEventListener('click', function(){
      if (window.MNotify) MNotify.open({ icon: '⚠️', title: 'Error — ' + (e.name || e.job || ''),
        body: String(e.err || ''), at: e.at || '',
        detail: [['Job', e.job || ''], ['Agent', e.name || ''], ['At', e.at || '']] });
    });
    ne.appendChild(div);
  });
  if (!errors.length) ne.innerHTML = '<div class="ok">No errors — system healthy.</div>';

  var ns = el.querySelector('#mn-s');
  strikes.forEach(function(s){
    var div = document.createElement('div');
    div.className = 'strike-item tappable';
    div.innerHTML = '<b>'+MStore.esc(s.who || '')+'</b> <span class="badge yellow">'+MStore.esc(s.n || 'STRIKE')+'</span>'
      + '<div class="mut small" style="margin-top:6px;line-height:1.5">'+MStore.esc(String(s.why||'').replace(/[*_`#]/g,'').slice(0,220))+'</div>'
      + '<div class="tiny mut" style="margin-top:4px">'+MStore.esc(s.when || '')+'</div>';
    div.addEventListener('click', function(){
      if (window.MNotify) MNotify.open({ icon: '🟨', title: 'Strike — ' + (s.who || ''),
        body: String(s.why || '').replace(/[*_`#]/g, ''), at: s.when || '',
        detail: [['Strike', s.n || ''], ['Agent', s.who || ''], ['When', s.when || '']] });
    });
    ns.appendChild(div);
  });
  if (!strikes.length) ns.innerHTML = '<div class="ok">No strikes.</div>';
};
})();
