import * as am5 from '@amcharts/amcharts5';
import am5geodata_data_countries2 from '@amcharts/amcharts5-geodata/data/countries2';

export const customizeCountriesMapData = worldSeries => {
  const data = [];
  const continents = {
    AF: '#0000ff',
    AN: '#0000ff',
    AS: '#0000ff',
    EU: '#0000ff',
    NA: '#0000ff',
    OC: '#0000ff',
    SA: '#0000ff',
  };

  for (const id of Object.keys(am5geodata_data_countries2)) {
    const country = am5geodata_data_countries2[id];

    data.push({
      id: id,
      map: country.maps[0],
      polygonSettings: { fill: am5.color(continents[country.continent_code]) },
    });
  }

  worldSeries.data.setAll(data);
};
