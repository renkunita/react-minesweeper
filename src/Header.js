import React from 'react';
import styled from "styled-components";

const StyledHeader = styled.h1`
  color: white;
  width: 100%;
  margin: 0 auto 30px;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
`;

const StatusSpan = styled.span`
  display: inline-block;
  margin-left: 10px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => 
    props.status === 'clear' ? 'linear-gradient(135deg, #4CAF50, #45a049)' :
    props.status === 'fail' ? 'linear-gradient(135deg, #f44336, #d32f2f)' :
    'linear-gradient(135deg, #2196F3, #1976D2)'
  };
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;


function Header({text}) {

  return (
    <StyledHeader>
      Minesweeper  
       <StatusSpan status={text}>
         ({text === 'clear' ? 'ゲームクリア！' : text === 'fail' ? 'ゲームオーバー' : text})
       </StatusSpan>
    </StyledHeader>
  );
}

export default Header;
