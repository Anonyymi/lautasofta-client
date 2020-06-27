import React, {
  useState,
  useEffect
} from 'react';
import './BoardsList.css';

function BoardsList(props) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (props.boards) {
      setRender(true);
    } else {
      setRender(false);
      return;
    }
  }, [props]);

  return (
    <div className="boards_list">
      {render === false
        ? <span>Loading data...</span>
        :
          <React.Fragment>
            <span>[</span>
            {props.boards.data.map((item, idx) => {
              return <div key={item.id} className="boards_list_item">
                {idx !== 0 &&
                  <span> / </span>
                }
                <a href={'/boards/' + item.path}>{item.path}</a>
              </div>
            })}
            <span>]</span>
          </React.Fragment>
      }
    </div>
  );
}

export default BoardsList;
