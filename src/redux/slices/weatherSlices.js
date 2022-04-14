import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { utilService } from '../../services/utilService';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${payload.Key}?apikey=${process.env.REACT_APP_ACCU_WEATHER_KEY}`
      );

      //Mock Data for Development

      // const data = [
      //   {
      //     LocalObservationDateTime: '2022-04-12T03:28:00-04:00',
      //     EpochTime: 1649748480,
      //     WeatherText: 'Cloudy',
      //     WeatherIcon: 7,
      //     HasPrecipitation: false,
      //     PrecipitationType: null,
      //     IsDayTime: false,
      //     Temperature: {
      //       Metric: {
      //         Value: 11.1,
      //         Unit: 'C',
      //         UnitType: 17,
      //       },
      //       Imperial: {
      //         Value: 52,
      //         Unit: 'F',
      //         UnitType: 18,
      //       },
      //     },
      //     MobileLink:
      //       'http://www.accuweather.com/en/us/new-york-ny/10021/current-weather/349727?lang=en-us',
      //     Link: 'http://www.accuweather.com/en/us/new-york-ny/10021/current-weather/349727?lang=en-us',
      //   },
      // ];
      const updatedData = data[0];
      updatedData.label = payload.LocalizedName;
      return updatedData;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getFiveDaysWeather = createAsyncThunk(
  'weather/getFiveDaysWeather',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //Mock Data for Development

      // const data = {
      //   Headline: {
      //     EffectiveDate: '2022-04-12T02:00:00-04:00',
      //     EffectiveEpochDate: 1649743200,
      //     Severity: 5,
      //     Text: 'Expect showery weather late Monday night through this morning',
      //     Category: 'rain',
      //     EndDate: '2022-04-12T14:00:00-04:00',
      //     EndEpochDate: 1649786400,
      //     MobileLink:
      //       'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?lang=en-us',
      //     Link: 'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?lang=en-us',
      //   },
      //   DailyForecasts: [
      //     {
      //       Date: '2022-04-12T07:00:00-04:00',
      //       EpochDate: 1649761200,
      //       Temperature: {
      //         Minimum: {
      //           Value: 53,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //         Maximum: {
      //           Value: 72,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //       },
      //       Day: {
      //         Icon: 3,
      //         IconPhrase: 'Partly sunny',
      //         HasPrecipitation: true,
      //         PrecipitationType: 'Rain',
      //         PrecipitationIntensity: 'Light',
      //       },
      //       Night: {
      //         Icon: 35,
      //         IconPhrase: 'Partly cloudy',
      //         HasPrecipitation: false,
      //       },
      //       Sources: ['AccuWeather'],
      //       MobileLink:
      //         'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=1&lang=en-us',
      //       Link: 'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=1&lang=en-us',
      //     },
      //     {
      //       Date: '2022-04-13T07:00:00-04:00',
      //       EpochDate: 1649847600,
      //       Temperature: {
      //         Minimum: {
      //           Value: 60,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //         Maximum: {
      //           Value: 68,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //       },
      //       Day: {
      //         Icon: 4,
      //         IconPhrase: 'Intermittent clouds',
      //         HasPrecipitation: false,
      //       },
      //       Night: {
      //         Icon: 38,
      //         IconPhrase: 'Mostly cloudy',
      //         HasPrecipitation: false,
      //       },
      //       Sources: ['AccuWeather'],
      //       MobileLink:
      //         'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=2&lang=en-us',
      //       Link: 'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=2&lang=en-us',
      //     },
      //     {
      //       Date: '2022-04-14T07:00:00-04:00',
      //       EpochDate: 1649934000,
      //       Temperature: {
      //         Minimum: {
      //           Value: 52,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //         Maximum: {
      //           Value: 78,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //       },
      //       Day: {
      //         Icon: 4,
      //         IconPhrase: 'Intermittent clouds',
      //         HasPrecipitation: true,
      //         PrecipitationType: 'Rain',
      //         PrecipitationIntensity: 'Moderate',
      //       },
      //       Night: {
      //         Icon: 38,
      //         IconPhrase: 'Mostly cloudy',
      //         HasPrecipitation: false,
      //       },
      //       Sources: ['AccuWeather'],
      //       MobileLink:
      //         'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=3&lang=en-us',
      //       Link: 'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=3&lang=en-us',
      //     },
      //     {
      //       Date: '2022-04-15T07:00:00-04:00',
      //       EpochDate: 1650020400,
      //       Temperature: {
      //         Minimum: {
      //           Value: 52,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //         Maximum: {
      //           Value: 66,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //       },
      //       Day: {
      //         Icon: 3,
      //         IconPhrase: 'Partly sunny',
      //         HasPrecipitation: false,
      //       },
      //       Night: {
      //         Icon: 38,
      //         IconPhrase: 'Mostly cloudy',
      //         HasPrecipitation: false,
      //       },
      //       Sources: ['AccuWeather'],
      //       MobileLink:
      //         'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=4&lang=en-us',
      //       Link: 'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=4&lang=en-us',
      //     },
      //     {
      //       Date: '2022-04-16T07:00:00-04:00',
      //       EpochDate: 1650106800,
      //       Temperature: {
      //         Minimum: {
      //           Value: 45,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //         Maximum: {
      //           Value: 64,
      //           Unit: 'F',
      //           UnitType: 18,
      //         },
      //       },
      //       Day: {
      //         Icon: 12,
      //         IconPhrase: 'Showers',
      //         HasPrecipitation: true,
      //         PrecipitationType: 'Rain',
      //         PrecipitationIntensity: 'Moderate',
      //       },
      //       Night: {
      //         Icon: 12,
      //         IconPhrase: 'Showers',
      //         HasPrecipitation: true,
      //         PrecipitationType: 'Rain',
      //         PrecipitationIntensity: 'Light',
      //       },
      //       Sources: ['AccuWeather'],
      //       MobileLink:
      //         'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=5&lang=en-us',
      //       Link: 'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=5&lang=en-us',
      //     },
      //   ],
      // };

      const { data } = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${payload}?apikey=${process.env.REACT_APP_ACCU_WEATHER_KEY}`
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const removeFavourite = createAsyncThunk(
  'weather/removeFavourite',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = payload;
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getFavouriteCities = createAsyncThunk(
  'weather/getFavouriteCities',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = payload;
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateWeatherData = createAsyncThunk(
  'weather/updateWeatherData',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = payload;
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getGeoLocationData = createAsyncThunk(
  'weather/getGeoLocationData',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCU_WEATHER_KEY}&q=${payload.lat},${payload.lon}`
      );

      //Mock Data for Development

      // const data = {
      //   Version: 1,
      //   Key: '213238',
      //   Type: 'City',
      //   Rank: 75,
      //   LocalizedName: 'Luzit',
      //   EnglishName: 'Luzit',
      //   PrimaryPostalCode: '',
      //   Region: {
      //     ID: 'MEA',
      //     LocalizedName: 'Middle East',
      //     EnglishName: 'Middle East',
      //   },
      //   Country: {
      //     ID: 'IL',
      //     LocalizedName: 'Israel',
      //     EnglishName: 'Israel',
      //   },
      //   AdministrativeArea: {
      //     ID: 'JM',
      //     LocalizedName: 'Jerusalem',
      //     EnglishName: 'Jerusalem',
      //     Level: 1,
      //     LocalizedType: 'District',
      //     EnglishType: 'District',
      //     CountryID: 'IL',
      //   },
      //   TimeZone: {
      //     Code: 'IDT',
      //     Name: 'Asia/Jerusalem',
      //     GmtOffset: 3,
      //     IsDaylightSaving: true,
      //     NextOffsetChange: '2022-10-29T23:00:00Z',
      //   },
      //   GeoPosition: {
      //     Latitude: 31.683,
      //     Longitude: 34.883,
      //     Elevation: {
      //       Metric: {
      //         Value: 167,
      //         Unit: 'm',
      //         UnitType: 5,
      //       },
      //       Imperial: {
      //         Value: 547,
      //         Unit: 'ft',
      //         UnitType: 0,
      //       },
      //     },
      //   },
      //   IsAlias: false,
      //   SupplementalAdminAreas: [],
      //   DataSets: [
      //     'AirQualityCurrentConditions',
      //     'AirQualityForecasts',
      //     'Alerts',
      //     'DailyPollenForecast',
      //     'ForecastConfidence',
      //     'FutureRadar',
      //     'MinuteCast',
      //   ],
      // };
      const updatedData = data;
      updatedData.label = updatedData.LocalizedName;

      return updatedData;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    favouriteCities: [],
  },
  extraReducers: (builder) => {
    //Handle Pending
    builder.addCase(fetchWeatherData.pending, (state, action) => {
      state.loading = true;
    });

    //FullFilled
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.weather.id = utilService.makeId();
      state.error = undefined;
    });
    builder.addCase(updateWeatherData.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(getGeoLocationData.fulfilled, (state, action) => {
      state.userPosition = action?.payload;
      state.userPosition.id = utilService.makeId();
    });
    builder.addCase(getFavouriteCities.fulfilled, (state, action) => {
      state.favouriteCities = [...state.favouriteCities, action?.payload];
    });
    builder.addCase(removeFavourite.fulfilled, (state, action) => {
      state.favouriteCities = action?.payload;
    });
    builder.addCase(getFiveDaysWeather.fulfilled, (state, action) => {
      state.fiveDaysData = action?.payload.DailyForecasts;
      state.loading = false;
      state.error = undefined;
    });
    //Rejected
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.loading = false;
      state.weather = undefined;
      state.error = action?.payload;
    });
  },
});

export default weatherSlice.reducer;
