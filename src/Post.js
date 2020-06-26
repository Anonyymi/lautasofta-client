import React from 'react';
import './Post.css';

function Post(props) {
  return (
    <div key={props.post.id} className="post">
      <div className="post_info">
        <span className="name">Anonymous</span>
        <span className="datetime_created">{props.post.datetime_created}</span>
        <span className="id">{'No.' + props.post.id}</span>
      </div>
      <div className="post_content">
        <div className="post_media"></div>
        <div className="post_message">{props.post.data_message}</div>
      </div>
    </div>
  );
}

export default Post;
