import am5geodata_data_countries2 from '@amcharts/amcharts5-geodata/data/countries2';

export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        resolve(coords);
      });
    } else {
      reject();
    }
  });
};

export const getCurrentCountryFromLocation = async ({ latitude, longitude }) => {
  try {
    const currentLocationReponse = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );
    const currentLocationData = await currentLocationReponse.json();
    const currentCountryCode = currentLocationData.countryCode;

    return currentCountryCode;
  } catch (error) {
    console.error(error.message);
  }
};

export const fillVistedCountries = async (countriesData, visitedCountries) => {
  if (!countriesData) return;

  const data = [];
  const coords = await getCurrentLocation();
  const currentCountryCode = await getCurrentCountryFromLocation(coords);

  for (const country of visitedCountries) {
    const countryName = country.name;

    const visitedCountryCode = countriesData.find(country => country.name.common === countryName).cca2;
    const visitedCountryData = am5geodata_data_countries2[visitedCountryCode];

    if (!visitedCountryData.maps.length) continue;

    const countryMapData = {
      id: visitedCountryCode,
      map: visitedCountryData.maps[0],
      polygonSettings: { fill: visitedCountryCode === currentCountryCode ? '#ff0000' : '#ff971a' },
    };

    data.push(countryMapData);
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
