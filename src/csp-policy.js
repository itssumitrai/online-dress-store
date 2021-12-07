const rootDomain = `https://*.vinaayakcollection.com`;

export const directives = {
	'img-src': ['*', "'self'", 'data:', 'blob:'],
	'font-src': ['*', "'self'", 'data:'],
	'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
	'default-src': [
		"'self'",
		rootDomain,
		'https://*.google.com',
		'https://*.googleapis.com',
		'https://*.firebase.com',
		'https://*.gstatic.com',
		'https://*.google-analytics.com/g/collect'
	],
	'object-src': ["'none'"],
	'script-src': [
		"'self'",
		"'unsafe-inline'",
		rootDomain,
		'https://*.gstatic.com',
		'https://apis.google.com/js/api.js',
		'https://apis.google.com/_/scs/apps-static/',
		'https://*.googletagmanager.com',
		'https://*.google-analytics.com/g/collect'
	],
	'frame-src': [rootDomain, 'https://dress-catalog.firebaseapp.com/']
};
