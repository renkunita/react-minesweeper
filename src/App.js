import React , { useState } from 'react';
import Board from './Board';
import Header from './Header';
import ResetButton from './ResetButton';
import Modal from './Modal';
import styled from "styled-components";

const StyledDiv = styled.div`
  color: #333;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
`;

const HelpText = styled.small`
  display: block;
  margin-top: 4px;
  color: #888;
  font-size: 12px;
  font-style: italic;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BackButton = styled.button`
  margin: 10px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

function App() {
  
    const [headerText, setHeaderText] = useState('playing');
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [numBombs, setNumBombs] = useState(10);
    const [board, setBoard] = useState([]);
    const [flagBoard, setFlagBoard] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [gameKey, setGameKey] = useState(0); // ゲームリセット用のキー

    const onGameClear = () => {
      setHeaderText('clear');
    };

    const onGameFail = () => {
      setHeaderText('fail');
    };


    const showError = (message) => {
      console.log('Error message:', message); // デバッグ用
      setModalMessage(message);
      setShowModal(true);
    };

    const createBoard = (rows, cols) => {
      console.log('createBoard called with:', { rows, cols, numBombs }); // デバッグ用
      
      if(rows <= 0 || cols <= 0){
        showError("縦と横は1以上の数値を入力してください");
        return null;
      }
      if(rows > 30 || cols > 30){
        showError("縦と横は30以下にしてください");
        return null;
      }
      if(numBombs <= 0){
        showError("ボム数は1以上にしてください");
        return null;
      }
      if(numBombs >= rows * cols){
        showError(`ボム数は${rows * cols - 1}以下にしてください`);
        return null;
      }
      
      console.log('Validation passed, creating board'); // デバッグ用
      const initialBoard = Array(rows).fill(null).map(() => Array(cols).fill(null));
      return initialBoard;
      
    }

    const resetBoard = () => {
      // ちらつきを防ぐため直接新しい盤面を作成
      setHeaderText('playing');
      setGameKey(prev => prev + 1); // ゲームキーを更新して新しい爆弾配置を強制
      const initialBoard = Array(width).fill(null).map(() => Array(height).fill(null));
      const initialFlagBoard = Array(width).fill(null).map(() => Array(height).fill(false));
      setBoard(initialBoard);
      setFlagBoard(initialFlagBoard);
    };

    const backToSettings = () => {
      setBoard([]);
      setFlagBoard([]);
      setHeaderText('playing');
    };

    if(board.length === 0){
      return (
        <StyledDiv>
          <Header 
            text={headerText}
          />
          <FormContainer>
            <form>
              <InputGroup>
                <Label>縦（行数）</Label>
                <Input type="number" name="width" min="1" defaultValue={10} onChange={(event) => setWidth(Number(event.target.value))} />
                <HelpText>1〜30の範囲で入力してください</HelpText>
              </InputGroup>
              <InputGroup>
                <Label>横（列数）</Label>
                <Input type="number" name="height" min="1" defaultValue={10} onChange={(event) => setHeight(Number(event.target.value))} />
                <HelpText>1〜30の範囲で入力してください</HelpText>
              </InputGroup>
              <InputGroup>
                <Label>ボム数</Label>
                <Input type="number" name="numBoms" min="1" defaultValue={10} onChange={(event) => setNumBombs(Number(event.target.value))} />
                <HelpText>
                  1以上、{width && height ? `${width * height - 1}` : '総セル数'}未満で入力してください
                  {width && height && ` (現在の総セル数: ${width * height})`}
                </HelpText>
              </InputGroup>
              <SubmitButton type="submit" onClick={(event) => {
                event.preventDefault(); 
                console.log('Button clicked! Values:', { width, height, numBombs }); // デバッグ用
                const newBoard = createBoard(width, height);
                if(newBoard) {
                  setGameKey(prev => prev + 1); // 新しいゲーム開始時もキーを更新
                  const newFlagBoard = Array(width).fill(null).map(() => Array(height).fill(false));
                  setBoard(newBoard);
                  setFlagBoard(newFlagBoard);
                }
              }}>
                ゲームを開始
              </SubmitButton>
            </form>
          </FormContainer>
          <Modal 
            isOpen={showModal} 
            message={modalMessage} 
            onClose={() => setShowModal(false)}
          />
        </StyledDiv>
      );
    }

    return (
      <StyledDiv>
        <Header 
          text={headerText}
        />
        <Board
          key={gameKey}
          rows={width}
          cols={height}
          numBombs={numBombs}
          board={board}
          flagBoard={flagBoard}
          setBoard={setBoard}
          setFlagBoard={setFlagBoard}
          onGameClear={onGameClear}
          onGameFail={onGameFail}
        />
        <div>
          <ResetButton onClick={resetBoard}/>
          <BackButton onClick={backToSettings}>⚙️ 設定に戻る</BackButton>
        </div>
        <Modal 
          isOpen={showModal} 
          message={modalMessage} 
          onClose={() => setShowModal(false)}
        />
      </StyledDiv>
    );
}

export default App;
