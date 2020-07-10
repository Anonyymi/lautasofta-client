import React from 'react';
import './AdminReport.css';
import DropMenu from '../common/DropMenu';

function AdminReport(props) {
  let selectReport = async (e) => {
    let selected = e.target.checked;
    
    if (selected) {
      props.selected.push(props.report);
    } else {
      let selected_idx = props.selected.findIndex(report => report.id === props.report.id);

      if (selected_idx > -1) {
        props.selected.splice(selected_idx, 1);
      }
    }
  };

  return (
    <div className="admin_report">
      <div className="admin_report_info">
        <input className="admin_report_select" type="checkbox" name="select" onClick={selectReport}></input>
        <span className="admin_report_ipv4_addr">{props.report.ipv4_addr}</span>
        <span className="admin_report_datetime_created">{props.report.datetime_created}</span>
        <span className="admin_report_id">{'Report No.'}</span>
        <span className="admin_report_id_ref">{props.report.id}</span>
        <span className="admin_report_post_id">{'Post No.'}</span>
        <span className="admin_report_post_id_ref">{props.report.post_id}</span>
        <DropMenu icon="▶" menu_items={[
          {id: 0, href: '#/', text: 'Ban poster'},
          {id: 1, href: '#/', text: '...'}
        ]} />
      </div>
      <div className="admin_report_content">
        <div className="admin_report_reason">{props.report.data_reason}</div>
      </div>
    </div>
  );
}

export default AdminReport;
