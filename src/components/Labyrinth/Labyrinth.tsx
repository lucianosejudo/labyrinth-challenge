import React, { useState, useEffect, useCallback } from "react";
import Confetti from 'react-confetti'
import Cell from '../Cell'
import Button from '../Button'
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
    const winner = comparePosition(playerPosition, targetPosition)
    if (winner)
      setWinnerWinnerChickenDinner(true)
    if (movesAmount === moveLimit && !winner)
      setGameOver(true)
  }, [playerPosition, movesAmount])

  const isPositionBanned = (([row , column]: Position) : boolean =>
    bannedCells?.some(([w, z]) => w === row && column === z)
    || (row < 0 || column < 0)
    || (row > rowAmount || column > columnAmount ))

  const handleNewPosition = (newPosition: Position) => {
    if (!isPositionBanned(newPosition)) {
      setPosition(newPosition)
      setMovesAmount(movesAmount + 1)
    }
  }

  const handleOnKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (gameOver || winnerWinnerChickenDinner)
      return

    const [x, y] = playerPosition
    
    let newPosition: Position;
    switch (event.key) {
      case 'ArrowDown':
        newPosition = [x + 1, y]
        console.log(newPosition, playerPosition)
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
  }, [playerPosition, gameOver, winnerWinnerChickenDinner, handleNewPosition])

  const handleOnResetGame = useCallback(() => {
    setGameOver(false)
    setWinnerWinnerChickenDinner(false)
    setPosition(startingPosition)
    setMovesAmount(0)
  }, [])

  return (
    <div className='labyrinth'>
          <h1 className='labyrinth__title'>Cretan Labyrinth</h1>
          <div
            className='labyrinth__board'
            data-testid="cell"
            onKeyDown={(e) => handleOnKeyDown(e)} tabIndex={0}
          >
            {availableCells.map((row, rowNumber) =>
              <div style={{ display: 'flex' }} key={rowNumber}>
                {row.map((cell, columnNumber) => {
                  const cellPosition: Position = [rowNumber, columnNumber]
                  return (
                    <Cell
                      key={`[${rowNumber}, ${columnNumber}]`}
                      availabled={cell === 1}
                      cellPosition={cellPosition}
                      isTargetCell={comparePosition(targetPosition, cellPosition)}
                      withPlayer={comparePosition(playerPosition, cellPosition) && !winnerWinnerChickenDinner ? <Player /> : null}
                    />
                  )})
                }
                  
              </div>
            )}
          </div>
          <div data-testid="position-ball">{`Player at: (${playerPosition[0]}, ${playerPosition[1]})`}</div>
          <div data-testid="moves-message">moves left {moveLimit - movesAmount}</div>
          {gameOver && <div data-testid="lose-message"><GameOverState type='lose'/></div>}
          {winnerWinnerChickenDinner && 
            <>
              <div data-testid="win-message"><GameOverState type='win'/></div>
              <Confetti gravity={0.05} />
            </>
          }
          <Button handleOnClick={() => handleOnResetGame()}>Reset Game</Button>
    </div>
  );
};

export default Labyrinth;
