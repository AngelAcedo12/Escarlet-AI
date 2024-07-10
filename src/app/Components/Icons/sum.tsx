import React from 'react'

type Props = {
    height?: number;
    width?: number;
}

export default class Sum extends React.Component<Props &  {className : string},{}> {
    render() {
        const { className, width, height} = this.props;
        return (
            <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} className={className}><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        )
    }
}

