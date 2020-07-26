import React, {
  useState,
  useEffect
} from 'react';
import Config from '../../Config';
import './ThemeSelector.css';

function ThemeSelector(props) {
  const [theme, setTheme] = useState('yotsuba');

  useEffect(() => {
    let selected_theme = localStorage.getItem('lautasofta/selected_theme');

    if (selected_theme != null) {
      setTheme(selected_theme);
    }
  }, []);

  const selectTheme = async (e) => {
    setTheme(e.target.value);
    localStorage.setItem('lautasofta/selected_theme', e.target.value);
  };

  return (
    <div className="theme_selector">
      <link rel="stylesheet" type="text/css" href={'/theme_' + theme + '.css'} />
      <form className="theme_form">
        <label>Select Theme</label>
        <select value={theme} onChange={selectTheme}>
          {Config.ui_themes.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default ThemeSelector;
