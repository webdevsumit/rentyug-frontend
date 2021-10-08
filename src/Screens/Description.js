import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect} from 'react-router-dom';
import ShowError from '../Components/ShowError';
import MessageBox from './MessageBox';
import "./../css/description.css";
import {useSelector} from 'react-redux'
import UploadingAnim from '../Components/UploadingAnim';
import LoadingAnim from '../Components/LoadingAnim';

function Description(){

	const { url } = useSelector(state=>state.isLogin);

	const [data, setData] = useState(false);
	const [profile, setProfile] = useState(false);

	const [productId, setProductId] = useState(false);

	const [canRate, setCanRate] = useState(false);
	
	const [rating, setRating] = useState(25);

	const [feed, addFeed] = useState('');

	const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const [isGoodMessage, setIsGoodMessage] = useState(false);


	const [showConfirmBox, setShowConfirmBox] = useState(false);
	const [consumerContact, setConsumerContact] = useState('');

	const [redirectToAccount, setRedirectToAccount] = useState(false);
	const [redirectToLogin, setRedirectToLogin] = useState(false);

	const [Messaging, setMessaging] = useState(false);
	const [msgingTo, setMsgingTo] = useState(false);

	const [uploading, setUploading] = useState(false);

	useEffect(()=>{
	
		const user = localStorage.getItem('user223');
		if((user===null) || (user==='')){
			setRedirectToLogin(true);
		}else{
			var product_id = window.location.href.split('/')[4];
			setProductId(product_id);
		
		
		axios.post(url+'productData/',{
					'productId':product_id,
					'Username': localStorage.getItem('user223')
			},{
				headers: {
					'Authorization': `Token ${localStorage.getItem('token')}` 
				}
			}).then(res=>{
			setData(res.data.data);
			setProfile(res.data.providerDetail);
		}).catch(()=>setRedirectToLogin(true))
		}
	},[]);


	const addNewSmsBox=(provider)=>{
		setUploading(true);
		const user = localStorage.getItem('user223');
		if(user===provider){
			setIsError(true);
			setErrorMessage('You cannot send message to yourself.');
		}else if(user===null){
			setIsError(true);
			setErrorMessage('Please signup or login.');
		}else{
			
			axios.post(url+'addNewSmsBox/',{
				'user':user,
				'provider':provider
			},{
							headers: {
								'Authorization': `Token ${localStorage.getItem('token')}` 
							}
						}).then(res=>{
				if (res.data.msg){
					setMessaging(true);
					setMsgingTo(provider);
					setUploading(false);
				}
			})
		}
	}

	const giveRating=()=>{
		const user = localStorage.getItem('user223')
		if(user===null){
			setIsError(true);
			setErrorMessage('Please signup or login.');
		}else{
			setUploading(true);
			axios.post(url+'giveRating/',{
					'user':user,
					'productId':productId,
					'rating':rating,
					'provider':profile.User.username
			},{
				headers: {
					'Authorization': `Token ${localStorage.getItem('token')}` 
				}
			}).then(res=>{
				if(res.data.msg){
					setIsError(true);
					setErrorMessage(res.data.msg);
				}else{
					setData(res.data.data);
					setProfile(res.data.providerDetail);
				}
				setUploading(false);
				setCanRate(false);
			})
		}
	}

	const RentNow=()=>{
		const user = localStorage.getItem('user223');
		 
		axios.post(url+'rentnow/',{
			'username':user,
		},{
				headers: {
					'Authorization': `Token ${localStorage.getItem('token')}` 
				}
			}).then(res=>{
			if (res.data.error){
				setIsError(true);
				setErrorMessage(res.data.error);
				setTimeout(() => {
					setRedirectToAccount(true);
				}, 4000)
			}else{
				setShowConfirmBox(true);
				setConsumerContact(res.data.ContactNo);
			}
		})
	}

	const handleConfirRentNow=(profileId, productId)=>{
		setShowConfirmBox(false);
		setUploading(true);
		const user = localStorage.getItem('user223');
		 
		axios.post(url+'rentnowconfirmed/',{
			'username':user,
			'profileId':profileId,
			'productId':productId,
			'consumerContact':consumerContact
		},{
				headers: {
					'Authorization': `Token ${localStorage.getItem('token')}` 
				}
			}).then(res=>{
			
				setIsGoodMessage(true);
				setErrorMessage(res.data.msg);
				setUploading(false);
				setTimeout(() => {
					setIsGoodMessage(false);
				}, 8000);
		})
	}


	const giveFeed=()=>{
		const user = localStorage.getItem('user223')
		if (feed===''){
			setIsError(true);
			setErrorMessage('Feedback should not be empty.');
		}else if(user===null){
			setIsError(true);
			setErrorMessage('Please signup or login.');
		}else{
			 
			setUploading(true);
			axios.post(url+'addServiceFeed/',{
							'user':user,
							'productId':productId,
							'feed':feed
			},{
				headers: {
					'Authorization': `Token ${localStorage.getItem('token')}` 
				}
			}).then(res=>{
				setUploading(false);
				setData(res.data.data);
				setProfile(res.data.providerDetail);
				addFeed('');
			})
		}
	}

	if(redirectToAccount) return <Redirect to={"/account/"+localStorage.getItem('user223')}/>
	if(redirectToLogin) return <Redirect to="/login"/>
	return(<div>
			<div className='description'>
				{Messaging && <MessageBox 
					msgingTo={msgingTo}
					onClose={()=>setMessaging(false)}
				/>}
				{isError && <ShowError message={errorMessage} onclose={()=>setIsError(false)}/>}
				{isGoodMessage && <ShowError message={errorMessage} goodMessage={true} onclose={()=>setIsGoodMessage(false)}/>}
				{uploading && <UploadingAnim/>}

				<h1>Details</h1>
				{data?<div>
					<h6>Rating : {data.Rating}</h6>


					{canRate?<div>
						<input type='range' min='0' max='50' value={rating}  
							onChange={e=>setRating(e.target.value)}/><br/>
						<button onClick={giveRating}>Rate</button>
					</div>:<button onClick={setCanRate(true)}>Give rating</button>}


					<h4>{data.ShopName}</h4>
					<p>Category : {data.Type.Name}</p>
					
					<div className='imageSlider'>
						<span>
							<img src={data.MainImage} alt='product'/>
						</span>
						{data.ServiceImages.map(i=><span key={i.id}>
							<img src={i.Image} alt=''/>
						</span>
						)}
					</div>

					<p>Open Time to contact: {data.OpenTime}</p>
					<p>Close Time to contact : {data.closeTime}</p>
					<p>Rent : {data.PriceType}</p>

					<p>Rental Status : {data.RentalStatus? <b>Available</b> : <b>Not available</b>}</p>
					<p>No of items : {data.NoOfItems}</p>

					<div className='descBox'>
						<h3>Description</h3>
						<p className='para-whitespace'>{data.Description}</p>
					</div>

					{profile?<div className='providerDetail'>
						<h1>Provider details</h1>
						<h5>Username : @{profile.User.username}</h5>
						<h5>Address : {profile.Address}</h5>
						<p><em>If you would get something wrong from provider please contact
							customer care instantly to remove verified tag. 
							This will help us to give better services to you.</em></p>
							{showConfirmBox && <>
								<div className="show-confirm-main-container">
									<div className="confirm-card">
										<h3>You will get a phone call in just 5 minutes.</h3>
										<p>Please confirm your mobile number or change it.</p>
										<form className="confirm-message">
											<input type="text" value={consumerContact} onChange={e=>setConsumerContact(e.target.value)} />
											<h5 className="confirm-button" onClick={()=>handleConfirRentNow(profile.id, data.id)}>Confirm</h5>
										</form>
									</div>
								</div>
							</>}
						<button onClick={RentNow}>Rent Now</button>
						<button onClick={()=>addNewSmsBox(profile.User.username)}>Message</button>
					</div>:''}


					<div className='breakpoint'></div>
						<h1>Feedbacks</h1>
												
						{data.ServiceFeedback.map(f=>{return(
						<div key={f.id} className='feed'>
							<p>{f.Username}</p>
							<p>{f.Message}</p>
							<p><em>{f.Date}</em></p>
						</div>
					)})}

					<div>
						<textarea 
						value={feed}
						placeholder='how service provider can  improve.'
						onChange={(e)=>addFeed(e.target.value)}
						></textarea><br/>
						<button
						onClick={giveFeed}
						>give feedback</button>
					</div>
				</div>:<LoadingAnim/>}
			</div>
		</div>
	)
}

export default Description;
