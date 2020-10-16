import React from "react";

/** keep, add, change or remove types/props */
export type Position = [/** row */ number, /** col */ number];

export interface Props {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
  moveLimit?: number;
  cellSize?: number;
  shadow?: boolean;
  visibleCells?: number;
}

const Labyrinth = (props: Props) => {
  const { availableCells } = props
  return (
    <div>
      <div data-testid="position-ball">position ball</div>
      <div data-testid="cell">
        {availableCells.map(row =>
          <div>
            {row.map(cell => cell)}
          </div>
        )}
      </div>
      <div data-testid="moves-message">moves message</div>
      <div data-testid="lose-message">lose message</div>
      <div data-testid="win-message">win message</div>
    </div>
  );
};

export default Labyrinth;
