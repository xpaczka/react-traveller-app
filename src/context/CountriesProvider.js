import { useState, useEffect, useReducer, useContext } from 'react';
import useFetch from '../hooks/use-fetch';

import CountriesContext from './countries-context';
import AuthContext from './auth-context';

const defaultCountriesState = {
  countries: [],
  continents: {},
  countriesCount: 0,
  visitedCountriesCount: 0,
  visitedCountries: [],
};

const getContinentsLength = countries => {
  const countedContinents = {};
  const continentsData = countries.map(country => country.continents[0]);

  continentsData.forEach(continent => {
    if (continent === 'Antarctica') return;
    countedContinents[continent] = countedContinents[continent] ? countedContinents[continent] + 1 : 1;
  });

  return countedContinents;
};

const visitedReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const countryVisited = state.visitedCountries.some(country => country.name === action.item.name);

      if (!countryVisited) {
        state.visitedCountries.push(action.item);
      }

      localStorage.setItem('visited', JSON.stringify(state.visitedCountries));

      return state;
    case 'REMOVE':
      const countryIndex = state.visitedCountries.findIndex(country => country.name === action.item.name);
      state.visitedCountries.splice(countryIndex, 1);

      localStorage.setItem('visited', JSON.stringify(state.visitedCountries));

      return state;
    default:
      return defaultCountriesState;
  }
};

const CountriesProvider = props => {
  const { currentUser } = useContext(AuthContext);

  const [countries, setCountries] = useState([]);
  const [countriesState, dispatchCountriesAction] = useReducer(visitedReducer, defaultCountriesState);

  const { sendRequest } = useFetch();

  useEffect(() => {
    sendRequest({ url: 'https://restcountries.com/v3.1/all' }, data => {
      const sortedData = data.sort((a, b) => a.name.common > b.name.common);
      setCountries(sortedData);
    });
  }, [sendRequest]);

  const addCountryHandler = item => dispatchCountriesAction({ type: 'ADD', item: item });
  const removeCountryHandler = item => dispatchCountriesAction({ type: 'REMOVE', item: item });

  const contextValue = {
    countries: countries,
    continents: getContinentsLength(countries),
    visitedCountries: currentUser?.visitedCountries ?? [],
    countriesCount: countries.length,
    visitedCountriesCount: currentUser?.visitedCountries.length ?? 0,
    addCountry: addCountryHandler,
    removeCountry: removeCountryHandler,
  };

  return <CountriesContext.Provider value={contextValue}>{props.children}</CountriesContext.Provider>;
};

export default CountriesProvider;
