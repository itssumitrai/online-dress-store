import admin from 'firebase-admin';

export async function post({ body }) {
    const email = body.get('email');
    try {
        const user = await admin.auth().getUserByEmail(email);
        // TODO: check if this user is admin
        console.log(">> user:", user);
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    } catch(ex) {
        return {
            status: ex.status,
            body: ex.message
        };
    }
    return {
        status: 200,
        body: {}
    };
}
