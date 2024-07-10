import { chatConversation, chatConversationDay } from "@/interfaces/conver";
import { useEffect, useState } from "react";




const useConversation = () => {
    
   
    const [mapConversation, setMapConversation] = useState<chatConversationDay[]>([]);
    let storageEvent : StorageEvent 


    const loadConverSetions = () => {
        if (window.localStorage) {
            let conversations : chatConversation[] = JSON.parse(window.localStorage.getItem("conversations") || "[]")
            if (conversations) {
               
                conversations = conversations.reverse()
                setMapConversation(orderToDates(conversations))
            }else{
                return []
            }
        }
    }
    const orderToDates = (conversations: chatConversation[]) => {
        let chatConversationDays: chatConversationDay[] = []

        conversations.forEach((conversation) => {
            let date = conversation.date
            let chatConversationDay = chatConversationDays.find((item) => item.date === date)
            if(chatConversationDay == undefined){
                chatConversationDay = {
                    date: date,
                    conversations: [conversation]
                }
                chatConversationDays.push(chatConversationDay)
            }else{
                chatConversationDay.conversations.push(conversation)
            
            }
        })
       
        return chatConversationDays
        
    }

    return {
        mapConversation,
        loadConverSetions
    }

}
export default useConversation;