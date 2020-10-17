import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti'
import Cell from '../Cell'
import Player from '../Player'
import GameOverState from '../GameOverState'
import './styles.scss'
/** keep, add, change or remove types/props */
export type Position = [/** row */ number, /** col */ number]

export interface Props {
  targetPosition: Position
  availableCells: (0 | 1)[][]
  startingPosition: Position
  moveLimit?: number
  cellSize?: number
  shadow?: boolean
  visibleCells?: number
}

const comparePosition = ([x, y]: Position, [w, z]: Position): boolean => x === w && y === z

const Labyrinth = (props: Props) => {
  const {
    availableCells,
    targetPosition,
    startingPosition,
    moveLimit
  } = props
  const [playerPosition, setPosition] = useState<Position>(startingPosition || [0, 0])
  const [bannedCells, setBannedCells] = useState<number[][]>(null)
  const [rowAmount, setRowAmout] = useState<number>(0)
  const [columnAmount, setcolumnAmount] = useState<number>(0)
  const [winnerWinnerChickenDinner, setWinnerWinnerChickenDinner] = useState<boolean>(false)
  const [movesAmount, setMovesAmount] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)

  const getBannedCells = () => {
    const banned: number[][] = availableCells.map((row, rowNumber) => 
      row.map((bit, columnNumber) => {
        if (!bit) {
          return [rowNumber, columnNumber]
        }
      }).filter(el => el)
    ).flat()
    setBannedCells(banned)
  }

  const getRowsColumnsAmount = () => {
    setRowAmout(availableCells.length - 1)
    setcolumnAmount(availableCells[0].length - 1)
  }

  useEffect(() => {
    getBannedCells()
    getRowsColumnsAmount()
    if (comparePosition(playerPosition, targetPosition))
      setWinnerWinnerChickenDinner(true)
  }, [playerPosition])

  const isPositionBanned = (([row , column]: Position) : boolean =>
    bannedCells.some(([w, z]) => w === row && column === z)
    || (row < 0 || column < 0)
    || (row > rowAmount || column > columnAmount ))

  const handleNewPosition = (newPosition: Position) => {
    if (!isPositionBanned(newPosition)) {
      setPosition(newPosition)
      setMovesAmount(movesAmount + 1)
    }
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (movesAmount > moveLimit)
      return setGameOver(true)

    const [x, y] = playerPosition
    let newPosition: Position;
    switch (event.key) {
      case 'ArrowDown':
        newPosition = [x + 1, y]
        handleNewPosition(newPosition)
        break;
      case 'ArrowUp':
        newPosition = [x - 1, y]
        handleNewPosition(newPosition)
        break;
      case 'ArrowLeft':
        newPosition = [x, y - 1]
        handleNewPosition(newPosition)
        break;
      case 'ArrowRight':
        newPosition = [x, y + 1]
        handleNewPosition(newPosition)
        break;  
      default:
        break;
    }
  }

  const handleOnResetGame = () => {
    setGameOver(false)
    setWinnerWinnerChickenDinner(false)
    setPosition(startingPosition)
    setMovesAmount(0)
  }

  return (
    <div className='labyrinth'>
      {!(winnerWinnerChickenDinner || gameOver) ? (
        <>
          <div
            className='labyrinth__board'
            data-testid="cell"
            onKeyDown={(e) => handleOnKeyDown(e)}
            tabIndex={0}
          >
            {availableCells.map((row, rowNumber) =>
              <div style={{ display: 'flex' }}>
                {row.map((cell, columnNumber) => {
                  const cellPosition: Position = [rowNumber, columnNumber]
                  return (
                    <Cell
                      availabled={cell === 1}
                      cellPosition={cellPosition}
                      isTargetCell={comparePosition(targetPosition, cellPosition)}
                      withPlayer={comparePosition(playerPosition, cellPosition) ? <Player /> : null}
                    />
                  )})
                }
                  
              </div>
            )}
          </div>
          <div data-testid="position-ball">{`Player at: (${playerPosition[0]}, ${playerPosition[1]})`}</div>
          <div data-testid="moves-message">moves message {comparePosition(playerPosition, targetPosition) && 'GANOOOOOOOOO'}</div>
          <div data-testid="lose-message">lose message</div>
          <div data-testid="win-message">win message</div>
        </>
      ) : (
        <GameOverState winner={true} onResetGame={handleOnResetGame} />
      )}
      
      {winnerWinnerChickenDinner && <Confetti gravity={0.05} />}
    </div>
  );
};

export default Labyrinth;
