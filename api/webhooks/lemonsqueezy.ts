import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHmac } from 'crypto'
import { query } from '../lib/db'



const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const rawBody = JSON.stringify(req.body)
    const signature = req.headers['x-signature'] as string

    if (!signature) {
        return res.status(400).json({ error: 'Missing signature' })
    }

    // 🔐 Verify webhook signature
    const hmac = createHmac('sha256', WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex')

    if (hmac !== signature) {
        return res.status(401).json({ error: 'Invalid signature' })
    }

    const eventName = req.body?.meta?.event_name
    const data = req.body?.data

    if (!eventName || !data) {
        return res.status(200).json({ received: true })
    }

    // ✅ Only handle subscription events
    if (
        eventName !== 'subscription_created' &&
        eventName !== 'subscription_updated' &&
        eventName !== 'subscription_cancelled'
    ) {
        return res.status(200).json({ received: true })
    }

    const subscriptionId = data.id
    const status = data.attributes?.status
    const extensionId = data.attributes?.custom_data?.extensionId

    // 🔒 Guard: extensionId is REQUIRED for entitlement
    if (!extensionId) {
        console.warn('Lemon Squeezy webhook missing extensionId')
        return res.status(200).json({ received: true })
    }

    // 💾 Persist to Postgres (UPSERT)
    await query(
        `
    INSERT INTO subscriptions (extension_id, subscription_id, status)
    VALUES ($1, $2, $3)
    ON CONFLICT (extension_id)
    DO UPDATE SET
      subscription_id = EXCLUDED.subscription_id,
      status = EXCLUDED.status,
      updated_at = NOW()
    `,
        [extensionId, subscriptionId, status] //$1, $2, $3 (prevents sql injection)
    )

    return res.status(200).json({ received: true })
}
 // sql expn
 //In plain English: Try to insert a subscription. 
 // If one already exists for this extension_id, update it instead with the new subscription_id and status, 
 // and refresh the timestamp. This is called an "upsert" (update or insert).
