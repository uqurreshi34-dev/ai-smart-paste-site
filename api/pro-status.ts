import type { VercelRequest, VercelResponse } from '@vercel/node'

const LEMON_API_KEY = process.env.LEMON_SQUEEZY_API_KEY!

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const extensionId = req.query.extensionId as string | undefined

    if (!extensionId) {
        return res.status(400).json({ error: 'Missing extensionId' })
    }

    try {
        const response = await fetch(
            'https://api.lemonsqueezy.com/v1/subscriptions',
            {
                headers: {
                    Authorization: `Bearer ${LEMON_API_KEY}`,
                    Accept: 'application/vnd.api+json',
                },
            }
        )

        if (!response.ok) {
            throw new Error('Failed to fetch subscriptions')
        }

        const data = await response.json()

        const isPro = data.data?.some((sub: any) => {
            const status = sub.attributes.status
            const meta = sub.attributes.metadata
            return (
                status === 'active' &&
                meta?.extensionId === extensionId
            )
        })

        return res.status(200).json({ isPro: Boolean(isPro) })
    } catch (err) {
        console.error('[pro-status]', err)
        return res.status(500).json({ error: 'Internal error' })
    }
}
