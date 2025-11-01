const CACHE_NAME = 'gmezz-cache-v3'; // Incremented cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/manifest.json',
  '/icons/app-icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/types.ts',
  '/constants.ts',
  '/App.tsx',
  '/firebase/config.ts',
  '/components/TicketEditor.tsx',
  '/components/TicketList.tsx',
  '/components/SplashScreen.tsx',
  '/components/AddEntityModal.tsx',
  '/components/LoginScreen.tsx',
  '/components/GridOverlay.tsx',
  '/components/icons.tsx',
  '/components/templates/TemplateWrapper.tsx',
  '/components/templates/ClassicTemplate.tsx',
  '/components/templates/GridTemplate.tsx',
  '/components/templates/ModernTemplate.tsx',
  '/components/templates/OfficialTemplate.tsx',
  '/components/templates/OfficialTemplate2.tsx',
  '/components/templates/OfficialTemplate3.tsx',
  '/components/templates/PrimaryTemplate1.tsx',
  '/components/templates/PrimaryTemplate2.tsx',
  // External libraries
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  // React via importmap
  'https://aistudiocdn.com/react@18.2.0',
  'https://aistudiocdn.com/react-dom@18.2.0/client',
  // Firebase via importmap
  'https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Fetch and cache all URLs individually for robustness
        const cachePromises = urlsToCache.map(urlToCache => {
          // For external resources, use 'no-cors' to handle opaque responses
          const request = new Request(urlToCache, { mode: 'no-cors' });
          return fetch(request)
            .then(response => cache.put(urlToCache, response))
            .catch(err => {
              console.error(`Failed to fetch and cache ${urlToCache}`, err);
            });
        });
        return Promise.all(cachePromises);
      })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for API calls
  if (url.hostname.includes('firestore.googleapis.com') || url.hostname.includes('firebaseapp.com')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request); 
      })
    );
    return;
  }

  // Cache-first for all other requests
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Not in cache - fetch from network
        return fetch(event.request).then(
          (networkResponse) => {
            // Check if we received a valid response
            if (!networkResponse || (!networkResponse.ok && networkResponse.type !== 'opaque') || networkResponse.type === 'error') {
              return networkResponse;
            }

            // Only cache GET requests
            if (event.request.method !== 'GET') {
                return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        ).catch(err => {
            console.error('Fetch failed:', err);
            // Optionally, return a fallback offline page if one is cached
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});