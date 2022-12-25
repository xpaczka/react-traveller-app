// Hooks, React import
import { useContext } from 'react';

// Context import
import CountriesContext from '../../context/countries-context';

const DashboardSummaryBar = () => {
  const { visitedCountriesCount, countriesCount } = useContext(CountriesContext);

  return (
    <div className='flex flex-col items-center mb-[20px]'>
      <p className='text-center mb-[10px]'>Overall Progress</p>
      <div className='w-[90%] h-[24px] rounded-[12px] relative bg-black flex items-center justify-center overflow-hidden'>
        <p className='text-center text-white text-[14px] relative z-10 font-bold'>
          {visitedCountriesCount} / {countriesCount}
        </p>
        <div
          className='absolute left-0 top-0 h-full bg-[#78bec7]'
          style={{ width: `${(visitedCountriesCount / countriesCount) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DashboardSummaryBar;
