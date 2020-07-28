import React, {
  useState,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {
  useToasts
} from 'react-toast-notifications';
import './App.css';
import ThemeSelector from './components/common/ThemeSelector';
import Api from './api/Api';
import BoardsList from './components/BoardsList';
import Board from './components/Board';
import Thread from './components/Thread';
import ReportForm from './components/ReportForm';
import AdminMenu from './components/admin/AdminMenu';
import AdminPosts from './components/admin/AdminPosts';
import AdminPostPreview from './components/admin/AdminPostPreview';
import AdminReports from './components/admin/AdminReports';
import AdminBans from './components/admin/AdminBans';
import AdminBanForm from './components/admin/AdminBanForm';

function App() {
  const {addToast} = useToasts();
  const [config, setConfig] = useState({status: 404, data: null});
  const [boards, setBoards] = useState({status: 404, data: null});

  useEffect(() => {
    fetchDataFromAPI();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataFromAPI = async (board_id, thread_id) => {
    Api.getConfig()
      .then(setConfig)
      .catch(err => addToast('Failure fetching app config data, status: ' + err.status, {appearance: 'error'}));
    Api.getBoards()
      .then(setBoards)
      .catch(err => addToast('Failure fetching app boards data, status: ' + err.status, {appearance: 'error'}));
  };

  return (
    <div className="app">
      {config.data == null || boards.data == null
        ? <span></span>
        :
          <Router>
            <div className="menu_container">
              {(config.data['USER_ROLE'] === 'ADMINISTRATOR') &&
                <AdminMenu />
              }
              <BoardsList boards={boards} />
              <ThemeSelector />
              <div className="menu_container_clear"></div>
            </div>
            <Switch>
              <Route exact path="/">
                <span>index</span>
              </Route>
              <Route exact path="/boards/:board_path" render={({match}) => (
                <Board
                  config={config}
                  boards={boards}
                  board_path={match.params.board_path}
                />
              )}/>
              <Route exact path="/boards/:board_path/threads/:thread_id" render={({match}) => (
                <Thread
                  config={config}
                  boards={boards}
                  board_path={match.params.board_path}
                  thread_id={match.params.thread_id}
                />
              )}/>
              <Route exact path="/posts/:post_id/report" render={({match}) => (
                <ReportForm config={config} post_id={match.params.post_id} />
              )}/>
              <Route exact path="/admin/posts" render={({match}) => (
                <AdminPosts config={config} />
              )}/>
              <Route exact path="/admin/posts/:post_id" render={({match}) => (
                <AdminPostPreview config={config} post_id={match.params.post_id} />
              )}/>
              <Route exact path="/admin/posts/:post_id/ban" render={({match}) => (
                <AdminBanForm config={config} post_id={match.params.post_id} />
              )}/>
              <Route exact path="/admin/reports" render={({match}) => (
                <AdminReports config={config} />
              )}/>
              <Route exact path="/admin/bans" render={({match}) => (
                <AdminBans config={config} />
              )}/>
            </Switch>
          </Router>
      }
    </div>
  );
}

export default App;
