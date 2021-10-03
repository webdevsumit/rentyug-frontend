import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import LoadingAnim from '../Components/LoadingAnim';

function FAQSceen(){

	const [FAQData, setFAQData] = useState([]);
	const { url } = useSelector(state=>state.isLogin);

	useEffect(()=>{
		axios.get(url+'FAQData/').then(res=>{
			setFAQData(res.data);
		});
	},[]);

	return(
		<div className='FAQData'>
			{FAQData? <div className='whitebg'>
				<h1>FAQ</h1>
			
				{FAQData.map(d=><React.Fragment>
					<p>Q : {d.Q}</p>
					<p>A : {d.A}</p>
					<br/>
				</React.Fragment>)}
							
			</div>:<LoadingAnim/>}
		</div>
	)
}

export default FAQSceen;
