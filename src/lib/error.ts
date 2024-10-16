export class AuthError extends Error {
    name: 'AuthError';
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}
