import { useState, useEffect, useReducer } from 'react';
import useFetch from '../hooks/use-fetch';

import CountriesContext from './countries-context';
import { getContinentsLength, getCountriesCount } from '../libs/countries';

const defaultCountriesState = {
  countries: [],
  continents: {},
  countriesCount: 0,
  visitedCountriesCount: 0,
  visitedCountries: [],
};

if (localStorage.getItem('visited')) {
  defaultCountriesState.visitedCountries = JSON.parse(localStorage.getItem('visited'));
}

const visitedReducer = (state, action) => {
  console.log(state.visitedCountries);

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
  const [countries, setCountries] = useState([]);
  const [countriesState, dispatchCountriesAction] = useReducer(visitedReducer, defaultCountriesState);
  const { sendRequest } = useFetch();

  const continents = getContinentsLength(countries);

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
    continents: continents,
    visitedCountries: countriesState.visitedCountries,
    countriesCount: getCountriesCount(continents),
    visitedCountriesCount: countriesState.visitedCountries.length,
    addCountry: addCountryHandler,
    removeCountry: removeCountryHandler,
  };

  return <CountriesContext.Provider value={contextValue}>{props.children}</CountriesContext.Provider>;
};

export default CountriesProvider;
