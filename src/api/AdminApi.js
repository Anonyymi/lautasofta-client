import axios from 'axios';
import qs from 'query-string';
import Config from '../Config';

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

async function getAdminBans(limit, offset) {
  let bans = {status: 404, data: []};

  try {
    bans = await axios(Config.api_url + '/admin/bans?' + qs.stringify({
      limit: limit,
      offset: offset
    }, {encode: false}));
    bans = bans.data;
  } catch (err) {
    throw err.response;
  }

  return bans;
}

async function putAdminReport(report_id, processed, admin_notes) {
  let result = {status: 404, data: {}};

  try {
    result = await axios.put(Config.api_url + '/admin/reports/' + report_id, {
      processed: processed,
      admin_notes: admin_notes
    });
    result = result.data;
  } catch (err) {
    throw err.response;
  }

  return result;
}

async function postAdminBan(report_id, post_id, reason, datetime_ends) {
  let result = {status: 404, data: {}};

  try {
    result = await axios.post(Config.api_url + '/admin/bans', {
      report_id: report_id,
      post_id: post_id,
      reason: reason,
      datetime_ends: datetime_ends.length > 0 ? datetime_ends : null
    });
    result = result.data;
  } catch (err) {
    throw err.response;
  }

  return result;
}

const AdminApi = {
  getAdminPosts: getAdminPosts,
  getAdminReports: getAdminReports,
  getAdminBans: getAdminBans,
  putAdminReport: putAdminReport,
  postAdminBan: postAdminBan
}

export default AdminApi;
