import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import Api from '../../api/Api';
import './AdminPostPreview.css';
import AdminPost from './AdminPost';
import Post from '../Post';

function AdminPostPreview(props) {
  const {addToast} = useToasts();
  const [post, setPost] = useState({status: 404, data: {}});

  useEffect(() => {
    // fetch data from api
    fetchDataFromAPI(props.post_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.post_id]);

  const fetchDataFromAPI = async (post_id) => {
    try {
      let res_post = await Api.getPost(post_id);
      res_post.data.thread_id = res_post.data.id;
      setPost(res_post);
    } catch (err) {
      addToast('Failure fetching admin post preview data, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <div className="admin_post_preview">
      <p className="admin_post_preview_title_admin">Preview post (admin)</p>
      <div className="admin_post_preview_container">
        <AdminPost config={props.config} post={post.data} selected={[]} />
      </div>
      <p className="admin_post_preview_title_normal">Preview post (normal)</p>
      <div className="admin_post_preview_container">
        <Post config={props.config} post={post.data} selected={[]} />
      </div>
    </div>
  );
}

export default AdminPostPreview;
