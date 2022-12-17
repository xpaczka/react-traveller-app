import { useContext } from 'react';
import CountriesContext from '../../context/countries-context';
import DashboardCountriesElement from './DashboardCountriesElement';

/* TODO
    -> exclude 'non-countries' (should be left with 197 countries)
    -> add loading state
  */

const DashboardCountries = () => {
  const countriesCtx = useContext(CountriesContext);

  return (
    <ul className='h-full overflow-auto'>
      {countriesCtx.countries.map(country => (
        <DashboardCountriesElement key={country.cca2} name={country.name.common} code={country.cca2} />
      ))}
    </ul>
  );
};

export default DashboardCountries;
