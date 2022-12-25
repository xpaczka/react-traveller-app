import { createContext } from 'react';

const CountriesContext = createContext({
  countries: [],
  continents: {},
  visitedCountries: [],
  countriesCount: 0,
  visitedCountriesCount: 0,
  addCountry: () => {},
  removeCountry: () => {},
});

export default CountriesContext;
