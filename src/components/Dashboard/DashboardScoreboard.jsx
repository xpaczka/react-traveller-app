import { useState, useEffect, useContext } from 'react';
import useFetch from '../../hooks/use-fetch';
import DashboardPanel from './DashboardPanel';
import CountriesContext from '../../context/countries-context';
import DashboardScoreboardProfile from './DashboardScoreboardProfile';
import DashboardScoreboardListElement from './DashboardScoreboardListElement';

const DashboardScoreboard = () => {
  const { visitedCountriesCount, countriesCount } = useContext(CountriesContext);
  const [scoreboard, setScoreboard] = useState([]);
  const { sendRequest } = useFetch();

  useEffect(() => {
    sendRequest(
      { url: 'https://react-traveller-app-default-rtdb.europe-west1.firebasedatabase.app/scoreboard.json' },
      data => {
        const sortedData = data.sort((a, b) => b.countriesCount - a.countriesCount);
        setScoreboard(sortedData);
      }
    );
  }, [sendRequest]);

  return (
    <DashboardPanel>
      <DashboardScoreboardProfile
        name='Michał'
        rank='1st'
        flag='pl'
        visitedCount={visitedCountriesCount}
        countriesCount={countriesCount}
      />
      <ol className='mt-[10px]'>
        {scoreboard.map((el, index) => (
          <DashboardScoreboardListElement
            key={index}
            rank={index + 1}
            name={el.name}
            country={el.country}
            countriesCount={el.countriesCount}
          />
        ))}
      </ol>
    </DashboardPanel>
  );
};

export default DashboardScoreboard;
