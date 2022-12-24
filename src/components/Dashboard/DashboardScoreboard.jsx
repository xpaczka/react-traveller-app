import { useState, useEffect, useContext } from 'react';
import useFetch from '../../hooks/use-fetch';
import CountriesContext from '../../context/countries-context';
import AuthContext from '../../context/auth-context';
import DashboardPanel from './DashboardPanel';
import DashboardScoreboardProfile from './DashboardScoreboardProfile';
import DashboardScoreboardListElement from './DashboardScoreboardListElement';

const DashboardScoreboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { countries, countriesCount } = useContext(CountriesContext);

  const [userData, setUserData] = useState(null);
  const [scoreboard, setScoreboard] = useState([]);
  const [rank, setRank] = useState('');
  const [flagCode, setFlagCode] = useState('pl');

  const { sendRequest } = useFetch();

  useEffect(() => {
    sendRequest(
      { url: 'https://react-traveller-app-default-rtdb.europe-west1.firebasedatabase.app/users.json' },
      data => {
        const sortedData = data.sort((a, b) => b.visitedCountries.length - a.visitedCountries.length);
        setScoreboard(sortedData);
      }
    );
  }, [sendRequest]);

  useEffect(() => {
    setUserData(currentUser);

    if (!userData) return;
    const countryIndex = countries.findIndex(country => country.name.common === userData.country);
    const code = countries[countryIndex]?.cca2.toLowerCase();
    setFlagCode(code);

    const userIndex = scoreboard.findIndex(user => user.userId === currentUser.userId);
    setRank(userIndex + 1);
  }, [currentUser, countries, userData, scoreboard]);

  return (
    <DashboardPanel>
      <DashboardScoreboardProfile
        name={userData?.name ?? ''}
        rank={rank}
        flag={flagCode ?? 'pl'}
        visitedCount={userData?.visitedCountries.length ?? 0}
        countriesCount={countriesCount ?? 0}
      />
      <ol className='mt-[10px]'>
        {scoreboard.map((el, index) => (
          <DashboardScoreboardListElement
            key={index}
            rank={index + 1}
            name={el.name}
            country={el.country}
            countriesCount={el.visitedCountries.length}
          />
        ))}
      </ol>
    </DashboardPanel>
  );
};

export default DashboardScoreboard;
