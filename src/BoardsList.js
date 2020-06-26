import React, {
    useState,
    useEffect
  } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './BoardsList.css';
import Config from './Config';

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
