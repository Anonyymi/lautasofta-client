import React, {
    useState,
    useEffect
  } from 'react';
import axios from 'axios';
import './Board.css';
import Config from './Config';
import PostForm from './PostForm';
import Post from './Post';

function Board(props) {
  const [render, setRender] = useState(false);
  const [threads, setThreads] = useState({'status': 404, data: []});

  useEffect(() => {
    if (props.config && props.board) {
      setRender(true);
    } else {
      setRender(false);
      return;
    }

    async function fetchDataFromAPI() {
      let res_threads = await axios(Config.api_url + '/boards/' + props.board.id + '/threads');
      setThreads(res_threads.data);
    };
    fetchDataFromAPI();
  }, [props]);

  return (
    <div className="board">
      {render === false
        ? <span>Loading data...</span>
        :
          <React.Fragment>
            <PostForm config={props.config} submit_url={Config.api_url + '/boards/' + props.board.id + '/threads'} />
            <hr />
            {threads.data.map(thread => (
              <React.Fragment key={thread.id}>
                <div className="thread">
                  <Post config={props.config} board={props.board} post={thread} />
                  {thread.posts.map(post => {
                    return <div key={post.id} className="reply">
                      <Post config={props.config} board={props.board} post={post} />
                    </div>
                  })}
                </div>
                <hr />
              </React.Fragment>
            ))}
          </React.Fragment>
      }
    </div>
  );
}

export default Board;
