import React from 'react';
import './AdminPost.css';
import DropMenu from '../common/DropMenu';

function AdminPost(props) {
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

  return (
    <div className="admin_post">
      <div className="admin_post_info">
        <input className="admin_post_select" type="checkbox" name="select" onClick={selectPost}></input>
        <span className="admin_post_id_ref">p#{props.post.id}</span>
        <span className="admin_post_name">Anonymous</span>
        <span className="admin_post_ipv4_addr">{props.post.ipv4_addr}</span>
        <span className="admin_post_datetime_created">{props.post.datetime_created}</span>
        <DropMenu icon="▶" menu_items={[
          {id: 0, href: '/admin/posts/' + props.post.id, text: 'Preview post'},
          {id: 1, href: '/admin/posts/' + props.post.id + '/ban', text: 'Ban poster'},
          {id: 2, href: '#/', text: '...'}
        ]} />
      </div>
      <div className="admin_post_content">
        {props.post.data_filepath != null &&
          <div className="admin_post_media">
            <a href={props.config.data['MEDIA_BUCKET_URL'] + '/' + props.post.data_filepath} target="_blank" rel="noopener noreferrer">Media file</a>
            <a href={props.config.data['MEDIA_BUCKET_URL'] + '/' + props.post.data_thumbpath} target="_blank" rel="noopener noreferrer">Media thumbnail</a>
          </div>
        }
        <div className="admin_post_message">{props.post.data_message}</div>
      </div>
    </div>
  );
}

export default AdminPost;
