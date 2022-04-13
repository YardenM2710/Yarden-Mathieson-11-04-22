import axios from 'axios';
const STORAGE_KEY = 'favourites';
export const weatherService = {
  fetchAutoCompleteData,
  fetchDataByName,
};

async function fetchAutoCompleteData(inputValue) {
  try {
    // const { data } = await axios.get(
    //   `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCU_WEATHER_KEY}&q=${inputValue}`
    // );

    const data = [
      {
        Version: 1,
        Key: '2333525',
        Type: 'City',
        Rank: 13,
        LocalizedName: 'New Territories',
        Country: {
          ID: 'HK',
          LocalizedName: 'Hong Kong',
        },
        AdministrativeArea: {
          ID: 'TW',
          LocalizedName: 'Tsuen Wan',
        },
      },
      {
        Version: 1,
        Key: '349727',
        Type: 'City',
        Rank: 15,
        LocalizedName: 'New York',
        Country: {
          ID: 'US',
          LocalizedName: 'United States',
        },
        AdministrativeArea: {
          ID: 'NY',
          LocalizedName: 'New York',
        },
      },
      {
        Version: 1,
        Key: '187745',
        Type: 'City',
        Rank: 21,
        LocalizedName: 'New Delhi',
        Country: {
          ID: 'IN',
          LocalizedName: 'India',
        },
        AdministrativeArea: {
          ID: 'DL',
          LocalizedName: 'Delhi',
        },
      },
      {
        Version: 1,
        Key: '2515397',
        Type: 'City',
        Rank: 21,
        LocalizedName: 'New Taipei City',
        Country: {
          ID: 'TW',
          LocalizedName: 'Taiwan',
        },
        AdministrativeArea: {
          ID: 'NWT',
          LocalizedName: 'New Taipei City',
        },
      },
      {
        Version: 1,
        Key: '298885',
        Type: 'City',
        Rank: 32,
        LocalizedName: 'Newcastle',
        Country: {
          ID: 'ZA',
          LocalizedName: 'South Africa',
        },
        AdministrativeArea: {
          ID: 'KZN',
          LocalizedName: 'Kwazulu-Natal',
        },
      },
      {
        Version: 1,
        Key: '12777',
        Type: 'City',
        Rank: 35,
        LocalizedName: 'Newcastle',
        Country: {
          ID: 'AU',
          LocalizedName: 'Australia',
        },
        AdministrativeArea: {
          ID: 'NSW',
          LocalizedName: 'New South Wales',
        },
      },
      {
        Version: 1,
        Key: '3588491',
        Type: 'City',
        Rank: 35,
        LocalizedName: 'New Cairo',
        Country: {
          ID: 'EG',
          LocalizedName: 'Egypt',
        },
        AdministrativeArea: {
          ID: 'C',
          LocalizedName: 'Cairo',
        },
      },
      {
        Version: 1,
        Key: '348585',
        Type: 'City',
        Rank: 35,
        LocalizedName: 'New Orleans',
        Country: {
          ID: 'US',
          LocalizedName: 'United States',
        },
        AdministrativeArea: {
          ID: 'LA',
          LocalizedName: 'Louisiana',
        },
      },
      {
        Version: 1,
        Key: '349530',
        Type: 'City',
        Rank: 35,
        LocalizedName: 'Newark',
        Country: {
          ID: 'US',
          LocalizedName: 'United States',
        },
        AdministrativeArea: {
          ID: 'NJ',
          LocalizedName: 'New Jersey',
        },
      },
      {
        Version: 1,
        Key: '329683',
        Type: 'City',
        Rank: 41,
        LocalizedName: 'Newcastle upon Tyne',
        Country: {
          ID: 'GB',
          LocalizedName: 'United Kingdom',
        },
        AdministrativeArea: {
          ID: 'NET',
          LocalizedName: 'Newcastle upon Tyne',
        },
      },
    ];
    //Adding Label key for the input autoComplete
    let dataToReturn = data.map((country) => {
      if (!country.label) {
        country.label = country.LocalizedName;
      }
      return country;
    });

    //Filtering Countries With Same Name
    const filteredArr = dataToReturn.reduce((acc, country) => {
      const x = acc.find(
        (item) => item.LocalizedName === country.LocalizedName
      );
      if (!x) {
        return acc.concat([country]);
      } else {
        return acc;
      }
    }, []);
    return filteredArr;
  } catch (error) {
    if (!error) {
      throw error;
    }
  }
}

async function fetchDataByName(city) {
  // const { data } = await axios.get(
  //   `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_ACCU_WEATHER_KEY}&q=${city}`
  // );
  const data = [
    {
      Version: 1,
      Key: '215854',
      Type: 'City',
      Rank: 31,
      LocalizedName: 'Tel Aviv',
      EnglishName: 'Tel Aviv',
      PrimaryPostalCode: '',
      Region: {
        ID: 'MEA',
        LocalizedName: 'Middle East',
        EnglishName: 'Middle East',
      },
      Country: {
        ID: 'IL',
        LocalizedName: 'Israel',
        EnglishName: 'Israel',
      },
      AdministrativeArea: {
        ID: 'TA',
        LocalizedName: 'Tel Aviv',
        EnglishName: 'Tel Aviv',
        Level: 1,
        LocalizedType: 'District',
        EnglishType: 'District',
        CountryID: 'IL',
      },
      TimeZone: {
        Code: 'IDT',
        Name: 'Asia/Jerusalem',
        GmtOffset: 3,
        IsDaylightSaving: true,
        NextOffsetChange: '2022-10-29T23:00:00Z',
      },
      GeoPosition: {
        Latitude: 32.045,
        Longitude: 34.77,
        Elevation: {
          Metric: {
            Value: 34,
            Unit: 'm',
            UnitType: 5,
          },
          Imperial: {
            Value: 111,
            Unit: 'ft',
            UnitType: 0,
          },
        },
      },
      IsAlias: false,
      SupplementalAdminAreas: [],
      DataSets: [
        'AirQualityCurrentConditions',
        'AirQualityForecasts',
        'Alerts',
        'DailyPollenForecast',
        'ForecastConfidence',
        'FutureRadar',
        'MinuteCast',
      ],
    },
  ];
  const updatedData = data;
  updatedData[0].label = updatedData[0].LocalizedName;
  return updatedData[0];
}
