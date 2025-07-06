import React from 'react';
import styled from 'styled-components';

const StyledResetButton = styled.button`
  margin: 20px auto;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ff6b6b, #ff5252);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

function ResetButton({ onClick }) {
  return (
    <StyledResetButton onClick={onClick}>
      🔄 新しいゲーム
    </StyledResetButton>
  );
}

export default ResetButton;
