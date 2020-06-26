import React from 'react';
import axios from 'axios';
import './PostForm.css';

function PostForm(props) {
  let onSubmit = async (e) => {
    e.preventDefault();

    // get form fields
    let form_file = e.target.file;
    let form_message = e.target.message;

    // send post request
    await axios.post(props.submit_url, {
      message: form_message.value,
      extension: form_file.value.split('.').pop()
    });

    // refresh page
    window.location.reload();
  };

  return (
    <form id="post_form" className="post_form" onSubmit={onSubmit}>
      <div className="row">
        <label>Attachment</label>
        <input id="file" name="file" type="file" accept=".jpg,.jpeg,.png"></input>
      </div>
      <div className="row">
        <textarea id="message" name="message" spellCheck="false" placeholder="Message"></textarea>
      </div>
      <input id="submit" type="submit" value="Submit"></input>
    </form>
  );
}

export default PostForm;
