import { useState, useEffect, createContext } from 'react';
import useFetch from '../hooks/use-fetch';

/* TODO
   -> fetch data from database (create databse on firebase) / create own api
   -> consider using reducer
*/

const CountriesContext = createContext({
  countries: [],
  continents: {},
});

const getContinentsLength = countries => {
  const countedContinents = {};
  const continentsData = countries.map(country => country.continents[0]);

  continentsData.forEach(continent => {
    if (continent === 'Antarctica') return;
    countedContinents[continent] = countedContinents[continent] ? countedContinents[continent] + 1 : 1;
  });

  return countedContinents;
};

export const CountriesProvider = props => {
  const [countries, setCountries] = useState([]);
  const { sendRequest } = useFetch();

  useEffect(() => {
    sendRequest({ url: 'https://restcountries.com/v3.1/all' }, data => {
      const sortedData = data.sort((a, b) => a.name.common > b.name.common);
      setCountries(sortedData);
    });
  }, [sendRequest]);

  const contextValue = {
    countries: countries,
    continents: getContinentsLength(countries),
  };

  return <CountriesContext.Provider value={contextValue}>{props.children}</CountriesContext.Provider>;
};

export default CountriesContext;
