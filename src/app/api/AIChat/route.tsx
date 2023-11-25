import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function POST(req, res) {
    const { getUser, isAuthenticated } = getKindeServerSession()
    let data = {} as any
    if (!isAuthenticated()) {
        return new Response('Unauthorized', { status: 401 })
    }
    try {
        const userMessageData = await req.json()

        const apiUrl = 'https://api.openai.com/v1/chat/completions'
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_APIKEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-1106',
                messages: [
                    {
                        role: 'user',
                        content: `${userMessageData.message}`,
                    },
                ],
                temperature: 0.7,
            }),
        })

        data = await response.json()
        console.log(data)
    } catch (err) {
        console.error(err)
    }
    return NextResponse.json({ data })
}
