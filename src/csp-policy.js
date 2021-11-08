const rootDomain = `https://*.vinaayakcollection.com`;

export const directives = {
	'img-src': ['*', "'self'", 'data:'],
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
		'https://*.googletagmanager.com',
		'https://*.google-analytics.com/g/collect'
	],
	'frame-src': []
};
