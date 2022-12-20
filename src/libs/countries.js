export const getContinentsLength = countries => {
  const countedContinents = {};
  const continentsData = countries.map(country => country.continents[0]);

  continentsData.forEach(continent => {
    if (continent === 'Antarctica') return;
    countedContinents[continent] = countedContinents[continent] ? countedContinents[continent] + 1 : 1;
  });

  return countedContinents;
};

export const getCountriesCount = continents => {
  const continentsElement = Object.entries(continents);
  if (!continentsElement.length) return 0;

  return continentsElement.map(continent => parseInt(continent[1])).reduce((a, b) => a + b);
};
