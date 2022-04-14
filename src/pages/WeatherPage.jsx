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
  getGeoLocationData,
} from '../redux/slices/weatherSlices';
import { utilService } from '../services/utilService';
import getIconImage from '../services/weatherIconMapping';
import { useDebounce } from '../hooks/useDebounce';
import { Slider } from '../components/Slider';
import GeoLocation from '../components/GeoLocation';
import UserMessage from '../components/UserMessage';

export default function WeatherPage(props) {
  //Dispatch Action
  const dispatch = useDispatch();
  console.log('props', props.state);
  //State
  const [inputValue, setInputValue] = useState('');
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isFavourite, setIsFavorite] = useState(false);
  const [geoLocation, setGeoLocation] = useState(null);
  const [isUserFirstEntry, setIsUserFirstEntry] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);
  const [isMessageOn, setIsMessageOn] = useState(false);
  const [message, setMessage] = useState('');

  //Store
  const { weather, fiveDaysData, favouriteCities, userPosition } =
    props.state.weatherReducer;

  //Debounce hook
  const debouncedSearchTerm = useDebounce(inputValue, 2000);
  const defaultTelAviv = 'Tel Aviv';

  //OnMount API call to fetch Tel Aviv data
  useEffect(() => {
    async function fetchDefaultStarterData() {
      if (!weather) {
        const data = await weatherService.fetchDataByName(defaultTelAviv);
        dispatch(fetchWeatherData(data));
        dispatch(getFiveDaysWeather(data.Key));
        setCurrentKey(data.Key);
        console.log('ON MOUNT DATA', data);
      } else {
        console.log('If Allready Exist Data Onmount', weather);
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
      if (city.Key) {
        setCurrentKey(city.Key);
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
      weather
    );
    if (weather) {
      const cityInFavorites = favouriteCities.find(
        (favorite) => favorite.label === weather.label
      );
      console.log('cityInFavorites ?!?', cityInFavorites);
      cityInFavorites ? setIsFavorite(true) : setIsFavorite(false);
    }
  }, [favouriteCities, weather]);

  async function addToFavourites(city, key) {
    let favCity = null;
    if (favouriteCities.length > 0) {
      favCity = favouriteCities.find((favorite) => favorite.id === city.id);
    }
    if (favCity) return;
    let cityToUpdate = { ...city };
    if (!city.Key) {
      // const cityData = findCountry(city.label);
      // cityToUpdate.Key = cityData?.Key;
      cityToUpdate.Key = currentKey;
    }
    dispatch(getFavouriteCities(cityToUpdate));
    setIsMessageOn(true);
    setMessage('This city has been added to your favourites');
    setTimeout(() => {
      setIsMessageOn(false);
    }, 3000);
  }

  function onRemoveFavourite(city) {
    const updatedFavourites = favouriteCities.filter(
      (fav) => city.id !== fav.id
    );
    console.log('updatedFavourites', updatedFavourites);
    dispatch(removeFavourite(updatedFavourites));
    setIsMessageOn(true);
    setMessage('This city has been removed from your favourites');
    setTimeout(() => {
      setIsMessageOn(false);
    }, 3000);
  }

  function findCountry(value) {
    console.log('Find Country weatherData ? ', autoCompleteData);

    if (!autoCompleteData || autoCompleteData.length <= 0) {
      weatherService.fetchAutoCompleteData(value);
    } else {
      const country = autoCompleteData.filter((country) => {
        return country.label === value;
      });
      if (!country) return;
      return country[0];
    }
  }

  //GeoLocation Handling

  useEffect(() => {
    if (geoLocation) {
      // console.log('AM I STILL HAPPENING ?');
      dispatch(getGeoLocationData(geoLocation));
      setIsUserFirstEntry(true);
    }
  }, [geoLocation]);

  useEffect(() => {
    if (userPosition && isUserFirstEntry) {
      setCurrentKey(userPosition.Key);
      dispatch(fetchWeatherData(userPosition));
      dispatch(getFiveDaysWeather(userPosition.Key));
      setIsUserFirstEntry(false);
    }
  }, [userPosition]);

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
        <GeoLocation setGeoLocation={setGeoLocation} />
      </div>
      {weather ? (
        <div className="weather-city-container">
          <div className="weather-city-header">
            <div className="weather-current-city">
              <img src={getIconImage(weather.WeatherIcon)} alt="img"></img>

              <div>
                <h1>{weather.label}</h1>
                {isCelsius ? (
                  <h1>
                    {weather.Temperature.Imperial.Value}
                    <span>&#8457;</span>
                  </h1>
                ) : (
                  <h1>
                    {weather.Temperature.Metric.Value}
                    <span>&#8451;</span>
                  </h1>
                )}
              </div>
            </div>
            <Slider toggleCelsius={toggleCelsius} />
            <div className="add-to-favourites">
              {isFavourite ? (
                <IconButton
                  onClick={() => onRemoveFavourite(weather)}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <StarIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => addToFavourites(weather)}
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
              <span>{weather.WeatherText}</span>
            </h1>
            <h3>{utilService.formatDate(weather.LocalObservationDateTime)}</h3>
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
      <UserMessage message={message} isMessageOn={isMessageOn} />
    </section>
  );
}
