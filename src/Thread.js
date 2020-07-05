import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import './Thread.css';
import Api from './Api';
import BoardTitle from './BoardTitle';
import PostForm from './PostForm';
import Post from './Post';
import DeleteForm from './DeleteForm';

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

    fetchDataFromAPI(props.board.id, props.thread_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.board, props.thread_id]);

  const fetchDataFromAPI = async (board_id, thread_id) => {
    try {
      setPosts(await Api.getPosts(props.board.id, props.thread_id, ''));
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
                <div className="post">
                  <Post config={props.config} board={props.board} post={post} selected={selected} />
                </div>
              </React.Fragment>
            ))}
            <div className="thread_footer_container">
              <DeleteForm selected={selected} />
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default Thread;
