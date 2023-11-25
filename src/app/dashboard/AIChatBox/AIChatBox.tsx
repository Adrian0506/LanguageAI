import React from 'react'
import submitRequest from './submitRequest'
import './css/ChatBubble.css'
import ChatBox from './ChatBox'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const AIChatBox = () => {
    const [showChatBox, setChatBox] = React.useState(false)

    const setChat = () => {
        setChatBox(!showChatBox)
    }

    return (
        <React.Fragment>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div
                            onClick={setChat}
                            className="fixed bottom-0 right-0 object"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Chat with AI</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {showChatBox ? <ChatBox /> : null}
        </React.Fragment>
    )
}

export default AIChatBox
