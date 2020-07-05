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
import Api from './Api';
import BoardsList from './BoardsList';
import Board from './Board';
import Thread from './Thread';

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
      <BoardsList boards={boards} />
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
      </Switch>
    </Router>
  );
}

export default App;
