import IndexedDbRepository from "../../../data/indexedDbRepo";
import RestAPIService from "../../../services/restAPIService";
import LoginEndpointRepository from "../data/loginEndpointRepository";
//import CryptoJS from "crypto-js";

/**
 * Logs the user into their account.
 *
 * This use case handles the login process by verifying the user's credentials
 * and updating the application state accordingly.
 */
class LoginUserUseCase {
    /**
     * @param {Object} app The application object.
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * @param {String} encryptedString The string to decrypt.
     * @param {String} secret The secret key used for decryption
     */

    /**
     * Executes the login process.
     *
     * @param {string} userId The user ID.
     * @param {string} password The user's password.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     * @throws {Error} Throws an error if the login process fails.
     */
    async execute(userId, password) {
        // The API expects 'email', so we'll use userId for that.
        const endpointRepo = new LoginEndpointRepository();
        const api = new RestAPIService(endpointRepo);

        const result = await api.makePostCall({
            username: userId,
            password: password,
        });
        const userRepo = new IndexedDbRepository("user_store");
        // Expecting result to contain token and user
        if (result && result.token) {
            this.app.user = result.user || { id: userId };

            await userRepo.setDataById("user", this.app.user);
            await userRepo.setDataById("authToken", { token: result.token });
        } else {
            alert("Login failed: invalid credentials or missing token");
            throw new Error(
                "Login failed: invalid credentials or missing token"
            );
        }

        await userRepo.setDataById("authToken", { token: result.token });
    }

    /**
     * Login API call (legacy stub kept for compatibility)
     *
     * @param {string} userId The user ID.
     * @param {string} password The user's password.
     * @returns {Promise<boolean>} A promise that resolves to true if the login is successful, false otherwise.
     */
    async loginAPI(userId, password) {
        // Simulate a successful login
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(userId === "test" && password === "password");
            }, 1000);
        });
    }
}

export default LoginUserUseCase;
