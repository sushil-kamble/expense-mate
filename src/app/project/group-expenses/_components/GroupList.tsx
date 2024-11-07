import { db } from '@/db';
import { groups } from '@/db/schema/groupExpense';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';

async function GroupsList() {
    const { userId } = auth();
    if (!userId) return <></>;

    const groupList = await db
        .select()
        .from(groups)
        .where(and(eq(groups.userId, userId), eq(groups.isDeleted, false)));

    return (
        <div>
            {groupList.length > 0 ? (
                <ul className="flex flex-col gap-4">
                    {groupList.map((group) => (
                        <li
                            key={group.id}
                            className="w-full border rounded-md hover:bg-secondary"
                        >
                            <Link
                                href={`/project/group-expenses/${group.name + '-$-' + group.id}`}
                                key={group.id}
                                className="block p-4 cursor-pointer"
                            >
                                <h3>{group.name}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No groups found.</p>
            )}
        </div>
    );
}

export default GroupsList;
