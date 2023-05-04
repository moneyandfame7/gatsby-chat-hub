import React, { FC } from 'react'
import { Link } from 'gatsby'

import logoPng from '@images/logo.png'

const Logo: FC = () => {
  return (
    <Link to="/">
      <img width={25} height={25} src={logoPng} alt="ChatHub logo" />
      <p>ChatHub</p>
    </Link>
  )
}
export default Logo
