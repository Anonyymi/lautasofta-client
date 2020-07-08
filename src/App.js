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
import Api from './api/Api';
import AdminMenu from './components/admin/AdminMenu';
import AdminPosts from './components/admin/AdminPosts';
import AdminReports from './components/admin/AdminReports';
import BoardsList from './components/BoardsList';
import Board from './components/Board';
import Thread from './components/Thread';
import ReportForm from './components/ReportForm';

function App() {
  const {addToast} = useToasts();
  const [config, setConfig] = useState({'status': 404, data: {}});
  const [boards, setBoards] = useState({'status': 404, data: []});

  useEffect(() => {
    fetchDataFromAPI();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataFromAPI = async (board_id, thread_id) => {
    try {
      setConfig(await Api.getConfig());
      setBoards(await Api.getBoards());
    } catch (err) {
      addToast('Failure fetching config/boards!', {appearance: 'error'});
    }
  };

  return (
    <Router>
      <div className="menu_container">
        {(config.data && config.data['USER_ROLE'] === 'ADMINISTRATOR') &&
          <AdminMenu />
        }
        <BoardsList boards={boards} />
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
        <Route exact path="/admin/reports" render={({match}) => (
          <React.Fragment>
            {!config.data || !boards.data
              ? <span></span>
              : <AdminReports config={config} />
            }
          </React.Fragment>
        )}/>
      </Switch>
    </Router>
  );
}

export default App;
