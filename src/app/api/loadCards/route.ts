import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const data = [
    {
        id: '2312',
        title: 'Example card',
        wordsToStudy: [
            ['test1', 'testo'],
            ['test2', 'testo'],
            ['test3', 'testo'],
            ['test4', 'testo'],
        ],
        reviewStatus: 'Unreviewed',
        dateCreated: '',
    },
    {
        id: '1313',
        title: 'Example card',
        wordsToStudy: [
            ['test1', 'testo'],
            ['test2', 'testo'],
            ['test3', 'testo'],
            ['test4', 'testo'],
        ],
        reviewStatus: 'Unreviewed',
    },
    {
        id: '4323',
        title: 'Example card',
        wordsToStudy: [
            ['test1', 'testo'],
            ['test2', 'testo'],
            ['test3', 'testo'],
            ['test4', 'testo'],
        ],
        reviewStatus: 'Reviewed',
    },
]

export async function POST(req, res) {
    const { getUser, isAuthenticated } = getKindeServerSession()

    if (!isAuthenticated()) {
        return new Response('Unauthorized', { status: 401 })
    }

    const current = await req.json()
    console.log(current.userKey, 'here')
    // TODO: SEARCH FOR USER KEY
    // LOAD CURRENT CARDS
    // IF NONE SEND EMPTY ARRAY
    return NextResponse.json({ data })
}
