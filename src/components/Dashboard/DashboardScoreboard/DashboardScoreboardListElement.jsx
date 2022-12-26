// Hooks, React import
import { useContext, useEffect, useState } from 'react';

// Context import
import CountriesContext from '../../../context/countries-context';

const DashboardScoreboardListElement = ({ rank, name, country, countriesCount }) => {
  const { countries } = useContext(CountriesContext);
  const [flagCode, setFlagCode] = useState('pl');

  useEffect(() => {
    const countryNames = countries.map(country => country.name.common);
    const countryIndex = countryNames.findIndex(name => name === country);
    const code = countries[countryIndex]?.cca2.toLowerCase();

    setFlagCode(code);
  }, [country, countries]);

  return (
    <li className='flex items-center justify-between text-[18px] p-[15px] border-solid border-b border-[rgba(0,0,0,0.2)]'>
      <div className='flex items-center'>
        <div className='w-[30px] text-right font-bold'>{rank}</div>
        <p className='ml-[20px] mr-[5px]'>{name}</p>
        <img
          src={`https://hatscripts.github.io/circle-flags/flags/${flagCode}.svg`}
          alt='Profile Flag'
          className='w-[16px] h-[16px] border-[2px] border-solid border-black rounded-full'
        />
      </div>
      <p className='font-bold'>{countriesCount ?? 0}</p>
    </li>
  );
};

export default DashboardScoreboardListElement;
