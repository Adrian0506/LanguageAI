import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { connectToDataBase } from '../db/connectToDb'
import mongoose from 'mongoose'
import User from '../db/userSchema'

// {
//     id: '2312',
//     title: 'Example card',
//     wordsToStudy: [
//         ['test1', 'testo'],
//         ['test2', 'testo'],
//         ['test3', 'testo'],
//         ['test4', 'testo'],
//     ],
//     reviewStatus: 'Unreviewed',
//     dateCreated: '',
// },
export async function POST(req, res) {
    const { getUser, isAuthenticated } = getKindeServerSession()
    let data = {}
    if (!isAuthenticated()) {
        return new Response('Unauthorized', { status: 401 })
    }
    try {
        await connectToDataBase()
        const current = await req.json()
        const currentUser = await User.findOne({ userId: current.userKey })
        data = currentUser.currentCards
        console.log(current.data)
        //TODO: Search for most recent card,
        //If no card exist set id to 1.
        // We want to also send dateCreated. that will be created in the backend
        // Backend will PARSE IT
        // Front end should always send valid information no matter what, so we should not have to worry about that
        let curLength = 0
        if (currentUser.currentCards.length === 1) {
            curLength = 1
        } else {
            curLength = currentUser.currentCards.length += 1
        }
        const date = new Date()
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })

        console.log(formattedDate)
        currentUser['currentCards'].push({
            id: curLength.toString(),
            title: current.data.title,
            wordsToStudy: current.data.wordsToStudy,
            reviewStatus: 'Unreviewed',
            dateCreated: formattedDate,
        })

        console.log(currentUser['currentCards'], ' FROM HERE')
        currentUser.save()
        data = currentUser['currentCards']
    } catch (err) {
        console.log(err)
    } finally {
    }

    console.log(data, 'FROM BE')
    return NextResponse.json({ data })
}
