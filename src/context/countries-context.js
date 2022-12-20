import { createContext } from 'react';

/* TODO
   -> fetch data from database (create databse on firebase) / create own api
   -> consider using reducer
*/

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
