import React,{ useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import PersonPinIcon from '@material-ui/icons/PersonPin';
import "./../css/services-nearby.css";

import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXRkaGFrYWQiLCJhIjoiY2tydnRxNmt4MDl6MDJvbnRtY2dlMTNodSJ9.toBogll3YNVR6Y0dkrR8fw';

const Marker = (props) => <PersonPinIcon id={`marker-${props.id}`} onClick={props.onSelect} className="marker" style={{fill:'blue'}} />;

function NearbyServices(props){
    const mapContainerRef = useRef(null);

    const [filteredData, setFilteredData] = useState(props.data? props.data:[]);

	const [myMap, setMyMap] = useState(null);
	const [currentMarkers, setCurrentMarkers] = useState([]);
    const [filteredFor, setFilteredFor] = useState('');

    const [selected, setSelected] = useState(null);

	useEffect(() => {
		const map = new mapboxgl.Map({
		  container: mapContainerRef.current,
		  // See style options here: https://docs.mapbox.com/api/maps/#styles
		  style: 'mapbox://styles/mapbox/satellite-streets-v11',
		  center: [77.4126, 23.2599],
		  zoom: 8,
		});

        filteredData?.map(product=>{
            const markerNode = document.createElement('div');
            ReactDOM.render(<Marker id={product.id} onSelect={()=>setSelected(product)}/>, markerNode);
            markerNode.style.background = 'yellow';
            markerNode.style.borderRadius = '50%';
            // add marker to map
            var marker = new mapboxgl.Marker(markerNode)
                .setLngLat({lat:product.lat,lon:product.lng})
                .addTo(map);
            setCurrentMarkers(marks=>[...currentMarkers,marker]);
            return product;
        });
		
		//map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
		setMyMap(map);
		return () => map.remove();
	  }, [filteredData]);

      useEffect(() => {
        if(selected && myMap){
            const popup = new mapboxgl.Popup()
            .setLngLat([selected.lng,selected.lat])
            .setHTML(`<div class="popup"> 
                <h6> Details: </h6> 
                <h3>${selected.ShopName}</h3> 
                <a href=${window.location.href+'service/'+selected.id}><em >get details</em></a>
            </div>`)
            .addTo(myMap);
             }
             return setSelected(null);
      }, [selected])

	  const handleMapFiltered=(e)=>{
          e.preventDefault();
          setFilteredData(
            props.data.filter(d=>{
                if (d.ShopName.toUpperCase().search(filteredFor)!==-1 || d.Description.toUpperCase().search(filteredFor)!==-1) return true;
            })
          );
		};
    return(
        <div className="service-nearby-main-container">
            <h3>Services nearby you.</h3>
            <form>
                <input className="search-nearby" type="search" placeholder="Search filter" value={filteredFor} onChange={e=>setFilteredFor(e.target.value.toUpperCase())}/>
                <button type="submit" onClick={handleMapFiltered}>filter</button>
            </form>
            <em>Adjust zoom and click on icon to know more.</em>
			<div className="map-container" ref={mapContainerRef} />
        </div>
    );
}

export default NearbyServices;