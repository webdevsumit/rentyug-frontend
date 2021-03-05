import React,{ useState, useEffect } from 'react';
import axios from 'axios';


function Footer(props){
	const [FAQ, setFAQ] = useState(false);
	const [TC, setTC] = useState(false);
	const [PP, setPP] = useState(false);
	const [FAQData, setFAQData] = useState([]);

	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.get(url+'FAQData/').then(res=>{
			setFAQData(res.data);
		});
	},[])
	
	return(
		<div className='Footer'>
			<div>
				<button onClick={()=>{
					setFAQ(!FAQ);
					setPP(false);
					setTC(false);
					}}>FAQ</button>
				<button onClick={()=>{
					setTC(!TC);
					setPP(false);
					setFAQ(false);
				}}>T&C</button>
				<button onClick={()=>{
					setPP(!PP);
					setFAQ(false);
					setTC(false);
				}}>Privacy Policy</button>
			</div>
			{FAQ?<div>
				<h1>FAQ</h1>

				{FAQData.map(d=><React.Fragment>
					<p>{d.Q}</p>
					<p>{d.A}</p>
					<br/>
				</React.Fragment>)}
				
			</div>:''}
			{TC?<div>
				<a href='https://www.termsandconditionsgenerator.com/live.php?token=kBUpr8IyqU0N6JGlVgTIJViVGr7pvD7u'>Terms and Conditions.</a>
			</div>:''}
			{PP?<div>
				<a href='https://www.freeprivacypolicy.com/live/4bd8e718-ab2a-4fea-a894-ae4076b13e2a'>Privacy Policy</a>
			</div>:''}
			<p>©saveyourtime2021</p>
		</div>
	);
}

export default Footer;
