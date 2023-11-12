import styles from './page.module.css'
import Link from 'next/link'
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/server'
import TypeWriter from './TypeWriter'
import './globals.css'

export default function Home() {
    return (
        <div className="absolute inset-0 z-30 flex flex-col justify-center bg-gray-700 place-items-center item-center top-28">
            <TypeWriter />
            <div className="flex flex-row mt-6 gap-9">
                <LoginLink className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Log in
                </LoginLink>
                <RegisterLink className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Sign up
                </RegisterLink>
            </div>
        </div>
    )
}
