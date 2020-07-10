import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import qs from 'query-string';
import './Thread.css';
import Api from '../api/Api';
import BoardTitle from './BoardTitle';
import PostForm from './PostForm';
import Post from './Post';
import DeleteForm from './common/DeleteForm';

function Thread(props) {
  const {addToast} = useToasts();
  const [render, setRender] = useState(false);
  const [posts, setPosts] = useState({'status': 404, data: []});
  const [selected] = useState([]);

  useEffect(() => {
    if (props.config && props.board && props.thread_id) {
      setRender(true);
    } else {
      setRender(false);
      return;
    }

    // parse params from query string
    let qs_parsed = qs.parse(window.location.search);

      // fetch data from api
    fetchDataFromAPI(props.board.id, props.thread_id, qs_parsed['limit'], qs_parsed['offset']);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.board, props.thread_id, window.location.search]);

  const fetchDataFromAPI = async (board_id, thread_id, limit, offset) => {
    try {
      setPosts(await Api.getPosts(props.board.id, props.thread_id, limit, offset));
    } catch (err) {
      addToast('Failure fetching thread data, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <div className="thread">
      {render === false
        ? <span></span>
        :
          <React.Fragment>
            <div className="thread_header_container">
              <BoardTitle board={props.board} />
              <PostForm config={props.config} board={props.board} thread_id={props.thread_id} />
            </div>
            <hr />
            {posts.data.map(post => (
              <React.Fragment key={post.id}>
                <div className="thread_post">
                  <Post config={props.config} board_path={props.board.path} post={post} selected={selected} />
                </div>
              </React.Fragment>
            ))}
            <div className="thread_footer_container">
                <DeleteForm type="post" text="Delete Post" selected={selected} />
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default Thread;
