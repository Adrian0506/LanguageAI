import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import axios from 'axios'

export async function POST(req, body) {
    const { getUser, isAuthenticated } = getKindeServerSession()
    if (!isAuthenticated()) {
        return new Response('Unauthorized', { status: 401 })
    }

    const headers = {
        'Content-Type': 'application/json', // You can adjust the Content-Type based on your needs
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_APIKEY}`, // Replace with your actual authorization token
    }

    const wordToTranslate = await req.json()

    console.log(wordToTranslate.word)
    const data = {
        text: [wordToTranslate.word],
        target_lang: 'JA',
    }

    let requestData = {}

    try {
        const response = await axios.post(
            'https://api-free.deepl.com/v2/translate',
            data,
            {
                headers,
            }
        )
        console.log(response.data)
        requestData = response.data
        // Any other code you want to execute after a successful request
    } catch (error) {
        // Handle errors here
    }

    return NextResponse.json({ requestData })
}
