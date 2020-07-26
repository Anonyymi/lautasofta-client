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
  const [config, setConfig] = useState({'status': 404, data: {}});
  const [boards, setBoards] = useState({'status': 404, data: []});

  useEffect(() => {
    fetchDataFromAPI();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataFromAPI = async (board_id, thread_id) => {
    Api.getConfig()
      .then(setConfig)
      .catch(err => addToast('Failure fetching config/boards!', {appearance: 'error'}));
    Api.getBoards()
      .then(setBoards)
      .catch(err => addToast('Failure fetching config/boards!', {appearance: 'error'}));
  };

  return (
    <Router>
      <div className="menu_container">
        {(config.data && config.data['USER_ROLE'] === 'ADMINISTRATOR') &&
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
          <React.Fragment>
            {!config.data || !boards.data
              ? <span></span>
              : <Board
                  config={config}
                  boards={boards}
                  board={boards.data.find(board => board.path === match.params.board_path)}
                />
            }
          </React.Fragment>
        )}/>
        <Route exact path="/boards/:board_path/threads/:thread_id" render={({match}) => (
          <React.Fragment>
            {!config.data || !boards.data
              ? <span></span>
              : <Thread
                  config={config}
                  boards={boards}
                  board={boards.data.find(board => board.path === match.params.board_path)}
                  thread_id={match.params.thread_id}
                />
            }
          </React.Fragment>
        )}/>
        <Route exact path="/posts/:post_id/report" render={({match}) => (
          <React.Fragment>
            {!config.data
              ? <span></span>
              : <ReportForm config={config} post_id={match.params.post_id} />
            }
          </React.Fragment>
        )}/>
        <Route exact path="/admin/posts" render={({match}) => (
          <React.Fragment>
            {!config.data || !boards.data
              ? <span></span>
              : <AdminPosts config={config} />
            }
          </React.Fragment>
        )}/>
        <Route exact path="/admin/posts/:post_id" render={({match}) => (
          <React.Fragment>
            {!config.data || !boards.data
              ? <span></span>
              : <AdminPostPreview config={config} post_id={match.params.post_id} />
            }
          </React.Fragment>
        )}/>
        <Route exact path="/admin/posts/:post_id/ban" render={({match}) => (
          <React.Fragment>
            {!config.data
              ? <span></span>
              : <AdminBanForm config={config} post_id={match.params.post_id} />
            }
          </React.Fragment>
        )}/>
        <Route exact path="/admin/reports" render={({match}) => (
          <React.Fragment>
            {!config.data || !boards.data
              ? <span></span>
              : <AdminReports config={config} />
            }
          </React.Fragment>
        )}/>
        <Route exact path="/admin/bans" render={({match}) => (
          <React.Fragment>
            {!config.data || !boards.data
              ? <span></span>
              : <AdminBans config={config} />
            }
          </React.Fragment>
        )}/>
      </Switch>
    </Router>
  );
}

export default App;
