import L, { LatLngExpression } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';

L.Marker.prototype.setIcon(
  L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconSize: [25, 41],
    shadowSize: [30, 65],
    iconAnchor: [12, 41],
    shadowAnchor: [7, 65],
  }),
);

const DEFAULT_POSITION = [46.227638, 2.213749] satisfies LatLngExpression;
const DEFAULT_ZOOM = 5;

type MapProps = {
  noFly?: boolean;
  withoutNotificationCircle?: boolean;
  radius?: number;
} & MapContainerProps;

export function WorldMap({ center, children, noFly, withoutNotificationCircle, radius, ...props }: MapProps) {
  return (
    <>
      <MapContainer
        attributionControl={false}
        center={center ?? DEFAULT_POSITION}
        zoom={DEFAULT_ZOOM}
        {...props}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
        {children}
      </MapContainer>
    </>
  );
}