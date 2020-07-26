import React, {
  useState,
  useEffect
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
  const [render, setRender] = useState(false);
  const [threads, setThreads] = useState({'status': 404, data: []});
  const [selected] = useState([]);

  useEffect(() => {
    if (props.config && props.board) {
      setRender(true);
    } else {
      setRender(false);
      return;
    }

    // parse params from query string
    let qs_parsed = qs.parse(window.location.search);

      // fetch data from api
    fetchDataFromAPI(props.board.id, qs_parsed['limit'], qs_parsed['offset']);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.board, window.location.search]);

  const fetchDataFromAPI = async (board_id, limit, offset) => {
    try {
      setThreads(await Api.getThreads(props.board.id, limit, offset));
    } catch (err) {
      addToast('Failure fetching board data, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <div className="board">
      {render === false
        ? <span></span>
        :
          <React.Fragment>
            <div className="board_header_container">
              <BoardTitle board={props.board} />
              <PostForm config={props.config} board={props.board} />
            </div>
            <hr />
            {threads.data.map(thread => (
              <React.Fragment key={thread.id}>
                <div className="board_thread">
                  <Post config={props.config} board_path={props.board.path} post={thread} selected={selected} />
                  {thread.posts.map(post => (
                    <Post key={post.id} config={props.config} board_path={props.board.path} post={post} selected={selected} />
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
