import { useContext } from 'react';
import CountriesContext from '../../context/countries-context';
import DashboardCountriesElement from './DashboardCountriesElement';
import DashboardPanel from './DashboardPanel';

/* TODO
    -> exclude 'non-countries' (should be left with 197 countries)
    -> add loading state
  */

const DashboardCountries = () => {
  const countriesCtx = useContext(CountriesContext);

  return (
    <DashboardPanel>
      {countriesCtx.countries.map(country => (
        <DashboardCountriesElement key={country.cca2} name={country.name.common} code={country.cca2} />
      ))}
    </DashboardPanel>
    // <div className='h-[calc(100%-70px)] overflow-auto'>

    // </div>
  );
};

export default DashboardCountries;
