// React import
import { useContext, useEffect, useState } from 'react';

// Context import
import CountriesContext from '../../../context/countries-context';

// Components import
import DashboardCountriesElement from './DashboardCountriesElement';
import DashboardCountriesSearchBar from './DashboardCountriesSearchBar';
import DashboardPanel from '../DashboardUtils/DashboardPanel';

const DashboardCountries = () => {
  const countriesCtx = useContext(CountriesContext);
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    setCountriesList(countriesCtx.countries);
  }, [countriesCtx.countries]);

  const searchInputHandler = value => {
    if (!value) setCountriesList(countriesCtx.countries);

    const filteredCountries = countriesCtx.countries.filter(country =>
      country.name.common.toLowerCase().startsWith(value)
    );
    setCountriesList(filteredCountries);
  };

  const countriesListContent = countriesList.map(country => (
    <DashboardCountriesElement key={country.cca2} name={country.name.common} code={country.cca2} />
  ));

  return (
    <>
      <DashboardCountriesSearchBar onSearchInput={searchInputHandler} />
      <DashboardPanel className='h-[calc(100%-140px)]'>
        {countriesList.length ? (
          countriesListContent
        ) : (
          <p className='text-center mt-[30px]'>No matching countries found</p>
        )}
      </DashboardPanel>
    </>
  );
};

export default DashboardCountries;
