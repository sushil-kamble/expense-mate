import { db } from '@/db';
import { users } from '@/db/schema/users';

export const POST = async (req: Request) => {
    const { data } = await req.json();
    const firstName = data.first_name;
    const lastName = data.last_name;
    const email = data.email_addresses[0]?.email_address;
    const imageUrl = data.image_url;
    const id = data.id;

    await db.insert(users).values({
        id,
        firstName,
        lastName,
        email,
        profileImage: imageUrl,
    });

    return new Response('ok', { status: 200 });
};
