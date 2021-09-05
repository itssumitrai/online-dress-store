export const getHost = (session) => {
	if (typeof window !== 'undefined') {
		return window.location.host;
	}
	return session.host;
};
