import GoogleMapReact from "google-map-react";
import ComponentA from "../components/ComponentA";

const AnyReactComponent = ({
  text,
  lat,
  lng,
}: {
  text: string;
  lat: number;
  lng: number;
}) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text} {lat} {lng}
  </div>
);

const Ex1 = () => {
  const defaultProps = {
    center: {
      lat: 67.8558,
      lng: 20.2253,
    },
    zoom: 14,
  };

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        hoverDistance={20}
        options={{
          mapTypeId: "hybrid",
        }} /* options: roadmap | satellite | hybrid | terrain  /*/
      >
        <AnyReactComponent lat={65} lng={21} text="My Marker" />
        <ComponentA />
      </GoogleMapReact>
    </div>
  );
};

export default Ex1;
