import React,{ useState } from 'react';
import axios from 'axios';
import ShowError from './ShowError';
import "./../css/add-feedback.css";
import { useSelector } from "react-redux";


function AddFeedback(){

	const { url } = useSelector(state=>state.isLogin);
	const [feed, setFeed] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);
	
	const handleFeedback = () => {

		if (feed===''){
			setIsError(true);
			setErrorMessage('Feedback box Should not be empty.');
		}
		else{
			
			axios.post(url+'addFeedback/',{
				'username':localStorage.getItem('user223'),
				'msg':feed
			},{
					  headers: {
					    'Authorization': `Token ${localStorage.getItem('token')}` 
					  }
			}).then(res=>{
				setIsError(true);
				setErrorMessage('We will add this after review!\n (does not depend on good/bad feedback.)');
			})
			setFeed('')
		}
	}
	return(<>
		{isError && <ShowError message={errorMessage} onclose={()=>setIsError(false)}/>}
		<div className='add-feedback'>
			<h3>Give your view here.</h3>
			<textarea value={feed} rows='10' cols='80' onChange={e=>{setFeed(e.target.value)}}></textarea>
			<button onClick={handleFeedback}>submit</button>
		</div>
	</>);
}

export default AddFeedback;
