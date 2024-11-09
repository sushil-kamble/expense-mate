import * as users from '@/db/schema/users';
import * as groupExpense from '@/db/schema/groupExpense';
import * as personalExpense from '@/db/schema/personalExpense';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, {
    schema: { ...users, ...groupExpense, ...personalExpense },
});

export { db };
