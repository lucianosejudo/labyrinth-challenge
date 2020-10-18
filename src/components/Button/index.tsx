import React from 'react'

import './styles.scss'

export interface Props {
  children: String
  handleOnClick: Function
  testId: String
}

export default function Button(props: Props) {
  const { children, handleOnClick, testId } = props
  return (
      <div className='button' onClick={() => handleOnClick()} data-testid={testId}>
          {children}
      </div>
  )
}
