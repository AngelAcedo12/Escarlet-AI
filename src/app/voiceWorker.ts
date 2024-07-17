import * as tts from "@diffusionstudio/vits-web"
self.onmessage = async(msg) => {
    console.log(msg.data)

    if(msg.data.type == "download"){
        tts.download(
            msg.data.voiceId
        )
    }
    if(msg.data.type == "predict"){
        obteingPredict(msg.data.text, msg.data.voiceId)
    }
    if(msg.data.type == "stored"){
        tts.stored().then((voices) => {
            self.postMessage(voices)
        })
    }
}



const obteingPredict = async(text: string, voiceId: tts.VoiceId) => {
     
    const get = async() => {
      return  await tts.predict({
            text: text,
            voiceId: "es_ES-mls_9972-low"
        }).then((waw) => {
            return waw
        })
    
    }
    const waw = await get().then((waw) => {
      
        return waw
    })

    self.postMessage({
        type: "predict",
        waw:waw
    })
    
    
}