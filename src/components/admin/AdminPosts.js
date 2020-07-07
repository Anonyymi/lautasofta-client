import React, {
  useState,
  useEffect
} from 'react';
import {
  useToasts
} from 'react-toast-notifications';
import qs from 'query-string';
import './AdminPosts.css';
import AdminApi from '../../api/AdminApi';
import AdminPost from './AdminPost';
import DeleteForm from '../DeleteForm';
import Pagination from '../Pagination';

function AdminPosts(props) {
  const {addToast} = useToasts();
  const [render, setRender] = useState(false);
  const [posts, setPosts] = useState({status: 404, data: []});
  const [selected] = useState([]);
  const [searchForm, setSearchForm] = useState({deleted: false});

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
    fetchDataFromAPI(searchForm.deleted, qs_parsed['limit'], qs_parsed['offset']);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchForm, window.location.search]);

  const fetchDataFromAPI = async (deleted, limit, offset) => {
    try {
      setPosts(await AdminApi.getAdminPosts(deleted, limit, offset));
    } catch (err) {
      addToast('Failure fetching admin posts data, status: ' + err.status, {appearance: 'error'});
    }
  };

  const setSearchFormDeleted = async () => {
    setSearchForm({...searchForm, deleted: !searchForm.deleted});
  };

  return (
    <div className="admin_posts">
      {render === false
        ? <span></span>
        :
          <React.Fragment>
            <div className="admin_posts_header_container">
              <p className="admin_posts_filter_title">Filter all posts</p>
              <input type="checkbox" name="filter_deleted" checked={searchForm.deleted} onChange={setSearchFormDeleted} />
              <label>Deleted</label>
            </div>
            <hr />
            {posts.data.map(post => (
              <React.Fragment key={post.id}>
                <AdminPost config={props.config} post={post} selected={selected} />
              </React.Fragment>
            ))}
            <div className="admin_posts_footer_container">
              <div className="admin_posts_footer_container_left">
                <Pagination pages={10} items={props.config.data['MAX_POSTS_PER_PAGE']} />
              </div>
              <div className="admin_posts_footer_container_right">
                <DeleteForm selected={selected} />
              </div>
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default AdminPosts;
