import { useContext } from 'react';
import CountriesContext from '../../context/countries-context';
import DashboardCountriesElement from './DashboardCountriesElement';
import DashboardPanel from './DashboardPanel';

const DashboardCountries = () => {
  const countriesCtx = useContext(CountriesContext);

  return (
    <DashboardPanel>
      {countriesCtx.countries.map(country => (
        <DashboardCountriesElement key={country.cca2} name={country.name.common} code={country.cca2} />
      ))}
    </DashboardPanel>
  );
};

export default DashboardCountries;
