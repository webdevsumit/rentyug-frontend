import React, {useState, useEffect} from 'react';
import axios from 'axios';

function FAQSceen(){

	const [FAQData, setFAQData] = useState([]);

	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.get(url+'FAQData/').then(res=>{
			setFAQData(res.data);
		});
	},[]);

	return(
		<div className='FAQData'>
			{FAQData && <div className='whitebg'>
				<h1>FAQ</h1>
			
				{FAQData.map(d=><React.Fragment>
					<p>Q : {d.Q}</p>
					<p>A : {d.A}</p>
					<br/>
				</React.Fragment>)}
							
			</div>}
		</div>
	)
}

export default FAQSceen;
