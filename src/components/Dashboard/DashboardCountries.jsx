import { useState, useEffect } from 'react';
import useFetch from '../../hooks/use-fetch';

import Checkbox from '../ui/Checkbox';

/* TODO
    -> create context for countries (and move the countries fetching to the context)
    -> exclude 'non-countries' (should be left with 197 countries)
    -> create a country component
    -> add click event to countries
    */

const DashboardCountries = () => {
  const [countries, setCountries] = useState([]);
  const { sendRequest, error, isLoading } = useFetch();

  useEffect(() => {
    sendRequest({ url: 'https://restcountries.com/v3.1/all' }, data => {
      const sortedData = data.sort((a, b) => a.name.common > b.name.common);
      setCountries(sortedData);
    });
  }, [sendRequest]);

  return (
    <>
      {isLoading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      <ul className='min-h-[480px] max-h-[780px] overflow-auto'>
        {countries.map(country => {
          return (
            <li
              className='flex items-center justify-between pr-[20px] text-[20px] pt-[10px] pb-[15px] mb-[5px] border-b border-solid border-[rgba(0,0,0,0.2)]'
              key={country.cca2}
            >
              <div className='flex items-center'>
                <img
                  className='max-w-[32px] border-[2px] border-solid border-black rounded-full'
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
