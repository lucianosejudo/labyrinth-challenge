import React from 'react'
import './styles.scss'

export interface Props {
  type: 'win' | 'lose'
}

export default function GameOverState(props: Props) {
  const { type } = props
  return (
    <div className='game-over-state'>
      <span className={`game-over-state__text  game-over-state__text--${type}`}>
        {type === 'win' ? '¡Winner, Winner Chicken Dinner!' : '¡Game Over!'}
      </span>
    </div>
)
}
