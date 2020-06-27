import React from 'react';
import './BoardTitle.css';

function BoardTitle(props) {
  return (
    <div className="board_title">
      <h1 className="name">{'/' + props.board.path + '/ - ' + props.board.name}</h1>
      <h2 className="description">{props.board.description}</h2>
    </div>
  );
}

export default BoardTitle;
