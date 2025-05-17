/**
 * @returns {string | null}
 */
export function getRefreshToken(): string | null {
	try {
		const tokenString = localStorage.getItem("tokens");
		if (!tokenString) {
			return null;
		}

		const tokens = JSON.parse(tokenString);
		return tokens.access || null;
	} catch (error) {
		return null;
	}
}
