import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.td`
  height: 40px;
  width: 40px;
  border: 2px solid #999;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  
  background: ${props => {
    if (props.isFlagged) return 'linear-gradient(135deg, #ffd700, #ffcc00)';
    if (props.status === 'hidden') return 'linear-gradient(135deg, #c0c0c0, #a0a0a0)';
    if (props.status === 'bomb') return 'linear-gradient(135deg, #ff6b6b, #ff5252)';
    return 'linear-gradient(135deg, #f8f8f8, #e8e8e8)';
  }};
  
  color: ${props => {
    if (props.status === 'bomb') return 'white';
    if (props.numberOfBombs === 1) return '#0000FF';
    if (props.numberOfBombs === 2) return '#008000';
    if (props.numberOfBombs === 3) return '#FF0000';
    if (props.numberOfBombs === 4) return '#800080';
    if (props.numberOfBombs === 5) return '#800000';
    if (props.numberOfBombs === 6) return '#008080';
    if (props.numberOfBombs === 7) return '#000000';
    if (props.numberOfBombs === 8) return '#808080';
    return '#333';
  }};
  
  &:hover {
    ${props => props.status === 'hidden' && !props.isFlagged ? 'background: linear-gradient(135deg, #d0d0d0, #b0b0b0); transform: scale(1.05);' : ''}
    ${props => props.isFlagged ? 'background: linear-gradient(135deg, #ffe135, #ffd700); transform: scale(1.05);' : ''}
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

function Cell({ status, style, onClick, onContextMenu, numberOfBombs, isFlagged }) {
  return (
    <StyledCell 
      status={status} 
      numberOfBombs={numberOfBombs}
      isFlagged={isFlagged}
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={style}
    >
      {isFlagged ? '🚩' : status === 'hidden' ? '' : status === 'bomb' ? '💣' : numberOfBombs > 0 ? numberOfBombs : ''}
    </StyledCell>
  );
}

export default Cell;
