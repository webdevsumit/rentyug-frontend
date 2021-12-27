import React,{useState, useEffect} from 'react';
import ServiceCard from '../Components/ServiceCard';
import axios from 'axios';
import "./../css/searchscreen.css";
import { FaSearchengin } from "react-icons/fa";
import { useSelector } from "react-redux";
import LoadingAnim from '../Components/LoadingAnim';

import GoogleAds from '../Components/GoogleAds';

function SearchScreen(props){

	const { url } = useSelector(state=>state.isLogin);
	
	const [data, setData] = useState('');
	const [searched, setSearched] = useState(false);
	const [searchedName, setSearchedName] = useState('');

	const onSearch=e=>{
		e.preventDefault();
		setSearched(true);
		
		axios.post(url+'search/',{'searchName':searchedName,'Username':localStorage.getItem('user223')})
		.then(res=>{
			setData(res.data.data);
		})
	};
	
		return(<>

				<form className="search-form">
					<input 
						className='search-input'
						type='search'
						placeholder="&#128269; Search for Products, Categories and More."
						autoFocus={true}
						onChange={e=>setSearchedName(e.target.value)}
						/><button className="search-btn" type="submit" onClick={onSearch}>
							<FaSearchengin className='search-icon'/>
						</button>
				</form>

				{searched?
				<>
				{data?
					<div className='search-screen'>
						<h6>Results for {searchedName}</h6>
						<div style={{width:"100%"}}>
							<GoogleAds slot="4606324849" />
						</div>
						<div className="search-container">
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
					</div>
				:
					<LoadingAnim/>
				}
			</>
		:
			<div className="non-searched-first-visit">
					<h5><em>If your search will not be available. Do not worry we will inform you when it will be available on our website.</em></h5>
					<h5><em>Or you can put in it Request Page.</em></h5>
			</div>
		}
		</>);
	
}

export default SearchScreen;
