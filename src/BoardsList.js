import React from 'react';
import './BoardsList.css';

function BoardsList(props) {
  return (
    <div className="boards_list">
      <span>[</span>
      {props.boards.data.map((item, idx) => {
        return <div key={item.id} className="boards_list_item">
          {idx !== 0 &&
            <span> / </span>
          }
          <a href={'/boards/' + item.path}>{item.path}</a>
        </div>
      })}
      <span>]</span>
    </div>
  );
}

export default BoardsList;
