import React from 'react';
import './BoardTitle.css';

function BoardTitle(props) {
  return (
    <div className="board_title">
      <h1 className="board_title_name">{'/' + props.board.path + '/ - ' + props.board.name}</h1>
      <h2 className="board_title_description">{props.board.description}</h2>
    </div>
  );
}

export default BoardTitle;
