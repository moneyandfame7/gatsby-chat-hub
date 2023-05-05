import React, { FC, PropsWithChildren, useEffect } from 'react'

interface WrapperProps extends PropsWithChildren {
  pageTitle: string
  postfix?: boolean
}
const Wrapper: FC<WrapperProps> = ({ pageTitle, postfix = true, children }) => {
  const title = postfix ? `${pageTitle} | ChatHub` : pageTitle
  return (
    <React.Fragment>
      <title>{title}</title>
      <main>{children}</main>
    </React.Fragment>
  )
}

export default Wrapper
