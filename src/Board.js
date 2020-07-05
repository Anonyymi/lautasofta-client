import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import './Board.css';
import Api from './Api';
import BoardTitle from './BoardTitle';
import PostForm from './PostForm';
import Post from './Post';
import DeleteForm from './DeleteForm';
import Pagination from './Pagination';

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

    fetchDataFromAPI(props.board.id, window.location.search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.board, window.location.search]);

  const fetchDataFromAPI = async (board_id, query) => {
    try {
      setThreads(await Api.getThreads(props.board.id, query));
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
                <div className="thread">
                  <Post config={props.config} board={props.board} post={thread} selected={selected} />
                  {thread.posts.map(post => (
                    <Post key={post.id} config={props.config} board={props.board} post={post} selected={selected} />
                  ))}
                </div>
                <hr />
              </React.Fragment>
            ))}
            <div className="board_footer_container">
              <div className="board_footer_container_left">
                <Pagination pages={10} items={props.config.data['MAX_THREADS_PER_PAGE']} />
              </div>
              <div className="board_footer_container_right">
                <DeleteForm selected={selected} />
              </div>
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default Board;
