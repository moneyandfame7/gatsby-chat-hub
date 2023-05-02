import React, { FC, PropsWithChildren, useEffect } from 'react'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    console.log('Wrapper')
  }, [])
  return (
    <React.Fragment>
      <main className="container mx-auto">{children}</main>
    </React.Fragment>
  )
}

export default Wrapper
