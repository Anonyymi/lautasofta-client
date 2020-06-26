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

function App() {
  const [boards, setBoards] = useState({'status': 404, data: []});

  useEffect(() => {
    async function fetchDataFromAPI() {
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
            {boards.data == null || boards.data.length === 0
              ? <span>Loading data...</span>
              : <Board boards={boards} board={boards.data.find(board => board.path === match.params.board_path)} />
            }
          </React.Fragment>
        )}/>
      </Switch>
    </Router>
  );
}

export default App;
