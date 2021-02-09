importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

self.__precacheManifest = [].concat(
	self.__WB_MANIFEST || [
		{
			revision: "b9199ff",
			url: "index.html"
		}
	]
);

workbox.core.setCacheNameDetails({
	prefix: "mySite",
	suffix: "v1",
	precache: "install-time",
	runtime: "run-time"
});

// active new service worker as long as it's installed
workbox.core.clientsClaim();
workbox.core.skipWaiting();

// suppress warnings if revision is not provided
workbox.precaching.suppressWarnings();

// precahce and route asserts built by webpack
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// return app shell for all navigation requests
workbox.routing.registerNavigationRoute("/app-shell");

// routing for cloud served images
workbox.routing.registerRoute(
	/^https:\/\/.+\.(jpe?g|png|gif|svg)$/i,
	workbox.strategies.cacheFirst({
		cacheName: "react-pwa-demo-image-cache",
		plugins: [
			new workbox.expiration.Plugin({
				// Only cache requests for a week
				maxAgeSeconds: 7 * 24 * 60 * 60,
				// Only cache 20 requests.
				maxEntries: 20
			}),
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			})
		]
	})
);
