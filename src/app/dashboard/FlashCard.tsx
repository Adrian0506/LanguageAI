import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WordCard from './Card/Card'
import './button.css'
import './dimmer.css'

import { AiOutlineClose } from 'react-icons/ai'
export function CardTable({ disableCard, cardData, currentCardSelectedID }) {
    const [currentWords, setCurrentWords] = React.useState([0, 0])
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [endOfCards, setEndOfCards] = React.useState(false)
    //TODO: Add support for incorrect words and correct words
    const [incorrectWords, setIncorrectWords] = React.useState([])
    const [correctWords, setCorrectWords] = React.useState([])

    React.useEffect(() => {
        cardData.forEach((item) => {
            if (item.id === currentCardSelectedID) {
                setCurrentWords(item.wordsToStudy)
            }
        })
    }, [])
    console.log(cardData, 'from this component')
    const setNextCard = (answer) => {
        if (!answer) {
            setIncorrectWords((prev) => [...prev, currentWords[currentIndex]])
        } else {
            setCorrectWords((prev) => [...prev, currentWords[currentIndex]])
        }

        console.log(correctWords)
        console.log(currentIndex, currentWords, 'LENGTHS')
        if (!currentWords[currentIndex + 1]) {
            console.log(currentIndex, currentWords, 'here')
            setEndOfCards(true)
            return
        }
        setCurrentIndex((prev) => prev + 1)
    }

    const resetGame = (resetFullGame: boolean) => {
        if (resetFullGame) {
            setCurrentWords(correctWords)
            setCurrentIndex(0)
            setEndOfCards(false)
            setCorrectWords([])
        } else {
            setCurrentWords(incorrectWords)
            setCurrentIndex(0)
            setEndOfCards(false)
            setIncorrectWords([])
        }
    }

    return (
        <div className="dimmer">
            <Card className="fixed z-30 justify-center w-2/4 bg-white content h-3/4 top-10">
                <CardHeader>
                    <div className="flex flex-row justify-between">
                        <CardTitle className="text-5xl ">
                            {cardData.title}
                        </CardTitle>
                        <AiOutlineClose onClick={() => disableCard(false)} />
                    </div>
                </CardHeader>
                <CardContent>
                    {!endOfCards ? (
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                                <WordCard
                                    setEndOfCards={setEndOfCards}
                                    currentWords={currentWords}
                                    currentIndex={currentIndex}
                                />
                            </div>
                            <div className="flex flex-row justify-center gap-8">
                                <button className="close-button">
                                    <div
                                        onClick={() => setNextCard(false)}
                                        className="icon"
                                    >
                                        X
                                    </div>
                                </button>
                                <button className="open-button">
                                    <div
                                        className="icon"
                                        onClick={() => setNextCard(true)}
                                    >
                                        ✓
                                    </div>
                                </button>
                            </div>
                        </div>
                    ) : null}

                    {endOfCards ? (
                        <>
                            <button onClick={() => resetGame(true)}>
                                {correctWords.length} CORRECTO
                            </button>
                            {incorrectWords.length ? (
                                <button onClick={() => resetGame(false)}>
                                    {incorrectWords.length} INCORRECTO
                                </button>
                            ) : (
                                <h1>Hooray you got all the words correct!</h1>
                            )}
                        </>
                    ) : null}
                </CardContent>
            </Card>
        </div>
    )
}
