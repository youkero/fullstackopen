import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => setWeather(response.data));
  }, [country.capital]);

  if (!weather) {
    return <div>No weather info</div>;
  }

  return (
    <div>
      <h4>Weather in {weather.location.name}</h4>
      <h5>Temperature: {weather.current.temperature} Celcius</h5>
      <img src={weather.current.weather_icons[0]} alt="weather icon" />
      <h5>
        Wind: {weather.current.wind_speed} mph direction{' '}
        {weather.current.wind_dir}
      </h5>
    </div>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h3>{country.name}</h3>
      <div>Capital {country.capital}</div>
      <div>Population {country.population}</div>
      <h4>Spoken languages</h4>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="100" alt={country.name + ' flag'} />
      <Weather country={country} />
    </div>
  );
};

const Country = ({ name, onShow }) => (
  <div>
    {name}{' '}
    <button type="button" value={name} onClick={onShow}>
      show
    </button>
  </div>
);

const Countries = ({ countries, onShow }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  return (
    <div>
      {countries.map((country) => (
        <Country key={country.name} name={country.name} onShow={onShow} />
      ))}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const onFilter = (event) => {
    setFilter(event.target.value);
  };

  const onShow = (event) => setFilter(event.target.value);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={onFilter} />
      </div>
      {filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <Countries countries={filteredCountries} onShow={onShow} />
      )}
    </div>
  );
};

export default App;
