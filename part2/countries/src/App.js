import React, { useState, useEffect } from 'react';
import axios from "axios";

const Country = ({ name }) => (
  <div>{name}</div>
);

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    return (
      <div>
        <h3>{countries[0].name}</h3>
        <div>capital {countries[0].capital}</div>
        <div>population {countries[0].population}</div>
        <h4>languages</h4>
        <ul>
          {countries[0].languages.map((language) => <li>{language.name}</li>)}
        </ul>
        <img src={countries[0].flag} width='100' />
      </div>
    )
  }

  return (
    <div>
      {countries.map((country) => <Country key={country.name} name={country.name} />)}
    </div>
  );
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const onFilter = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <div>find countries <input value={filter} onChange={onFilter} /></div>
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App;