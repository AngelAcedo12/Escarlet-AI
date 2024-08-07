"use client"
import React, { useEffect, useMemo, useState } from "react";
import { useChat } from "../hooks/useChat";
import useConversation from "../hooks/useConversation";
import { typesMobile } from "@/constants/mobile";
import useVoice from "../hooks/useVoice";

interface chatContextInteface {
    chat: ReturnType<typeof useChat>;
    conversationHook: ReturnType<typeof useConversation>;
    voice : ReturnType<typeof useVoice>;
    isCompatible: boolean;
}

const chatContext = React.createContext<chatContextInteface>({
    chat: {} as ReturnType<typeof useChat>,
    conversationHook: {} as ReturnType<typeof useConversation>,
    voice: {} as ReturnType<typeof useVoice>,
    isCompatible: false,
} as chatContextInteface);  


export function ChatProvider({ children }: { children: React.ReactNode }) {
    const chat = useChat();
    const conversationHook = useConversation();
    const voice = useVoice();
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
        if(chat.mobile == typesMobile.MOBILE){
            conversationHook.changeStateOpenOrClose()
        }
        
    }, [])


    const value = useMemo(() => {
        return {
            chat,
            conversationHook,
            isCompatible,
            voice

        }
    }, [chat,conversationHook,voice])

    return <chatContext.Provider value={value}  > {children}</chatContext.Provider>
}

export function useChatContext() {
    const context = React.useContext(chatContext);
    
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}

