import React from 'react'
import './card.css'

const Card = ({ currentWords, currentIndex }) => {
    const [flipCard, setFlipCard] = React.useState(false)
    const [isFlipped, setIsFlipped] = React.useState(false)
    const handleCardClick = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div
            className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            onClick={handleCardClick}
        >
            <div className="card-content front">
                {currentWords[currentIndex][1]}
            </div>
            <div className="card-content back">
                {currentWords[currentIndex][0]}
            </div>
        </div>
    )
}

export default Card
