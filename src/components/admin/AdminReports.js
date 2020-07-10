import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import qs from 'query-string';
import './AdminReports.css';
import AdminApi from '../../api/AdminApi';
import AdminReport from './AdminReport';
import DeleteForm from '../common/DeleteForm';
import Pagination from '../Pagination';

function AdminReports(props) {
  const {addToast} = useToasts();
  const [render, setRender] = useState(false);
  const [reports, setReports] = useState({status: 404, data: []});
  const [selected] = useState([]);

  useEffect(() => {
    if (props.config) {
      setRender(true);
    } else {
      setRender(false);
      return;
    }

    // parse params from query string
    let qs_parsed = qs.parse(window.location.search);
    
    // fetch data from api
    fetchDataFromAPI(qs_parsed['limit'], qs_parsed['offset']);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);

  const fetchDataFromAPI = async (limit, offset) => {
    try {
      setReports(await AdminApi.getAdminReports(limit, offset));
    } catch (err) {
      addToast('Failure fetching admin reports data, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <div className="admin_reports">
      {render === false
        ? <span></span>
        :
          <React.Fragment>
            <div className="admin_reports_header_container">
              <p className="admin_reports_filter_title">Filter all reports</p>
            </div>
            <hr />
            {reports.data.map(report => (
              <React.Fragment key={report.id}>
                <AdminReport config={props.config} report={report} selected={selected} />
              </React.Fragment>
            ))}
            <div className="admin_reports_footer_container">
              <div className="admin_reports_footer_container_left">
                <Pagination pages={10} items={props.config.data['MAX_POSTS_PER_PAGE']} />
              </div>
              <div className="admin_reports_footer_container_right">
                <DeleteForm type="admin_report" text="Delete Report" selected={selected} />
              </div>
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default AdminReports;
