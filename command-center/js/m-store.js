/* MStore — shared feed access + card builders for the mobile app (v1.0) */
(function(){
'use strict';
window.MStore = {
  _feed: null,
  get: function(){
    if (window.MFeed && MFeed.getFeed) return MFeed.getFeed();
    return window.__mfeed || null;
  },
  tick: function(){
    try { this._feed = this.get(); } catch(e){}
    this._renderBell();
  },
  esc: function(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  },
  fmtAsOf: function(ts){
    if (ts == null || ts === '') return '—';
    var s = String(ts).trim();
    var m = s.match(/^(\d{1,2}):(\d{2})$/);
    if (m){
      var hh = +m[1], ap = hh >= 12 ? 'PM' : 'AM'; hh = hh % 12 || 12;
      return 'today ' + hh + ':' + m[2] + ' ' + ap;
    }
    if (/^\d{4}-\d{2}-\d{2} /.test(s)) return s;
    function fmtD(d){
      var now = new Date(), sameDay = d.toDateString() === now.toDateString();
      var h = d.getHours(), mm = ('0'+d.getMinutes()).slice(-2);
      var ap2 = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
      var base = h + ':' + mm + ' ' + ap2;
      return sameDay ? 'today ' + base : d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'}) + ' ' + base;
    }
    var n = Number(s);
    if (s !== '' && !isNaN(n)){ if (n < 1e12) n = n * 1000; return fmtD(new Date(n)); }
    var d2 = new Date(s);
    if (!isNaN(d2.getTime())) return fmtD(d2);
    return s;
  },
  isLive: function(st){ return /active|enabled|running|live/i.test(st||''); },
  /* v1.1: "up" = healthy, including idle (between runs) and event-driven hooks.
     Used for counts so the hero/KPIs agree with the status donut. */
  isUp: function(st){ return /active|enabled|running|live|idle|event/i.test(st||''); },
  statusBadge: function(st){
    var s = (st || '').toLowerCase();
    if (/active|enabled|running|live/.test(s)) return {c:'green', t:'live'};
    if (s === 'contacted') return {c:'green', t:'contacted'};
    if (s === 'new') return {c:'blue', t:'new'};
    if (s === 'paused') return {c:'yellow', t:'paused'};
    if (s === 'error' || s === 'failed') return {c:'red', t:'error'};
    if (s === 'closed') return {c:'gray', t:'closed'};
    return {c:'gray', t:st || 'idle'};
  },
  agentCard: function(a, onClick){
    var b = this.statusBadge(a.status);
    var doing = (a.doing_now && a.doing_now !== '—' && a.doing_now !== '-') ? a.doing_now : 'Idle — waiting for next run.';
    var next = a.next_in || (a.next_run ? ('at ' + MStore.fmtAsOf(a.next_run)) : '');
    var div = document.createElement('div');
    div.className = 'card tappable ag-card';
    div.innerHTML =
      '<div class="ag-top"><span class="dot '+b.c+'"></span>'
      + '<div class="grow ellip ag-name">'+this.esc(a.name||a.id)+'</div>'
      + '<span class="badge '+b.c+'">'+b.t.toUpperCase()+'</span></div>'
      + '<div class="ag-doing">'+this.esc(doing)+'</div>'
      + '<div class="ag-meta">'
      + '<span class="chip">⏱ <b>'+this.esc(a.every || (a.interval_min ? 'every '+a.interval_min+' min' : '—'))+'</b></span>'
      + '<span class="chip">last run <b>'+this.esc(a.last_ago || '—')+'</b></span>'
      + (next ? '<span class="chip">⏳ <b>'+this.esc(next)+'</b></span>' : '')
      + '</div>';
    if (onClick) div.addEventListener('click', onClick);
    return div;
  },
  leadCard: function(l, onClick){
    var b = this.statusBadge(l.status);
    var div = document.createElement('div');
    div.className = 'card tappable';
    div.innerHTML =
      '<div class="row"><div class="grow"><div class="ld-name ellip">'+this.esc(l.name||'Lead')+'</div>'
      + '<div class="ld-sub ellip">'+this.esc((l.source||'')+(l.location?(' • '+l.location):''))+'</div></div>'
      + '<span class="badge '+b.c+'">'+b.t.toUpperCase()+'</span></div>';
    if (onClick) div.addEventListener('click', onClick);
    return div;
  },
  _renderBell: function(){
    var unread = 0;
    try { unread = (window.MNotify && MNotify.unread()) || 0; } catch(e){}
    var b = document.getElementById('nbadge');
    if (b){ b.style.display = unread > 0 ? 'flex' : 'none'; b.textContent = unread > 99 ? '99+' : unread; }
  }
};
})();
