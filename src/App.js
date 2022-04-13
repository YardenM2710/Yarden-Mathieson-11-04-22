import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FavouritesPage from './pages/FavouritesPage';
import WeatherPage from './pages/WeatherPage';
import { MainHeader } from './components/MainHeader';

import './styles/main.scss';
import { useState } from 'react';

function App() {
  //Select state from store
  const state = useSelector((state) => state);
  const [isDark, setIsDark] = useState(false);

  function toggleDarkMode(value) {
    console.log(value);
    setIsDark(value);
  }

  return (
    <Router>
      <main className={isDark ? 'dark-theme' : ''}>
        <div className="app">
          <MainHeader toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route
              element={<FavouritesPage state={state} />}
              path="/favourites"
            />
            <Route element={<WeatherPage state={state} />} path="/" />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
