import * as functions from 'firebase-functions';

let sveltekitServer;
exports.sveltekit = functions.https.onRequest(async (request, response) => {
	if (!sveltekitServer) {
		functions.logger.info('Initialising SvelteKit SSR entry');
		sveltekitServer = require('./sveltekit/index').default;
		functions.logger.info('SvelteKit SSR entry initialised!');
	}
	functions.logger.info('Requested resource: ' + request.originalUrl);
	try {
		return sveltekitServer(request, response);
	} catch (ex) {
		functions.logger.error(ex);
		return null;
	}
});
