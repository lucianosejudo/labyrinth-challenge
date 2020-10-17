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
      'cell--target': isTargetCell,
    })}>
      {withPlayer}
    </div>
  )
}
