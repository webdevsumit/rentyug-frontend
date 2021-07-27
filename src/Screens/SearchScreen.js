import React,{useState, useEffect} from 'react';
import ServiceCard from '../Components/ServiceCard';
import axios from 'axios';


function SearchScreen(props){
	
	const [data, setData] = useState('');
	console.log(props.Name);
	useEffect(()=>{
		console.log(props.Name);
		const url = localStorage.getItem('url');
		axios.post(url+'search/',{'searchName':props.Name,'Username':localStorage.getItem('user223')})
		.then(res=>{
			setData(res.data.data);
		})
	},[]);
	
		return(
			<React.Fragment>
			{data?<div className='SearchScreen'>
				<h6>Results for {props.Name}</h6>
				<div>
					{console.log(props.Name)}
				{data.map(d=>{return(
					<div key={d.id}>
						<ServiceCard 
						id={d.id}
						Image={d.MainImage} 
						Type={d.Type.Name} 
						PriceType={d.PriceType}
						ShopName={d.ShopName}
						Rating={d.Rating}
						OpenTime={d.OpenTime}
						closeTime={d.closeTime}
						handleOpenService={()=>props.handleOpenService(d.id)}
						VStatus = {d.VStatus}
						RentalStatus = {d.RentalStatus}
						/>
					</div>
				)})}
				</div>
				<div className='breakpoint'></div>
				<h4>{data.length===0 && 'No results!'}</h4>
				
			</div>:<h1 className="loader">
										<span>{localStorage.getItem('user223')?
										localStorage.getItem('user223'):'Hey'},</span>
										<span>we</span>
										<span>are</span>
										<span>loading</span>
										<span>the</span>
										<span>best</span>
										<span>for</span>
										<span>you</span>
								</h1>}
		</React.Fragment>
		);
	
}

export default SearchScreen;
