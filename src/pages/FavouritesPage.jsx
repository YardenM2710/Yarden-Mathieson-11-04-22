import React from 'react';
import WeatherContainer from '../components/WeatherContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getFiveDaysWeather,
  updateWeatherData,
} from '../redux/slices/weatherSlices';

export default function FavouritesPage({ state }) {
  const { favouriteCities } = state.weatherReducer;
  let navigate = useNavigate();
  const dispatch = useDispatch();

  function backToMain(ev, city) {
    ev.stopPropagation();
    dispatch(updateWeatherData(city));
    dispatch(getFiveDaysWeather(city.Key));
    navigate('/');
  }

  if (!favouriteCities || favouriteCities.length === 0)
    return (
      <div className="no-favourites">
        <h1>No Favourites Yet..</h1>
      </div>
    );
  return (
    <div className="favourites-container container">
      <div className="weather-favourites-title">
        <h1>Your Favourite Cities</h1>
      </div>
      <div className="weather-favourites">
        {favouriteCities.map((city, idx) => (
          <WeatherContainer
            backToMain={backToMain}
            key={Math.random(idx)}
            countryName={city.label}
            currentCountry={city}
          />
        ))}
      </div>
    </div>
  );
}
