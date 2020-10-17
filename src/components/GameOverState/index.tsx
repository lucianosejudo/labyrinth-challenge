import React from 'react'
import './styles.scss'

export interface Props {
  winner: boolean,
  onResetGame: Function, 
}

export default function GameOverState(props: Props) {
  const { winner, onResetGame } = props
  return (
    <div className='game-over-state'>
      <span className='game-over-state__text'>
        {winner ? '¡Winner, Winner Chicken Dinner!' : 'Game Over'}
      </span>
      <div onClick={() => onResetGame()} >Reset</div>
    </div>
)
}
