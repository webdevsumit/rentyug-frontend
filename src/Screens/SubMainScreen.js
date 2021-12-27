import React,{useEffect, useState} from 'react';
import ServiceCategories from '../Components/ServiceCategories';
import FamousServices from '../Components/FamousServices';
import YouMayLike from '../Components/YouMayLike';
import Feedbacks from '../Components/Feedbacks';
import Footer from '../Components/Footer';
import SiteIntro from '../Components/SiteIntro';
import AddFeedback from '../Components/AddFeedback';
import GoogleAds from '../Components/GoogleAds';
import axios from 'axios';
import "./../css/submainscreen.css";

import {useSelector, useDispatch } from 'react-redux'
import NearbyServices from '../Components/NearbyServices';
import LoadingAnim from '../Components/LoadingAnim';
import {setUnreadMsg} from '../redux/isLogin'


function SubMainScreen(props){

	const dispatch = useDispatch();
	const [data, setData ] = useState({});
	const { isLogin, url } = useSelector(state=>state.isLogin);
	const [interestedServiceData, setInterestedServiceData] = useState([]);

	useEffect(() => {
		axios.post(url+'mainPageData/', {'user':localStorage.getItem('user223')}).then(res=>{
			setData(res.data);
			setInterestedServiceData(res.data.InterestedService.Services);
			dispatch(setUnreadMsg(res.data.UnreadMsg));
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
			setInterestedServiceData(res.data.InterestedService.Services);
		});

	};


	return(<div>
		{data?.ServiceCatagories?
				<div>
					
					{!isLogin && <SiteIntro openAboutUs={props.openAboutUs}/>}
					<FamousServices data={data.Plans[0].PlanServices?data.Plans[0].PlanServices:[]} />
					{data?.InterestedService?.Services && <YouMayLike
						removeItem={removeItem}
						data={interestedServiceData}/>
					}
					<ServiceCategories
						data={data?.ServiceCatagories}
					/>
					<GoogleAds slot="3815987351" />
					{data?.NearbyServices?.length>0 && <NearbyServices data={data.NearbyServices}/>}
					<Feedbacks data={data?.FrontPageFeedback}/>
					{isLogin?<AddFeedback/>:<em>You can give feedback after signup/login.</em>}
					<hr/>
					<Footer/>
				</div>
			:
				<LoadingAnim/>
				}
	</div>)
}

export default SubMainScreen;