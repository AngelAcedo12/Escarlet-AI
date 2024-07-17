
import { useEffect, useRef, useState } from "react";
import * as tts from "@diffusionstudio/vits-web"
import { workerData } from "worker_threads";
function useVoice() {


    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    const audioWorker = useRef<Worker>();
    let audio: HTMLAudioElement | undefined




    useEffect(() => {
        addWorkers()
    }, [])
    const addWorkers = () => {
        if (audioWorker.current == undefined) {
            audioWorker.current = new Worker(
                new URL("../../voiceWorker.ts", import.meta.url),
                { type: 'module' },
            );
            domwloadVoices()
            audio = new Audio()
        }


    }
    const domwloadVoices = async () => {
        let voices = await tts.stored().then((voices) => {
            return voices
        })
        voices.filter((voice) => {
            voice == "es_ES-mls_9972-low"
        })
        if (audioWorker.current != undefined) {
            if (voices.length == 0) {
                audioWorker.current.postMessage({ type: "download", voiceId: "es_ES-mls_9972-low" })

            }

        }

    }
    const playMessage = async (text: string) => {


        if (audio == undefined) {
            audio = new Audio()
        }


        if (audioWorker.current != undefined) {

            audioWorker.current.postMessage({ type: "predict", text: text, voiceId: "es_ES-mls_9972-low" })

        }
    }

    function getAudio() {
        return audio
    }

    return {
        playMessage,
        tts,
        getAudio,
        audioWorker,
       


    }
}



export default useVoice