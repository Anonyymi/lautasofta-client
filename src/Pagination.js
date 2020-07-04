import React, {
} from 'react';
import './Pagination.css';

function Pagination(props) {
  return (
    <div className="pagination">
      <React.Fragment>
        {Array.apply(null, { length: props.pages }).map((e, i) => {
          return <div key={i} className="pagination_item">
            <span>[</span><a href={'?offset=' + i * props.items}>{i + 1}</a><span>]</span>
          </div>
        })}
      </React.Fragment>
    </div>
  );
}

export default Pagination;
