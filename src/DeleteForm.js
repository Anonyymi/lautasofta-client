import React from 'react';
import axios from 'axios';
import './DeleteForm.css';

function DeleteForm(props) {
  let onSubmit = async (e) => {
    e.preventDefault();

    if (props.selected.length === 0) {
      return;
    }

    // parse input
    let selected_ids = props.selected.map(post => post.id);

    // send delete request (posts)
    for (let id of selected_ids) {
      await axios.delete(props.submit_url + '/' + id);
    }

    // refresh page
    window.location.reload();
  };

  return (
    <form className="delete_form" onSubmit={onSubmit}>
      <label>Delete Post</label>
      <input id="submit_delete" type="submit" value="Submit"></input>
    </form>
  );
}

export default DeleteForm;
