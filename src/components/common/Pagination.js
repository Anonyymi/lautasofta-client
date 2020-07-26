import React, {
} from 'react';
import qs from 'query-string';
import './Pagination.css';

function Pagination(props) {
  let getOffset = () => {
    // parse params from query string
    let qs_parsed = qs.parse(window.location.search);

    // determine current offset
    let offset = 0;
    if (qs_parsed != null && qs_parsed['offset'] != null) {
      try {
        offset = parseInt(qs_parsed['offset']);
      } catch (err) {
        console.error('Failure parsing offset param from query string!');
      }
    }

    return offset;
  };

  let prevPage = async (e) => {
    // go to next page
    let offset_prev = getOffset() - props.items;
    window.location.href = (offset_prev > 0) ? ('?offset=' + offset_prev) : window.location.href.split("?")[0];
  };

  let nextPage = async (e) => {
    // go to next page
    let offset_next = getOffset() + props.items;
    window.location.href = '?offset=' + offset_next;
  };

  return (
    <div className="pagination">
      <React.Fragment>
        {getOffset() > 0 &&
        <React.Fragment>
          <input className="pagination_btn_prev" type="button" value="Previous" onClick={prevPage}></input>
          <span> </span>
        </React.Fragment>
        }
        {Array.apply(null, { length: props.pages }).map((e, i) => {
          return <div key={i} className="pagination_item">
            <span>[</span><a href={'?offset=' + i * props.items}>{i + 1}</a><span>] </span>
          </div>
        })}
        <input className="pagination_btn_next" type="button" value="Next" onClick={nextPage}></input>
      </React.Fragment>
    </div>
  );
}

export default Pagination;
