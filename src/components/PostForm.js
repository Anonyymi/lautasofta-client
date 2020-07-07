import React, {
  useState
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import Api from '../api/Api';
import './PostForm.css';

function PostForm(props) {
  const {addToast} = useToasts();
  const [file, setFile] = useState(null);

  let onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // send post request
      if (props.thread_id == null) {
        await Api.postThread(props.board.id, e.target.message.value, file);
      } else {
        await Api.postPost(props.board.id, props.thread_id, e.target.message.value, file);
      }

      // refresh page
      window.location.reload();
    } catch (err) {
      addToast('Failure submitting post, status: ' + err.status, {appearance: 'error'});
    }
  };

  let onChangeFile = async (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form className="post_form" onSubmit={onSubmit}>
      <label>File</label>
      <input id="post_form_file" name="file" type="file" accept={props.config.data['MEDIA_CONTENT_TYPES'].join(',')} onChange={onChangeFile}></input>
      <label></label>
      <textarea id="post_form_message" name="message" spellCheck="false" placeholder="Message"></textarea>
      <label></label>
      <input id="submit_post" type="submit" value="Submit"></input>
    </form>
  );
}

export default PostForm;
