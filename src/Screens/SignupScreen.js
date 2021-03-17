import React,{ useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


function SignupScreen(props){

	const [username, setUsername]     = useState('');
	const [firstname, setFirstname]   = useState('');
	const [lastname, setLastname]     = useState('');
	const [email, setEmail]           = useState('');
	const [password1, setPassword1]   = useState('');
	const [password2, setPassword2]   = useState('');
	const [moNo, setMoNo]   		  = useState('');
	const [addrs, setAddrs]   		  = useState('');
	const [image, setImage]   		  = useState(null);

	const [hidePass1, setHidePass1]   = useState(true);
	const [hidePass2, setHidePass2]   = useState(true);
	
	const [servicePF, setServicePF]   = useState(false);

	const handleSignup=(as)=>{
		if(password1 !== password2){
			alert('Passwords are not matching.');
		}else if(username==='' || password1==='' || email===''){
			alert('* fields are required.');
		}else{
			if(as==='user'){
				let formData = new FormData();
				formData.append('username',username);
				formData.append('first_name',firstname);
				formData.append('last_name',lastname);
				formData.append('email',email);
				formData.append('password',password1);
				formData.append('Address',addrs);
				formData.append('image',image);
				const url = localStorage.getItem('url');
				axios.post(url+'signup/',formData).then(res=>{
					if(res.data.error){
						alert(res.data.error)
					}else{
						localStorage.setItem('user223',username);
						props.afterSignup();
					}
				}).catch(err=>{
					alert('Please provide valid details.');
				})
			}else{
				let formData2 = new FormData();
				formData2.append('username',username);
				formData2.append('first_name',firstname);
				formData2.append('last_name',lastname);
				formData2.append('email',email);
				formData2.append('password',password1);
				formData2.append('Address',addrs);
				formData2.append('MobileNo',moNo);
				formData2.append('image',image);
				const url = localStorage.getItem('url');
				axios.post(url+'signupAsProvider/',formData2).then(res=>{
					if(res.data.error){
						alert(res.data.error)
					}else{
						localStorage.setItem('user223',username);
						props.afterSignup();
					}
				}).catch(err=>{
					alert('Please provide valid details.');
				})
			}
		}
	}
	
	return(
		<div className='SignupScreen'>

			<img className='profileImg'
			src={image?URL.createObjectURL(image):''} alt='profile'/>
			
			<input type='file' accept='image/*' 
			onChange={e=>{setImage(e.target.files[0]); console.log(image)}}/>

			
			<input type='text' value={username} 
				onChange={e=>{setUsername(e.target.value)}}
				placeholder='Username*' required
			/>
			<input type='text' value={firstname} 
				onChange={e=>{setFirstname(e.target.value)}}
				placeholder='Firstname'
			/>
			<input type='text' value={lastname} 
				onChange={e=>{setLastname(e.target.value)}}
				placeholder='Lastname'
			/>
			<input type='email' value={email} 
				onChange={e=>{setEmail(e.target.value)}}
				placeholder='Email*' required
			/>
			
			<input type={hidePass1?'password':'text'} 
				value={password1} onChange={e=>{setPassword1(e.target.value)}}
				placeholder='Password*' required
			/>
			<button onClick={()=>{setHidePass1(!hidePass1)}}>{hidePass1?'show':'hide'}</button>
			
			<input type={hidePass2?'password':'text'} 
				value={password2} onChange={e=>{setPassword2(e.target.value)}}
				placeholder='Confirm Password*' required
			/>
			<button onClick={()=>{setHidePass2(!hidePass2)}}>{hidePass2?'show':'hide'}</button>


			{servicePF?<input type='tel'
				value={moNo} onChange={e=>{setMoNo(e.target.value)}}
				placeholder='Mobile no with country code*' required
				pattern='[0-9]{2} [0-9]{10}'
			/>:''}

			<textarea rows='7'
				value={addrs} onChange={e=>{setAddrs(e.target.value)}}
				placeholder={servicePF?'Enter your full address.*':'Enter your full address.'} required
			></textarea>

			<div>
				{servicePF?'':<h5>Signup as</h5>}

				
				{servicePF?<button 
					className='signup-btn'
					onClick={()=>setServicePF(false)}>back</button>:<Link to='/'>
					<button 
						className='signup-btn' 
						onClick={()=>handleSignup('user')}
						>User</button>
					</Link>}
				<h6>(user cannot add products)</h6>
				
				{servicePF?<Link to='/'>
					<button className='signup-btn' 
						onClick={()=>{handleSignup('service-provider')}}
					>Now Signup as Service Provider</button>
				</Link>:<button className='signup-btn' 
					onClick={()=>{setServicePF(true)}}
					>Service Provider</button>}
				<h6>(recommended)</h6>
			</div>
		</div>
	);
}

export default SignupScreen;
