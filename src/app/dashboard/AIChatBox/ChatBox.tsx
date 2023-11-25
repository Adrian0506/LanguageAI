import React, { useState } from 'react'
import submitRequest from './submitRequest'

interface Message {
    role: 'user' | 'loading' | 'server'
    content: string
}

const ChatBox: React.FC = () => {
    const [userMessage, setUserMessage] = useState<string>('')
    const [chatHistory, setChatHistory] = useState<Message[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const handleUserMessageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserMessage(event.target.value)
    }

    const handleSendMessage = async () => {
        // Add user message to chat history
        setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { role: 'user', content: userMessage },
        ])

        // Show loading indicator
        setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { role: 'loading', content: '...' },
        ])

        try {
            // Simulate server reply (you can replace this with actual server communication)
            const serverReply = await submitRequest(userMessage)
            // Add server reply to chat history
            setChatHistory((prevChatHistory) => [
                ...prevChatHistory,
                { role: 'server', content: serverReply },
            ])
        } catch (error) {
            console.error('Error:', error)
            // Handle error and update chat history accordingly
        } finally {
            // Clear loading indicator
            setChatHistory((prevChatHistory) =>
                prevChatHistory.filter((message) => message.role !== 'loading')
            )

            // Clear the input field
            setUserMessage('')
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && userMessage.trim() !== '') {
            // Prevent the default behavior of the Enter key (e.g., submitting a form)
            event.preventDefault()
            // Send the message
            handleSendMessage()
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.chatContainer}>
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.messageBubble,
                            backgroundColor:
                                message.role === 'user'
                                    ? '#ff5a5f'
                                    : message.role === 'loading'
                                    ? '#ccc'
                                    : '#2196F3',
                            alignSelf:
                                message.role === 'user'
                                    ? 'flex-end'
                                    : 'flex-start',
                        }}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={userMessage}
                    onChange={handleUserMessageChange}
                    onKeyPress={handleKeyPress}
                    style={styles.input}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} style={styles.sendButton}>
                    Send
                </button>
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        bottom: '5%',
        right: '5%',
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        height: '40%',
        width: '20%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    chatContainer: {
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
    },
    messageBubble: {
        marginBottom: '10px',
        padding: '8px',
        borderRadius: '8px',
        color: 'white',
    },
    inputContainer: {
        display: 'flex',
        marginTop: '10px',
        padding: '10px',
    },
    input: {
        flex: 1,
        padding: '8px',
        marginRight: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    sendButton: {
        padding: '8px',
        backgroundColor: '#ff5a5f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
}

export default ChatBox
