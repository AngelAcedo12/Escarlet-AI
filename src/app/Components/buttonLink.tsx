import Link from 'next/link';
import React from 'react'

type ButtonLinkProps = {
  href: string;
  text: string;

}


export default class ButtonLink extends React.Component<ButtonLinkProps & { className?: string }, {}> {

  render() {
    let { href, text, className } = this.props;
 
    
    return (
      <Link href={href}>
        <span className={className }>{text}</span>
      </Link>
    );
  }

    

  


}
