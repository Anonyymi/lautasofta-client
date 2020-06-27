import React, {
  useState
} from 'react';
import axios from 'axios';
import './PostForm.css';

function PostForm(props) {
  const [file, setFile] = useState(null);

  let onSubmit = async (e) => {
    e.preventDefault();

    // parse input
    let form_message = e.target.message.value;
    let form_extension = file != null ? file.name.split('.').pop() : null;

    // send post request (thread)
    let res_submit = await axios.post(props.submit_url, {
      message: form_message,
      extension: form_extension
    });

    if (res_submit.status === 200) {
      let data = res_submit.data['data'];

      // upload media file if included
      if (data['url'] != null) {
        // prepare form data
        let fields = data['fields'];
        fields['file'] = file;
        let form_data = new FormData();
        for (let key in fields) {
          form_data.append(key, fields[key]);
        }
        form_data.append('file', file);

        // send put request (media)
        await axios.post(data['url'], form_data);
      }
    }

    // refresh page
    window.location.reload();
  };

  let onChangeFile = async (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form id="post_form" className="post_form" onSubmit={onSubmit}>
      <div className="row">
        <label>Attachment</label>
        <input id="file" name="file" type="file" accept={props.config.data['MEDIA_CONTENT_TYPES'].join(',')} onChange={onChangeFile}></input>
      </div>
      <div className="row">
        <textarea id="message" name="message" spellCheck="false" placeholder="Message"></textarea>
      </div>
      <input id="submit" type="submit" value="Submit"></input>
    </form>
  );
}

export default PostForm;
