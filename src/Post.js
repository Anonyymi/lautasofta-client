import React from 'react';
import './Post.css';

function Post(props) {
  return (
    <div className={props.post.thread_id ? 'post reply' : 'post'}>
      <div className="post_info">
        <span className="name">Anonymous</span>
        <span className="datetime_created">{props.post.datetime_created}</span>
        {props.post.thread_id == null
          ? <a className="id" href={'/boards/' + props.board.path + '/threads/' + props.post.id}>{'No.' + props.post.id}</a>
          : <span className="id">{'No.' + props.post.id}</span>
        }
      </div>
      <div className="post_content">
        {props.post.data_filepath != null &&
          <div className="post_media">
            <a href={props.config.data['MEDIA_BUCKET_URL'] + '/' + props.post.data_filepath} target="_blank" rel="noopener noreferrer">
              <img
                src={props.config.data['MEDIA_BUCKET_URL'] + '/' + props.post.data_filepath}
                alt={props.post.data_filepath}
                width="256"
                height="256"
              />
            </a>
          </div>
        }
        <div className="post_message">{props.post.data_message}</div>
        <div className="post_clear"></div>
      </div>
    </div>
  );
}

export default Post;
