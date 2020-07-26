import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import qs from 'query-string';
import './AdminBans.css';
import AdminApi from '../../api/AdminApi';
import AdminBan from './AdminBan';
import DeleteForm from '../common/DeleteForm';
import Pagination from '../common/Pagination';

function AdminBans(props) {
  const {addToast} = useToasts();
  const [render, setRender] = useState(false);
  const [bans, setBans] = useState({status: 404, data: []});
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
      setBans(await AdminApi.getAdminBans(limit, offset));
    } catch (err) {
      addToast('Failure fetching admin bans data, status: ' + err.status, {appearance: 'error'});
    }
  };

  return (
    <div className="admin_bans">
      {render === false
        ? <span></span>
        :
          <React.Fragment>
            <div className="admin_bans_header_container">
              <p className="admin_bans_filter_title">Filter all bans</p>
            </div>
            <hr />
            {bans.data.map(ban => (
              <React.Fragment key={ban.id}>
                <AdminBan config={props.config} ban={ban} selected={selected} />
              </React.Fragment>
            ))}
            <div className="admin_bans_footer_container">
              <div className="admin_bans_footer_container_left">
                <Pagination pages={10} items={props.config.data['MAX_POSTS_PER_PAGE']} />
              </div>
              <div className="admin_bans_footer_container_right">
                <DeleteForm type="admin_ban" text="Delete Ban" selected={selected} />
              </div>
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default AdminBans;
