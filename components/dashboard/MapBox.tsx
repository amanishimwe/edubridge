import React, { useEffect, useRef } from "react";
import type { NextPage } from "next";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBox({ coordinates: { lat, long } }: any) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],

      zoom: 10,
    });

    return () => map.remove();
  }, []);
  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
}
