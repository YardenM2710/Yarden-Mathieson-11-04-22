import { Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { weatherService } from '../services/weatherService';
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFiveDaysWeather,
  getFavouriteCities,
  fetchWeatherData,
} from '../redux/slices/weatherSlices';
import img from '../imgs/clowdie.png';
import { utilService } from '../services/utilService';

export default function WeatherPage({ state }) {
  //Dispatch Action
  const dispatch = useDispatch();
  console.log('state : ', state);
  //State
  const [favouriteCities, setFavouriteCities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentCountry, setCurrentCountry] = useState(null);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const { weatherDisplayData, fiveDaysData } = state.weatherReducer;
  const defaultTelAviv = 'Tel Aviv';

  //Default API call to fetch Tel Aviv data
  useEffect(() => {
    async function fetchDefaultStarterData() {
      if (!weatherDisplayData) {
        const data = await weatherService.fetchDefaultData(defaultTelAviv);
        dispatch(fetchWeatherData(data));
        dispatch(getFiveDaysWeather(data.Key));
        setCurrentCountry(data);
      }
    }
    fetchDefaultStarterData();
  }, []);

  useEffect(() => {
    setCurrentCountry(weatherDisplayData);
  }, [weatherDisplayData]);

  //Set Auto Complete Data
  useEffect(() => {
    async function fetchData() {
      if (!inputValue) return;
      const weatherData = await weatherService.fetchAutoCompleteData(
        inputValue
      );
      setAutoCompleteData(weatherData);
    }
    fetchData();
  }, [inputValue]);

  function onCountryPick(value) {
    if (value) {
      const country = findCountry(value);
      if (country.Key) {
        dispatch(fetchWeatherData(country));
        dispatch(getFiveDaysWeather(country.Key));
      }
    }
  }
  async function addToFavourites(country, countryName) {
    const updatedCountry = { ...country };
    updatedCountry.Name = countryName;
    const key = await weatherService.fetchDefaultData(countryName);
    updatedCountry.Key = key.Key;
    setFavouriteCities((oldArray) => [...oldArray, updatedCountry]);
  }
  useEffect(() => {
    dispatch(getFavouriteCities(favouriteCities));
  }, [favouriteCities]);

  function findCountry(value) {
    // console.log('Find Country weatherData ? ', autoCompleteData);
    if (autoCompleteData) {
      const country = autoCompleteData.filter((country) => {
        return country.label === value;
      });
      setCurrentCountry(country[0]);
      if (!country) return;
      return country[0];
    }
  }

  if (!autoCompleteData) return <div>Loading...</div>;
  return (
    <section className="weather-page container">
      <div className="weather-filter">
        <h1>Search Countries</h1>
        <p>Find out the current weather around the world.</p>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={autoCompleteData}
          sx={{ width: 300 }}
          onChange={(ev) => {
            onCountryPick(ev.target.innerText);
          }}
          renderInput={(params) => (
            <TextField
              onChange={(ev) => {
                setInputValue(ev.target.value);
              }}
              value={inputValue}
              {...params}
              label="Search for a country"
            />
          )}
        />
      </div>
      {weatherDisplayData && currentCountry ? (
        <div className="weather-city-container">
          <div className="add-to-favourites">
            <Button
              onClick={() =>
                addToFavourites(weatherDisplayData, currentCountry.label)
              }
              variant="outlines"
              startIcon={<StarIcon />}
            >
              Add To Favourites
            </Button>
          </div>
          <div className="weather-current-city">
            <img src={img} />
            <div>
              {currentCountry.Name ? (
                <h1>{currentCountry.Name}</h1>
              ) : (
                <h1>{currentCountry.label}</h1>
              )}
              <h1>
                {weatherDisplayData.Temperature.Metric.Value}
                <span>&#8451;</span>
              </h1>
            </div>
          </div>
          <div className="weather-details">
            <h1>
              <span>{weatherDisplayData.WeatherText}</span>
            </h1>
            <h3>
              {utilService.formatDate(
                weatherDisplayData.LocalObservationDateTime
              )}
            </h3>
          </div>
          {fiveDaysData && (
            <div className="weather-5days-container">
              {fiveDaysData.map((city) => (
                <div key={city.EpochDate} className="weather-data-card">
                  <h3>{city.Day.IconPhrase}</h3>
                  <h3>{utilService.formatDate(city.Date)}</h3>
                  <span>
                    Min {utilService.fToC(city.Temperature.Minimum.Value)}
                    &#8451;
                  </span>
                  <span>
                    Max {utilService.fToC(city.Temperature.Maximum.Value)}
                    &#8451;
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Is it a Travel day or a Netflix day?</h1>
          <h3>Check it out !</h3>
        </div>
      )}
    </section>
  );
}
