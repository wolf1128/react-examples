import { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import ComponentA from "../components/ComponentA";
import { useEffect } from "react";

const Ex2 = () => {
  const kirunaPosition: LatLngExpression = [67.8558, 20.2253];

  const center: LatLngExpression = [67.505, 20];
  const rectangle: LatLngBoundsExpression = [
    [67.8558, 20.2252],
    [67.861, 20.2382],
  ];

  const fillBlueOptions = { fillColor: "blue" };
  const fillRedOptions = { fillColor: "red" };
  const greenOptions = { color: "green", fillColor: "green" };
  const purpleOptions = { color: "purple" };

  return (
    <MapContainer
      center={kirunaPosition}
      zoom={15}
      scrollWheelZoom={false}
      style={{
        height: "80vh",
        width: "90%",
        padding: "10px",
        // margin: "auto auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TileLayer
        // *** Option#1: Openstreet Map
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // *** Option#2: google Maps
        attribution="Google Maps"
        url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" /* layer modes: m: map | s: satellite | h: hybrid | t: terrain */
        maxZoom={19}
        minZoom={5}
      />
      <Marker position={kirunaPosition}>
        <Popup autoClose={true} closeButton={true}>
          <ComponentA />
        </Popup>
      </Marker>

      <LayerGroup>
        <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
        <Circle
          center={center}
          pathOptions={fillRedOptions}
          radius={100}
          stroke={false}
        />
        <LayerGroup>
          <Circle
            center={[51.51, -0.08]}
            pathOptions={greenOptions}
            radius={100}
          />
        </LayerGroup>
      </LayerGroup>
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Guess who is here! :)</Popup>
        <Circle center={[51.51, -0.06]} radius={200} />
        <Rectangle bounds={rectangle} />
      </FeatureGroup>
    </MapContainer>
  );
};

export default Ex2;
