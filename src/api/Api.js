import axios from 'axios';
import qs from 'query-string';
import Config from '../Config';

async function getConfig() {
  let config = {status: 404, data: {}};

  try {
    config = await axios(Config.api_url + '/config');
    config = config.data;
  } catch (err) {
    throw err.response;
  }

  return config;
}

async function getBoards() {
  let boards = {status: 404, data: []};

  try {
    boards = await axios(Config.api_url + '/boards');
    boards = boards.data;
  } catch (err) {
    throw err.response;
  }

  return boards;
}

async function getThreads(board_id, limit, offset) {
  let threads = {status: 404, data: []};

  try {
    threads = await axios(Config.api_url + '/boards/' + board_id + '/threads?' + qs.stringify({
      limit: limit,
      offset: offset
    }, {encode: false}));
    threads = threads.data;
  } catch (err) {
    throw err.response;
  }

  return threads;
}

async function postThread(board_id, message, file) {
  let result = {status: 404, data: {}};

  try {
    result = await axios.post(Config.api_url + '/boards/' + board_id + '/threads', {
      message: message,
      extension: file != null ? file.name.split('.').pop() : null
    });
    result = result.data;

    // upload media file if included
    if (result['data']['url'] != null) {
      // prepare form data
      let fields = result['data']['fields'];
      let form_data = new FormData();
      for (let key in fields) {
        form_data.set(key, fields[key]);
      }
      form_data.append('file', file);

      // send put request (media)
      await axios.post(result['data']['url'], form_data, {
        headers: {
          'x-amz-acl': 'public-read'
        }
      });
    }
  } catch (err) {
    throw err.response;
  }

  return result;
}

async function getPost(post_id) {
  let post = {status: 404, data: []};

  try {
    post = await axios(Config.api_url + '/posts/' + post_id);
    post = post.data;
  } catch (err) {
    throw err.response;
  }

  return post;
}

async function getPosts(board_id, thread_id, limit, offset) {
  let posts = {status: 404, data: []};

  try {
    posts = await axios(Config.api_url + '/boards/' + board_id + '/threads/' + thread_id + '/posts?' + qs.stringify({
      limit: limit,
      offset: offset
    }, {encode: false}));
    posts = posts.data;
  } catch (err) {
    throw err.response;
  }

  return posts;
}

async function postPost(board_id, thread_id, message, file) {
  let result = {status: 404, data: {}};

  try {
    result = await axios.post(Config.api_url + '/boards/' + board_id + '/threads/' + thread_id + '/posts', {
      message: message,
      extension: file != null ? file.name.split('.').pop() : null
    });
    result = result.data;

    // upload media file if included
    if (result['data']['url'] != null) {
      // prepare form data
      let fields = result['data']['fields'];
      let form_data = new FormData();
      for (let key in fields) {
        form_data.set(key, fields[key]);
      }
      form_data.append('file', file);

      // send put request (media)
      await axios.post(result['data']['url'], form_data, {
        headers: {
          'x-amz-acl': 'public-read'
        }
      });
    }
  } catch (err) {
    throw err.response;
  }

  return result;
}

async function deletePost(post_id) {
  let deleted = {status: 404, data: {}};

  try {
    deleted = await axios.delete(Config.api_url + '/posts/' + post_id);
    deleted = deleted.data;
  } catch (err) {
    throw err.response;
  }

  return deleted;
}

async function postReport(post_id, reason) {
  let result = {status: 404, data: {}};

  try {
    result = await axios.post(Config.api_url + '/reports', {
      post_id: post_id,
      reason: reason
    });
    result = result.data;
  } catch (err) {
    throw err.response;
  }

  return result;
}

const Api = {
  getConfig: getConfig,
  getBoards: getBoards,
  getThreads: getThreads,
  postThread: postThread,
  getPost: getPost,
  getPosts: getPosts,
  postPost: postPost,
  deletePost: deletePost,
  postReport: postReport
}

export default Api;
