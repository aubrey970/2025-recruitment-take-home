/**
 * Endpoint repository for the login API.
 * Provides request URL, payload formatting and response parsing.
 */
export default class LoginEndpointRepository {
    /**
     *
     */
    constructor() {}

    /**
     *
     */
    getRequestUrl() {
        return "https://us-central1-portal-tps.cloudfunctions.net/portal-controller";
    }

    /**
     *
     */
    dataToPayload(data) {
        // API expects { definition: 'login', data: { email: '...', password: '...' } }
        const payload = {
            data: JSON.stringify({
                definition: "login",
                data: {
                    email: data.username, // The use case provides 'username' which we map to 'email'
                    password: data.password,
                },
            }),
        };

        return payload;
    }

    /**
     *
     */
    payloadToData(payload, response) {
        // Try to resolve token and user from common locations
        const tokenFromBody =
            payload?.description?.token ||
            payload?.token ||
            payload?.data?.token ||
            null;

        // Try to read Authorization header if token not in body
        let tokenFromHeader = null;
        try {
            tokenFromHeader =
                response?.headers?.get("Authorization") ||
                response?.headers?.get("authorization");
            if (tokenFromHeader && tokenFromHeader.startsWith("Bearer ")) {
                tokenFromHeader = tokenFromHeader.replace("Bearer ", "");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            // ignore header read errors
        }

        const token = tokenFromBody || tokenFromHeader || null;
        const user =
            payload?.description?.user ||
            payload?.user ||
            payload?.data?.user ||
            null;

        return { token, user, raw: payload };
    }
}
