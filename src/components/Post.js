import React from 'react';
import './Post.css';

function Post(props) {
  let selectPost = async (e) => {
    let selected = e.target.checked;
    
    if (selected) {
      props.selected.push(props.post);
    } else {
      let selected_idx = props.selected.findIndex(post => post.id === props.post.id);

      if (selected_idx > -1) {
        props.selected.splice(selected_idx, 1);
      }
    }
  };

  let referPost = async (e) => {
    let post_form_message = document.getElementById('post_form_message');
    post_form_message.value += '>>' + props.post.id + '\n';
  };

  return (
    <div className={props.post.thread_id ? 'post reply' : 'post'}>
      <div className="post_info">
        <input className="post_select" type="checkbox" name="select" onClick={selectPost}></input>
        <span className="post_name">Anonymous</span>
        <span className="post_datetime_created">{props.post.datetime_created}</span>
        {props.post.thread_id == null
          ? <a className="post_id_link" href={'/boards/' + props.board_path + '/threads/' + props.post.id}>{'No.'}</a>
          : <a className="post_id_link" href={'/boards/' + props.board_path + '/threads/' + props.post.thread_id}>{'No.'}</a>
        }
        <a className="post_id_ref" href="#/" onClick={referPost}>{props.post.id}</a>
      </div>
      <div className="post_content">
        {props.post.data_filepath != null &&
          <div className="post_media">
            <a href={props.config.data['MEDIA_BUCKET_URL'] + '/' + props.post.data_filepath} target="_blank" rel="noopener noreferrer">
              <img
                src={props.config.data['MEDIA_BUCKET_URL'] + '/' + (props.post.data_thumbpath || props.post.data_filepath)}
                alt={props.post.data_filepath}
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
