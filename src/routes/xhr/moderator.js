import admin from 'firebase-admin';

export async function post({ query, body }) {
	const email = body.get('email');
	const token = query.get('token');
	if (!token) {
		return {
			status: 401,
			body: 'Unauthorized'
		};
	}
	try {
		// First verify if current user is Admin
		const currentUserClaim = admin.auth().verifyIdToken(token);
		if (!currentUserClaim.admin) {
			// current user is not admin.
			return {
				status: 401,
				body: 'Unauthorized'
			};
		}

		const user = await admin.auth().getUserByEmail(email);
		await admin.auth().setCustomUserClaims(user.uid, { admin: true });
		return {
			status: 200,
			body: `Email ${email} has been set as Admin!`
		};
	} catch (ex) {
		return {
			status: ex.status || 401,
			body: ex.message || 'Unauthorized'
		};
	}
}
