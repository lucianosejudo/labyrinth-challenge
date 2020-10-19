import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./components/Labyrinth/labyrinthSlice";
import { Labyrinth } from "./components/Labyrinth";
import { Props } from "./components/Labyrinth/Labyrinth";


const initialState ={
  level: 0,
  playerScore: 0,
}

function renderWithProviders(ui: React.ReactNode) {
  const store = createStore(reducer, initialState);
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("Labyrinth", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      targetPosition: [4, 4],
      availableCells: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
      ],
      startingPosition: [0, 0],
      moveLimit: 10,
      cellSize: 30,
    };
  });

  it("should win", () => {
    const { container, getByTestId, queryByTestId } = renderWithProviders(
      <Labyrinth {...props} />
    );
    const elem = getByTestId("cell")
    fireEvent.keyDown(elem, { key: "ArrowRight" });
    fireEvent.keyDown(elem, { key: "ArrowRight" });
    fireEvent.keyDown(elem, { key: "ArrowDown" });
    fireEvent.keyDown(elem, { key: "ArrowDown" });
    fireEvent.keyDown(elem, { key: "ArrowDown" });
    fireEvent.keyDown(elem, { key: "ArrowDown" });
    fireEvent.keyDown(elem, { key: "ArrowRight" });
    fireEvent.keyDown(elem, { key: "ArrowRight" });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 2");
    expect(queryByTestId("win-message")).toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  

  it("should lose", () => {
    const { container, getByTestId, queryByTestId } = renderWithProviders(
      <Labyrinth {...props} moveLimit={2} />
    );
    const elem = getByTestId("cell")
    fireEvent.keyDown(elem, { key: "ArrowRight" })
    fireEvent.keyDown(elem, { key: "ArrowRight" })
    expect(getByTestId("moves-message").textContent).toEqual("moves left 0");
    expect(queryByTestId("win-message")).not.toBeTruthy()
    expect(queryByTestId("lose-message")).toBeTruthy()
  });

  it("should reset", () => {
    const { container, getByTestId, queryByTestId } = renderWithProviders(
      <Labyrinth {...props} moveLimit={2} />
    );
    const cell = getByTestId("cell")
    fireEvent.keyDown(cell, { key: "ArrowRight" })
    fireEvent.keyDown(cell, { key: "ArrowRight" })
    const elem = getByTestId("reset")
    fireEvent.click(elem)
    expect(getByTestId("position-ball").textContent).toEqual(`position (${props.startingPosition[0]}, ${props.startingPosition[1]})`)
  });
});
