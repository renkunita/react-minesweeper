import React, { useState, useEffect, useCallback } from 'react';
import Cell from './Cell';
import styled from "styled-components";

const StyledTable = styled.table`
  margin: 20px auto;
  border-collapse: separate;
  border-spacing: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

function Board({ rows, cols, numBombs, board, flagBoard, setBoard, setFlagBoard, onGameClear, onGameFail}) {
    
    const [fixBombBoard, setFixBombBoard] = useState([]);

    // 爆弾を安全に配置する関数
    const generateBombBoard = useCallback((rows, cols, numBombs) => {
        const bombBoard = Array(rows).fill(null).map(() => Array(cols).fill(false));
        const totalCells = rows * cols;
        
        if (numBombs >= totalCells) {
            // この場合は既にApp.jsで検証済みなので発生しないはず
            return bombBoard;
        }
        
        let placedBombs = 0;
        const maxAttempts = totalCells * 2; // 無限ループ防止
        let attempts = 0;
        
        while (placedBombs < numBombs && attempts < maxAttempts) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            
            if (!bombBoard[row][col]) {
                bombBoard[row][col] = true;
                placedBombs++;
            }
            attempts++;
        }
        
        return bombBoard;
    }, []);

    useEffect(() => {
        if (board.length > 0) {
            const newBombBoard = generateBombBoard(rows, cols, numBombs);
            setFixBombBoard(newBombBoard);
        } else {
            setFixBombBoard([]);
        }
    }, [board.length, rows, cols, numBombs, generateBombBoard]);

    // マスをクリックしたときの処理
    function handleClick(i, j) {
        // 爆弾配置がまだ完了していない場合は何もしない
        if (fixBombBoard.length === 0) {
            return;
        }
        // フラグが立っている場合は何もしない
        if (flagBoard[i][j]) {
            return;
        }
        // 既に開かれているセルはクリックできない
        if (board[i][j] !== null) {
            return;
        }
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
        // clear判定 - 爆弾以外の全てのセルが開かれたかチェック
        let hiddenCell = 0
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
              if (updatedBoard[row][col] === null) {
                hiddenCell++;
              }
            }
        }
        if (hiddenCell === numBombs){
          onGameClear();
          // ゲームクリア時は全ての爆弾にフラグを立てる
          const updatedFlagBoard = [...flagBoard];
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              if (fixBombBoard[row][col] === true) {
                updatedFlagBoard[row][col] = true;
              }
            }
          }
          setFlagBoard(updatedFlagBoard);
        }
        // fail
        if (fixBombBoard[i][j] === true){
          onGameFail();
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                updatedBoard[row][col] = fixBombBoard[row][col];
              }
          }
        }

        setBoard(updatedBoard);
        
    }

    // 右クリックでフラグを設置/削除する処理  
    function handleRightClick(i, j, event) {
        event.preventDefault();
        
        // 既に開いているマスにはフラグを設置できない
        if (board[i][j] !== null) {
            return;
        }
        
        const updatedFlagBoard = [...flagBoard];
        updatedFlagBoard[i][j] = !updatedFlagBoard[i][j];
        setFlagBoard(updatedFlagBoard);
    }

    const getNumberOfBombs = (i, j) => {
        if (fixBombBoard.length === 0) return 0;
        
        let numberOfBombs = 0;
    
        for (let row = Math.max(0, i - 1); row <= Math.min(i + 1, rows - 1); row++) {
            for (let col = Math.max(0, j - 1); col <= Math.min(j + 1, cols - 1); col++) {
                if (fixBombBoard[row] && fixBombBoard[row][col] === true) {
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
                style={{}}
                onClick={() => handleClick(i, j)}
                onContextMenu={(event) => handleRightClick(i, j, event)}
                numberOfBombs={fixBombBoard.length > 0 && fixBombBoard[i] && fixBombBoard[i][j] === false ? getNumberOfBombs(i, j) : null}
                isFlagged={flagBoard[i][j]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default Board;
