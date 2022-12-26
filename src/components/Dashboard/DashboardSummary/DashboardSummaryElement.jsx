// Hooks, React import
import { useContext } from 'react';

// Context import
import CountriesContext from '../../../context/countries-context';

const DashboardSummaryElement = props => {
  const { visitedCountries } = useContext(CountriesContext);
  const value = visitedCountries.filter(country => country.continent === props.region).length;
  const percentageValue = ((value / props.max) * 100).toFixed(0);

  return (
    <div className='w-1/2 px-[5px] flex flex-col items-center'>
      <div className='relative'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='-8 -8 48 48' className='rotate-[-90deg] h-[180px]'>
          <circle cx='16' cy='16' r='16' style={{ fill: 'none', stroke: '#000', strokeWidth: '3' }} />
          <circle
            cx='16'
            cy='16'
            r='16'
            style={{
              fill: 'none',
              stroke: '#78bec7',
              strokeDasharray: '100 100',
              strokeDashoffset: `${100 - percentageValue}`,
              strokeLinecap: 'round',
              strokeWidth: '3',
            }}
          />
        </svg>
        <div className='absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] font-bold text-[28px]'>
          {percentageValue}%
        </div>
      </div>
      <p className='text-center text-[22px] translate-y-[-15px]'>{props.region}</p>
      <p className='translate-y-[-15px]'>
        {value} / {props.max}
      </p>
    </div>
  );
};

export default DashboardSummaryElement;
