import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import Api from '../api/Api';
import './ReportForm.css';
import Post from './Post';

function ReportForm(props) {
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
      addToast('Failure fetching report form data, status: ' + err.status, {appearance: 'error'});
    }
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // send report request
      await Api.postReport(props.post_id, e.target.reason.value);

      // inform about success
      addToast('Report submitted successfully', {appearance: 'success'});
    } catch (err) {
      addToast('Failure submitting report, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <form className="report_form" onSubmit={onSubmit} autoComplete="off">
      <p className="report_form_title">Report post</p>
      <div className="report_form_container">
        <Post config={props.config} post={post.data} selected={[]} />
        <label>Reason</label>
        <input id="report_form_reason" name="reason" type="text"></input>
        <input id="submit_report" type="submit" value="Submit" disabled={post.data.ban_reason != null}></input>
      </div>
    </form>
  );
}

export default ReportForm;
