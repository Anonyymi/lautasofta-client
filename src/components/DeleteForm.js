import React from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import Api from '../api/Api';
import './DeleteForm.css';

function DeleteForm(props) {
  const {addToast} = useToasts();

  let onSubmit = async (e) => {
    e.preventDefault();
    
    if (props.selected.length === 0) {
      return;
    }

    // parse input
    let selected_ids = props.selected.map(post => post.id);

    try {
      // send delete requests
      for (let id of selected_ids) {
        await Api.deletePost(id);
      }

      // refresh page
      window.location.reload();
    } catch (err) {
      addToast('Failure deleting post, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <form className="delete_form" onSubmit={onSubmit}>
      <label>Delete Post</label>
      <input id="submit_delete" type="submit" value="Submit"></input>
    </form>
  );
}

export default DeleteForm;
