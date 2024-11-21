import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

interface Props {
  onCreated: (e: any) => void;
  onDeleted: (e: any) => void;
}

const ControlBar = ({ onCreated, onDeleted }: Props) => {
  return (
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
  );
};

export default ControlBar;
