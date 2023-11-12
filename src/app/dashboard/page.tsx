'use client'

import React from 'react'
import { DataTableDemo } from './CardTable'
import { CardTable } from './FlashCard'
import axios from 'axios'
import '../globals.css'
import { Button } from '@/components/ui/button'
import { AddFlashCard } from './AddFlashCard/AddFlashCard'
import { Toaster } from '@/components/ui/toaster'

import './button.css'

export default function Dashboard() {
    const [flashCards, setFlashCards] = React.useState({})
    const [showFlashCard, setShowFlashCard] = React.useState(false)
    const [showCreateCard, setShowCreateCard] = React.useState(false)
    const [currentCardSelectedID, setCurrentCardSelectID] = React.useState(0)

    console.log(flashCards)
    React.useEffect(() => {
        // TODO: IF LOADING, DO NOT RENDER YOU HAVE NO FLASH CARDS
        axios
            .post('/api/loadCards', { userKey: window.localStorage.userId })
            .then((cards) => {
                setFlashCards(cards.data.data)
            })
            .catch((err) => err)
    }, [])

    return (
        <div className="container ">
            <div className="border-b-4 black">
                <h1>Japanese Flash Cards</h1>
                {flashCards.length ? (
                    <DataTableDemo
                        currentFlashCard={flashCards}
                        setShowFlashCard={setShowFlashCard}
                        setCurrentCardSelectID={setCurrentCardSelectID}
                    />
                ) : (
                    'Loading...'
                )}
            </div>
            {showCreateCard ? (
                <AddFlashCard
                    setShowCreateCard={setShowCreateCard}
                    setFlashCards={setFlashCards}
                />
            ) : null}
            {showFlashCard ? (
                <CardTable
                    currentCardSelectedID={currentCardSelectedID}
                    cardData={flashCards}
                    disableCard={setShowFlashCard}
                />
            ) : null}
            <div className="flex justify-center place-items-center">
                <button
                    onClick={() => setShowCreateCard(true)}
                    className="red-button"
                >
                    Add a card deck
                </button>
            </div>
            <Toaster />
        </div>
    )
}
