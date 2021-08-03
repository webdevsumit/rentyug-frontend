import React,{ useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import EditLocationIcon from '@material-ui/icons/EditLocation';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXRkaGFrYWQiLCJhIjoiY2tydnRxNmt4MDl6MDJvbnRtY2dlMTNodSJ9.toBogll3YNVR6Y0dkrR8fw';

const Marker = ({ id }) => <EditLocationIcon id={`marker-${id}`} className="marker" />;

function SignupScreen(props){
	const mapContainerRef = useRef(null);

	const [latLng, setLatLng] = useState({lat:0,lng:0});
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

		map.on('click',(e)=>{
			setLatLng(e.lngLat.wrap());
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
			// add marker to map
			var marker = new mapboxgl.Marker(markerNode)
			.setLngLat({lat:latLng.lat,lon:latLng.lng})
			.addTo(myMap);
			}
			setCurrentMarkers(marker);
		};

	const [username, setUsername]     = useState('');
	const [firstname, setFirstname]   = useState('');
	const [lastname, setLastname]     = useState('');
	const [email, setEmail]           = useState('');
	const [password1, setPassword1]   = useState('');
	const [password2, setPassword2]   = useState('');
	const [moNo, setMoNo]   		  = useState('');
	const [addrs, setAddrs]   		  = useState('');
	const [image, setImage]   		  = useState(null);

	const [hidePass1, setHidePass1]   = useState(true);
	const [hidePass2, setHidePass2]   = useState(true);
	
	const [redirect, setRedirect] = useState(null);
	const [uploading, setUploading] = useState(false);
	
	const handleSignup=(as)=>{
		if(password1 !== password2){
			alert('Passwords are not matching.');
		}else if(username==='' || password1==='' || email===''){
			alert('* fields are required.');
		}else{
				let formData2 = new FormData();
				formData2.append('username',username);
				formData2.append('first_name',firstname);
				formData2.append('last_name',lastname);
				formData2.append('email',email);
				formData2.append('password',password1);
				formData2.append('Address',addrs);
				formData2.append('MobileNo',moNo);
				formData2.append('image',image);

				formData2.append('lat',latLng.lat);
				formData2.append('lng',latLng.lng);

				const url = localStorage.getItem('url');

				setUploading(true);
				axios.post(url+'signupAsProvider/',formData2).then(res=>{
					setUploading(false);
					if(res.data.error){
						alert(res.data.error)
					}else{
						localStorage.setItem('user223',username);
						localStorage.setItem('token',res.data.token);
						props.afterSignup();
						setRedirect('redirect');
					}
				}).catch(err=>{
					alert('Please provide valid details.');
					setUploading(false);
				})
		}
	}

	if (redirect) return <Redirect to='/'/>;
	
	return(
		<div className='SignupScreen'>

			{uploading && <div className='uploading'>
											
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
										
			</div>}

			<img className='profileImg'
			src={image?URL.createObjectURL(image):''} alt='profile'/>
			
			<input type='file' accept='image/*' 
			onChange={e=>{setImage(e.target.files[0]); console.log(image)}}/>

			
			<input type='text' value={username} 
				onChange={e=>{setUsername(e.target.value)}}
				placeholder='Username*' required
			/>
			<input type='text' value={firstname} 
				onChange={e=>{setFirstname(e.target.value)}}
				placeholder='Firstname'
			/>
			<input type='text' value={lastname} 
				onChange={e=>{setLastname(e.target.value)}}
				placeholder='Lastname'
			/>
			<input type='email' value={email} 
				onChange={e=>{setEmail(e.target.value)}}
				placeholder='Email*' required
			/>
			
			<input type={hidePass1?'password':'text'} 
				value={password1} onChange={e=>{setPassword1(e.target.value)}}
				placeholder='Password*' required
			/>
			<button onClick={()=>{setHidePass1(!hidePass1)}}>{hidePass1?'show':'hide'}</button>
			
			<input type={hidePass2?'password':'text'} 
				value={password2} onChange={e=>{setPassword2(e.target.value)}}
				placeholder='Confirm Password*' required
			/>
			<button onClick={()=>{setHidePass2(!hidePass2)}}>{hidePass2?'show':'hide'}</button>


			<input type='tel'
				value={moNo} onChange={e=>{setMoNo(e.target.value)}}
				placeholder='Mobile no. eg +91 9876543210*' required
				pattern='[0-9]{2} [0-9]{10}'
			/>

			<div>
				<div onClick={handleMapClick} className="map-container" ref={mapContainerRef} />
			</div>

			<textarea rows='7'
				value={addrs} onChange={e=>{setAddrs(e.target.value)}}
				placeholder={'Enter full address*'} required
			></textarea>

			<div>
				
				<button className='signup-btn' 
					onClick={()=>{handleSignup('service-provider')}}
				>Signup</button>
			</div>
		</div>
	);
}

export default SignupScreen;
