import React from 'react'

type Props = {
    height?: number;
    width?: number;
}

export default class PauseBtn extends React.Component<Props &  {className : string},{}> {
    render() {
        const { className, width, height} = this.props;
        return (
            <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} className={className}><path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z"/></svg>
        )
    }
}



