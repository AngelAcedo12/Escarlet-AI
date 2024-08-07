import { Message } from "./message";

export interface chatConversation {
    messages: Message[];
    date : string;
    title: string;
    id: string;
    new: boolean;
}

export interface chatConversationDay{
    date : string;
    conversations: chatConversation[]
}