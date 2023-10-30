import {ReactNode} from 'react'

interface socialProp {
    url: string;
    children: ReactNode;
}

export const Social = ({children, url}: socialProp) => {
  return (
    <a href={url} rel="noopener noreferrer" target='_blank'>
        {children}
    </a>
  )
}
