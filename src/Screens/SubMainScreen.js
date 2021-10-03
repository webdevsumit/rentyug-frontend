import React,{useEffect, useState} from 'react';
import  ServiceCategories from '../Components/ServiceCategories';
import FamousServices from '../Components/FamousServices';
import YouMayLike from '../Components/YouMayLike';
import Feedbacks from '../Components/Feedbacks';
import Footer from '../Components/Footer';
import SiteIntro from '../Components/SiteIntro';
import AddFeedback from '../Components/AddFeedback';
import axios from 'axios';
import "./../css/submainscreen.css";

import {useSelector } from 'react-redux'
import NearbyServices from '../Components/NearbyServices';
import LoadingAnim from '../Components/LoadingAnim';



function SubMainScreen(props){

	const [data, setData ] = useState({});
	const { isLogin, url } = useSelector(state=>state.isLogin);

	useEffect(() => {
		
		console.log(url);

		axios.post(url+'mainPageData/', {'user':localStorage.getItem('user223')}).then(res=>{
			setData(res.data);
		})
	}, []);


	const removeItem=id=>{
		
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
					
					{isLogin?<>{data?.UnreadMsg && <h6 className="unread-messages">{data.UnreadMsg}</h6>}</>:<SiteIntro openAboutUs={props.openAboutUs}/>}


					<FamousServices data={data.Plans[0].PlanServices?data.Plans[0].PlanServices:[]} />


					{data?.InterestedService?.Services && <YouMayLike
						removeItem={removeItem}
						data={data?.InterestedService?.Services}/>
					}

					<ServiceCategories
						data={data.ServiceCatagories}
					/>

					{data?.NearbyServices.length>0 && <NearbyServices data={data.NearbyServices}/>}

					<Feedbacks data={data?.FrontPageFeedback}/>

					{isLogin?<AddFeedback/>:<em>You can give feedback after signup/login.</em>}
					
					<hr/>
					<Footer/>
					
				</div>:<LoadingAnim/>
				}
	</div>)
}

export default SubMainScreen;