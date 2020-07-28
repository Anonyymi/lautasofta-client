import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import qs from 'query-string';
import './Board.css';
import Api from '../api/Api';
import BoardTitle from './BoardTitle';
import PostForm from './PostForm';
import Post from './Post';
import DeleteForm from './common/DeleteForm';
import Pagination from './common/Pagination';

function Board(props) {
  const {addToast} = useToasts();
  const [board, setBoard] = useState(null);
  const [threads, setThreads] = useState({status: 404, data: []});
  const [selected] = useState([]);

  const fetchData = useCallback(async (limit, offset) => {
    if (board == null)
      return;
    
    try {
      setThreads(await Api.getThreads(board.id, limit, offset));
    } catch (err) {
      addToast('Failure fetching board data, status: ' + err.status, {appearance: 'error'});
    }
  }, [board, addToast]);

  useEffect(() => {
    // get current board via path
    setBoard(props.boards.data.find(b => b.path === props.board_path));

    // parse params from query string
    let qs_parsed = qs.parse(window.location.search);

    // fetch data from api
    fetchData(qs_parsed['limit'], qs_parsed['offset']);
  }, [props.boards, props.board_path, fetchData]);

  return (
    <div className="board">
      {board == null
        ? <span></span>
        :
          <React.Fragment>
            <div className="board_header_container">
              <BoardTitle board={board} />
              <PostForm config={props.config} board={board} />
            </div>
            <hr />
            {threads.data.map(thread => (
              <React.Fragment key={thread.id}>
                <div className="board_thread">
                  <Post config={props.config} board_path={board.path} post={thread} selected={selected} />
                  {thread.posts.map(post => (
                    <Post key={post.id} config={props.config} board_path={board.path} post={post} selected={selected} />
                  ))}
                </div>
                <hr />
              </React.Fragment>
            ))}
            <div className="board_footer_container">
              <Pagination pages={10} items={props.config.data['MAX_THREADS_PER_PAGE']} />
              <DeleteForm type="post" text="Delete Post" selected={selected} />
              <div className="board_footer_container_clear"></div>
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default Board;
