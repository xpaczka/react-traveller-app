import am5geodata_data_countries2 from '@amcharts/amcharts5-geodata/data/countries2';

export const fillVistedCountries = (countriesData, visitedCountries) => {
  const data = [];

  for (const country of visitedCountries) {
    const countryName = country.name;

    if (!countriesData) return;

    const visitedCountryCode = countriesData.find(country => country.name.common === countryName).cca2;
    const visitedCountryData = am5geodata_data_countries2[visitedCountryCode];

    if (visitedCountryData.maps.length) {
      const countryMapData = {
        id: visitedCountryCode,
        map: visitedCountryData.maps[0],
        polygonSettings: { fill: '#ff971a' },
      };

      data.push(countryMapData);
    }
  }

  return data;
};

export const setCountryStatus = (e, countries, visitedCountries, add, remove) => {
  const clickedCountry = e.target.dataItem.get('id');
  const clickedCountryData = countries.find(country => country.cca2 === clickedCountry);

  const countryDataObject = { name: clickedCountryData.name.common, continent: clickedCountryData.continents[0] };
  const isCountryVisited = visitedCountries.some(country => country.name === countryDataObject.name);

  isCountryVisited ? remove(countryDataObject) : add(countryDataObject);
};
