import { init } from '@paralleldrive/cuid2';

// The init function returns a custom createId function with the specified
// configuration. All configuration properties are optional.
const createId = init({
    // You can use this to pass a cryptographically secure random function.
    random: Math.random,
    // the length of the id
    length: 32,
    // A custom fingerprint for the host environment. This is used to help
    // prevent collisions when generating ids in a distributed system.
    fingerprint: process.env.CUID_FINGERPRINT_SALT,
});

export default createId;
