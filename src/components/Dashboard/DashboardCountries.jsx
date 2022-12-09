import { useState, useEffect } from 'react';

import Checkbox from '../ui/Checkbox';

const DashboardCountries = () => {
  /* TODO
    -> add error handling (for useEffect)
    -> create hook for fetching data
    */

  const [countries, setCountries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const rawCountries = await fetch('https://restcountries.com/v3.1/all');
      const countries = await rawCountries.json();
      setCountries([...countries]);
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  return (
    <>
      {!isLoaded && <div>Loading data...</div>}
      <ul className='max-h-[780px] overflow-auto'>
        {countries.map(country => {
          return (
            <li
              className='flex items-center justify-between pr-[20px] text-[20px] pt-[10px] pb-[15px] mb-[5px] border-b border-solid border-[rgba(0,0,0,0.2)]'
              key={country.cca2}
            >
              <div className='flex items-center'>
                <img
                  className='max-w-[32px]'
                  src={`https://hatscripts.github.io/circle-flags/flags/${country.cca2.toLowerCase()}.svg`}
                  alt={country.name.common}
                />
                <p className='ml-[20px]'>{country.name.common}</p>
              </div>
              <Checkbox />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DashboardCountries;
