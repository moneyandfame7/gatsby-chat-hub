import React, { FC, PropsWithChildren, useEffect } from 'react'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.Fragment>
      <main>{children}</main>
    </React.Fragment>
  )
}

export default Wrapper
