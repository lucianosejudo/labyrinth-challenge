import React from 'react'

import './styles.scss'

export interface Props {
  children: String
  handleOnClick: Function
}

export default function Button(props: Props) {
  const { children, handleOnClick } = props
  return (
      <div className='button' onClick={() => handleOnClick()}>
          {children}
      </div>
  )
}
