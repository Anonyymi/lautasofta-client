import axios from 'axios';
import qs from 'query-string';
import Config from '../config/Config';

async function getAdminPosts(deleted, limit, offset) {
  let posts = {status: 404, data: []};

  try {
    posts = await axios(Config.api_url + '/admin/posts?' + qs.stringify({
      deleted: deleted ? 1 : 0,
      limit: limit,
      offset: offset
    }, {encode: false}));
    posts = posts.data;
  } catch (err) {
    throw err.response;
  }

  return posts;
}

const AdminApi = {
  getAdminPosts: getAdminPosts
}

export default AdminApi;
