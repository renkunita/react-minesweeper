import React from 'react';

function Cell({ status, style, onClick, numberOfBombs }) {
  return (
    <td style={{ ...style, backgroundColor: status === 'hidden' ? 'lightblue' : 'white' }} onClick={onClick}>
        {status === 'hidden' ? '' : status === 'bomb' ? 'B' : numberOfBombs > 0 ? numberOfBombs : ''}
    </td>
  );
}

export default Cell;
