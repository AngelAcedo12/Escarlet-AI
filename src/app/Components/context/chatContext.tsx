import React, { useEffect, useMemo, useState } from "react";
import { useChat } from "../hooks/useChat";
import useConversation from "../hooks/useConversation";

interface chatContextInteface {
    chat: ReturnType<typeof useChat>;
    conversationHook: ReturnType<typeof useConversation>;
    isCompatible: boolean;
}

const chatContext = React.createContext<chatContextInteface>({
    chat: {} as ReturnType<typeof useChat>,
    conversationHook: {} as ReturnType<typeof useConversation>,
    isCompatible: false,
} as chatContextInteface);  


export function ChatProvider({ children }: { children: React.ReactNode }) {
    const chat = useChat();
    const conversationHook = useConversation();
    const [isCompatible, setIsCompatible] = useState<boolean>(true);
    const [register, setRegister] = useState<boolean>(false);


    async function initWorket() {

        chat.initEngineWorkerRef.current = new Worker(
            new URL("../../worker.ts", import.meta.url),
            { type: 'module' },
        );


        if (register == false) {
             chat.initChat()
        }


    }

    const detectedCompatibility = () => {
        const response = chat.isCompatible();
        return response;

    };

    useEffect(() => {

        if (window) {
            conversationHook.loadConverSetions()    
        }
        setIsCompatible(detectedCompatibility());
      
        if (chat.engine == null || chat.engine == undefined) {
            setRegister(true);
            initWorket()
            console.log("Se registro el worker")
        }
    }, [])


    const value = useMemo(() => {
        return {
            chat,
            conversationHook,
            isCompatible,

        }
    }, [chat,conversationHook])

    return <chatContext.Provider value={value}  > {children}</chatContext.Provider>
}

export function useChatContext() {
    const context = React.useContext(chatContext);
    
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}

