import React,{useEffect, useState} from 'react';
import  ServiceCatagories from '../Components/ServiceCatagories';
import FamousServices from '../Components/FamousServices';
import YouMayLike from '../Components/YouMayLike';
import Feedbacks from '../Components/Feedbacks';
import Footer from '../Components/Footer';
import SiteIntro from '../Components/SiteIntro';
import AddFeedback from '../Components/AddFeedback';
import axios from 'axios';

import { useSelector} from 'react-redux'
import NearbyServices from '../Components/NearbyServices';



function SubMainScreen(props){

	const [data, setData ] = useState({});

	const { isCategory } = useSelector(state=>state.isCategory);


	useEffect(() => {
		const url = localStorage.getItem('url');
		axios.post(url+'mainPageData/', {'user':localStorage.getItem('user223')}).then(res=>{
			setData(res.data);
		})
	}, []);


	const removeItem=id=>{
		const url = localStorage.getItem('url');
		axios.post( url+'removeItem/', 
		{
		'user':localStorage.getItem('user223'),
		'id':id
		},{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
		}).then(res=>{
			setData(()=>{
				data.InterestedService=res.data.InterestedService;
				return data;
			});
		});

	};


	return(<div>
		{data?.ServiceCatagories?<div>
					
					{props.login?'':<SiteIntro openAboutUs={props.openAboutUs}/>}
					
					<ServiceCatagories
					 showCategories = {isCategory}
					 data={data.ServiceCatagories}
					 handleChooseCatagory={props.handleChooseCatagory}
					/>


					{data?.InterestedService?.Services && <YouMayLike
										removeItem={removeItem}
										data={data?.InterestedService?.Services} 
										handleOpenService={props.handleOpenService}/>
					}

					{data?.NearbyServices.length && <NearbyServices data={data.NearbyServices}/>}
					
					<FamousServices data={data?.Plans[0].PlanServices} 
					handleOpenService={props.handleOpenService}/>

					
					

					<Feedbacks data={data?.FrontPageFeedback}/>
					{props.login?<AddFeedback/>:<em>You can give feedback after signup/login.</em>}
					<hr/>
					<Footer/>
					
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
					</h1>
				}
	</div>)
}

export default SubMainScreen;