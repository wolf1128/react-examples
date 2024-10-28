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
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import ComponentA from "../components/ComponentA";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditControl } from "react-leaflet-draw";

function DraggableMarker() {
  const customPsition: LatLngExpression = [67.8561, 20.2153];

  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(customPsition);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      interactive={true}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "You dare touch me, to make me draggable :D"}
        </span>
      </Popup>
    </Marker>
  );
}

const Ex2 = () => {
  // Drawing
  const [drawnItems, setDrawnItems] = useState<any>([]);

  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    const { _leaflet_id } = layer;

    setDrawnItems((items: any) => [
      ...items,
      { id: _leaflet_id, layerType, layer },
    ]);
  };

  const onDeleted = (e: any) => {
    const { layers } = e;
    layers.eachLayer((layer: any) => {
      const { _leaflet_id } = layer;
      setDrawnItems((items: any) =>
        items.filter((item: any) => item.id !== _leaflet_id)
      );
    });
  };

  // MAP
  const kirunaPosition: LatLngExpression = [67.8558, 20.2253];
  const circlePosition: LatLngExpression = [67.856, 20.2253];
  const center: LatLngExpression = [67.505, 20];
  const [clickedPosition, setClickedPosition] =
    useState<LatLngExpression | null>(null);

  const rectangle: LatLngBoundsExpression = [
    [67.8558, 20.2252],
    [67.861, 20.2382],
  ];

  const fillBlueOptions = { fillColor: "blue" };
  const fillRedOptions = { fillColor: "red" };
  const greenOptions = { color: "green", fillColor: "green" };
  const purpleOptions = { color: "purple" };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setClickedPosition(e.latlng);
      },
    });
    return null;
  };

  useEffect(() => {
    console.log("You have clicked on the map at: ", clickedPosition);
  });

  return (
    <MapContainer
      center={kirunaPosition}
      zoom={15}
      scrollWheelZoom={false}
      style={{
        height: "80vh",
        width: "90%",
        padding: "10px",
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
        /* layer modes: m: map | s: satellite | h: hybrid | t: terrain */
        // url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        maxZoom={19}
        minZoom={5}
      />
      <Marker position={kirunaPosition}>
        <Popup autoClose={true} closeButton={true}>
          <ComponentA />
        </Popup>
      </Marker>

      <LayerGroup>
        <Circle
          center={circlePosition}
          pathOptions={fillBlueOptions}
          radius={200}
        />
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
        <Popup>Guess who is here darling! :)</Popup>
        <Circle center={[51.51, -0.06]} radius={200} />
        <Rectangle bounds={rectangle} />
      </FeatureGroup>
      <DraggableMarker />

      <MapClickHandler />

      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          onDeleted={onDeleted}
          draw={{
            rectangle: true,
            polygon: true,
            circle: true,
            polyline: false,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default Ex2;
