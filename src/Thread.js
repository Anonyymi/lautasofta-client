import React, {
    useState,
    useEffect
  } from 'react';
import axios from 'axios';
import './Thread.css';
import Config from './Config';
import BoardTitle from './BoardTitle';
import PostForm from './PostForm';
import Post from './Post';

function Thread(props) {
  const [render, setRender] = useState(false);
  const [posts, setPosts] = useState({'status': 404, data: []});

  useEffect(() => {
    if (props.config && props.board && props.thread_id) {
      setRender(true);
    } else {
      setRender(false);
      return;
    }

    async function fetchDataFromAPI() {
      let res_posts = await axios(Config.api_url + '/boards/' + props.board.id + '/threads/' + props.thread_id + '/posts');
      setPosts(res_posts.data);
    };
    fetchDataFromAPI();
  }, [props]);

  return (
    <div className="thread">
      {render === false
        ? <span>Loading data...</span>
        :
          <React.Fragment>
            <div className="thread_header_container">
              <BoardTitle board={props.board} />
              <PostForm config={props.config} submit_url={Config.api_url + '/boards/' + props.board.id + '/threads/' + props.thread_id + '/posts'} />
            </div>
            <hr />
            {posts.data.map(post => (
              <React.Fragment key={post.id}>
                <div className="post">
                  <Post config={props.config} board={props.board} post={post} />
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
      }
    </div>
  );
}

export default Thread;
