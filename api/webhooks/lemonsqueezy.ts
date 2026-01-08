import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

export const config = {
    api: {
        bodyParser: false,
    },
}

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

async function readRawBody(req: VercelRequest): Promise<string> {
    return new Promise((resolve, reject) => {
        let data = ''
        req.on('data', chunk => (data += chunk))
        req.on('end', () => resolve(data))
        req.on('error', reject)
    })
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const signature = req.headers['x-signature'] as string | undefined
    if (!signature) {
        return res.status(400).json({ error: 'Missing signature' })
    }

    const rawBody = await readRawBody(req)

    const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex')

    if (signature !== expectedSignature) {
        console.warn('[Webhook] Invalid signature')
        return res.status(401).json({ error: 'Invalid signature' })
    }

    const event = JSON.parse(rawBody)
    const eventName = event?.meta?.event_name
    const extensionId = event?.meta?.custom_data?.extensionId

    console.log('[Webhook] Event:', eventName, extensionId)

    return res.status(200).json({ received: true })
}
