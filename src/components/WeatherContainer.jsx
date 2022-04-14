import getIconImage from '../services/weatherIconMapping';

export default function WeatherContainer({
  backToMain,
  currentCountry,
  countryName,
}) {
  return (
    <>
      {currentCountry && (
        <div
          onClick={(ev) => backToMain(ev, currentCountry)}
          className="weather-city-container"
        >
          <div className="weather-current-city">
            <img src={getIconImage(currentCountry.WeatherIcon)} alt="img"></img>
            <div>
              <h2>{countryName}</h2>
              <h1>
                {currentCountry.Temperature.Metric.Value}
                <span>&#8451;</span>
              </h1>
            </div>
          </div>
          <div className="weather-details">
            <h3>
              <span>{currentCountry.WeatherText}</span>
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
