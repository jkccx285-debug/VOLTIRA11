const V='voltira-v2',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','maskable-512.png','apple-touch-icon.png','favicon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
if(u.origin!==location.origin){if(u.hostname.includes('fonts.g')){e.respondWith(caches.open(V).then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{c.put(r,x.clone());return x}).catch(()=>new Response('',{status:200})))))}return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).catch(()=>caches.match('index.html'))))});
