import React,{ useState } from 'react';
import axios from 'axios';


function AddFeedback(){
	const [feed, setFeed] = useState('');
	
	const handleFeedback = () => {

		if (feed===''){
			alert('feedback box Should not be empty.')
		}
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'addFeedback/',{
				'username':localStorage.getItem('user223'),
				'msg':feed
			},{
					  headers: {
					    'Authorization': `Token ${localStorage.getItem('token')}` 
					  }
			}).then(res=>{
				alert('We will add this after review!\n (does not depend on good/bad feedback.)');
			})
			setFeed('')
		}
	}
	return(
		<div className='AddFeedback'>
			<h3>Give your view here.</h3>
			<textarea value={feed} rows='10' cols='80' onChange={e=>{setFeed(e.target.value)}}></textarea>
			<button onClick={handleFeedback}>submit</button>
		</div>
	);
}

export default AddFeedback;
