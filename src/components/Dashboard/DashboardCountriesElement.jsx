import { useContext, useEffect, useState } from 'react';
import CountriesContext from '../../context/countries-context';
import DashboardCheckbox from './DashboardCheckbox';

const DashboardCountriesElement = ({ name, code }) => {
  const [checked, setChecked] = useState(false);
  const { countries, visitedCountries, addCountry, removeCountry } = useContext(CountriesContext);

  useEffect(() => {
    if (visitedCountries.length && visitedCountries.some(country => country.name === name)) {
      setChecked(true);
    }
  }, [visitedCountries, name]);

  const checkCountryHandler = () => {
    const countryIndex = countries.findIndex(country => country.name.common === name);
    const country = {
      name: countries[countryIndex].name.common,
      continent: countries[countryIndex].continents[0],
    };

    setChecked(!checked);
    !checked ? addCountry(country) : removeCountry(country);
  };

  const elementClassname = `${
    checked && 'bg-[#A7A7F4]'
  } flex items-center justify-between px-[20px] text-[20px] py-[15px] border-b border-solid border-[rgba(0,0,0,0.2)] ${
    checked ? 'hover:bg-[#cacafc]' : 'hover:bg-[#ccc]'
  } transition-colors`;

  return (
    <div onClick={checkCountryHandler} className={elementClassname}>
      <div className='flex items-center'>
        <img
          className='max-w-[32px] border-[2px] border-solid border-black rounded-full'
          src={`https://hatscripts.github.io/circle-flags/flags/${code.toLowerCase()}.svg`}
          alt={name}
        />
        <p className='ml-[20px]'>{name}</p>
      </div>
      <DashboardCheckbox checked={checked} />
    </div>
  );
};

export default DashboardCountriesElement;
