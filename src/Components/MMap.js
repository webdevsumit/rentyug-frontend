import React,{ useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import EditLocationIcon from '@material-ui/icons/EditLocation';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXRkaGFrYWQiLCJhIjoiY2tydnRxNmt4MDl6MDJvbnRtY2dlMTNodSJ9.toBogll3YNVR6Y0dkrR8fw';

const Marker = ({ id }) => <EditLocationIcon id={`marker-${id}`} className="marker" style={{fill:'yellow'}} />;

function MMap(props){
    const mapContainerRef = useRef(null);

	const [myMap, setMyMap] = useState(null);
	const [currentMarkers, setCurrentMarkers] = useState(null);

	useEffect(() => {
		const map = new mapboxgl.Map({
		  container: mapContainerRef.current,
		  // See style options here: https://docs.mapbox.com/api/maps/#styles
		  style: 'mapbox://styles/mapbox/satellite-streets-v11',
		  center: [77.4126, 23.2599],
		  zoom: 12.5,
		});

		const markerNode = document.createElement('div');
		ReactDOM.render(<Marker id={1} />, markerNode);
		markerNode.style.background = 'transparent';
			// add marker to map
		var marker = new mapboxgl.Marker(markerNode)
			.setLngLat({lat:props.latLng.lat,lon:props.latLng.lng})
			.addTo(map);
		setCurrentMarkers(marker);

		map.on('click',(e)=>{
			props.setLatLng(e.lngLat.wrap());
		});	

		//map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
		setMyMap(map);
		return () => map.remove();
	  }, []);


	  const handleMapClick=()=>{
		if (currentMarkers!==null) {
			  currentMarkers.remove();
		}
		if(myMap){
			const markerNode = document.createElement('div');
			ReactDOM.render(<Marker id={1} />, markerNode);
			markerNode.style.background = 'transparent';
			// add marker to map
			var marker = new mapboxgl.Marker(markerNode)
			.setLngLat({lat:props.latLng.lat,lon:props.latLng.lng})
			.addTo(myMap);
			}
			setCurrentMarkers(marker);
		};
    return(<div>
        <div onClick={handleMapClick} className="map-container" ref={mapContainerRef} />
    </div>)
}

export default MMap;