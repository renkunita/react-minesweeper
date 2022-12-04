import React , { useState } from 'react';
import Board from './Board';
import Header from './Header';
import ResetButton from './ResetButton';
import styled from "styled-components";

const StyledDiv = styled.div`
  color: black;
  width: 100%;
  margin: 20px auto 0;
  text-align: center;
`;

function App() {
  
    const [headerText, setHeaderText] = useState('playing');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [numBombs, setNumBombs] = useState(0);
    const [board, setBoard] = useState([]);

    const onGameClear = () => {
      setHeaderText('clear');
    };

    const onGameFail = () => {
      setHeaderText('fail');
    };


    const createBoard = (rows, cols) => {
      if(rows<=0 || cols<=0){
        return alert("error");
      }
      const initialBoard = Array(rows).fill(null).map(() => Array(cols).fill(null));
      return initialBoard;
      
    }

    const resetBoard = () => {
      const initialBoard = Array(width).fill(null).map(() => Array(height).fill(null));
      setBoard(initialBoard);
    };

    if(board.length === 0){
      return (
        <StyledDiv>
          <Header 
            text={headerText}
          />
          <form>
            縦　　：<input type="text" name="width" onChange={(event) => setWidth(Number(event.target.value))} />
            <br/>
            横　　：<input type="text" name="height" onChange={(event) => setHeight(Number(event.target.value))} />
            <br/>
            ボム数：<input type="text" name="numBoms" onChange={(event) => setNumBombs(Number(event.target.value))} />
            <br/>
            <br/>
            <button type="submit" onClick={(event) => setBoard(createBoard(width, height))}>
              ボードを表示する
            </button>
          </form>
        </StyledDiv>
      );
    }

    return (
      <StyledDiv>
        <Header 
          text={headerText}
        />
        <Board
          rows={width}
          cols={height}
          numBombs={numBombs}
          board={board}
          props
          setBoard={setBoard}
          onGameClear={onGameClear}
          onGameFail={onGameFail}
        />
        <ResetButton onClick={resetBoard}/>
      </StyledDiv>
    );
}

export default App;
