/* Mobile Leads list + Lead detail (v1.0) — real feed schema:
   {post_id, name, status, source, group_name, group_id, post_time, url,
    email, phone, website, location, has_email, has_phone} */
(function(){
'use strict';
window.MViews = window.MViews || {};
var curFilter = 'all';

window.MViews.leads = function(root){
  var d = MStore.get();
  var leads = (d && d.leads) || [];
  var el = document.createElement('div');

  var counts = { all: leads.length };
  leads.forEach(function(l){ var s = l.status || 'new'; counts[s] = (counts[s]||0)+1; });

  var h = '<input class="msearch" id="mld-q" placeholder="🔍 Search name, phone, email, location…">';
  h += '<div class="fchips" id="mld-chips"><span class="fchip' + (curFilter==='all'?' on':'') + '" data-f="all">All '+counts.all+'</span>';
  Object.keys(counts).forEach(function(s){
    if (s==='all') return;
    h += '<span class="fchip' + (curFilter===s?' on':'') + '" data-f="'+MStore.esc(s)+'">'+MStore.esc(s)+' '+counts[s]+'</span>';
  });
  h += '</div><div id="mld-list"></div>';
  el.innerHTML = h;
  root.appendChild(el);

  var list = el.querySelector('#mld-list');
  function render(){
    list.innerHTML = '';
    var q = el.querySelector('#mld-q').value.toLowerCase();
    leads.slice().reverse().forEach(function(l){
      if (curFilter!=='all' && (l.status||'new')!==curFilter) return;
      var hay = ((l.name||'')+' '+(l.phone||'')+' '+(l.email||'')+' '+(l.location||'')+' '+(l.group_name||'')).toLowerCase();
      if (q && hay.indexOf(q)<0) return;
      list.appendChild(MStore.leadCard(l, function(){ MApp.detail('lead', l.post_id || l.name); }));
    });
    if (!list.children.length) list.innerHTML = '<div class="ok">No leads match.</div>';
  }
  el.querySelectorAll('.fchip').forEach(function(c){
    c.addEventListener('click', function(){
      el.querySelectorAll('.fchip').forEach(function(x){ x.classList.remove('on'); });
      c.classList.add('on'); curFilter = c.dataset.f; render();
    });
  });
  el.querySelector('#mld-q').addEventListener('input', render);
  render();
};

window.MViews.lead = function(root, id){
  var d = MStore.get();
  var leads = (d && d.leads) || [];
  var l = null;
  leads.forEach(function(x){ if ((x.post_id || x.name) === id) l = x; });
  var el = document.createElement('div');
  if (!l){ el.innerHTML = '<div class="dhead"><button class="backbtn" id="mbk">‹</button><div class="dtitle">Lead not found</div></div>'; root.appendChild(el);
    el.querySelector('#mbk').onclick = function(){ MApp.go('leads'); }; return; }

  var st = MStore.statusBadge(l.status);
  var h = '<div class="dhead"><button class="backbtn" id="mbk">‹</button>'
    + '<div class="dtitle grow ellip">'+MStore.esc(l.name||'Lead')+'</div>'
    + '<span class="badge '+st.c+'">'+st.t.toUpperCase()+'</span></div>';

  h += '<div class="panel"><h3>LEAD DETAILS</h3>'
    + fact('Source', l.source || '—') + fact('Group', l.group_name || '—')
    + fact('Post time', l.post_time || '—') + fact('Phone', l.phone || '—')
    + fact('Email', l.email || '—') + fact('Location', l.location || '—')
    + '</div>';

  h += '<div class="ld-contact">';
  if (l.phone){
    h += '<a class="cbtn call" href="tel:'+MStore.esc(l.phone.replace(/\s/g,''))+'">📞 Call</a>';
    var wad = l.phone.replace(/\D/g,'');
    h += '<a class="cbtn wa" target="_blank" href="https://wa.me/'+MStore.esc(wad)+'">💬 WhatsApp</a>';
  }
  if (l.email) h += '<a class="cbtn mail" href="mailto:'+MStore.esc(l.email)+'">✉️ Email</a>';
  h += '</div>';

  if (l.url || l.website){
    h += '<div class="panel" style="margin-top:10px"><h3>LINKS</h3>';
    if (l.url) h += '<div class="fact"><span class="k">Post</span><span class="v"><a href="'+MStore.esc(l.url)+'" target="_blank" style="color:#6c7bff">Open post ↗</a></span></div>';
    if (l.website) h += '<div class="fact"><span class="k">Website</span><span class="v"><a href="'+MStore.esc(l.website)+'" target="_blank" style="color:#6c7bff">Visit ↗</a></span></div>';
    h += '</div>';
  }

  el.innerHTML = h;
  root.appendChild(el);
  el.querySelector('#mbk').onclick = function(){ MApp.go('leads'); };

  function fact(k, v){
    return '<div class="fact"><span class="k">'+k+'</span><span class="v">'+MStore.esc(String(v))+'</span></div>';
  }
};
})();
