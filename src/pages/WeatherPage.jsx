import { IconButton, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { weatherService } from '../services/weatherService';
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch } from 'react-redux';
import {
  getFiveDaysWeather,
  getFavouriteCities,
  fetchWeatherData,
  removeFavourite,
} from '../redux/slices/weatherSlices';
import { utilService } from '../services/utilService';
import getIconImage from '../services/weatherIconMapping';
import { useDebounce } from '../hooks/useDebounce';
import { Slider } from '../components/Slider';

export default function WeatherPage(props) {
  //Dispatch Action
  const dispatch = useDispatch();
  console.log('props', props.state);
  //State
  // const [favouriteCities, setFavouriteCities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentCity, setCurrentCity] = useState(null);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isFavourite, setIsFavorite] = useState(false);

  //Store
  const { weatherDisplayData, fiveDaysData, favouriteCities } =
    props.state.weatherReducer;

  //Debounce hook
  const debouncedSearchTerm = useDebounce(inputValue, 2000);
  const defaultTelAviv = 'Tel Aviv';

  //OnMount API call to fetch Tel Aviv data
  useEffect(() => {
    async function fetchDefaultStarterData() {
      if (!weatherDisplayData) {
        const data = await weatherService.fetchDataByName(defaultTelAviv);
        dispatch(fetchWeatherData(data));
        dispatch(getFiveDaysWeather(data.Key));
        setCurrentCity(data);
        console.log('ON MOUNT DATA', data);
      } else {
        console.log('If Allready Exist Data Onmount', weatherDisplayData);
        setCurrentCity(weatherDisplayData);
      }
    }
    fetchDefaultStarterData();
  }, []);

  //Celsius or Farenheit
  function toggleCelsius(val) {
    setIsCelsius(val);
  }

  //Set Auto Complete Data
  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearchTerm) return;
      try {
        const weatherData = await weatherService.fetchAutoCompleteData(
          debouncedSearchTerm
        );
        setAutoCompleteData(weatherData);
      } catch (error) {
        ///TODO ERROR MODAL
        console.log(error);
      }
    }
    fetchData();
  }, [debouncedSearchTerm]);

  //When click on a country
  function onCountryPick(value) {
    if (value) {
      const city = findCountry(value);
      setCurrentCity(city);
      if (city.Key) {
        dispatch(fetchWeatherData(city));
        dispatch(getFiveDaysWeather(city.Key));
      }
    }
  }

  //Add to favourirtes

  useEffect(() => {
    console.log(
      'On Favourites Use Effect : Favourite Cities >>',
      favouriteCities,
      '\n Current Country : ',
      currentCity
    );
    if (currentCity) {
      const cityInFavorites = favouriteCities.find(
        (favorite) => favorite.label === currentCity.label
      );
      cityInFavorites ? setIsFavorite(true) : setIsFavorite(false);
    }
  }, [favouriteCities, currentCity]);

  async function addToFavourites(city, key) {
    let favCity = null;
    if (favouriteCities.length > 0) {
      favCity = favouriteCities.find((favorite) => favorite.id === city.id);
    }
    if (favCity) return;
    let cityToUpdate = { ...city };
    const cityData = findCountry(city.label);
    cityToUpdate.Key = cityData?.Key;
    dispatch(getFavouriteCities(cityToUpdate));
  }

  function onRemoveFavourite(city) {
    const updatedFavourites = favouriteCities.filter(
      (fav) => city.id !== fav.id
    );
    dispatch(removeFavourite(updatedFavourites));
  }

  function findCountry(value) {
    console.log('Find Country weatherData ? ', autoCompleteData);
    console.log('WTF IS HAPPENING ??!?!', value);

    if (!autoCompleteData || autoCompleteData.length <= 0) {
      weatherService.fetchAutoCompleteData(value);
    } else {
      const country = autoCompleteData.filter((country) => {
        return country.label === value;
      });
      console.log('WTF IS HAPPENING ', country);
      setCurrentCity(country[0]);
      if (!country) return;
      return country[0];
    }
  }

  if (!autoCompleteData) return <div>Loading...</div>;
  return (
    <section className="weather-page container">
      <div className="weather-filter">
        <h1>Search Cities</h1>
        <p>Check out the current weather around the world.</p>
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
              label="Search for a City"
            />
          )}
        />
      </div>
      {weatherDisplayData && currentCity ? (
        <div className="weather-city-container">
          <div className="weather-city-header">
            <div className="weather-current-city">
              <img
                src={getIconImage(weatherDisplayData.WeatherIcon)}
                alt="img"
              ></img>

              <div>
                <h1>{weatherDisplayData.label}</h1>
                {isCelsius ? (
                  <h1>
                    {weatherDisplayData.Temperature.Imperial.Value}
                    <span>&#8457;</span>
                  </h1>
                ) : (
                  <h1>
                    {weatherDisplayData.Temperature.Metric.Value}
                    <span>&#8451;</span>
                  </h1>
                )}
              </div>
            </div>
            <Slider toggleCelsius={toggleCelsius} />
            <div className="add-to-favourites">
              {isFavourite ? (
                <IconButton
                  onClick={() => onRemoveFavourite(weatherDisplayData)}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <StarIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => addToFavourites(weatherDisplayData)}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <StarBorderIcon />
                </IconButton>
              )}
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
                  {isCelsius ? (
                    <div className="degrees">
                      <span>
                        Min {city.Temperature.Minimum.Value}
                        &#8457;
                      </span>
                      <span>
                        Max {city.Temperature.Maximum.Value}
                        &#8457;
                      </span>
                    </div>
                  ) : (
                    <div className="degrees">
                      <span>
                        Min {utilService.fToC(city.Temperature.Minimum.Value)}
                        &#8451;
                      </span>
                      <span>
                        Max {utilService.fToC(city.Temperature.Maximum.Value)}
                        &#8451;
                      </span>
                    </div>
                  )}
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
