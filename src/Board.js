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
import './Board.css';
import Config from './Config';
import Post from './Post';

function Board(props) {
  const [threads, setThreads] = useState({'status': 404, data: []});

  useEffect(() => {
    async function fetchDataFromAPI() {
      let res_threads = await axios(Config.api_url + '/boards/1/threads');
      setThreads(res_threads.data);
    };
    fetchDataFromAPI();
  }, []);

  return (
    <div className="board">
      <form id="form_submit_thread" className="form_post">
        <div className="form_row">
          <label>Attachment</label>
          <input id="file" name="file" type="file" accept=".jpg,.jpeg,.png"></input>
        </div>
        <textarea id="message" name="message" spellcheck="false" placeholder="Message"></textarea>
      </form>
      <div className="threads_list">
        <hr />
        {threads.data.map(thread => {
          return <div key={thread.id} className="thread_container">
            <div className="thread">
              <Post post={thread} />
              {thread.posts.map(post => {
                return <div key={post.id} className="reply">
                  <Post post={post} />
                </div>
              })}
            </div>
            <hr />
          </div>;
        })}
      </div>
    </div>
  );
}

export default Board;
