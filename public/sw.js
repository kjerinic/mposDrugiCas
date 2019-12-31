const nazivKesMem = "prvaVerzija";

const statSadrzaj = [
    '/',
    'index.html',
    'igrica.html',
    'manifest.json',
    'css/style.css',
    'css/materialize.min.css',
    'js/materialize.min.js',
    'images/icons/icon-72x72.png',
    'images/icons/icon-96x96.png',
    'images/icons/icon-128x128.png',
    'images/icons/icon-144x144.png',
    'images/icons/icon-152x152.png',
    'images/icons/icon-192x192.png',
    'images/icons/icon-384x384.png',
    'images/icons/icon-512x512.png'
];

self.addEventListener('install', async e => {
    console.log("instaliran sw");

    const kesMem = await caches.open(nazivKesMem);
    await kesMem.addAll(statSadrzaj);

    return self.skipWaiting();
});

self.addEventListener('activate', async e => {
    console.log("aktiviran sw");

    self.clients.claim();
});

self.addEventListener('fetch', async dog => {
    const zahtev = dog.request;
    const url = new URL(zahtev.url);

    if (url.origin === location.origin) {
        dog.respondWith(vratiIzKesMemorije(zahtev));
    } else {
        dog.respondWith(vratiSaMrezeIliIzKesMemorije
            (zahtev));
    }

});

async function vratiIzKesMemorije(zahtev) {
    const kes = await caches.open(nazivKesMem);
    const kesiraniPodaci = await kes.match(zahtev);
    return kesiraniPodaci || fetch(zahtev);
}

async function vratiSaMrezeIliIzKesMemorije(zahtev) {
    const kes = await caches.open(nazivKesMem);

    try {
        const najnovijiPodaci = await fetch(zahtev);
        await kes.put(zahtev, najnovijiPodaci.clone());
        return najnovijiPodaci;
    } catch (error) {
        const kesiraniPodaci = await kes.match(zahtev);
        return kesiraniPodaci;
    }

}