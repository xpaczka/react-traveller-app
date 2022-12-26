// Hooks, React import
import { useContext } from 'react';

// Context import
import CountriesContext from '../../../context/countries-context';

// Components import
import DashboardSummaryBar from './DashboardSummaryBar';
import DashboardSummaryElement from './DashboardSummaryElement';
import DashboardPanel from '../DashboardUtils/DashboardPanel';

const DashboardSummary = () => {
  const { continents } = useContext(CountriesContext);
  const continentsElements = Object.entries(continents);

  return (
    <DashboardPanel className='relative'>
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
    </DashboardPanel>
  );
};

export default DashboardSummary;
