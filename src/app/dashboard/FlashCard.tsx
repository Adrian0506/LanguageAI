import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WordCard from './Card/Card'
import './button.css'
import './dimmer.css'

import { AiOutlineClose } from 'react-icons/ai'
export function CardTable({ disableCard, cardData, currentCardSelectedID }) {
    const [currentWords, setCurrentWords] = React.useState([0, 0])
    const [currentIndex, setCurrentIndex] = React.useState(0)

    //TODO: Add support for incorrect words and correct words
    const [incorrectWords, setIncorrectWords] = React.useState(0)
    const [correctWords, setCorrectWords] = React.useState(0)

    React.useEffect(() => {
        cardData.forEach((item) => {
            if (item.id === currentCardSelectedID) {
                setCurrentWords(item.wordsToStudy)
            }
        })
    }, [])

    return (
        <div className="dimmer">
            <Card className="fixed z-30 justify-center w-2/4 bg-white content h-3/4 top-10">
                <CardHeader>
                    <div className="flex flex-row justify-between">
                        <CardTitle className="text-5xl ">
                            Vocabulary Quiz 2
                        </CardTitle>
                        <AiOutlineClose onClick={() => disableCard(false)} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <div className="flex justify-center">
                            <WordCard
                                currentWords={currentWords}
                                currentIndex={currentIndex}
                            />
                        </div>
                        <div className="flex flex-row justify-center gap-8">
                            <button className="close-button">
                                <div
                                    onClick={() =>
                                        setCurrentIndex((prev) => prev + 1)
                                    }
                                    className="icon"
                                >
                                    X
                                </div>
                            </button>
                            <button className="open-button">
                                <div
                                    className="icon"
                                    onClick={() =>
                                        setCurrentIndex((prev) => prev + 1)
                                    }
                                >
                                    ✓
                                </div>
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
