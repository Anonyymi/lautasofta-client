import React from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import Api from '../../api/Api';
import AdminApi from '../../api/AdminApi';
import './DeleteForm.css';

function DeleteForm(props) {
  const {addToast} = useToasts();

  let onSubmit = async (e) => {
    e.preventDefault();
    
    if (props.selected.length === 0) {
      return;
    }

    // parse input
    let selected_ids = props.selected.map(item => item.id);

    try {
      // send delete requests
      for (let id of selected_ids) {
        if (props.type === 'post')
          await Api.deletePost(id);
        // else if (props.type === 'admin_post') ...
        // else if (props.type === 'admin_report') ...
      }

      // refresh page
      window.location.reload();
    } catch (err) {
      addToast('Failure deleting item, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <form className="delete_form" onSubmit={onSubmit} autoComplete="off">
      <label>{props.text}</label>
      <input id="submit_delete" type="submit" value="Submit"></input>
    </form>
  );
}

export default DeleteForm;
