import type { VercelRequest, VercelResponse } from '@vercel/node'
import { setPro } from '../../src/lib/proStore.js'
import crypto from 'crypto'

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const signature = req.headers['x-signature'] as string
    const rawBody = JSON.stringify(req.body)

    const hmac = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex')

    if (hmac !== signature) {
        console.warn('[Webhook] Invalid signature')
        return res.status(401).json({ error: 'Invalid signature' })
    }

    const event = req.body
    const eventName = event?.meta?.event_name
    const extensionId = event?.data?.attributes?.metadata?.extensionId

    console.log('[Webhook] Event:', eventName)

    if (
        eventName === 'subscription_created' ||
        eventName === 'subscription_updated'
    ) {
        if (!extensionId) {
            console.warn('[Webhook] Missing extensionId')
        } else {
            setPro(extensionId, true)
            console.log(`[Webhook] PRO enabled for ${extensionId}`)
        }
    }

    if (eventName === 'subscription_cancelled') {
        if (!extensionId) {
            console.warn('[Webhook] Missing extensionId')
        } else {
            setPro(extensionId, false)
            console.log(`[Webhook] PRO revoked for ${extensionId}`)
        }
    }

    return res.status(200).json({ received: true })
}
