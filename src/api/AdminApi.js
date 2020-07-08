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

async function getAdminReports(limit, offset) {
  let reports = {status: 404, data: []};

  try {
    reports = await axios(Config.api_url + '/admin/reports?' + qs.stringify({
      limit: limit,
      offset: offset
    }, {encode: false}));
    reports = reports.data;
  } catch (err) {
    throw err.response;
  }

  return reports;
}

const AdminApi = {
  getAdminPosts: getAdminPosts,
  getAdminReports: getAdminReports
}

export default AdminApi;
