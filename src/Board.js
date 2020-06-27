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
  const [threads, setThreads] = useState({'status': 404, data: []});

  useEffect(() => {
    if (props.board == null) {
      return;
    }

    async function fetchDataFromAPI() {
      let res_threads = await axios(Config.api_url + '/boards/' + props.board.id + '/threads');
      setThreads(res_threads.data);
    };
    fetchDataFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="board">
      {props.config != null && props.board != null &&
        <React.Fragment>
          <div className="threads_form">
            <PostForm submit_url={Config.api_url + '/boards/' + props.board.id + '/threads'} />
          </div>
          <div className="threads_list">
            <hr />
            {threads.data.map(thread => (
              <React.Fragment key={thread.id}>
                <div className="thread">
                  <Post config={props.config} post={thread} />
                  {thread.posts.map(post => {
                    return <div key={post.id} className="reply">
                      <Post config={props.config} post={post} />
                    </div>
                  })}
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      }
    </div>
  );
}

export default Board;
