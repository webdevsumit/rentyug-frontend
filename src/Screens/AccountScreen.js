import React,{ useState, useEffect} from 'react';
import ShowError from '../Components/ShowError';
import axios from 'axios';
import MMap from '../Components/MMap';
import "./../css/account.css";
import UploadingAnim from '../Components/UploadingAnim';
import { useSelector } from 'react-redux';
import LoadingAnim from '../Components/LoadingAnim';
import ServiceCategoryCard from '../Components/ServiceCategoryCard';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";

function AccountScreen(){

	const { url } = useSelector(state=>state.isLogin);

	const [accScreen, setAccScreen] = useState(false);
	const [data, setData] = useState({});
	
	const [profile, setProfile] = useState(null);

	const [firstname, setFirstname] = useState('');
	const [settingFirstname, setSettingFirstname] = useState(false);

	const [lastname, setLastname] = useState('');
	const [settingLastname, setSettingLastname] = useState(false);
	
	const [email, setEmail] = useState('');
	const [settingEmail, setSettingEmail] = useState(false);

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPassword2, setNewPassword2] = useState('');
	const [settingNewPassword, setSettingNewPassword] = useState(false);

	const [myAddr, setMyAddr] = useState('');
	const [settingMyAddr, setSettingMyAddr] = useState(false);

	const [myNo, setMyNo] = useState('');
	const [settingMyNo, setSettingMyNo] = useState(false);
	
	const [shopName, setShopName] = useState('');
	const [settingShopName, setSettingShopName] = useState(false);
	
	const [openTime, setOpenTime] = useState('');
	const [settingOpenTime, setSettingOpenTime] = useState(false);
	
	const [closeTime, setCloseTime] = useState('');
	const [settingCloseTime, setSettingCloseTime] = useState(false);

	const [rentalStatus, setRentalStatus] = useState(false);
	const [settingRentalStatus, setSettingRentalStatus] = useState(false);
		

	const [noOfItems, setNoOfItems] = useState(1);
	const [settingNoOfItems, setSettingNoOfItems] = useState(false);
		
	const [priceType, setPriceType] = useState('');
	const [settingPriceType, setSettingPriceType] = useState(false);
	
	const [desc, setDesc] = useState('');
	const [settingDesc, setSettingDesc] = useState(false);
	
	const [changeShopType, setChangeShopType] = useState(false);
	
	const [shopCatagories, setShopCatagories] = useState('');
	
	const [mainImage, setMainImage] = useState(null);
	
	const [searchName, setSearchName] = useState('');

	const [canAddNewItem, setCanAddNewItem] = useState(false);
	
	const [newShopName, setNewShopName] = useState('');
	const [newMainImage, setNewMainImage] = useState(null);
	const [newItemCataId, setNewItemCataId] = useState('');
	const [newItemOpenTime, setNewItemOpenTime] = useState('');
	const [newItemCloseTime, setNewItemCloseTime] = useState('');
	const [newItemPriceType, setNewItemPriceType] = useState('');

	const [readTC, setReadTC] = useState(false);
	const [agreeTC, setAgreeTC] = useState(false);

	const [uploading, setUploading] = useState(false);

	const [latLng, setLatLng] = useState(null);

	const [serviceLatLng, setServiceLatLng] = useState(null);
	const [serviceAddr, setServiceAddr] = useState('');
	const [settingAddr, setSettingAddr] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);
	
	const [getNotification, setGetNotification] = useState(false);
	const [settingGetNotification, setSettingGetNotification] = useState(false);
	
	
	
	useEffect(()=>{
		
		axios.post(url+'account/',{'username':localStorage.getItem('user223')},{ 
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
				})
		.then(res=>{
			setData(res.data.profile);
			setAccScreen(true);
			setLatLng({lat:res.data.profile.lat,lng:res.data.profile.lng});
			if(res.data.profile.User.first_name==='' || res.data.profile.User.last_name==='' || res.data.profile.Address==='' || res.data.profile.Address==='' || res.data.profile.MobileNo===''){
				setIsError(true);
				setErrorMessage("Please complete the profile. It will help us to provide the best for you.");
			}else if(res.data.profile.lat===23.25 && res.data.profile.lng===77.41){
				setIsError(true);
				setErrorMessage("Settnig your location on map help us to show nearby services.");
			}
		})
	},[]);

	useEffect(()=>{
		
		axios.get(url+'ShopCatagories/',{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
				})
		.then(res=>{
			setShopCatagories(res.data.data);
		})
	},[]);


	const updateFirstname=()=>{
		
		if (firstname===''){
			setIsError(true);
			setErrorMessage('Cannot asign empty value.');
		}else{
			setUploading(true);
			axios.post(url+'setFirstname/',{
					'username':localStorage.getItem('user223'),
					'firstname':firstname
				},{
						  headers: {
						    'Authorization': `Token ${localStorage.getItem('token')}` 
						  }
				})
			.then(res=>{
				setData(res.data.profile);
				setFirstname('');
				setUploading(false);
			})
		}
	}

	const updatePassword=()=>{
			
			if (newPassword.length<8) {
				setIsError(true);
				setErrorMessage('Password should be of minmum 8 characters with the combination of words and numbers.');
			}
			else{
				if(newPassword===newPassword2){
					setUploading(true);
					axios.post(url+'setPassword/',{
							'username':localStorage.getItem('user223'),
							'password':newPassword,
							'oldPassword':oldPassword
						},{
								  headers: {
								    'Authorization': `Token ${localStorage.getItem('token')}` 
								  }
						})
					.then(res=>{
						setUploading(false);
						if(res.data.msg){
							setIsError(true);
							setErrorMessage('Wrong password.');
						}else{
							setData(res.data.profile);
							setNewPassword('');
						}
					})
				}else{
					setIsError(true);
					setErrorMessage('Password should be same.');
				}
			}
		}

	const updateLastname=()=>{
			if (lastname===''){
				setIsError(true);
				setErrorMessage('Cannot asign empty value.');
			}else{
				
				setUploading(true);
				axios.post(url+'setLastname/',{
					'username':localStorage.getItem('user223'),
					'lastname':lastname
				},{
						  headers: {
						    'Authorization': `Token ${localStorage.getItem('token')}` 
						  }
				})
			.then(res=>{
				setUploading(false);
				setData(res.data.profile);
				setLastname('');
			})
		}
	}
	
	const updateEmail=(e)=>{
		e.preventDefault();
		if (email===''){
			setIsError(true);
			setErrorMessage('Cannot asign empty value.');
		}
		else{
			
			setUploading(true);
			axios.post(url+'setEmail/',{
					'username':localStorage.getItem('user223'),
					'email':email
			},{
					  headers: {
					    'Authorization': `Token ${localStorage.getItem('token')}` 
					  }
			})
		.then(res=>{
				if (res.data.error){
					setIsError(true);
					setErrorMessage(res.data.error);
				}else{
					setData(res.data.profile);
				};
				setUploading(false);
				setEmail('');
			})
		}
		setSettingEmail(false);
	}

	const configEmail=()=>{
			
			setUploading(true);
			axios.post(url+'configEmail/',{
					'username':localStorage.getItem('user223'),
			},{
					  headers: {
					    'Authorization': `Token ${localStorage.getItem('token')}` 
					  }
			})
		.then(res=>{
				if (res.data.message){
					setIsError(true);
					setErrorMessage(res.data.message);
				};
				setUploading(false);
			})
	}



	const updateMyAddr=()=>{
			if (myAddr===''){
				setIsError(true);
				setErrorMessage('Cannot asign empty value.');
			}else{
				
				setUploading(true);
				axios.post(url+'setMyAddr/',{
						'username':localStorage.getItem('user223'),
						'Address':myAddr
				},{
						  headers: {
						    'Authorization': `Token ${localStorage.getItem('token')}` 
						  }
				})
			.then(res=>{
					setUploading(false);
					setData(res.data.profile);
					setEmail('');
				})
			}
		}

		const updateLoc=()=>{
			

				
				setUploading(true);
				axios.post(url+'setLoc/',{
						'username':localStorage.getItem('user223'),
						'lat':latLng.lat,
						'lng':latLng.lng
				},{
						  headers: {
						    'Authorization': `Token ${localStorage.getItem('token')}` 
						  }
				})
			.then(res=>{
					setUploading(false);
				})
		}

	const updateMyNo=()=>{
				if (myNo===''){
					setIsError(true);
					setErrorMessage('Cannot asign empty value.');
				}else{
					
					setUploading(true);
					axios.post(url+'setMyNo/',{
							'username':localStorage.getItem('user223'),
							'MobileNo':myNo
					},{
							  headers: {
							    'Authorization': `Token ${localStorage.getItem('token')}` 
							  }
					})
				.then(res=>{
						setUploading(false);
						setData(res.data.profile);
						setEmail('');
					})
				}
			}
	
	const updateShopName=(id)=>{
			if (shopName===''){
				setIsError(true);
				setErrorMessage('Cannot asign empty value.');
			}else{
				
				setUploading(true);
				axios.post(url+'setShopName/',{
					'id':id,
					'ShopName':shopName,
					'username':localStorage.getItem('user223')
				},{
						  headers: {
						    'Authorization': `Token ${localStorage.getItem('token')}` 
						  }
				})
			.then(res=>{
				setUploading(false);
				setData(res.data.profile);
				setShopName('');
			})
		}
	}

	const changeCatagory=(serviceId,catagoryId)=>{
		
		setUploading(true);
		axios.post(url+'updateShopCatagory/',{
					'serviceId':serviceId,
					'catagoryId':catagoryId,
					'username':localStorage.getItem('user223')
				},{
						  headers: {
						    'Authorization': `Token ${localStorage.getItem('token')}` 
						  }
				})
		.then(res=>{
				setUploading(false);
				setData(res.data.profile);
				setChangeShopType(false);
		})
	}

	const changeMainImage=(id)=>{
		if (mainImage===null){
			setIsError(true);
			setErrorMessage('Image not selected.');
		}else{
			
			var formData = new FormData();
			formData.append('id',id);
			formData.append('image',mainImage);
			formData.append('username',localStorage.getItem('user223'));

			setUploading(true);
			axios.post(url+'updateMainImage/',formData,{
					  headers: {
					    'Authorization': `Token ${localStorage.getItem('token')}` 
					  }
					})
			.then(res=>{
				setUploading(false);
				setData(res.data.profile);
				setMainImage(null);
			})
			
		}
	}
	
	const changeImage=(id)=>{
		if (mainImage===null && profile===null){
			setIsError(true);
			setErrorMessage('Image not selected.');
		}else{
			var formData = new FormData();
			formData.append('id',id);
			
			
			if(profile===null) formData.append('image',mainImage);
			else formData.append('image',profile);
			
			formData.append('username',localStorage.getItem('user223'));
			

			setUploading(true);
			axios.post(url+'updateImage/',formData,{
					  headers: {
					    'Authorization': `Token ${localStorage.getItem('token')}` 
					  }
					})
			.then(res=>{
				setUploading(false);
				setData(res.data.profile);
				setMainImage(null);
				setProfile(null);
			})
			
		}
	}



	const addNewImg=(id)=>{
	    if (mainImage===null){
			setIsError(true);
			setErrorMessage('Image not selected.');
		}else{                             
	        var formData = new FormData();                                        
	        formData.append('id',id);                        
	        formData.append('image',mainImage);         
	        formData.append('username',localStorage.getItem('user223'));
			

			setUploading(true);
	        axios.post(url+'addNewImage/',formData,{
	        		  headers: {
	        		    'Authorization': `Token ${localStorage.getItem('token')}` 
	        		  }
	        		})
	        .then(res=>{
	        	setUploading(false);
	            setData(res.data.profile);
	            setMainImage(null);
	        })
	
	    }
	 }

	 const changeOpenTime=(id)=>{
	 	if (openTime===''){
			setIsError(true);
			setErrorMessage('Cannot asign empty value.');
		}else{
	 		

	 		setUploading(true);
	 		axios.post(url+'setOpenTime/',{
	 				'username':localStorage.getItem('user223'),
	 				'id':id,
	 				'openTime':openTime
	 			},{
	 					  headers: {
	 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 					  }
	 			})
	 		.then(res=>{
	 			setUploading(false);
	 			setData(res.data.profile);
	 			setOpenTime('');
	 		})
	 	}
	 }

	const changeCloseTime=(id)=>{
	 	if (closeTime===''){
			setIsError(true);
			setErrorMessage('Cannot asign empty value.');
		}else{
	 		

	 		setUploading(true);
	 		axios.post(url+'setCloseTime/',{
	 				'username':localStorage.getItem('user223'),
	 				'id':id,
	 				'closeTime':closeTime
	 			},{
	 					  headers: {
	 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 					  }
	 			})
	 		.then(res=>{
	 			setUploading(false);
	 			setData(res.data.profile);
	 			setCloseTime('');
	 		})
	 	}
	 }
	
	const changeRentalStatus=(id)=>{
		if (rentalStatus) setRentalStatus(true); 
		else setRentalStatus(false);


	 	if (rentalStatus===true || rentalStatus===false){
	 		

	 		setUploading(true);
	 		axios.post(url+'setRentalStatus/',{
	 				'username':localStorage.getItem('user223'),
	 				'id':id,
	 				'rentalStatus':rentalStatus
	 			},{
	 					  headers: {
	 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 					  }
	 			})
	 		.then(res=>{
	 			setUploading(false);
	 			setData(res.data.profile);
	 			setRentalStatus(false);
	 		})
	 	}
	 }
	
	const changeGetNotification=()=>{
	 		

	 		setUploading(true);
	 		axios.post(url+'setGetNotification/',{
	 				'username':localStorage.getItem('user223'),
	 				'getNotification':(getNotification===true)?true:false
	 			},{
	 					  headers: {
	 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 					  }
	 			})
	 		.then(res=>{
	 			setUploading(false);
	 			setData(res.data.profile);
	 			setSettingGetNotification(false);
				 setGetNotification(false);
	 		})
	 }
	
	
	const changeNoOfItems=(id)=>{

	 	if (noOfItems){
	 		
	 		setUploading(true);
	 		axios.post(url+'setNoOfItems/',{
	 				'username':localStorage.getItem('user223'),
	 				'id':id,
	 				'noOfItems':noOfItems
	 			},{
	 					  headers: {
	 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 					  }
	 			})
	 		.then(res=>{
	 			setUploading(false);
	 			setData(res.data.profile);
	 			setNoOfItems(1);
	 		})
	 	}
	 }
	
	const changePriceType=(id)=>{
	 	if (priceType===''){
			setIsError(true);
			setErrorMessage('Cannot asign empty value.');
		}else{
	 		

	 		setUploading(true);
	 		axios.post(url+'setPriceType/',{
	 				'username':localStorage.getItem('user223'),
	 				'id':id,
	 				'priceType':priceType
	 			},{
	 					  headers: {
	 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 					  }
	 			})
	 		.then(res=>{
	 			setUploading(false);
	 			setData(res.data.profile);
	 			setPriceType('');
	 		})
	 	}
	 }
	
	const deleteSearchName=(id)=>{
		

		setUploading(true);
	 	axios.post(url+'deleteSearchName/',{
 			'username':localStorage.getItem('user223'),
			'id':id
	 	},{
	 			  headers: {
	 			    'Authorization': `Token ${localStorage.getItem('token')}` 
	 			  }
	 	})
	 	.then(res=>{
	 		setUploading(false);
	 		setData(res.data.profile);
	 	})
	 }
	 
	const deleteImage=(id)=>{
		
		setUploading(true);
	 	axios.post(url+'deleteImage/',{
 			'username':localStorage.getItem('user223'),
			'id':id
	 	},{
	 			  headers: {
	 			    'Authorization': `Token ${localStorage.getItem('token')}` 
	 			  }
	 	})
	 	.then(res=>{
	 		setUploading(false);
	 		setData(res.data.profile);
	 	})
	 }
	 
	const addSearchName=(serviceId)=>{
	 	if (searchName===''){
			setIsError(true);
			setErrorMessage('Cannot asign empty value.');
		}else{
	 		

	 		setUploading(true);
	 		axios.post(url+'addSearchName/',{
	 				'username':localStorage.getItem('user223'),
	 				'serviceId':serviceId,
	 				'searchName':searchName
	 			},{
	 					  headers: {
	 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 					  }
	 			})
	 		.then(res=>{
	 			setUploading(false);
	 			setData(res.data.profile);
	 			setSearchName('');
	 		})
	 	}
	 }


	 const updateDesc=(serviceId)=>{
	 	if(desc===''){
			setIsError(true);
			setErrorMessage('Desciption box should not be empty.');
		}else{
	 		

	 		setUploading(true);
	 		axios.post(url+'updateDesc/',{
	 							'username':localStorage.getItem('user223'),
	 			 				'serviceId':serviceId,
	 			 				'desc':desc
	 			},{
	 					  headers: {
	 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 					  }
	 				})
	 		.then(res=>{
	 			setUploading(false);
	 			setData(res.data.profile);
	 			setDesc('');
	 			})
	 	}
	 }


	 const updateServiceAddr=(serviceId)=>{
		if(serviceLatLng==='' || serviceAddr===''){
			setIsError(true);
			setErrorMessage('Address box should not be empty. Also select location.');
		}else{
			

			setUploading(true);
			axios.post(url+'updateServiceAddr/',{
								'username':localStorage.getItem('user223'),
								 'id':serviceId,
								 'serviceId':serviceId,
								 'lat':serviceLatLng.lat,
								 'lng':serviceLatLng.lng,
								 'Address':serviceAddr
				},{
						  headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
						  }
					})
			.then(res=>{
				setUploading(false);
				setData(res.data.profile);
				setServiceAddr('');
				setServiceLatLng('');
				})
		}
	}

	 const addNewService=()=>{
	 	if(newShopName==='' || newMainImage===null || newItemOpenTime==='' || newItemCloseTime==='' || newItemPriceType==='' || newItemCataId===''){
			setIsError(true);
			setErrorMessage('All fields are required.');
		}else{
	 		var formData = new FormData();
	 		formData.append('ShopName',newShopName);
	 		formData.append('MainImage',newMainImage);
	 		formData.append('catagoryId',newItemCataId);
	 		formData.append('OpenTime',newItemOpenTime);
	 		formData.append('CloseTime',newItemCloseTime);
	 		formData.append('PriceType',newItemPriceType);
	 		formData.append('username', localStorage.getItem('user223'));
			

			setUploading(true);
	 		axios.post(url+'addNewService/',formData,{
	 			 					  headers: {
	 			 					    'Authorization': `Token ${localStorage.getItem('token')}` 
	 			 					  }
	 			 				})
	 		.then(res=>{
	 			setUploading(false);
	 			 setData(res.data.profile);
	 			 setNewShopName('');
	 			 setNewMainImage(null);
	 			 setNewItemCataId('');
	 			 setNewItemOpenTime('');
	 			 setNewItemCloseTime('');
	 			 setNewItemPriceType('');
	 			 setCanAddNewItem(false);
	 		})
	 	}
	 }


	const handleAddNewBtn=()=>{
		if(data.User.first_name==='' ||data.User.last_name==='' || data.Address==='' || data.Address==='' || data.MobileNo===''){
			setIsError(true);
			setErrorMessage("Sorry we can not move forward because your profile is not completed.");
		}else if(data.lat===23.25 && data.lng===77.41){
			setIsError(true);
			setErrorMessage("Settnig your location on map help us to show your service to rearby customers.");
		}else if(!data.emailConfirmed){
			setIsError(true);
			setErrorMessage("First, Please verify your email.");
		}else{
			setCanAddNewItem(true);
		}
	}

	const sendVerifyEmail=()=>{
		setUploading(true);
		axios.get(url+'sendVerifyEmail/',{
			headers: {
			  'Authorization': `Token ${localStorage.getItem('token')}` 
			}
	  	}).then(res=>{
			if (res.data.msg) setErrorMessage(res.data.msg);
			else setErrorMessage(res.data.error);
			setIsError(true);
			setUploading(false);
		}).catch(err=>{
			setUploading(false);
		})
	}
	

	const sendGetProductEmail=()=>{
		setUploading(true);
		axios.get(url+'sendGetProductEmail/',{
			headers: {
			  'Authorization': `Token ${localStorage.getItem('token')}` 
			}
	  	}).then(res=>{
			if (res.data.msg) setErrorMessage(res.data.msg);
			else setErrorMessage(res.data.error);
			setIsError(true);
			setUploading(false);
		}).catch(err=>{
			setUploading(false);
		})
	}
	
	
	return(
		<div className='AccountScreen'>
			{isError && <ShowError message={errorMessage} onclose={()=>setIsError(false)}/>}
			{uploading && <UploadingAnim/>}
			{accScreen?<div>
				<h2 className='m-20'>Account</h2>
				
				<img className='profileImg' 
				src={profile?URL.createObjectURL(profile):data?.Image?.Image} alt='Profile'/><br/>
				<input type='file'
				onChange={(e)=>setProfile(e.target.files[0])}
				accept='image/*'/>
				{profile?<button onClick={()=>{changeImage(data.Image.id)}}>Set</button>:<p>Choose image to update.</p>}
				<h4 className='m-20 f-cursive'>@{data.User.username}</h4>

				{data.User.is_superuser &&  <div> 
					<button onClick={sendVerifyEmail}>Send Verify Email</button>
					<button onClick={sendGetProductEmail}>Send Promotion Email</button>
				</div>}

				{settingFirstname?
				<form>First Name : 
					<input type='text' 
						onChange={e=>{setFirstname(e.target.value)}}/>
					<button type="submit"
						onClick={(e)=>{e.preventDefault();updateFirstname(); setSettingFirstname(false);}}
					>Set</button>
				</form>
				:
				<h3>
					First Name : {data.User.first_name}<button
					onClick={()=>{setSettingFirstname(true)}}
				>Update</button></h3>}


				{settingLastname?
				<form>Last Name : 
					<input type='text' 
						onChange={e=>{setLastname(e.target.value)}}/>
					<button type="submit"
						onClick={(e)=>{e.preventDefault();updateLastname(); setSettingLastname(false);}}
				>Set</button>
				</form>
				:
				<h3>
				Last Name : {data.User.last_name}<button
					onClick={()=>{setSettingLastname(true)}}
				>Update</button></h3>}
				

				{settingEmail?
				<form>Email : 
					<input type='text' 
						onChange={e=>{setEmail(e.target.value)}}/>
					<button type="submit"
						onClick={updateEmail}
					>Set</button>
				</form>
				:
				<h3>
					Email : {data.User.email}
					<button
						onClick={()=>{setSettingEmail(true)}}
					>Update</button>
					{data.emailConfirmed?<h6>Verified</h6>:<button onClick={configEmail}>Verify Now</button>}
				</h3>}

				{settingGetNotification?
							<form>
								<p>Get Notifications (Typically on new <b>MESSAGES</b>) : </p>
								<input type='checkbox'
									onChange={e=>setGetNotification(e.target.checked)}
								/>
								<button type="submit"
									onClick={(e)=>{e.preventDefault();
									changeGetNotification();
									setSettingGetNotification(false);}}
								>Set</button>
							</form>
							:
							<p>Get Notifications (Typically on new <b>MESSAGES</b>) : {data.emailNotification?<b>&#10003;</b>:<b>x</b>}<button
							onClick={()=>setSettingGetNotification(true)}
							>Update</button></p>}


				{settingNewPassword?<React.Fragment><h3>Old password : <input type='text' 
										onChange={e=>{setOldPassword(e.target.value)}}/></h3>
									
				
					<h3>New password : <input type='password' 
						onChange={e=>{setNewPassword(e.target.value)}}/></h3>
					
					<h3>Confirm password : <input type='password' 
						onChange={e=>{setNewPassword2(e.target.value)}}/></h3>

					<button
						onClick={()=>{updatePassword(); setSettingNewPassword(false);}}	
					>Set</button></React.Fragment>
				:
				<button
					onClick={()=>{setSettingNewPassword(true)}}
				>Change Password</button>}


				{data.Service && <React.Fragment>
					{settingMyNo?
					<form>Mobile No. : 
						<input type='tel' 
							onChange={e=>{setMyNo(e.target.value)}}/>
						<button type="submit"
							onClick={(e)=>{e.preventDefault();updateMyNo(); setSettingMyNo(false);}}
						>Set</button>
					</form>
					:
					<h3>
					Mobile No. : {data.MobileNo}<button
						onClick={()=>{setSettingMyNo(true)}}
					>Update</button></h3>}
				</React.Fragment>
				}

				{settingMyAddr?
				<form>Address : 
					<input type='text' 
						onChange={e=>{setMyAddr(e.target.value)}}/>
					<button type="submit"
						onClick={(e)=>{e.preventDefault();updateMyAddr(); setSettingMyAddr(false);}}
					>Set</button>
				</form>
				:
				<h3>
					Address : {data.Address}<button
					onClick={()=>{setSettingMyAddr(true)}}
				>Update</button></h3>}
				
				{latLng && <>
					<MMap latLng={latLng} setLatLng={d=>setLatLng(d)}  />
					<button onClick={updateLoc} >Set Location</button>
				</>}
												
								
				{data.Service?<div>
					<h2 className='m-20'>Services provided by you</h2>
					{data.Service.map(d=>{return(
						<div key={d.id} className='editServiceCard'>
							{d.VStatus && <p className='VStatus'>verified</p>}
							<p>Rating : {d.Rating}</p>

							{settingShopName?
							
							<form>
								<input type='text' 
									onChange={e=>setShopName(e.target.value)}/>
							
								<button type="submit"
									onClick={(e)=>{e.preventDefault();updateShopName(d.id); setSettingShopName(false);}}
								>Set</button>
							</form>
							:
							<h4>{d.ShopName}<button 
								onClick={()=>{setSettingShopName(true)}}>Update</button></h4>}

							<p>Category : {d.Type.Name}<button 
							onClick={()=>{setChangeShopType(true)}}>Change</button></p>
							<p>more : {d.Type.Description}</p>

							{changeShopType?<div>
								{shopCatagories.map(Sc=>{return(
									<div key={Sc.id} className='ShopType' 
									onClick={()=>changeCatagory(d.id,Sc.id)}>
										<h5>{Sc.Name}</h5>
										<p>{Sc.Description}</p>
									</div>
								)})}
							</div>:''}
							
							<div className='breakpoint'></div>
							<h3>Service Images</h3>

							<input type='file'
							onChange={(e)=>setMainImage(e.target.files[0])}
							accept='image/*'/>
							
							{mainImage?<div className='previewImage'>
								<img src={URL.createObjectURL(mainImage)} alt='product'/>
								<p>preview</p>
								<em>Now click the replace/add 
								button to replce with/add this image.</em>
								<button onClick={()=>{addNewImg(d.id)}}>Add</button>
							</div>:<p>Select image to add new or replace any.</p>}

							
							<div className='imageSlider'>
								
								<span>
									<img src={d.MainImage} alt='product'/>
									<button
										onClick={()=>changeMainImage(d.id)}
									>Replce</button>
								</span>
								
								{d.ServiceImages.map(i=><span key={i.id}>
									<img src={i.Image} alt=''/>
									<button
										onClick={()=>changeImage(i.id)}>
										Replce
									</button>
									<button
										onClick={()=>deleteImage(i.id)}>
										Delete
									</button>
								</span>)}
							</div>



							{settingDesc?<div className='descBox'>
								<h3>Set Description</h3>
								<textarea 
								rows='20' cols='auto'
								value={desc} onChange={e=>setDesc(e.target.value)}></textarea><br/>
								<button onClick={()=>{updateDesc(d.id);
												setSettingDesc(false)}}>Set</button>
								</div>:<div className='descBox'>
								<h3>Description</h3>
								<p className="para-whitespace">{d.Description}</p>
								<button onClick={()=>{setSettingDesc(true)}}>update</button>
								</div>}
							
							{settingOpenTime?<form>
								<input type='text'
								onChange={e=>setOpenTime(e.target.value)}
								/><button onClick={(e)=>{e.preventDefault();changeOpenTime(d.id); 
												setSettingOpenTime(false);}}>Set</button>
							</form>:<p>Open Time to contact : {d.OpenTime}<button
							onClick={()=>setSettingOpenTime(true)}
							>Update</button></p>}

							
							{settingCloseTime?<form>
								<input type='text'
								onChange={e=>setCloseTime(e.target.value)}
								/><button type="submit" onClick={(e)=>{e.preventDefault();
									changeCloseTime(d.id); 
									setSettingCloseTime(false);}}>Set</button>
							</form>:<p>Close Time to contact : {d.closeTime}<button
							onClick={()=>setSettingCloseTime(true)}
							>Update</button></p>}

							

								
							{settingRentalStatus?<form>
								<p>Available : </p>
								<input type='checkbox'
								onChange={e=>setRentalStatus(e.target.checked)}
								/><button type="submit" onClick={(e)=>{e.preventDefault();changeRentalStatus(d.id);
												setSettingRentalStatus(false);}}>Set</button>
							</form>:<p>Rental status : {d.RentalStatus?<b>Available</b>:<b>Not avialable</b>}<button
							onClick={()=>setSettingRentalStatus(true)}
							>Update</button></p>}
							

								
							{settingNoOfItems?<form>
								<p>NO of items : </p>
								<input type='number' min="0" max="100"
								value={noOfItems}
								onChange={e=>setNoOfItems(e.target.value)}
								/><button type="submit" onClick={(e)=>{e.preventDefault();changeNoOfItems(d.id);
												setSettingNoOfItems(false);}}>Set</button>
							</form>:<p>NO of items : {d.NoOfItems}<button
							onClick={()=>setSettingNoOfItems(true)}
							>Update</button></p>}
							
							
							{settingPriceType?<form>
								<input type='text' placeholder='eg. Rs.10/month'
								onChange={e=>setPriceType(e.target.value)}
								/><button type="submit" onClick={(e)=>{e.preventDefault();changePriceType(d.id); 
												setSettingPriceType(false);}}>Set</button>
							</form>:<p>Rent : {d.PriceType}<button
							onClick={()=>setSettingPriceType(true)}
							>Update</button></p>}

							{settingAddr? <form>
								Address : <input type='text' 
									onChange={e=>{setServiceAddr(e.target.value)}}/>
									{serviceLatLng && <MMap latLng={serviceLatLng} setLatLng={d=>setServiceLatLng(d)}  />}
									<button type="submit"
									onClick={(e)=>{e.preventDefault();updateServiceAddr(d.id); setSettingAddr(false);}}
								>Set</button><br/>

							</form>:<p>Address : {d.Address}<button
							onClick={()=>{setSettingAddr(true); setServiceLatLng({'lat':d.lat,'lng':d.lng})}}
							>Update</button></p>}
							
							<div className='breakpoint'></div>
							<h4>Search Tags</h4>
							
							{d.SearchNames.map(sn=><p key={sn.id}>{sn.Name}
							<DeleteIcon className='cross-for-delete-search-name'
							onClick={()=>{deleteSearchName(sn.id)}}
							/>
							</p>)}

							<form>
								<input value={searchName} 
								placeholder='Name/product/area/nick name/etc.'
								onChange={e=>setSearchName(e.target.value)}/>
								<button type="submit" onClick={e=>{e.preventDefault();addSearchName(d.id);}}>Add new</button>
							</form>

							
							<div className='breakpoint'></div>
							<h4>Feedbacks</h4>
							
							{d.ServiceFeedback.map(f=>{return(
								<div key={f.id} className='feed'>
									<p>{f.Username}</p>
									<p>{f.Message}</p>
									<p>{f.Date}</p>
								</div>
							)})}

							<h4>Rated by</h4>
							{d.RatedBy.map(u=><p key={u.id}>{u.username}</p>)}
						</div>
					)})}
					
					{canAddNewItem?<div className='addServiceCard'>
						<p>Product/Service Name : <textarea rows='4' cols='auto'
						placeholder='Enter full name with address(if want to sell)'
						onChange={e=>setNewShopName(e.target.value)}></textarea></p>

						<p className='previewImage'>
							{newMainImage?<img src={URL.createObjectURL(newMainImage)} alt=''/>:''}
						</p>
						
						<p>Main Image : <input type='file' accept='image/*' 
						onChange={e=>setNewMainImage(e.target.files[0])}/></p>
						<p><em>Note : You can add more images later.</em></p>

						<p>Catagory : select from below list.</p>
						

						<div className="service-categories">
							<div className="service-card-container">
							{shopCatagories.map(Sc=>{return(
									<div key={Sc.id} className='accoount-page-category' 
									onClick={()=>setNewItemCataId(Sc.id)}>
										<ServiceCategoryCard
											id={Sc.id}
											Name={Sc.Name}
											Image={Sc.Image}
										/>
									<h4>CLICK HERE TO SELECT</h4>
									<p>{Sc.Description}</p>
									{newItemCataId===Sc.id && <p><em>selected</em></p>}
								</div>
								)})}
							</div>
						</div>
						
						<p>Description is most important and describing way.<br/>
							 Please add after save with relax mind.</p>
						
						<p>Open Time to contact : 
							<input type='text' 
								placeholder='eg. 10:00 am'
								onChange={e=>setNewItemOpenTime(e.target.value)}/>
						</p>
						
						<p>Close Time to contact : 
							<input type='text' 
								placeholder='eg. 9:00 pm'
								onChange={e=>setNewItemCloseTime(e.target.value)}/>
						</p>
						
						<p>Rent : 
							<input type='text' 
								placeholder='eg. Rs.10/month'
								onChange={e=>setNewItemPriceType(e.target.value)}/>
						</p>
						
						<p>Note: Add search tag(after saving) so CONSUMERS can find you more easily.</p>
						<p></p>
						<p>MOST IMP : Do not forget to add your name, your 
						Product  name(all types of name), your area(including city, colony, etc) 
						in many different way to search tag.</p>
						<p></p>


						{readTC?<div>

							<h4>Terms and Conditions to upload product.</h4>
							<br/>

							<ul>
								<li>Take care of your product on your own. Initially we are not providing that type of facility
								but later we will add that.</li>
								<br/>
								
								<li>We are not responsible for your product. Make sure your are taking security money or ID proof or
								something else. So you can feel secure.</li>
								<br/>

								<li>You are providing something to your customers so you are the master of your business.
								Do not do anything that will put you in trouble.</li>
								<br/>

								<li>Please call us to apply for the verification tag. It will help you to increase consumers 
								trust on you and make you more profitable.</li>
								<br/>

								<li>For verification we can call(audio or video) or come to you, depends on the 
								size and value of product  and verify you are giving the 
								right details about the product or not.</li>
								<br/>

								<li>After getting verification tag do not try to change anything in service otherwise 
								it will removed. If you want to change please contact us.</li>
								<br/>

								<li>Our goal is to get more and more trust on us by people like you Please co-operate us. </li>
								<br/>

								<li>Thankyou for providing service. If you have any doubt feel free to contact us.</li>
								<br/>
								<li><a href='tel:+91 7999004229'>customer care</a></li>
							</ul>

						</div>
						:
						<button onClick={()=>setReadTC(!readTC)}>Read 8 points to keep in mind. </button>}
						
						<input type='checkbox' onChange={()=>setAgreeTC(!agreeTC)}/>
						<label>I agree</label>

						{agreeTC?<button onClick={addNewService}>Add</button>:<button onClick={()=>{
								setIsError(true);
								setErrorMessage('Please read carefully and agree that terms and conditions.');
							}}>Add</button>}
						
					</div>:<Link to='/add-service'><button>Add new service</button></Link>}
					
				</div>:''}
					
			</div>:<LoadingAnim/>}
			
		</div>
	);
}

export default AccountScreen;
