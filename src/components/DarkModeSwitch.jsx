import React, { useEffect, useRef, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function DarkModeSwitch({ toggleDarkMode }) {
  const checkBox = useRef(null);
  const label = useRef(null);
  const [isDark, setIsDark] = useState(false);
  function handleDarkMode(val) {
    setIsDark(val);
    toggleDarkMode(val);
  }

  return (
    <div className="dark-mode-switch">
      <input
        onChange={(ev) => handleDarkMode(ev.target.checked)}
        type="checkbox"
        className="checkbox"
        ref={checkBox}
        id="checkbox"
      />

      <label
        ref={label}
        htmlFor="checkbox"
        className={isDark ? 'label dark' : 'label'}
      >
        <DarkModeIcon className="fas fa-moon" />
        <LightModeIcon className="fas fa-sun" />
        <div className="ball"></div>
      </label>
    </div>
  );
}
