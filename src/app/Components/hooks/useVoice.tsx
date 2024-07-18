import { useEffect, useRef, useState } from "react";
import * as tts from "@diffusionstudio/vits-web"
import { workerData } from "worker_threads";
function useVoice() {


    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    


    useEffect(() => {
        if(window){
           window.addEventListener('unload', (e) => {
                console.log(e)
                cancelMessage();
           })
        }
    },[])


    const playMessage = async (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        if(window.speechSynthesis){
            await cancelMessage();
            utterance.voice = voices[0];
            window.speechSynthesis.speak(utterance);
            
        }
        return utterance; 
       
    }
    const cancelMessage = async () => {
        if(window.speechSynthesis){
            window.speechSynthesis.dispatchEvent(new Event('voiceschanged'))
            window.speechSynthesis.cancel();
        }
    }


    return {
        playMessage,
        cancelMessage


    }
}



export default useVoice