import React from 'react'
import cn from 'classnames'
import './styles.scss'

export interface Props {
  availabled: boolean,
  cellPosition: [number, number]
  withPlayer: any,
  isTargetCell: boolean,
}


export default function Cell(props: Props) {
  const { availabled, withPlayer, isTargetCell } = props
  return (
    <div className={cn('cell', {
      'cell--not-availabled': !availabled,
    })}>
      {withPlayer}
      {!availabled && <img src="/lava.png" alt="player" height={40}/>}
      {isTargetCell && <img src="/door.png" alt="player" height={40}/>}
    </div>
  )
}
