import React from 'react'
import './styles.scss'

export interface Props {
    playerSize?: number
  }

export default function Player(props: Props) {
    const { playerSize } = props
    return (
        <div className='player'>
            <img src="/minotauro.png" alt="player" height={playerSize || 30}/>
        </div>
    )
}
