import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import styled from "styled-components";

const StyledTable = styled.table`
  margin: 20px auto;
`;

function Board({ rows, cols, numBombs, board, setBoard, onGameClear, onGameFail}) {
    
    // 初期状態のゲームボードを生成する
    const bombBoard = Array(rows).fill(null).map(() => Array(cols).fill(false));
    for (let i = 0; i < numBombs; i++) {
        // 爆弾を設置する行と列を決定する
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        // 既に爆弾が設置されている場合は、もう一度決定する
        if (bombBoard[row][col]) {
        i--;
        continue;
        }
        // 爆弾を設置する
        bombBoard[row][col] = true;
    }
    const [fixBombBoard, setFixBombBoard] = useState(bombBoard); 

    useEffect(() => {
        // 爆弾を設置する処理
        setFixBombBoard(fixBombBoard);
    }, [fixBombBoard, setFixBombBoard]);

    // マスをクリックしたときの処理
    function handleClick(i, j) {
        // ゲームの状態を更新する
        const updatedBoard = [...board];
        updatedBoard[i][j] = fixBombBoard[i][j];

        //
        if(getNumberOfBombs(i,j) === 0){
          var queue = [[i,j]];
          while (queue.length > 0){
              const p = queue.shift();
              const ii = p[0];
              const jj = p[1];

              for (let row = Math.max(0, ii - 1); row <= Math.min(ii + 1, rows - 1); row++) {
                for (let col = Math.max(0, jj - 1); col <= Math.min(jj + 1, cols - 1); col++) {
                    if (updatedBoard[row][col] === null){
                        updatedBoard[row][col] = fixBombBoard[row][col];
                        if (getNumberOfBombs(row,col) === 0) {
                            queue.push([row,col]);
                        }
                    }
                }
            }
          }
        }
        // clear
        let hiddenCell = 0
        for (let row = 0; row <= rows - 1; row++) {
          for (let col = 0; col <= cols - 1; col++) {
              if (updatedBoard[row][col] === null) {
                hiddenCell++;
              }
            }
        }
        if (hiddenCell === numBombs){
          onGameClear();
        }
        // fail
        if (fixBombBoard[i][j] === true){
          onGameFail();
          for (let row = 0; row <= rows - 1; row++) {
            for (let col = 0; col <= cols - 1; col++) {
                updatedBoard[row][col] = fixBombBoard[row][col];
              }
          }
        }

        setBoard(updatedBoard);
        
    }

    const getNumberOfBombs = (i, j) => {
        let numberOfBombs = 0;
    
        for (let row = Math.max(0, i - 1); row <= Math.min(i + 1, rows - 1); row++) {
            for (let col = Math.max(0, j - 1); col <= Math.min(j + 1, cols - 1); col++) {
                if (fixBombBoard[row][col] === true) {
                    numberOfBombs++;
                }
            }
        }
        
        return numberOfBombs;
    };

return (
    <StyledTable>
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <Cell
                key={`${i}-${j}`}
                status={cell === null ? 'hidden' : cell ? 'bomb' : 'empty'}
                style={{
                  height: '40px',
                  width: '40px',
                  border: '2px #808080 solid',
                  textAlign: 'center'
                }}
                onClick={() => handleClick(i, j)}
                numberOfBombs={fixBombBoard[i][j] === false ? getNumberOfBombs(i, j) : null}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default Board;
