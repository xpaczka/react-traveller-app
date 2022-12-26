// Hooks, React import
import { useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/use-fetch';

// Context import
import CountriesContext from './countries-context';
import AuthContext from './auth-context';

const FETCH_URL = 'https://react-traveller-app-default-rtdb.europe-west1.firebasedatabase.app/users';

const COUNTRIES_LIST = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Ivory Coast',
  'Cape Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Republic of the Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'DR Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Vatican City',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'São Tomé and Príncipe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
  'Taiwan',
  'Kosovo',
];

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
    sendRequest({ url: 'https://restcountries.com/v3.1/all' }, countryData => {
      const filteredData = countryData.filter(country => COUNTRIES_LIST.includes(country.name.common));
      const sortedData = filteredData.sort((a, b) => a.name.common > b.name.common);

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
