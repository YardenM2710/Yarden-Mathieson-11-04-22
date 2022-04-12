import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAction } from './redux/slices/weatherSlices';
import FavouritesPage from './pages/FavouritesPage';
import WeatherPage from './pages/WeatherPage';
import { MainHeader } from './components/MainHeader';

import './styles/main.scss';

function App() {
  //Select state from store
  const state = useSelector((state) => state);

  return (
    <Router>
      <MainHeader />
      <main className="app">
        <Routes>
          <Route
            element={<FavouritesPage state={state} />}
            path="/favourites"
          />
          <Route element={<WeatherPage state={state} />} path="/" />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
