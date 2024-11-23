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
import ComponentA from "../modules/map/components/ComponentA";
import { useCallback, useMemo, useRef, useState } from "react";
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

interface Area {
  id: number;
  polygon: string;
}

interface Document {
  id: number;
  title: string;
  nodeType: string;
  scale: string;
  stakeholders: string;
  issuanceDate: string;
  language: string;
  pages: string | null;
  georeference?: string;
  area?: Area;
}

const Home = () => {
  // Local states
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "Detail plan for square and commercial street (50)",
      nodeType: "Kiruna kommun",
      scale: "blueprints/effects",
      language: "Swedish",
      pages: "1-43",
      stakeholders: "Stakeholders#1",
      issuanceDate: "IssuanceDate#1",
      georeference: "67.8539, 20.2223",
    },
    {
      id: 2,
      title: "Detail plan for square and commercial street (51)",
      nodeType: "Kiruna kommun",
      scale: "Text",
      language: "Swedish",
      pages: null,
      stakeholders: "Stakeholders#1, Stakeholders#2",
      issuanceDate: "IssuanceDate#1",
      georeference: "67.8547, 20.2262",
    },
    {
      id: 3,
      title: "Detail plan for square and commercial street (52)",
      nodeType: "Kiruna kommun",
      scale: "Concept",
      language: "Swedish",
      pages: "1-43",
      stakeholders: "Stakeholders#1, Stakeholders#2, Stakeholders#3",
      issuanceDate: "IssuanceDate#1",
      georeference: "67.8524, 20.2274",
    },
  ]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>();

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

  // useEffect(() => {
  //   console.log("You have clicked on the map at: ", clickedPosition);
  // }, [clickedPosition]);

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
        {documents && documents.length > 0 ? (
          documents.map((doc) => {
            const [lat, lng] = doc.georeference
              ?.split(",")
              .map((value) => parseFloat(value)) || [0, 0];
            // console.log("lat, lng", lat, lng);
            return (
              // <Marker position={[lat, lng]} key={doc.id}>
              //   <Popup>
              //     <div>
              //       <h2>{doc.title}</h2>
              //       <p>{doc.nodeType}</p>
              //       <p>{doc.scale}</p>
              //       <p>{doc.language}</p>
              //       <p>{doc.stakeholders}</p>
              //       <p>{doc.issuanceDate}</p>
              //       <p>{doc.pages}</p>
              //     </div>
              //   </Popup>
              // </Marker>
              <Circle
                center={[lat, lng]}
                pathOptions={fillBlueOptions}
                radius={50}
                // TODO: Get the scale + issuance date of the selected cicle Then show it on the diagram.
                eventHandlers={{
                  click: (e) => {
                    // console.log("e", lat, lng);
                    setSelectedDocument(doc);
                  },
                }}
              >
                <Popup>
                  <div>
                    <h2>{doc.title}</h2>
                    <p>{doc.nodeType}</p>
                    <p>{doc.scale}</p>
                    <p>{doc.language}</p>
                    <p>{doc.stakeholders}</p>
                    <p>{doc.issuanceDate}</p>
                    <p>{doc.pages}</p>
                  </div>
                </Popup>
              </Circle>
            );
          })
        ) : (
          <p>No document found!</p>
        )}
        {/* <Circle
          center={circlePosition}
          pathOptions={fillBlueOptions}
          radius={200}
        />
        <Circle
          center={center}
          pathOptions={fillRedOptions}
          radius={100}
          stroke={false}
        /> */}
      </LayerGroup>
      {/* <LayerGroup>
        <Circle
          center={[51.51, -0.08]}
          pathOptions={greenOptions}
          radius={100}
        />
      </LayerGroup> */}
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Guess who is here darling! :)</Popup>
        <Circle center={[51.51, -0.08]} radius={200} />
        {/* <Rectangle bounds={rectangle} /> */}
      </FeatureGroup>
      {/* <DraggableMarker /> */}

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

export default Home;
