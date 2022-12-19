import { useContext } from 'react';
import CountriesContext from '../../context/countries-context';
import DashboardSummaryBar from './DashboardSummaryBar';
import DashboardSummaryElement from './DashboardSummaryElement';

const DashboardSummary = () => {
  const { continents } = useContext(CountriesContext);
  const continentsElements = Object.entries(continents);

  return (
    <div className='h-[calc(100%-70px)] overflow-auto relative'>
      <DashboardSummaryBar />
      <div className='flex flex-wrap items-start'>
        {continentsElements.map(continent => (
          <DashboardSummaryElement
            key={continent[0]}
            value={parseInt(0)}
            max={parseInt(continent[1])}
            region={continent[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;
