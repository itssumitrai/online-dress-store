import { getAuth } from '../../../firebaseUtil';

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
		const currentUserClaim = getAuth().verifyIdToken(token);
		if (!currentUserClaim.admin) {
			// current user is not admin.
			return {
				status: 401,
				body: 'Unauthorized'
			};
		}

		const user = await getAuth().getUserByEmail(email);
		await getAuth().setCustomUserClaims(user.uid, { admin: true });
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
