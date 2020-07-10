import React from 'react';
import './AdminBan.css';
import DropMenu from '../common/DropMenu';

function AdminBan(props) {
  let selectBan = async (e) => {
    let selected = e.target.checked;
    
    if (selected) {
      props.selected.push(props.ban);
    } else {
      let selected_idx = props.selected.findIndex(ban => ban.id === props.ban.id);

      if (selected_idx > -1) {
        props.selected.splice(selected_idx, 1);
      }
    }
  };

  return (
    <div className="admin_ban">
      <div className="admin_ban_info">
        <input className="admin_ban_select" type="checkbox" name="select" onClick={selectBan}></input>
        <span className="admin_ban_id_ref">b#{props.ban.id}</span>
        <span className="admin_ban_id_ref">r#{props.ban.report_id}</span>
        <span className="admin_ban_id_ref">p#{props.ban.post_id}</span>
        <span className="admin_ban_ipv4_addr">{props.ban.ipv4_addr}</span>
        <span className="admin_ban_banned_ipv4_addr">{props.ban.banned_ipv4_addr}</span>
        <span className="admin_ban_datetime_starts">Starts: {props.ban.datetime_starts}</span>
        <span className="admin_ban_datetime_ends">Ends: {props.ban.datetime_ends}</span>
        <DropMenu icon="▶" menu_items={[
          {id: 0, href: '/admin/posts/' + props.ban.post_id, text: 'Preview post'},
          {id: 1, href: '#/', text: '...'}
        ]} />
      </div>
      <div className="admin_ban_content">
        <div className="admin_ban_reason">{props.ban.data_reason}</div>
      </div>
    </div>
  );
}

export default AdminBan;
