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
        <div className="post_media">
          {props.post.data_filepath != null &&
            <img
              src={props.config.data['S3_MEDIA_BUCKET_URL'] + '/' + props.post.data_filepath}
              alt={props.post.data_filepath}
              width="256"
              height="256"
            />
          }
        </div>
        <div className="post_message">{props.post.data_message}</div>
        <div className="post_clear"></div>
      </div>
    </div>
  );
}

export default Post;
