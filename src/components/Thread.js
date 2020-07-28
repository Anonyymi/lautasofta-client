import React, {
  useState,
  useEffect,
  useCallback
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
  const [board, setBoard] = useState(null);
  const [posts, setPosts] = useState({status: 404, data: []});
  const [selected] = useState([]);

  const fetchData = useCallback(async (limit, offset) => {
    if (board == null || props.thread_id == null)
      return;
    
    try {
      setPosts(await Api.getPosts(board.id, props.thread_id, limit, offset));
    } catch (err) {
      addToast('Failure fetching thread data, status: ' + err.status, {appearance: 'error'});
    }
  }, [board, props.thread_id, addToast]);

  useEffect(() => {
    // get current board via path
    setBoard(props.boards.data.find(b => b.path === props.board_path));

    // parse params from query string
    let qs_parsed = qs.parse(window.location.search);

    // fetch data from api
    fetchData(qs_parsed['limit'], qs_parsed['offset']);
  }, [props.boards, props.board_path, fetchData]);

  return (
    <div className="thread">
      {board == null
        ? <span></span>
        :
          <React.Fragment>
            <div className="thread_header_container">
              <BoardTitle board={board} />
              <PostForm config={props.config} board={board} thread_id={props.thread_id} />
            </div>
            <hr />
            {posts.data.map(post => (
              <React.Fragment key={post.id}>
                <div className="thread_post">
                  <Post config={props.config} board_path={board.path} post={post} selected={selected} />
                </div>
              </React.Fragment>
            ))}
            <div className="thread_footer_container">
                <DeleteForm type="post" text="Delete Post" selected={selected} />
                <div className="thread_footer_container_clear"></div>
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default Thread;
