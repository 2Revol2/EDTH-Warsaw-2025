import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const Map = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [31.1656, 48.3794],
      zoom: 5,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("ukraine", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/UKR.geo.json",
      });
      map.addLayer({
        id: "ukraine-outline",
        type: "line",
        source: "ukraine",
        paint: {
          "line-color": "#FFD700",
          "line-width": 3,
        },
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
};
