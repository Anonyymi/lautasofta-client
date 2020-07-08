import React, {
  useState
} from 'react';
import './PostMenu.css';

function PostMenu(props) {
  const [opened, setOpened] = useState(false);

  const toggleOpened = async () => {
    setOpened(!opened);
  };

  return (
    <React.Fragment>
      <a className={'post_menu_btn' + (opened ? ' post_menu_btn_opened' : '')} href="#/" onClick={toggleOpened}>{props.icon}</a>
      {opened &&
        <div className="post_menu">
          <ul>
            <li><a href={'/posts/' + props.post_id + '/report'}>Report post</a></li>
            <li><a href="#/">Hide post</a></li>
          </ul>
        </div>
      }
    </React.Fragment>
  );
}

export default PostMenu;
