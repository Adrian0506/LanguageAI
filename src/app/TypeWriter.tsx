'use client'
import { Typewriter } from 'react-simple-typewriter'

export default function TypeWriter() {
    return (
        <div className="text-4xl text-white">
            <Typewriter
                words={[
                    'Japanese Flash Cards',
                    'じゃぱねすえ ふらっしゅ かーず',
                ]}
                loop={Infinity}
                cursor
                cursorStyle="."
                typeSpeed={70}
                deleteSpeed={100}
                delaySpeed={3000}
            />
        </div>
    )
}
