import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Description(props){

	const [data, setData] = useState(false);
	const [profile, setProfile] = useState(false);

	const [canRate, setCanRate] = useState(false);
	
	const [rating, setRating] = useState(25);

	const [feed, addFeed] = useState('')

	useEffect(()=>{
	
		const user = localStorage.getItem('user223');
		if((user===null) || (user==='')){
			let productId = -1;
		}else{
			var productId = window.location.href.split('/')[4];
		
		
		const url = localStorage.getItem('url');
		axios.post(url+'productData/',{
					'productId':productId,
					'Username': localStorage.getItem('user223')
			},{
				headers: {
					'Authorization': `Token ${localStorage.getItem('token')}` 
				}
			}).then(res=>{
			setData(res.data.data);
			setProfile(res.data.providerDetail);
		})
		}
	},[]);


	const addNewSmsBox=(provider)=>{
		const user = localStorage.getItem('user223');
		if(user===provider) alert('You cannot send message to yourself.');
		else if(user===null) alert('Please login or signup.')
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'addNewSmsBox/',{
				'user':user,
				'provider':provider
			},{
							headers: {
								'Authorization': `Token ${localStorage.getItem('token')}` 
							}
						}).then(res=>{
				if (res.data.msg){
					props.afterAddingNewSms(user,provider);
				}
			})
		}
	}

	const giveRating=()=>{
		const user = localStorage.getItem('user223')
		if(user===null) alert('Please signup or login.');
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'giveRating/',{
					'user':user,
					'productId':props.productId,
					'rating':rating
			},{
							headers: {
								'Authorization': `Token ${localStorage.getItem('token')}` 
							}
						}).then(res=>{
			if(res.data.msg){
				alert(res.data.msg);
			}else{
				setData(res.data.data);
				setProfile(res.data.providerDetail);
			}
			setCanRate(false);
			})
		}
	}


	const giveFeed=()=>{
		const user = localStorage.getItem('user223')
		if (feed==='') alert('Feedback should not be empty.');
		else if(user===null) alert('Please signup or login.');
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'addServiceFeed/',{
							'user':user,
							'productId':props.productId,
							'feed':feed
			},{
							headers: {
								'Authorization': `Token ${localStorage.getItem('token')}` 
							}
						}).then(res=>{
				setData(res.data.data);
				setProfile(res.data.providerDetail);
				addFeed('');
			})
		}
	}
	return(
		<div className='Description'>
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
					<p>{data.Description}</p>
				</div>

				{profile?<div className='providerDetail'>
					<h1>Provider details</h1>
					<h5>Username : @{profile.User.username}</h5>
					<h5>Address : {profile.Address}</h5>
					<p><em>If you would get something wrong from provider please contact
						customer care instantly to remove verified tag. 
						This will help us to give better services to you.</em></p>
					<a href={'tel:'+profile.MobileNo}><button>Call</button></a>
					<a href={'sms:'+profile.MobileNo}><button>Direct message</button></a>
					<Link to='/messages'><button onClick={()=>addNewSmsBox(profile.User.username)}>Message</button></Link>
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
		</div>
	)
}

export default Description;
