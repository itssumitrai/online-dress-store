import { getAuth } from '../../../firebaseUtil.js';

export async function post({ url, request }) {
	const { searchParams } = url;
	const body = await request.json();
	const { email } = body;
	const token = searchParams.get('token');
	if (!token) {
		return {
			status: 401,
			body: 'Unauthorized'
		};
	}
	try {
		// First verify if current user is Admin
		const auth = await getAuth();
		const currentUserClaim = await auth.verifyIdToken(token);
		if (!currentUserClaim.admin) {
			// current user is not admin.
			return {
				status: 401,
				body: 'Unauthorized'
			};
		}

		const user = await auth.getUserByEmail(email);
		await auth.setCustomUserClaims(user.uid, { admin: true });
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
