import React, { useState } from 'react';
import styled from "styled-components";

const StyledHeader = styled.h1`
  color: black;
  width: 100%;
  margin: 20px auto 0;
  text-align: center;
`;


function Header({text}) {

  return (
    <StyledHeader>
      Minesweeper  
       <span>({text})</span>
    </StyledHeader>
  );
}

export default Header;
