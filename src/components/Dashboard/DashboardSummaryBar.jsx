import { useContext, useEffect, useState } from 'react';
import CountriesContext from '../../context/countries-context';

const DashboardSummaryBar = () => {
  const { continents, visitedCountries } = useContext(CountriesContext);
  const [continentsCount, setContinentsCount] = useState(0);
  const [visitedCountriesCount, setVisitedCountriesCount] = useState(0);

  useEffect(() => {
    const continentsElement = Object.entries(continents);

    if (continentsElement.length) {
      setContinentsCount(continentsElement.map(continent => parseInt(continent[1])).reduce((a, b) => a + b));
      setVisitedCountriesCount(visitedCountries.length);
    }
  }, [continents, visitedCountries]);

  return (
    <div className='flex flex-col items-center mb-[20px]'>
      <p className='text-center mb-[10px]'>Overall Progress</p>
      <div className='w-[90%] h-[24px] rounded-[12px] relative bg-black flex items-center justify-center overflow-hidden'>
        <p className='text-center text-white text-[14px] relative z-10 font-bold'>
          {visitedCountriesCount} / {continentsCount}
        </p>
        <div
          className='absolute left-0 top-0 h-full bg-[#78bec7]'
          style={{ width: `${(visitedCountriesCount / continentsCount) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DashboardSummaryBar;
