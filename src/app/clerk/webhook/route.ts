export const POST = async (req: Request) => {
    const { data } = await req.json();
    const firstName = data.first_name;
    const lastName = data.last_name;
    const email = data.email_addresses[0]?.email_address;
    const imageUrl = data.image_url;
    const id = data.id;

    console.log('User created:', { id, firstName, lastName, email, imageUrl });
    return new Response('ok', { status: 200 });
};
