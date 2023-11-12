import {
    getKindeServerSession,
    RegisterLink,
    LoginLink,
    LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server'
import TypeWriter from './TypeWriter'
import Link from 'next/link'

import './globals.css'
import StoreUserId from './storeUserId'

export const metadata = {
    title: 'Kinde Auth',
    description: 'Kinde with NextJS App Router',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated, getUser } = await getKindeServerSession()
    const user = await getUser()
    return (
        <html lang="en">
            <body>
                <header>
                    <nav className="container z-50 nav">
                        <h1 className="font-thin text-display-3">日本語</h1>
                        <div>
                            {!isAuthenticated() ? (
                                <></>
                            ) : (
                                <div className="profile-blob">
                                    {user?.picture ? (
                                        <img
                                            className="avatar"
                                            src={user?.picture}
                                            alt="user profile avatar"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <div className="avatar">
                                            {user?.given_name?.[0]}
                                            {user?.family_name?.[0]}
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-heading-2">
                                            {user?.given_name}{' '}
                                            {user?.family_name}
                                        </p>

                                        <LogoutLink className="text-subtle">
                                            Log out
                                        </LogoutLink>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                    <StoreUserId id={user?.id} />
                    {children}
                </header>
            </body>
        </html>
    )
}
