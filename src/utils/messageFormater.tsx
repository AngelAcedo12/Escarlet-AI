import { CodeBlock, dracula, PrismLangauge, xonokai } from "@react-email/code-block";
import { ReactElement, CSSProperties } from "react";


interface MessagePart {
  leguaje?: string;
  text: string;
  type: 'code' | 'inline-code' | 'bold' | 'normal' ;
}


const obteinsParts = (text: string): MessagePart[] => {

 
  const regexSplit = /(```[\s\S]*?```)|(`[\s\S]*?`)|(\*\*[\s\S]*?\*\*)|(__[\s\S]*?__)|(\*[\s\S]*?\*)|(_[\s\S]*?_)|(~[\s\S]*?~)|(\[\[[\s\S]*?\]\])/g;

  return text.split(regexSplit).filter((part, index) => {
    if (part != undefined) {
      return true;
    } else {
      return false;
    }
  }).map((part, index) => {
    if (part.match(/```[\s\S]*?```/)) {
      let textPart = part.replace(/```/g, '');
      let lenguaje = textPart.substring(0, textPart.indexOf('\n'));
      textPart = textPart.replace(lenguaje, '');
      return {
        leguaje: lenguaje,
        text: textPart,
        type: 'code'
      };
    } else if (part.match(/`[\s\S]*?`/)) {
      return {
        text: part,
        type: 'inline-code'
      };
    } else if (part.match(/\*\*[\s\S]*?\*\*/)) {
      return {
        text: part,
        type: 'bold'
      };
    } 
    else {
      return {

        text: part,
        type: 'normal'
      };
    }
  });

}




const createHtml = (parts: MessagePart[]): ReactElement => {


  const style: CSSProperties = {
    padding: '1em',
    margin: '0',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    textWrap: 'wrap',
  }

  return (
    <p dir="auto" className="">
      {
        parts.map((part, index) => {
          switch (part.type) {
            case 'code':
              return <span className=' mt-5 mb-5 rounded-t-lg ' dir='auto' key={index}  >
                <div className='bg-slate-400 rounded-t-lg p-2 'style={{
                  borderTopLeftRadius: '0.5rem',
                  borderTopRightRadius: '0.5rem',
                }} >{part.leguaje}</div>
                <div className='rounded-b-xl  '>
                  <CodeBlock style={style} code={part.text} language={part.leguaje as PrismLangauge} theme={dracula} />

                  {/* <code className='text-white text-start overflow-auto  '>
                    {part.text}
                  </code> */}
                </div>
              </span>
            case 'inline-code':
              return <span className='font-bold  w-fit text-wrap' key={index} >{part.text}</span>
            case 'bold':
              return <strong key={index}>{part.text}</strong>
            default:
              return <span style={
                {
                  whiteSpace: 'pre-line',
                }
              }>{part.text}</span>
          }
        })

      }
    </p>
  )


}


const messageFormater = (text: string) => {


  let parts = obteinsParts(text)
  let html: ReactElement = createHtml(parts)

  return (
    <div className='whitespace-pre-line' dir='auto' >
      {html}
    </div>
  )
}

export { messageFormater }