import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHmac } from 'crypto'
import { query } from '../lib/db'

export const config = {
    api: {
        bodyParser: false, // 🔴 CRITICAL
    },
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        return res.status(500).json({ error: 'Missing webhook secret' })
    }

    // 🔴 Read RAW body
    const buffers: Buffer[] = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    const rawBody = Buffer.concat(buffers)

    const signature = req.headers['x-signature'] as string
    if (!signature) {
        return res.status(400).json({ error: 'Missing signature' })
    }

    // 🔐 Verify signature
    const expected = createHmac('sha256', WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex')

    if (signature !== expected) {
        return res.status(401).json({ error: 'Invalid signature' })
    }

    // ✅ Safe to parse now
    const payload = JSON.parse(rawBody.toString('utf8'))

    const eventName = payload.meta?.event_name
    const data = payload.data
    const extensionId = payload.meta?.custom_data?.extensionId

    if (!extensionId) {
        return res.status(400).json({ error: 'Missing extensionId' })
    }

    if (
        eventName !== 'subscription_created' &&
        eventName !== 'subscription_updated' &&
        eventName !== 'subscription_cancelled'
    ) {
        return res.status(200).json({ received: true })
    }

    const status =
        eventName === 'subscription_cancelled' ? 'cancelled' : 'active'

    await query(
        `
    INSERT INTO subscriptions (extension_id, subscription_id, status)
    VALUES ($1, $2, $3)
    ON CONFLICT (extension_id)
    DO UPDATE SET
      status = EXCLUDED.status,
      subscription_id = EXCLUDED.subscription_id,
      updated_at = now()
    `,
        [extensionId, data.id, status]
    )

    return res.status(200).json({ received: true })
}
