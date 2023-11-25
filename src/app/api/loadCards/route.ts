import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { connectToDataBase } from '../db/connectToDb'
import mongoose from 'mongoose'
import User from '../db/userSchema'

export async function POST(req, res) {
    const { getUser, isAuthenticated } = getKindeServerSession()
    let data = {}
    if (!isAuthenticated()) {
        return new Response('Unauthorized', { status: 401 })
    }
    try {
        await connectToDataBase()
        const current = await req.json()
        const currentUser = await User.find({ userId: current.userKey })
        if (!currentUser.length) {
            const alice = new User({
                userId: current.userKey,
                currentCards: [],
            })
            await alice.save()
        } else {
            data = currentUser[0].currentCards
        }
    } catch (err) {
        console.log(err)
    }
    return NextResponse.json({ data })
}
