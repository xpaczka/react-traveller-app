import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

import { useEffect } from 'react';
import { customizeCountriesMapData } from '../libs/am5';

const Map = props => {
  /* TODO
   -> add click and hover events
   -> change colors for each continent
   -> adjust zoom levels
   -> zoom into current location and select current country
   -> show country info after clicking on map
  */

  useEffect(() => {
    const root = am5.Root.new('mapdiv');
    const chart = root.container.children.push(am5map.MapChart.new(root, { projection: am5map.geoNaturalEarth1() }));
    const worldSeries = chart.series.push(am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_worldLow }));

    worldSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      templateField: 'polygonSettings',
    });

    customizeCountriesMapData(worldSeries);

    return () => root.dispose();
  }, []);

  return <div className='w-[100%] h-[100vh]' id='mapdiv'></div>;
};

export default Map;
