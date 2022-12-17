import { createContext } from 'react';

/* TODO
   -> fetch data from database (create databse on firebase) / create own api
   -> consider using reducer
*/

const CountriesContext = createContext({
  countries: [],
  continents: {},
  visitedCountries: [],
  addCountry: () => {},
  removeCountry: () => {},
});

export default CountriesContext;
