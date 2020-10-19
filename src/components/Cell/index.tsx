import React from 'react'
import cn from 'classnames'
import './styles.scss'

export interface Props {
  availabled: boolean
  cellPosition: [number, number]
  withPlayer: any
  isTargetCell: boolean
  cellSize: number
}


export default function Cell(props: Props) {
  const {
    availabled,
    withPlayer,
    isTargetCell,
    cellSize
  } = props
  return (
    <div
      className={cn('cell', {
        ' cell--not-availabled': !availabled,
      })}
      style={{ height: cellSize || 40, width: cellSize || 40 }}
    >
      {withPlayer}
      {!availabled && <img src="/lava.png" alt="player" height={cellSize || 40}/>}
      {isTargetCell && <img src="/door.png" alt="player" height={cellSize || 40}/>}
    </div>
  )
}
