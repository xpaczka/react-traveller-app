// Hooks, React import
import { useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/use-fetch';

// Context import
import CountriesContext from './countries-context';
import AuthContext from './auth-context';

const FETCH_URL = 'https://react-traveller-app-default-rtdb.europe-west1.firebasedatabase.app/users';

const getContinentsLength = countries => {
  const countedContinents = {};
  const continentsData = countries.map(country => country.continents[0]);

  continentsData.forEach(continent => {
    if (continent === 'Antarctica') return;
    countedContinents[continent] = countedContinents[continent] ? countedContinents[continent] + 1 : 1;
  });

  return countedContinents;
};

const CountriesProvider = props => {
  const { currentUser } = useContext(AuthContext);

  const [countries, setCountries] = useState([]);
  const [currentState, setCurrentState] = useState({ currentUserIndex: null, visitedCountriesState: [] });
  const [visitedCountries, setVisitedCountries] = useState([]);

  const { sendRequest } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const fetchResponse = await fetch(`${FETCH_URL}.json`);
      const data = await fetchResponse.json();
      const userInfo = Object.values(data);

      if (currentUser) {
        const currentUserIndex = userInfo.findIndex(user => user.userId === currentUser.userId);
        const databaseIndex = Object.keys(data)[currentUserIndex];

        const visitedCountriesState = userInfo[currentUserIndex].visitedCountries;

        setCurrentState({
          currentUserIndex: databaseIndex,
          visitedCountriesState: visitedCountriesState ? [...visitedCountriesState] : [],
        });

        setVisitedCountries(visitedCountriesState);
      }
    };
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    sendRequest({ url: 'https://restcountries.com/v3.1/all' }, data => {
      const sortedData = data.sort((a, b) => a.name.common > b.name.common);
      setCountries(sortedData);
    });
  }, [sendRequest]);

  const addCountryHandler = async item => {
    const directory = visitedCountries ? '/visitedCountries.json' : '.json';
    const newState = visitedCountries ? [...visitedCountries, item] : [item];
    const bodyData = visitedCountries ? newState : { ...currentUser, visitedCountries: newState };

    await fetch(`${FETCH_URL}/${currentState.currentUserIndex}${directory}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(bodyData),
    });

    setVisitedCountries(newState);
  };

  const removeCountryHandler = async item => {
    const countryToBeRemovedIndex = visitedCountries.findIndex(country => country.name === item.name);
    const newState = [...visitedCountries];

    newState.splice(countryToBeRemovedIndex, 1);

    fetch(`${FETCH_URL}/${currentState.currentUserIndex}/visitedCountries.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(newState),
    });

    setVisitedCountries(newState);
  };

  const contextValue = {
    countries: countries,
    continents: getContinentsLength(countries),
    visitedCountries: visitedCountries ?? [],
    countriesCount: countries.length,
    visitedCountriesCount: visitedCountries ? visitedCountries.length : 0,
    addCountry: addCountryHandler,
    removeCountry: removeCountryHandler,
  };

  return <CountriesContext.Provider value={contextValue}>{props.children}</CountriesContext.Provider>;
};

export default CountriesProvider;
