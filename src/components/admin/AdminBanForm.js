import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import Api from '../../api/Api';
import AdminApi from '../../api/AdminApi';
import './AdminBanForm.css';
import AdminPost from './AdminPost';

function AdminBanForm(props) {
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
      addToast('Failure fetching admin ban form data, status: ' + err.status, {appearance: 'error'});
    }
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // send ban request
      await AdminApi.postAdminBan(null, props.post_id, e.target.reason.value, e.target.ends.value);

      // inform about success
      addToast('Ban submitted successfully', {appearance: 'success'});
    } catch (err) {
      addToast('Failure submitting ban, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <form className="admin_ban_form" onSubmit={onSubmit} autoComplete="off">
      <p className="admin_ban_form_title">Ban poster</p>
      <div className="admin_ban_form_container">
        <AdminPost config={props.config} post={post.data} selected={[]} />
        <label>Reason</label>
        <input id="admin_ban_form_reason" name="reason" type="text"></input>
        <label>Ends</label>
        <input id="admin_ban_form_ends" name="ends" type="date"></input>
        <input id="submit_ban" type="submit" value="Submit"></input>
      </div>
    </form>
  );
}

export default AdminBanForm;
