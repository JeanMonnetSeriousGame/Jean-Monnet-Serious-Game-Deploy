
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '@/drizzle/schema'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString)

export const db = drizzle(client, {schema});
        