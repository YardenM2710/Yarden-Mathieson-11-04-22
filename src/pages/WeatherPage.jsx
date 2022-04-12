import { Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { weatherService } from '../services/weatherService';
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import {
  getFiveDaysWeather,
  getFavouriteCities,
  fetchWeatherData,
} from '../redux/slices/weatherSlices';
import img from '../imgs/clowdie.png';
import { utilService } from '../services/utilService';
import getIconImage from '../services/weatherIconMapping';
import { useDebounce } from '../hooks/useDebounce';

export default function WeatherPage({ state }) {
  //Dispatch Action
  const dispatch = useDispatch();
  console.log('state : ', state);

  //State
  const [favouriteCities, setFavouriteCities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentCountry, setCurrentCountry] = useState(null);
  const [autoCompleteData, setAutoCompleteData] = useState([]);

  //Store
  const { weatherDisplayData, fiveDaysData } = state.weatherReducer;

  //Debounce hook
  const debouncedSearchTerm = useDebounce(inputValue, 2000);
  const defaultTelAviv = 'Tel Aviv';

  //Default API call to fetch Tel Aviv data
  useEffect(() => {
    async function fetchDefaultStarterData() {
      if (!weatherDisplayData) {
        const data = await weatherService.fetchDataByName(defaultTelAviv);
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
      if (!debouncedSearchTerm) return;
      const weatherData = await weatherService.fetchAutoCompleteData(
        debouncedSearchTerm
      );
      setAutoCompleteData(weatherData);
    }
    fetchData();
  }, [debouncedSearchTerm]);

  //When click on a country
  function onCountryPick(value) {
    if (value) {
      const country = findCountry(value);
      if (country.Key) {
        dispatch(fetchWeatherData(country));
        dispatch(getFiveDaysWeather(country.Key));
      }
    }
  }

  //Add to favourirtes
  async function addToFavourites(city, cityName) {
    //Adding some data to the favourite city
    const updatedCity = { ...city };
    updatedCity.Name = cityName;
    const key = await weatherService.fetchDataByName(cityName);
    updatedCity.Key = key.Key;
    setFavouriteCities((oldArray) => [...oldArray, updatedCity]);
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
              {/* {currentCountry.Name ? ( */}
              <h1>{currentCountry.label}</h1>
              {/* ) : (
                <h1>{currentCountry.label}</h1>
              )} */}
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
                  <img src={getIconImage(city.Day.Icon)} alt="img"></img>
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
