import { AuthError } from '@/lib/error';
import { auth } from '@clerk/nextjs/server';

export const createUserContext = () => {
    const { userId } = auth();
    if (!userId) {
        throw new AuthError('User not authenticated');
    }
    return { userId };
};
