import type { VercelRequest, VercelResponse } from '@vercel/node'
import { query } from './lib/db'

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    const extensionId = req.query.extensionId as string

    if (!extensionId) {
        return res.status(400).json({ error: 'Missing extensionId' })
    }

    const result = await query(
        `
    SELECT status
    FROM subscriptions
    WHERE extension_id = $1
    LIMIT 1
    `,
        [extensionId]
    )

    const isPro = result.rows[0]?.status === 'active'

    return res.status(200).json({ pro: isPro })
}
