// Hooks, React import
import { useContext, useEffect } from 'react';

// Context import
import CountriesContext from '../../context/countries-context';

// am5Charts import
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

/* TODO
   -> add click and hover events
   -> change colors for each continent
   -> adjust zoom levels
   -> zoom into current location and select current country
   -> show country info after clicking on map
   -> adjust map to fit full screen
  */

const Map = () => {
  const { visitedCountries } = useContext(CountriesContext);

  useEffect(() => {
    const root = am5.Root.new('mapdiv');
    const chart = root.container.children.push(am5map.MapChart.new(root, { projection: am5map.geoNaturalEarth1() }));
    const worldSeries = chart.series.push(am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_worldLow }));

    worldSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      templateField: 'polygonSettings',
    });

    return () => root.dispose();
  }, [visitedCountries]);

  return <div className='w-full h-screen' id='mapdiv'></div>;
};

export default Map;
