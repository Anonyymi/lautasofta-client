import React, {
  useState
} from 'react';
import './DropMenu.css';

function DropMenu(props) {
  const [opened, setOpened] = useState(false);

  const toggleOpened = async () => {
    setOpened(!opened);
  };

  return (
    <React.Fragment>
      <a className={'drop_menu_btn' + (opened ? ' drop_menu_btn_opened' : '')} href="#/" onClick={toggleOpened}>{props.icon}</a>
      {opened &&
        <div className="drop_menu">
          <ul>
            {props.menu_items.map(menu_item => (
              <li key={menu_item.id}>
                <a href={menu_item.href}>{menu_item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      }
    </React.Fragment>
  );
}

export default DropMenu;
