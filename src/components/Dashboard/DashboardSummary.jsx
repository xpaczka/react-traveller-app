import { useContext } from 'react';
import CountriesContext from '../../context/countries-context';
import DashboardSummaryElement from './DashboardSummaryElement';

const DashboardSummary = () => {
  const countriesCtx = useContext(CountriesContext);
  const continents = Object.entries(countriesCtx.continents);

  return (
    <div className='h-full overflow-auto flex flex-wrap items-start'>
      {continents.map(continent => (
        <DashboardSummaryElement
          key={continent[0]}
          value={parseInt(0)}
          max={parseInt(continent[1])}
          region={continent[0]}
        />
      ))}
    </div>
  );
};

export default DashboardSummary;