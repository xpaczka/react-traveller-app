import { useContext, useEffect, useState } from 'react';
import CountriesContext from '../../context/countries-context';

const DashboardScoreboardListElement = ({ rank, name, country, countriesCount }) => {
  const { countries } = useContext(CountriesContext);
  const [flagCode, setFlagCode] = useState('pl');

  useEffect(() => {
    const countryIndex = countries.findIndex(country => country.name.common === country);
    const code = countries[countryIndex]?.cca2.toLowerCase();

    if (!code) return;
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
