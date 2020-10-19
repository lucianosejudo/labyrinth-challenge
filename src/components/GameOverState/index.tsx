import React from 'react'
import './styles.scss'

export interface Props {
  type: 'win' | 'lose'
  finalLevel: boolean
  score: number
}

export default function GameOverState(props: Props) {
  const { type, finalLevel, score } = props
  return (
    <div className='game-over-state'>
      <div className={`game-over-state__text  game-over-state__text--${type}`}>
        {type === 'win' ?
          finalLevel ? '¡Winner, Winner Chicken Dinner!' : 'You won the level!': '¡Game Over!'}
      </div>
      {(finalLevel || type === 'lose') && 
        <div className={`game-over-state__text  game-over-state__text--${type}`}>
          Your score {score}
        </div>
      }   
    </div>
)
}
