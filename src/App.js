import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Config from './Config';
import BoardsList from './BoardsList';
import Board from './Board';
import Thread from './Thread';

function App() {
  const [config, setConfig] = useState({'status': 404, data: {}});
  const [boards, setBoards] = useState({'status': 404, data: []});

  useEffect(() => {
    async function fetchDataFromAPI() {
      let res_config = await axios(Config.api_url + '/config');
      setConfig(res_config.data);
      let res_boards = await axios(Config.api_url + '/boards');
      setBoards(res_boards.data);
    };
    fetchDataFromAPI();
  }, []);

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
              ? <span>Loading data...</span>
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
              ? <span>Loading data...</span>
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
